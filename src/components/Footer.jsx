// ADNOV Footer Component - High-Contrast Deep Slate with Lime Accents
import { useState } from "react";
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { servicesData } from "../data/services";
import {
  InstagramIcon,
  WhatsAppIcon,
  LinkedInIcon,
  YouTubeIcon,
  XTwitterIcon,
  BehanceIcon,
} from "./SocialIcons";
import LegalModal from "./LegalModal";

export default function Footer({ onSelectService }) {
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: "privacy" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About Agency", href: "#about" },
    { label: "Creative Services", href: "#services" },
    { label: "Portfolio Work", href: "#work" },
    { label: "Why ADNOV", href: "#why-us" },
    { label: "Creative Team", href: "#team" },
    { label: "Studio Location", href: "#location" },
    { label: "Project Enquiry", href: "#contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer-root-modern">
      <div className="section-container">
        {/* Top CTA Banner */}
        <div className="footer-cta-card-modern">
          <div className="footer-cta-text-modern">
            <span className="footer-lime-pill">✦ ELEVATE YOUR BRAND</span>
            <h2>Let's build something extraordinary.</h2>
            <p>Ready to start your next broadcast, cinematic film, brand identity, or digital platform?</p>
          </div>
          <a
            href="#contact"
            className="btn-lime-primary footer-cta-btn-modern"
            onClick={(e) => handleLinkClick(e, "#contact")}
          >
            <span>Start Your Project</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* 4 Column Main Footer Grid */}
        <div className="footer-grid-modern">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col-modern footer-col-brand-modern">
            <a href="#home" className="footer-logo-modern" onClick={(e) => handleLinkClick(e, "#home")}>
              <img
                src="/adnov.png"
                alt="ADNOV Innovative Solutions"
                className="footer-adnov-logo-modern"
              />
              <span className="footer-logo-tagline-modern">{siteConfig.tagline}</span>
            </a>

            <p className="footer-desc-modern">
              ADNOV is a full-service creative media, production, branding, and digital solutions
              agency. We turn bold ideas into high-impact visual stories and scalable digital platforms.
            </p>

            <div className="footer-socials-row-modern">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn-modern"
                aria-label="ADNOV Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn-modern"
                aria-label="ADNOV WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn-modern"
                aria-label="ADNOV LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn-modern"
                aria-label="ADNOV YouTube"
              >
                <YouTubeIcon size={18} />
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn-modern"
                aria-label="ADNOV X (Twitter)"
              >
                <XTwitterIcon size={18} />
              </a>
              <a
                href={siteConfig.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn-modern"
                aria-label="ADNOV Behance"
              >
                <BehanceIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col-modern">
            <h4 className="footer-col-title-modern">Navigation</h4>
            <ul className="footer-links-list-modern">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="footer-col-modern">
            <h4 className="footer-col-title-modern">Our Services</h4>
            <ul className="footer-links-list-modern">
              {servicesData.slice(0, 8).map((srv) => (
                <li key={srv.id}>
                  <button
                    type="button"
                    className="f-srv-btn-modern"
                    onClick={() => {
                      if (onSelectService) onSelectService(srv.title);
                      else {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#services"
                  className="f-all-srv-modern"
                  onClick={(e) => handleLinkClick(e, "#services")}
                >
                  View All 10 Disciplines →
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="footer-col-modern">
            <h4 className="footer-col-title-modern">Get in Touch</h4>
            <div className="footer-contacts-stack-modern">
              <div className="f-item-modern">
                <Mail size={16} className="f-icon-lime" />
                <a href="mailto:adnovinnovations@gmail.com">
                  adnovinnovations@gmail.com
                </a>
              </div>
              <div className="f-item-modern f-item-phone-modern">
                <Phone size={16} className="f-icon-lime" />
                <span className="footer-phone-links-modern">
                  <a href="tel:+918137803065">+91 81378 03065</a>
                  <a href="tel:+919744754648">+91 97447 54648</a>
                </span>
              </div>
              <div className="f-item-modern">
                <MapPin size={16} className="f-icon-lime" />
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=8.957576891100988,76.83979217501819"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ayoor, Kollam, Kerala
                </a>
              </div>
            </div>

            <div className="footer-tagline-badge-modern">
              <Sparkles size={14} className="lime-spark-icon" />
              <span>Where Innovation Meets Solutions</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="footer-bottom-row-modern">
          <p className="copyright-modern">
            © {new Date().getFullYear()} {siteConfig.name} Creative Media &amp; Digital Solutions.
            All rights reserved.
          </p>

          <div className="footer-legal-links-modern">
            <button
              type="button"
              className="legal-link-modern"
              onClick={() => setLegalModal({ isOpen: true, type: "privacy" })}
            >
              Privacy Policy
            </button>
            <span className="dot">•</span>
            <button
              type="button"
              className="legal-link-modern"
              onClick={() => setLegalModal({ isOpen: true, type: "terms" })}
            >
              Terms &amp; Conditions
            </button>
          </div>

          <button
            type="button"
            className="scroll-top-btn-modern"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={() => setLegalModal({ isOpen: false, type: "privacy" })}
      />
    </footer>
  );
}
