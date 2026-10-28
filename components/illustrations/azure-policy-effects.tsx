import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// Three deployments meet the same policy gate, one per effect:
// deny stops it, audit lets it through but flags it, deployIfNotExists fixes it.
const rows = [
  { y: 120, name: "storage account", issue: "not encrypted", effect: "deny", result: "blocked before it exists", red: true },
  { y: 215, name: "virtual machine", issue: "no cost tag", effect: "audit", result: "deployed, flagged in report", red: false },
  { y: 310, name: "web app", issue: "no logging", effect: "deployIfNotExists", result: "deployed, logging switched on", red: false },
];

export default function AzurePolicyEffects() {
  return (
    <Sketch
      id="azure-policy-effects"
      title="Three deployments reach an Azure Policy gate: deny blocks an unencrypted storage account, audit lets an untagged VM through but flags it, and deployIfNotExists switches on logging for a web app."
      viewBox="0 0 680 400"
      lines={
        <>
          {/* the policy gate */}
          <rect x={300} y={70} width={40} height={280} />
          {[110, 160, 210, 260, 310].map((y) => (
            <line key={y} x1={300} y1={y} x2={340} y2={y - 30} />
          ))}
          {rows.map(({ y, red }) => (
            <g key={y}>
              <rect x={30} y={y - 30} width={150} height={60} rx={6} />
              <Arrow from={[188, y]} to={[292, y]} />
              {!red && <Arrow from={[348, y]} to={[398, y]} />}
            </g>
          ))}
        </>
      }
    >
      <Label x={320} y={50} size={22}>POLICY</Label>
      {rows.map(({ y, name, issue, effect, result, red }) => (
        <g key={y}>
          <Label x={105} y={y - 4} size={18}>{name}</Label>
          <Label x={105} y={y + 20} size={16} color={ink.red}>{issue}</Label>
          {red && <Label x={372} y={y + 9} size={30} color={ink.red}>✗</Label>}
          <Label x={408} y={y - 4} size={22} anchor="start" color={red ? ink.red : ink.green}>{effect}</Label>
          <Label x={408} y={y + 20} size={16} anchor="start">{result}</Label>
        </g>
      ))}
      <Label x={340} y={388} size={22}>One rule set, three effects</Label>
    </Sketch>
  );
}
