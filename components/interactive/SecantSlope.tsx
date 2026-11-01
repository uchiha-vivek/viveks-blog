"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ink } from "@/components/illustrations/palette";
import { paper } from "./paper";

// Top panel: sin x and the secant line through x and x + h.
// Bottom panel: cos x, plus a red dot at height = that secant's slope.
// Shrink h and the dot lands on cos x; sweep x and the dots trace cos x.
const W = 640;
const H = 400;
const X0 = -0.4;
const X1 = 7;
const sx = (W - 40) / (X1 - X0);
const amp = 62;
const topY = 110;
const botY = 300;

// Rounded so server and browser render identical SVG (Math.sin can differ in the last digit).
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (x: number) => r2(20 + (x - X0) * sx);
const slopeOf = (x: number, h: number) => (Math.sin(x + h) - Math.sin(x)) / h;

// h slider runs on a log scale so small gaps get as much travel as big ones.
const H_MAX = 2;
const H_MIN = 0.001;
const toH = (s: number) => H_MAX * Math.pow(H_MIN / H_MAX, s / 100);
const toSlider = (h: number) => (100 * Math.log(h / H_MAX)) / Math.log(H_MIN / H_MAX);

function curve(f: (x: number) => number, base: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const x = X0 + (i / 120) * (X1 - X0);
    pts.push(`${px(x).toFixed(1)},${(base - f(x) * amp).toFixed(1)}`);
  }
  return pts.join(" ");
}
const SIN = curve(Math.sin, topY);
const COS = curve(Math.cos, botY);

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SecantSlope() {
  const id = useId();
  const [x, setX] = useState(1);
  const [h, setH] = useState(1.5);
  const [trail, setTrail] = useState<{ x: number; m: number }[]>([]);
  const [busy, setBusy] = useState<null | "shrink" | "sweep">(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function animate(duration: number, step: (t: number) => void, kind: "shrink" | "sweep") {
    cancelAnimationFrame(frame.current);
    if (reducedMotion()) {
      step(1);
      return;
    }
    setBusy(kind);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      step(t);
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else setBusy(null);
    };
    frame.current = requestAnimationFrame(tick);
  }

  function stop() {
    cancelAnimationFrame(frame.current);
    setBusy(null);
  }

  function shrink() {
    const from = toSlider(Math.max(h, 1.5));
    animate(3000, (t) => setH(toH(from + (100 - from) * t * t * (3 - 2 * t))), "shrink");
  }

  function sweep() {
    const dots: { x: number; m: number }[] = [];
    animate(4000, (t) => {
      const nx = t * 2 * Math.PI;
      setX(nx);
      dots.push({ x: nx, m: slopeOf(nx, h) });
      setTrail(t === 1 ? Array.from({ length: 41 }, (_, i) => { const xi = (i / 40) * 2 * Math.PI; return { x: xi, m: slopeOf(xi, h) }; }) : [...dots]);
    }, "sweep");
  }

  const m = slopeOf(x, h);
  const P = [px(x), r2(topY - Math.sin(x) * amp)];
  const Q = [px(x + h), r2(topY - Math.sin(x + h) * amp)];
  // Draw the secant across the panel width around P.
  const reach = 1.6;
  const line = [x - reach, x + h + reach].map((t) => [px(t), r2(topY - (Math.sin(x) + m * (t - x)) * amp)]);
  const dotY = r2(Math.max(botY - 90, Math.min(botY + 90, botY - m * amp)));
  const gap = m - Math.cos(x);

  return (
    <figure style={paper} className="widget secant" aria-labelledby={`${id}-label`}>
      <figcaption id={`${id}-label`} className="widget-label">Shrink the gap h and watch the slope become cos x</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Secant line on sin x from x = ${x.toFixed(2)} to x + h with h = ${h.toFixed(3)}. Its slope is ${m.toFixed(4)}; cos x is ${Math.cos(x).toFixed(4)}.`}>
        <defs>
          <clipPath id={`${id}-top`}><rect x={0} y={20} width={W} height={180} /></clipPath>
        </defs>
        <g stroke={ink.line} strokeWidth={1.5} opacity={0.5}>
          <line x1={10} y1={topY} x2={W - 10} y2={topY} />
          <line x1={10} y1={botY} x2={W - 10} y2={botY} />
          <line x1={px(0)} y1={30} x2={px(0)} y2={190} />
          <line x1={px(0)} y1={botY - 80} x2={px(0)} y2={botY + 80} />
        </g>
        {[["π", Math.PI], ["2π", 2 * Math.PI]].map(([t, v]) => (
          <text key={t as string} x={px(v as number)} y={botY + 98} fontSize={18} textAnchor="middle" fill={ink.line}>{t as string}</text>
        ))}
        <text x={px(0)} y={botY + 98} fontSize={18} textAnchor="middle" fill={ink.line}>0</text>
        <polyline points={SIN} fill="none" stroke={ink.line} strokeWidth={3} />
        <polyline points={COS} fill="none" stroke={ink.green} strokeWidth={3} strokeDasharray="10 7" />
        <text x={W - 14} y={topY - 70} fontSize={22} textAnchor="end" fill={ink.line}>y = sin x</text>
        <text x={W - 14} y={botY + 56} fontSize={22} textAnchor="end" fill={ink.green}>y = cos x</text>
        <line x1={P[0]} y1={P[1]} x2={P[0]} y2={dotY} stroke={ink.line} strokeWidth={1.5} strokeDasharray="3 6" />
        <g clipPath={`url(#${id}-top)`}>
          <line x1={line[0][0]} y1={line[0][1]} x2={line[1][0]} y2={line[1][1]} stroke={ink.red} strokeWidth={3} />
        </g>
        <line x1={P[0]} y1={topY + 70} x2={Q[0]} y2={topY + 70} stroke={ink.red} strokeWidth={2} />
        <line x1={P[0]} y1={topY + 64} x2={P[0]} y2={topY + 76} stroke={ink.red} strokeWidth={2} />
        <line x1={Q[0]} y1={topY + 64} x2={Q[0]} y2={topY + 76} stroke={ink.red} strokeWidth={2} />
        <text x={(P[0] + Q[0]) / 2} y={topY + 94} fontSize={18} textAnchor="middle" fill={ink.red}>h</text>
        <circle cx={P[0]} cy={P[1]} r={6} fill={ink.line} />
        <circle cx={Q[0]} cy={Q[1]} r={6} fill="none" stroke={ink.red} strokeWidth={3} />
        {trail.map((d, i) => (
          <circle key={i} cx={px(d.x)} cy={r2(botY - d.m * amp)} r={3.5} fill={ink.red} opacity={0.7} />
        ))}
        <circle cx={P[0]} cy={dotY} r={8} fill={ink.red} />
      </svg>
      <dl className="secant-readout">
        <div><dt>Slope of the red line</dt><dd style={{ color: ink.red }}>{m.toFixed(4)}</dd></div>
        <div><dt>cos x</dt><dd style={{ color: ink.green }}>{Math.cos(x).toFixed(4)}</dd></div>
        <div><dt>Difference</dt><dd>{Math.abs(gap) < 0.00005 ? "0.0000" : gap.toFixed(4)}</dd></div>
      </dl>
      <div className="secant-controls">
        <label>
          <span>Point x = {x.toFixed(2)}</span>
          <input type="range" min={0} max={6.28} step={0.01} value={x} onChange={(e) => { stop(); setX(Number(e.target.value)); }} />
        </label>
        <label>
          <span>Gap h = {h < 0.01 ? h.toFixed(4) : h.toFixed(3)}</span>
          <input type="range" min={0} max={100} step={0.5} value={toSlider(h)} onChange={(e) => { stop(); setH(toH(Number(e.target.value))); }} />
        </label>
      </div>
      <div className="widget-actions">
        <button type="button" className="primary" onClick={shrink} disabled={busy !== null}>Shrink h</button>
        <button type="button" onClick={sweep} disabled={busy !== null}>Slide x across</button>
        {trail.length > 0 && <button type="button" onClick={() => setTrail([])} disabled={busy !== null}>Clear dots</button>}
      </div>
    </figure>
  );
}
