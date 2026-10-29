import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// Every caller shares the same PaymentConfig; a second copy is never made.
const callers = [
  { name: "Checkout", y: 60 },
  { name: "Refunds", y: 175 },
  { name: "Webhooks", y: 290 },
];

export default function SingletonPattern() {
  return (
    <Sketch
      id="singleton-pattern"
      title="Checkout, Refunds and Webhooks all point at the same single PaymentConfig instance holding API keys, timeouts and the connection pool. A second copy is never created."
      viewBox="0 0 680 400"
      lines={
        <>
          {callers.map(({ name, y }) => (
            <rect key={name} x={20} y={y} width={150} height={50} rx={8} />
          ))}
          <Arrow from={[170, 85]} to={[246, 168]} />
          <Arrow from={[170, 200]} to={[246, 200]} />
          <Arrow from={[170, 315]} to={[246, 232]} />
          <rect x={250} y={140} width={190} height={120} rx={8} stroke={ink.red} strokeWidth={3.5} />
          <rect x={500} y={150} width={160} height={100} rx={8} strokeDasharray="6 8" />
          <g stroke={ink.red}>
            <line x1={515} y1={162} x2={645} y2={238} />
            <line x1={645} y1={162} x2={515} y2={238} />
          </g>
        </>
      }
    >
      {callers.map(({ name, y }) => (
        <Label key={name} x={95} y={y + 32} size={19}>{name}</Label>
      ))}
      <Label x={345} y={126} size={18} color={ink.red}>the one instance</Label>
      <Label x={345} y={174} size={20}>PaymentConfig</Label>
      <Label x={345} y={204} size={17}>API keys</Label>
      <Label x={345} y={230} size={17}>timeouts · pool</Label>
      <Label x={580} y={138} size={17}>a second copy</Label>
      <Label x={580} y={278} size={17} color={ink.red}>never created</Label>
      <Label x={340} y={388} size={21}>Everyone shares one instance, so settings never drift</Label>
    </Sketch>
  );
}
