import { useId } from "react";

export default function ComplexDiagram({ kind }: { kind: "complex-plane" | "cube-roots" }) {
  const id = useId();
  const roots = kind === "cube-roots";
  return <figure className="complex-diagram">
    <svg viewBox="0 0 520 380" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>{roots ? "The three cube roots of 8" : "The point 3 + 4i and its conjugate"}</title>
      <desc id={`${id}-desc`}>{roots ? "Three points on a circle of radius two: 2 on the real axis, negative one plus i square root of three above, and negative one minus i square root of three below. They are equally spaced by 120 degrees." : "3 + 4i lies three units right and four units up from the origin. Its distance from the origin is five. Its conjugate, 3 minus 4i, is its reflection across the horizontal real axis."}</desc>
      <g stroke="var(--muted)" strokeWidth="1.2" fill="none">
        <path d="M50 190H470m-8-5 8 5-8 5M230 345V30m-5 8 5-8 5 8" />
      </g>
      <g fill="var(--muted)" fontSize="14">
        <text x="425" y="214">Real</text><text x="244" y="37">Imaginary</text><text x="211" y="210">0</text>
      </g>
      {roots ? <>
        <circle cx="230" cy="190" r="120" fill="none" stroke="var(--muted)" strokeDasharray="5 5" />
        <path d="M230 190H350M230 190 170 86.08M230 190 170 293.92" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <g fill="var(--accent)"><circle cx="350" cy="190" r="5" /><circle cx="170" cy="86.08" r="5" /><circle cx="170" cy="293.92" r="5" /></g>
        <g fill="var(--ink-strong)" fontSize="17"><text x="361" y="180">2</text><text x="66" y="71">−1 + i√3</text><text x="66" y="321">−1 − i√3</text></g>
      </> : <>
        <path d="M230 190H320V70M320 190V310" fill="none" stroke="var(--muted)" strokeDasharray="5 5" />
        <path d="M230 190 320 70" stroke="var(--accent)" strokeWidth="2.5" />
        <path d="M230 190 320 310" stroke="var(--muted)" strokeWidth="1.5" />
        <g fill="var(--accent)"><circle cx="320" cy="70" r="5" /><circle cx="320" cy="310" r="5" /></g>
        <g fill="var(--ink-strong)" fontSize="17"><text x="334" y="70">3 + 4i</text><text x="334" y="317">3 − 4i</text><text x="249" y="117">|z| = 5</text><text x="315" y="211">3</text><text x="203" y="75">4</text><text x="195" y="315">−4</text></g>
      </>}
    </svg>
    <figcaption>{roots ? "All three cube roots of 8 have modulus 2 and are separated by 120°." : "The point 3 + 4i has modulus 5. Conjugation reflects it across the real axis."}</figcaption>
  </figure>;
}
