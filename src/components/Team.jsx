// ADNOV Meet Our Team Section - Clean White & Cyan Theme with Lime Accents
import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { teamMembers } from "../data/team";
import {
  LinkedInIcon,
  InstagramIcon,
  XTwitterIcon,
  BehanceIcon,
} from "./SocialIcons";

export default function Team({ onWorkWithTeam }) {
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    if (!selectedMember) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedMember]);

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
          {teamMembers.map((member) => {
            const initials = member.name
              .split(/\s+/)
              .map((part) => part[0])
              .join("")
              .slice(0, 2);

            return (
            <article
              key={member.id}
              className="team-card-light team-card-clickable"
              onClick={() => setSelectedMember(member)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedMember(member);
                }
              }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`View ${member.name}'s profile`}
            >
              <div className={`team-avatar-wrapper-light${member.image ? " has-photo" : ""}`}>
                {member.image ? (
                  <img
                    className="team-photo-light"
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    style={{ objectPosition: member.imagePosition }}
                  />
                ) : (
                  <div className="team-avatar-light" aria-hidden="true">{initials}</div>
                )}
              </div>

              <div className="team-content-light">
                <h3 className="team-name-light">{member.name}</h3>
                <span className="team-role-lime">{member.role}</span>

                {member.bio && <p className="team-bio-light">{member.bio}</p>}

                {member.specialty && (
                  <div className="team-specialty-strip-light">
                    <span className="lbl">Specialty:</span>
                    <span className="val">{member.specialty}</span>
                  </div>
                )}

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
            );
          })}
        </div>

        {selectedMember && (
          <div
            className="team-profile-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ashiq-profile-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedMember(null);
            }}
          >
            <article className="team-profile-modal">
              <button className="team-profile-close" type="button" onClick={() => setSelectedMember(null)} aria-label={`Close ${selectedMember.name}'s profile`}>
                <X size={21} />
              </button>
              <header className="team-profile-head">
                <img src={selectedMember.image} alt={selectedMember.name} className="team-profile-photo" style={{ objectPosition: selectedMember.imagePosition || "center 20%" }} />
                <div className="team-profile-heading">
                  <span className="team-profile-eyebrow">THE MINDS BEHIND ADNOV</span>
                  <h2 id="ashiq-profile-title">{selectedMember.name}</h2>
                  <p>{selectedMember.role}</p>
                </div>
              </header>
              {selectedMember.id === "member-2" ? <div className="team-profile-body">
                <section className="team-profile-section team-profile-about">
                  <h3>About</h3>
                  <p>Ashiq S is a creative designer and web developer with an interest in technology, digital experiences and visual communication. He combines creativity with technical skills to build engaging digital solutions, design impactful graphics and develop modern websites. He is currently pursuing a BTech in Computer Science and Engineering with Data Science at UKF College of Engineering &amp; Technology. He is also actively involved in IEEE student activities and creative projects.</p>
                </section>
                <section className="team-profile-section">
                  <h3>Skills</h3>
                  <div className="team-profile-skills">
                    {["Graphic Design", "Web Development", "UI/UX Design", "Frontend Development", "Branding & Visual Communication", "Python", "C Programming", "SQL", "HTML & CSS", "JavaScript & React", "Adobe Photoshop", "Adobe Illustrator", "Canva", "CapCut", "Content Creation", "Video Editing"].map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </section>
                <section className="team-profile-section">
                  <h3>Experience &amp; Activities</h3>
                  <ul className="team-profile-list">
                    <li>Graphic Designer &amp; Web Developer at ADNOV</li>
                    <li>Secretary, IEEE Student Branch, UKFCET</li>
                    <li>Vice Chair, IEEE IAS Student Branch Chapter, UKFCET</li>
                    <li>Founder of Nexads Media Solutions</li>
                    <li>Experience in website development, branding, graphic design and digital content creation.</li>
                  </ul>
                </section>
                <section className="team-profile-section team-profile-education">
                  <h3>Education</h3>
                  <strong>BTech Computer Science &amp; Engineering (Data Science)</strong>
                  <p>UKF College of Engineering &amp; Technology<br />2024–2028</p>
                </section>
                <section className="team-profile-section">
                  <h3>Portfolio</h3>
                  <a className="team-profile-link" href="https://theweakend.vercel.app" target="_blank" rel="noopener noreferrer">Explore portfolio <ExternalLink size={15} /></a>
                </section>
                <section className="team-profile-section">
                  <h3>Social Links</h3>
                  <div className="team-profile-socials">
                    <a href="https://github.com/dicaprio-aa" target="_blank" rel="noopener noreferrer">GitHub <ExternalLink size={15} /></a>
                    <a href="https://www.linkedin.com/in/ashiq-s-0056a6239/" target="_blank" rel="noopener noreferrer">LinkedIn <ExternalLink size={15} /></a>
                  </div>
                </section>
              </div> : <div className="team-profile-body team-profile-basic"><section className="team-profile-section"><h3>ADNOV Team</h3><p>{selectedMember.role}</p></section></div>}
            </article>
          </div>
        )}

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
