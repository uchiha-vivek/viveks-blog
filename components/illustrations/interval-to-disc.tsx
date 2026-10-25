import Sketch from "./Sketch";
import { Face, Label, StickFigure } from "./parts";

// The same rule |z| < R gives an interval on the real line and a disc in the complex plane.
export default function IntervalToDisc() {
  return (
    <Sketch
      id="interval-to-disc"
      title="On the real line a power series converges on an interval |x| < R; in the complex plane the same rule |z| < R gives a disc."
      viewBox="0 0 680 410"
      lines={
        <>
          <line x1={340} y1={20} x2={340} y2={370} strokeDasharray="6 8" strokeWidth={2} />
          {/* Left: real line */}
          <line x1={30} y1={200} x2={310} y2={200} strokeWidth={2} />
          <line x1={70} y1={200} x2={270} y2={200} strokeWidth={7} />
          <line x1={170} y1={192} x2={170} y2={208} strokeWidth={2} />
          <StickFigure x={170} y={110} scale={0.5} />
          {/* Right: complex plane */}
          <line x1={380} y1={200} x2={645} y2={200} strokeWidth={2} />
          <line x1={510} y1={70} x2={510} y2={330} strokeWidth={2} />
          <circle cx={510} cy={200} r={100} strokeWidth={4} />
          <line x1={510} y1={200} x2={580.7} y2={129.3} strokeDasharray="5 5" strokeWidth={2} />
          <StickFigure x={470} y={150} scale={0.5} />
        </>
      }
    >
      <Label x={170} y={42} size={24}>REAL LINE</Label>
      <Label x={510} y={42} size={24}>COMPLEX PLANE</Label>
      <Label x={68} y={213} size={36}>(</Label>
      <Label x={272} y={213} size={36}>)</Label>
      <Label x={70} y={240} size={18}>-R</Label>
      <Label x={170} y={240} size={18}>0</Label>
      <Label x={270} y={240} size={18}>R</Label>
      <Label x={558} y={180} size={20}>R</Label>
      <Face x={170} y={110} mood="happy" scale={0.5} />
      <Face x={470} y={150} mood="happy" scale={0.5} />
      <Label x={170} y={345}>converges on an interval</Label>
      <Label x={170} y={372} size={22}>|x| &lt; R</Label>
      <Label x={510} y={345}>converges on a disc</Label>
      <Label x={510} y={372} size={22}>|z| &lt; R</Label>
      <Label x={340} y={402} size={18}>Same rule, one more dimension: the interval becomes a disc</Label>
    </Sketch>
  );
}
