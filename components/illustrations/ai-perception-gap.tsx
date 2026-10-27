import Sketch from "./Sketch";
import { Face, Label, StickFigure, ThoughtBubble } from "./parts";
import { ink } from "./palette";

// METR 2025 trial: developers expected AI to make them 24% faster,
// felt 20% faster afterwards, and were measured 19% slower.
const zero = 200; // pixel y of "no change"
const k = 5; // pixels per percent

const bars = [
  { label: "expected", value: 24, x: 150 },
  { label: "felt after", value: 20, x: 270 },
  { label: "measured", value: -19, x: 390 },
];

export default function AiPerceptionGap() {
  return (
    <Sketch
      id="ai-perception-gap"
      title="Developers expected AI to make them 24% faster and felt 20% faster afterwards, but were measured 19% slower."
      viewBox="0 0 680 400"
      lines={
        <>
          <line x1={70} y1={zero} x2={470} y2={zero} />
          {bars.map(({ value, x }) => (
            <rect
              key={x}
              x={x - 40}
              y={value > 0 ? zero - value * k : zero}
              width={80}
              height={Math.abs(value) * k}
              stroke={value < 0 ? ink.red : ink.line}
            />
          ))}
          <StickFigure x={580} y={180} leftHand={[540, 240]} rightHand={[630, 130]} />
          <ThoughtBubble cx={570} cy={70} rx={95} ry={40} tail={[[578, 122], [582, 138]]} />
        </>
      }
    >
      {bars.map(({ label, value, x }) =>
        value > 0 ? (
          <g key={x}>
            <Label x={x} y={zero - value * k - 12} size={18}>{value}% faster</Label>
            <Label x={x} y={zero + 24} size={18}>{label}</Label>
          </g>
        ) : (
          <g key={x} fill={ink.red}>
            <Label x={x} y={zero - value * k + 26} size={18} color={ink.red}>{-value}% slower</Label>
            <Label x={x} y={zero - 12} size={18} color={ink.red}>{label}</Label>
          </g>
        ),
      )}
      <Label x={60} y={zero - 70} size={16} anchor="end">faster</Label>
      <Label x={60} y={zero + 76} size={16} anchor="end">slower</Label>
      <Face x={580} y={180} mood="happy" />
      <Label x={570} y={65} size={18}>AI made me</Label>
      <Label x={570} y={87} size={18}>20% faster!</Label>
      <Label x={340} y={388} size={20}>16 experienced developers, 246 real tasks (METR, 2025)</Label>
    </Sketch>
  );
}
