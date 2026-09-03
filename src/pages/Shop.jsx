import { useRef } from 'react';
import { useReveals } from '../lib/useReveals';
import AddButton from '../components/AddButton';
import Icon from '../components/Icon';
import { CATALOG } from '../data/catalog';

export function Sku({ tape, badge, badgeStyle, title, titleNote, desc, specs, mrp, price, per, id }) {
  return (
    <div className="sku">
      <span className={`tape ${tape || ''}`} aria-hidden="true"></span>
      {badge && <span className="badge" style={badgeStyle}>{badge}</span>}
      <div className="sku-visual"><img src={CATALOG[id].img} alt={title} loading="lazy" /></div>
      <div className="sku-body">
        <h4>
          {title}
          {titleNote && <span className="mono" style={{ fontSize: 10, color: 'var(--ink-60)' }}> · {titleNote}</span>}
        </h4>
        <p className="s-desc">{desc}</p>
        <div className="s-specs">{specs.map((s) => <span key={s}>{s}</span>)}</div>
        <div className="s-buy">
          <span className="s-price">
            {mrp && <span className="mrp">₹{mrp}</span>}₹{price}
            <span className="per">{per}</span>
          </span>
          <AddButton id={id}>add to cart</AddButton>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const ref = useRef(null);
  useReveals(ref);

  return (
    <div className="page active" ref={ref}>
      <section>
        <div className="wrap">
          <span className="kicker lime">shop <Icon name="cart" size="1em" /></span>
          <h2 className="sec-title">The drop.</h2>
          <p className="lead">Launch pricing for India. Every serve carries 5g of psyllium and a label you can read out loud.</p>
          <p className="dispatch-line" style={{ marginTop: 10 }}>
            <Icon name="check" size="1em" /> dispatch in 24–48h · <Icon name="truck" size="1em" /> free shipping above ₹499 · <Icon name="money" size="1em" /> COD available (+₹49)
          </p>

          <div className="shop-line">
            <div className="line-head">
              <h3><Icon name="star" size="1em" /> fibbi crunch — the hero</h3>
              <span className="lh-note">shelf stable · ships pan-india · 5g fiber per 35g serve</span>
            </div>
            <div className="sku-grid">
              <Sku id="crunch-berry-200" tape="pink" badge="bestseller" title="crunch berry — 200g"
                desc="Toasted oat-psyllium clusters with real berry pieces — the same topper that crowns the berry dahi cup."
                specs={['200g', '6 serves', '₹41.5/serve']} mrp={299} price={249} per="the daily bag" />
              <Sku id="crunch-coffee-200" title="crunch coffee — 200g"
                desc="Slow-brew coffee clusters, dates doing the sweetening — the same topper as the cold coffee cup."
                specs={['200g', '6 serves', 'caffeine']} mrp={319} price={269} per="the 8am crunch" />
              <Sku id="crunch-cocoa-200" tape="lav" title="crunch cocoa — 200g"
                desc="Clusters dusted in 100% dark cocoa — the same topper as the cocoa oat cup."
                specs={['200g', '6 serves', 'vegan']} mrp={319} price={269} per="the treat that isn't" />
              <Sku id="crunch-vanilla-200" badge="new" badgeStyle={{ background: 'var(--lav)' }} title="crunch vanilla — 200g"
                desc="Madagascar vanilla clusters, gently sweetened with dates — the same topper as the vanilla dahi cup."
                specs={['200g', '6 serves', 'no added sugar']} mrp={319} price={269} per="the mellow one" />
            </div>
            <div className="og-note" style={{ borderColor: 'var(--lime-deep)', background: 'rgba(143,182,35,.07)' }}>
              <b style={{ color: 'var(--lime-deep)' }}>Why crunch first:</b> it eats like a snack, ships anywhere in India without a
              cold chain, and 35g on your dahi quietly closes a third of the daily fiber gap. This is the pouch that ends the isabgol joke.
            </div>
          </div>

          <div className="shop-line">
            <div className="line-head">
              <h3>fibbi og — the signature husk</h3>
              <span className="lh-note">proprietary blend · 95% micro-cut psyllium + prebiotic acacia</span>
            </div>
            <div className="sku-grid">
              <Sku id="og-jar-200" tape="gold" title="og jar — 200g"
                desc="33 serves. Unflavoured or mint-lime. Stirs clean into water, milk, dahi."
                specs={['200g', '33 serves', '₹12.1/serve']} mrp={449} price={399} per="the daily driver" />
              <Sku id="og-sticks-30" tape="lav" title="og sticks — 30 × 6g"
                desc="Single-serve sachets for desks, gym bags, travel. Tear, stir, done."
                specs={['180g', '30 serves', '₹18.3/serve']} mrp={599} price={549} per="convenience premium" />
            </div>
            <div className="og-note">
              <b>Why og costs what it costs:</b> pharma-grade 99% pure psyllium (not tea-cut husk), micro-milled for clean mixing,
              blended with prebiotic acacia so the same scoop also feeds your gut bacteria. Sat-Isabgol it is not — and it doesn't
              drink like it either.
            </div>
          </div>

          <div className="shop-line">
            <div className="line-head">
              <h3>fibbi cups — the fresh line</h3>
              <span className="lh-note">refrigerated · quick commerce · 155g (120g base + 35g topper)</span>
            </div>
            <div className="sku-grid">
              <Sku id="cup-berry" tape="pink" title="berry dahi cup" desc="Thick unsweetened dahi, real berry pulp, twist-top crunch topper."
                specs={['155g', '5g fiber', 'live cultures']} mrp={119} price={99} per="the ritual cup" />
              <Sku id="cup-coffee" title="cold coffee cup" desc="Slow-brew coffee dahi, dates doing the sweetening. Caffeine + fiber, one cup."
                specs={['155g', '5g fiber', '60mg caffeine']} mrp={119} price={99} per="the 8am merger" />
              <Sku id="cup-cocoa" tape="lav" title="cocoa oat cup" titleNote="dairy-free" desc="Dark cocoa oat base, cocoa-dusted topper. The plant-based one."
                specs={['155g', '5g fiber', 'vegan']} mrp={129} price={109} per="plant-based line" />
              <Sku id="cup-vanilla" title="vanilla dahi cup" desc="Thick unsweetened dahi, Madagascar vanilla, twist-top crunch topper."
                specs={['155g', '5g fiber', 'live cultures']} mrp={119} price={99} per="the mellow cup" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
