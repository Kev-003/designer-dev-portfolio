// app/projects/bataeno-pass/docs/[slug]/page.tsx

import { notFound } from "next/navigation";
import { readdir } from "fs/promises";
import path from "path";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DocMeta {
  title: string;
  description: string;
  order: number;
}

// ─── Doc registry ─────────────────────────────────────────────────────────────
// Each doc exports a `meta` object from its page.mdx.
// Add entries here when you add new MDX pages.

const DOC_REGISTRY: Record<string, DocMeta> = {
  overview: {
    title: "Project Overview",
    description: "Bataeño Pass — Barangay-Level Implementation",
    order: 1,
  },
  architecture: {
    title: "System Architecture",
    description:
      "Multi-tenancy, data flow, real-time, and infrastructure design",
    order: 2,
  },
  features: {
    title: "Feature Specifications",
    description: "The seven core features of the Barangay Module",
    order: 3,
  },
  database: {
    title: "Database Design",
    description:
      "38-table schema across 8 functional groups with design rationale",
    order: 4,
  },
  decisions: {
    title: "Key Design Decisions",
    description: "Architecture tradeoffs and the rationale behind them",
    order: 5,
  },
  changelog: {
    title: "Development Changelog",
    description: "6-week development log from February 2 to March 10, 2026",
    order: 6,
  },
};

const SORTED_DOCS = Object.entries(DOC_REGISTRY)
  .map(([slug, meta]) => ({ slug, ...meta }))
  .sort((a, b) => a.order - b.order);

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return SORTED_DOCS.map((doc) => ({ slug: doc.slug }));
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function DocsSidebar({ activeSlug }: { activeSlug: string }) {
  return (
    <nav className="w-56 shrink-0 sticky top-24 self-start hidden lg:block">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 px-2">
        Bataeño Pass Docs
      </p>
      <ul className="space-y-0.5">
        {SORTED_DOCS.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/projects/bataeno-pass/docs/${doc.slug}`}
              className={cn(
                "block px-2 py-1.5 rounded text-sm transition-colors",
                activeSlug === doc.slug
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-border px-2 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
          External
        </p>
        <a
          href="https://dbdiagram.io/d/ERDBrgy-697aaeb0bd82f5fce2f3aac1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="w-4 h-4 flex items-center justify-center rounded border border-border text-[9px]">
            ↗
          </span>
          ERD Diagram
        </a>
      </div>
    </nav>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const meta = DOC_REGISTRY[slug];
  if (!meta) notFound();

  // Dynamically import the MDX file for this slug.
  // @next/mdx compiles each file into a React Server Component.
  let MDXContent: React.ComponentType;
  try {
    switch (slug) {
      case "overview":
        MDXContent = (await import(`@/app/projects/bataeno-pass/docs/overview/01-overview.mdx`)).default;
        break;
      case "architecture":
        MDXContent = (await import(`@/app/projects/bataeno-pass/docs/architecture/02-architecture.mdx`)).default;
        break;
      case "features":
        MDXContent = (await import(`@/app/projects/bataeno-pass/docs/features/03-features.mdx`)).default;
        break;
      case "database":
        MDXContent = (await import(`@/app/projects/bataeno-pass/docs/database/04-database.mdx`)).default;
        break;
      case "decisions":
        MDXContent = (await import(`@/app/projects/bataeno-pass/docs/decisions/05-decisions.mdx`)).default;
        break;
      case "changelog":
        MDXContent = (await import(`@/app/projects/bataeno-pass/docs/changelog/06-changelog.mdx`)).default;
        break;
      default:
        throw new Error("MDX file not found");
    }
  } catch {
    notFound();
  }

  const currentIndex = SORTED_DOCS.findIndex((d) => d.slug === slug);
  const prev = SORTED_DOCS[currentIndex - 1] ?? null;
  const next = SORTED_DOCS[currentIndex + 1] ?? null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <div className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/projects/bataeno-pass"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Project
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <span className="text-xs font-medium text-foreground">
              Technical Documentation
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Public · Read-only
          </span>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-16">
        <DocsSidebar activeSlug={slug} />

        {/* Content */}
        <main className="flex-1 min-w-0 max-w-3xl">
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-widest">
            {meta.description}
          </p>

          <article>
            <MDXContent />
          </article>

          {/* Prev / Next */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
            {prev ? (
              <Link
                href={`/projects/bataeno-pass/docs/${prev.slug}`}
                className="group flex flex-col gap-1"
              >
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                  ← Previous
                </span>
                <span className="text-sm font-medium text-foreground">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/projects/bataeno-pass/docs/${next.slug}`}
                className="group flex flex-col gap-1 text-right"
              >
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                  Next →
                </span>
                <span className="text-sm font-medium text-foreground">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
