import katex from "katex";

export function Equation({ tex }: { tex: string }) {
  return <div className="lesson-equation" tabIndex={0} dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { displayMode: true, throwOnError: true, trust: false, output: "htmlAndMathml" }) }} />;
}

export default function MathText({ text }: { text: string }) {
  return <>{text.split(/(\$[^$]+\$)/g).map((part, index) => part.startsWith("$") && part.endsWith("$") ? <span key={index} dangerouslySetInnerHTML={{ __html: katex.renderToString(part.slice(1, -1), { throwOnError: true, trust: false, output: "htmlAndMathml" }) }} /> : part)}</>;
}
