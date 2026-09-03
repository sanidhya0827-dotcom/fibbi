import { REVIEWS } from '../data/catalog';
import Icon from './Icon';

function Card({ r }) {
  return (
    <div className="t-card">
      <span className={`tape ${r.tape}`} aria-hidden="true"></span>
      <div className="stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
      <p>{r.text}</p>
      <span className="who">
        {r.who}
        <span className="vb">verified</span>
      </span>
    </div>
  );
}

export default function Testimonials() {
  const loop = [...REVIEWS, ...REVIEWS];
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <span className="kicker lime reveal">what testers said <Icon name="speech" /></span>
        <h2 className="sec-title reveal">Batch 001 has opinions.</h2>
        <div className="t-summary reveal">
          <div className="t-avg">4.6</div>
          <div className="t-sum-meta">
            <span className="stars">★★★★★</span>
            <span className="mono">318 verified ratings</span>
          </div>
          <div className="t-chips">
            <span>89% would reorder</span>
            <span>"crunchy" × 121 mentions</span>
            <span>"not slimy" × 74 mentions</span>
          </div>
        </div>
      </div>
      <div className="t-carousel" aria-label="Tester reviews">
        <div className="t-track">
          {loop.map((r, i) => <Card r={r} key={i} />)}
        </div>
      </div>
    </section>
  );
}
