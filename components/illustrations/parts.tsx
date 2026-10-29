import type { ReactNode } from "react";
import { ink } from "./palette";

type Point = [number, number];

// Shrink a group around (x, y) while keeping lines the usual thickness.
function scaled(x: number, y: number, scale: number) {
  return scale === 1
    ? {}
    : { transform: `translate(${x * (1 - scale)} ${y * (1 - scale)}) scale(${scale})`, strokeWidth: 3 / scale };
}

// Stick figure body, positioned by the centre of its head (feet at y + 180 × scale).
// Put <StickFigure> inside Sketch's `lines` and <Face> inside its children.
export function StickFigure({
  x,
  y,
  scale = 1,
  leftHand = [x - 34, y + 92],
  rightHand = [x + 52, y + 88],
}: {
  x: number;
  y: number;
  scale?: number;
  leftHand?: Point; // in unscaled coordinates
  rightHand?: Point;
}) {
  const shoulder: Point = [x, y + 55];
  const hip: Point = [x, y + 120];
  return (
    <g {...scaled(x, y, scale)}>
      <circle cx={x} cy={y} r={32} />
      <line x1={x} y1={y + 32} x2={hip[0]} y2={hip[1]} />
      <line x1={hip[0]} y1={hip[1]} x2={x - 22} y2={y + 180} />
      <line x1={hip[0]} y1={hip[1]} x2={x + 22} y2={y + 180} />
      <line x1={shoulder[0]} y1={shoulder[1]} x2={leftHand[0]} y2={leftHand[1]} />
      <line x1={shoulder[0]} y1={shoulder[1]} x2={rightHand[0]} y2={rightHand[1]} />
    </g>
  );
}

// Eyes and mouth for a StickFigure at the same (x, y, scale).
export function Face({
  x,
  y,
  mood,
  scale = 1,
}: {
  x: number;
  y: number;
  mood: "happy" | "worried";
  scale?: number;
}) {
  return (
    <g {...scaled(x, y, scale)}>
      <circle cx={x - 10} cy={y - 6} r={3} />
      <circle cx={x + 10} cy={y - 6} r={3} />
      <g fill="none" stroke={ink.line} strokeWidth={3} strokeLinecap="round">
        {mood === "happy" ? (
          <path d={`M${x - 12} ${y + 10} Q${x} ${y + 21} ${x + 12} ${y + 10}`} />
        ) : (
          <>
            <path d={`M${x - 13} ${y + 18} q4 -5 8 0 q4 5 8 0 q4 -5 8 0`} />
            <path d={`M${x + 40} ${y - 28} q6 10 0 14 q-6 -4 0 -14`} />
          </>
        )}
      </g>
    </g>
  );
}

// Two short strokes forming an arrowhead whose tip is at (x, y),
// pointing in direction `angle` (radians, screen coordinates).
export function ArrowHead({ x, y, angle, size = 12 }: { x: number; y: number; angle: number; size?: number }) {
  const back = (a: number): Point => [x - size * Math.cos(a), y - size * Math.sin(a)];
  const [l, r] = [back(angle - 0.45), back(angle + 0.45)];
  return (
    <>
      <line x1={x} y1={y} x2={l[0]} y2={l[1]} />
      <line x1={x} y1={y} x2={r[0]} y2={r[1]} />
    </>
  );
}

// Straight arrow from one point to another.
export function Arrow({ from, to, size }: { from: Point; to: Point; size?: number }) {
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  return (
    <>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} />
      <ArrowHead x={to[0]} y={to[1]} angle={angle} size={size} />
    </>
  );
}

// Cloud-style thought bubble outline with trailing dots towards the speaker.
export function ThoughtBubble({
  cx,
  cy,
  rx,
  ry,
  tail,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  tail: Point[];
}) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
      {tail.map(([tx, ty], i) => (
        <circle key={i} cx={tx} cy={ty} r={5 - i * 2} />
      ))}
    </>
  );
}

// Handwritten text, centred on x unless `anchor` says otherwise.
export function Label({
  x,
  y,
  size = 20,
  color,
  anchor = "middle",
  children,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  children: ReactNode;
}) {
  return (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={color}>
      {children}
    </text>
  );
}

// Numbered red disc, e.g. to tag a box with its pattern number. Put it in Sketch's children.
export function Badge({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={13} fill={ink.red} />
      <text x={x} y={y + 6} fontSize={17} textAnchor="middle" fill={ink.paper}>
        {n}
      </text>
    </g>
  );
}
