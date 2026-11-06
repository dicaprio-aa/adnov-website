// ADNOV Master Application Component - Light Sky & Cyan Redesign

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import WhyChooseUs from "./components/WhyChooseUs";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import WhatsAppButton from "./components/WhatsAppButton";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

export default function App() {
  const [selectedServiceForEnquiry, setSelectedServiceForEnquiry] = useState("");

  if (window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/")) {
    return <AdminDashboard />;
  }

  const scrollToContact = (serviceName = "") => {
    if (serviceName) {
      setSelectedServiceForEnquiry(serviceName);
    }

    const contactEl = document.getElementById("contact");

    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const servicesEl = document.getElementById("services");

    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="adnov-app-light">

      {/* Navigation Bar */}
      <Navbar onNavigateToContact={() => scrollToContact()} />

      {/* Main Content Sections */}
      <main id="main-content">

        {/* A. Hero Section */}
        <Hero
          onExploreServices={scrollToServices}
          onWorkTogether={() => scrollToContact()}
        />

        {/* B. About Section */}
        <About onGetInTouch={() => scrollToContact()} />

        {/* C. Our Services */}
        <Services
          onSelectServiceForEnquiry={(serviceName) =>
            scrollToContact(serviceName)
          }
        />

        {/* D. Portfolio */}
        <Portfolio
          onStartProject={(category) =>
            scrollToContact(category || "")
          }
        />

        {/* E. Why Choose ADNOV */}
        <WhyChooseUs
          onConsultationClick={() => scrollToContact()}
        />

        {/* F. Meet Our Team */}
        <Team
          onWorkWithTeam={() => scrollToContact()}
        />

        {/* G. Testimonials */}
        <Testimonials />

        {/* H. Contact & Enquiry Form - Single Map Inside Contact */}
        <Contact
          preselectedService={selectedServiceForEnquiry}
        />

      </main>

      {/* Footer */}
      <Footer
        onSelectService={(serviceName) =>
          scrollToContact(serviceName)
        }
      />

      {/* Floating Tools */}
      <Chatbot
        onSelectServiceForEnquiry={(serviceName) =>
          scrollToContact(serviceName)
        }
      />

      <WhatsAppButton />

    </div>
  );
}