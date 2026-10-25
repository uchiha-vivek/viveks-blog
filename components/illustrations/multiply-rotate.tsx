import Sketch from "./Sketch";
import { Arrow, ArrowHead, Face, Label, StickFigure } from "./parts";
import { ink } from "./palette";

// z = 4 + 3i (drawn 20px per unit). Left: 2z stretches. Right: iz rotates by 90°.
export default function MultiplyRotate() {
  const arcAngle = Math.atan2(0.6, -0.8); // tangent at the end of the 90° arc
  return (
    <Sketch
      id="multiply-rotate"
      title="Multiplying by 2 doubles a complex number's length; multiplying by i keeps the length and rotates it 90 degrees."
      viewBox="0 0 680 410"
      lines={
        <>
          <line x1={340} y1={20} x2={340} y2={370} strokeDasharray="6 8" strokeWidth={2} />
          {/* Left: × 2 */}
          <line x1={60} y1={280} x2={262} y2={280} strokeWidth={2} />
          <line x1={90} y1={300} x2={90} y2={70} strokeWidth={2} />
          <g stroke={ink.red}><Arrow from={[90, 280]} to={[250, 160]} /></g>
          <Arrow from={[90, 280]} to={[170, 220]} />
          <StickFigure x={298} y={240} scale={0.5} />
          {/* Right: × i */}
          <line x1={392} y1={280} x2={594} y2={280} strokeWidth={2} />
          <line x1={480} y1={300} x2={480} y2={70} strokeWidth={2} />
          <Arrow from={[480, 280]} to={[560, 220]} />
          <g stroke={ink.red}><Arrow from={[480, 280]} to={[420, 200]} /></g>
          <path d="M520 250 A50 50 0 0 0 450 240" strokeWidth={2} />
          <ArrowHead x={450} y={240} angle={arcAngle} size={10} />
          <StickFigure x={630} y={240} scale={0.5} />
        </>
      }
    >
      <Label x={170} y={42} size={24}>× 2: STRETCH</Label>
      <Label x={510} y={42} size={24}>× i: ROTATE 90°</Label>
      <Label x={142} y={266} size={20}>z</Label>
      <Label x={266} y={156} size={20} color={ink.red}>2z</Label>
      <Label x={542} y={262} size={20}>z</Label>
      <Label x={402} y={198} size={20} color={ink.red}>iz</Label>
      <Label x={500} y={214} size={16}>90°</Label>
      <Face x={298} y={240} mood="happy" scale={0.5} />
      <Face x={630} y={240} mood="happy" scale={0.5} />
      <Label x={170} y={360} size={18}>same direction, twice as long</Label>
      <Label x={510} y={360} size={18}>same length, a quarter turn</Label>
      <Label x={340} y={400} size={18}>Multiplying multiplies the lengths and adds the angles</Label>
    </Sketch>
  );
}
