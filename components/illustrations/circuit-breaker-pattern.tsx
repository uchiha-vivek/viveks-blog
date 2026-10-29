import Sketch from "./Sketch";
import { Arrow, ArrowHead, Label } from "./parts";
import { ink } from "./palette";

// Closed → (5 failures) → Open → (30 s) → Half-open → closed if the test works, open again if not.
export default function CircuitBreakerPattern() {
  return (
    <Sketch
      id="circuit-breaker-pattern"
      title="A circuit breaker between checkout and a failing payment gateway has three states. Closed: calls flow. After 5 failures in a row it opens and fails fast. After 30 seconds it goes half-open and sends one test call: if it works the breaker closes, if it fails it opens again."
      viewBox="0 0 680 400"
      lines={
        <>
          {/* checkout → open switch → gateway */}
          <rect x={20} y={15} width={150} height={46} rx={8} />
          <line x1={170} y1={38} x2={260} y2={38} />
          <circle cx={265} cy={38} r={5} />
          <circle cx={335} cy={38} r={5} />
          <line x1={269} y1={35} x2={326} y2={14} stroke={ink.red} />
          <Arrow from={[340, 38]} to={[456, 38]} />
          <rect x={460} y={15} width={200} height={46} rx={8} />
          {/* states */}
          <circle cx={120} cy={200} r={52} stroke={ink.green} />
          <circle cx={560} cy={200} r={52} stroke={ink.red} />
          <circle cx={340} cy={305} r={52} />
          <Arrow from={[176, 185]} to={[502, 185]} />
          <Arrow from={[528, 246]} to={[394, 290]} />
          <Arrow from={[288, 292]} to={[154, 246]} />
          <g stroke={ink.red}>
            <path d="M390 322 Q560 360 562 256" />
            <ArrowHead x={562} y={256} angle={-Math.PI / 2} />
          </g>
        </>
      }
    >
      <Label x={95} y={45} size={19}>Checkout</Label>
      <Label x={300} y={78} size={16}>breaker</Label>
      <Label x={560} y={45} size={19}>Payment gateway</Label>
      <Label x={560} y={84} size={17} color={ink.red}>down ✗</Label>
      <Label x={120} y={198} size={19} color={ink.green}>CLOSED</Label>
      <Label x={120} y={222} size={15}>calls flow</Label>
      <Label x={560} y={198} size={19} color={ink.red}>OPEN</Label>
      <Label x={560} y={222} size={15}>fail fast</Label>
      <Label x={340} y={302} size={18}>HALF-OPEN</Label>
      <Label x={340} y={326} size={15}>one test call</Label>
      <Label x={340} y={172} size={17}>5 failures in a row</Label>
      <Label x={478} y={300} size={16} anchor="start">after 30 s</Label>
      <Label x={200} y={300} size={16} anchor="end" color={ink.green}>test works</Label>
      <Label x={590} y={350} size={16} anchor="start" color={ink.red}>test fails</Label>
      <Label x={340} y={390} size={20}>Fail fast while the gateway is down; test it before trusting it again</Label>
    </Sketch>
  );
}
