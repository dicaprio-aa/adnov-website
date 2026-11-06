// ADNOV Legal Information Modal - Clean Light Theme
import { X, ShieldCheck } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export default function LegalModal({ isOpen, type, onClose }) {
  if (!isOpen) return null;

  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms & Conditions";

  return (
    <div
      className="legal-modal-backdrop-light"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title-light"
    >
      <div
        className="legal-modal-box-light"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="legal-header-light">
          <div className="legal-icon-wrap-light">
            <ShieldCheck size={20} className="shield-lime" />
            <h3 id="legal-title-light" className="legal-title-light">{title}</h3>
          </div>
          <button
            type="button"
            className="legal-close-light"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="legal-body-light">
          <p className="legal-date-light">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

          {isPrivacy ? (
            <div className="legal-text-light">
              <h4>1. Overview</h4>
              <p>
                At <strong>{siteConfig.fullName}</strong> ("ADNOV"), we respect your privacy and are committed
                to safeguarding any personal information you share with us through our website, project enquiry
                forms, or communication channels.
              </p>

              <h4>2. Information We Collect</h4>
              <p>
                We collect personal information that you voluntarily provide when submitting an inquiry or project brief,
                including your name, email address, telephone number, organization name, project requirements, and budget details.
              </p>

              <h4>3. How We Use Your Information</h4>
              <p>
                Your information is used strictly to evaluate project scope, formulate proposals, respond to inquiries,
                and provide our creative media and digital services. We never sell, lease, or monetize client data.
              </p>

              <h4>4. Data Security</h4>
              <p>
                We employ industry-standard encryption, secure cloud infrastructure, and access control protocols
                to protect your communications and project assets from unauthorized disclosure.
              </p>

              <h4>5. Contact Us</h4>
              <p>
                For questions regarding this policy, reach us directly at{" "}
                <a href={`mailto:${siteConfig.contact.officialEmail}`}>{siteConfig.contact.officialEmail}</a>.
              </p>
            </div>
          ) : (
            <div className="legal-text-light">
              <h4>1. Agreement to Terms</h4>
              <p>
                By accessing or using the services of <strong>{siteConfig.fullName}</strong> ("ADNOV"), you agree to
                be bound by these Terms &amp; Conditions and our standard project production agreements.
              </p>

              <h4>2. Intellectual Property</h4>
              <p>
                All brand identity assets, creative concepts, software code, and visual media created by ADNOV remain the
                exclusive intellectual property of ADNOV until full project payment and formal copyright assignment are completed.
              </p>

              <h4>3. Project Estimates &amp; Delivery</h4>
              <p>
                Timelines and cost estimates provided during preliminary consultations are subject to written confirmation
                upon finalization of the formal project scope and production schedule.
              </p>

              <h4>4. Client Deliverables &amp; Approvals</h4>
              <p>
                Clients agree to provide timely feedback, assets, and approvals necessary for ADNOV to maintain scheduled
                delivery dates for video production, web deployments, and live broadcasts.
              </p>

              <h4>5. Governing Law</h4>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction where ADNOV is registered.
              </p>
            </div>
          )}
        </div>

        <div className="legal-footer-light">
          <button type="button" className="btn-lime-primary" onClick={onClose}>
            <span>Understood &amp; Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
