// app/projects/bataeno-pass/docs/[slug]/page.tsx
// Place your .mdx files in: content/bataeno-docs/

import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readFile, readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DocMeta {
  title: string;
  description: string;
  slug: string;
  order: number;
}

// ─── File helpers ──────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "src", "lib", "bataeno-docs");

async function getAllDocs(): Promise<DocMeta[]> {
  const files = await readdir(CONTENT_DIR);
  const docs = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await readFile(path.join(CONTENT_DIR, file), "utf-8");
        const { data } = matter(raw);
        return data as DocMeta;
      })
  );
  return docs.sort((a, b) => a.order - b.order);
}

async function getDoc(slug: string) {
  const files = await readdir(CONTENT_DIR);
  const file = files.find((f) => f.endsWith(".mdx") && f.includes(slug));
  if (!file) return null;
  const raw = await readFile(path.join(CONTENT_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  return { meta: data as DocMeta, content };
}

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

// ─── Custom MDX components ─────────────────────────────────────────────────────

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-extrabold tracking-tight text-foreground mt-0 mb-6 pb-4 border-b border-border"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl font-bold text-foreground mt-10 mb-4 scroll-mt-20"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-base font-semibold text-foreground mt-6 mb-3 scroll-mt-20"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-sm text-muted-foreground leading-relaxed mb-4" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-brand underline underline-offset-4 hover:opacity-70 transition-opacity"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside pl-5 mb-4 space-y-1.5 text-sm text-muted-foreground" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside pl-5 mb-4 space-y-1.5 text-sm text-muted-foreground" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-brand/40 pl-4 my-4 text-sm text-muted-foreground italic"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 rounded-md p-4 overflow-x-auto my-6 text-xs font-mono text-zinc-300 leading-relaxed"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 rounded-md border border-border">
      <table className="w-full text-xs border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted/60" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left px-3 py-2 font-semibold text-foreground border-b border-border"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-3 py-2 text-muted-foreground border-b border-border/50 align-top"
      {...props}
    />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-muted/30 transition-colors" {...props} />
  ),
  hr: () => <hr className="border-border my-8" />,
};

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

function DocsSidebar({
  docs,
  activeSlug,
}: {
  docs: DocMeta[];
  activeSlug: string;
}) {
  return (
    <nav className="w-56 shrink-0 sticky top-24 self-start hidden lg:block">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 px-2">
        Bataeño Pass Docs
      </p>
      <ul className="space-y-0.5">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/projects/bataeno-pass/docs/${doc.slug}`}
              className={cn(
                "block px-2 py-1.5 rounded text-sm transition-colors",
                activeSlug === doc.slug
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* External links */}
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
          <span className="w-4 h-4 flex items-center justify-center rounded border border-border text-[9px]">↗</span>
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
  const [doc, allDocs] = await Promise.all([
    getDoc(slug),
    getAllDocs(),
  ]);

  if (!doc) notFound();

  const currentIndex = allDocs.findIndex((d) => d.slug === slug);
  const prev = allDocs[currentIndex - 1] ?? null;
  const next = allDocs[currentIndex + 1] ?? null;

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
        <DocsSidebar docs={allDocs} activeSlug={slug} />

        {/* Content */}
        <main className="flex-1 min-w-0 max-w-3xl">
          {/* Meta */}
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-widest">
            {doc.meta.description}
          </p>

          {/* MDX content */}
          <article className="prose-none">
            <MDXRemote
              source={doc.content}
              components={components}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </article>

          {/* Prev / Next navigation */}
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
