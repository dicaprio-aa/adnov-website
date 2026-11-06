// ADNOV Testimonials Carousel Section - Clean White & Cyan Theme with Lime Accents
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonialsData } from "../data/testimonials";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const total = testimonialsData.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, total]);

  const currentItem = testimonialsData[currentIndex];

  return (
    <section
      className="testimonials-section-light"
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="section-pill-light">
            <span className="pill-dot-lime" />
            <span>06 / CLIENT EXPERIENCES</span>
          </div>

          <h2 className="section-headline-light">
            Trusted by Creators.<br />
            <span className="headline-cyan-span">Proven by Results.</span>
          </h2>

          <p className="section-lead-light">
            Read how ADNOV helps ambitious brands, executive teams, and couples turn their
            visions into unforgettable milestones.
          </p>
        </div>

        {/* Carousel Active Display Card */}
        <div className="testimonial-stage-light">
          <div className="testimonial-card-light">
            <div className="t-card-top-light">
              <div className="quote-box-lime">
                <Quote size={28} />
              </div>
              <div className="t-stars-row-light">
                {[...Array(currentItem.rating)].map((_, i) => (
                  <Star key={i} size={18} className="star-lime" fill="currentColor" />
                ))}
              </div>
            </div>

            <blockquote className="t-quote-light">
              "{currentItem.quote}"
            </blockquote>

            <div className="t-client-row-light">
              <img
                src={currentItem.avatar}
                alt={currentItem.clientName}
                className="t-avatar-light"
              />
              <div className="t-details-light">
                <h4 className="t-name-light">{currentItem.clientName}</h4>
                <p className="t-role-light">
                  {currentItem.role} • <span>{currentItem.company}</span>
                </p>
                <span className="t-service-badge-light">
                  Service: {currentItem.serviceUsed}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="testimonial-controls-light">
            <button
              type="button"
              className="t-nav-btn-light"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="t-dots-row-light">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`t-dot-light ${currentIndex === idx ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="t-nav-btn-light"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
