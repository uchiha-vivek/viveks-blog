import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { appliedMath, getChapter } from "@/lib/curriculum";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return appliedMath.chapters.map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}): Promise<Metadata> {
  const { chapter } = await params;
  const c = getChapter(chapter);
  if (!c) return { title: site.masthead };
  return {
    title: `Chapter ${c.n}: ${c.title} — ${site.masthead}`,
    description: c.sections.join(", ") || appliedMath.title,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;
  const c = getChapter(chapter);
  if (!c) notFound();

  const entries = posts.filter((p) => p.chapter === c.n);
  const prev = appliedMath.chapters.find((x) => x.n === c.n - 1);
  const next = appliedMath.chapters.find((x) => x.n === c.n + 1);

  return (
    <div className="shell">
      <Link href={`/${appliedMath.slug}`} className="back">
        ← {appliedMath.title}
      </Link>

      <header className="section-head">
        <div className="kicker">
          Chapter {c.n} of {appliedMath.chapters.length}
        </div>
        <h1>{c.title}</h1>
        {c.sections.length > 0 && (
          <ul className="section-list">
            {c.sections.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
      </header>

      <hr className="rule" />

      {entries.length === 0 ? (
        <div className="empty">Entries for this chapter are coming soon.</div>
      ) : (
        <div className="grid">
          {entries.map((post) => (
            <Link key={post.slug} href={`/post/${post.slug}`} className="story">
              <div className="byline">
                <span>By {site.author}</span>
                <span className="sep">·</span>
                <span style={{ color: "var(--accent)" }}>
                  {post.readingTime} MIN
                </span>
              </div>
              <h3>{post.title}</h3>
              <div className="fade">
                <p className="dropcap">{post.body[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <nav className="chapter-nav">
        {prev ? (
          <Link href={`/${appliedMath.slug}/${prev.slug}`}>
            ← {prev.n}. {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/${appliedMath.slug}/${next.slug}`}>
            {next.n}. {next.title} →
          </Link>
        )}
      </nav>

      <Footer />
    </div>
  );
}
