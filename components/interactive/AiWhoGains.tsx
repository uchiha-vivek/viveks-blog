"use client";

import { useId, useState } from "react";
import { ink } from "@/components/illustrations/palette";
import { paper } from "./paper";

// Pick an AI feature inside an EHR and see who it mainly helps.
// Scores (0 to 3) are the author's rough judgement, not measurements.
type Who = "patient" | "doctor" | "billing" | "vendor";
const people: { key: Who; name: string }[] = [
  { key: "patient", name: "Patient" },
  { key: "doctor", name: "Doctor" },
  { key: "billing", name: "Hospital billing" },
  { key: "vendor", name: "EHR vendor" },
];

const verdicts = {
  closes: { text: "Closes the gap", color: ink.green },
  depends: { text: "Depends how it's used", color: ink.line },
  widens: { text: "Widens the gap", color: ink.red },
};

const tools: { id: string; name: string; gains: Record<Who, number>; verdict: keyof typeof verdicts; note: string }[] = [
  {
    id: "scribe",
    name: "Writes the visit note while you talk",
    gains: { patient: 2, doctor: 3, billing: 1, vendor: 1 },
    verdict: "closes",
    note: "The doctor can look at you instead of the screen. Early studies show real but modest time saved, and the doctor still has to check every note.",
  },
  {
    id: "summary",
    name: "Sums up a long chart before the visit",
    gains: { patient: 2, doctor: 2, billing: 0, vendor: 1 },
    verdict: "closes",
    note: "Years of records in one paragraph. It only helps if it is accurate: a summary that drops an allergy is worse than no summary.",
  },
  {
    id: "inbox",
    name: "Drafts replies to patient messages",
    gains: { patient: 2, doctor: 1, billing: 0, vendor: 1 },
    verdict: "depends",
    note: "Patients may get faster answers. But the doctor must still read and fix each draft, and some early studies found little time saved.",
  },
  {
    id: "denials",
    name: "Fights insurance denials automatically",
    gains: { patient: 1, doctor: 1, billing: 3, vendor: 2 },
    verdict: "depends",
    note: "Useful, but insurers are buying AI to review claims too. Two machines arguing can make the paperwork bigger, not smaller.",
  },
  {
    id: "coding",
    name: "Suggests higher billing codes",
    gains: { patient: 0, doctor: 1, billing: 3, vendor: 2 },
    verdict: "widens",
    note: "More money per visit, but the care is the same. Insurers raise prices to match, and patients pay for it through premiums.",
  },
  {
    id: "addon",
    name: "Any of these, sold as a pricey add-on",
    gains: { patient: 0, doctor: 0, billing: 0, vendor: 3 },
    verdict: "widens",
    note: "If the only way to fix a slow screen is to buy an AI module, the vendor gets paid twice for the same problem.",
  },
];

export default function AiWhoGains() {
  const id = useId();
  const [pick, setPick] = useState(tools[0].id);
  const tool = tools.find((t) => t.id === pick)!;
  const verdict = verdicts[tool.verdict];

  return (
    <figure style={paper} className="widget ehr-ai" aria-labelledby={`${id}-label`}>
      <figcaption id={`${id}-label`} className="widget-label">Pick an AI feature. Who gains?</figcaption>

      <div className="ehr-ai-tools" role="group" aria-label="AI features">
        {tools.map((t) => (
          <button key={t.id} type="button" aria-pressed={t.id === pick} className={t.id === pick ? "on" : undefined} onClick={() => setPick(t.id)}>
            <i style={{ background: verdicts[t.verdict].color }} aria-hidden />
            {t.name}
          </button>
        ))}
      </div>

      <div className="ehr-ai-result" aria-live="polite">
        <dl className="ehr-ai-bars">
          {people.map((p) => (
            <div key={p.key}>
              <dt>{p.name}</dt>
              <dd aria-label={`${tool.gains[p.key]} out of 3`}>
                {[1, 2, 3].map((n) => (
                  <span key={n} className={n <= tool.gains[p.key] ? "on" : undefined} />
                ))}
              </dd>
            </div>
          ))}
        </dl>
        <p className="ehr-ai-verdict" style={{ color: verdict.color, borderColor: verdict.color }}>{verdict.text}</p>
        <p className="ehr-ai-note">{tool.note}</p>
      </div>

      <p className="ehr-source">Scores are my rough judgement, not measurements.</p>
    </figure>
  );
}
