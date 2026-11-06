// ADNOV Floating WhatsApp Button
// Direct high-priority client access with pulsing beacon and interactive tooltip
import { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { WhatsAppIcon } from "./SocialIcons";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappDefaultMessage
  )}`;

  return (
    <div
      className="whatsapp-float-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Floating Tooltip */}
      <div className={`whatsapp-tooltip ${showTooltip ? "visible" : ""}`}>
        <span className="tooltip-title">Chat with ADNOV</span>
        <span className="tooltip-sub">Instant Creative Advisory</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Contact ADNOV on WhatsApp"
      >
        <span className="whatsapp-pulse-ring" />
        <WhatsAppIcon size={26} className="whatsapp-icon-svg" />
      </a>
    </div>
  );
}
