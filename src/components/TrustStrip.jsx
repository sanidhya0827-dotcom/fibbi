import Icon from './Icon';

export default function TrustStrip() {
  return (
    <div className="trust-strip" aria-label="Why shop with us">
      <div className="ts"><span className="ts-e"><Icon name="truck" size={26} /></span><span>pan-india delivery<small>2–4 days metros · 4–7 rest</small></span></div>
      <div className="ts"><span className="ts-e"><Icon name="lock" size={26} /></span><span>secure payments<small>UPI · cards · netbanking · COD</small></span></div>
      <div className="ts"><span className="ts-e"><Icon name="return" size={26} /></span><span>easy replacements<small>damaged or wrong item, 48h</small></span></div>
      <div className="ts"><span className="ts-e"><Icon name="leaf" size={26} /></span><span>clean label<small>small-batch baked · no preservatives</small></span></div>
    </div>
  );
}
