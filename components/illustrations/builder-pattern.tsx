import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// A long positional constructor vs. naming each field and calling build().
const steps = [".amount(499)", '.currency("INR")', '.customer("c_17")', ".retries(3)", ".build()"];
const fields = ["amount: 499", "currency: INR", "customer: c_17", "retries: 3"];

export default function BuilderPattern() {
  return (
    <Sketch
      id="builder-pattern"
      title="Before: new PaymentRequest with eight positional arguments, and nobody knows which one is retries. After: a builder names each field (amount, currency, customer, retries) and build() checks the finished request once."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={20} y={40} width={640} height={50} rx={8} />
          {steps.map((step, i) => (
            <rect
              key={step}
              x={40}
              y={160 + i * 40}
              width={230}
              height={34}
              rx={17}
              stroke={i === steps.length - 1 ? ink.green : undefined}
            />
          ))}
          <Arrow from={[272, 337]} to={[416, 300]} />
          <path d="M420 160 H615 L640 185 V350 H420 Z" />
          <path d="M615 160 V185 H640" />
          <line x1={420} y1={202} x2={640} y2={202} />
        </>
      }
    >
      <Label x={20} y={30} size={18} anchor="start" color={ink.red}>Before</Label>
      <Label x={340} y={71} size={18}>new PaymentRequest(499, &quot;INR&quot;, null, null, true, 3, null, false)</Label>
      <Label x={340} y={116} size={18} color={ink.red}>which one is the retry count?</Label>
      <Label x={20} y={150} size={18} anchor="start" color={ink.green}>After</Label>
      {steps.map((step, i) => (
        <Label key={step} x={155} y={183 + i * 40} size={18} color={i === steps.length - 1 ? ink.green : undefined}>
          {step}
        </Label>
      ))}
      <Label x={520} y={190} size={19}>PaymentRequest</Label>
      {fields.map((field, i) => (
        <Label key={field} x={438} y={230 + i * 27} size={17} anchor="start">{field}</Label>
      ))}
      <Label x={438} y={338} size={17} anchor="start" color={ink.green}>✓ checked once</Label>
      <Label x={340} y={388} size={21}>Name every field, then build() checks the whole request</Label>
    </Sketch>
  );
}
