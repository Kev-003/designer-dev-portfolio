import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kevern.cc";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/lab`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic project routes from the projects data
  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
