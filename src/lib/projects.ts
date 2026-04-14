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
  /** Long-scrolling full webpage capture */
  fullPage?: string;
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
  mindMap?: {
    nodes: string; // a mini DSL string
  };
  /** Short paragraph or takeaway for the process' final conclusion slide */
  conclusions?: string;
  liveUrl?: string;
  /** Documented sections in MDX */
  mdxDocs?: {
    title: string;
    description: string;
    url: string;
  }[];
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  team?: {
    name: string;
    role: string;
  }[];
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
  /** Secondary brand Colors */
  brandColors?: string[];
  /** Typography specimens */
  typography?: {
    fontFamily: string;
    weights: string[];
    usage?: string; // e.g. "Brand Logotype" or "User Interface"
    fontFile?: string; // e.g. "/fonts/august-bold.woff2"
  }[];
  
  isSpotlight?: boolean;
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
    technologies:["Filament PHP", "Laravel", "Tailwind CSS", "Alpine.js", "MySQL", "Flask", "Python", "TensorFlow", "PlatformIO", "Scikit-learn", "MQTT"],
    tools: ["Adobe After Effects", "Adobe Illustrator", "Adobe Photoshop"],
    team: [
      {
        name: "John Edmerson Pizarra",
        role: "Lead Developer, Researcher",
      },
      {
        name: "Florence Gayle Magpoc",
        role: "UI/UX Designer, Front End Developer, Documenter",
      },
      {
        name: "Jian Ross Dela Rosa",
        role: "Researcher, Documenter",
      },
      {
        name: "Kevern Angeles",
        role: "Brand and UI/UX Designer, Front End Developer, Documentation Lead",
      },
      
    ],
    brandColor: "#e8a216",
    brandColors: ["#e8a216", "#131313", "#EAEAEA", "#D7D6D6"],
    typography: [
      {
        fontFamily: "August Bold",
        weights: ["Bold"],
        usage: "Brand Logotype",
        fontFile: "/projects/courant/fonts/august-bold.ttf",
      },
      {
        fontFamily: "Helvetica",
        weights: ["Regular", "Medium", "Bold"],
        usage: "Product Interface",
      },
    ],
    assets: {
      cover: "/projects/courant/cover.webp",
      logo: "/projects/courant/logo.svg",
      logotype: "/projects/courant/logotype.svg",
      icon: "/projects/courant/icon.svg",
      animation: "/projects/courant/logo-animation.json",
      mockups: [],
      sketches: ["/projects/courant/sketches.webp"],
      vectorization: ["/projects/courant/icon-comp.svg"],
      extras: [
        "/projects/courant/tiktok-cover.webp",
        "/projects/courant/graph.webp",
        "/projects/courant/graph-2.webp",
        "/projects/courant/banner.webp",
      ],
      showcase: {
        highlight: {
          type: "video",
          url: "/projects/courant/highlight.mp4",
        },
        images: [
          "/projects/courant/showcase-1.webp",
          "/projects/courant/showcase-2.webp",
        ],
      },
    mindMap: {
      nodes: `
        Courant
          Electricity
            Lightbulb
            Socket
            I/O
          Safety
            Rounded Edges
          Maintenance
            Repair
              Yellow
          Power
            Sustainability
            Lightning
              Bolt
          Current
        Electricity > Power
        Electricity > Safety
        Electricity > Maintenance
        Power > Current
        Lightning > Bolt
        Repair > Yellow
      `
    },
    fullPage: "/projects/courant/full-site.webp",
    conclusions: "MSMEs don't have facilities teams — they need a system that speaks plainly and responds before damage is done. Courant's identity was built around that contract. The mark distills the project's core tensions: technical precision softened by rounded, approachable forms. Yellow surfaces only where it matters — anomaly alerts, repair states, critical thresholds — doing organizational work across multiple devices rather than purely decorative. The goal was to make Isolation Forest and LLM-driven anomaly detection feel like a calm, confident assistant. Not a dashboard. Not a warning system. Just clarity, exactly when you need it.",
    liveUrl: "https://courant.energy",
    },
    isSpotlight: true,  
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
    technologies: ["Laravel", "Livewire", "Reverb", "Alpine.js", "MySQL", "Tailwind CSS", "Filament PHP"],
    tools: ["Atlassian Confluence", "DBDiagram.io"],
    team: [
      {
        name: "Kevern Angeles",
        role: "Lead Developer, System Analyst, Database Designer, Documentation Lead",
      },
      {
        name: "Russel Matthew Santos",
        role: "Full-Stack Developer, Database Designer, Documenter",
      },
      {
        name: "Mr. Paolo Nuestro",
        role: "Technology Officer, Project Manager",
      },
      {
        name: "Mr. Nixon Somoza",
        role: "Technology Officer, Project Consultant",
      },
      {
        name: "Mr. Bryan Gonzales",
        role: "Technology Officer, Project Consultant",
      },
    ],
    brandColor: "#059669",
    assets: {
      cover: "/projects/bataeno-pass/cover.webp",
      mockups: [],
      erd: [],
      documentation: [],
      snippets: [],
      mdxDocs: [
        { title: "Project Overview", description: "Bataeño Pass — Barangay-Level Implementation", url: "/projects/bataeno-pass/docs/overview" },
        { title: "System Architecture", description: "Multi-tenancy, data flow, real-time, and infrastructure design", url: "/projects/bataeno-pass/docs/architecture" },
        { title: "Feature Specifications", description: "The seven core features of the Barangay Module", url: "/projects/bataeno-pass/docs/features" },
        { title: "Database Design", description: "38-table schema across 8 functional groups with design rationale", url: "/projects/bataeno-pass/docs/database" },
        { title: "Key Design Decisions", description: "Architecture tradeoffs and the rationale behind them", url: "/projects/bataeno-pass/docs/decisions" },
        { title: "Development Changelog", description: "6-week development log from February 2 to March 10, 2026", url: "/projects/bataeno-pass/docs/changelog" }
      ],
      showcase: {
        highlight: {
          type: "image",
          url: "/projects/bataeno-pass/cover.webp",
        },
        images: [
          "/projects/bataeno-pass/showcase-1.webp",
          "/projects/bataeno-pass/showcase-2.webp",
        ],
      },
      liveUrl: "http://140.245.101.250:8001/",
      extras: [
        "/projects/bataeno-pass/extra-1.webp",
        "/projects/bataeno-pass/extra-2.webp",
        "/projects/bataeno-pass/extra-3.webp",
        "/projects/bataeno-pass/extra-4.webp",
        "/projects/bataeno-pass/extra-5.webp",
        "/projects/bataeno-pass/extra-6.webp",
        "/projects/bataeno-pass/extra-7.webp",
        "/projects/bataeno-pass/extra-8.webp",
        "/projects/bataeno-pass/extra-9.webp",
        "/projects/bataeno-pass/extra-10.webp",
        "/projects/bataeno-pass/extra-11.webp",
        "/projects/bataeno-pass/extra-12.webp",
        "/projects/bataeno-pass/extra-13.webp",
        "/projects/bataeno-pass/extra-14.webp",
        "/projects/bataeno-pass/extra-15.webp",

      ],
    },
    isSpotlight: true,
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
    brandColors: [
      "#0052cc",
      "#FFB000",
      "#F2F2F2",
      "#EBEBEB",
      "#D0D0D0",
      "#282828",
    ],
    typography: [
      {
        fontFamily: "Plus Jakarta Sans",
        weights: ["ExtraBold", "Semibold", "Bold", "Regular", "Light", "ExtraLight"],
        usage: "Brand Logotype, Heading, Body Text",
        fontFile: "/projects/edmer-software/fonts/PlusJakartaSans-VariableFont_wght.ttf",
      },
      {
        fontFamily: "Chakra Petch",
        weights: ["Medium"],
        usage: "CTA",
        fontFile: "/projects/edmer-software/fonts/ChakraPetch-Medium.ttf",
      },
    ],
    assets: {
      cover: "/projects/edmer-software/cover.webp",
      logo: "/projects/edmer-software/logo.svg",
      logotype: "/projects/edmer-software/logotype.svg",
      icon: "/projects/edmer-software/icon.svg",
      mockups: [
        "/projects/edmer-software/showcase-1.webp",
        "/projects/edmer-software/website-mockup.webp",
        "/projects/edmer-software/showcase-2.webp",
      ],
      sketches: ["/projects/edmer-software/sketch.webp"],
      vectorization: ["/projects/edmer-software/icon-comp.svg"],
      extras: [
        "/projects/edmer-software/asset-2.webp",
        "/projects/edmer-software/color-applications.webp",
        "/projects/edmer-software/icon-comp-2.webp",
        "/projects/edmer-software/asset-1.webp",
        

      ],
      showcase: {
        highlight: {
          type: "image",
          url: "/projects/edmer-software/cover.webp",
        },
        images: [
          "/projects/edmer-software/showcase-1.webp",
          "/projects/edmer-software/showcase-2.webp",
        ],
      },
      mindMap: {
      nodes: `
        Edmer Software Solutions
          Expertise
            Complete Solution
              Integrated
              Sense of completeness
                Closed shape
            Specialized Mastery
              Focus
            Authoritative
          Scale
            Global
            End-to-end
          Corporate Visuals
            Negative Space
            Clean Lines
            Sophisticated
            Modern and Minimalist
            Kinetic Momentum
              Motion cues
          Reliability
            Structural Integrity
              Strict grid system
              Architectural
                Pillar
                Foundation
                Building Material
                  Bricks
                  Concrete
            Technical Precision
              Thin lines
              High contrast
              Focus
                Crosshair
                Target
                Focus Frame
          Innovation
            Futuristic
          Client-centric
            Custom-built

          Expertise > Complete Solution
          Complete Solution > Integrated
          Complete Solution > Sense of completeness
          Sense of completeness > Closed shape
          Expertise > Specialized Mastery
          Specialized Mastery > Focus
          Expertise > Authoritative
          Scale > Global
          Scale > End-to-end
          Corporate Visuals > Negative Space
          Corporate Visuals > Clean Lines
          Corporate Visuals > Sophisticated
          Corporate Visuals > Modern and Minimalist
          Corporate Visuals > Kinetic Momentum
          Kinetic Momentum > Motion cues
          Kinetic Momentum > Whitespace
          Reliability > Structural Integrity
          Structural Integrity > Strict grid system
          Structural Integrity > Architectural
          Architectural > Pillar
          Architectural > Foundation
          Architectural > Building Material
          Building Material > Bricks
          Building Material > Concrete
          Reliability > Technical Precision
          Technical Precision > Thin lines
          Technical Precision > High contrast
          Technical Precision > Focus
          Focus > Crosshair
          Focus > Target
          Focus > Focus Frame
          Innovation > Futuristic
          Client-centric > Custom-built
      `
    },
    conclusions: "Through structured discovery, the brand's core position was defined: a specialized solution architect operating at the intersection of IoT and modern web development — a rare and defensible niche in the international market. The resulting identity system — grounded in structural integrity, technical precision, and kinetic momentum — translates that specialization into a visual language that feels engineered, intentional, and enterprise-ready. Every element, from logo symbolism to typographic direction, is built to signal the same thing: a developer who has outgrown the generalist label and is ready to compete for high-value, complex engagements.",
    },
    isSpotlight: true,
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
    tools: ["Adobe Illustrator"],
    technologies: ["Laravel", "React", "Tailwind CSS", "Filament PHP"],
    brandColor: "#932E2E",
    assets: {
      cover: "/projects/strawberry-sweets/cover.webp",
      logo: "/projects/strawberry-sweets/logo.svg",
      mockups: [],
      fullPage: "/projects/strawberry-sweets/full-site.webp",
      liveUrl: "https://strawberry-sweets-music.cc",
      showcase: {
        highlight: {
          type: "image",
          url: "/projects/strawberry-sweets/cover.webp",
        },
        images: [
          "/projects/strawberry-sweets/showcase-1.webp",
          "/projects/strawberry-sweets/showcase-2.webp",
        ],
      },
    },
    
  },
  {
    slug: "imbento",
    name: "Imbento",
    year: "2025",
    mission:
      "Inventing a brand identity as playful and original as the concept itself.",
    description:
      "Imbento — rooted in the Filipino spirit of invention — needed a visual identity that lived up to its name. The lettermark was built from scratch: no single typeface, just shapes, custom tweaks, and dynamic forms that give the wordmark a personality flexible enough to stretch across every surface. The packaging system balances clean structure with room for pattern and storytelling, turning every box into a brand touchpoint.",
    aboutMobile:
      "A from-scratch lettermark and packaging system built around the Filipino spirit of invention — playful, flexible, and designed to tell a story on every surface.",
    tags: ["Brand Identity"],
    keywords: ["Wordmark", "Lettermark", "Filipino Brand", "Food Branding", "Custom Typography"],
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
    brandColor: "#FF6358",
    brandColors: [
      "#FF6358",
      "#020113",
      "#EBEAE2",
    ],
    typography: [
      {
        fontFamily: "Urbanist",
        weights: ["Bold"],
        usage: "Brand Logotype",
        fontFile: "/projects/imbento/fonts/urbanist.ttf",
      },
    ],
    assets: {
      cover: "/projects/imbento/cover.webp",
      logo: "/projects/imbento/logo-dark.svg",
      logotype: "/projects/imbento/logotype.svg",
      icon: "/projects/imbento/icon.svg",
      mockups: [
        "/projects/imbento/1.webp",
        "/projects/imbento/2.webp",
        "/projects/imbento/3.webp",
        "/projects/imbento/4.webp",
        "/projects/imbento/5.webp",
        "/projects/imbento/6.webp",
      ],
      sketches: ["/projects/imbento/sketch.webp"],
      vectorization: ["/projects/imbento/logotype-comp.svg"],
      extras:[
        "/projects/imbento/tape.webp",
        "/projects/imbento/pattern.webp",
        "/projects/imbento/sample-post.webp",
        "/projects/imbento/pattern-on-white.webp",
      ],
      showcase: {
        highlight: {
          type: "image",
          url: "/projects/imbento/cover.webp",
        },
        images: [
          "/projects/imbento/showcase-1.webp",
          "/projects/imbento/showcase-2.webp",
        ],
      },
      mindMap: {
      nodes: `
        Imbento
          Invented
            Playful
            Original
            Idea
              Exclamation Point
          Improvised
            Spontaneous
              Surprising
            Hand-crafted
              Custom logotype
            Freestyle
              Shape variety
                Bento/Grid
            
        Invented > Playful
        Invented > Original
        Invented > Idea
        Idea > Exclamation Point
        Improvised > Spontaneous
        Spontaneous > Surprising
        Surprising > Exclamation Point
        Improvised > Hand-crafted  
        Hand-crafted > Custom logotype
        Improvised > Freestyle
        Freestyle > Shape variety
        Shape variety > Bento/Grid     
      `
    },
      conclusions: "Imbento isn't just a food brand — it's a proof of concept that everyday packaging can carry genuine creative weight.",
    },
    isSpotlight: true,
  },
];
