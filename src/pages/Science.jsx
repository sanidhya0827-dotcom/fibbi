import { useRef } from 'react';
import { useReveals } from '../lib/useReveals';
import Icon from '../components/Icon';

export default function Science() {
  const ref = useRef(null);
  useReveals(ref);
  return (
    <div className="page active" ref={ref}>
      <section>
        <div className="wrap">
          <span className="kicker lime">the science <Icon name="atom" size="1em" /></span>
          <h1 className="sec-title">Clinically boring.<br />Effectively magic.</h1>
          <p className="lead">Psyllium husk is a soluble, gel-forming fiber studied for decades. We didn't invent the ingredient — we engineered the delivery.</p>
          <div className="sci-grid">
            <div>
              <div className="sci-card reveal">
                <h4>What 5g actually does</h4>
                <p>Psyllium absorbs many times its weight in water and forms a gel in your gut — supporting regularity and satiety. It's why your grandparents never missed a day. Most "fiber" snacks carry a sprinkle for the label; fibbi carries a functional dose, every serve.</p>
              </div>
              <div className="sci-card reveal" data-delay="1">
                <h4>The no-slime engineering <Icon name="flask" size="1em" /></h4>
                <p>Raw psyllium gels the moment it touches liquid — that's why it became a joke. In crunch and cup toppers, psyllium is baked inside oat clusters behind a fat barrier, so it stays crunchy in the bowl. In og, it's micro-cut and blended with acacia so it disperses clean instead of clumping. Gelling happens in your gut, where it's the entire point.</p>
              </div>
              <div className="sci-card reveal" data-delay="2">
                <h4>Why no added sugar</h4>
                <p>Dahi and fruit carry natural sugars; we don't add any on top, and we don't hide sweeteners behind "natural flavouring." Dates and fruit pulp do the sweetening. The label reads like a recipe.</p>
              </div>
            </div>
            <div className="reveal" data-delay="1">
              <div className="nutri">
                <span className="tape" aria-hidden="true"></span>
                <h5>Nutrition Facts</h5>
                <div className="nrow big"><span>fibbi crunch · per 35g serve</span><span></span></div>
                <div className="nrow"><span>Energy</span><span>142 kcal</span></div>
                <div className="nrow big"><span>Dietary fiber</span><span>5.2 g</span></div>
                <div className="nrow"><span>— psyllium (baked in)</span><span>3.8 g</span></div>
                <div className="nrow"><span>— oats &amp; seeds</span><span>1.4 g</span></div>
                <div className="nrow"><span>Added sugar</span><span>0 g</span></div>
                <div className="nrow"><span>Protein</span><span>3.6 g</span></div>
                <div className="nrow"><span>Sodium</span><span>38 mg</span></div>
                <p className="foot">Ingredients: rolled oats, psyllium husk, date paste, almond butter, pumpkin seeds, sunflower seeds. Six ingredients. That's the whole list. Drink water with your fiber.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
