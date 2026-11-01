import katex from "katex";
import MathText from "@/components/MathText";
import { ink } from "@/components/illustrations/palette";
import DerivationStepper from "./DerivationStepper";

// The derivative of sin x from first principles, one move per step.
// Red marks what changed in this step; green marks a finished value.
const R = (tex: string) => `\\textcolor{${ink.red}}{${tex}}`;
const G = (tex: string) => `\\textcolor{${ink.green}}{${tex}}`;
const L = "\\lim_{h\\to0}";

const steps = [
  {
    title: "Start from the definition",
    tex: `f'(x)=${L}\\frac{f(x+h)-f(x)}{h}`,
    note: "The slope between the points at $x$ and $x+h$, as the gap $h$ shrinks towards zero.",
  },
  {
    title: "Put in sin",
    tex: `\\frac{d}{dx}\\sin x=${L}\\frac{${R("\\sin(x+h)")}-${R("\\sin x")}}{h}`,
    note: "Replace $f$ with $\\sin$. We can't just set $h=0$: the top and bottom would both be $0$, and $0/0$ tells us nothing.",
  },
  {
    title: "Expand sin(x + h)",
    tex: `=${L}\\frac{${R("\\sin x\\cos h+\\cos x\\sin h")}-\\sin x}{h}`,
    note: "Use $\\sin(a+b)=\\sin a\\cos b+\\cos a\\sin b$ with $a=x$ and $b=h$. Now $x$ and $h$ sit in separate pieces.",
  },
  {
    title: "Put the sin x terms together",
    tex: `=${L}\\frac{${R("\\sin x\\cos h-\\sin x")}+\\cos x\\sin h}{h}`,
    note: "Just reorder: move $-\\sin x$ next to $\\sin x\\cos h$.",
  },
  {
    title: "Factor out sin x",
    tex: `=${L}\\frac{${R("\\sin x\\,(\\cos h-1)")}+\\cos x\\sin h}{h}`,
    note: "$\\sin x\\cos h-\\sin x=\\sin x\\,(\\cos h-1)$.",
  },
  {
    title: "Split the fraction",
    tex: `=${L}\\left[\\sin x\\cdot${R("\\frac{\\cos h-1}{h}")}+\\cos x\\cdot${R("\\frac{\\sin h}{h}")}\\right]`,
    note: "Divide each term by $h$. Every $h$ now lives in one of two small fractions.",
  },
  {
    title: "Move sin x and cos x outside",
    tex: `=\\sin x\\cdot${R(`${L}\\frac{\\cos h-1}{h}`)}+\\cos x\\cdot${R(`${L}\\frac{\\sin h}{h}`)}`,
    note: "$\\sin x$ and $\\cos x$ don't change when $h$ changes, so they come out of the limit. What's left are two limits with no $x$ in them at all.",
  },
  {
    title: "Use the two special limits",
    tex: `=\\sin x\\cdot${G("0")}+\\cos x\\cdot${G("1")}`,
    note: "The first limit is $0$ and the second is $1$, with $h$ in radians. The next two sections show why.",
  },
  {
    title: "Done",
    tex: `=${G("\\cos x")}`,
    note: "The $\\sin x$ term is multiplied by zero and disappears. Only $\\cos x$ is left.",
  },
];

export default function SinDerivation() {
  return (
    <DerivationStepper
      label="Derivative of sin x, step by step"
      steps={steps.map(({ title, tex, note }) => ({
        title,
        math: <span dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { displayMode: true, throwOnError: true, trust: false, output: "htmlAndMathml" }) }} />,
        note: <MathText text={note} />,
      }))}
    />
  );
}
