import Sketch from "./Sketch";
import { Arrow, Label } from "./parts";
import { ink } from "./palette";

// The service asks by meaning; only the repository knows SQL and the database.
export default function RepositoryPattern() {
  return (
    <Sketch
      id="repository-pattern"
      title="The payment service asks the order repository to find order 42; only the repository writes SQL against Postgres. In tests, a fake repository that keeps orders in memory takes its place."
      viewBox="0 0 680 400"
      lines={
        <>
          <rect x={20} y={120} width={170} height={120} rx={8} />
          <rect x={270} y={120} width={170} height={120} rx={8} />
          <Arrow from={[190, 165]} to={[266, 165]} />
          <Arrow from={[270, 200]} to={[194, 200]} />
          <Arrow from={[440, 180]} to={[528, 180]} />
          {/* database */}
          <ellipse cx={590} cy={120} rx={55} ry={16} />
          <line x1={535} y1={120} x2={535} y2={230} />
          <line x1={645} y1={120} x2={645} y2={230} />
          <path d="M535 230 A55 16 0 0 0 645 230" />
          {/* fake for tests */}
          <rect x={270} y={285} width={170} height={60} rx={8} stroke={ink.green} strokeDasharray="6 8" />
          <g strokeDasharray="6 8" stroke={ink.green}>
            <Arrow from={[105, 240]} to={[266, 314]} />
          </g>
        </>
      }
    >
      <Label x={105} y={100} size={18}>asks by meaning</Label>
      <Label x={355} y={100} size={18}>knows the database</Label>
      <Label x={105} y={152} size={20}>PaymentService</Label>
      <Label x={105} y={182} size={17}>charge rules</Label>
      <Label x={105} y={206} size={17}>refund rules</Label>
      <Label x={105} y={230} size={17} color={ink.red}>no SQL here</Label>
      <Label x={229} y={153} size={16}>find(42)</Label>
      <Label x={229} y={222} size={16}>order</Label>
      <Label x={355} y={152} size={19}>OrderRepository</Label>
      <Label x={355} y={182} size={17}>find · save</Label>
      <Label x={355} y={210} size={15}>SELECT … FROM</Label>
      <Label x={355} y={228} size={15}>orders WHERE id = 42</Label>
      <Label x={484} y={168} size={16}>SQL</Label>
      <Label x={590} y={185} size={19}>Postgres</Label>
      <Label x={355} y={311} size={18} color={ink.green}>FakeRepository</Label>
      <Label x={355} y={333} size={15} color={ink.green}>orders kept in memory</Label>
      <Label x={150} y={305} size={16} color={ink.green}>in tests</Label>
      <Label x={340} y={388} size={21}>The service asks for orders; only the repository speaks SQL</Label>
    </Sketch>
  );
}
