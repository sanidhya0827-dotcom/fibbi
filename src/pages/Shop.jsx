import { useRef } from 'react';
import { useReveals } from '../lib/useReveals';
import AddButton from '../components/AddButton';
import Icon from '../components/Icon';

const svgText = { fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800 };
const svgMono = { fontFamily: 'Space Mono, monospace' };

function Sku({ tape, badge, badgeStyle, visual, title, titleNote, desc, specs, mrp, price, per, id }) {
  return (
    <div className="sku">
      <span className={`tape ${tape || ''}`} aria-hidden="true"></span>
      {badge && <span className="badge" style={badgeStyle}>{badge}</span>}
      <div className="sku-visual">{visual}</div>
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

/* --- pack visuals --- */
const CrunchBerry = (
  <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="168" fill="#F9E3EC" /><circle cx="272" cy="34" r="46" fill="#F5C4D8" />
    <g>
      <path d="M118,42 L202,42 L196,138 L124,138 Z" fill="#fff" stroke="#1E1533" strokeWidth="2.5" />
      <path d="M124,34 L196,34 L202,42 L118,42 Z" fill="#E8447A" stroke="#1E1533" strokeWidth="2.5" />
      <text x="160" y="76" textAnchor="middle" style={svgText} fontSize="19" fill="#1E1533">crunch</text>
      <text x="160" y="92" textAnchor="middle" style={svgMono} fontSize="7.5" letterSpacing="1.5" fill="#7A6E92">BERRY · REAL PULP</text>
      <circle cx="144" cy="112" r="7" fill="#E8447A" stroke="#1E1533" strokeWidth="1.8" />
      <circle cx="163" cy="120" r="6" fill="#F27AA3" stroke="#1E1533" strokeWidth="1.8" />
      <circle cx="178" cy="106" r="7" fill="#E8447A" stroke="#1E1533" strokeWidth="1.8" />
    </g>
  </svg>
);

const CrunchCoffee = (
  <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="168" fill="#EFE3D3" /><circle cx="272" cy="34" r="46" fill="#E3D0B5" />
    <g>
      <path d="M118,42 L202,42 L196,138 L124,138 Z" fill="#fff" stroke="#1E1533" strokeWidth="2.5" />
      <path d="M124,34 L196,34 L202,42 L118,42 Z" fill="#8A5A3B" stroke="#1E1533" strokeWidth="2.5" />
      <text x="160" y="76" textAnchor="middle" style={svgText} fontSize="19" fill="#1E1533">crunch</text>
      <text x="160" y="92" textAnchor="middle" style={svgMono} fontSize="7.5" letterSpacing="1.5" fill="#7A6E92">COFFEE · SLOW BREW</text>
      <circle cx="144" cy="112" r="7" fill="#8A5A3B" stroke="#1E1533" strokeWidth="1.8" />
      <circle cx="163" cy="120" r="6" fill="#A9784F" stroke="#1E1533" strokeWidth="1.8" />
      <circle cx="178" cy="106" r="7" fill="#8A5A3B" stroke="#1E1533" strokeWidth="1.8" />
    </g>
  </svg>
);

const CrunchChoco = (
  <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="168" fill="#E4DAD2" /><circle cx="42" cy="138" r="48" fill="#CDBBAC" />
    <g>
      <path d="M118,42 L202,42 L196,138 L124,138 Z" fill="#fff" stroke="#1E1533" strokeWidth="2.5" />
      <path d="M124,34 L196,34 L202,42 L118,42 Z" fill="#4A3223" stroke="#1E1533" strokeWidth="2.5" />
      <text x="160" y="76" textAnchor="middle" style={svgText} fontSize="19" fill="#1E1533">crunch</text>
      <text x="160" y="92" textAnchor="middle" style={svgMono} fontSize="7.5" letterSpacing="1.5" fill="#7A6E92">CHOCO · DARK COCOA</text>
      <circle cx="144" cy="112" r="7" fill="#6B4226" stroke="#1E1533" strokeWidth="1.8" />
      <circle cx="163" cy="120" r="6" fill="#8A5A3B" stroke="#1E1533" strokeWidth="1.8" />
      <circle cx="178" cy="106" r="7" fill="#6B4226" stroke="#1E1533" strokeWidth="1.8" />
    </g>
  </svg>
);

const CrunchTrial = (
  <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="168" fill="#EDF3D4" /><circle cx="50" cy="36" r="42" fill="#DEEBAF" />
    <g>
      <path d="M136,58 L184,58 L180,128 L140,128 Z" fill="#fff" stroke="#1E1533" strokeWidth="2.5" />
      <path d="M140,50 L180,50 L184,58 L136,58 Z" fill="#8FB623" stroke="#1E1533" strokeWidth="2.5" />
      <text x="160" y="86" textAnchor="middle" style={svgText} fontSize="13" fill="#1E1533">crunch</text>
      <text x="160" y="100" textAnchor="middle" style={svgMono} fontSize="6.5" letterSpacing="1.2" fill="#7A6E92">TRIAL · ALL 3</text>
    </g>
  </svg>
);

const OgJar = (
  <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="168" fill="#F3E7CE" /><circle cx="40" cy="34" r="44" fill="#EAD9B4" />
    <g>
      <rect x="124" y="42" width="72" height="96" rx="10" fill="#fff" stroke="#1E1533" strokeWidth="2.5" />
      <rect x="120" y="32" width="80" height="18" rx="7" fill="#E0A63C" stroke="#1E1533" strokeWidth="2.5" />
      <text x="160" y="94" textAnchor="middle" style={svgText} fontSize="18" fill="#1E1533">og</text>
      <text x="160" y="110" textAnchor="middle" style={svgMono} fontSize="7.5" letterSpacing="1.5" fill="#7A6E92">SIGNATURE HUSK</text>
      <rect x="136" y="120" width="48" height="8" fill="#1E1533" opacity=".85" />
    </g>
  </svg>
);

const OgRefill = (
  <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="168" fill="#F3E7CE" /><circle cx="280" cy="138" r="46" fill="#EAD9B4" />
    <g>
      <path d="M118,50 L202,50 L196,138 L124,138 Z" fill="#fff" stroke="#1E1533" strokeWidth="2.5" />
      <path d="M118,50 L202,50 L200,64 L120,64 Z" fill="#E0A63C" stroke="#1E1533" strokeWidth="2.5" />
      <path d="M124,42 L196,42 L202,50 L118,50 Z" fill="#C98A22" stroke="#1E1533" strokeWidth="2.5" />
      <text x="160" y="100" textAnchor="middle" style={svgText} fontSize="18" fill="#1E1533">og</text>
      <text x="160" y="116" textAnchor="middle" style={svgMono} fontSize="7.5" letterSpacing="1.5" fill="#7A6E92">REFILL POUCH</text>
    </g>
  </svg>
);

const OgSticks = (
  <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="168" fill="#F3E7CE" /><circle cx="48" cy="136" r="42" fill="#EAD9B4" />
    <g>
      <rect x="108" y="56" width="34" height="52" rx="5" fill="#fff" stroke="#1E1533" strokeWidth="2.2" transform="rotate(-7 125 82)" />
      <rect x="144" y="50" width="34" height="52" rx="5" fill="#fff" stroke="#1E1533" strokeWidth="2.2" />
      <rect x="180" y="56" width="34" height="52" rx="5" fill="#fff" stroke="#1E1533" strokeWidth="2.2" transform="rotate(7 197 82)" />
      <text x="161" y="80" textAnchor="middle" style={svgText} fontSize="12" fill="#1E1533">og</text>
      <text x="160" y="134" textAnchor="middle" style={svgMono} fontSize="7.5" letterSpacing="1.5" fill="#7A6E92">30 STICK SACHETS</text>
    </g>
  </svg>
);

function Cup({ bg, blob, blobPos, band, label }) {
  return (
    <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="168" fill={bg} />
      <circle cx={blobPos[0]} cy={blobPos[1]} r={blobPos[2]} fill={blob} />
      <g>
        <path d="M120,48 L200,48 L192,126 C191,134 184,140 176,140 L144,140 C136,140 129,134 128,126 Z" fill="#fff" stroke="#1E1533" strokeWidth="2.5" />
        <rect x="114" y="36" width="92" height="16" rx="6" fill={band} stroke="#1E1533" strokeWidth="2.5" />
        <text x="160" y="98" textAnchor="middle" style={svgText} fontSize="20" fill="#1E1533">fibbi</text>
        <text x="160" y="116" textAnchor="middle" style={svgMono} fontSize="8" letterSpacing="2" fill="#7A6E92">{label}</text>
      </g>
    </svg>
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
              <Sku id="crunch-berry-200" tape="pink" badge="bestseller" visual={CrunchBerry} title="crunch berry — 200g"
                desc="Toasted oat-psyllium clusters with real berry pieces — the same topper that crowns the berry dahi cup."
                specs={['200g', '6 serves', '₹41.5/serve']} mrp={299} price={249} per="the daily bag" />
              <Sku id="crunch-coffee-200" visual={CrunchCoffee} title="crunch coffee — 200g"
                desc="Slow-brew coffee clusters, dates doing the sweetening — the same topper as the cold coffee cup."
                specs={['200g', '6 serves', 'caffeine']} mrp={319} price={269} per="the 8am crunch" />
              <Sku id="crunch-choco-200" tape="lav" visual={CrunchChoco} title="crunch choco — 200g"
                desc="Clusters dusted in 100% dark cocoa — the same topper as the choco oat cup."
                specs={['200g', '6 serves', 'vegan']} mrp={319} price={269} per="the treat that isn't" />
              <Sku id="crunch-trial-60" tape="pink" badge="try first" badgeStyle={{ background: 'var(--lav)' }} visual={CrunchTrial}
                title="crunch trial pack — 90g" desc="One serve of every flavour — berry, coffee, choco. The zero-commitment way to learn we're not lying about the crunch."
                specs={['90g', 'all 3 flavours', 'trial']} price={99} per="trial pack" />
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
              <Sku id="og-jar-200" tape="gold" visual={OgJar} title="og jar — 200g"
                desc="33 serves. Unflavoured or mint-lime. Stirs clean into water, milk, dahi."
                specs={['200g', '33 serves', '₹12.1/serve']} mrp={449} price={399} per="the daily driver" />
              <Sku id="og-refill-450" badge="best value" visual={OgRefill} title="og refill — 450g"
                desc="75 serves in a compostable pouch. Refill the jar, halve the footprint."
                specs={['450g', '75 serves', '₹9.9/serve']} mrp={849} price={749} per="18% cheaper/serve" />
              <Sku id="og-sticks-30" tape="lav" visual={OgSticks} title="og sticks — 30 × 6g"
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
              <Sku id="cup-berry" tape="pink" visual={<Cup bg="#F9E3EC" blob="#F5C4D8" blobPos={[270, 30, 46]} band="#E8447A" label="BERRY DAHI" />}
                title="berry dahi cup" desc="Thick unsweetened dahi, real berry pulp, twist-top crunch topper."
                specs={['155g', '5g fiber', 'live cultures']} mrp={119} price={99} per="the ritual cup" />
              <Sku id="cup-coffee" visual={<Cup bg="#EFE3D3" blob="#E3D0B5" blobPos={[46, 138, 50]} band="#8A5A3B" label="COLD COFFEE" />}
                title="cold coffee cup" desc="Slow-brew coffee dahi, dates doing the sweetening. Caffeine + fiber, one cup."
                specs={['155g', '5g fiber', '60mg caffeine']} mrp={119} price={99} per="the 8am merger" />
              <Sku id="cup-choco" tape="lav" visual={<Cup bg="#E4DAD2" blob="#CDBBAC" blobPos={[276, 140, 48]} band="#4A3223" label="CHOCO OAT" />}
                title="choco oat cup" titleNote="dairy-free" desc="Dark cocoa oat base, cocoa-dusted topper. The plant-based one."
                specs={['155g', '5g fiber', 'vegan']} mrp={129} price={109} per="plant-based line" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
