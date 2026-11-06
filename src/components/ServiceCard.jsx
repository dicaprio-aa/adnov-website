// ADNOV Interactive Service Card - Clean White & Cyan Theme with Lime Accents
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ServiceCard({ service, onEnquire, onOpenDetail }) {
  const Icon = service.icon;
  const isSpecial = service.isSpecial;

  return (
    <article
      className={`service-card-light ${isSpecial ? "service-card-light-special" : ""}`}
      tabIndex={0}
      role="region"
      aria-label={service.title}
    >
      <div className="s-card-top-light">
        <span className="s-card-number-light">{service.number}</span>
        <div className="s-card-icon-wrap-light">
          <Icon size={24} className="s-card-icon-light" />
        </div>
      </div>

      <div className="s-card-body-light">
        <h3 className="s-card-title-light">{service.title}</h3>
        <span className="s-card-tagline-light">{service.tagline}</span>
        <p className="s-card-desc-light">{service.shortDesc}</p>

        <ul className="s-card-features-light">
          {service.features.map((feature, idx) => (
            <li key={idx} className="s-feature-item-light">
              <CheckCircle2 size={15} className="s-check-lime" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="s-card-footer-light">
        <button
          type="button"
          className="s-enquire-btn-light"
          onClick={() => onEnquire(service.title)}
          aria-label={`Enquire about ${service.title}`}
        >
          <span>{isSpecial ? "Discuss Custom Project" : "Enquire Now"}</span>
          <ArrowUpRight size={16} className="s-arrow-icon" />
        </button>

        {service.details && (
          <button
            type="button"
            className="s-details-btn-light"
            onClick={() => onOpenDetail(service)}
            aria-label={`View details about ${service.title}`}
          >
            Details
          </button>
        )}
      </div>
    </article>
  );
}
