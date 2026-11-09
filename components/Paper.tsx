"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import Search from "@/components/Search";
import { appliedMath } from "@/lib/curriculum";
import { site, type Topic } from "@/lib/site";

const FULL_DATE = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Page sizes fill whole rows: 3 columns on laptop, 2 on tablet, 1 on phone.
const PHONE = "(max-width: 640px)";
const TABLET = "(max-width: 900px)";

function subscribeWidth(onChange: () => void) {
  const queries = [PHONE, TABLET].map((q) => window.matchMedia(q));
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

function usePageSize() {
  return useSyncExternalStore(
    subscribeWidth,
    () => (window.matchMedia(PHONE).matches ? 6 : window.matchMedia(TABLET).matches ? 8 : 9),
    () => 9,
  );
}

function readPageFromUrl() {
  const n = Number(new URLSearchParams(window.location.search).get("page"));
  return Number.isInteger(n) && n > 1 ? n : 1;
}

function pageHref(page: number) {
  return page > 1 ? `?page=${page}` : "/";
}

// Page numbers to show, with "…" for gaps: 1 … 4 5 6 … 12
function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const keep = new Set([1, total, current - 1, current, current + 1]);
  const out: (number | "…")[] = [];
  for (let i = 1; i <= total; i++) {
    if (keep.has(i)) out.push(i);
    else if (out[out.length - 1] !== "…") out.push("…");
  }
  return out;
}

function Pager({
  page,
  total,
  onGo,
}: {
  page: number;
  total: number;
  onGo: (page: number) => void;
}) {
  const go = (n: number) => (e: MouseEvent) => {
    // Let ctrl/cmd-click open a new tab as usual.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onGo(n);
  };
  return (
    <nav className="pager" aria-label="Pages">
      {page > 1 ? (
        <a className="pager-step" href={pageHref(page - 1)} onClick={go(page - 1)} rel="prev">
          ‹ <span className="pager-word">Newer</span>
        </a>
      ) : (
        <span className="pager-step" aria-hidden="true">
          ‹ <span className="pager-word">Newer</span>
        </span>
      )}

      <ol className="pager-nums">
        {pageList(page, total).map((n, i) =>
          n === "…" ? (
            <li key={`gap${i}`} className="pager-gap" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={n}>
              <a
                href={pageHref(n)}
                onClick={go(n)}
                aria-current={n === page ? "page" : undefined}
                aria-label={`Page ${n}`}
              >
                {n}
              </a>
            </li>
          ),
        )}
      </ol>
      <span className="pager-count">
        Page {page} of {total}
      </span>

      {page < total ? (
        <a className="pager-step" href={pageHref(page + 1)} onClick={go(page + 1)} rel="next">
          <span className="pager-word">Older</span> ›
        </a>
      ) : (
        <span className="pager-step" aria-hidden="true">
          <span className="pager-word">Older</span> ›
        </span>
      )}
    </nav>
  );
}

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

export default function Paper({
  posts,
  covers = {},
}: {
  posts: Post[];
  covers?: Record<string, ReactNode>;
}) {
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
  const rest = useMemo(() => filtered.filter((p) => p !== lead), [filtered, lead]);

  // Pagination: the page lives in the URL (?page=2) so Back and shared links work.
  const pageSize = usePageSize();
  const [page, setPage] = useState(1);
  const listTop = useRef<HTMLDivElement>(null);
  const totalPages = Math.max(1, Math.ceil(rest.length / pageSize));
  const current = Math.min(page, totalPages);
  const shown = rest.slice((current - 1) * pageSize, current * pageSize);

  useEffect(() => {
    const sync = () => setPage(readPageFromUrl());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const goTo = useCallback((n: number, scroll = true) => {
    setPage(n);
    window.history.pushState(null, "", pageHref(n));
    if (scroll) {
      listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  function pickTopic(t: Topic | "all") {
    setTopic(t);
    if (page !== 1) goTo(1, false);
  }

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
        <div className="topbar-actions">
          <Search posts={posts} />
          <a
            className="icon-btn"
            href={site.github}
            target="_blank"
            rel="me noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a
            className="icon-btn"
            href={site.linkedin}
            target="_blank"
            rel="me noreferrer"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a
            className="icon-btn"
            href={site.x}
            target="_blank"
            rel="me noreferrer"
            aria-label="X profile"
            title="X"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
            </svg>
          </a>
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
        <div className="tagline">
          {site.tagline} · by {site.author}, Engineer
        </div>
      </header>

      <hr className="rule thick" />

      {/* Topic filter */}
      <div className="filters">
        <div className="filter-group">
          <span className="label">Topics:</span>
          <button
            className="pill"
            aria-pressed={topic === "all"}
            onClick={() => pickTopic("all")}
          >
            All
          </button>
          {site.topics.map((t) => (
            <button
              key={t}
              className="pill"
              aria-pressed={topic === t}
              onClick={() => pickTopic(t)}
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

      <div ref={listTop} className="list-top" />

      {!lead && (
        <div className="empty">No entries under “{topic}” yet.</div>
      )}

      {/* Lead story (first page only) */}
      {lead && current === 1 && (
        <>
          <div className="kicker">Top Story</div>
          <Byline post={lead} />
          <Link href={`/post/${lead.slug}`} className="lead">
            <h2>{lead.title}</h2>
            <div className="cols">
              {covers[lead.slug]}
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
      {shown.length > 0 && (
        <div className="grid">
          {shown.map((post) => (
            <Link key={post.slug} href={`/post/${post.slug}`} className="story">
              {covers[post.slug]}
              <Byline post={post} />
              <h3>{post.title}</h3>
              <div className="fade">
                <p className="dropcap">{post.body[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && <Pager page={current} total={totalPages} onGo={goTo} />}

      {/* Footer */}
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
