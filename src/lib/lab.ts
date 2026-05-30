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
  | { kind: "link"; url: string; label?: string }
  | { kind: "none" };

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

  // ── Adding more notebook items ────────────────────────────────────────────
  //
  // rawUrl format:
  //   https://raw.githubusercontent.com/<user>/<repo>/main/notebooks/<file>.ipynb
  // colabUrl format (optional):
  //   https://colab.research.google.com/github/<user>/<repo>/blob/main/notebooks/<file>.ipynb

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