import Sketch from "./Sketch";
import { ArrowHead, Face, Label, StickFigure, ThoughtBubble } from "./parts";

// 1 → i → -1 → -i → 1: each multiplication by i is a quarter turn.
const cx = 250;
const cy = 190;
const r = 120;
const arcR = 150;
const rad = (deg: number) => (deg * Math.PI) / 180;
const at = (deg: number, radius: number): [number, number] => [
  cx + radius * Math.cos(rad(deg)),
  cy - radius * Math.sin(rad(deg)),
];

function QuarterArc({ from }: { from: number }) {
  const [x1, y1] = at(from + 10, arcR);
  const end = from + 80;
  const [x2, y2] = at(end, arcR);
  // Travelling anticlockwise, the tangent on screen is (-sin, -cos).
  const angle = Math.atan2(-Math.cos(rad(end)), -Math.sin(rad(end)));
  return (
    <>
      <path d={`M${x1} ${y1} A${arcR} ${arcR} 0 0 0 ${x2} ${y2}`} />
      <ArrowHead x={x2} y={y2} angle={angle} />
    </>
  );
}

export default function PowersOfI() {
  const points: [number, string, number, number][] = [
    [0, "1", 18, -10],
    [90, "i", 16, -8],
    [180, "-1", -20, -10],
    [270, "-i", 20, 22],
  ];
  return (
    <Sketch
      id="powers-of-i"
      title="Multiplying by i turns a number a quarter turn: 1 goes to i, then -1, then -i, and back to 1."
      viewBox="0 0 680 400"
      lines={
        <>
          <line x1={cx - r - 25} y1={cy} x2={cx + r + 25} y2={cy} strokeWidth={2} />
          <line x1={cx} y1={cy - r - 25} x2={cx} y2={cy + r + 25} strokeWidth={2} />
          <circle cx={cx} cy={cy} r={r} strokeDasharray="5 7" strokeWidth={2} />
          {[0, 90, 180, 270].map((deg) => <QuarterArc key={deg} from={deg} />)}
          <StickFigure x={540} y={162} />
          <ThoughtBubble cx={560} cy={58} rx={100} ry={30} tail={[[550, 102], [546, 114]]} />
        </>
      }
    >
      {points.map(([deg, name, dx, dy]) => {
        const [x, y] = at(deg, r);
        return (
          <g key={name}>
            <circle cx={x} cy={y} r={6} />
            <Label x={x + dx} y={y + dy} size={24}>{name}</Label>
          </g>
        );
      })}
      {[45, 135, 225, 315].map((deg) => {
        const [x, y] = at(deg, 178);
        return <Label key={deg} x={x} y={y + 6} size={18}>× i</Label>;
      })}
      <Face x={540} y={162} mood="happy" />
      <Label x={560} y={65}>i × i × i × i = 1</Label>
      <Label x={540} y={366} size={18}>back where I started!</Label>
      <Label x={340} y={392}>Each × i is a quarter turn, so i² = -1</Label>
    </Sketch>
  );
}
