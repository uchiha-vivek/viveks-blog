import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageMetadata({
  title,
  description,
  path,
  imageKey,
  imagePath,
  publishedTime,
  section,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  imageKey: string;
  imagePath?: string; // static 1200×630 PNG in /public; overrides the generated card
  publishedTime?: string;
  section?: string;
  tags?: string[];
}): Metadata {
  const url = new URL(path, site.url).toString();
  const image = {
    url: new URL(imagePath ?? `/share/${imageKey}?v=2`, site.url).toString(),
    width: 1200,
    height: 630,
    type: "image/png",
    alt: `${title}, by ${site.author}`,
  };

  return {
    title,
    description,
    ...(tags?.length ? { keywords: tags } : {}),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.masthead,
      locale: "en_US",
      images: [image],
      ...(publishedTime
        ? { type: "article", publishedTime, authors: [site.author], section, tags }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      creator: site.xHandle,
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
