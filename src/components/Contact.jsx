
import { useEffect, useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import { submitEnquiry } from "../lib/supabase";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  contactMethod: "Email",
  message: "",
  website: "",
};

const services = [
  "Branding & Graphic Design",
  "Poster & Social Media Design",
  "Video Editing",
  "Videography",
  "Photography",
  "Wedding & Event Coverage",
  "Live Broadcasting",
  "Website Development",
  "Digital Marketing",
  "Other Services",
];

const budgets = [
  "Below ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "Above ₹50,000",
  "Not decided yet",
];

export default function Contact({ preselectedService = "" }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!preselectedService) return;

    const timeoutId = window.setTimeout(() => {
      setFormData((current) => ({
        ...current,
        service: preselectedService,
      }));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Please enter your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    const phone = formData.phone.replace(/\D/g, "");

    if (phone.length < 10 || phone.length > 15) {
      return "Please enter a valid phone number.";
    }

    if (!formData.service) {
      return "Please select a service.";
    }

    if (!formData.message.trim()) {
      return "Please enter your project details.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Honeypot spam protection
    if (formData.website) return;

    const validationError = validateForm();

    if (validationError) {
      setStatus("error");
      setStatusMessage(validationError);
      return;
    }

    setLoading(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const result = await submitEnquiry({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: formData.service,
        budget: formData.budget,
        contactMethod: formData.contactMethod,
        message: formData.message.trim(),
      });

      if (result?.success === false) {
        throw new Error(
          result.message || "Unable to submit your enquiry. Please try again."
        );
      }

      setStatus("success");
      setStatusMessage(
        "Thank you for contacting ADNOV! Your enquiry has been submitted successfully."
      );
      setFormData(initialForm);
    } catch (error) {
      console.error("Enquiry submission error:", error);

      setStatus("error");
      setStatusMessage(
        error.message ||
          "Something went wrong. Please try again or contact us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section-light">
      <div className="contact-container-light">

        {/* Section Heading */}
        <div className="contact-heading-light">
          <div className="section-pill-light">
            <span className="pill-dot-lime" />
            <span>LET'S CONNECT</span>
          </div>

          <h2>
            Have a Project in <span>Mind?</span>
          </h2>

          <p>
            Let's turn your ideas into something extraordinary.
            Tell us about your project and let's get started.
          </p>
        </div>

        <div className="contact-content-light">

          {/* LEFT SIDE */}
          <div className="contact-info-light">

            <div className="contact-info-title-light">
              <Sparkles size={20} />
              <h3>Get in Touch</h3>
            </div>

            <p className="contact-info-description-light">
              Have questions or need a creative partner?
              Reach out to our team directly.
            </p>

            {/* CONTACT CARDS */}
            <div className="contact-cards-stack-light">

              {/* OFFICIAL EMAIL */}
              <div className="c-card-light">
                <div className="c-icon-box-light">
                  <Mail size={20} />
                </div>

                <div>
                  <span className="c-label-light">
                    Official Email
                  </span>

                  <a
                    href="mailto:adnovinnovations@gmail.com"
                    className="c-val-light"
                  >
                    adnovinnovations@gmail.com
                  </a>
                </div>
              </div>

              {/* DIRECT CONTACT - BOTH NUMBERS */}
              <div className="c-card-light">
                <div className="c-icon-box-light">
                  <Phone size={20} />
                </div>

                <div>
                  <span className="c-label-light">
                    Direct Contact
                  </span>

                  <a
                    href="tel:+918137803065"
                    className="c-val-light"
                  >
                    +91 81378 03065
                  </a>

                  <a
                    href="tel:+919744754648"
                    className="c-val-light"
                    style={{
                      display: "block",
                      marginTop: "6px",
                    }}
                  >
                    +91 97447 54648
                  </a>
                </div>
              </div>

            </div>

            {/* SMALL NOTE */}
            <div className="contact-note-light">
              <Sparkles size={17} />
              <p>
                Every great project starts with a conversation.
                We look forward to hearing from you!
              </p>
            </div>

          </div>

          {/* RIGHT SIDE - ENQUIRY FORM */}
          <div className="contact-form-wrapper-light">

            <div className="contact-form-heading-light">
              <h3>Send Us an Enquiry</h3>
              <p>
                Fill out the form below and our team will get
                back to you.
              </p>
            </div>

            {status === "success" ? (
              <div className="contact-success-light">
                <CheckCircle2 size={54} />

                <h3>Enquiry Submitted!</h3>

                <p>{statusMessage}</p>

                <button
                  type="button"
                  className="btn-lime-primary"
                  onClick={() => {
                    setStatus("idle");
                    setStatusMessage("");
                  }}
                >
                  Send Another Enquiry
                  <ArrowUpRight size={17} />
                </button>
              </div>
            ) : (
              <form
                className="contact-form-light"
                onSubmit={handleSubmit}
              >

                {/* HONEYPOT - KEEP HIDDEN */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website">
                    Website
                  </label>

                  <input
                    id="website"
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="form-row-light">

                  <div className="form-group-light">
                    <label htmlFor="fullName">
                      Full Name *
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group-light">
                    <label htmlFor="email">
                      Email Address *
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="form-row-light">

                  <div className="form-group-light">
                    <label htmlFor="phone">
                      Phone Number *
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group-light">
                    <label htmlFor="company">
                      Company / Business
                    </label>

                    <input
                      id="company"
                      type="text"
                      name="company"
                      placeholder="Company name (optional)"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="form-row-light">

                  <div className="form-group-light">
                    <label htmlFor="service">
                      Service Required *
                    </label>

                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select a service
                      </option>

                      {services.map((service) => (
                        <option
                          key={service}
                          value={service}
                        >
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-light">
                    <label htmlFor="budget">
                      Estimated Budget
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select your budget
                      </option>

                      {budgets.map((budget) => (
                        <option
                          key={budget}
                          value={budget}
                        >
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                <div className="form-group-light">
                  <label htmlFor="contactMethod">
                    Preferred Contact Method
                  </label>

                  <select
                    id="contactMethod"
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>

                <div className="form-group-light">
                  <label htmlFor="message">
                    Tell Us About Your Project *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Describe your requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ERROR MESSAGE */}
                {status === "error" && (
                  <div className="contact-error-light">
                    <AlertCircle size={18} />
                    <span>{statusMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-lime-primary contact-submit-btn-light"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Sending Enquiry...
                    </>
                  ) : (
                    <>
                      Send Enquiry
                      <Send size={17} />
                    </>
                  )}
                </button>

                <p className="form-privacy-light">
                  Your information will only be used to respond
                  to your enquiry.
                </p>

              </form>
            )}

          </div>

        </div>

        {/* GOOGLE MAP - BOTTOM */}
        <div className="adnov-map-section">

          <div className="adnov-map-heading">
            <div className="section-pill-light">
              <span className="pill-dot-lime" />
              <span>FIND US</span>
            </div>

            <h3>Visit ADNOV</h3>

            <p>
              Find our location and get directions to
              ADNOV Innovative Solutions.
            </p>
          </div>

          <div className="adnov-map-frame">
            <iframe
              title="ADNOV Innovative Solutions Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.1580871962824!2d76.83979217501819!3d8.957576891100988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06755a9f445e97%3A0xbb6e2b88a2173bca!2sAdnov%20Innovative%20Solutions!5e0!3m2!1sen!2sin!4v1793978960122!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=8.957576891100988,76.83979217501819"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lime-primary adnov-directions-btn"
          >
            Get Directions
            <ArrowUpRight size={16} />
          </a>

        </div>

      </div>
    </section>
  );
}
