import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveals } from '../lib/useReveals';
import { saveLead, trackEvent } from '../lib/supabase';
import Icon from '../components/Icon';
import AddButton from '../components/AddButton';
import PhotoStack from '../components/PhotoStack';
import CursorTrail from '../components/CursorTrail';
import Marquee from '../components/Marquee';
import TrustStrip from '../components/TrustStrip';
import Quiz from '../components/Quiz';
import Testimonials from '../components/Testimonials';

const METRO_PREFIX = ['11', '12', '20', '40', '41', '56', '60', '50', '70', '38', '30'];

function PinCheck() {
  const [pin, setPin] = useState('');
  const [msg, setMsg] = useState({ text: 'we deliver to most pincodes across india', ok: false });

  const check = () => {
    const v = pin.trim();
    if (!/^[1-9][0-9]{5}$/.test(v)) {
      setMsg({ text: 'enter a valid 6-digit pincode', ok: false });
      return;
    }
    const metro = METRO_PREFIX.includes(v.slice(0, 2));
    setMsg({ text: `delivering to ${v} — est. ${metro ? '2–4' : '4–7'} days · COD available`, ok: true });
    trackEvent('pin_check', { pin: v, metro });
  };

  return (
    <div className="pin-check">
      <span style={{ fontWeight: 700, fontSize: 13.5 }}><Icon name="pin" size="1.05em" /> check delivery:</span>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        placeholder="pincode"
        aria-label="Delivery pincode"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && check()}
      />
      <button className="pin-go" onClick={check}>check</button>
      <span className={`pin-msg${msg.ok ? ' ok' : ''}`}>{msg.text}</span>
    </div>
  );
}

function Waitlist() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!email.includes('@')) return;
    setBusy(true);
    const res = await saveLead(email, 'waitlist');
    setBusy(false);
    if (res.ok) setDone(true);
  };

  return (
    <section className="waitlist">
      <div className="wrap">
        <h2 className="sec-title reveal">Batch 002 won't wait either. <Icon name="box" /></h2>
        <p className="lead reveal">
          500 pouches per batch while we scale the bakery. The list gets first dibs and founder pricing — everyone else gets the sold-out page.
        </p>
        <div className="wl-form reveal" data-delay="1">
          <input
            type="email"
            placeholder="you@gmail.com"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
          <button className="btn btn-dark" onClick={submit} disabled={busy || done}>
            {done ? <><Icon name="check" size="1em" /> added</> : busy ? 'saving…' : 'get on the list'}
          </button>
        </div>
        {done && <p className="wl-done" style={{ display: 'block' }}>you're in — first parcel has your name on it <Icon name="check" size="1em" /></p>}
      </div>
    </section>
  );
}

export default function Home() {
  const ref = useRef(null);
  useReveals(ref);

  return (
    <div className="page active" ref={ref}>
      <div className="hero">
        <CursorTrail />
        <span className="hero-sticker"><Icon name="box" size="1em" /> batch 001 · 500 pouches</span>
        <div>
          <span className="kicker lime">the hero drop <Icon name="sparkle" size="1em" /></span>
          <h1>
            fibbi crunch. Fiber that <span className="u">snacks back.</span>
          </h1>
          <p className="lead">
            Oat-psyllium clusters with 5g of real fiber per handful — baked so they stay crunchy in dahi, milk, or straight from the
            pouch. Zero added sugar. Zero slime. Zero lectures.
          </p>
          <div className="rating-line">
            <span className="stars">★★★★★</span> 4.6 <span className="rl-n">· 318 tester ratings · batch 001</span>
          </div>
          <p className="stock-line"><Icon name="bolt" size="1em" /> batch 001 is limited to 500 pouches — moving fast</p>
          <div className="cta-row">
            <AddButton id="crunch-berry-200" className="btn btn-primary">add to cart · ₹249</AddButton>
            <Link className="btn" to="/science">read the science</Link>
          </div>
          <div className="hero-meta">
            <div className="hm"><div className="n">5g</div><div className="l">fiber per serve</div></div>
            <div className="hm"><div className="n">0g</div><div className="l">added sugar</div></div>
            <div className="hm"><div className="n">6</div><div className="l">ingredients, total</div></div>
          </div>
        </div>
        <PhotoStack />
      </div>

      <Marquee />
      <TrustStrip />
      <div className="pin-band">
        <PinCheck />
      </div>

      <section className="band">
        <div className="wrap">
          <span className="kicker reveal" style={{ background: 'transparent', color: 'var(--lime)', borderColor: 'var(--lime)' }}>
            the problem
          </span>
          <h2 className="sec-title reveal">You're short on fiber.<br />Today. Again.</h2>
          <div className="gap-big reveal">~15g</div>
          <p className="lead reveal">
            That's the average daily fiber gap for urban Indians — your gut needs ~30g, the average plate delivers about half. The gap
            shows up as bloating, 4pm crashes, and snacking that never satisfies.
          </p>
          <div className="proof-grid">
            <div className="proof reveal"><span className="p-emo"><Icon name="phone" size={30} /></span><div className="p-h">You know the theory</div><p>40 gut-health reels a month. The word "microbiome" lives in your head rent-free. Knowledge isn't the gap — grams are.</p></div>
            <div className="proof reveal" data-delay="1"><span className="p-emo"><Icon name="cookie" size={30} /></span><div className="p-h">Your snacks work against you</div><p>The average packaged snack carries under 1g of fiber and a sugar spike. You snack, you crash, you snack again.</p></div>
            <div className="proof reveal" data-delay="2"><span className="p-emo"><Icon name="spoon" size={30} /></span><div className="p-h">The fix tasted like punishment</div><p>The most proven fiber on earth has been in Indian homes for a century — served as slimy water at 6am. So nobody your age touches it.</p></div>
          </div>
          <Quiz />
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="kicker reveal">the lineup</span>
          <h2 className="sec-title reveal">One hero. Two sidekicks.</h2>
          <div className="lines">
            <Link className="line-card lc-crunch reveal" to="/shop">
              <span className="tape" aria-hidden="true"></span>
              <span className="lc-tag"><Icon name="star" size="1em" /> the hero</span>
              <h3>fibbi crunch</h3>
              <p>Oat-psyllium clusters that snack like granola and work like medicine (legally: it's a food).</p>
              <span className="lc-price">from ₹99 →</span>
            </Link>
            <Link className="line-card lc-og reveal" data-delay="1" to="/shop">
              <span className="tape gold" aria-hidden="true"></span>
              <span className="lc-tag">the daily driver</span>
              <h3>fibbi og</h3>
              <p>Our proprietary husk blend — micro-cut psyllium + prebiotic acacia. Stirs clean into anything.</p>
              <span className="lc-price">from ₹399 →</span>
            </Link>
            <Link className="line-card lc-cups reveal" data-delay="2" to="/shop">
              <span className="tape pink" aria-hidden="true"></span>
              <span className="lc-tag">the fresh one</span>
              <h3>fibbi cups</h3>
              <p>Twist-top dahi cups with a crunch topper. The ready-to-eat ritual, on quick commerce.</p>
              <span className="lc-price">from ₹99 →</span>
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <Waitlist />
    </div>
  );
}
