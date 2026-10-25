import type { MetadataRoute } from "next";
import { appliedMath } from "@/lib/curriculum";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url(`/${appliedMath.slug}`), changeFrequency: "weekly", priority: 0.8 },
    ...appliedMath.chapters.map((c) => ({
      url: url(`/${appliedMath.slug}/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: url(`/post/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
