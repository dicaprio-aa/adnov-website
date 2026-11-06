// ADNOV Services Section - Clean White Background, Centered Headline, 10 Disciplines
import { useState } from "react";
import { ArrowUpRight, X, Sparkles, CheckCircle2 } from "lucide-react";
import { servicesData } from "../data/services";
import ServiceCard from "./ServiceCard";

export default function Services({ onSelectServiceForEnquiry }) {
  const [selectedDetailService, setSelectedDetailService] = useState(null);

  const handleEnquire = (serviceName) => {
    if (onSelectServiceForEnquiry) {
      onSelectServiceForEnquiry(serviceName);
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="services-section-light" id="services">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="section-pill-light">
            <span className="pill-dot-lime" />
            <span>02 / OUR SERVICES</span>
          </div>

          <h2 className="section-headline-light">
            One Unified Partner.<br />
            <span className="headline-cyan-span">Ten Specialized Disciplines.</span>
          </h2>

          <p className="section-lead-light">
            From multi-cam broadcast trucks and cinematic commercials to full-stack web platforms
            and iconic brand identities, explore our full suite of creative solutions.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="services-grid-light">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEnquire={handleEnquire}
              onOpenDetail={(srv) => setSelectedDetailService(srv)}
            />
          ))}
        </div>
      </div>

      {/* Service Detail Modal (Clean White & Slate) */}
      {selectedDetailService && (
        <div
          className="service-modal-backdrop-light"
          onClick={() => setSelectedDetailService(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title-light"
        >
          <div
            className="service-modal-box-light"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="service-modal-close-light"
              onClick={() => setSelectedDetailService(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="modal-header-light">
              <span className="modal-num-badge-light">{selectedDetailService.number}</span>
              <h3 id="modal-title-light" className="modal-title-light">{selectedDetailService.title}</h3>
              <p className="modal-tagline-light">{selectedDetailService.tagline}</p>
            </div>

            <p className="modal-desc-light">{selectedDetailService.details}</p>

            <div className="modal-features-box-light">
              <h4 className="modal-features-title-light">Capabilities &amp; Deliverables</h4>
              <ul className="modal-features-list-light">
                {selectedDetailService.features.map((item, idx) => (
                  <li key={idx} className="modal-feature-item-light">
                    <CheckCircle2 size={16} className="modal-check-lime" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="btn-lime-primary w-full text-center"
              onClick={() => {
                const sName = selectedDetailService.title;
                setSelectedDetailService(null);
                handleEnquire(sName);
              }}
            >
              <span>Enquire About {selectedDetailService.title}</span>
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
