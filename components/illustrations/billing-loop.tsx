import Sketch from "./Sketch";
import { Arrow, Badge, Label } from "./parts";
import { ink } from "./palette";

// One visit from start to finish, with the X12 transaction for each step.
const W = 200;
const H = 120;
const steps = [
  { n: 1, x: 15, y: 30, title: "Check eligibility", lines: ["270 → 271", "covered on this date?"] },
  { n: 2, x: 240, y: 30, title: "See the patient", lines: ["date of service", "coded: CPT, HCPCS, CDT"] },
  { n: 3, x: 465, y: 30, title: "Send the claim", lines: ["837P or 837I", "via a clearinghouse"] },
  { n: 4, x: 465, y: 220, title: "Track the claim", lines: ["276 → 277", "pending or finalized?"] },
  { n: 5, x: 240, y: 220, title: "Get paid", lines: ["835 ERA", "CARC/RARC explain cuts"] },
];

export default function BillingLoop() {
  return (
    <Sketch
      id="billing-loop"
      title="The billing loop: 1 check eligibility (270/271), 2 see the patient and code the visit, 3 send the claim (837), 4 track it (276/277), 5 get paid with an 835 ERA. Denied claims usually trace back to step 1."
      viewBox="0 0 680 400"
      lines={
        <>
          {steps.map((s) => (
            <rect key={s.n} x={s.x} y={s.y} width={W} height={H} />
          ))}
          <rect x={15} y={220} width={W} height={H} stroke={ink.red} />
          <Arrow from={[217, 90]} to={[237, 90]} size={9} />
          <Arrow from={[442, 90]} to={[462, 90]} size={9} />
          <Arrow from={[565, 152]} to={[565, 217]} />
          <Arrow from={[463, 280]} to={[443, 280]} size={9} />
          <g stroke={ink.red}>
            <Arrow from={[238, 280]} to={[218, 280]} size={9} />
            <Arrow from={[115, 218]} to={[115, 153]} />
          </g>
        </>
      }
    >
      {steps.map((s) => (
        <g key={s.n}>
          <Badge x={s.x + 22} y={s.y + 26} n={s.n} />
          <Label x={s.x + 42} y={s.y + 33} size={21} anchor="start">{s.title}</Label>
          {s.lines.map((line, i) => (
            <Label key={line} x={s.x + W / 2} y={s.y + 68 + i * 28} size={18}>{line}</Label>
          ))}
        </g>
      ))}
      <Label x={115} y={253} size={21} color={ink.red}>Denied?</Label>
      <Label x={115} y={288} size={18} color={ink.red}>most denials trace</Label>
      <Label x={115} y={316} size={18} color={ink.red}>back to step 1</Label>
      <Label x={340} y={385} size={19}>Every step is its own X12 message between clinic and payer</Label>
    </Sketch>
  );
}
