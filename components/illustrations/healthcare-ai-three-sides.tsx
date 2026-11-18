import Sketch from "./Sketch";
import { Arrow, Face, Label, StickFigure } from "./parts";
import { ink } from "./palette";

// AI takes over the paperwork, and the time and money saved reach all three groups.
const groups = [
  { name: "Insurer", x: 115, gains: ["fewer wrong claims", "lower costs"] },
  { name: "Patient", x: 340, gains: ["more time with the doctor", "fewer surprise bills"] },
  { name: "Doctor", x: 565, gains: ["less paperwork", "paid faster"] },
];
const headY = 200;
const scale = 0.6;

export default function HealthcareAiThreeSides() {
  return (
    <Sketch
      id="healthcare-ai-three-sides"
      title="AI does the paperwork (insurance checks, forms, claims). The savings reach all three groups: insurers get fewer wrong claims and lower costs, patients get more time with the doctor and fewer surprise bills, doctors get less paperwork and are paid faster."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={180} y={18} width={320} height={92} stroke={ink.red} />
          {groups.map((g) => (
            <Arrow key={g.name} from={[340 + (g.x - 340) * 0.35, 112]} to={[g.x, headY - 28]} />
          ))}
          {groups.map((g) => (
            <StickFigure key={g.name} x={g.x} y={headY} scale={scale} />
          ))}
        </>
      }
    >
      <Label x={340} y={52} size={24} color={ink.red}>AI does the paperwork</Label>
      <Label x={340} y={84} size={18}>insurance checks · forms · claims</Label>
      {groups.map((g) => (
        <g key={g.name}>
          <Face x={g.x} y={headY} mood="happy" scale={scale} />
          <Label x={g.x} y={340} size={22}>{g.name}</Label>
          {g.gains.map((gain, i) => (
            <Label key={gain} x={g.x} y={364 + i * 22} size={18} color={ink.green}>
              {gain}
            </Label>
          ))}
        </g>
      ))}
    </Sketch>
  );
}
