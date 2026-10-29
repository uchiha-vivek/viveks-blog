import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// Checkout asks for "a provider"; the factory reads config and picks one.
const providers = [
  { name: "Stripe", y: 60, picked: false },
  { name: "Razorpay", y: 172, picked: true },
  { name: "PayPal", y: 284, picked: false },
];

export default function FactoryPattern() {
  return (
    <Sketch
      id="factory-pattern"
      title="Checkout asks the payment factory for a provider. The factory reads the config (country: IN) and its rules (US to Stripe, IN to Razorpay, else PayPal) and hands back Razorpay."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={20} y={155} width={150} height={90} rx={8} />
          <Arrow from={[170, 200]} to={[236, 200]} />
          <rect x={240} y={120} width={180} height={160} rx={8} />
          <line x1={240} y1={162} x2={420} y2={162} />
          <rect x={260} y={30} width={140} height={46} />
          <Arrow from={[330, 76]} to={[330, 116]} />
          {providers.map(({ name, y, picked }) => (
            <g key={name} stroke={picked ? ink.red : undefined}>
              <rect x={500} y={y} width={160} height={56} rx={8} />
              <Arrow from={[420, 200]} to={[496, y + 28]} />
            </g>
          ))}
        </>
      }
    >
      <Label x={95} y={192} size={20}>Checkout</Label>
      <Label x={95} y={220} size={17}>pay ₹499</Label>
      <Label x={203} y={188} size={15}>provider?</Label>
      <Label x={330} y={59} size={18}>country: IN</Label>
      <Label x={330} y={150} size={19}>PaymentFactory</Label>
      <Label x={256} y={192} size={17} anchor="start">US → Stripe</Label>
      <Label x={256} y={220} size={17} anchor="start" color={ink.red}>IN → Razorpay</Label>
      <Label x={256} y={248} size={17} anchor="start">else → PayPal</Label>
      {providers.map(({ name, y, picked }) => (
        <Label key={name} x={580} y={y + 35} size={20} color={picked ? ink.red : undefined}>{name}</Label>
      ))}
      <Label x={340} y={388} size={21}>New provider? One new class, one new line in the factory</Label>
    </Sketch>
  );
}
