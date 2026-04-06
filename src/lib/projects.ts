/**
 * All asset paths are relative to /public.
 * Convention: /projects/<slug>/<file>
 *
 * For Lottie animations, install: npm install @lottiefiles/dotlottie-react
 */
export type ProjectAssets = {
  /** Hero image — used in WorkSpotlight and ProjectLayout header */
  cover: string;
  /** Brand mark SVG (symbol/logomark only) */
  logo?: string;
  /** Full wordmark SVG (symbol + name combined) */
  logotype?: string;
  /** Simplified icon / favicon-style mark */
  icon?: string;
  /** Lottie animation file (.lottie or legacy .json) */
  animation?: string;
  /** Final deliverable renders & presentation mockups */
  mockups?: string[];
  /** Branding — hand-drawn concept sketches */
  sketches?: string[];
  /** Branding — vectorization / Illustrator exploration steps */
  vectorization?: string[];
  /** Engineering — Entity-Relationship Diagrams */
  erd?: string[];
  /** Engineering — user stories, feature specs, techspec pages */
  documentation?: string[];
  /** Engineering — code screenshots, architecture diagrams */
  snippets?: string[];
  /** Anything that doesn't fit the categories above */
  extras?: string[];
  /** Media showcase in the expanded project row */
  showcase?: {
    /** Primary media, usually a video spanning the largest space */
    highlight: {
      type: "video" | "image";
      url: string;
    };
    /** 2 supporting images to display alongside the highlight */
    images: [string, string];
  };
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  /** Short tagline — shown in WorkSpotlight card */
  mission: string;
  /** Longer project narrative — shown in ProjectLayout */
  description?: string;
  /** Concisely worded version for mobile screens */
  aboutMobile?: string;
  /** UI category chips shown in WorkSpotlight */
  tags: string[];
  /** Thematic / SEO keywords */
  keywords?: string[];
  /** Design & authoring tools, e.g. ["Figma", "Adobe Illustrator"] */
  tools?: string[];
  /** Engineering stack, e.g. ["Laravel", "React", "PostgreSQL"] */
  technologies?: string[];
  /** Primary brand color hex (used for UI themes) */
  brandColor: string;
  assets: ProjectAssets;
};

export const PROJECTS: Project[] = [
  {
    slug: "courant",
    name: "Courant",
    year: "2025",
    mission:
      "Brand identity & digital presence for a startup featuring a smart power management system with AI-powered energy optimization.",
    description:
      "Courant was built to bridge the gap between complex IoT energy data and intuitive consumer experiences. The project involved creating a visual language that felt both technical and accessible, followed by a documentation-lead approach to the system's frontend architecture. Key challenges included translating high-frequency sensor data into meaningful visualizations that empower users to reduce their carbon footprint without sacrificing convenience.",
    aboutMobile:
      "A smart power management system that simplifies IoT energy data into intuitive, actionable insights for sustainability-minded users.",
    tags: ["Brand Identity", "UI/UX"],
    keywords: ["Realtime Monitoring", "Cost Optimization", "Sustainability", "IoT", "Clean Energy"],
    tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
    brandColor: "#e8a216",
    assets: {
      cover: "/projects/courant/cover.jpg",
      logo: "/projects/courant/logo.svg",
      logotype: "/projects/courant/logotype.svg",
      icon: "/projects/courant/icon.svg",
      animation: "/projects/courant/logo-animation.json",
      mockups: [],
      sketches: [],
      vectorization: [],
      showcase: {
      highlight: {
        type: "video",
        url: "/projects/courant/highlight.mp4",
      },
      images: [
        "/projects/courant/showcase-1.jpg",
        "/projects/courant/showcase-2.jpg",
      ],
    },
    },
      
  },
  {
    slug: "bataeno-pass",
    name: "Bataeno Pass",
    year: "2026",
    mission:
      "Full-stack barangay module for a provincial-level government system for document issuance and household data management.",
    description:
      "A massive digital transformation initiative for provincial government units. Bataeno Pass replaces manual, paper-based document processing with a unified, high-security barangay module. The system handles everything from automated document issuance (Barangay Clearance, Indigency) to complex household census data tracking, ensuring that local services are efficient, transparent, and data-backed.",
    aboutMobile:
      "A full-stack governmental module digitizing barangay operations, census tracking, and document issuance for provincial-scale efficiency.",
    tags: ["Full-Stack", "System Design", "Database Design"],
    keywords: ["Government Tech", "Public Service", "Data Security", "Digital Transformation"],
    technologies: ["Laravel", "React", "Inertia.js", "PostgreSQL", "Tailwind CSS"],
    brandColor: "#059669",
    assets: {
      cover: "/projects/bataeno-pass/cover.jpg",
      mockups: [],
      erd: [],
      documentation: [],
      snippets: [],
    },
  },
  {
    slug: "edmer-software",
    name: "Edmer Software Solutions",
    year: "2025",
    mission:
      "Corporate identity and web presence for an experienced full-stack developer.",
    description:
      "A personal branding project turned corporate identity. Edmer Software required a look that radiated technical authority while remaining approachable for B2B consulting. The resulting identity system uses sharp, geometric typography and a high-contrast palette to mirror the precision of the software development process itself.",
    aboutMobile:
      "A high-contrast identity system designed to project technical authority and precision for B2B software consulting.",
    tags: ["Brand Identity"],
    keywords: ["Corporate Identity", "Developer Branding", "Minimalism", "B2B"],
    tools: ["Figma", "Adobe Illustrator"],
    brandColor: "#0052cc",
    assets: {
      cover: "/projects/edmer-software/cover.jpg",
      logo: "/projects/edmer-software/logo.svg",
      logotype: "/projects/edmer-software/logotype.svg",
      icon: "/projects/edmer-software/icon.svg",
      mockups: [],
      sketches: [],
      vectorization: [],
    },
  },
  {
    slug: "strawberry-sweets",
    name: "Strawberry Sweets",
    year: "2026",
    mission:
      "Playful website featuring discography for an indie band based in Bataan.",
    description:
      "Strawberry Sweets is an immersive web experience for an indie-pop band. Moving away from standard social media landing pages, this project focused on a 'discography-first' layout that encourages fans to explore the band's sonic history. The design features soft gradients, custom icons, and fluid transitions that capture the whimsical and nostalgic essence of the band's music.",
    aboutMobile:
      "An immersive, discography-first web experience capturing the whimsical essence of a Bataan-based indie-pop band.",
    tags: ["Web Design"],
    keywords: ["Band Website", "Music Industry", "Immersive UX", "Discography"],
    tools: ["Figma"],
    technologies: ["React", "Tailwind CSS"],
    brandColor: "#e11d48",
    assets: {
      cover: "/projects/strawberry-sweets/cover.jpg",
      logo: "/projects/strawberry-sweets/logo.svg",
      mockups: [],
    },
  },
];
