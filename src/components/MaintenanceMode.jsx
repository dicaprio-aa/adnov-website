import "./MaintenanceMode.css";

export default function MaintenanceMode() {
  return (
    <main className="maintenance-screen" aria-labelledby="maintenance-title">
      <div className="maintenance-glow maintenance-glow-cyan" aria-hidden="true" />
      <div className="maintenance-glow maintenance-glow-blue" aria-hidden="true" />
      <div className="maintenance-content">
        <div className="maintenance-brand" aria-label="ADNOV">
          <span className="maintenance-brand-mark" aria-hidden="true">A</span>
          <span>ADNOV</span>
        </div>
        <div className="maintenance-rule" aria-hidden="true"><span /></div>
        <p className="maintenance-kicker">A BETTER EXPERIENCE IS ON ITS WAY</p>
        <h1 id="maintenance-title">UNDER<br className="maintenance-mobile-break" /> MAINTENANCE</h1>
        <p className="maintenance-message">We're working behind the scenes to bring you a better digital experience.</p>
        <p className="maintenance-return">We'll be back soon!</p>
        <div className="maintenance-status" aria-label="Maintenance in progress">
          <span className="maintenance-status-dot" />
          <span>UPGRADING OUR DIGITAL SPACE</span>
        </div>
      </div>
      <div className="maintenance-footer">CREATIVE MEDIA <span>•</span> DIGITAL SOLUTIONS</div>
    </main>
  );
}
