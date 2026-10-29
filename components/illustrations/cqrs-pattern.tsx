import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";

// Commands go through the write model; queries read a separate, ready-made view.
const sides = [
  { cx: 170, head: "Commands (write)", ask: "PlaceOrder · Refund", model: "Write model", note: "all business rules", db: "write DB", dbNote: "normalised tables" },
  { cx: 510, head: "Queries (read)", ask: "GetOrderHistory", model: "Read model", note: "shaped for the screen", db: "read DB", dbNote: "ready-made views" },
];

export default function CqrsPattern() {
  return (
    <Sketch
      id="cqrs-pattern"
      title="CQRS: commands such as PlaceOrder and Refund go through a write model with all the business rules into a normalised write database. Queries such as GetOrderHistory go through a read model into a read database of ready-made views, kept in sync by events."
      viewBox="0 0 680 400"
      lines={
        <>
          {sides.map(({ cx, head }) => (
            <g key={head}>
              <rect x={cx - 110} y={45} width={220} height={50} rx={8} />
              <Arrow from={[cx, 95]} to={[cx, 136]} />
              <rect x={cx - 110} y={140} width={220} height={70} rx={8} />
              <Arrow from={[cx, 210]} to={[cx, 244]} />
              <ellipse cx={cx} cy={262} rx={70} ry={14} />
              <line x1={cx - 70} y1={262} x2={cx - 70} y2={340} />
              <line x1={cx + 70} y1={262} x2={cx + 70} y2={340} />
              <path d={`M${cx - 70} 340 A70 14 0 0 0 ${cx + 70} 340`} />
            </g>
          ))}
          <g strokeDasharray="6 8">
            <Arrow from={[244, 305]} to={[436, 305]} />
          </g>
        </>
      }
    >
      {sides.map(({ cx, head, ask, model, note, db, dbNote }) => (
        <g key={head}>
          <Label x={cx} y={32} size={20}>{head}</Label>
          <Label x={cx} y={77} size={18}>{ask}</Label>
          <Label x={cx} y={170} size={19}>{model}</Label>
          <Label x={cx} y={195} size={15}>{note}</Label>
          <Label x={cx} y={302} size={18}>{db}</Label>
          <Label x={cx} y={324} size={15}>{dbNote}</Label>
        </g>
      ))}
      <Label x={340} y={292} size={16}>events keep it in sync</Label>
      <Label x={340} y={388} size={21}>Writes and reads take separate paths, each tuned for its job</Label>
    </Sketch>
  );
}
