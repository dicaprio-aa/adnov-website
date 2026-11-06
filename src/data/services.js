// ADNOV Services Data
// All 10 services with detailed capabilities, icons, and categories

import {
  Radio,
  Video,
  Camera,
  Play,
  Heart,
  Palette,
  Code2,
  Layout,
  Megaphone,
  Sparkles,
} from "lucide-react";

export const servicesData = [
  {
    id: "live-broadcasting",
    number: "01",
    title: "Live Broadcasting",
    tagline: "Broadcast Seamlessly Worldwide",
    shortDesc:
      "High-definition multi-camera live streaming and hybrid event broadcasts with ultra-low latency.",
    icon: Radio,
    accent: "from-purple-500 to-indigo-500",
    features: [
      "Professional Live Streaming",
      "Event Broadcasting",
      "Multi-Camera Production",
      "Online Event Streaming",
    ],
    details:
      "We deliver high-end broadcast infrastructure, live mixing consoles, graphics overlays, and redundant streaming pipes to platforms like YouTube, Facebook, Twitch, and private corporate portals.",
  },
  {
    id: "videography",
    number: "02",
    title: "Videography",
    tagline: "Cinematic Visual Storytelling",
    shortDesc:
      "From high-impact commercials to corporate films, we craft visual stories that leave a lasting mark.",
    icon: Video,
    accent: "from-violet-500 to-purple-600",
    features: [
      "Cinematic Video Production",
      "Promotional Videos",
      "Corporate Videos",
      "Event Videography",
    ],
    details:
      "Equipped with industry-grade cinema cameras, lighting setups, and gimbals, our film crews bring director-level vision to commercials, brand stories, and corporate documentaries.",
  },
  {
    id: "photography",
    number: "03",
    title: "Photography",
    tagline: "Frames That Freeze Perfection",
    shortDesc:
      "Commercial, product, portrait, and event photography crafted with meticulous lighting and composition.",
    icon: Camera,
    accent: "from-purple-600 to-pink-500",
    features: [
      "Professional Photography",
      "Product Photography",
      "Portrait Photography",
      "Event Photography",
    ],
    details:
      "Every frame is art directed to elevate your brand prestige, showcase your products in their finest detail, and create portraits that communicate authenticity and authority.",
  },
  {
    id: "video-editing",
    number: "04",
    title: "Video Editing",
    tagline: "Transforming Raw Footage into Art",
    shortDesc:
      "Fast-paced short-form reels, color grading, sound design, and full-length cinematic edits.",
    icon: Play,
    accent: "from-fuchsia-500 to-purple-600",
    features: [
      "Professional Video Editing",
      "Reels & Short-Form Content",
      "Promotional Video Editing",
      "Cinematic Editing & Color Grading",
    ],
    details:
      "Our post-production suite pairs surgical cuts with DaVinci color grading, spatial sound design, dynamic motion graphics, and viral pacing tuned for modern social algorithms.",
  },
  {
    id: "wedding-works",
    number: "05",
    title: "Wedding Works",
    tagline: "Eternalizing Your Most Cherished Day",
    shortDesc:
      "Cinematic wedding films and luxury photography that capture raw emotion and unforgettable memories.",
    icon: Heart,
    accent: "from-pink-500 to-rose-500",
    features: [
      "Wedding Photography",
      "Wedding Videography",
      "Cinematic Wedding Films",
      "Wedding Highlights & Editing",
    ],
    details:
      "We treat every wedding as a timeless cinematic masterpiece — capturing the subtle tears, joyful laughter, grand celebrations, and bespoke intimate highlights you will rewatch for decades.",
  },
  {
    id: "branding",
    number: "06",
    title: "Branding",
    tagline: "Iconic Identity Systems",
    shortDesc:
      "End-to-end brand architecture, logo suites, typography systems, and comprehensive style guides.",
    icon: Palette,
    accent: "from-purple-500 to-cyan-500",
    features: [
      "Logo Design",
      "Brand Identity",
      "Visual Identity",
      "Brand Guidelines",
    ],
    details:
      "We design distinct visual languages that stand out in crowded markets — establishing typography, color theory, iconography, brand voices, and brand books that scale.",
  },
  {
    id: "web-development",
    number: "07",
    title: "Web Development",
    tagline: "High-Performance Digital Flagships",
    shortDesc:
      "Futuristic, responsive web applications, e-commerce platforms, and immersive agency portfolios.",
    icon: Code2,
    accent: "from-cyan-500 to-blue-600",
    features: [
      "Business Websites",
      "Portfolio Websites",
      "E-Commerce Websites",
      "Custom Web Applications",
    ],
    details:
      "Engineered with modern frameworks, lightning-fast Core Web Vitals, rich micro-interactions, responsive architecture, and airtight security that convert visitors into loyal clients.",
  },
  {
    id: "poster-graphic-design",
    number: "08",
    title: "Poster & Graphic Design",
    tagline: "Visuals That Demand Attention",
    shortDesc:
      "Thumb-stopping advertising posters, social media creatives, print media, and promotional design.",
    icon: Layout,
    accent: "from-purple-400 to-violet-500",
    features: [
      "Advertising Posters",
      "Social Media Creatives",
      "Promotional Designs",
      "Event Posters & Billboards",
    ],
    details:
      "Bold typography, balanced white space, and striking visual hierarchy make our posters, digital ads, and social media banners stop scrolls and drive measurable engagement.",
  },
  {
    id: "digital-marketing",
    number: "09",
    title: "Digital Marketing",
    tagline: "Data-Driven Growth Strategies",
    shortDesc:
      "Full-funnel digital campaigns, organic social growth, targeted paid ads, and brand acceleration.",
    icon: Megaphone,
    accent: "from-violet-600 to-indigo-600",
    features: [
      "Social Media Management",
      "Digital Campaigns",
      "Content Strategy",
      "Brand Promotion & Growth",
    ],
    details:
      "We combine analytical precision with creative flair — developing data-backed content calendars, targeted ad funnels, influencer campaigns, and conversion rate optimizations.",
  },
  {
    id: "more-services",
    number: "10",
    title: "More Services",
    tagline: "Custom Creative Solutions",
    shortDesc:
      "Have a unique challenge? From 3D CGI rendering to aerial drone ops and bespoke event tech.",
    icon: Sparkles,
    accent: "from-purple-500 to-pink-500",
    isSpecial: true,
    features: [
      "3D Modeling & Motion Graphics",
      "Drone Cinematography",
      "Interactive Virtual Tours",
      "Custom Creative Consulting",
    ],
    details:
      "ADNOV is a multidisciplinary studio. If your project crosses borders or demands a custom creative pipeline, our team is ready to engineer a tailored solution.",
  },
];

export default servicesData;
