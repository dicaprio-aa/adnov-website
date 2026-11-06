// ADNOV Meet Our Team Section - Clean White & Cyan Theme with Lime Accents
import { ArrowUpRight, UserCheck } from "lucide-react";
import { teamMembers } from "../data/team";
import {
  LinkedInIcon,
  InstagramIcon,
  XTwitterIcon,
  BehanceIcon,
} from "./SocialIcons";

export default function Team({ onWorkWithTeam }) {
  return (
    <section className="team-section-light" id="team">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="section-pill-light">
            <span className="pill-dot-lime" />
            <span>05 / THE MINDS BEHIND ADNOV</span>
          </div>

          <h2 className="section-headline-light">
            Creative Visionaries.<br />
            <span className="headline-cyan-span">Technical Masters.</span>
          </h2>

          <p className="section-lead-light">
            Great work is born from diverse perspectives. Meet the creative directors,
            cinematographers, brand architects, and engineers powering ADNOV.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="team-grid-light">
          {teamMembers.map((member) => (
            <article key={member.id} className="team-card-light">
              <div className="team-img-wrapper-light">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="team-photo-light"
                  loading="lazy"
                />
                <span className="team-dept-pill-light">{member.department}</span>
              </div>

              <div className="team-content-light">
                <h3 className="team-name-light">{member.name}</h3>
                <span className="team-role-lime">{member.role}</span>
                <p className="team-bio-light">{member.bio}</p>

                <div className="team-specialty-strip-light">
                  <span className="lbl">Specialty:</span>
                  <span className="val">{member.specialty}</span>
                </div>

                <div className="team-socials-light">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-social-btn-light"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedInIcon size={16} />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-social-btn-light"
                      aria-label={`${member.name} Instagram`}
                    >
                      <InstagramIcon size={16} />
                    </a>
                  )}
                  {member.socials.behance && (
                    <a
                      href={member.socials.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-social-btn-light"
                      aria-label={`${member.name} Behance`}
                    >
                      <BehanceIcon size={16} />
                    </a>
                  )}
                  {member.socials.x && (
                    <a
                      href={member.socials.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-social-btn-light"
                      aria-label={`${member.name} X (Twitter)`}
                    >
                      <XTwitterIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Join our roster callout */}
        <div className="team-bottom-banner-light">
          <div>
            <h4>Want to collaborate with our creative leads?</h4>
            <p>We partner with ambitious founders, enterprises, and visionary creators worldwide.</p>
          </div>
          <button
            type="button"
            className="btn-lime-primary"
            onClick={() => {
              if (onWorkWithTeam) onWorkWithTeam();
              else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Work With Our Team</span>
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
