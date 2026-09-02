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
                items.map((i) => (
                  <div className="ci" key={i.id}>
                    <span className="ci-swatch" style={{ background: CATALOG[i.id].sw }} />
                    <div className="ci-info">
                      <div className="ci-name">{CATALOG[i.id].name}</div>
                      <div className="ci-price">₹{CATALOG[i.id].price} each</div>
                    </div>
                    <div className="qty">
                      <button onClick={() => dec(i.id)}>−</button>
                      <span>{i.qty}</span>
                      <button onClick={() => inc(i.id)}>+</button>
                    </div>
                  </div>
                ))
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
            <p>confirming stock with the warehouse…</p>
          </div>
        )}

        {panel === 'oos' && (
          <div className="oos show">
            <span className="oos-emo"><Icon name="box" size={40} /></span>
            <span className="oos-tag">out of stock</span>
            <h4>the first batch is gone.</h4>
            <p>500 pouches sold out faster than we could tape the boxes. drop your email — restock list gets first dibs + founder pricing.</p>
            <p className="mono" style={{ fontSize: 11, color: 'var(--ink-60)' }}>
              restock ETA: 12–14 days · no payment was taken · your cart is saved
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
                  {busy ? 'saving…' : 'get restock priority'}
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
