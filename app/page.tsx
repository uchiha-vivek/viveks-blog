import Paper from "@/components/Paper";
import { posts } from "@/lib/posts";

export default function Home() {
  return <Paper posts={posts} />;
}
