import { useEffect, useState } from "react";
import "../IntroAnimation.css";

const letters = ["A", "D", "N", "O", "V"];
const particles = Array.from({ length: 18 }, (_, index) => index);

export default function IntroAnimation({ onComplete }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealDelay = reducedMotion ? 350 : 4300;
    const exitDelay = reducedMotion ? 180 : 650;

    const revealTimer = window.setTimeout(() => setLeaving(true), revealDelay);
    const completeTimer = window.setTimeout(onComplete, revealDelay + exitDelay);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`adnov-intro ${leaving ? "adnov-intro--leaving" : ""}`} role="presentation">
      <div className="adnov-intro__atmosphere" aria-hidden="true" />
      <div className="adnov-intro__grid" aria-hidden="true" />
      <div className="adnov-intro__particles" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle}
            style={{
              "--particle-x": `${7 + particle * 5.2}%`,
              "--particle-y": `${14 + (particle % 7) * 11}%`,
              "--particle-delay": `${particle * -0.19}s`,
              "--particle-duration": `${3 + (particle % 4) * 0.4}s`,
            }}
          />
        ))}
      </div>
      <div className="adnov-intro__liquid adnov-intro__liquid--left" aria-hidden="true" />
      <div className="adnov-intro__liquid adnov-intro__liquid--right" aria-hidden="true" />
      <div className="adnov-intro__beam adnov-intro__beam--cyan" aria-hidden="true" />
      <div className="adnov-intro__beam adnov-intro__beam--violet" aria-hidden="true" />
      <div className="adnov-intro__flare" aria-hidden="true" />
      <div className="adnov-intro__wordmark" role="img" aria-label="ADNOV">
        {letters.map((letter, index) => (
          <span
            className="adnov-intro__letter"
            key={letter}
            style={{ "--intro-index": index, "--intro-letter": `'${letter}'` }}
            data-letter={letter}
            aria-hidden="true"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="adnov-intro__floor" aria-hidden="true" />
    </div>
  );
}
