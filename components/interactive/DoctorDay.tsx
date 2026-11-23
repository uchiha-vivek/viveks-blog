"use client";

import { useId, useState } from "react";
import { ink } from "@/components/illustrations/palette";
import { paper } from "./paper";

// A clinic day, split the way most people picture it and the way
// Sinsky et al. (Annals of Internal Medicine, 2016) measured it.
const GREY = "#d9d2c3";

type Part = { key: string; name: string; pct: number; color: string };
const views: Record<"pictured" | "measured", { tab: string; parts: Part[]; night: boolean }> = {
  pictured: {
    tab: "What you might picture",
    night: false,
    parts: [
      { key: "patients", name: "With patients", pct: 70, color: ink.green },
      { key: "screen", name: "EHR and desk work", pct: 15, color: ink.red },
      { key: "other", name: "Everything else", pct: 15, color: GREY },
    ],
  },
  measured: {
    tab: "What researchers measured",
    night: true,
    parts: [
      { key: "patients", name: "With patients", pct: 27, color: ink.green },
      { key: "screen", name: "EHR and desk work", pct: 49, color: ink.red },
      { key: "other", name: "Everything else", pct: 24, color: GREY },
    ],
  },
};

// Minutes of screen work for every 60 minutes spent with patients.
function perHour(parts: Part[]) {
  const pick = (k: string) => parts.find((p) => p.key === k)!.pct;
  return Math.round((60 * pick("screen")) / pick("patients"));
}
const asTime = (m: number) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${m % 60} min`);

export default function DoctorDay() {
  const id = useId();
  const [view, setView] = useState<keyof typeof views>("pictured");
  const { parts, night } = views[view];
  const screen = perHour(parts);
  const maxMinutes = 120;

  return (
    <figure style={paper} className="widget ehr-day" aria-labelledby={`${id}-label`}>
      <figcaption id={`${id}-label`} className="widget-label">Where a doctor&apos;s clinic day goes</figcaption>

      <div className="widget-actions ehr-tabs" role="group" aria-label="Choose a view">
        {(Object.keys(views) as (keyof typeof views)[]).map((k) => (
          <button key={k} type="button" className={view === k ? "primary" : undefined} aria-pressed={view === k} onClick={() => setView(k)}>
            {views[k].tab}
          </button>
        ))}
      </div>

      <div className="ehr-bar" role="img" aria-label={parts.map((p) => `${p.name} ${p.pct}%`).join(", ")}>
        {parts.map((p) => (
          <span key={p.key} style={{ flexBasis: `${p.pct}%`, background: p.color, color: p.key === "other" ? ink.line : ink.paper }}>
            {p.pct >= 12 && `${p.pct}%`}
          </span>
        ))}
      </div>
      <ul className="ehr-legend">
        {parts.map((p) => (
          <li key={p.key}><i style={{ background: p.color }} />{p.name}</li>
        ))}
      </ul>

      <div className={`ehr-night${night ? " on" : ""}`} aria-hidden={!night}>
        <span className="ehr-moon" aria-hidden>☾</span>
        <span><b>Plus 1 to 2 hours at home</b>, most nights, finishing notes in the EHR. Doctors call it &ldquo;pajama time&rdquo;.</span>
      </div>

      <div className="ehr-hour">
        <p>For every hour spent with patients:</p>
        <div className="ehr-hour-row">
          <span className="ehr-hour-name">Patients</span>
          <span className="ehr-hour-track"><span style={{ width: `${(60 / maxMinutes) * 100}%`, background: ink.green }} /></span>
          <span className="ehr-hour-val">1 h</span>
        </div>
        <div className="ehr-hour-row">
          <span className="ehr-hour-name">Screens</span>
          <span className="ehr-hour-track"><span style={{ width: `${(screen / maxMinutes) * 100}%`, background: ink.red }} /></span>
          <span className="ehr-hour-val" aria-live="polite">{asTime(screen)}</span>
        </div>
      </div>

      <p className="ehr-source">
        Measured split: Sinsky et al., <i>Annals of Internal Medicine</i>, 2016, which watched 57 US doctors in clinic.
        The &ldquo;pictured&rdquo; split is an illustration, not data.
      </p>
    </figure>
  );
}
