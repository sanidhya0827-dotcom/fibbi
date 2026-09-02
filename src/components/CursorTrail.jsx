import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Themed vector tiles — ink outlines + brand palette, matching the bordered look.
const I = '#1E1533', LIME = '#C8F53C', LAV = '#CDBFF5', BERRY = '#E8447A', GOLD = '#E0A63C', CREAM = '#FAF6ED';
const sw = 1.6;
const tiles = [
  // sparkle
  (
    <path d="M20 3c1.8 10.5 6.2 14.9 17 16.8-10.8 1.9-15.2 6.3-17 17-1.8-10.7-6.2-15.1-17-17 10.8-1.9 15.2-6.3 17-16.8Z"
      fill={LIME} stroke={I} strokeWidth={sw} strokeLinejoin="round" />
  ),
  // grain / cluster stalk
  (
    <g fill={GOLD} stroke={I} strokeWidth={sw} strokeLinejoin="round">
      <path d="M20 37V16" fill="none" strokeLinecap="round" />
      <ellipse cx="20" cy="9" rx="4" ry="6" />
      <ellipse cx="13" cy="17" rx="3.6" ry="5.4" transform="rotate(-32 13 17)" />
      <ellipse cx="27" cy="17" rx="3.6" ry="5.4" transform="rotate(32 27 17)" />
    </g>
  ),
  // bowl of dahi + clusters
  (
    <g stroke={I} strokeWidth={sw} strokeLinejoin="round">
      <path d="M5 18h30a15 15 0 0 1-30 0Z" fill={LAV} />
      <circle cx="15" cy="15" r="2.4" fill={GOLD} />
      <circle cx="22" cy="16" r="2" fill={LIME} />
      <circle cx="27" cy="14.5" r="2.2" fill={GOLD} />
    </g>
  ),
  // spoon
  (
    <g stroke={I} strokeWidth={sw} fill={CREAM} strokeLinecap="round">
      <ellipse cx="15" cy="14" rx="8" ry="10" />
      <path d="M20 22 30 34" fill="none" />
    </g>
  ),
  // berry
  (
    <g stroke={I} strokeWidth={sw} strokeLinejoin="round">
      <circle cx="20" cy="23" r="11" fill={BERRY} />
      <path d="M20 12c1-4 4-6 8-6-1 4-4 6-8 6Z" fill={LIME} />
    </g>
  ),
  // heart / love-your-gut
  (
    <path d="M20 34C8 26 5 19 8 13c2.4-4.6 8.6-4.4 12 .6 3.4-5 9.6-5.2 12-.6 3 6-0 13-12 21Z"
      fill={LIME} stroke={I} strokeWidth={sw} strokeLinejoin="round" />
  ),
];
const STEP = 60; // px of pointer travel between spawns

export default function CursorTrail() {
  const ref = useRef(null);
  const last = useRef({ x: 0, y: 0, seeded: false });
  const seq = useRef(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    // Touch devices fire pointermove during scroll — pointless trail + wasted work.
    if (!window.matchMedia('(pointer:fine)').matches) return;

    const onMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!last.current.seeded) {
        last.current = { x, y, seeded: true };
        return;
      }
      const dist = Math.hypot(x - last.current.x, y - last.current.y);
      if (dist < STEP) return;
      last.current = { x, y, seeded: true };
      const id = seq.current++;
      const art = id % tiles.length;
      setItems((prev) => [...prev.slice(-8), { id, x, y, art }]);
      setTimeout(() => setItems((prev) => prev.filter((p) => p.id !== id)), 420);
    };
    const onLeave = () => (last.current.seeded = false);

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-trail">
      <AnimatePresence>
        {items.map((it) => (
          <motion.span
            key={it.id}
            className="trail-tile"
            style={{ left: it.x, top: it.y }}
            initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 18 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
              {tiles[it.art]}
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
