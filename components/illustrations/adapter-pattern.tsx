import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// One call in our terms; each adapter translates to one provider's format.
const pairs = [
  { y: 70, adapter: "StripeAdapter", how: "₹ → paise, JSON", api: "Stripe API", wire: "{ amount: 49900 }" },
  { y: 250, adapter: "BankAdapter", how: "₹ → XML", api: "Old bank", wire: "<AMT>499.00</AMT>" },
];

export default function AdapterPattern() {
  return (
    <Sketch
      id="adapter-pattern"
      title="Checkout makes one call, charge(499, INR). The Stripe adapter turns it into JSON with 49,900 paise for the Stripe API; the bank adapter turns it into XML with AMT 499.00 for an old bank gateway."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={20} y={140} width={160} height={120} rx={8} />
          <Arrow from={[180, 180]} to={[246, 110]} />
          <Arrow from={[180, 220]} to={[246, 280]} />
          {pairs.map(({ y, api }) => (
            <g key={api}>
              <rect x={250} y={y} width={170} height={70} rx={8} stroke={ink.red} />
              <Arrow from={[420, y + 35]} to={[486, y + 35]} />
              <rect x={490} y={y} width={170} height={70} rx={8} />
            </g>
          ))}
        </>
      }
    >
      <Label x={100} y={126} size={17}>our language</Label>
      <Label x={575} y={56} size={17}>their language</Label>
      <Label x={100} y={176} size={20}>Checkout</Label>
      <Label x={100} y={208} size={17}>charge(499,</Label>
      <Label x={100} y={230} size={17}>&quot;INR&quot;)</Label>
      <Label x={335} y={204} size={18} color={ink.red}>adapters translate</Label>
      {pairs.map(({ y, adapter, how, api, wire }) => (
        <g key={api}>
          <Label x={335} y={y + 30} size={19} color={ink.red}>{adapter}</Label>
          <Label x={335} y={y + 54} size={15}>{how}</Label>
          <Label x={575} y={y + 30} size={19}>{api}</Label>
          <Label x={575} y={y + 54} size={15}>{wire}</Label>
        </g>
      ))}
      <Label x={340} y={388} size={21}>The app makes one call; each adapter speaks one provider&apos;s dialect</Label>
    </Sketch>
  );
}
