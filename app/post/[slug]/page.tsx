import { Fragment } from "react";
import { pageMetadata } from "@/lib/metadata";
import SeriesLesson from "@/components/SeriesLesson";
import { getLessonContext } from "@/lib/lessons";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { appliedMath, getChapterByNumber } from "@/lib/curriculum";
import { getPost, posts } from "@/lib/posts";
import { site } from "@/lib/site";
import { personId } from "@/lib/structured-data";
import { illustrations } from "@/components/illustrations";

const DATE = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return pageMetadata({
    title: `${post.title} | ${site.masthead}`,
    description: post.dek,
    path: `/post/${post.slug}`,
    imageKey: `post-${post.slug}`,
    imagePath: post.shareImage,
    publishedTime: `${post.date}T00:00:00+05:30`,
    section: post.topic,
    tags: post.tags,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const lessonContext = getLessonContext(slug);
  const chapter =
    post.chapter !== undefined ? getChapterByNumber(post.chapter) : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.dek,
    datePublished: `${post.date}T00:00:00+05:30`,
    url: new URL(`/post/${post.slug}`, site.url).toString(),
    author: { "@type": "Person", "@id": personId, name: site.author, url: site.url },
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
  };

  return (
    <div className="shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link href="/" className="back">
        ← {site.masthead}
      </Link>

      <article className="article">
        <div className="byline">
          <span>By {site.author}</span>
          <span className="sep">·</span>
          <span style={{ color: "var(--accent)" }}>
            {post.topic.toUpperCase()}
          </span>
          {chapter && (
            <>
              <span className="sep">·</span>
              <Link href={`/${appliedMath.slug}/${chapter.slug}`}>
                Ch. {chapter.n} · {chapter.title}
              </Link>
            </>
          )}
          {post.signal && (
            <>
              <span className="sep">·</span>
              <span>{post.signal.replace("-", " ").toUpperCase()}</span>
            </>
          )}
          <span className="info">{DATE.format(new Date(post.date))}</span>
          <span className="info">· {post.readingTime} min read</span>
        </div>

        <h1>{post.title}</h1>
        <p className="dek">{post.dek}</p>

        {post.tags && post.tags.length > 0 && (
          <ul className="tags" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}

        <hr className="rule" />

        {lessonContext ? <SeriesLesson {...lessonContext} /> : (
          <div className="body">
            {post.body.map((para, i) => (
              <Fragment key={i}>
                <p className={i === 0 ? "dropcap" : undefined}>{para}</p>
                {post.illustrations
                  ?.filter((ill) => ill.after === i)
                  .map(({ id }) => {
                    const Illustration = illustrations[id];
                    return <Illustration key={id} />;
                  })}
              </Fragment>
            ))}
          </div>
        )}

        {post.sourceUrl && (
          <p style={{ marginTop: 32 }}>
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--accent)" }}
            >
              Read the source ›
            </a>
          </p>
        )}
      </article>

      <footer className="footer">
        <span>
          {site.masthead}, curated by {site.author} · ©{" "}
          {new Date().getFullYear()}
        </span>
        <div className="colophon">
          <div className="colophon-text">
            <span className="name">{site.author}</span>
            <span className="role">
              {site.role} · {site.company}
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="colophon-logo"
            src={site.logo}
            alt={`${site.company} logo`}
            width={40}
            height={40}
          />
        </div>
      </footer>
    </div>
  );
}
