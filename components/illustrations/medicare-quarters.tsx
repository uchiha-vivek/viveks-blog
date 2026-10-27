import Sketch from "./Sketch";
import { Face, Label, StickFigure, ThoughtBubble } from "./parts";
import { ink } from "./palette";

// 10 years × 4 quarters of Medicare taxes = 40 credits = premium-free Part A.
const size = 36;
const step = 42;
const x0 = 70;
const y0 = 80;
const cells = Array.from({ length: 40 }, (_, i) => ({ col: Math.floor(i / 4), row: i % 4 }));

export default function MedicareQuarters() {
  return (
    <Sketch
      id="medicare-quarters"
      title="Ten years of work with four quarters each gives 40 credits of Medicare taxes, which makes Part A premium-free."
      viewBox="0 0 680 400"
      lines={
        <>
          {cells.map(({ col, row }) => {
            const x = x0 + col * step;
            const y = y0 + row * step;
            return (
              <g key={`${col}-${row}`}>
                <rect x={x} y={y} width={size} height={size} strokeWidth={2} />
                <path d={`M${x + 9} ${y + 19} L${x + 16} ${y + 27} L${x + 28} ${y + 10}`} stroke={ink.green} strokeWidth={2.5} />
              </g>
            );
          })}
          <StickFigure x={590} y={170} leftHand={[548, 230]} rightHand={[636, 120]} />
          <ThoughtBubble cx={585} cy={70} rx={85} ry={38} tail={[[590, 120], [594, 134]]} />
        </>
      }
    >
      <Label x={x0 + 5 * step - 3} y={58} size={18}>a quarter of work paying Medicare tax = 1 credit</Label>
      {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
        <Label key={q} x={x0 - 10} y={y0 + i * step + 24} size={16} anchor="end">{q}</Label>
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <Label key={i} x={x0 + i * step + size / 2} y={268} size={16}>{i + 1}</Label>
      ))}
      <Label x={x0 + 5 * step - 3} y={292} size={16}>years of work</Label>
      <Face x={590} y={170} mood="happy" />
      <Label x={585} y={66} size={18}>Part A:</Label>
      <Label x={585} y={88} size={18}>$0 a month</Label>
      <Label x={340} y={334} size={24}>10 years × 4 quarters = 40 credits</Label>
      <Label x={340} y={366} size={20} color={ink.green}>40 credits → premium-free Part A</Label>
      <Label x={340} y={392} size={16}>Fewer credits? You can still buy Part A.</Label>
    </Sketch>
  );
}
