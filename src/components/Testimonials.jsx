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
        <span className="vb">illustrative</span>
      </span>
    </div>
  );
}

export default function Testimonials() {
  const loop = [...REVIEWS, ...REVIEWS];
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <span className="kicker lime reveal">tasting notes <Icon name="speech" /></span>
        <h2 className="sec-title reveal">What we're hoping you'll say.</h2>
        <p className="lead reveal">
          fibbi hasn't shipped yet, so there's nothing here to rate. These are the reactions we're
          building for — written by us, from our own kitchen-table tasting sessions.
        </p>
      </div>
      <div className="t-carousel" aria-label="Tester reviews">
        <div className="t-track">
          {loop.map((r, i) => <Card r={r} key={i} />)}
        </div>
      </div>
    </section>
  );
}
