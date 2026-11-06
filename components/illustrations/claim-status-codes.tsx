import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// The letter of a 277 category code tells you the claim's stage.
const top = [
  { x: 15, w: 130, title: "Claim sent", lines: ["837"] },
  { x: 180, w: 150, title: "A · acknowledged", lines: ["A1 received", "A2 accepted"] },
  { x: 365, w: 130, title: "P · pending", lines: ["P1 in process", "just wait"] },
  { x: 530, w: 135, title: "F · finalized", lines: ["decision made"] },
];

export default function ClaimStatusCodes() {
  return (
    <Sketch
      id="claim-status-codes"
      title="Claim status category codes: a sent claim is acknowledged (A1 received, A2 accepted), then pending (P1), then finalized as paid (F1) or denied (F2). A7 means rejected for bad data: fix and resend before the filing deadline."
      viewBox="0 0 680 390"
      lines={
        <>
          {top.map((b) => (
            <rect key={b.x} x={b.x} y={30} width={b.w} height={110} />
          ))}
          <Arrow from={[147, 85]} to={[177, 85]} size={10} />
          <Arrow from={[332, 85]} to={[362, 85]} size={10} />
          <Arrow from={[497, 85]} to={[527, 85]} size={10} />
          <rect x={480} y={220} width={90} height={90} stroke={ink.green} />
          <rect x={580} y={220} width={90} height={90} stroke={ink.red} />
          <g stroke={ink.green}>
            <Arrow from={[580, 142]} to={[525, 217]} />
          </g>
          <g stroke={ink.red}>
            <Arrow from={[615, 142]} to={[625, 217]} />
            <rect x={150} y={220} width={210} height={90} />
            <Arrow from={[255, 142]} to={[255, 217]} />
          </g>
        </>
      }
    >
      {top.map((b) => (
        <g key={b.x}>
          <Label x={b.x + b.w / 2} y={62} size={20}>{b.title}</Label>
          {b.lines.map((line, i) => (
            <Label key={line} x={b.x + b.w / 2} y={96 + i * 26} size={18}>{line}</Label>
          ))}
        </g>
      ))}
      <Label x={525} y={255} size={20} color={ink.green}>F1</Label>
      <Label x={525} y={285} size={18} color={ink.green}>paid</Label>
      <Label x={625} y={255} size={20} color={ink.red}>F2</Label>
      <Label x={625} y={285} size={18} color={ink.red}>denied</Label>
      <Label x={255} y={250} size={20} color={ink.red}>A7 · rejected</Label>
      <Label x={255} y={276} size={17} color={ink.red}>bad data, never processed</Label>
      <Label x={255} y={298} size={17} color={ink.red}>fix it and resend in time</Label>
      <Label x={340} y={360} size={19}>Ask with a 276; the 277 answer starts with A, P or F</Label>
    </Sketch>
  );
}
