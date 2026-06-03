// ─── Lab Item Types ───────────────────────────────────────────────────────────

export type LabType =
  | "data"         // Data engineering, EDA, Python notebooks, analytics pipelines
  | "simulation"   // Interaction prototyping, functional motion, system state visualization
  | "prototype"    // Rapid MVPs, experimental apps, full-stack sandbox environments
  | "automation"   // Workflow scripts, macros, environment constraints (e.g., VB, advanced Excel)
  | "logic"        // Core programming scripts, game mechanics, algorithmic sandboxes
  | "misc";        // Alternative technical experiments and post-mortems

export type LabStatus = "scrapped" | "wip" | "done" | "archived";

export type LabMediaType =
  | { kind: "image"; url: string }
  | { kind: "images"; urls: string[] }
  | { kind: "video"; url: string }
  | { kind: "embed"; url: string }
  | {
      kind: "notebook";
      notebooks: {
        label: string;
        rawUrl: string;
        colabUrl?: string;
      }[];
    }
  | { kind: "code"; snippet: string; lang: string } // Added capability to render raw code blocks
  | { kind: "link"; url: string; label?: string }
  | { kind: "none" };

export type LabContentBlock = {
  title?: string;
  text?: string;
  codeSnippets?: { title?: string; description?: string; snippet: string; lang: string }[];
};

export type LabItem = {
  id: string;
  title: string;
  type: LabType;
  status: LabStatus;
  year: number;
  description: string;
  note?: string;
  media: LabMediaType;
  tags?: string[];
  accentColor?: string;
  // Extra links shown in the lightbox (e.g. second notebook, GitHub repo)
  links?: { label: string; url: string }[];
  content?: LabContentBlock[]; // Storytelling blocks with text and code
};

// ─── Lab Items ────────────────────────────────────────────────────────────────

export const LAB_ITEMS: LabItem[] = [
  {
    id: "coffee-quality-eda",
    title: "Coffee Extraction Quality: Exploratory Data Analysis",
    type: "data",
    status: "done",
    year: 2025,
    description:
      "A Jupyter Notebook experiment leveraging Python to clean, analyze, and visualize multi-variable extraction data. Built to uncover statistical correlations between processing methods and final sensory profiles.",
    note:
      "First of two notebooks — surfaces raw patterns in the dataset. A second notebook follows up with statistical validation to stress-test the findings.",
    media: {
      kind: "notebook",
      notebooks: [
        {
          label: "Exploratory Data Analysis",
          rawUrl: "https://raw.githubusercontent.com/Kev-003/coffee-quality-eda/main/notebooks/coffee_quality_eda.ipynb",
          colabUrl: "https://colab.research.google.com/github/Kev-003/coffee-quality-eda/blob/main/notebooks/coffee_quality_eda.ipynb",
        },
        {
          label: "Statistical Validation",
          rawUrl: "https://raw.githubusercontent.com/Kev-003/coffee-quality-eda/main/notebooks/Phase_8_statistical_validation.ipynb",
          colabUrl: "https://colab.research.google.com/github/Kev-003/coffee-quality-eda/blob/main/notebooks/Phase_8_statistical_validation.ipynb",
        }
      ]
    },
    tags: ["python", "pandas", "eda", "data-science-sandbox"],
    accentColor: "#c8a97e",
  },
  {
    id: "clean-count",
    title: "Clean Count: High-Fidelity System Simulation",
    type: "simulation",
    status: "done",
    year: 2025,
    description: 
      "A dynamic visual simulation engineered to map out user flow, data transitions, and system states for a rapid-prototype hackathon pitch. Built to test product interaction architecture under severe time constraints.",
    media: { kind: "video", url: "/lab/clean-count.mp4" },
    tags: ["system-simulation", "interaction-design", "rapid-prototyping"],
  },
  {
    id: "worship-tools",
    title: "Worship Tools: Church Production & Workflow Automation",
    type: "automation",
    status: "archived",
    year: 2026,
    description:
      "A native PowerPoint VSTO desktop add-in built to replace expensive church production SaaS subscriptions. Hooking directly into PowerPoint's native COM object model via VB.NET, the tool programmatically parses text data to auto-generate perfectly scaled lyric layouts. Crucially, it interfaces with a database layout to instantly query and inject unscripted scripture slides on the fly mid-service, bypassing the stress of manual copy-pasting when preachers call out unannounced verses in real time.",
    note: 
      "While the background layout logic worked flawlessly under high live-production constraints, it exposed inherent limitations within PowerPoint's native rendering thread, which cuts media clocks during slide changes and compromises continuous, gapless motion background video loops.",
    media: { kind: "video", url: "/lab/worship-tools-showcase.mp4" }, // Generic slot for your 1 MP4 video
    tags: ["vb.net", "vsto", "ms-office-api", "workflow-automation"],
    accentColor: "#4f46e5",
    content: [
      {
        title: "The Overpriced SaaS Problem",
        text: "Church presentation and worship projection software today is locked behind massive, recurring subscription paywalls. For smaller congregations and local churches operating on tight budgets, paying hundreds of dollars a year for a tool just to display lyrics and manage service slides is an unnecessary financial bottleneck. I wanted to build a free alternative that met our volunteers exactly where they were—using a tool they already understood: Microsoft PowerPoint."
      },
      {
        title: "The Live-Production Chaos",
        text: "Beyond the tedious hours spent manually copy-pasting lyrics during pre-production, the real challenge happens live. Preachers frequently call out unscripted scripture verses mid-sermon that were never provided beforehand. In a standard setup, this throws the media team into a panic—frantically trying to open a browser, look up the verse, copy it, create a new slide, adjust font sizing, and deploy it in seconds before the speaker finishes reading."
      },
      {
        title: "The Architecture & V1 Solution",
        text: "To solve this, I engineered a native PowerPoint VSTO (Visual Studio Tools for Office) Add-In using VB.NET.\n\nBy hooking directly into PowerPoint’s native COM object model via the MS-Office-API, the tool exposes an automation utility right inside the native Office Ribbon. It automates text parsing, dynamically scales fonts, and handles multi-slide lyric distribution. Most importantly, it allows the team to query a scripture database and instantly generate an unscripted verse slide on the fly mid-service."
      },
      {
        title: "Inside the VSTO Logic",
        codeSnippets: [
          {
            title: "LyricSearchPane.vb",
            description: "Tiered Performance-Minded Search Strategy",
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
End Sub`
          },
          {
            title: "AddToSlide.vb",
            description: "Visual Logic Layout Mapper & Sorting",
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

' Crucial Fix: Sort by vertical position so data order strictly matches visual layout
nonTitlePlaceholders.Sort(Function(a, b) a.Top.CompareTo(b.Top))

' Contextual injection based on available layout slots
If nonTitlePlaceholders.Count >= 2 Then
    nonTitlePlaceholders(0).TextFrame.TextRange.Text = citation
    nonTitlePlaceholders(1).TextFrame.TextRange.Text = passage.Trim()
Else
    ' Dynamic Fallback: Programmatically construct balanced text boundaries on the fly
    AddTextboxSlide(newSlide, citation, passage, 36)
End If`
          },
          {
            title: "BibleFetch.vb",
            description: "Zero-Dependency JSON String Extractor",
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
End Function`
          }
        ]
      },
      {
        title: "The Technical Roadblock",
        text: "While the V1 desktop add-in solved the automation and real-time scripture problems flawlessly, it ran into a hard architectural limitation native to PowerPoint itself.\n\nPowerPoint treats media elements as isolated shapes bound tightly to the timeline of an individual slide. Because of this structural constraint, the underlying hardware audio/video clock cuts or resets during slide transitions. This makes it structurally impossible to play modern, high-end motion backgrounds in a smooth, continuous, uninterrupted loop across multiple lyric slides. However, a future architectural overhaul to decouple the rendering thread and build a custom presentation engine is currently under development to address this constraint."
      }
    ]
  },

  // ── Adding more notebook items ────────────────────────────────────────────
  //
  // rawUrl format:
  //    https://raw.githubusercontent.com/<user>/<repo>/main/notebooks/<file>.ipynb
  // colabUrl format (optional):
  //    https://colab.research.google.com/github/<user>/<repo>/blob/main/notebooks/<file>.ipynb

];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const LAB_TYPE_LABELS: Record<LabType, string> = {
  data: "Data Sandbox",
  simulation: "System Simulation",
  prototype: "Rapid MVP",
  automation: "Automation & Scripting",
  logic: "Algorithmic Logic",
  misc: "Technical Post-Mortem",
};

export const LAB_STATUS_LABELS: Record<LabStatus, string> = {
  scrapped: "Scrapped",
  wip: "WIP",
  done: "Done",
  archived: "Archived",
};

export const LAB_STATUS_COLORS: Record<LabStatus, string> = {
  scrapped: "text-destructive border-destructive/20 bg-destructive/10",
  wip: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  done: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  archived: "text-zinc-500 border-zinc-700 bg-zinc-800/30",
};