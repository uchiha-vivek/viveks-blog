import Sketch from "./Sketch";
import { Arrow, Face, Label, StickFigure } from "./parts";
import { ink } from "./palette";

// The choice at 65: Original Medicare or Medicare Advantage.
const original = [
  "run by the federal government",
  "any doctor that takes Medicare",
  "no yearly cap on your 20% share",
  "add Part D + Medigap",
];
const advantage = [
  "run by a private insurer",
  "a network of doctors (HMO / PPO)",
  "yearly cap: up to $9,250 (2026)",
  "usually adds drugs + extras",
];

export default function MedicareTwoPaths() {
  return (
    <Sketch
      id="medicare-two-paths"
      title="At 65 you choose between Original Medicare (government, any doctor, no yearly cap, add Part D and Medigap) and Medicare Advantage (private insurer, network, yearly cap up to $9,250, usually includes drugs)."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={15} y={20} width={310} height={150} />
          <rect x={355} y={20} width={310} height={150} stroke={ink.red} />
          <Arrow from={[322, 205]} to={[180, 178]} />
          <Arrow from={[358, 205]} to={[500, 178]} />
          <StickFigure x={340} y={240} scale={0.75} />
        </>
      }
    >
      <Label x={170} y={48} size={22}>Original Medicare</Label>
      {original.map((line, i) => (
        <Label key={line} x={30} y={78 + i * 24} size={17} anchor="start">• {line}</Label>
      ))}
      <Label x={510} y={48} size={22} color={ink.red}>Medicare Advantage</Label>
      {advantage.map((line, i) => (
        <Label key={line} x={370} y={78 + i * 24} size={17} anchor="start">• {line}</Label>
      ))}
      <Face x={340} y={240} mood="worried" scale={0.75} />
      <Label x={420} y={290} size={20} anchor="start">which path?</Label>
      <Label x={340} y={392} size={18}>Pick when you first sign up; you can switch each year, Oct 15 – Dec 7</Label>
    </Sketch>
  );
}
