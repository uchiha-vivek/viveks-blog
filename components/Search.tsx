"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";

function matches(post: Post, query: string) {
  const haystack = [post.title, post.dek, post.topic, ...post.body]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default function Search({ posts }: { posts: Post[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => (query.trim() ? posts.filter((p) => matches(p, query)) : posts),
    [posts, query],
  );

  function close() {
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <>
      <button
        className="icon-btn"
        onClick={() => setOpen(true)}
        aria-label="Search posts"
        title="Search (Cmd + K)"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
      </button>

      {open && (
        <div className="search-overlay" onClick={close}>
          <div
            className="search-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Search posts"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-head">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
              <input
                ref={inputRef}
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts"
                aria-label="Search posts"
              />
              <kbd className="search-kbd">Cmd + K</kbd>
              <button
                className="icon-btn"
                onClick={close}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>

            <div className="search-results">
              {results.length === 0 && (
                <div className="search-empty">
                  No posts match “{query.trim()}”.
                </div>
              )}
              {results.map((post) => (
                <Link
                  key={post.slug}
                  href={`/post/${post.slug}`}
                  className="search-result"
                  onClick={close}
                >
                  <span className="search-result-meta">
                    {post.topic} · {post.readingTime} min
                  </span>
                  <span className="search-result-title">{post.title}</span>
                  <span className="search-result-dek">{post.dek}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
