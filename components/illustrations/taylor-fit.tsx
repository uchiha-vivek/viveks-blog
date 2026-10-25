import Sketch from "./Sketch";
import { Arrow, Face, Label, StickFigure, ThoughtBubble } from "./parts";
import { ink } from "./palette";

// 1/(1 - x) and its partial sums 1 + x, 1 + x + x², 1 + x + x² + x³.
// Inside |x| < 1 the sums close in on the curve; at the edges they do not.
const ox = 300; // pixel position of x = 0
const oy = 320; // pixel position of y = 0
const sx = 150; // pixels per unit on x
const sy = 40; // pixels per unit on y

function plot(f: (x: number) => number, from: number, to: number) {
  const pts: string[] = [];
  for (let i = Math.round(from * 20); i <= Math.round(to * 20); i++) {
    const x = i / 20;
    pts.push(`${(ox + x * sx).toFixed(1)},${(oy - f(x) * sy).toFixed(1)}`);
  }
  return pts.join(" ");
}

const sums = [
  { label: "1 + x", dash: "12 7", f: (x: number) => 1 + x, from: -1 },
  { label: "1 + x + x²", dash: "4 6", f: (x: number) => 1 + x + x * x, from: -1.5 },
  { label: "1 + x + x² + x³", dash: "18 5 3 5", f: (x: number) => 1 + x + x * x + x ** 3, from: -1 },
];

export default function TaylorFit() {
  return (
    <Sketch
      id="taylor-fit"
      title="The curve 1/(1 - x) with partial sums 1 + x, 1 + x + x² and 1 + x + x² + x³: inside |x| < 1 each extra term fits the curve more closely."
      viewBox="0 0 680 400"
      lines={
        <>
          <Arrow from={[60, oy]} to={[500, oy]} />
          <Arrow from={[ox, 345]} to={[ox, 30]} />
          <line x1={ox - sx} y1={oy} x2={ox + sx} y2={oy} strokeWidth={7} />
          <line x1={ox + sx} y1={40} x2={ox + sx} y2={oy} strokeDasharray="3 6" strokeWidth={2} />
          {sums.map(({ dash, f, from }) => (
            <polyline key={dash} points={plot(f, from, 0.8)} strokeDasharray={dash} strokeWidth={2.5} />
          ))}
          <polyline points={plot((x) => 1 / (1 - x), -1.6, 0.8)} stroke={ink.red} strokeWidth={3.5} />
          {/* legend samples */}
          <line x1={70} y1={64} x2={110} y2={64} stroke={ink.red} strokeWidth={3.5} />
          {sums.map(({ dash }, i) => (
            <line key={dash} x1={70} y1={92 + i * 26} x2={110} y2={92 + i * 26} strokeDasharray={dash} strokeWidth={2.5} />
          ))}
          <StickFigure x={600} y={190} leftHand={[548, 236]} rightHand={[648, 272]} />
          <ThoughtBubble cx={590} cy={80} rx={82} ry={36} tail={[[596, 128], [600, 141]]} />
        </>
      }
    >
      <Label x={120} y={70} size={18} anchor="start" color={ink.red}>1/(1 - x)</Label>
      {sums.map(({ label }, i) => (
        <Label key={label} x={120} y={98 + i * 26} size={18} anchor="start">{label}</Label>
      ))}
      <Label x={ox - sx} y={342} size={16}>-1</Label>
      <Label x={ox - 10} y={342} size={16}>0</Label>
      <Label x={ox + sx} y={342} size={16}>1</Label>
      <Face x={600} y={190} mood="happy" />
      <Label x={590} y={75} size={18}>Trust it only</Label>
      <Label x={590} y={97} size={18}>inside |x| &lt; 1</Label>
      <Label x={340} y={390}>Inside |x| &lt; 1, every extra term fits the curve more closely</Label>
    </Sketch>
  );
}
