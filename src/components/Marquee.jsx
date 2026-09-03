import { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import Icon from './Icon';

const items = ['5g real fiber', '0g added sugar', 'stays crunchy in dahi', 'zero slime', 'made in pune'];

// keep x within [-w, 0] so the doubled track loops seamlessly
const wrap = (w, v) => (w === 0 ? 0 : ((v % w) + w) % w) - w;

export default function Marquee() {
  const row = [...items, ...items];
  const x = useMotionValue(0);
  const half = useRef(0);
  const hovering = useRef(false);
  const trackRef = useRef(null);

  useAnimationFrame((_, delta) => {
    if (!half.current && trackRef.current) half.current = trackRef.current.scrollWidth / 2;
    const speed = hovering.current ? 0.012 : 0.045; // px per ms
    x.set(wrap(half.current, x.get() - speed * delta));
  });

  return (
    <div
      className="marquee"
      aria-hidden="true"
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      <motion.div
        ref={trackRef}
        className="marquee-track"
        style={{ x, cursor: 'grab' }}
        drag="x"
        dragConstraints={{ left: -9999, right: 9999 }}
        dragElastic={0.05}
        whileDrag={{ cursor: 'grabbing' }}
      >
        {row.map((t, i) => (
          <span key={i}>
            {t} <span className="sep"><Icon name="sparkle" size="0.7em" /></span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
