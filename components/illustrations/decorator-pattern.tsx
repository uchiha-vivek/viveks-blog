import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// Wrappers around charge(); each adds one job and passes the call inward.
const layers = [
  { name: "Auth check", x: 50, y: 40, w: 420, h: 320 },
  { name: "Logging", x: 90, y: 90, w: 340, h: 220 },
  { name: "Metrics", x: 130, y: 140, w: 260, h: 120 },
];
const notes = ["each layer:", "· same methods", "· adds one job", "· calls inward"];

export default function DecoratorPattern() {
  return (
    <Sketch
      id="decorator-pattern"
      title="The core charge() method sits inside three wrappers: metrics, then logging, then an auth check. A call passes through each layer on its way in, and the core never changes."
      viewBox="0 0 680 400"
      lines={
        <>
          {layers.map(({ name, x, y, w, h }) => (
            <rect key={name} x={x} y={y} width={w} height={h} rx={20} />
          ))}
          <rect x={170} y={185} width={180} height={55} rx={10} stroke={ink.red} strokeWidth={3.5} />
          <Arrow from={[8, 212]} to={[166, 212]} />
        </>
      }
    >
      {layers.map(({ name, y }) => (
        <Label key={name} x={260} y={y + 28} size={19}>{name}</Label>
      ))}
      <Label x={260} y={220} size={21} color={ink.red}>charge()</Label>
      <Label x={12} y={200} size={16} anchor="start">call</Label>
      {notes.map((note, i) => (
        <Label key={note} x={492} y={150 + i * 30} size={18} anchor="start">{note}</Label>
      ))}
      <Label x={492} y={285} size={18} anchor="start" color={ink.red}>core never changes</Label>
      <Label x={340} y={388} size={21}>Stack wrappers around the service; the core stays small</Label>
    </Sketch>
  );
}
