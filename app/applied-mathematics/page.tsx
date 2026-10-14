import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { appliedMath } from "@/lib/curriculum";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${appliedMath.title} — ${site.masthead}`,
  description: `A ${appliedMath.chapters.length}-chapter tour of applied mathematics.`,
};

export default function AppliedMathematicsPage() {
  const countFor = (n: number) => posts.filter((p) => p.chapter === n).length;

  return (
    <div className="shell">
      <Link href="/" className="back">
        ← {site.masthead}
      </Link>

      <header className="section-head">
        <div className="kicker">Mathematics</div>
        <h1>{appliedMath.title}</h1>
        <p className="dek">
          {appliedMath.chapters.length} chapters, from series and complex
          numbers to PDEs and probability — each one worked through with real
          applications.
        </p>
      </header>

      <hr className="rule" />

      <ol className="chapters">
        {appliedMath.chapters.map((c) => {
          const count = countFor(c.n);
          return (
            <li key={c.slug}>
              <Link
                href={`/${appliedMath.slug}/${c.slug}`}
                className="chapter-row"
              >
                <span className="chapter-num">{c.n}</span>
                <span className="chapter-main">
                  <span className="chapter-title">{c.title}</span>
                  {c.sections.length > 0 && (
                    <span className="chapter-sections">
                      {c.sections.join(" · ")}
                    </span>
                  )}
                </span>
                <span className="chapter-count">
                  {count === 0
                    ? "Coming soon"
                    : `${count} ${count === 1 ? "entry" : "entries"}`}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <Footer />
    </div>
  );
}
