import { motion } from 'motion/react';
import Icon from './Icon';

// Drag is a desktop delight; on touch it traps page scroll, so gate it to fine pointers.
const canDrag = typeof window !== 'undefined' && window.matchMedia('(pointer:fine)').matches;

// Rotation lives here (not CSS) so motion's drag transforms compose with the tilt.
const shots = [
  {
    cls: 'ph-main', rotate: -2, tape: 'tape', caption: 'crunch original · 200g',
    label: 'HERO SHOT', desc: 'hand tipping the crunch pouch over a dahi bowl · warm morning window light · lime-green nails or sleeve for brand colour',
  },
  { cls: 'ph-a', rotate: 4, tape: 'tape pink', label: 'MACRO', desc: 'clusters on a spoon, mid-air crumbs' },
  { cls: 'ph-b', rotate: -5, tape: 'tape lav', label: 'LIFESTYLE', desc: 'pouch in hand, pune street backdrop' },
];

export default function PhotoStack() {
  return (
    <div className="photo-stack" aria-label="Product photography">
      {shots.map((s, i) => (
        <motion.figure
          key={s.cls}
          className={`ph ${s.cls}`}
          style={{ rotate: s.rotate, cursor: canDrag ? 'grab' : 'default' }}
          initial={{ opacity: 0, y: 28, scale: 0.86, clipPath: 'inset(100% 0 0 0)' }}
          animate={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }}
          drag={canDrag}
          dragElastic={0.35}
          dragSnapToOrigin
          whileDrag={{ scale: 1.06, zIndex: 10, cursor: 'grabbing', boxShadow: '0 26px 44px rgba(30,21,51,.28)' }}
          whileHover={canDrag ? { scale: 1.03, rotate: s.rotate + (i % 2 ? 1.5 : -1.5) } : undefined}
        >
          <span className={s.tape} aria-hidden="true"></span>
          <div className="ph-box">
            <Icon name="camera" size={30} />
            <span>
              {s.label}
              <br />
              {s.desc}
            </span>
          </div>
          {s.caption && <figcaption className="mono">{s.caption}</figcaption>}
        </motion.figure>
      ))}
    </div>
  );
}
