import type { Signal, Topic } from "./site";

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
};

// Your curated learnings. Add a new object to the top of this array
// and it flows into the paper automatically.
export const posts: Post[] = [
  {
    slug: "littles-law-the-one-equation-every-engineer-should-know",
    title: "Little's Law: The One Equation Every Engineer Should Know",
    dek: "A result from queueing theory that links load, latency and concurrency — and quietly explains most capacity problems.",
    topic: "Mathematics",
    chapter: 13,
    signal: "must-read",
    date: "2026-10-11",
    readingTime: 4,
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
