import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** Null when env vars are missing — the app then runs in offline/demo mode. */
export const supabase = url && key ? createClient(url, key) : null;

const SID_KEY = 'fibbi_sid';
export function sessionId() {
  let sid = localStorage.getItem(SID_KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem(SID_KEY, sid);
  }
  return sid;
}

/** Fire-and-forget analytics event. Never throws, never blocks UI. */
export function trackEvent(event, payload = {}) {
  try {
    if (!supabase) {
      if (import.meta.env.DEV) console.log('[track]', event, payload);
      return;
    }
    supabase
      .from('events')
      .insert({ session_id: sessionId(), event, path: window.location.pathname, payload })
      .then(({ error }) => error && console.warn('track failed:', error.message));
  } catch (e) {
    console.warn('track failed:', e);
  }
}

/** Save an email lead. Duplicate (same email+source) is treated as success. */
export async function saveLead(email, source, meta = {}) {
  try {
    if (!supabase) {
      if (import.meta.env.DEV) console.log('[lead]', email, source, meta);
      return { ok: true };
    }
    const { error } = await supabase
      .from('leads')
      .insert({ email, source, meta: { ...meta, session_id: sessionId() } });
    if (error && error.code !== '23505') throw error;
    return { ok: true };
  } catch (e) {
    console.warn('lead failed:', e);
    return { ok: false };
  }
}
