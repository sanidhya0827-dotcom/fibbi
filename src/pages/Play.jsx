import Game from '../components/Game';
import Icon from '../components/Icon';

export default function Play() {
  return (
    <div className="page active">
      <section>
        <div className="wrap">
          <span className="kicker lime">play <Icon name="gamepad" size="1em" /></span>
          <h2 className="sec-title">The fibermaxxing game.</h2>
          <p className="lead">Catch 30 seconds of clusters, dodge the sugar cubes, screenshot your tier. 25g+ makes you a certified fibermaxxer.</p>
          <Game />
        </div>
      </section>
    </div>
  );
}
