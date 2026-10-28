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
  cover?: IllustrationId; // sketch shown on the home page card; defaults to the first illustration
};

// The sketch that fronts a post on the home page.
export function coverOf(post: Post): IllustrationId | undefined {
  return post.cover ?? post.illustrations?.[0]?.id;
}

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
    cover: lesson.sections.find((section) => section.sketch)?.sketch,
    shareImage: `/og/${lesson.slug}.png`,
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
    cover: lesson.sections.find((section) => section.sketch)?.sketch,
    shareImage: `/og/${lesson.slug}.png`,
  })),
  {
    slug: "where-engineers-still-beat-ai-agents",
    title: "Where Engineers Still Beat AI Agents, and How to Stay There",
    dek: "Agents now do in an afternoon what took a team a month. Speed isn't understanding, though. Memory, reasoning and first principles are where people still win, if they keep practising them.",
    topic: "Tech",
    date: "2026-10-27",
    readingTime: 6,
    tags: ["AI agents", "Careers", "Software engineering"],
    shareImage: "/og/where-engineers-still-beat-ai-agents.png",
    illustrations: [
      { id: "agent-doubling", after: 0 },
      { id: "ai-perception-gap", after: 1 },
      { id: "retry-check", after: 4 },
    ],
    body: [
      "In 2026 it is normal for an AI agent to finish in an afternoon what used to take an engineer a month: a migration, a test suite, a working prototype. The trend is steep. METR, a research group that measures this, found that the length of software tasks frontier agents can complete on their own (measured by how long they take a human professional) doubled roughly every seven months from 2019 to 2025. Its January 2026 update puts the doubling time since 2023 closer to four months. So the useful question is not whether AI is fast. It is what is left for people, and how to stay good at it.",
      "Start with what speed hides. In a 2025 randomised trial, METR gave 16 experienced open-source developers 246 real tasks in codebases they knew well. With AI tools they took 19% longer, yet afterwards they believed AI had made them 20% faster. The Stack Overflow 2025 developer survey shows the same tension: 84% of developers use or plan to use AI tools, but more of them distrust the output's accuracy (46%) than trust it (33%), and their top complaint is code that is 'almost right'. Agents are very good at producing something plausible. Someone still has to know whether it is correct.",
      "Memory is the first place to compete, though not on raw recall. A model can hold a million tokens in context, more than most codebases, while human working memory holds about four chunks at a time. You will lose that contest. But an agent's memory is borrowed: it starts fresh each session unless someone writes things down, and it does not know why the payments service was split two years ago or which customer the last outage hurt. Human long-term memory turns experience into instinct: 'this looks like the race condition we had last spring.' To upskill, own the history. Keep short decision records, learn the business domain deeply, and explain systems to others, because explaining is how memory becomes judgement.",
      "Reasoning is the second, and here it pays to be honest. ARC-AGI-2 launched in 2025 as a set of puzzles people solve easily and frontier models almost entirely failed; by mid-2026 top models were scoring at or above the average person. Do not build a career on puzzles AI cannot solve, because that list keeps shrinking. The lasting human edge is reasoning about the problem nobody handed you: which problem is worth solving, what the real constraints are, and what breaks when an assumption turns out to be wrong. An agent optimises the task you give it. Defining that task well is the hard part.",
      "First principles are the third, and they are the cheapest way to catch a confident but wrong agent. Ask one for a fix to a slow service and it will happily add a cache or a retry loop. A minute of arithmetic tells you whether that can work. With Little's Law (in-flight work = arrival rate × time in system), 200 requests per second at 1 second each means 200 requests in flight; if your pool holds 100, no retry policy will save you, and retries add load. Maths, probability, complexity and queueing let you check an answer without having to trust it. As producing code gets cheaper, checking it becomes the scarce skill.",
      "So is human intelligence degrading? The evidence points to skills fading from disuse, not to brains getting worse. In a 2025 MIT Media Lab study (a preprint, not yet peer-reviewed), 54 students wrote essays while wearing EEG caps. The group using ChatGPT showed the weakest brain connectivity, and in the first session 83% of them could not correctly quote a sentence from the essay they had just written, against about 11% in the other groups. A 2025 Microsoft and Carnegie Mellon survey of 319 knowledge workers found that the more people trusted AI on a task, the less critical thinking they reported putting into it. Over a longer span, Norwegian conscription data (Bratsberg and Rogeberg, 2018) shows IQ scores falling for people born after 1975, with the cause traced to environment rather than genes. None of this proves AI makes people less intelligent. It does show that what you stop practising, you lose, the same way GPS has made many of us worse at finding our way.",
      "The fix is a set of habits. Attempt or at least sketch the solution before you prompt, so you have something to compare against. Read every diff the agent produces as if a junior engineer wrote it. Estimate before you measure: latency, cost, rows, users. Spend real time on fundamentals (maths, systems, and your business domain), because they are what make an answer checkable. Keep a decision log. And use AI as a sparring partner as well as a typist: ask it to attack your design, then decide yourself whether the attack holds.",
      "AI is driving the cost of writing code towards zero. That moves the value to everything around the code: knowing what to build, remembering why things are the way they are, and being able to tell whether an answer is right. Don't try to beat agents on speed. Use them to go faster at things you understand, and never to skip the understanding.",
    ],
  },
  {
    slug: "medicare-parts-a-b-c-d-explained",
    title: "Medicare Parts A, B, C and D, Explained Simply",
    dek: "Four letters, two paths. A plain-English map of what each part of Medicare covers, what it costs in 2026, and how Original Medicare differs from Medicare Advantage.",
    topic: "Tech",
    date: "2026-10-27",
    readingTime: 5,
    tags: ["Medicare", "Healthcare", "Medicare Advantage"],
    shareImage: "/og/medicare-parts-a-b-c-d-explained.png",
    illustrations: [
      { id: "medicare-parts", after: 0 },
      { id: "medicare-quarters", after: 1 },
      { id: "medicare-two-paths", after: 5 },
    ],
    body: [
      "Medicare is the US federal health insurance program for people aged 65 and over. It also covers some younger people: those who have received Social Security disability benefits for 24 months, and people with ALS or end-stage kidney disease. It is not the same as Medicaid, which is run by the states and based on income. Medicare is split into four parts with letters, and the letters cause most of the confusion. The simplest way to hold it in your head: Parts A and B are the core coverage, Part D adds prescription drugs, and Part C is a different way of getting A, B and usually D from a private insurer.",
      "Part A is hospital insurance. It covers inpatient hospital stays, care in a skilled nursing facility after a hospital stay, hospice care and some home health care. Most people pay no monthly premium for it, because they or their spouse paid Medicare taxes while working for at least 40 quarters, about 10 years. People with fewer quarters can still buy Part A. 'Premium-free' does not mean free to use, though: in 2026 a hospital stay comes with a deductible of $1,736 per benefit period before Part A starts paying.",
      "Part B is medical insurance. It covers doctor visits, outpatient care, lab tests, durable medical equipment such as wheelchairs, some home health care, and preventive services like screenings and flu shots. Unlike Part A, everyone pays a monthly premium. In 2026 the standard premium is $202.90 a month, and people with higher incomes pay more. There is also a yearly deductible of $283, after which you typically pay 20% of the Medicare-approved cost of each service.",
      "Part D covers prescription drugs you take at home, plus certain vaccines. It is sold by private insurers approved by Medicare, either as a standalone plan that sits alongside Parts A and B, or built into a Medicare Advantage plan. Plans charge their own monthly premium and cover different lists of drugs. Since 2025 there is a yearly cap on what you pay out of pocket for covered drugs. In 2026 it is $2,100, not counting premiums.",
      "Part C, better known as Medicare Advantage, is not extra coverage on top of A and B. It replaces them. A private insurer approved by Medicare provides your hospital and medical coverage, and most plans also include Part D drug coverage plus extras that Original Medicare does not cover, such as dental, vision and hearing. You still pay your Part B premium, plus whatever the plan charges (some plans charge $0). In return, you usually have to use the plan's network of doctors and hospitals, through an HMO or PPO.",
      "That leaves two paths. Original Medicare (Parts A and B) comes straight from the federal government and lets you see any doctor or hospital in the country that accepts Medicare. But it has no yearly limit on your 20% share, so most people add a standalone Part D plan and a Medigap supplement policy to cover the gaps. Medicare Advantage bundles everything into one private plan with a network and a yearly out-of-pocket maximum, which in 2026 can be no higher than $9,250 for in-network care. You cannot buy Medigap if you are on Medicare Advantage. Neither path is better for everyone; it is a trade between freedom to choose doctors and a predictable, capped cost.",
      "The difference matters well beyond the patient. For a clinic, knowing which path a patient is on decides who gets the bill. A patient on Original Medicare is billed to Medicare itself using their Medicare number. A patient on Medicare Advantage is billed to the private plan, with a different member ID, its own rules and often prior authorisation. Bill the wrong one and the claim is denied, the same kind of mismatch that makes Medicaid managed care so hard to verify.",
      "Timing matters too. Your first chance to sign up is a seven-month window around your 65th birthday: the three months before, the month itself and the three months after. Signing up late for Part B or Part D can mean a penalty added to your premium for as long as you have coverage. After that, the Medicare open enrollment period runs from October 15 to December 7 each year, when you can switch between Original Medicare and Medicare Advantage or change plans. Official details are on medicare.gov and ssa.gov.",
    ],
  },
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
    shareImage: "/og/littles-law-the-one-equation-every-engineer-should-know.png",
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
    shareImage: "/og/azure-policy-and-why-it-matters.png",
    illustrations: [{ id: "azure-policy-effects", after: 2 }],
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
