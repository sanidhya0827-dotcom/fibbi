import { NavLink } from 'react-router-dom';

const links = [
  ['/', 'home'],
  ['/shop', 'shop'],
  ['/science', 'science'],
  ['/story', 'story'],
  ['/play', 'play'],
];

export default function MobileNav() {
  return (
    <nav className="m-nav" aria-label="Mobile">
      {links.map(([to, label]) => (
        <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
