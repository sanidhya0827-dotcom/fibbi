import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Icon from './Icon';

const links = [
  ['/', 'home'],
  ['/shop', 'shop'],
  ['/science', 'the science'],
  ['/story', 'our story'],
  ['/play', 'play'],
];

export default function Topbar() {
  const { count, openCart } = useCart();
  return (
    <header className="topbar">
      <Link className="logo" to="/">
        fibbi<span className="spark">*</span>
      </Link>
      <nav className="nav" aria-label="Main">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="top-actions">
        <button className="cart-btn" onClick={openCart}>
          <Icon name="cart" size="1.05em" /> cart
          {count > 0 && (
            <span key={count} className="cart-count bump" style={{ display: 'flex' }}>
              {count}
            </span>
          )}
        </button>
        <Link className="btn btn-primary btn-sm" to="/shop">
          shop
        </Link>
      </div>
    </header>
  );
}
