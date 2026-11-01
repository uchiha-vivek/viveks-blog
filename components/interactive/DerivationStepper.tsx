"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { paper } from "./paper";

type Step = { title: string; math: ReactNode; note: ReactNode };

// Reveals a derivation one line at a time. Earlier lines stay visible but faded,
// so the reader can always see where the current line came from.
export default function DerivationStepper({ label, steps }: { label: string; steps: Step[] }) {
  const id = useId();
  const [shown, setShown] = useState(1);
  const [playing, setPlaying] = useState(false);
  const last = steps.length;
  const current = steps[shown - 1];

  useEffect(() => {
    if (!playing) return;
    if (shown >= last) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setShown((n) => n + 1), 2600);
    return () => clearTimeout(timer);
  }, [playing, shown, last]);

  return (
    <figure style={paper} className="widget derivation" aria-labelledby={`${id}-label`}>
      <figcaption id={`${id}-label`} className="widget-label">{label}</figcaption>
      <ol className="derivation-lines">
        {steps.slice(0, shown).map((step, i) => (
          <li key={i} className={i === shown - 1 ? "is-current" : undefined} aria-current={i === shown - 1 ? "step" : undefined}>
            <span className="derivation-num">{i + 1}</span>
            <div className="derivation-math">{step.math}</div>
          </li>
        ))}
      </ol>
      <div className="derivation-note" aria-live="polite">
        <strong>Step {shown} of {last}: {current.title}.</strong> {current.note}
      </div>
      <div className="widget-progress" aria-hidden="true">
        {steps.map((_, i) => <span key={i} className={i < shown ? "on" : undefined} />)}
      </div>
      <div className="widget-actions">
        <button type="button" onClick={() => { setPlaying(false); setShown((n) => Math.max(1, n - 1)); }} disabled={shown === 1}>← Back</button>
        <button type="button" className="primary" onClick={() => { setPlaying(false); setShown((n) => Math.min(last, n + 1)); }} disabled={shown === last}>Next step →</button>
        {shown === last ? (
          <button type="button" onClick={() => { setPlaying(false); setShown(1); }}>Start over</button>
        ) : (
          <button type="button" onClick={() => setPlaying((p) => !p)}>{playing ? "Pause" : "Play all"}</button>
        )}
      </div>
    </figure>
  );
}
