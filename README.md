# ADNOV — Creative Media, Production & Digital Solutions

> **"Where Innovation Meets Solutions."**

A premium, international-grade, modern, highly interactive creative agency website engineered for **ADNOV** with a bright sky-blue & cyan gradient aesthetic, realistic cloud visuals, lime-green accent highlights, and floating 3D perspective cards.

---

## 🌟 Visual & Technical Highlights

- **Visual Direction:** Bright sky-blue and cyan gradient hero with realistic volumetric cloud visuals, transitioning seamlessly into clean white and slate backgrounds for lower sections.
- **Hero Experience:** Modern centered headline typography, lime-green CTA buttons, and floating 3D perspective cards showcasing services (Live 4K Broadcasting, 3D Web, Brand Architecture) with interactive hover tilt.
- **Client & Partner Strip:** Clean brand marquee bridging the hero into the white content sections.
- **Metric Cards & About:** 4 bold metric cards (150+ Projects, 10+ Disciplines, 99% Satisfaction, 24/7 Availability) with 3 core pillars in rounded cards.
- **All 10 Services:** Full interactive cards with detailed feature bullet points, service detail modal, and direct pre-fill into the enquiry form.
- **Portfolio & Lightbox:** 9 showcase projects categorized across all disciplines with filter tabs and full-screen lightbox modal with deliverables, metrics, and client specifications.
- **ADNOV Assistant Chatbot:** Floating intelligent assistant with pre-programmed agency FAQ knowledge base, typing animation, quick-reply chips, service selector, and WhatsApp / Instagram handoff.
- **Client Conversion Form:** Comprehensive enquiry form with real-time email & phone validation, honeypot anti-spam protection, loading indicators, and Supabase integration with automatic demo fallback.
- **Backend & Email Automation:** Supabase PostgreSQL schema with Row Level Security (RLS) policies and Edge Function integration ready for Resend email notifications & customer acknowledgement.
- **Responsive Architecture:** Pixel-perfect layout across desktop, tablet, Android, and iOS devices with touch-friendly mobile drawer navigation.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (included with Node.js)

### 2. Running the Development Server
Open PowerShell or your terminal in the project directory:

```powershell
cd C:\Users\ashiq\adnov-website
npm run dev
```

Open your browser at `http://localhost:5173`.

### 3. Building for Production
```powershell
npm run build
```

---

## 🛠️ Project Structure

```
adnov-website/
│
├── public/
│   ├── favicon.svg
│   ├── images/
│   └── videos/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx           # Minimal glass navbar + mobile drawer
│   │   ├── Hero.jsx             # Sky-blue/cyan hero, realistic clouds & 3D perspective cards
│   │   ├── About.jsx            # "Ideas Become Experiences" with 4 metric cards
│   │   ├── Services.jsx         # 10 service disciplines card grid + detail modal
│   │   ├── ServiceCard.jsx      # Individual service card with lime accents
│   │   ├── Portfolio.jsx        # Category filters, hover zoom, and lightbox modal
│   │   ├── WhyChooseUs.jsx      # 6 core pillars of ADNOV with rounded cards
│   │   ├── Team.jsx             # Interactive team cards with specialties & socials
│   │   ├── Testimonials.jsx     # Modern auto-advancing testimonials carousel
│   │   ├── Contact.jsx          # Comprehensive enquiry form with validation & Supabase
│   │   ├── MapSection.jsx       # Google Maps embed, address & Get Directions
│   │   ├── Chatbot.jsx          # "ADNOV Assistant" floating FAQ conversational AI
│   │   ├── WhatsAppButton.jsx   # Floating WhatsApp button with pulse beacon
│   │   ├── SocialIcons.jsx      # Crisp SVG social icons (Instagram, WhatsApp, etc.)
│   │   ├── LegalModal.jsx       # Privacy Policy & Terms of Service modals
│   │   └── Footer.jsx           # Modern slate footer with lime accents
│   │
│   ├── config/
│   │   └── siteConfig.js        # Central editable agency details, address, emails
│   │
│   ├── data/
│   │   ├── services.js          # All 10 services data, features, and descriptions
│   │   ├── portfolio.js         # Curated portfolio items and categories
│   │   ├── team.js              # Editable placeholder team profiles
│   │   └── testimonials.js      # Editable placeholder client reviews
│   │
│   ├── lib/
│   │   └── supabase.js          # Supabase client with graceful demo fallback
│   │
│   ├── App.jsx                  # Main root application orchestrator
│   ├── App.css                  # Master CSS styling with realistic cloud & 3D animations
│   ├── index.css                # Global typography, resets, and scrollbar
│   └── main.jsx                 # React entry point
│
├── supabase/
│   ├── schema.sql               # PostgreSQL schema & Row Level Security (RLS)
│   └── functions/
│       └── send-enquiry/
│           └── index.ts         # Supabase Edge Function with Resend email automation
│
├── .env.example                 # Environment variables template
├── index.html                   # SEO metadata, OpenGraph tags, Google Fonts
└── package.json
```

---

## ⚙️ Customization Guide

All editable business details are centralized in `src/config/siteConfig.js`. You can edit agency name, emails, phone numbers, social media links, address, and Google Maps embed URL directly.
