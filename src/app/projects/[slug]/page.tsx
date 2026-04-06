import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import { ProjectLayout } from "@/components/sections/ProjectLayout";

// Pre-generate all project pages at build time
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Kevern`,
    description: project.mission,
    keywords: project.keywords?.join(", "),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  return <ProjectLayout project={project} />;
}
