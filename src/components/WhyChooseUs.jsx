// ADNOV Why Choose Us Section - Clean White & Cyan Theme with Lime Accents
import {
  Lightbulb,
  Workflow,
  Award,
  Layers,
  HeartHandshake,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

export default function WhyChooseUs({ onConsultationClick }) {
  const pillars = [
    {
      icon: Lightbulb,
      title: "Creative Thinking",
      tagline: "Concepts That Defy Conformity",
      description:
        "We never settle for generic templates. Every script, visual identity, and interface is custom-conceptualized from first principles to reflect your brand's unique soul.",
    },
    {
      icon: Workflow,
      title: "Professional Execution",
      tagline: "Disciplined Studio Craftsmanship",
      description:
        "From cinema-grade production crews and calibrated broadcast vans to structured software sprints, our execution is systematic, transparent, and rock-solid.",
    },
    {
      icon: Award,
      title: "Quality-Focused Delivery",
      tagline: "Zero Compromises on Detail",
      description:
        "Obsessive color grading, crisp spatial audio master tracks, pixel-perfect responsive layouts, and rigorous multi-stage QA ensure every asset is world-class.",
    },
    {
      icon: Layers,
      title: "Multiple Services Under One Roof",
      tagline: "A Unified Creative Ecosystem",
      description:
        "Eliminate fragmented agencies and disjointed vendor chains. From live multi-cam broadcasting and branding to full-stack web development, ADNOV unifies it all.",
    },
    {
      icon: HeartHandshake,
      title: "Client-Focused Solutions",
      tagline: "Your Vision is Our North Star",
      description:
        "We build genuine partnerships. Clear communication channels, adaptive milestone planning, and dedicated creative leads keep you in command every step.",
    },
    {
      icon: Cpu,
      title: "Innovative Approach",
      tagline: "Future-Ready Technology",
      description:
        "We actively harness 3D WebGL, generative motion design, cloud live switching, and data-driven digital marketing to give you an unfair competitive edge.",
    },
  ];

  return (
    <section className="why-us-section-light" id="why-us">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="section-pill-light">
            <span className="pill-dot-lime" />
            <span>04 / THE ADNOV ADVANTAGE</span>
          </div>

          <h2 className="section-headline-light">
            Why Visionary Brands<br />
            <span className="headline-cyan-span">Choose ADNOV.</span>
          </h2>

          <p className="section-lead-light">
            We merge boundless artistic expression with enterprise-grade engineering discipline
            to deliver results that redefine international benchmarks.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="why-us-grid-light">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <article key={idx} className="why-card-light">
                <div className="why-card-top-row">
                  <div className="why-icon-box-light">
                    <Icon size={24} />
                  </div>
                  <span className="why-num-light">0{idx + 1}</span>
                </div>
                <h3 className="why-title-light">{pillar.title}</h3>
                <span className="why-tagline-lime">{pillar.tagline}</span>
                <p className="why-desc-light">{pillar.description}</p>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="why-bottom-banner-light">
          <div>
            <h4>Ready to experience the ADNOV standard?</h4>
            <p>Schedule a discovery session with our creative leads today.</p>
          </div>
          <button
            type="button"
            className="btn-lime-primary"
            onClick={() => {
              if (onConsultationClick) onConsultationClick();
              else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Book a Discovery Call</span>
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
