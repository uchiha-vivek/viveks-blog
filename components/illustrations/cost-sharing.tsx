import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// What the patient pays as the year's bills grow: deductible, then co-insurance, then the out-of-pocket max.
const origin: [number, number] = [80, 320];
const ded: [number, number] = [210, 225];
const oop: [number, number] = [500, 110];

export default function CostSharing() {
  return (
    <Sketch
      id="cost-sharing"
      title="As a year's covered bills grow, the patient first pays 100% until the $1,500 deductible, then 20% co-insurance, until their total reaches the $5,000 out-of-pocket maximum, after which the plan pays 100%."
      viewBox="0 0 680 400"
      lines={
        <>
          <Arrow from={origin} to={[80, 40]} />
          <Arrow from={origin} to={[660, 320]} />
          <line x1={origin[0]} y1={origin[1]} x2={ded[0]} y2={ded[1]} />
          <line x1={ded[0]} y1={ded[1]} x2={oop[0]} y2={oop[1]} />
          <line x1={oop[0]} y1={oop[1]} x2={645} y2={oop[1]} stroke={ink.green} />
          <g strokeDasharray="6 8" strokeWidth={2}>
            <line x1={80} y1={ded[1]} x2={ded[0]} y2={ded[1]} />
            <line x1={ded[0]} y1={ded[1]} x2={ded[0]} y2={320} />
            <line x1={80} y1={oop[1]} x2={oop[0]} y2={oop[1]} />
            <line x1={oop[0]} y1={oop[1]} x2={oop[0]} y2={320} />
          </g>
        </>
      }
    >
      <Label x={90} y={36} size={19} anchor="start">what the patient has paid</Label>
      <Label x={655} y={348} size={19} anchor="end">total covered bills this year →</Label>
      <Label x={72} y={oop[1] + 6} size={17} anchor="end">$5,000</Label>
      <Label x={72} y={ded[1] + 6} size={17} anchor="end">$1,500</Label>
      <Label x={145} y={345} size={17} color={ink.red}>deductible</Label>
      <Label x={355} y={345} size={17} color={ink.red}>co-insurance</Label>
      <Label x={130} y={200} size={18} anchor="start">you pay 100%</Label>
      <Label x={370} y={215} size={18} anchor="start">you pay 20%,</Label>
      <Label x={370} y={238} size={18} anchor="start">plan pays 80%</Label>
      <Label x={572} y={95} size={18} color={ink.green}>plan pays 100%</Label>
      <Label x={572} y={145} size={17} color={ink.green}>out-of-pocket</Label>
      <Label x={572} y={167} size={17} color={ink.green}>max reached</Label>
      <Label x={340} y={388} size={18}>Example plan. Co-pays count towards the max too; premiums don't.</Label>
    </Sketch>
  );
}
