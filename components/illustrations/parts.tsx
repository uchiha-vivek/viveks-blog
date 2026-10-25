import type { ReactNode } from "react";
import { ink } from "./palette";

type Point = [number, number];

// Stick figure body, positioned by the centre of its head.
// Put <StickFigure> inside Sketch's `lines` and <Face> inside its children.
export function StickFigure({
  x,
  y,
  leftHand = [x - 34, y + 92],
  rightHand = [x + 52, y + 88],
}: {
  x: number;
  y: number;
  leftHand?: Point;
  rightHand?: Point;
}) {
  const shoulder: Point = [x, y + 55];
  const hip: Point = [x, y + 120];
  return (
    <>
      <circle cx={x} cy={y} r={32} />
      <line x1={x} y1={y + 32} x2={hip[0]} y2={hip[1]} />
      <line x1={hip[0]} y1={hip[1]} x2={x - 22} y2={y + 180} />
      <line x1={hip[0]} y1={hip[1]} x2={x + 22} y2={y + 180} />
      <line x1={shoulder[0]} y1={shoulder[1]} x2={leftHand[0]} y2={leftHand[1]} />
      <line x1={shoulder[0]} y1={shoulder[1]} x2={rightHand[0]} y2={rightHand[1]} />
    </>
  );
}

// Eyes and mouth for a StickFigure at the same (x, y).
export function Face({ x, y, mood }: { x: number; y: number; mood: "happy" | "worried" }) {
  return (
    <>
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

// Centred handwritten text.
export function Label({
  x,
  y,
  size = 20,
  color,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  children: ReactNode;
}) {
  return (
    <text x={x} y={y} fontSize={size} textAnchor="middle" fill={color}>
      {children}
    </text>
  );
}
