import { useCart } from '../context/CartContext';
import AddButton from './AddButton';
import Icon from './Icon';

export default function MobileCta() {
  const { count, openCart } = useCart();
  return (
    <div className="mobile-cta" aria-label="Quick buy">
      <AddButton id="crunch-berry-200" className="btn btn-primary">
        add crunch · ₹249
      </AddButton>
      <button className="m-cart" onClick={openCart} aria-label="Open cart">
        <Icon name="cart" size={24} />
        {count > 0 && (
          <span className="m-count" style={{ display: 'flex' }}>
            {count}
          </span>
        )}
      </button>
    </div>
  );
}
