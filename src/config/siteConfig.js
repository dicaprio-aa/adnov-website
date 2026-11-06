// ADNOV Creative Media & Digital Solutions - Central Site Configuration
// All business details, contact information, and editable links live here.

export const siteConfig = {
  name: "ADNOV",
  fullName: "ADNOV Creative Media & Digital Solutions",
  tagline: "Where Innovation Meets Solutions.",
  shortDescription:
    "We are ADNOV — an international creative media, production, branding, and digital solutions agency turning ambitious ideas into memorable visual experiences.",

  // Contact Information
  contact: {
    officialEmail: "hello@adnovcreative.com",
    supportEmail: "support@adnovcreative.com",
    phone: "+1 (555) 234-5678",
    phoneDisplay: "+1 (555) ADNOV-01",
    whatsappNumber: "918137803065", // International format without + or spaces
    whatsappDefaultMessage:
      "Hello Team ADNOV! I am interested in discussing a creative project.",
  },

  // Physical Location & Google Maps
  location: {
    addressLine1: "ADNOV Creative Studios, Innovation Tower",
    addressLine2: "450 Creative Boulevard, Suite 800",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    displayAddress: "450 Creative Boulevard, Suite 800, New York, NY 10001",
    businessHours: "Monday - Friday: 9:00 AM - 6:30 PM EST",
    weekendHours: "Saturday: 10:00 AM - 3:00 PM (By Appointment)",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25436351886!2d-74.11976373072647!3d40.69766374934794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus",
    googleMapsDirectionsUrl:
      "https://maps.google.com/?q=New+York+NY",
  },

  // Social Media Profiles
  social: {
    instagram: "https://www.instagram.com/adnov.in/",
    instagramHandle: "@adnov.in",
    whatsapp: "https://wa.me/918137803065",
    linkedin: "https://linkedin.com/company/adnovcreative",
    youtube: "https://youtube.com/@adnovcreative",
    x: "https://x.com/adnovcreative",
    behance: "https://behance.net/adnovcreative",
  },

  // Stats for Hero and About
  stats: [
    { value: "150+", label: "Projects Delivered" },
    { value: "10+", label: "Creative Disciplines" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "24/7", label: "Global Availability" },
  ],

  // Client / Partner Brands for Hero Logo Strip
  clientPartners: [
    "VANGUARD TECH",
    "AURA MOTORS",
    "NEXUS GLOBAL",
    "KRYPTON PAY",
    "HORIZON MEDIA",
    "SYNTHETIX LABS",
  ],

  // Brand Colors Reference (Sky-Cyan + Lime Green + White Aesthetic)
  colors: {
    skyBlue: "#0ea5e9",
    skyLight: "#38bdf8",
    cyanLight: "#7dd3fc",
    limeAccent: "#84cc16",
    limeNeon: "#a3e635",
    limeBright: "#22c55e",
    whiteBg: "#ffffff",
    slateLight: "#f8fafc",
    slateBorder: "#e2e8f0",
    textDark: "#0f172a",
    textMuted: "#64748b",
  },
};

export default siteConfig;
