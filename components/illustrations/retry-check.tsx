import Sketch from "./Sketch";
import { Face, Label, StickFigure } from "./parts";
import { ink } from "./palette";

// The agent proposes retries; a minute of Little's Law shows the pool is
// already over capacity: L = 200 req/s × 1 s = 200 in flight > 100 workers.
const notes = [
  { text: "λ = 200 req/s", red: false },
  { text: "W = 1 s", red: false },
  { text: "L = λ × W = 200", red: false },
  { text: "pool = 100 workers", red: false },
  { text: "200 > 100  ✗", red: true },
  { text: "retries add load", red: true },
];

export default function RetryCheck() {
  return (
    <Sketch
      id="retry-check"
      title="An AI agent suggests adding retries to a slow service; the engineer's Little's Law arithmetic shows 200 requests in flight against 100 workers, so retries would only add load."
      viewBox="0 0 680 400"
      lines={
        <>
          {/* speech bubble */}
          <rect x={20} y={20} width={210} height={64} rx={14} />
          <path d="M150 84 L165 112 L180 84" />
          {/* robot */}
          <line x1={110} y1={120} x2={110} y2={100} />
          <circle cx={110} cy={94} r={6} />
          <rect x={70} y={120} width={80} height={60} rx={8} />
          <line x1={95} y1={166} x2={125} y2={166} />
          <rect x={80} y={190} width={60} height={80} rx={6} />
          <line x1={80} y1={205} x2={52} y2={250} />
          <line x1={140} y1={205} x2={168} y2={250} />
          <line x1={95} y1={270} x2={95} y2={340} />
          <line x1={125} y1={270} x2={125} y2={340} />
          {/* notepad */}
          <rect x={240} y={100} width={230} height={230} />
          <line x1={240} y1={128} x2={470} y2={128} />
          <StickFigure x={590} y={170} leftHand={[485, 240]} rightHand={[630, 260]} />
        </>
      }
    >
      <Label x={125} y={48} size={18}>Latency is high.</Label>
      <Label x={125} y={72} size={18}>Add retries!</Label>
      <circle cx={95} cy={145} r={5} />
      <circle cx={125} cy={145} r={5} />
      <Label x={355} y={120} size={18}>Little&apos;s Law</Label>
      {notes.map(({ text, red }, i) => (
        <Label key={text} x={256} y={160 + i * 30} size={19} anchor="start" color={red ? ink.red : undefined}>
          {text}
        </Label>
      ))}
      <Face x={590} y={170} mood="happy" />
      <Label x={340} y={388} size={22}>A minute of arithmetic catches a confident, wrong fix</Label>
    </Sketch>
  );
}
