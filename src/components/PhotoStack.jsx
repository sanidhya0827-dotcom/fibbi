import { motion } from 'motion/react';
import AddButton from './AddButton';
import { CATALOG } from '../data/catalog';

// One shot per product line, so the hero doesn't read as a crunch-only brand.
// Rotation lives here (not CSS) so motion's hover transforms compose with the tilt.
const shots = [
  { cls: 'ph-main', id: 'crunch-berry-200', rotate: -2, tape: 'tape', line: 'the crunch' },
  { cls: 'ph-a', id: 'og-jar-200', rotate: 3, tape: 'tape gold', line: 'the og' },
  { cls: 'ph-b', id: 'cup-berry', rotate: -3, tape: 'tape pink', line: 'the cup' },
];

export default function PhotoStack() {
  return (
    <div className="photo-stack" aria-label="Shop the range">
      {shots.map((s, i) => {
        const p = CATALOG[s.id];
        return (
          <motion.figure
            key={s.cls}
            className={`ph ${s.cls}`}
            style={{ rotate: s.rotate }}
            initial={{ opacity: 0, y: 28, scale: 0.86, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, rotate: 0, zIndex: 9 }}
          >
            <span className={s.tape} aria-hidden="true"></span>
            <div className="ph-box">
              <img src={p.img} alt={p.name} loading="lazy" />
            </div>
            <figcaption className="ph-buy">
              <span className="ph-line">{s.line}</span>
              <span className="ph-name">{p.name}</span>
              <span className="ph-row">
                <span className="ph-price">₹{p.price}</span>
                <AddButton id={s.id} className="add-btn ph-add">add</AddButton>
              </span>
            </figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
}
