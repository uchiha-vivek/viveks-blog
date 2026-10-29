import Sketch from "./Sketch";
import { Arrow, Badge, Label } from "./parts";

// One ₹499 checkout, snaking left-right-left through the ten patterns.
const col = [20, 250, 480];
const row = [24, 144, 264];
const W = 180;
const H = 58;
const tiles: { c: number; r: number; n?: number; title: string; sub: string }[] = [
  { c: 0, r: 0, n: 8, title: "Middleware", sub: "auth · logging" },
  { c: 1, r: 0, n: 6, title: "Checkout", sub: "builds the request" },
  { c: 2, r: 0, n: 4, title: "Discount rules", sub: "premium · student" },
  { c: 2, r: 1, n: 2, title: "Payment factory", sub: "picks Razorpay" },
  { c: 1, r: 1, n: 7, title: "Razorpay adapter", sub: "translates" },
  { c: 0, r: 1, n: 10, title: "Razorpay API", sub: "behind a breaker" },
  { c: 0, r: 2, n: 1, title: "Order repository", sub: "saves the order" },
  { c: 1, r: 2, n: 5, title: "OrderPlaced event", sub: "email · stock" },
  { c: 2, r: 2, n: 9, title: "Order history", sub: "fast read view" },
];
const mid = (r: number) => row[r] + H / 2;

export default function CheckoutPatternsMap() {
  return (
    <Sketch
      id="checkout-patterns-map"
      title="One checkout touches all ten patterns: middleware (decorator), checkout building the request (builder), discount rules (strategy), payment factory, Razorpay adapter, Razorpay API behind a circuit breaker, order repository, OrderPlaced event (observer), order history read view (CQRS), and one shared config (singleton)."
      viewBox="0 0 680 400"
      lines={
        <>
          {tiles.map(({ c, r }) => (
            <rect key={`${c}${r}`} x={col[c]} y={row[r]} width={W} height={H} rx={8} />
          ))}
          <Arrow from={[200, mid(0)]} to={[248, mid(0)]} />
          <Arrow from={[430, mid(0)]} to={[478, mid(0)]} />
          <Arrow from={[570, row[0] + H]} to={[570, row[1] - 2]} />
          <Arrow from={[480, mid(1)]} to={[432, mid(1)]} />
          <Arrow from={[250, mid(1)]} to={[202, mid(1)]} />
          <Arrow from={[110, row[1] + H]} to={[110, row[2] - 2]} />
          <Arrow from={[200, mid(2)]} to={[248, mid(2)]} />
          <Arrow from={[430, mid(2)]} to={[478, mid(2)]} />
          <rect x={20} y={344} width={290} height={36} rx={18} strokeDasharray="6 8" />
        </>
      }
    >
      {tiles.map(({ c, r, n, title, sub }) => (
        <g key={title}>
          <Label x={col[c] + W / 2} y={row[r] + 26} size={19}>{title}</Label>
          <Label x={col[c] + W / 2} y={row[r] + 47} size={16}>{sub}</Label>
          {n && <Badge x={col[c]} y={row[r]} n={n} />}
        </g>
      ))}
      <Badge x={20} y={344} n={3} />
      <Label x={168} y={368} size={18}>Config: one shared copy</Label>
      <Label x={500} y={370} size={22}>one payment, ten patterns</Label>
    </Sketch>
  );
}
