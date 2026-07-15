// app/projects/worship-tools/docs/page.tsx

import Link from "next/link";
import MDXContent from "@/app/projects/worship-tools/docs/readme.mdx";

// ─── Page ──────────────────────────────────────────────────────────────────────
// Worship Tools only has one doc (README), so this is a static page instead of
// the [slug]-based registry/sidebar/prev-next setup used by projects with
// multiple docs — no routing, no registry, no per-doc metadata needed.

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <div className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/projects/worship-tools"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Project
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <span className="text-xs font-medium text-foreground">
              Documentation
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Public · Read-only
          </span>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <main className="max-w-3xl mx-auto">
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-widest">
            Worship Tools — PowerPoint Add-In README
          </p>

          <article>
            <MDXContent />
          </article>
        </main>
      </div>
    </div>
  );
}
