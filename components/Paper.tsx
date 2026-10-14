"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { appliedMath } from "@/lib/curriculum";
import { site, type Topic } from "@/lib/site";

const FULL_DATE = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function Byline({ post }: { post: Post }) {
  return (
    <div className="byline">
      <span>By {site.author}</span>
      <span className="sep">·</span>
      <span style={{ color: "var(--accent)" }}>{post.topic.toUpperCase()}</span>
      {post.sourceUrl && (
        <>
          <span className="sep">·</span>
          <a href={post.sourceUrl} target="_blank" rel="noreferrer">
            Discuss ›
          </a>
        </>
      )}
      <span className="info" title={`${post.readingTime} min read`}>
        ⓘ {post.readingTime} min
      </span>
    </div>
  );
}

export default function Paper({ posts }: { posts: Post[] }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const el = document.documentElement;
    if (next === "light") el.setAttribute("data-theme", "light");
    else el.removeAttribute("data-theme");
    try {
      localStorage.setItem("tdd-theme", next === "light" ? "light" : "dark");
    } catch {}
  }

  const [topic, setTopic] = useState<Topic | "all">("all");

  const filtered = useMemo(
    () => (topic === "all" ? posts : posts.filter((p) => p.topic === topic)),
    [posts, topic],
  );
  const lead = filtered.find((p) => p.topStory) ?? filtered[0];
  const rest = filtered.filter((p) => p !== lead);

  return (
    <div className="shell">
      {/* Top utility bar */}
      <div className="topbar">
        <span className="brandmark">
          ← Archive · <em>{site.domain}</em>
        </span>
        <div className="center">
          <span className="navarrow">‹</span>
          <span>{FULL_DATE.format(new Date())}</span>
          <span className="navarrow">›</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle light / dark"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </div>

      {/* Masthead */}
      <header className="masthead">
        <h1>{site.masthead}</h1>
        <div className="tagline">{site.tagline}</div>
      </header>

      <hr className="rule thick" />

      {/* Topic filter */}
      <div className="filters">
        <div className="filter-group">
          <span className="label">Topics:</span>
          <button
            className="pill"
            aria-pressed={topic === "all"}
            onClick={() => setTopic("all")}
          >
            All
          </button>
          {site.topics.map((t) => (
            <button
              key={t}
              className="pill"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {topic === "Mathematics" && (
        <Link href={`/${appliedMath.slug}`} className="curriculum-link">
          <strong>
            {appliedMath.title} · {appliedMath.chapters.length} chapters
          </strong>
          <span>Browse the curriculum ›</span>
        </Link>
      )}

      <hr className="rule" />

      {!lead && (
        <div className="empty">No entries under “{topic}” yet.</div>
      )}

      {/* Lead story */}
      {lead && (
        <>
          <div className="kicker">Top Story</div>
          <Byline post={lead} />
          <Link href={`/post/${lead.slug}`} className="lead">
            <h2>{lead.title}</h2>
            <div className="cols">
              {lead.body.map((para, i) => (
                <p key={i} className={i === 0 ? "dropcap" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </Link>
          <hr className="rule" style={{ marginTop: 44 }} />
        </>
      )}

      {/* Story grid */}
      {rest.length > 0 && (
        <div className="grid">
          {rest.map((post) => (
            <Link key={post.slug} href={`/post/${post.slug}`} className="story">
              <Byline post={post} />
              <h3>{post.title}</h3>
              <div className="fade">
                <p className="dropcap">{post.body[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <span>
          {site.masthead} — curated by {site.author} · ©{" "}
          {new Date().getFullYear()}
        </span>
        <div className="colophon">
          <div className="colophon-text">
            <span className="name">{site.author}</span>
            <span className="role">
              {site.role} · {site.company}
            </span>
          </div>
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
