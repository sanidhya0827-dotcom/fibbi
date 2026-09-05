/**
 * Meta Pixel — loaded from VITE_META_PIXEL_ID.
 *
 * Every call is a no-op when the env var is missing, so local dev and
 * preview deploys stay silent without any code changes.
 *
 * PageView is NOT fired at init. App.jsx already emits a `page_view` event on
 * mount and on every route change, so we drive the pixel off that single
 * source instead of double-counting the first load.
 */

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const enabled = Boolean(PIXEL_ID);
const CURRENCY = 'INR';

/** Standard Meta event name per fibbi event, or null to send as a custom event. */
const STANDARD = {
  page_view: 'PageView',
  add_to_cart: 'AddToCart',
  checkout_attempt: 'InitiateCheckout',
  lead_saved: 'Lead',
};

/** fibbi events worth sending as custom events (no standard equivalent). */
const CUSTOM = new Set(['oos_shown', 'quiz_complete']);

function fbq(...args) {
  if (typeof window.fbq === 'function') window.fbq(...args);
}

/** Inject fbevents.js and init the pixel. Safe to call more than once. */
export function initPixel() {
  if (!enabled || window.fbq) return;

  /* eslint-disable */
  // Meta's standard loader stub: queues calls made before fbevents.js lands.
  const n = (window.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  });
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  /* eslint-enable */

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);

  fbq('init', PIXEL_ID);
}

/**
 * Translate a fibbi analytics event into its Meta equivalent.
 * Called from trackEvent so the pixel can never drift from Supabase.
 */
export function mirrorToPixel(event, payload = {}) {
  if (!enabled) return;

  const standard = STANDARD[event];
  if (!standard && !CUSTOM.has(event)) return;

  try {
    switch (event) {
      case 'page_view':
        fbq('track', 'PageView');
        break;

      case 'add_to_cart':
        fbq('track', 'AddToCart', {
          content_type: 'product',
          content_ids: payload.sku ? [payload.sku] : [],
          value: payload.price || 0,
          currency: CURRENCY,
        });
        break;

      case 'checkout_attempt': {
        const items = payload.items || [];
        fbq('track', 'InitiateCheckout', {
          content_type: 'product',
          content_ids: items.map((i) => i.sku),
          num_items: items.reduce((s, i) => s + (i.qty || 0), 0),
          value: payload.subtotal || 0,
          currency: CURRENCY,
        });
        break;
      }

      case 'lead_saved':
        fbq('track', 'Lead', {
          content_name: payload.source || 'unknown',
          currency: CURRENCY,
        });
        break;

      case 'oos_shown':
        fbq('trackCustom', 'OutOfStockShown', { value: payload.subtotal || 0, currency: CURRENCY });
        break;

      case 'quiz_complete':
        fbq('trackCustom', 'QuizComplete', { gap: payload.gap ?? null });
        break;
    }
  } catch {
    // analytics must never break the page
  }
}
