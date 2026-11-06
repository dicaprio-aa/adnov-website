// ADNOV Location & Google Maps Section - Clean White & Cyan Theme
import { MapPin, Navigation, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export default function MapSection() {
  return (
    <section className="location-section-light" id="location">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="section-pill-light">
            <span className="pill-dot-lime" />
            <span>08 / VISIT OUR STUDIO</span>
          </div>

          <h2 className="section-headline-light">
            Where Innovation Lives.<br />
            <span className="headline-cyan-span">Visit Our Creative Studio.</span>
          </h2>

          <p className="section-lead-light">
            Drop by for a coffee and project workshop, or schedule an in-person production briefing.
          </p>
        </div>

        {/* Map & Location Info Layout */}
        <div className="location-grid-light">
          {/* Left Column: Info Card */}
          <div className="location-card-light">
            <div className="location-header-light">
              <div className="loc-icon-box-light">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="loc-title-light">{siteConfig.name} Studio Headquarters</h3>
                <span className="loc-sub-light">Creative Media &amp; Production Facility</span>
              </div>
            </div>

            <div className="location-items-list-light">
              <div className="loc-item-light">
                <span className="loc-label-lime">Studio Address</span>
                <p className="loc-val-light">{siteConfig.location.addressLine1}</p>
                <p className="loc-val-light">{siteConfig.location.addressLine2}</p>
                <p className="loc-val-light">
                  {siteConfig.location.city}, {siteConfig.location.state} {siteConfig.location.zipCode}, {siteConfig.location.country}
                </p>
              </div>

              <div className="loc-item-light">
                <span className="loc-label-lime">Studio Hours</span>
                <p className="loc-val-light">{siteConfig.location.businessHours}</p>
                <p className="loc-val-light">{siteConfig.location.weekendHours}</p>
              </div>

              <div className="loc-item-light">
                <span className="loc-label-lime">Direct Contacts</span>
                <p className="loc-val-light">
                  <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phoneDisplay}</a>
                </p>
                <p className="loc-val-light">
                  <a href={`mailto:${siteConfig.contact.officialEmail}`}>{siteConfig.contact.officialEmail}</a>
                </p>
              </div>
            </div>

            <a
              href={siteConfig.location.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime-primary w-full text-center"
            >
              <Navigation size={16} />
              <span>Get Directions on Google Maps</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Right Column: Responsive Google Maps Iframe */}
          <div className="location-map-wrap-light">
            <iframe
              title="ADNOV Studio Location"
              src={siteConfig.location.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-iframe-light"
            />
            <div className="map-badge-light">
              <span className="map-lime-pulsar" />
              <span>Studio Open for Client Sessions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
