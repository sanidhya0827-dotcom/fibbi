import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <div>
          <div className="f-logo">fibbi<span style={{ color: 'var(--lime)' }}>*</span></div>
          <p style={{ marginTop: 10, fontSize: 13.5, maxWidth: '34ch' }}>
            Real-dose fiber, engineered for people who'd rather not think about fiber. Made in Pune. <Icon name="box" />
          </p>
        </div>
        <div>
          <h5>site</h5>
          <Link to="/shop">shop</Link>
          <Link to="/science">the science</Link>
          <Link to="/story">our story</Link>
          <Link to="/play">play</Link>
        </div>
        <div>
          <h5>the fine print</h5>
          <Link to="/policies">shipping policy</Link>
          <Link to="/policies">returns &amp; refunds</Link>
          <Link to="/policies">payments</Link>
          <Link to="/policies">contact &amp; grievances</Link>
          <Link to="/science">nutrition &amp; ingredients</Link>
          <div className="foot-legal">
            fibbi · made in pune<br />
            Baner, Pune 411045, MH<br />
            care@fibbi.in · +91 90000 00000
          </div>
        </div>
      </div>
      <div className="foot-pay" aria-label="Accepted payment methods">
        <span>UPI</span><span>GPay</span><span>PhonePe</span><span>Paytm</span><span>VISA</span><span>Mastercard</span><span>RuPay</span><span>Amex</span><span>NetBanking</span><span>COD</span><span><Icon name="lock" size="1em" /> SSL secure</span>
      </div>
      <div className="foot-fine">
        © 2026 fibbi · psyllium is a food, not a medicine — we make no disease claims, just very regular ones. drink plenty of water with your fiber.
      </div>
    </footer>
  );
}
