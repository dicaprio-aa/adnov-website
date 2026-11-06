import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { clientProjects } from "../data/portfolio";

export default function OurClientsWork({ onStartProject }) {
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedClient(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const openClient = (client) => {
    setSelectedClient(client);
  };

  return (
    <section className="combined-work-section" id="work">
      <div className="section-container">
        <div className="section-header-centered combined-work-heading">
          <div className="section-pill-light">
            <span className="pill-dot-lime" />
            <span>OUR CLIENTS &amp; OUR WORK</span>
          </div>
          <h2 className="section-headline-light">
            Ideas become work.<br />
            <span className="headline-cyan-span">Work creates impact.</span>
          </h2>
          <p className="section-lead-light">
            Explore selected ADNOV clients and their creative work as verified project details become available.
          </p>
        </div>

        <div className="combined-client-grid">
          {clientProjects.map((client, index) => (
            <button
              type="button"
              className="combined-client-card"
              key={client.id}
              style={{ "--client-accent": client.accent, "--client-delay": `${index * 70}ms` }}
              onClick={() => openClient(client)}
              aria-label={`View ${client.name} case study placeholder`}
            >
              <span className="combined-client-logo" aria-hidden="true">
                <img src={client.logo} alt="" loading="lazy" />
              </span>
              <strong>{client.name}</strong>
              <span className="combined-client-type">ADNOV Client</span>
              <span className="combined-client-view">View case study <ArrowUpRight size={15} /></span>
            </button>
          ))}
        </div>

        <div className="combined-work-banner">
          <div>
            <span className="combined-work-kicker">YOUR NEXT PROJECT</span>
            <h3>Ready for work with your name on it?</h3>
            <p>ADNOV brings strategy, production and digital craft together under one team.</p>
          </div>
          <button
            type="button"
            className="btn-lime-primary"
            onClick={() => onStartProject ? onStartProject() : document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start a Project <ArrowUpRight size={17} />
          </button>
        </div>
      </div>

      {selectedClient && (
        <div
          className="combined-case-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="combined-case-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedClient(null);
          }}
        >
          <article className="combined-case-modal">
            <button
              type="button"
              className="combined-case-close"
              onClick={() => setSelectedClient(null)}
              aria-label="Close case study"
            >
              <X size={21} />
            </button>

            <div className="combined-case-head" style={{ "--client-accent": selectedClient.accent }}>
              <span className="combined-case-logo">
                <img src={selectedClient.logo} alt={`${selectedClient.name} logo`} />
              </span>
              <div>
                <span className="combined-case-label">ADNOV CLIENT</span>
                <h2 id="combined-case-title">{selectedClient.name}</h2>
              </div>
            </div>

            <div className="combined-case-body">
              {(selectedClient.category || selectedClient.location) && (
                <div className="combined-client-meta">
                  {selectedClient.category && <span><small>Category</small>{selectedClient.category}</span>}
                  {selectedClient.location && <span><small>Location</small>{selectedClient.location}</span>}
                </div>
              )}

              {selectedClient.introduction && (
                <section className="combined-client-profile-copy">
                  <h3>About the Business</h3>
                  <p>{selectedClient.introduction}</p>
                </section>
              )}

              {selectedClient.businessServices && (
                <section className="combined-client-profile-copy">
                  <h3>Business Services</h3>
                  <p>{selectedClient.businessServices}</p>
                </section>
              )}

              {selectedClient.services.length > 0 && (
                <section className="combined-client-adnov-services">
                  <h3>ADNOV Services</h3>
                  <div className="combined-case-services">
                    {selectedClient.services.map((service) => <span key={service}>{service}</span>)}
                  </div>
                </section>
              )}

              {selectedClient.projects.length > 0 && (
                <>
                  <h3>Project preview</h3>
                  <div className="combined-case-projects">
                    {selectedClient.projects.map((project) => (
                      <article key={project.title} className="combined-case-project">
                        <div className="combined-case-image-wrap">
                          <img src={project.image} alt={`Placeholder preview for ${project.title}`} loading="lazy" />
                          <span>{project.type}</span>
                        </div>
                        <div>
                          <h4>{project.title}</h4>
                          <p>{project.description}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}

              {selectedClient.instagram && (
                <a
                  href={selectedClient.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="combined-case-instagram"
                >
                  View Instagram <ArrowUpRight size={17} />
                </a>
              )}

              <button
                type="button"
                className="btn-lime-primary combined-case-cta"
                onClick={() => {
                  setSelectedClient(null);
                  if (onStartProject) onStartProject(selectedClient.services[0] || "");
                  else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Commission a Similar Project <ArrowUpRight size={17} />
              </button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
