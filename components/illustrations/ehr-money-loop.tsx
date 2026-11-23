import Sketch from "./Sketch";
import { Arrow, Badge, Label } from "./parts";
import { ink } from "./palette";

// The loop the post describes: each step pushes into the next, and the
// vendor in the middle is paid on every lap.
const BW = 210;
const BH = 64;
const cx = 340;
const cy = 238;
const steps = [
  { n: 1, lines: ["Rules push", "hospitals to buy"] },
  { n: 2, lines: ["Hospital is", "locked in"] },
  { n: 3, lines: ["Screens built", "for the bill"] },
  { n: 4, lines: ["Doctors type,", "patients wait"] },
  { n: 5, lines: ["Vendor sells a fix", "(now: AI add-ons)"], red: true },
].map((s, i) => {
  const a = (-90 + i * 72) * (Math.PI / 180);
  return { ...s, x: Math.round(cx + 228 * Math.cos(a)), y: Math.round(cy + 158 * Math.sin(a)) };
});

// Where the line from box centre (x, y) towards (tx, ty) leaves the box, plus a small gap.
function edge(x: number, y: number, tx: number, ty: number, gap = 10): [number, number] {
  const dx = tx - x;
  const dy = ty - y;
  const t = Math.min((BW / 2 + gap) / Math.abs(dx || 1e-9), (BH / 2 + gap) / Math.abs(dy || 1e-9));
  return [Math.round(x + dx * t), Math.round(y + dy * t)];
}

export default function EhrMoneyLoop() {
  return (
    <Sketch
      id="ehr-money-loop"
      title="The EHR loop: 1 rules push hospitals to buy, 2 the hospital is locked in, 3 screens are built for the bill, 4 doctors type while patients wait, 5 the vendor sells a fix, now AI add-ons, and the loop starts again. The vendor is paid on every lap."
      viewBox="0 0 680 440"
      lines={
        <>
          {steps.map((s) => (
            <rect key={s.n} x={s.x - BW / 2} y={s.y - BH / 2} width={BW} height={BH} rx={10} stroke={s.red ? ink.red : ink.line} />
          ))}
          {steps.map((s, i) => {
            const next = steps[(i + 1) % steps.length];
            return (
              <g key={s.n} stroke={s.red ? ink.red : ink.line}>
                <Arrow from={edge(s.x, s.y, next.x, next.y)} to={edge(next.x, next.y, s.x, s.y)} />
              </g>
            );
          })}
          <circle cx={cx} cy={cy + 6} r={46} stroke={ink.green} />
        </>
      }
    >
      {steps.map((s) => (
        <g key={s.n}>
          <Badge x={s.x - BW / 2 + 4} y={s.y - BH / 2 + 4} n={s.n} />
          {s.lines.map((line, i) => (
            <Label key={line} x={s.x} y={s.y - 6 + i * 24} size={20} color={s.red ? ink.red : undefined}>{line}</Label>
          ))}
        </g>
      ))}
      <Label x={cx} y={cy + 22} size={46} color={ink.green}>$</Label>
      <Label x={cx} y={cy + 78} size={19} color={ink.green}>vendor paid every lap</Label>
    </Sketch>
  );
}
