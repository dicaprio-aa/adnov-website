// ADNOV Creative Work & Portfolio Section - Clean White/Light Slate Theme
import { useState, useEffect } from "react";
import { ArrowUpRight, Eye, Sparkles, X } from "lucide-react";
import { portfolioCategories, portfolioProjects } from "../data/portfolio";

export default function Portfolio({ onStartProject }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeLightboxProject, setActiveLightboxProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveLightboxProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? portfolioProjects
      : portfolioProjects.filter((item) => item.category === activeFilter);

  return (
    <section className="portfolio-section-light" id="work">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="section-pill-light">
            <span className="pill-dot-lime" />
            <span>03 / SELECTED WORK</span>
          </div>

          <h2 className="section-headline-light">
            Made with Vision.<br />
            <span className="headline-cyan-span">Remembered for Impact.</span>
          </h2>

          <p className="section-lead-light">
            Explore our curated portfolio spanning global hybrid broadcasts, luxury
            commercials, iconic brand identities, and high-performance digital flagships.
          </p>
        </div>

        {/* Category Filters */}
        <div className="portfolio-filters-light" role="tablist" aria-label="Portfolio Categories">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeFilter === cat}
              className={`filter-pill-light ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid-light">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="portfolio-card-light"
              onClick={() => setActiveLightboxProject(project)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveLightboxProject(project);
                }
              }}
            >
              <div className="portfolio-thumb-light">
                <img
                  src={project.image}
                  alt={project.title}
                  className="portfolio-img-light"
                  loading="lazy"
                />
                <div className="portfolio-overlay-light" />

                <div className="portfolio-top-pills-light">
                  <span className="cat-badge-light">{project.category}</span>
                  {project.stats && (
                    <span className="stats-badge-lime">{project.stats}</span>
                  )}
                </div>

                <div className="portfolio-bottom-info-light">
                  <span className="client-tag-light">{project.client} • {project.year}</span>
                  <h3 className="project-title-light">{project.title}</h3>
                  <div className="project-action-row-light">
                    <span>View Project</span>
                    <div className="eye-circle-lime">
                      <Eye size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="portfolio-bottom-banner-light">
          <div>
            <h3>Have an ambitious creative project in mind?</h3>
            <p>We build custom creative and production workflows for brands of every scale.</p>
          </div>
          <button
            type="button"
            className="btn-lime-primary"
            onClick={() => {
              if (onStartProject) onStartProject();
              else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Start a Project</span>
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>

      {/* Lightbox / Project Details Modal */}
      {activeLightboxProject && (
        <div
          className="lightbox-backdrop-light"
          onClick={() => setActiveLightboxProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title-light"
        >
          <div
            className="lightbox-box-light"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-light"
              onClick={() => setActiveLightboxProject(null)}
              aria-label="Close project preview"
            >
              <X size={22} />
            </button>

            <div className="lightbox-media-light">
              <img
                src={activeLightboxProject.image}
                alt={activeLightboxProject.title}
                className="lightbox-img-light"
              />
            </div>

            <div className="lightbox-details-light">
              <div className="lightbox-cat-row">
                <span className="lightbox-cat-badge">{activeLightboxProject.category}</span>
                <span className="lightbox-year-badge">{activeLightboxProject.year}</span>
              </div>

              <h3 id="lightbox-title-light" className="lightbox-title-light">
                {activeLightboxProject.title}
              </h3>

              <div className="lightbox-client-strip">
                <span className="lbl">Client / Partner:</span>
                <strong>{activeLightboxProject.client}</strong>
              </div>

              <p className="lightbox-desc-light">{activeLightboxProject.description}</p>

              {activeLightboxProject.stats && (
                <div className="lightbox-metric-box">
                  <span className="lbl">Key Result / Performance:</span>
                  <span className="val">{activeLightboxProject.stats}</span>
                </div>
              )}

              <div className="lightbox-tags-wrap">
                {activeLightboxProject.tags.map((tag, idx) => (
                  <span key={idx} className="lightbox-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="btn-lime-primary w-full mt-4"
                onClick={() => {
                  const cat = activeLightboxProject.category;
                  setActiveLightboxProject(null);
                  if (onStartProject) onStartProject(cat);
                  else {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span>Commission a Similar Project</span>
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
