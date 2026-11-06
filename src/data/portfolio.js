// TEMPORARY DEMO DATA: Fictional clients and concepts only. Replace with real ADNOV work.

export const portfolioCategories = ["All", "Branding", "Video", "Digital", "Marketing"];

export const clientProjects = [
  {
    id: "client-1",
    name: "Northstar Mobility",
    monogram: "NM",
    introduction: "A fictional mobility brand used to demonstrate a complete campaign case study.",
    services: ["Brand Identity", "Commercial Film", "Social Campaigns"],
    accent: "#67d9ff",
    projects: [
      { title: "Brand launch film", type: "Video", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80", description: "Concept film directions, launch storytelling and motion-ready campaign assets." },
      { title: "Campaign poster system", type: "Poster", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80", description: "Placeholder promotional artwork for outdoor, social and print placements." },
    ],
  },
  {
    id: "client-2",
    name: "Asteria Living",
    monogram: "AL",
    introduction: "A fictional interiors and lifestyle brand created for portfolio presentation.",
    services: ["Photography", "Branding", "Website Design"],
    accent: "#84cc16",
    projects: [
      { title: "Lifestyle visual story", type: "Photography", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", description: "Demo editorial imagery for residential spaces and lifestyle collections." },
      { title: "Digital flagship concept", type: "Website", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80", description: "Responsive website concept with a refined product-led visual system." },
    ],
  },
  {
    id: "client-3",
    name: "Kinetic Labs",
    monogram: "KL",
    introduction: "A fictional technology studio used as a demonstration client for digital work.",
    services: ["Web Development", "Motion", "Digital Strategy"],
    accent: "#a78bfa",
    projects: [
      { title: "Interactive product showcase", type: "Website", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", description: "Placeholder digital product experience and motion-led interface concept." },
      { title: "Product launch motion", type: "Video", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80", description: "Sample launch animation and explainer film direction." },
    ],
  },
  {
    id: "client-4",
    name: "Verdant Foods",
    monogram: "VF",
    introduction: "A fictional sustainable food company for illustrating packaging and campaigns.",
    services: ["Packaging", "Photography", "Marketing Campaign"],
    accent: "#34d399",
    projects: [
      { title: "Packaging identity", type: "Branding", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80", description: "Demo packaging system and contemporary shelf-ready visual direction." },
      { title: "Seasonal campaign", type: "Marketing", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80", description: "Placeholder social, poster and short-form campaign creative." },
    ],
  },
  {
    id: "client-5",
    name: "Orbit Finance",
    monogram: "OF",
    introduction: "A fictional fintech brand included as temporary presentation material.",
    services: ["Brand Strategy", "UI/UX", "Explainer Video"],
    accent: "#38bdf8",
    projects: [
      { title: "Trust-led brand system", type: "Branding", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80", description: "Sample identity direction designed to communicate clarity and confidence." },
      { title: "Explainer film", type: "Video", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", description: "Placeholder fintech animation storyboard and visual treatment." },
    ],
  },
  {
    id: "client-6",
    name: "Mosaic Arts",
    monogram: "MA",
    introduction: "A fictional cultural organisation used to demonstrate event and broadcast work.",
    services: ["Live Broadcasting", "Event Design", "Poster Design"],
    accent: "#fb7185",
    projects: [
      { title: "Festival broadcast identity", type: "Video", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80", description: "Demo broadcast graphics, stage visuals and live event campaign assets." },
      { title: "Season poster collection", type: "Poster", image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80", description: "Placeholder event poster series for print and digital distribution." },
    ],
  },
];

export const portfolioProjects = clientProjects.flatMap((client) =>
  client.projects.map((project, index) => ({ ...project, id: `${client.id}-${index}`, client: client.name }))
);

export default clientProjects;
