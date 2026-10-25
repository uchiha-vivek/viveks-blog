import Sketch from "./Sketch";
import { Face, Label, StickFigure, ThoughtBubble } from "./parts";

// Each hop covers half of what is left; the hops add up to exactly one wall-distance.
const start = 110;
const wall = 600;
const ground = 290;

function hops() {
  const out: { a: number; b: number }[] = [];
  let a = start;
  for (let i = 0; i < 6; i++) {
    const b = a + (wall - a) / 2;
    out.push({ a, b });
    a = b;
  }
  return out;
}

export default function ZenoWalk() {
  const arcs = hops();
  return (
    <Sketch
      id="zeno-walk"
      title="A walker hops half the remaining distance to a wall each time: 1/2 + 1/4 + 1/8 + ... adds up to exactly 1."
      viewBox="0 0 680 345"
      lines={
        <>
          <line x1={30} y1={300} x2={650} y2={300} />
          <rect x={wall} y={110} width={24} height={190} />
          <StickFigure x={70} y={120} />
          <ThoughtBubble cx={196} cy={56} rx={112} ry={30} tail={[[114, 92], [104, 101]]} />
          {arcs.map(({ a, b }) => (
            <path
              key={a}
              d={`M${a} ${ground} Q${(a + b) / 2} ${ground - (b - a) * 0.65} ${b} ${ground}`}
              strokeDasharray="7 6"
              strokeWidth={2.5}
            />
          ))}
        </>
      }
    >
      <Face x={70} y={120} mood="happy" />
      <Label x={196} y={63}>Infinitely many steps?!</Label>
      <Label x={(arcs[0].a + arcs[0].b) / 2} y={ground - (arcs[0].b - arcs[0].a) * 0.33 - 10} size={24}>1/2</Label>
      <Label x={(arcs[1].a + arcs[1].b) / 2} y={ground - (arcs[1].b - arcs[1].a) * 0.33 - 8}>1/4</Label>
      <Label x={(arcs[2].a + arcs[2].b) / 2} y={ground - (arcs[2].b - arcs[2].a) * 0.33 - 6} size={16}>1/8</Label>
      <Label x={474} y={56} size={26}>1/2 + 1/4 + 1/8 + ... = 1</Label>
      <Label x={474} y={86} size={18}>the hops never pass the wall</Label>
      <Label x={start} y={326} size={18}>start</Label>
      <Label x={wall + 12} y={326} size={18}>wall</Label>
    </Sketch>
  );
}
