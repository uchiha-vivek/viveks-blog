import Sketch from "./Sketch";
import { Face, Label, StickFigure, ThoughtBubble } from "./parts";
import { ink } from "./palette";

// Top: sin x with its tangent line at five points. Bottom: cos x.
// Each tangent's slope (red number) lands exactly on the cos curve below it.
const ox = 50; // pixel x of x = 0
const sx = 60; // pixels per radian
const amp = 65; // pixels per unit of height
const topY = 110; // sin panel's x-axis
const botY = 290; // cos panel's x-axis

const px = (x: number) => ox + x * sx;

function curve(f: (x: number) => number, base: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 64; i++) {
    const x = (i / 64) * 2 * Math.PI;
    pts.push(`${px(x).toFixed(1)},${(base - f(x) * amp).toFixed(1)}`);
  }
  return pts.join(" ");
}

const marks = [
  { x: 0, label: "1", at: [30, 100] },
  { x: Math.PI / 2, label: "0", at: [144, 30] },
  { x: Math.PI, label: "-1", at: [260, 98] },
  { x: (3 * Math.PI) / 2, label: "0", at: [346, 212] },
  { x: 2 * Math.PI, label: "1", at: [406, 98] },
] as const;

function tangent(x: number) {
  const cx = px(x);
  const cy = topY - Math.sin(x) * amp;
  const dx = sx;
  const dy = -Math.cos(x) * amp;
  const len = Math.hypot(dx, dy);
  const k = 32 / len;
  return { x1: cx - dx * k, y1: cy - dy * k, x2: cx + dx * k, y2: cy + dy * k, cx, cy };
}

export default function SinSlopeCos() {
  return (
    <Sketch
      id="sin-slope-cos"
      title="The sine curve with tangent lines of slope 1, 0, -1, 0 and 1. Plotting those slopes underneath traces out the cosine curve."
      viewBox="0 0 680 430"
      lines={
        <>
          <line x1={36} y1={topY} x2={448} y2={topY} strokeWidth={2} />
          <line x1={36} y1={botY} x2={448} y2={botY} strokeWidth={2} />
          {marks.map(({ x }) => {
            const t = tangent(x);
            return (
              <line key={x} x1={t.cx} y1={t.cy} x2={t.cx} y2={botY - Math.cos(x) * amp} strokeDasharray="3 7" strokeWidth={1.5} />
            );
          })}
          <polyline points={curve(Math.sin, topY)} strokeWidth={3.5} />
          <polyline points={curve(Math.cos, botY)} stroke={ink.green} strokeWidth={3.5} />
          {marks.map(({ x }) => {
            const { x1, y1, x2, y2 } = tangent(x);
            return <line key={x} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink.red} strokeWidth={4} />;
          })}
          <StickFigure x={590} y={180} scale={0.8} leftHand={[548, 262]} rightHand={[640, 250]} />
          <ThoughtBubble cx={565} cy={66} rx={100} ry={40} tail={[[580, 118], [586, 132]]} />
        </>
      }
    >
      {marks.map(({ x, label, at }) => (
        <Label key={`n${x}`} x={at[0]} y={at[1]} size={20} color={ink.red}>{label}</Label>
      ))}
      {marks.map(({ x }) => (
        <circle key={`d${x}`} cx={px(x)} cy={botY - Math.cos(x) * amp} r={6} fill={ink.red} />
      ))}
      <Label x={462} y={topY + 6} size={22} anchor="start">sin x</Label>
      <Label x={462} y={botY + 6} size={22} anchor="start" color={ink.green}>cos x</Label>
      {[
        ["π/2", Math.PI / 2],
        ["π", Math.PI],
        ["3π/2", (3 * Math.PI) / 2],
        ["2π", 2 * Math.PI],
      ].map(([t, x]) => (
        <Label key={t as string} x={px(x as number)} y={378} size={16}>{t as string}</Label>
      ))}
      <Label x={px(0)} y={378} size={16}>0</Label>
      <Face x={590} y={180} mood="happy" scale={0.8} />
      <Label x={565} y={60} size={19}>the slopes of sin</Label>
      <Label x={565} y={84} size={19}>draw cos!</Label>
      <Label x={340} y={418} size={18}>Red: the slope of sin x at that point. Plot each slope underneath and you get cos x.</Label>
    </Sketch>
  );
}
