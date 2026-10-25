import Sketch from "./Sketch";
import { Face, Label, StickFigure, ThoughtBubble } from "./parts";
import { ink } from "./palette";

// Front desk sees ACTIVE; weeks later billing gets a denial after a plan switch.
export default function MedicaidCoverage() {
  return (
    <Sketch
      id="medicaid-coverage"
      title="Front desk sees Medicaid coverage active on Monday; six weeks later the claim is denied because the patient switched plans."
      viewBox="0 0 680 410"
      lines={
        <>
          <line x1={340} y1={20} x2={340} y2={340} strokeDasharray="6 8" strokeWidth={2} />
          {/* Left: front desk */}
          <StickFigure x={120} y={150} leftHand={[86, 242]} rightHand={[172, 238]} />
          <rect x={172} y={196} width={104} height={64} rx={4} />
          <line x1={160} y1={266} x2={290} y2={266} />
          <ThoughtBubble cx={232} cy={98} rx={62} ry={30} tail={[[166, 132], [154, 142]]} />
          {/* Right: billing */}
          <StickFigure x={460} y={150} leftHand={[508, 262]} rightHand={[512, 222]} />
          <rect x={510} y={186} width={120} height={110} rx={3} transform="rotate(5 570 241)" />
          <ThoughtBubble cx={418} cy={82} rx={72} ry={26} tail={[[442, 114], [450, 124]]} />
        </>
      }
    >
      <Face x={120} y={150} mood="happy" />
      <Face x={460} y={150} mood="worried" />
      <Label x={170} y={42} size={24}>MONDAY: FRONT DESK</Label>
      <Label x={510} y={42} size={24}>6 WEEKS LATER: BILLING</Label>
      <Label x={224} y={226} size={18}>Medicaid</Label>
      <Label x={224} y={248} color={ink.green}>ACTIVE ✓</Label>
      <Label x={232} y={105}>All good!</Label>
      <Label x={418} y={88} size={18}>But it was active?!</Label>
      <g transform="rotate(5 570 241)">
        <Label x={570} y={222} size={22} color={ink.red}>CLAIM DENIED</Label>
        <Label x={570} y={250} size={16}>wrong plan:</Label>
        <Label x={570} y={270} size={16}>patient switched</Label>
        <Label x={570} y={288} size={16}>in February</Label>
      </g>
      <Label x={170} y={370} size={22}>Checked coverage once</Label>
      <Label x={510} y={370} size={22}>Plan changed. Nobody noticed.</Label>
      <Label x={340} y={402}>Medicaid eligibility expires. Check it again.</Label>
    </Sketch>
  );
}
