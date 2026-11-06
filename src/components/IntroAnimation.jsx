import { useEffect, useState } from "react";
import "../IntroAnimation.css";

const letters = ["A", "D", "N", "O", "V"];

export default function IntroAnimation({ onComplete }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealDelay = reducedMotion ? 350 : 3000;
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
      <div className="adnov-intro__beam" aria-hidden="true" />
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
    </div>
  );
}
