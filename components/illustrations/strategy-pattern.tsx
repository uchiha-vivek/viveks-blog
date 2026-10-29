import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// One slot, many interchangeable discount rules; a new rule is a new class.
const rules = [
  { text: "Premium: 10% off", y: 40 },
  { text: "Student: 15% off", y: 115 },
  { text: "Festival: ₹200 off", y: 190 },
];

export default function StrategyPattern() {
  return (
    <Sketch
      id="strategy-pattern"
      title="Checkout calls strategy.apply(cart) and picks one discount strategy per customer: premium 10% off, student 15% off or festival ₹200 off. A new Black Friday strategy can be added without touching the others."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={20} y={135} width={190} height={130} rx={8} />
          {rules.map(({ text, y }) => (
            <g key={text}>
              <rect x={420} y={y} width={240} height={52} rx={8} />
              <Arrow from={[210, 200]} to={[416, y + 26]} />
            </g>
          ))}
          <g stroke={ink.green} strokeDasharray="6 8">
            <rect x={420} y={275} width={240} height={52} rx={8} />
            <Arrow from={[210, 210]} to={[416, 301]} />
          </g>
        </>
      }
    >
      <Label x={540} y={28} size={17}>each one is a DiscountStrategy</Label>
      <Label x={115} y={168} size={20}>Checkout</Label>
      <Label x={115} y={200} size={17}>total =</Label>
      <Label x={115} y={226} size={16}>strategy.apply(cart)</Label>
      <Label x={115} y={295} size={17}>picks one per customer</Label>
      {rules.map(({ text, y }) => (
        <Label key={text} x={540} y={y + 33} size={19}>{text}</Label>
      ))}
      <Label x={540} y={308} size={19} color={ink.green}>+ Black Friday (new)</Label>
      <Label x={340} y={388} size={21}>Each rule lives in its own class; a new rule touches nothing else</Label>
    </Sketch>
  );
}
