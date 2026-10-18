import { appliedMath } from "@/lib/curriculum";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export const shareCards = [
  { key: "home", label: "NOTES FROM THE BOTTOM OF THE STACK", title: site.masthead, description: site.description, callToAction: "Read the articles" },
  { key: "mathematics", label: "THE MATHEMATICS COLLECTION", title: appliedMath.title, description: "13 chapters connecting mathematical ideas with practical applications.", callToAction: "Explore the chapters" },
  ...appliedMath.chapters.map((chapter) => ({
    key: `chapter-${chapter.slug}`,
    label: `APPLIED MATHEMATICS / CHAPTER ${chapter.n}`,
    title: chapter.title,
    callToAction: "Explore the chapter",
    description: chapter.sections.length ? chapter.sections.join(" · ") : `Explore ${chapter.title.toLowerCase()} in the Applied Mathematics collection.`,
  })),
  ...posts.map((post) => ({ key: `post-${post.slug}`, label: post.topic.toUpperCase(), title: post.title, description: post.dek, callToAction: "Read the article" })),
];
