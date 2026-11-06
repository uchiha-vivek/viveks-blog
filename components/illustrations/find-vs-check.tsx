import Sketch from "./Sketch";
import { Label } from "./parts";
import { ink } from "./palette";

// Same delivery stops drawn twice. Left: finding the best route means trying
// every order (a tangle of all possible legs). Right: checking the driver's
// route is just adding up one loop.
const stops: [number, number][] = [
  [40, 60], [120, 30], [210, 50], [270, 110], [250, 190],
  [170, 230], [80, 210], [30, 140], [140, 120], [200, 140],
];
const tour = [0, 1, 2, 3, 9, 4, 5, 6, 8, 7];

const find = { x: 20, y: 80 };
const check = { x: 370, y: 80 };

const at = (o: { x: number; y: number }, i: number) => [o.x + stops[i][0], o.y + stops[i][1]] as const;

const pairs = stops.flatMap((_, i) => stops.slice(i + 1).map((__, k) => [i, i + 1 + k] as const));
const loop = tour.map((i) => at(check, i).join(",")).join(" ");

export default function FindVsCheck() {
  return (
    <Sketch
      id="find-vs-check"
      title="The same delivery stops twice: finding the shortest route means trying a tangle of every possible order, about 6 × 10^16 routes or two years of computing; checking the driver's single route means adding up its legs, 96 km in about a minute."
      viewBox="0 0 680 440"
      lines={
        <>
          <g strokeWidth={1.3} opacity={0.45}>
            {pairs.map(([a, b]) => {
              const [x1, y1] = at(find, a);
              const [x2, y2] = at(find, b);
              return <line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
          <line x1={345} y1={30} x2={345} y2={380} strokeDasharray="8 10" strokeWidth={2} />
          <polygon points={loop} stroke={ink.green} />
        </>
      }
    >
      <Label x={165} y={44} size={26}>Finding</Label>
      <Label x={515} y={44} size={26}>Checking</Label>
      {stops.map((_, i) => {
        const [fx, fy] = at(find, i);
        const [cx, cy] = at(check, i);
        return (
          <g key={i}>
            <circle cx={fx} cy={fy} r={7} />
            <circle cx={cx} cy={cy} r={7} />
          </g>
        );
      })}
      <Label x={165} y={350} size={21}>
        try every route: ~6 × 10<tspan dy={-9} fontSize={14}>16</tspan>
      </Label>
      <Label x={165} y={378} size={23} color={ink.red}>about 2 years</Label>
      <Label x={515} y={350} size={21}>add up its legs: 96 km ✓</Label>
      <Label x={515} y={378} size={23} color={ink.green}>about 1 minute</Label>
      <Label x={340} y={424} size={22}>Easy to check, hard to find: that gap is P vs NP</Label>
    </Sketch>
  );
}
