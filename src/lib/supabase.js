const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** False when env vars are missing — the app then runs in offline/demo mode. */
const enabled = Boolean(url && key);

const VID_COOKIE = 'fibbi_vid';        // first-party visitor profile, 1 year
const SID_KEY = 'fibbi_sid';           // per-tab session
const VISIT_KEY = 'fibbi_visit_logged';
const YEAR = 60 * 60 * 24 * 365;

/* ------------------------------------------------------------------ cookies */

function readCookie(name) {
  const hit = document.cookie.split('; ').find((c) => c.startsWith(name + '='));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}

function writeCookie(name, value, maxAge = YEAR) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

/* ----------------------------------------------------------------- identity */

let _newSession = false;
let _profile = null;

export function sessionId() {
  let sid = sessionStorage.getItem(SID_KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(SID_KEY, sid);
    _newSession = true;
  }
  return sid;
}

function firstTouch() {
  const q = new URLSearchParams(location.search);
  const out = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'ref']) {
    const v = q.get(k);
    if (v) out[k] = v.slice(0, 120);
  }
  return out;
}

/** Returning-visitor profile, persisted in a first-party cookie. */
export function visitor() {
  if (_profile) return _profile;
  sessionId(); // flips _newSession on the first call in this tab
  let p = null;
  try {
    p = JSON.parse(readCookie(VID_COOKIE) || 'null');
  } catch {
    p = null;
  }
  if (!p?.id) {
    p = {
      id: crypto.randomUUID(),
      first_seen: new Date().toISOString(),
      visits: 0,
      referrer: document.referrer || null,
      landing: location.pathname,
      utm: firstTouch(),
    };
  }
  if (_newSession) p.visits = (p.visits || 0) + 1;
  p.last_seen = new Date().toISOString();
  writeCookie(VID_COOKIE, JSON.stringify(p));
  _profile = p;
  return p;
}

function device() {
  const n = navigator;
  const c = n.connection || {};
  const mq = (q) => window.matchMedia(q).matches;
  return {
    ua: n.userAgent?.slice(0, 400),
    platform: n.userAgentData?.platform || n.platform || null,
    mobile: n.userAgentData?.mobile ?? mq('(max-width: 760px)'),
    touch: (n.maxTouchPoints || 0) > 0,
    lang: n.language,
    langs: (n.languages || []).slice(0, 3),
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    tz_offset_min: -new Date().getTimezoneOffset(),
    screen: `${screen.width}x${screen.height}`,
    viewport: `${innerWidth}x${innerHeight}`,
    dpr: devicePixelRatio,
    net: c.effectiveType || null,
    save_data: c.saveData ?? null,
    dark: mq('(prefers-color-scheme: dark)'),
    reduced_motion: mq('(prefers-reduced-motion: reduce)'),
  };
}

/* ------------------------------------------------------------------- writes */

/** Insert that survives page unload (fetch keepalive is why this talks to PostgREST directly). */
function beacon(table, row) {
  return fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    keepalive: true,
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  }).catch(() => {});
}

/** One row per tab-session holding all the cookie + device detail. */
export function logVisit() {
  if (sessionStorage.getItem(VISIT_KEY)) return;
  sessionStorage.setItem(VISIT_KEY, '1');
  const v = visitor();
  const row = {
    visitor_id: v.id,
    session_id: sessionId(),
    visit_no: v.visits,
    first_seen: v.first_seen,
    referrer: document.referrer || v.referrer,
    landing: location.pathname + location.search,
    utm: { ...v.utm, ...firstTouch() },
    device: device(),
  };
  if (!enabled) {
    if (import.meta.env.DEV) console.log('[visit]', row);
    return;
  }
  beacon('visits', row);
}

/** Fire-and-forget analytics event. Never throws, never blocks UI. */
export function trackEvent(event, payload = {}) {
  try {
    if (event === 'page_view') resetPageMetrics();
    const row = {
      session_id: sessionId(),
      visitor_id: visitor().id,
      event,
      path: window.location.pathname,
      payload,
    };
    if (!enabled) {
      if (import.meta.env.DEV) console.log('[track]', event, payload);
      return;
    }
    beacon('events', row);
  } catch (e) {
    console.warn('track failed:', e);
  }
}

/** Save an email lead. Duplicate (same email+source) is treated as success. */
export async function saveLead(email, source, meta = {}) {
  try {
    const v = visitor();
    const full = {
      ...meta,
      session_id: sessionId(),
      visitor_id: v.id,
      visit_no: v.visits,
      first_seen: v.first_seen,
      utm: v.utm,
      device: device(),
    };
    if (!enabled) {
      if (import.meta.env.DEV) console.log('[lead]', email, source, full);
      return { ok: true };
    }
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email, source, meta: full }),
    });
    // 409 = same email+source already on the list, which is a success for the user
    if (!res.ok && res.status !== 409) throw new Error(`lead insert ${res.status}`);
    return { ok: true };
  } catch (e) {
    console.warn('lead failed:', e);
    return { ok: false };
  }
}

/* ------------------------------------------- auto-capture (zero markup work) */

let pageStart = Date.now();
let maxScroll = 0;
let clicks = 0;
let exited = false;
const depthMarks = new Set();

function resetPageMetrics() {
  flushExit('route_change');
  pageStart = Date.now();
  maxScroll = 0;
  clicks = 0;
  exited = false;
  depthMarks.clear();
}

function labelOf(el) {
  return (el.getAttribute('aria-label') || el.dataset?.track || el.textContent || '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 80);
}

function flushExit(reason) {
  const dwell = Date.now() - pageStart;
  if (exited || dwell < 800) return;
  exited = true;
  const payload = { reason, dwell_ms: dwell, max_scroll: maxScroll, clicks };
  if (!enabled) {
    if (import.meta.env.DEV) console.log('[track] page_exit', payload);
    return;
  }
  beacon('events', {
    session_id: sessionId(),
    visitor_id: visitor().id,
    event: 'page_exit',
    path: window.location.pathname,
    payload,
  });
}

/** Delegated listeners that turn every click / scroll / field touch into data. */
export function startAutoCapture() {
  logVisit();

  document.addEventListener(
    'click',
    (e) => {
      const el = e.target.closest?.('a, button, [role="button"], summary, input[type="submit"]');
      if (!el) return;
      clicks++;
      const href = el.getAttribute('href') || null;
      trackEvent('click', {
        label: labelOf(el),
        tag: el.tagName.toLowerCase(),
        href,
        section: el.closest('section[id], [id]')?.id || null,
        outbound: !!href && /^https?:/i.test(href) && !href.includes(location.host),
        vx: Math.round((e.clientX / innerWidth) * 100),
        vy: Math.round((e.clientY / innerHeight) * 100),
        since_load_ms: Date.now() - pageStart,
      });
    },
    { capture: true, passive: true }
  );

  addEventListener(
    'scroll',
    () => {
      const d = document.documentElement;
      const total = d.scrollHeight - innerHeight;
      const pct = total > 0 ? Math.min(100, Math.round((d.scrollTop / total) * 100)) : 100;
      if (pct > maxScroll) maxScroll = pct;
      for (const m of [25, 50, 75, 100]) {
        if (pct >= m && !depthMarks.has(m)) {
          depthMarks.add(m);
          trackEvent('scroll_depth', { depth: m, since_load_ms: Date.now() - pageStart });
        }
      }
    },
    { passive: true }
  );

  // field name + whether anything was typed — never the typed value itself
  document.addEventListener('focusin', (e) => {
    const el = e.target;
    if (el.matches?.('input, textarea, select')) {
      trackEvent('field_focus', { field: el.getAttribute('aria-label') || el.name || el.type });
    }
  });
  document.addEventListener('focusout', (e) => {
    const el = e.target;
    if (el.matches?.('input, textarea, select')) {
      trackEvent('field_blur', {
        field: el.getAttribute('aria-label') || el.name || el.type,
        filled: !!el.value?.length,
      });
    }
  });

  addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushExit('hidden');
  });
  addEventListener('pagehide', () => flushExit('unload'));
}

