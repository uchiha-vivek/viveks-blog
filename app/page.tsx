import type { ReactNode } from "react";
import Cover from "@/components/Cover";
import Paper from "@/components/Paper";
import { coverOf, posts } from "@/lib/posts";

export default function Home() {
  const covers: Record<string, ReactNode> = {};
  for (const post of posts) {
    const id = coverOf(post);
    if (id) covers[post.slug] = <Cover id={id} />;
  }
  return <Paper posts={posts} covers={covers} />;
}
