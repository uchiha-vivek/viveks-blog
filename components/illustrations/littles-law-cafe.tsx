import Sketch from "./Sketch";
import { Arrow, Label, StickFigure } from "./parts";

// 4 customers arrive per minute and each stays 3 minutes, so about 12 are inside.
const people = Array.from({ length: 12 }, (_, i) => ({
  x: 238 + (i % 6) * 41,
  feet: i < 6 ? 182 : 272,
}));

export default function LittlesLawCafe() {
  return (
    <Sketch
      id="littles-law-cafe"
      title="A café where 4 customers arrive per minute and each stays 3 minutes has about 12 customers inside: L = λ × W."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={200} y={90} width={280} height={200} />
          <path d="M190 90 L340 40 L490 90" />
          <Arrow from={[40, 190]} to={[190, 190]} />
          <Arrow from={[490, 190]} to={[640, 190]} />
          {people.map(({ x, feet }) => (
            <StickFigure key={`${x}-${feet}`} x={x} y={feet - 54} scale={0.3} />
          ))}
        </>
      }
    >
      <Label x={340} y={76} size={22}>CAFÉ</Label>
      <Label x={115} y={146} size={18}>arrive:</Label>
      <Label x={115} y={170} size={20}>4 per min</Label>
      <Label x={565} y={146} size={18}>leave:</Label>
      <Label x={565} y={170} size={20}>4 per min</Label>
      <Label x={340} y={318} size={18}>each customer stays 3 min</Label>
      <Label x={340} y={356}>people inside = arrival rate × time inside</Label>
      <Label x={340} y={386} size={24}>12 = 4 per min × 3 min</Label>
    </Sketch>
  );
}
