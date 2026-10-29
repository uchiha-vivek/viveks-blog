import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// OrderService publishes one event; listeners subscribe and react on their own.
const xs = [215, 370, 525];
const above = [
  { title: "Inventory", sub: "reserve stock" },
  { title: "Email", sub: "send receipt" },
  { title: "Loyalty", sub: "add points" },
];
const below = [
  { title: "Analytics", sub: "record sale" },
  { title: "Warehouse", sub: "pack the box" },
  { title: "+ Coupon", sub: "added later", added: true },
];

export default function ObserverPattern() {
  return (
    <Sketch
      id="observer-pattern"
      title="The order service publishes one OrderPlaced event. Inventory, email, loyalty, analytics and warehouse each listen and react on their own, and a new coupon listener can join later without changing the order service."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={20} y={160} width={150} height={80} rx={8} />
          <Arrow from={[170, 200]} to={[206, 200]} />
          <rect x={210} y={178} width={450} height={44} rx={22} stroke={ink.red} />
          {above.map(({ title }, i) => (
            <g key={title}>
              <rect x={xs[i]} y={50} width={135} height={56} rx={8} />
              <Arrow from={[xs[i] + 67, 178]} to={[xs[i] + 67, 110]} />
            </g>
          ))}
          {below.map(({ title, added }, i) => (
            <g key={title} stroke={added ? ink.green : undefined} strokeDasharray={added ? "6 8" : undefined}>
              <rect x={xs[i]} y={295} width={135} height={56} rx={8} />
              <Arrow from={[xs[i] + 67, 222]} to={[xs[i] + 67, 291]} />
            </g>
          ))}
        </>
      }
    >
      <Label x={95} y={196} size={19}>OrderService</Label>
      <Label x={95} y={222} size={16}>publishes</Label>
      <Label x={435} y={207} size={19} color={ink.red}>event: OrderPlaced #42</Label>
      {above.map(({ title, sub }, i) => (
        <g key={title}>
          <Label x={xs[i] + 67} y={74} size={18}>{title}</Label>
          <Label x={xs[i] + 67} y={96} size={15}>{sub}</Label>
        </g>
      ))}
      {below.map(({ title, sub, added }, i) => (
        <g key={title}>
          <Label x={xs[i] + 67} y={319} size={18} color={added ? ink.green : undefined}>{title}</Label>
          <Label x={xs[i] + 67} y={341} size={15} color={added ? ink.green : undefined}>{sub}</Label>
        </g>
      ))}
      <Label x={340} y={388} size={21}>The order service never knows who is listening</Label>
    </Sketch>
  );
}
