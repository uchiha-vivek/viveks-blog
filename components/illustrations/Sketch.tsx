import type { ReactNode } from "react";
import { Patrick_Hand } from "next/font/google";
import { ink } from "./palette";

const hand = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-sketch" });

// Paper card + hand-drawn wobble shared by every illustration.
// `lines` get the wobble filter; `children` (text, dots) stay crisp.
export default function Sketch({
  id,
  title,
  viewBox,
  lines,
  children,
  caption,
}: {
  id: string;
  title: string;
  viewBox: string;
  lines: ReactNode;
  children?: ReactNode;
  caption?: string;
}) {
  const filterId = `sketch-wobble-${id}`;
  return (
    <figure className={`sketch ${hand.variable}`} style={{ background: ink.paper }}>
      <svg viewBox={viewBox} role="img" aria-label={title} style={{ fontFamily: "var(--font-sketch), cursive" }}>
        <title>{title}</title>
        <defs>
          <filter id={filterId} filterUnits="userSpaceOnUse" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={3} />
            <feDisplacementMap in="SourceGraphic" scale={2.5} />
          </filter>
        </defs>
        <g
          filter={`url(#${filterId})`}
          fill="none"
          stroke={ink.line}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {lines}
        </g>
        <g fill={ink.line}>{children}</g>
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
