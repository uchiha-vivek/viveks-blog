import Sketch from "./Sketch";
import { Label } from "./parts";
import { ink } from "./palette";

// Original Medicare (A + B) plus a separate Part D, versus Part C bundling them.
export default function MedicareParts() {
  return (
    <Sketch
      id="medicare-parts"
      title="Original Medicare is Part A (hospital) plus Part B (doctors), with Part D (drugs) added separately. Part C, Medicare Advantage, bundles A, B and usually D into one private plan."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={20} y={40} width={310} height={230} strokeDasharray="10 7" strokeWidth={2} />
          {/* Part A: hospital */}
          <rect x={35} y={80} width={135} height={175} />
          <rect x={72} y={125} width={60} height={50} />
          <line x1={102} y1={136} x2={102} y2={164} stroke={ink.red} />
          <line x1={88} y1={150} x2={116} y2={150} stroke={ink.red} />
          {/* Part B: clipboard */}
          <rect x={185} y={80} width={135} height={175} />
          <rect x={225} y={122} width={55} height={58} />
          <rect x={240} y={116} width={25} height={10} />
          <line x1={235} y1={145} x2={270} y2={145} strokeWidth={2} />
          <line x1={235} y1={158} x2={270} y2={158} strokeWidth={2} />
          {/* Part D: pill */}
          <rect x={360} y={80} width={110} height={175} />
          <rect x={385} y={135} width={60} height={26} rx={13} />
          <line x1={415} y1={135} x2={415} y2={161} />
          {/* Part C */}
          <rect x={510} y={40} width={155} height={230} stroke={ink.red} />
        </>
      }
    >
      <Label x={175} y={66} size={20}>Original Medicare</Label>
      <Label x={102} y={108} size={22}>Part A</Label>
      <Label x={102} y={202} size={16}>hospital,</Label>
      <Label x={102} y={222} size={16}>nursing, hospice</Label>
      <Label x={102} y={246} size={16}>usually $0 / mo</Label>
      <Label x={252} y={108} size={22}>Part B</Label>
      <Label x={252} y={202} size={16}>doctors,</Label>
      <Label x={252} y={222} size={16}>outpatient, tests</Label>
      <Label x={252} y={246} size={16}>$202.90 / mo</Label>
      <Label x={345} y={176} size={34}>+</Label>
      <Label x={415} y={108} size={22}>Part D</Label>
      <Label x={415} y={202} size={16}>prescription</Label>
      <Label x={415} y={222} size={16}>drugs</Label>
      <Label x={415} y={246} size={16}>private plan</Label>
      <Label x={490} y={172} size={20}>or</Label>
      <Label x={587} y={70} size={22} color={ink.red}>Part C</Label>
      <Label x={587} y={98} size={18}>Medicare</Label>
      <Label x={587} y={120} size={18}>Advantage</Label>
      <Label x={587} y={150} size={16}>one private plan</Label>
      <Label x={587} y={188} size={20}>= A + B</Label>
      <Label x={587} y={214} size={18}>+ usually D</Label>
      <Label x={587} y={240} size={18}>+ extras</Label>
      <Label x={340} y={318} size={18}>Two ways to get the same core coverage</Label>
      <Label x={340} y={350} size={20}>Original Medicare: A + B, then add D (and Medigap) yourself</Label>
      <Label x={340} y={382} size={20} color={ink.red}>Medicare Advantage: Part C bundles A + B (+ D) in one plan</Label>
    </Sketch>
  );
}
