# AGENTS.md

Next.js 15 blog **Root & Branch** by Vivek Sharma, live at https://www.viveksharma.blog. Vercel deploys `main`.

## Commands
- `npm run dev` · `npm run build` · `npx tsc --noEmit`
- `next build` overwrites `.next`; restart `npm run dev` (after `rm -rf .next`) if it was running.

## Posts
- Posts live in `lib/posts.ts`; math lessons live in `lib/lessons/*.ts`.
- Optional post fields: `tags`, `illustrations`, `shareImage`.
- Put the topic in the title, plain and searchable. The author is always "Vivek Sharma · Software Engineer".

## Illustrations (`components/illustrations/`)
- One file per sketch, built from `Sketch` and `parts.tsx`, and registered by id in `index.ts`.
- Colors come only from `palette.ts`. Sketches sit on a paper card, so they look the same in light and dark mode.
- Place a sketch with `illustrations: [{ id, after: <paragraph index> }]` on a post, or `sketch: "<id>"` on a lesson section.
- Every sketch must explain the paragraph or section it sits in. Check it in the browser at desktop and 375px widths.

## Social previews (LinkedIn, X)
**Any post with a sketch uses that sketch as its link preview.** Platforms can't show SVG, so render a PNG:
1. Run `npm run build`.
2. Run `node scripts/og-from-sketch.mjs <slug>`. It writes `public/og/<slug>.png` at 1200×630, using headless Chrome and `scripts/fonts`.
3. Set `shareImage: "/og/<slug>.png"` on the post.
4. Check that `og:image` in `.next/server/app/post/<slug>.html` points at that PNG.
5. After deploy, paste the post URL into https://www.linkedin.com/post-inspector/ before sharing.

If you change a sketch, re-run step 2. Posts without a sketch use the generated card at `/share/post-<slug>`.

## SEO
- `app/sitemap.ts` lists every post automatically. After deploy, request indexing for new posts in Search Console.
- Keep the Person JSON-LD in `lib/structured-data.ts` and the profile links in `lib/site.ts` in sync with LinkedIn, GitHub and X.

## Git
- Branch from `main` as `codex/<topic>`, then open a PR to `main`.
- Never commit `.claude/` or `strategy-*.md`.
