// ADNOV Hero Section
// Bright sky-blue & cyan gradient hero with realistic atmospheric cloud visuals,
// centered bold typography, lime-green CTA buttons, and floating 3D perspective cards.
import { useState } from "react";
import { ArrowUpRight, Play, Sparkles, Radio, Code2, Palette, ShieldCheck, ChevronDown } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export default function Hero({ onExploreServices, onWorkTogether }) {
  const [activeCardHover, setActiveCardHover] = useState(null);

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="sky-hero-section" id="home">
      {/* Realistic Multi-Layer Atmospheric Clouds & Sky Background */}
      <div className="sky-gradient-backdrop" aria-hidden="true" />
      
      {/* Sun glow / Ambient sky lighting */}
      <div className="sky-sun-glow" aria-hidden="true" />

      {/* Realistic Volumetric Cloud Layers */}
      <div className="clouds-layer clouds-layer-back" aria-hidden="true">
        <div className="cloud-shape cloud-1" />
        <div className="cloud-shape cloud-2" />
        <div className="cloud-shape cloud-3" />
      </div>

      <div className="clouds-layer clouds-layer-mid" aria-hidden="true">
        <div className="cloud-shape cloud-4" />
        <div className="cloud-shape cloud-5" />
      </div>

      <div className="clouds-layer clouds-layer-front" aria-hidden="true">
        <div className="cloud-shape cloud-6" />
        <div className="cloud-shape cloud-7" />
        <div className="cloud-mist-fog" />
      </div>

      <div className="hero-content-wrapper">
        {/* Top Centered Tagline Pill */}
        <div className="hero-pill-badge">
          <span className="pill-lime-dot" />
          <span className="pill-text">CREATIVE MEDIA &amp; DIGITAL SOLUTIONS</span>
          <span className="pill-divider">•</span>
          <span className="pill-highlight">WHERE INNOVATION MEETS SOLUTIONS</span>
        </div>

        {/* Large Centered Headline */}
        <h1 className="hero-centered-title">
          WE CREATE.<br />
          WE <span className="headline-white" style={{ color: "#FFFFFF" }}>INNOVATE.</span><br />
          WE INSPIRE.
        </h1>

        {/* Centered Supporting Paragraph */}
        <p className="hero-centered-subtitle">
          From creative ideas to powerful experiences. We turn your vision into
          something extraordinary through cinematic live broadcasting, luxury brand
          identities, high-performance web engineering, and full-funnel digital media.
        </p>

        {/* Lime-Green Accent Buttons */}
        <div className="hero-actions-centered">
          <button
            type="button"
            className="btn-lime-primary"
            onClick={() => (onWorkTogether ? onWorkTogether() : handleScrollTo("contact"))}
          >
            <span>Let's Work Together</span>
            <ArrowUpRight size={18} className="btn-icon" />
          </button>

          <button
            type="button"
            className="btn-sky-glass"
            onClick={() => (onExploreServices ? onExploreServices() : handleScrollTo("services"))}
          >
            <Sparkles size={17} className="btn-spark" />
            <span>Explore Our Services</span>
          </button>
        </div>

        {/* Floating 3D Perspective Cards Showcase */}
        <div className="hero-3d-cards-stage" aria-label="Featured Showcases">
          {/* Card 1: Live Broadcasting & Production (Tilted Left) */}
          <div
            className={`perspective-card card-left ${activeCardHover === "left" ? "hovered" : ""}`}
            onMouseEnter={() => setActiveCardHover("left")}
            onMouseLeave={() => setActiveCardHover(null)}
            onClick={() => handleScrollTo("services")}
            tabIndex={0}
            role="button"
            aria-label="Live Broadcasting & Production"
          >
            <div className="card-glass-sheen" />
            <div className="p-card-header">
              <div className="p-card-icon-box live-box">
                <Radio size={18} />
              </div>
              <span className="p-card-live-tag">
                <span className="live-blink-dot" /> LIVE 4K
              </span>
            </div>
            <div className="p-card-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80"
                alt="Live Broadcasting Production"
                className="p-card-thumb"
              />
              <div className="p-card-wave-overlay">
                <div className="sound-wave-bar" />
                <div className="sound-wave-bar" />
                <div className="sound-wave-bar" />
                <div className="sound-wave-bar" />
              </div>
            </div>
            <div className="p-card-info">
              <h4>Live Broadcasting</h4>
              <p>Multi-camera switching &amp; global hybrid streaming.</p>
              <div className="p-card-meta">
                <span className="p-stat">45K+ Viewers</span>
                <span className="p-badge">Ultra-Low Latency</span>
              </div>
            </div>
          </div>

          {/* Card 2: Centerpiece Marketing Card (Elevated Center) */}
          <div
            className={`perspective-card card-center ${activeCardHover === "center" ? "hovered" : ""}`}
            onMouseEnter={() => setActiveCardHover("center")}
            onMouseLeave={() => setActiveCardHover(null)}
            onClick={() => handleScrollTo("work")}
            tabIndex={0}
            role="button"
            aria-label="Marketing"
          >
            <div className="card-glass-sheen" />
            <div className="p-card-header">
              <div className="p-card-icon-box web-box">
                <Code2 size={20} />
              </div>
              <span className="p-card-center-badge">✦ FEATURED WORK</span>
            </div>
            <div className="p-card-img-wrap center-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
                alt="Marketing"
                className="p-card-thumb"
              />
              <div className="center-card-tag">Awwwards Nominee</div>
            </div>
            <div className="p-card-info">
              <h4>Marketing</h4>
              <p>Creative campaigns and digital marketing that help brands reach the right audience.</p>
              <div className="p-card-meta">
                <span className="lime-highlight-text">100% Core Web Vitals</span>
                <span className="p-badge">Full-Stack Cloud</span>
              </div>
            </div>
          </div>

          {/* Card 3: Creative Works (Tilted Right) */}
          <div
            className={`perspective-card card-right ${activeCardHover === "right" ? "hovered" : ""}`}
            onMouseEnter={() => setActiveCardHover("right")}
            onMouseLeave={() => setActiveCardHover(null)}
            onClick={() => handleScrollTo("services")}
            tabIndex={0}
            role="button"
            aria-label="Creative Works"
          >
            <div className="card-glass-sheen" />
            <div className="p-card-header">
              <div className="p-card-icon-box brand-box">
                <Palette size={18} />
              </div>
              <span className="p-card-rating">★ 5.0 RATED</span>
            </div>
            <div className="p-card-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80"
                alt="Creative Works"
                className="p-card-thumb"
              />
            </div>
            <div className="p-card-info">
              <h4>Creative Works</h4>
              <p>Creative visuals, photography, videography and designs that bring ideas to life.</p>
              <div className="p-card-meta">
                <span className="p-stat">10+ Disciplines</span>
                <span className="p-badge">Full Production</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-scroll-pill"
          onClick={() => handleScrollTo("partners")}
          role="button"
          tabIndex={0}
          aria-label="Scroll to client partners"
        >
          <span>EXPLORE AGENCY</span>
          <ChevronDown size={14} className="bounce-arrow" />
        </div>
      </div>

      {/* Client / Partner Logo Marquee Strip (Transitions sky hero into white background) */}
      <div className="client-partners-strip" id="partners">
        <div className="partners-container">
          <span className="partners-label">TRUSTED BY GLOBAL INNOVATORS &amp; VISIONARY BRANDS</span>
          <div className="partners-marquee-row">
            {[0, 1].map((copyIndex) => (
              <div
                className="partners-marquee-group"
                key={copyIndex}
                aria-hidden={copyIndex === 1 ? "true" : undefined}
              >
                {siteConfig.clientPartners.map((partner) => (
                  <div key={`${copyIndex}-${partner}`} className="partner-logo-item">
                    <span className="partner-dot" aria-hidden="true">✦</span>
                    <span className="partner-name">{partner}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
