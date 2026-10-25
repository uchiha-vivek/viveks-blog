import type { Signal, Topic } from "./site";
import type { IllustrationId } from "@/components/illustrations";
import { seriesLessons } from "./lessons/series";
import { complexLessons } from "./lessons/complex";

export type Post = {
  slug: string;
  title: string;
  dek: string; // the standfirst / subtitle
  body: string[]; // paragraphs — first one gets a drop cap
  topic: Topic;
  chapter?: number; // Applied Mathematics chapter (1–13), see lib/curriculum.ts
  signal?: Signal; // omit for an ordinary entry
  date: string; // ISO date
  readingTime: number; // minutes
  topStory?: boolean; // renders in the lead slot
  sourceUrl?: string; // "discuss" / external link, optional
  tags?: string[]; // free-form labels, e.g. "Medicaid"; shown on the post and used in search
  shareImage?: string; // 1200×630 link-preview PNG in /public (see scripts/og-from-sketch.mjs)
  // Drawings from components/illustrations, each shown after body[after].
  illustrations?: { id: IllustrationId; after: number }[];
};

// Your curated learnings. Add a new object to the top of this array
// and it flows into the paper automatically.
export const posts: Post[] = [
  ...complexLessons.map((lesson): Post => ({
    slug: lesson.slug,
    title: lesson.title,
    dek: lesson.subtitle,
    body: [`${lesson.subtitle} A beginner-friendly lesson with step-by-step examples and ${lesson.questions.length} objective questions with explained answers.`],
    topic: "Mathematics",
    chapter: 2,
    date: "2026-10-23",
    readingTime: lesson.readingTime,
  })),
  ...seriesLessons.map((lesson): Post => ({
    slug: lesson.slug,
    title: lesson.title,
    dek: lesson.subtitle,
    body: [lesson.slug === "infinite-series"
      ? "Can infinitely many small pieces add up to a finite total? Learn to read summation notation, build partial sums, and decide whether a series converges, with worked examples and four practice questions."
      : "Build functions from powers of a variable. Learn about coefficients, centres, convergence intervals, and polynomial approximations, with worked examples and four practice questions."],
    topic: "Mathematics",
    chapter: 1,
    date: "2026-10-18",
    readingTime: lesson.readingTime,
  })),
  {
    slug: "why-medicaid-coverage-is-so-hard-to-verify",
    title: "Why Medicaid Coverage Is So Hard to Verify",
    dek: "Coverage that can change any month, plans that swap member IDs, and eligibility checks that only answer for today: why Medicaid trips up even careful clinics.",
    topic: "Tech",
    date: "2026-10-25",
    readingTime: 4,
    tags: ["Medicaid", "Healthcare", "Eligibility verification"],
    shareImage: "/og/why-medicaid-coverage-is-so-hard-to-verify.png",
    illustrations: [{ id: "medicaid-coverage", after: 2 }],
    body: [
      "For most commercial insurance, checking a patient's coverage is a once-a-year chore: the plan renews in January and rarely changes in between. Medicaid does not work that way. More than 70 million people in the US rely on it, and for adults their coverage can change in any month. A patient who was covered at their last visit may have a different plan, a new member ID, or no coverage at all by the next one. For clinics, that turns a routine front-desk check into one of the most error-prone steps in getting paid.",
      "The first problem is churn. Medicaid eligibility depends on income, household size and residency, so a new job, a move to another state or a missed renewal letter can end coverage, sometimes in the middle of a month. When pandemic-era continuous coverage ended in 2023, states had to re-check everyone, and millions of people lost Medicaid, many for paperwork reasons rather than because they were no longer eligible. Some of them re-enroll weeks later, and coverage can apply retroactively, so a visit that looked uninsured on the day may later turn out to have been covered. Children are more stable, because most states now keep them enrolled for 12 months at a time.",
      "The second problem is managed care. Most Medicaid members do not get their benefits directly from the state. They are assigned to a private managed care plan, and they can move from one plan to another, usually at the start of a month. Each move comes with a new payer and a new member ID. If the clinic checks the old plan, the answer comes back 'inactive', and if it bills the old plan, the claim is denied. Nothing looks wrong at the front desk. The mistake only surfaces weeks later as a rejected claim.",
      "The third problem is the eligibility check itself. The standard electronic check (the 270/271 transaction) answers for a specific date, and most Medicaid payers will only confirm coverage up to the current month. Ask about next month's appointment and the request is often rejected. The 'coverage end date' in the response is frequently a placeholder, not a promise. On top of that, every state runs its program differently: some do not let you search by Social Security number, many do not support checking a child as a dependent, and some require the clinic to complete extra enrollment before they will answer at all.",
      "The cost lands on everyone. Clinics lose money to denials and write-offs, and front-desk staff spend hours on payer portals and phone calls. Patients get surprise bills or are turned away, often the people least able to absorb either. Because each failure looks like a one-off, the overall pattern is easy to miss.",
      "What works is treating Medicaid eligibility as something that expires. Check it close to the date of service and again on the day of the visit, not just when the appointment is booked. Re-check at the start of each month, when plan switches take effect. When a managed care plan says 'inactive', ask the state Medicaid program which plan the patient belongs to now, and record the new member ID. Treat end dates as unknown rather than guaranteed. This is exactly the kind of repetitive, rule-heavy work that software should do, so that people can spend their time on patients instead of payer portals.",
    ],
  },
  {
    slug: "littles-law-the-one-equation-every-engineer-should-know",
    title: "Little's Law: The One Equation Every Engineer Should Know",
    dek: "A result from queueing theory that links load, latency and concurrency — and quietly explains most capacity problems.",
    topic: "Mathematics",
    chapter: 13,
    signal: "must-read",
    date: "2026-10-11",
    readingTime: 4,
    illustrations: [{ id: "littles-law-cafe", after: 0 }],
    body: [
      "Little's Law is a result from queueing theory, a branch of applied mathematics, and it fits in one line: L = λ × W. The average number of items in a system (L) equals the average rate at which they arrive (λ) multiplied by the average time each one spends inside (W). The system can be a checkout line, a thread pool, a message queue or a whole microservice. The law does not care.",
      "Take an API that receives 200 requests per second, each taking 250 milliseconds on average. L = 200 × 0.25 = 50, so about 50 requests are in flight at any moment. That number is your real concurrency. It tells you how many threads, connections or workers you need to keep up, with no load test required.",
      "The law is most useful when something goes wrong. Suppose a slow downstream dependency pushes latency from 250 ms to 1 second while traffic stays at 200 requests per second. In-flight work jumps from 50 to 200. If your pool holds 100 workers, the other 100 requests wait in a queue, which makes each request slower, which raises L again. That feedback loop is how a modest slowdown becomes an outage. The arithmetic was visible before the incident.",
      "Little's Law is also remarkable for what it does not assume. It holds for any arrival pattern and any service-time distribution, as long as the system is stable over the long run. That generality is why it appears everywhere: in manufacturing as work-in-progress, in project management as cycle time, and in capacity planning as concurrency.",
      "Used in reverse, it gives you a measurement trick. If you can count items in flight and know the throughput, you can compute average latency without timing anything. If you cut work-in-progress, as Kanban teams do, average cycle time falls at the same throughput. Whenever someone says a system needs more capacity, ask what L, λ and W are today, and which one you can actually change.",
    ],
  },
  {
    slug: "azure-policy-and-why-it-matters",
    title: "Azure Policy and Why It Matters",
    dek: "Guardrails that keep a cloud estate compliant by default — instead of hoping every engineer remembers the rules.",
    topic: "Tech",
    signal: "recommended",
    date: "2026-09-11",
    readingTime: 5,
    topStory: true,
    body: [
      "Azure Policy is a governance service that lets you define rules for what is and is not allowed in your Azure environment, and then enforces them automatically across every subscription and resource group. Instead of trusting each engineer to remember the standards, you encode the standards once and let the platform apply them everywhere.",
      "A policy is a simple statement of intent — \"only allow resources in the West Europe and Central India regions,\" \"require a cost-center tag on every resource,\" or \"deny any storage account that is not encrypted.\" You group related policies into initiatives and assign them at a scope: a management group, a subscription, or a resource group. Everything beneath that scope inherits the rules.",
      "The real power is in the effects. A policy can 'deny' a non-compliant deployment before it ever happens, 'audit' existing resources so you get a compliance report without breaking anything, or 'deployIfNotExists' to automatically remediate — for example, switching on diagnostic logging the moment a resource is created. This turns compliance from a quarterly audit scramble into something that holds continuously.",
      "The significance is straightforward: at scale, manual governance does not work. Azure Policy gives you consistency (the same rules everywhere), security (risky configurations are blocked at the door), cost control (no oversized or untagged resources sneaking in), and audit-readiness (a live compliance dashboard instead of a spreadsheet). It shifts governance left — from cleanup after the fact to guardrails that make the right thing the default.",
      "If you run more than a handful of resources, start small: pick two or three rules that have burned you before — required tags, allowed regions, mandatory encryption — set them to 'audit' first to see the blast radius, then promote them to 'deny' once you trust them.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
