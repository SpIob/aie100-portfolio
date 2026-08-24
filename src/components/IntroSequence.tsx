import { BOOT_LINES } from "../data";

interface IntroSequenceProps {
  onSkip: () => void;
}

export function IntroSequence({ onSkip }: IntroSequenceProps) {
  return (
    <div className="intro-layer grid-bg" aria-hidden="true">
      <div className="intro-top">
        <span>Plotting route — Quarter One</span>
        <button className="skip-btn" onClick={onSkip}>
          Skip intro →
        </button>
      </div>

      <div className="map-stage">
        <div className="map-frame">
          <svg
            className="map-svg"
            viewBox="0 0 900 380"
            role="img"
            aria-label="Route drawing from Valenzuela City to Mapúa University, Intramuros"
          >
            <path
              className="route-path"
              d="M60,300 C220,230 320,340 460,230 C600,140 680,180 830,70"
              pathLength="100"
            />
            <circle className="dot-start" cx="60" cy="300" r="6" />
            <circle className="dot-mid a" cx="330" cy="268" r="4" />
            <circle className="dot-mid b" cx="600" cy="168" r="4" />
            <g className="pin-end">
              <circle className="pin-ring" cx="830" cy="70" r="9" />
              <circle className="pin-core" cx="830" cy="70" r="7" />
              <circle className="pin-core-inner" cx="830" cy="70" r="3" />
            </g>
          </svg>
          <span className="map-label start">Valenzuela City</span>
          <span className="map-label end">Mapúa — Intramuros</span>
        </div>
      </div>

      <div className="boot-log">
        {BOOT_LINES.map((line) => (
          <span key={line}>{line}</span>
        ))}
        <span>
          READY<span className="cursor-blink" />
        </span>
      </div>
    </div>
  );
}
