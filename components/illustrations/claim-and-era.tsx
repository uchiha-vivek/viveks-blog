import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// A two-line claim and the 835 that answers it, with CARC codes explaining each cut.
export default function ClaimAndEra() {
  return (
    <Sketch
      id="claim-and-era"
      title="A claim bills $190 over two service lines: an office visit (99213, $150) and a blood count (85025, $40). The 835 ERA pays $85: line 1 is cut $45 for being above the allowed amount (CARC 45) and $20 for the patient's co-pay (CARC 3); line 2 is denied as not medically necessary (CARC 50)."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={15} y={40} width={265} height={290} />
          <rect x={355} y={40} width={310} height={290} stroke={ink.red} />
          <line x1={15} y1={80} x2={280} y2={80} />
          <line x1={355} y1={80} x2={665} y2={80} />
          <line x1={15} y1={280} x2={280} y2={280} />
          <line x1={355} y1={280} x2={665} y2={280} />
          <Arrow from={[288, 185]} to={[347, 185]} />
        </>
      }
    >
      <Label x={147} y={68} size={22}>Claim (837)</Label>
      <Label x={30} y={115} size={18} anchor="start">line 1 · 99213</Label>
      <Label x={30} y={140} size={17} anchor="start">office visit</Label>
      <Label x={265} y={115} size={18} anchor="end">$150</Label>
      <Label x={30} y={195} size={18} anchor="start">line 2 · 85025</Label>
      <Label x={30} y={220} size={17} anchor="start">blood count</Label>
      <Label x={265} y={195} size={18} anchor="end">$40</Label>
      <Label x={30} y={312} size={19} anchor="start">billed</Label>
      <Label x={265} y={312} size={19} anchor="end">$190</Label>

      <Label x={318} y={172} size={16}>payer</Label>
      <Label x={318} y={210} size={16}>decides</Label>

      <Label x={510} y={68} size={22} color={ink.red}>ERA (835)</Label>
      <Label x={370} y={115} size={18} anchor="start">line 1</Label>
      <Label x={650} y={115} size={18} anchor="end">paid $85</Label>
      <Label x={385} y={142} size={16} anchor="start" color={ink.red}>CARC 45: −$45 over allowed</Label>
      <Label x={385} y={166} size={16} anchor="start" color={ink.red}>CARC 3: −$20 patient co-pay</Label>
      <Label x={370} y={210} size={18} anchor="start">line 2</Label>
      <Label x={650} y={210} size={18} anchor="end">paid $0</Label>
      <Label x={385} y={237} size={16} anchor="start" color={ink.red}>CARC 50: −$40 not</Label>
      <Label x={385} y={259} size={16} anchor="start" color={ink.red}>medically necessary</Label>
      <Label x={370} y={312} size={19} anchor="start">paid</Label>
      <Label x={650} y={312} size={19} anchor="end">$85</Label>
      <Label x={340} y={375} size={18}>Every gap between billed and paid comes with a CARC code</Label>
    </Sketch>
  );
}
