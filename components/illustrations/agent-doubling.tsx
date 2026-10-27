import Sketch from "./Sketch";
import { Arrow, Face, Label, StickFigure, ThoughtBubble } from "./parts";
import { ink } from "./palette";

// Task length an agent can finish alone, doubling every 7 months: 2^(t/7).
const ox = 90; // pixel position of t = 0
const oy = 320; // pixel position of length = 0
const sx = 380 / 35; // pixels per month
const sy = 260 / 32; // pixels per "× today"

const px = (t: number): [number, number] => [ox + t * sx, oy - 2 ** (t / 7) * sy];

const curve = Array.from({ length: 71 }, (_, i) => px(i / 2).map((v) => v.toFixed(1)).join(",")).join(" ");
const marked = [21, 28, 35];

export default function AgentDoubling() {
  return (
    <Sketch
      id="agent-doubling"
      title="The length of task an AI agent can finish alone doubles about every 7 months: after 35 months it is 32 times longer."
      viewBox="0 0 680 400"
      lines={
        <>
          <Arrow from={[70, oy]} to={[490, oy]} />
          <Arrow from={[ox, 345]} to={[ox, 30]} />
          <polyline points={curve} stroke={ink.red} strokeWidth={3.5} />
          {marked.map((t) => {
            const [x, y] = px(t);
            return <line key={t} x1={x} y1={y} x2={x} y2={oy} strokeDasharray="3 6" strokeWidth={2} />;
          })}
          <StickFigure x={590} y={200} leftHand={[548, 250]} rightHand={[640, 150]} />
          <ThoughtBubble cx={575} cy={85} rx={90} ry={40} tail={[[585, 138], [590, 154]]} />
        </>
      }
    >
      {marked.map((t) => {
        const [x, y] = px(t);
        return (
          <g key={t}>
            <circle cx={x} cy={y} r={5} fill={ink.red} />
            <Label x={x - 12} y={y + 6} size={18} anchor="end" color={ink.red}>×{2 ** (t / 7)}</Label>
          </g>
        );
      })}
      {[0, 7, 14, 21, 28, 35].map((t) => (
        <Label key={t} x={ox + t * sx} y={342} size={16}>{t}</Label>
      ))}
      <Label x={505} y={325} size={16} anchor="start">months</Label>
      <Label x={105} y={46} size={18} anchor="start">task length an agent finishes alone</Label>
      <Face x={590} y={200} mood="worried" />
      <Label x={575} y={80} size={18}>32× in under</Label>
      <Label x={575} y={102} size={18}>3 years?!</Label>
      <Label x={340} y={388} size={22}>length = 2^(months ÷ 7): five doublings make 32×</Label>
    </Sketch>
  );
}
