import Sketch from "./Sketch";
import { Label } from "./parts";
import { ink } from "./palette";

// Unit circle, angle h (radians). Three nested shapes share the corner O:
// small triangle OAP (area ½ sin h) ⊂ circle slice OAP (½ h) ⊂ big triangle OAT (½ tan h).
const h = 0.6;
const O = [80, 340] as const;
const r = 250;
const A = [O[0] + r, O[1]] as const;
const P = [O[0] + r * Math.cos(h), O[1] - r * Math.sin(h)] as const;
const T = [A[0], O[1] - r * Math.tan(h)] as const;

export default function SinSqueeze() {
  return (
    <Sketch
      id="sin-squeeze"
      title="Unit circle with angle h. The small triangle OAP fits inside the circle slice, which fits inside the big triangle OAT, so sin h is at most h, which is at most tan h."
      viewBox="0 0 680 405"
      lines={
        <>
          <line x1={O[0]} y1={O[1]} x2={370} y2={O[1]} strokeWidth={2} />
          <line x1={O[0]} y1={O[1]} x2={O[0]} y2={70} strokeWidth={2} />
          {/* rest of the quarter circle, thin */}
          <path d={`M${P[0]} ${P[1]} A${r} ${r} 0 0 0 ${O[0]} ${O[1] - r}`} strokeWidth={1.5} strokeDasharray="4 7" />
          {/* big triangle OAT */}
          <line x1={O[0]} y1={O[1]} x2={T[0]} y2={T[1]} />
          <line x1={A[0]} y1={A[1]} x2={T[0]} y2={T[1]} strokeWidth={4} />
          {/* light fills so the nesting reads at a glance */}
          <path d={`M${O[0]} ${O[1]} L${A[0]} ${A[1]} A${r} ${r} 0 0 0 ${P[0]} ${P[1]} Z`} fill={ink.green} fillOpacity={0.16} stroke="none" />
          <path d={`M${O[0]} ${O[1]} L${A[0]} ${A[1]} L${P[0]} ${P[1]} Z`} fill={ink.red} fillOpacity={0.14} stroke="none" />
          {/* circle slice: the arc from A to P */}
          <path d={`M${A[0]} ${A[1]} A${r} ${r} 0 0 0 ${P[0]} ${P[1]}`} stroke={ink.green} strokeWidth={6} />
          {/* small triangle OAP */}
          <path d={`M${O[0]} ${O[1]} L${A[0]} ${A[1]} L${P[0]} ${P[1]} Z`} stroke={ink.red} strokeWidth={3} />
          {/* height of P = sin h */}
          <line x1={P[0]} y1={P[1]} x2={P[0]} y2={O[1]} strokeDasharray="5 6" strokeWidth={2} />
          {/* angle mark */}
          <path d={`M${O[0] + 46} ${O[1]} A46 46 0 0 0 ${O[0] + 46 * Math.cos(h)} ${O[1] - 46 * Math.sin(h)}`} strokeWidth={2} />
          {/* legend samples */}
          <line x1={410} y1={150} x2={450} y2={150} stroke={ink.red} strokeWidth={3} />
          <line x1={410} y1={190} x2={450} y2={190} stroke={ink.green} strokeWidth={6} />
          <line x1={410} y1={230} x2={450} y2={230} strokeWidth={3} />
        </>
      }
    >
      <Label x={O[0] - 14} y={O[1] + 22} size={20}>O</Label>
      <Label x={A[0] + 4} y={A[1] + 24} size={20}>A</Label>
      <Label x={P[0] - 14} y={P[1] - 10} size={20}>P</Label>
      <Label x={T[0] + 14} y={T[1] - 4} size={20}>T</Label>
      <Label x={O[0] + 66} y={O[1] - 12} size={20}>h</Label>
      <Label x={205} y={O[1] + 26} size={18}>1</Label>
      <Label x={P[0] - 8} y={300} size={18} anchor="end">sin h</Label>
      <Label x={A[0] + 12} y={262} size={18} anchor="start">tan h</Label>
      <Label x={460} y={156} size={19} anchor="start">small triangle: 1/2 sin h</Label>
      <Label x={460} y={196} size={19} anchor="start" color={ink.green}>circle slice: 1/2 h</Label>
      <Label x={460} y={236} size={19} anchor="start">big triangle: 1/2 tan h</Label>
      <Label x={540} y={92} size={22}>areas, smallest first</Label>
      <Label x={530} y={300} size={26} color={ink.red}>sin h ≤ h ≤ tan h</Label>
      <Label x={340} y={396} size={18}>The slice sits between the two triangles, so its area is squeezed between theirs</Label>
    </Sketch>
  );
}
