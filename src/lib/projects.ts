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

/**
 * A single narrative beat in a project's build story — used for engineering-
 * heavy projects (e.g. desktop tools, automation) where the interesting part
 * is the *how* and *why*, not just the final visual output. Optionally carries
 * one or more code snippets to illustrate the implementation.
 */
export type ProjectContentBlock = {
  title?: string;
  text?: string;
  codeSnippets?: {
    title?: string;
    description?: string;
    snippet: string;
    lang: string;
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
  /**
   * Optional build-story beats rendered between the Overview and Showcase
   * sections — prose + code, for projects where the engineering narrative
   * is worth walking through (ported from the same shape used in lab.ts).
   */
  content?: ProjectContentBlock[];

  isSpotlight?: boolean;
  assets: ProjectAssets;
};

export const PROJECTS: Project[] = [
  {
    slug: "courant",
    name: "Courant",
    year: "2025",
    mission:
      "Full-stack architecture and multi-device visual design token system for an AI-powered IoT energy telemetry platform.",
    description:
      "Courant bridges the gap between high-frequency concurrent IoT data pipelines and accessible user execution. As a technical founder, I structured a systematic visual token pipeline that compiled across hardware documentation, physical user manuals, research colloquium assets, and a responsive web application. The core challenge was designing a predictable frontend architecture capable of rendering real-time streaming telemetry and Isolation Forest anomalies into strict, intuitive UI layouts without performance degradation.",
    aboutMobile:
      "A smart power management interface translating streaming IoT telemetry and model analytics into predictable, zero-latency visual states.",
    tags: ["Systems Design", "Frontend Engineering", "Data Visualization"],
    keywords: ["Realtime Monitoring", "Cost Optimization", "Sustainability", "IoT", "Clean Energy", "Design Tokens"],
    technologies: ["Filament PHP", "Laravel", "Tailwind CSS", "Alpine.js", "MySQL", "Flask", "Python", "TensorFlow", "PlatformIO", "Scikit-learn", "MQTT"],
    tools: ["Adobe After Effects", "Adobe Illustrator", "Adobe Photoshop", "Figma"],
    team: [
      {
        name: "John Edmerson Pizarra",
        role: "Lead Backend Developer, ML Researcher",
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
        role: "Co-Founder, Systems Designer, Frontend Engineer, Documentation Lead",
      },
    ],
    brandColor: "#e8a216",
    brandColors: ["#e8a216", "#131313", "#EAEAEA", "#D7D6D6"],
    typography: [
      {
        fontFamily: "August Bold",
        weights: ["Bold"],
        usage: "Brand System Anchors",
        fontFile: "/projects/courant/fonts/august-bold.ttf",
      },
      {
        fontFamily: "Helvetica",
        weights: ["Regular", "Medium", "Bold"],
        usage: "Product Telemetry Interface",
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
      conclusions: "MSMEs don't have dedicated facilities engineers — they need a layout that speaks with absolute precision and surfaces errors before hardware damage occurs. Courant's design tokens were engineered around that reality. The logomark distills the system's underlying logic: high-frequency technical performance wrapped in structural, uniform boundaries. Color utility is purely algorithmic—functional yellow tokens trigger exclusively for anomaly thresholds, multi-tenant alert states, and hardware failures. The implementation successfully flattened complex LLM predictions and deep metrics into a clean, predictable utility dashboard.",
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
    tags: ["Full-Stack Engineering", "System Architecture", "Database Design"],
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
      liveUrl: "https://bataeno-pass-barangay.kevern.cc/",
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
    slug: "worship-tools",
    name: "Worship Tools",
    year: "2026",
    mission:
      "A native PowerPoint VSTO add-in that replaces paid worship-presentation SaaS with real-time lyric slides and live scripture lookup, built directly into PowerPoint's object model.",
    description:
      "Worship Tools is a VSTO add-in engineered in VB.NET that hooks directly into PowerPoint's native COM object model. It exists to close two gaps at once: the recurring subscription cost of commercial worship-presentation software, and the live-production panic when a preacher calls out an unscripted Bible verse mid-sermon. A tiered, performance-conscious search indexes song libraries by filename first and falls back to a content-level scan, so results stay fast even as the library grows. A companion Node process (YouVersion.exe) runs locally on the machine to serve scripture across dozens of versions and languages on demand. A layout-mapping engine reads the active slide master, sorts placeholders by vertical position, and injects lyrics or verses into custom `Lyrics` and `Verse` layouts when they exist — falling back to safe default textboxes when they don't, so nothing ever breaks a live service.",
    aboutMobile:
      "A free PowerPoint add-in for churches — instant lyric slides and live scripture lookup, engineered directly into PowerPoint's object model.",
    tags: ["Desktop Engineering", "Systems Automation", "Developer Tooling"],
    keywords: ["Church Tech", "VSTO", "PowerPoint Automation", "Live Production", "COM Interop"],
    technologies: ["VB.NET", "VSTO", "MS Office COM API", ".NET Framework 4.8", "Node.js", "ClickOnce"],
    brandColor: "#4f46e5",
    assets: {
      cover: "/projects/worship-tools/cover.webp",
      mockups: [
        "/projects/worship-tools/sidebar-search.webp",
        "/projects/worship-tools/scripture-panel.webp",
        "/projects/worship-tools/add-song-dialog.webp",
      ],
      showcase: {
        highlight: {
          type: "video",
          url: "/projects/worship-tools/showcase.mp4",
        },
        images: [
          "/projects/worship-tools/cover.webp",
          "/projects/worship-tools/showcase-2.webp",
        ],
      },
      liveUrl: "https://kevern.gumroad.com/l/gxrycs",
      mdxDocs: [
        { title: "Project Overview", description: "Worship Tools — PowerPoint Add-In", url: "/projects/worship-tools/docs" },
      ]
    },
    content: [
      {
        title: "The Overpriced SaaS Problem",
        text: "Church presentation software is typically locked behind recurring subscription paywalls. For smaller congregations running on volunteer labor and tight budgets, paying every year just to display lyrics and manage service slides is an unnecessary bottleneck. I wanted a free alternative that met volunteers exactly where they already were: Microsoft PowerPoint.",
      },
      {
        title: "The Live-Production Chaos",
        text: "Beyond the tedious pre-production hours spent copy-pasting lyrics, the real pressure happens live. Preachers regularly call out unscripted scripture mid-sermon. In a standard setup, that sends the media team scrambling — open a browser, look up the verse, copy it, build a new slide, fix the font size, deploy it before the speaker moves on.",
      },
      {
        title: "The Architecture & V1 Solution",
        text: "I built a native VSTO (Visual Studio Tools for Office) add-in in VB.NET that hooks directly into PowerPoint's COM object model, exposing the tool as a utility right inside the Office ribbon. It automates text parsing, scales fonts dynamically, handles multi-slide lyric distribution, and queries a scripture database to generate an unscripted verse slide on the fly, mid-service.",
      },
      {
        title: "Inside the VSTO Logic",
        codeSnippets: [
          {
            title: "LyricSearchPane.vb",
            description: "Tiered, performance-minded search strategy",
            lang: "vbnet",
            snippet: `Private Sub BuildTiers(files As List(Of String), filter As String,
                       tier1 As List(Of String), tier2 As List(Of String), tier3 As List(Of String))
    For Each f As String In files
        Dim name As String = Path.GetFileNameWithoutExtension(f)

        If name.StartsWith(filter, StringComparison.OrdinalIgnoreCase) Then
            tier1.Add(f) ' Tier 1: Exact prefix matches
        ElseIf name.IndexOf(filter, StringComparison.OrdinalIgnoreCase) >= 0 Then
            tier2.Add(f) ' Tier 2: Inline filename matches
        Else
            Try ' Tier 3: Content-level deep scan fallback
                Dim content As String = File.ReadAllText(f)
                If content.IndexOf(filter, StringComparison.OrdinalIgnoreCase) >= 0 Then
                    tier3.Add(f)
                End If
            Catch
                ' Gracefully bypass isolated file I/O locks during live services
            End Try
        End If
    Next
End Sub`,
          },
          {
            title: "AddToSlide.vb",
            description: "Visual layout mapper & placeholder sorting",
            lang: "vbnet",
            snippet: `' Collect all non-title placeholders in shape index order
Dim nonTitlePlaceholders As New List(Of PowerPoint.Shape)
For Each shape As PowerPoint.Shape In newSlide.Shapes
    If shape.Type = MsoShapeType.msoPlaceholder AndAlso shape.HasTextFrame Then
        Dim pt = shape.PlaceholderFormat.Type
        If pt <> PowerPoint.PpPlaceholderType.ppPlaceholderTitle AndAlso
           pt <> PowerPoint.PpPlaceholderType.ppPlaceholderCenterTitle Then
            nonTitlePlaceholders.Add(shape)
        End If
    End If
Next

' Crucial fix: sort by vertical position so data order strictly matches visual layout
nonTitlePlaceholders.Sort(Function(a, b) a.Top.CompareTo(b.Top))

' Contextual injection based on available layout slots
If nonTitlePlaceholders.Count >= 2 Then
    nonTitlePlaceholders(0).TextFrame.TextRange.Text = citation
    nonTitlePlaceholders(1).TextFrame.TextRange.Text = passage.Trim()
Else
    ' Dynamic fallback: programmatically construct balanced text boundaries on the fly
    AddTextboxSlide(newSlide, citation, passage, 36)
End If`,
          },
          {
            title: "BibleFetch.vb",
            description: "Zero-dependency JSON string extractor",
            lang: "vbnet",
            snippet: `Public Shared Function FromJson(json As String) As BibleFetchResult
    Dim result As New BibleFetchResult()
    result.Citation = ExtractJsonString(json, "citation")
    result.Passage = ExtractJsonString(json, "passage")
    Return result
End Function

Private Shared Function ExtractJsonString(json As String, key As String) As String
    Dim searchKey = $"""{key}"""
    Dim keyIdx = json.IndexOf(searchKey)
    If keyIdx < 0 Then Return String.Empty

    Dim colonIdx = json.IndexOf(":"c, keyIdx + searchKey.Length)
    Dim quoteStart = json.IndexOf(""""c, colonIdx + 1)
    Dim quoteEnd = json.IndexOf(""""c, quoteStart + 1)
    If quoteStart < 0 OrElse quoteEnd < 0 Then Return String.Empty

    Return json.Substring(quoteStart + 1, quoteEnd - quoteStart - 1)
End Function`,
          },
        ],
      },
      {
        title: "The Technical Roadblock",
        text: "The V1 add-in solved the automation and real-time scripture problems cleanly, but ran into a hard limitation native to PowerPoint itself. PowerPoint treats media as isolated shapes bound to a single slide's timeline, so the audio/video clock resets on every slide transition — making a smooth, continuous motion background across multiple lyric slides structurally impossible in the current architecture. That constraint is now the spec for a follow-up: a decoupled rendering engine that owns the presentation clock instead of PowerPoint.",
      },
      {
        title: "Shipping It",
        text: "Worship Tools installs via a signed ClickOnce package, ships with a bundled YouVersion.exe for the Bible API, and supports English and Filipino scripture versions out of the box. It's now in active use running live service slides, and available for other volunteer media teams to install for free.",
      },
    ],
    isSpotlight: false,
  },
  {
    slug: "edmer-software",
    name: "Edmer Software Solutions",
    year: "2025",
    mission:
      "Corporate identity system and responsive interface constraints for a full-stack developer consultancy.",
    description:
      "A brand engineering initiative translated into a robust corporate architecture. Edmer Software required an integrated visual specification built to signal high technical competency for international enterprise engagements. The asset framework operates inside strict geometric layouts and deterministic contrast rules to mirror structural precision across software pipelines.",
    aboutMobile:
      "A visual identity specification tracking geometric layouts and high-contrast styling boundaries for enterprise engineering consulting.",
    tags: ["Visual Systems Architecture"],
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
        usage: "System Typography Specs",
        fontFile: "/projects/edmer-software/fonts/PlusJakartaSans-VariableFont_wght.ttf",
      },
      {
        fontFamily: "Chakra Petch",
        weights: ["Medium"],
        usage: "Action & Callout Interface Layer",
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
      conclusions: "Through structured discovery, the brand's core architecture was mapped out: a high-efficiency solution framework engineered to deploy at the intersection of enterprise integration and modern full-stack web applications. The resulting visual schema ensures clear technical alignment across high-value B2B software engagements.",
    },
    isSpotlight: false, // Hidden from core hero page rotation
  },
  {
    slug: "strawberry-sweets",
    name: "Strawberry Sweets",
    year: "2026",
    mission:
      "Full-stack discography application deploying relational media schemas and a custom administrative content management pipeline.",
    description:
      "A full-stack media platform engineered to catalog and distribute independent audio assets. Moving away from rigid, static information architectures, this application models a database relational structure to connect and query track listings, album groupings, lyrical string data, and localized streaming paths. I built an administrative portal with Filament PHP to govern strict upload parameters and automated asset mapping, matching a decoupled React frontend tailored for seamless track rendering.",
    aboutMobile:
      "A full-stack application leveraging relational media modeling and integrated administrative dashboards for structured audio distribution.",
    tags: ["Full-Stack Engineering", "Database Modeling", "Content Architecture"],
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
    isSpotlight: true, // Re-activated for Core Hero spotlight loop
  },
  {
    slug: "imbento",
    name: "Imbento",
    year: "2025",
    mission:
      "Custom procedural layout mechanics and strict spatial packaging system built from modular vectors.",
    description:
      "Imbento required an analytical blueprint for custom typography and packaging variables. The visual engine was assembled programmatically without standard off-the-shelf typefaces; instead, it utilizes strict geometric shapes, custom vector properties, and responsive layout scaling. The resulting packaging asset ruleset coordinates dynamic structural repeats and scalable assets across complex physical configurations.",
    aboutMobile:
      "A mathematical visual framework and strict parametric packaging matrix built around modular structural vectors.",
    tags: ["Visual Systems Architecture"],
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
        usage: "Parametric System Wordmark Anchor",
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
      extras: [
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
      conclusions: "Imbento serves as a comprehensive case study in applying systematic parametric asset boundaries to consumer tangible pipelines.",
    },
    isSpotlight: false, // Hidden from core hero page rotation
  },
];