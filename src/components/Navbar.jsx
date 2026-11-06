
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

export default function Navbar({ onNavigateToContact }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = [
        "home",
        "about",
        "services",
        "work",
        "why-us",
        "team",
        "testimonials",
        "contact"
      ];

      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);

        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Our Work", href: "#work", id: "work" },
    { label: "Why ADNOV", href: "#why-us", id: "why-us" },
    { label: "Our Team", href: "#team", id: "team" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`navbar-header-light ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">

        {/* Official ADNOV Logo */}
        <a
          href="#home"
          className="brand-logo-light"
          onClick={(e) => handleLinkClick(e, "#home")}
        >
          <img
            src="/adnov.png"
            alt="ADNOV - WHERE CREATIVITY MEETS INNOVATION"
            className="adnov-logo-image"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav-light" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link-light ${activeSection === link.id ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}

              {activeSection === link.id && (
                <span className="nav-lime-indicator" />
              )}
            </a>
          ))}
        </nav>

        {/* Action Button and Mobile Toggle */}
        <div className="navbar-actions">
          <a
            href="#contact"
            className="btn-lime-nav"
            onClick={handleContactClick}
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={16} className="cta-arrow" />
          </a>

          <button
            type="button"
            className="mobile-menu-toggle-light"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer-light ${menuOpen ? "open" : ""}`}>
        <div
          className="mobile-nav-backdrop-light"
          onClick={() => setMenuOpen(false)}
        />

        <div className="mobile-nav-content-light">

          {/* Mobile Official Logo */}
          <div className="mobile-nav-header-light">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
            >
              <img
                src="/adnov.png"
                alt="ADNOV"
                className="adnov-logo-image"
              />
            </a>

            <button
              type="button"
              className="mobile-close-btn-light"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="mobile-nav-links-light">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`mobile-nav-link-light ${activeSection === link.id ? "active" : ""}`}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                <span>{link.label}</span>
                <ArrowUpRight
                  size={18}
                  className="mobile-link-icon-light"
                />
              </a>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mobile-nav-footer-light">
            <div className="mobile-cta-box-light">
              <p className="mobile-cta-title-light">
                Ready to transform your vision?
              </p>

              <a
                href="#contact"
                className="btn-lime-primary w-full text-center"
                onClick={handleContactClick}
              >
                <Sparkles size={16} />
                Let's Work Together
              </a>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
