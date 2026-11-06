// ADNOV About Section: "Ideas Become Experiences"
// Clean white background, modern centered headline, metric cards with lime-green highlights
import { ArrowUpRight, Compass, Eye, Target, ShieldCheck, Award, Zap, CheckCircle2 } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export default function About({ onGetInTouch }) {
  const pillars = [
    {
      icon: Target,
      title: "Our Mission",
      desc: "To empower visionary brands and creators by translating complex ideas into captivating visual narratives, scalable digital products, and high-impact live broadcasts.",
      tag: "PURPOSE-DRIVEN",
    },
    {
      icon: Eye,
      title: "Our Vision",
      desc: "To be the world's most trusted multidisciplinary creative nexus — where cinematic artistry converges seamlessly with modern software engineering.",
      tag: "FUTURE-FORWARD",
    },
    {
      icon: Compass,
      title: "Our Creative Approach",
      desc: "We operate at the intersection of imagination and execution. Every project begins with strategic research, undergoes obsessive art direction, and culminates in flawless delivery.",
      tag: "360° PIPELINE",
    },
  ];

  return (
    <section className="about-section-light" id="about">
      <div className="section-container">
        {/* Section Pill & Centered Header */}
        <div className="section-header-centered">
          <div className="section-pill-light">
            <span className="pill-dot-lime" />
            <span>01 / WHO WE ARE</span>
          </div>

          <h2 className="section-headline-light">
            Ideas Become <span className="headline-cyan-span">Experiences.</span>
          </h2>

          <p className="section-lead-light">
            We are <strong>ADNOV</strong> — an international creative media and digital solutions studio
            passionate about turning ambitious concepts into memorable realities. We don't just produce content;
            we engineer visual ecosystems that demand attention and spark enduring loyalty.
          </p>
        </div>

        {/* 4 Key Metric Cards */}
        <div className="about-metrics-grid">
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className="metric-card-light">
              <div className="metric-top-row">
                <span className="metric-num-light">{stat.value}</span>
                <span className="metric-sparkle-dot" />
              </div>
              <span className="metric-lbl-light">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* 3 Core Pillars in Premium Rounded Cards */}
        <div className="about-pillars-grid">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="pillar-card-light">
                <div className="pillar-header-row">
                  <div className="pillar-icon-box-light">
                    <Icon size={24} />
                  </div>
                  <span className="pillar-tag-lime">{pillar.tag}</span>
                </div>
                <h3 className="pillar-title-light">{pillar.title}</h3>
                <p className="pillar-desc-light">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Lime CTA */}
        <div className="about-bottom-strip">
          <div className="about-strip-text">
            <ShieldCheck size={26} className="strip-shield-icon" />
            <div>
              <h4>One Unified Studio. Infinite Possibilities.</h4>
              <p>Eliminate fragmented agencies. ADNOV handles broadcast, film, branding, and web under one roof.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn-lime-primary"
            onClick={() => {
              if (onGetInTouch) onGetInTouch();
              else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Let's Create Together</span>
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
