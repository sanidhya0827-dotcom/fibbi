import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CATALOG, FREE_SHIP } from '../data/catalog';
import { saveLead, trackEvent } from '../lib/supabase';
import Icon from './Icon';

export default function CartDrawer() {
  const { items, count, subtotal, open, panel, inc, dec, closeCart, checkout, backToCart } = useCart();
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  const submitRestock = async () => {
    if (!email.includes('@')) return;
    setBusy(true);
    // source stays 'restock' so schema.sql + the README funnel queries keep working;
    // the user-facing copy calls it the launch list.
    const res = await saveLead(email, 'restock', {
      subtotal,
      items: items.map((i) => ({ sku: i.id, qty: i.qty })),
    });
    setBusy(false);
    if (res.ok) {
      setSaved(true);
      trackEvent('lead_saved', { source: 'restock' });
    }
  };

  const fill = Math.min(100, Math.round((subtotal / FREE_SHIP) * 100));

  return (
    <>
      <div className={`cart-backdrop${open ? ' open' : ''}`} onClick={closeCart} />
      <aside className={`cart-drawer${open ? ' open' : ''}`} aria-label="Cart">
        <div className="cd-head">
          <h3>your cart <Icon name="cart" /></h3>
          <button className="cd-close" onClick={closeCart}><Icon name="close" size="1em" /></button>
        </div>

        {panel === 'cart' && (
          <>
            <div className="cd-items">
              {count === 0 ? (
                <p className="cd-empty">nothing here yet — your gut is waiting <Icon name="eyes" /></p>
              ) : (
                items.map((i) => {
                  const p = CATALOG[i.id];
                  if (!p) return null; // stale cart entry from a removed SKU
                  return (
                    <div className="ci" key={i.id}>
                      <span className="ci-swatch" style={{ background: p.sw }} />
                      <div className="ci-info">
                        <div className="ci-name">{p.name}</div>
                        <div className="ci-price">₹{p.price} each</div>
                      </div>
                      <div className="qty">
                        <button onClick={() => dec(i.id)}>−</button>
                        <span>{i.qty}</span>
                        <button onClick={() => inc(i.id)}>+</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {count > 0 && (
              <div className="cd-foot" style={{ display: 'block' }}>
                <div className="ship-progress">
                  <div className="sp-t">
                    {subtotal >= FREE_SHIP ? (
                      <><Icon name="party" /> <b>free shipping unlocked</b></>
                    ) : (
                      <>add ₹{FREE_SHIP - subtotal} more for <b>free shipping</b></>
                    )}
                  </div>
                  <div className="sp-bar"><div className="sp-fill" style={{ width: `${fill}%` }} /></div>
                </div>
                <div className="cd-sub"><span>subtotal</span><span>₹{subtotal}</span></div>
                <button className="btn btn-dark cd-checkout" onClick={checkout}><Icon name="lock" size="1em" /> secure checkout →</button>
                <div className="pay-chips" style={{ justifyContent: 'center' }}>
                  <span className="upi">UPI</span><span>GPay</span><span>PhonePe</span><span>Paytm</span>
                  <span>VISA</span><span>Mastercard</span><span>RuPay</span><span>COD</span>
                </div>
                <div className="cd-meta"><span><Icon name="receipt" size="1em" /> invoice with every order</span><span><Icon name="lock" size="1em" /> encrypted checkout</span></div>
              </div>
            )}
          </>
        )}

        {panel === 'checking' && (
          <div className="checking show">
            <div className="spinner" aria-hidden="true" />
            <p>checking batch 001 availability…</p>
          </div>
        )}

        {panel === 'oos' && (
          <div className="oos show">
            <span className="oos-emo"><Icon name="box" size={40} /></span>
            <span className="oos-tag">not shipping yet</span>
            <h4>batch 001 is still in the kitchen.</h4>
            <p>we're not taking orders until it's baked and tested. drop your email — the launch list ships first, at founder pricing.</p>
            <p className="mono" style={{ fontSize: 11, color: 'var(--ink-60)' }}>
              no payment was taken · your cart is saved · we'll email the moment it's ready
            </p>
            {!saved ? (
              <>
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  aria-label="Email for restock"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitRestock()}
                />
                <button className="btn btn-primary" onClick={submitRestock} disabled={busy}>
                  {busy ? 'saving…' : 'join the launch list'}
                </button>
              </>
            ) : (
              <span className="oos-done" style={{ display: 'block' }}>you're on the list — we'll be quick <Icon name="check" size="1em" /></span>
            )}
            <button className="reset-btn" style={{ marginTop: 8 }} onClick={backToCart}>← back to cart</button>
          </div>
        )}
      </aside>
    </>
  );
}
