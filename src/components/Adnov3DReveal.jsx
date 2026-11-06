import "../AdnovReveal.css";

const letters = ["A", "D", "N", "O", "V"];

export default function Adnov3DReveal() {
  return (
    <div className="adnov-reveal" role="img" aria-label="ADNOV">
      <div className="adnov-reveal__stage" aria-hidden="true">
        <div className="adnov-reveal__light" />
        {letters.map((letter, index) => (
          <span
            key={letter}
            className="adnov-reveal__letter"
            style={{ "--letter-index": index }}
            title={letter}
          />
        ))}
      </div>
    </div>
  );
}
