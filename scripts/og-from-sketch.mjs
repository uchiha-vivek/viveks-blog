// Turn a post's hand-drawn sketch into a 1200×630 PNG for link previews
// (LinkedIn, X, etc. don't accept SVG). Uses headless Chrome so the
// handwriting font and wobble filter render exactly as on the site.
//
//   npm run build
//   node scripts/og-from-sketch.mjs <post-slug>
//
// Writes public/og/<post-slug>.png. Then set `shareImage` on the post.
// Set CHROME_PATH if Chrome is not in the default macOS location.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const slug = process.argv[2];
if (!slug) throw new Error("Usage: node scripts/og-from-sketch.mjs <post-slug>");

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const html = fs.readFileSync(path.join(root, ".next/server/app/post", `${slug}.html`), "utf8");
const figure = html.match(/<figure class="sketch[\s\S]*?<\/figure>/)?.[0];
const sketch = figure?.match(/<svg[\s\S]*<\/svg>/)?.[0];
if (!sketch) throw new Error(`No sketch found on post "${slug}". Did you run npm run build?`);

const W = 1200;
const H = 630;
const font = pathToFileURL(path.join(root, "scripts/fonts/PatrickHand-Regular.ttf")).href;
const page = `<!doctype html><meta charset="utf-8">
<style>
  @font-face { font-family: "Patrick Hand"; src: url("${font}"); }
  html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; background: #fdfcf8; }
  body { --font-sketch: "Patrick Hand"; display: flex; align-items: center; justify-content: center; }
  svg { height: 560px; width: auto; margin-top: -18px; }
  .site { position: fixed; right: 36px; bottom: 18px; font: 24px "Patrick Hand"; color: #5f5a50; }
</style>
${sketch}
<div class="site">viveksharma.blog</div>`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "og-sketch-"));
const pageFile = path.join(tmp, "card.html");
fs.writeFileSync(pageFile, page);

const out = path.join(root, "public/og", `${slug}.png`);
fs.mkdirSync(path.dirname(out), { recursive: true });
const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--allow-file-access-from-files",
  "--virtual-time-budget=2000",
  `--user-data-dir=${path.join(tmp, "profile")}`,
  `--window-size=${W},${H}`,
  `--screenshot=${out}`,
  pathToFileURL(pageFile).href,
], { stdio: "ignore" });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`Wrote ${path.relative(root, out)}`);
