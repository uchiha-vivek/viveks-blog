import type { Signal, Topic } from "./site";
import type { IllustrationId } from "@/components/illustrations";
import type { InteractiveId } from "@/components/interactive";
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
  // Interactive pieces from components/interactive, each shown after body[after].
  interactives?: { id: InteractiveId; after: number }[];
  // Render $...$ in paragraphs as math, and "$$ ..." paragraphs as display equations.
  // Off by default so prices like "$185" in other posts stay plain text.
  math?: boolean;
};

// The sketch that fronts a post on the home page.
export function coverOf(post: Post): IllustrationId | undefined {
  return post.cover ?? post.illustrations?.[0]?.id;
}

// Your curated learnings. Add a new object to the top of this array
// and it flows into the paper automatically.
export const posts: Post[] = [
  {
    slug: "derivative-of-sin-x-from-first-principles",
    title: "Derivative of sin x from First Principles: Why It's cos x",
    dek: "Starting from only the definition of a derivative and the sin(a + b) formula, see step by step why the derivative of sin x is cos x, with an interactive graph and a proof of the two key limits.",
    topic: "Mathematics",
    date: "2026-11-01",
    readingTime: 9,
    tags: ["Calculus", "Derivatives", "Trigonometry", "First principles"],
    shareImage: "/og/derivative-of-sin-x-from-first-principles.png",
    math: true,
    illustrations: [
      { id: "sin-slope-cos", after: 1 },
      { id: "sin-squeeze", after: 23 },
    ],
    interactives: [
      { id: "secant-slope", after: 7 },
      { id: "sin-derivation", after: 20 },
    ],
    body: [
      "Every calculus student learns that the derivative of sin x is cos x, and most of us just memorise it. In this post we'll build it ourselves, starting from only the definition of a derivative and one formula from school trigonometry, and see exactly where the cos x comes from. No derivative rules allowed.",
      "Before any algebra, look at the shape. A derivative tells you how steep a curve is at each point. The sine curve climbs most steeply at $x=0$ (slope $1$), is flat at its peak (slope $0$), and falls most steeply at $x=\\pi$ (slope $-1$). Write those slopes down, plot them underneath, and you get another wave that starts at $1$. That wave is $\\cos x$. The rest of this post proves it isn't a coincidence.",
      "## Step 0: what a derivative is",
      "Pick a point $x$ on a curve, and a second point a small step $h$ further along, at $x+h$. The straight line through the two points is called a secant. Its slope is rise over run:",
      "$$ \\text{slope of the secant}=\\frac{f(x+h)-f(x)}{h}",
      "Now make $h$ smaller and smaller. The second point slides towards the first, and the secant turns into the tangent: the line that just touches the curve at $x$. The slope of that tangent is the derivative. The notation $\\lim_{h\\to0}$ means “the value this settles on as $h$ gets closer and closer to $0$”, without $h$ ever being exactly $0$:",
      "$$ f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}",
      "That's what “first principles” means: we use only this definition. Try it below. Press Shrink h and watch the red secant turn into a tangent. The red dot underneath sits at the height of the secant's slope, and as $h$ shrinks it lands on the dashed cos curve. Then press Slide x across to watch the slopes trace out the whole curve.",
      "## Step 1: put sin into the definition",
      "Replace $f$ with $\\sin$:",
      "$$ \\frac{d}{dx}\\sin x=\\lim_{h\\to0}\\frac{\\sin(x+h)-\\sin x}{h}",
      "We can't simply plug in $h=0$. The top becomes $\\sin x-\\sin x=0$, the bottom becomes $0$, and $0/0$ has no value. We have to rewrite the expression until the limit is something we can evaluate. The obstacle is $\\sin(x+h)$: the $x$ and the $h$ are stuck together inside one sine.",
      "## Step 2: break sin(x + h) apart",
      "This is where the angle addition formula comes in. For any two angles $a$ and $b$:",
      "$$ \\sin(a+b)=\\sin a\\cos b+\\cos a\\sin b",
      "With $a=x$ and $b=h$, it pulls the two apart: $\\sin(x+h)=\\sin x\\cos h+\\cos x\\sin h$. Every term is now something that depends only on $x$ times something that depends only on $h$. That separation is the whole trick. Substitute it in:",
      "$$ \\lim_{h\\to0}\\frac{\\sin x\\cos h+\\cos x\\sin h-\\sin x}{h}",
      "## Step 3: regroup",
      "Put the two $\\sin x$ terms next to each other, factor out $\\sin x$, then divide each piece by $h$:",
      "$$ \\lim_{h\\to0}\\left[\\sin x\\cdot\\frac{\\cos h-1}{h}+\\cos x\\cdot\\frac{\\sin h}{h}\\right]",
      "Look at what happened. $\\sin x$ and $\\cos x$ don't change when $h$ changes, so here they are just fixed multipliers. All the $h$ has gathered into two small fractions, $(\\cos h-1)/h$ and $(\\sin h)/h$, with no $x$ in them at all. Once we know what those two fractions approach, we're done. Step through the whole derivation below, one move at a time. Red marks what changed in each step.",
      "## Step 4: why sin h / h goes to 1",
      "Try small values and a pattern shows up: $h=0.5$ gives $0.9589$, $h=0.1$ gives $0.9983$, and $h=0.01$ gives $0.99998$. But a few numbers are not a proof. The proof is a picture on a circle of radius $1$.",
      "Draw an angle $h$ at the centre $O$, measured in radians. It marks a point $P$ on the circle, at height $\\sin h$. Extend the line from $O$ through $P$ until it meets the upright line through $A=(1,0)$. Call that point $T$; its height is $\\tan h$. Now compare three shapes that all have a corner at $O$:",
      "The small triangle $OAP$ has base $1$ and height $\\sin h$, so its area is $\\tfrac12\\sin h$. The slice of the circle between $OA$ and $OP$ has area $\\tfrac12h$. That's what measuring in radians buys you: the whole circle is $2\\pi$ radians and has area $\\pi$, so each radian of slice is worth $\\tfrac12$. The big triangle $OAT$ has base $1$ and height $\\tan h$, so its area is $\\tfrac12\\tan h$. Each shape fits inside the next one, so after doubling:",
      "$$ \\sin h\\le h\\le\\tan h",
      "Divide everything by $\\sin h$ (which is positive for small positive $h$), then flip each fraction over. Flipping reverses the inequalities:",
      "$$ \\cos h\\le\\frac{\\sin h}{h}\\le1",
      "As $h\\to0$, $\\cos h\\to1$. So $(\\sin h)/h$ is trapped between two walls, $\\cos h$ and $1$, that both close in on $1$. It has nowhere else to go. This argument is called the squeeze theorem. Negative $h$ gives the same answer, because $\\sin(-h)/(-h)=(\\sin h)/h$.",
      "This is also why calculus uses radians. In degrees, the slice would have area $(\\pi/360)\\,h$ instead of $\\tfrac12h$, the limit would come out as $\\pi/180\\approx0.01745$ instead of $1$, and the derivative of $\\sin x$ would be $(\\pi/180)\\cos x$. Radians are the unit that makes this constant exactly $1$.",
      "## Step 5: why (cos h − 1) / h goes to 0",
      "This one reuses the limit we just proved. Multiply the top and bottom by $\\cos h+1$, and use $\\cos^2h-1=-\\sin^2h$ (from $\\sin^2h+\\cos^2h=1$):",
      "$$ \\frac{\\cos h-1}{h}=\\frac{\\cos^2h-1}{h\\,(\\cos h+1)}=-\\frac{\\sin h}{h}\\cdot\\frac{\\sin h}{\\cos h+1}",
      "As $h\\to0$, the first fraction goes to $1$ (Step 4), and the second goes to $0/(1+1)=0$. So the whole thing goes to $-1\\cdot0=0$. The numbers agree: $h=0.1$ gives $-0.04996$ and $h=0.01$ gives $-0.0050$. In plain words, near $h=0$ the cosine curve is flat at its peak, so $\\cos h-1$ shrinks much faster than $h$ does.",
      "## Step 6: put it together",
      "$$ \\begin{aligned}\\frac{d}{dx}\\sin x&=\\sin x\\cdot\\underbrace{\\lim_{h\\to0}\\frac{\\cos h-1}{h}}_{0}\\\\&\\quad+\\cos x\\cdot\\underbrace{\\lim_{h\\to0}\\frac{\\sin h}{h}}_{1}\\\\&=\\cos x\\end{aligned}",
      "The $\\sin x$ term is multiplied by zero and disappears. The $\\cos x$ term is multiplied by one and survives. That's where $\\cos x$ comes from: it was sitting in the angle addition formula all along, as the partner of $\\sin h$.",
      "A quick check with a calculator. Take $x=\\pi/3$, where $\\cos x=0.5$. The secant slope $(\\sin(x+h)-\\sin x)/h$ is $0.2674$ for $h=0.5$, $0.4559$ for $h=0.1$, $0.4957$ for $h=0.01$ and $0.4996$ for $h=0.001$. It closes in on $0.5$, as promised.",
      "## Try it yourself: the derivative of cos x",
      "The same method works for cosine. You need $\\cos(a+b)=\\cos a\\cos b-\\sin a\\sin b$. Expand $\\cos(x+h)$, group the $\\cos x$ terms, split the fraction, and use the same two limits:",
      "$$ \\begin{aligned}\\frac{d}{dx}\\cos x&=\\lim_{h\\to0}\\Big[\\cos x\\cdot\\frac{\\cos h-1}{h}\\\\&\\qquad-\\sin x\\cdot\\frac{\\sin h}{h}\\Big]\\\\&=\\cos x\\cdot0-\\sin x\\cdot1=-\\sin x\\end{aligned}",
      "The minus sign comes straight from the minus in the cosine formula. Work through it on paper once and it will stick.",
      "## The method in three moves",
      "Write the definition. Use an identity to separate $x$ from $h$. Reduce what's left to limits that don't depend on $x$. That's first principles, and every derivative rule you have memorised was proved this way at some point.",
    ],
  },
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
    slug: "backend-design-patterns-explained",
    title: "10 Backend Design Patterns Explained Through One Payment System",
    dek: "Repository, factory, singleton, strategy, observer, builder, adapter, decorator, CQRS and circuit breaker, each shown in the checkout of one online store: the problem it solves, how it works, and when to skip it.",
    topic: "Tech",
    date: "2026-10-29",
    readingTime: 11,
    tags: ["Design patterns", "Backend", "System design", "Payments"],
    shareImage: "/og/backend-design-patterns-explained.png",
    illustrations: [
      { id: "checkout-patterns-map", after: 1 },
      { id: "repository-pattern", after: 4 },
      { id: "factory-pattern", after: 8 },
      { id: "singleton-pattern", after: 12 },
      { id: "strategy-pattern", after: 16 },
      { id: "observer-pattern", after: 20 },
      { id: "builder-pattern", after: 24 },
      { id: "adapter-pattern", after: 28 },
      { id: "decorator-pattern", after: 32 },
      { id: "cqrs-pattern", after: 36 },
      { id: "circuit-breaker-pattern", after: 40 },
    ],
    body: [
      "Most backend code starts simple: a route, a query, a response. The trouble comes later, when ten people edit the same files, a second payment provider shows up, and a partner's API goes down on a Friday night. Design patterns are named, well-tested answers to problems like these. They are not rules to memorise. Each one exists because a particular kind of code kept hurting people, so the useful way to learn them is problem first: what goes wrong without the pattern, what the pattern changes, and when it is not worth the extra code.",
      "To keep things concrete, this post follows one system all the way through: the checkout of an online store. A customer presses Pay on a ₹499 order. Behind that one click, the backend checks who they are, works out the price, picks a payment provider, talks to that provider's API, saves the order, tells other parts of the business about it, and later shows it in the customer's order history. Each of the ten patterns below handles one piece of that journey. The map shows where each one sits.",
      "## 1. Repository: keep the database behind one door",
      "The quickest way to load an order is to write the SQL right inside the payment service. That works until the same class also validates input, applies refund rules and formats API responses. Now one file knows about table names and business rules at the same time. You cannot test a refund rule without a real database, and renaming a column means hunting through every class that ever touched the orders table.",
      "The repository pattern puts all data access behind one object with plain methods such as find(orderId) and save(payment). The payment service asks for an order by what it means and never sees SQL. The repository is the only place that knows whether orders live in PostgreSQL, MySQL or MongoDB. In tests you hand the service a fake repository that keeps orders in memory, so refund rules can be checked in milliseconds with no database running.",
      "Use it when business logic and storage code are starting to mix, or when you want to unit test rules without a database. Spring Data in Spring Boot, Entity Framework in ASP.NET Core and TypeORM in NestJS are all built around this idea. Skip the extra layer for a small script, or for a service that is little more than a thin wrapper over one table.",
      "## 2. Factory: one place decides which object to create",
      "The store starts with Stripe, so the checkout code says new StripePayment() wherever it needs to charge someone. Then the business adds Razorpay for India and PayPal for everyone else. Now every place that created a Stripe object needs an if statement, and the next provider means editing all of those places again, with a good chance of missing one.",
      "A factory is the single place that knows how to create the right payment provider. Checkout says 'give me a provider for this order' and gets back an object with a charge() method. The factory reads the order's country, or a config setting, and decides: Stripe for the US, Razorpay for India, PayPal otherwise. The value is not the factory class itself. It is that creating objects now happens in one spot, so adding a provider means one new class and one new line in the factory.",
      "Use it when there are several implementations of the same job and the right one depends on configuration, region or input. Skip it while there is only one implementation and no sign of a second; a factory that always returns the same thing is just one more file to read.",
      "## 3. Singleton: exactly one shared instance",
      "Some things should exist only once in a running application: the payment configuration with its API keys and timeouts, a database connection pool, a logger. If every request built its own connection pool, the database would run out of connections within minutes. If two parts of the app each loaded their own copy of the config, they could quietly disagree about which API key or timeout to use.",
      "A singleton guarantees one instance for the life of the application, and everyone who asks for it gets that same instance. Checkout, refunds and the webhook handler all read the one PaymentConfig and share the one connection pool. Today you rarely write the classic getInstance() method yourself. Dependency injection in Spring, ASP.NET Core and NestJS gives a class a singleton lifetime with one line of setup, and still lets tests swap in a different instance.",
      "Use it for shared, expensive resources, and be careful with it everywhere else. A singleton that holds changing state is a global variable with a nicer name: any code can change it, bugs show up far from their cause, and tests start depending on each other. Share an instance because the resource needs sharing, not because it is convenient to reach from anywhere.",
      "## 4. Strategy: swap the rule, keep the code that uses it",
      "Pricing at checkout starts with one rule. Then premium members get 10% off, students get 15% off, and the festival sale takes ₹200 off. The tempting fix is one calculateTotal() method with a growing chain of if and else if branches. A year later it holds every promotion the company ever ran, nobody wants to touch it, and a change to the student discount can break the festival sale.",
      "The strategy pattern moves each rule into its own small class, and every one of them follows the same interface: say, a DiscountStrategy with an apply(cart) method. Checkout picks the right strategy for this customer and calls apply(). It does not care how the discount is worked out. When marketing invents a Black Friday deal, you add one new strategy and leave the existing ones alone.",
      "Use it whenever the same job can be done in several interchangeable ways: discounts, tax rules, shipping costs, login methods, retry policies. It is easy to confuse with the factory, and the two often work together: the factory decides which object to create, and the strategy is the object that does the varying work. Skip it for two simple branches that never change, where a plain if statement is easier to read.",
      "## 5. Observer: announce what happened, let others react",
      "When an order is paid, a lot has to happen next: reserve stock, send a confirmation email, add loyalty points, record the sale in analytics, tell the warehouse to pack it. If the order service calls each of these directly, it ends up depending on five other teams' code. A slow email server now slows down checkout, and every new follow-up step means editing the order service again.",
      "With the observer pattern, the order service only announces an event, OrderPlaced, along with the order details. Anything that cares subscribes to that event and reacts on its own: inventory reserves stock, the email service sends the receipt, loyalty adds points. The order service does not know who is listening. When the business wants a thank-you coupon after every purchase, a new listener subscribes and the order service does not change at all.",
      "Inside one application this can be a simple in-memory event emitter. Across services it becomes event-driven architecture, with a message broker such as Kafka, RabbitMQ or Azure Service Bus carrying the events. Use it when one action triggers many independent follow-ups. The cost is that the flow is harder to trace, because no single function shows everything that happens after a payment, so clear event names and good logging matter.",
      "## 6. Builder: assemble a complex object step by step",
      "A request to the payment provider has a few required fields and many optional ones: amount, currency, customer, billing address, saved card, number of retries, description, return URL. Passed through a constructor, it looks like new PaymentRequest(499, \"INR\", null, null, true, 3, null, false). Nobody can tell what each true or null means, and swapping two arguments of the same type compiles fine and sends the wrong request.",
      "A builder lets you set each field by name, one step at a time, and then call build(). The code reads like a sentence: amount 499, currency INR, customer c_17, retries 3, build. Fields you do not need are simply left out. And build() is a natural place to check the whole object once, for example refusing a request with no amount, before anything reaches the provider.",
      "Use it for objects with many optional fields or fiddly setup: API requests, HTTP clients, configuration. Lombok's @Builder in Java and the request builders in the AWS SDK follow this shape, and in TypeScript an options object with named fields solves much of the same problem. For an object with two or three required fields, a normal constructor is clearer.",
      "## 7. Adapter: translate between your code and someone else's",
      "Every outside system speaks its own dialect. Stripe wants the amount in the smallest currency unit, 49,900 paise for ₹499, sent as JSON. An older bank gateway wants XML with an AMT field in rupees. One API calls the customer customer_id, another calls it id. If these details leak into checkout, every part of the code has to know every provider's quirks, and when a provider changes its API you are fixing code all over the place.",
      "An adapter sits between your app and the outside system and translates in both directions. Your code makes one call in your own terms, charge(499, \"INR\"). The StripeAdapter turns that into Stripe's request; the BankAdapter turns it into the bank's XML. Their responses come back translated into your own Payment result. It works like a travel plug adapter: your charger and the hotel's wall socket never change, and the small piece in between makes them fit.",
      "Use it for every third-party API, legacy system or library whose interface you do not control. It pairs naturally with the factory: the factory picks which adapter to use, and each adapter hides one provider's details. When a provider changes its API, ideally only its adapter changes.",
      "## 8. Decorator: add behaviour by wrapping, not editing",
      "The charge() method starts small. Then the team needs a log line for every charge, then timing metrics, then a permission check. If each of these goes inside charge(), the code that moves money is soon buried under code that has nothing to do with moving money, and every change to logging risks breaking payments.",
      "A decorator wraps an object, offers exactly the same methods, and adds one behaviour before or after passing the call inward. An AuthCheck wrapper checks permission, then calls the next layer. A Logging wrapper writes a log line and calls the next one. A Metrics wrapper times the call. Because each wrapper looks just like the thing it wraps, you can stack them in any combination, and the core charge() stays small and focused.",
      "You already use this idea if you have written middleware in Express, NestJS or ASP.NET Core: each piece wraps the next handler to add authentication, logging or caching. Use it for concerns that cut across many classes. Keep the stack short and its order deliberate, because with too many layers, finding where a request was changed becomes a puzzle of its own.",
      "## 9. CQRS: separate the path that writes from the path that reads",
      "Writes and reads in a store look nothing alike. Paying for an order is rare and strict: check stock, validate the payment, update several tables in one transaction. Viewing order history is frequent and simple, but it wants data joined across orders, payments and shipments, and it has to be fast. One model and one database tuned for both ends up mediocre at each: heavy joins slow the reads, and indexes added for the reads slow the writes.",
      "CQRS stands for Command Query Responsibility Segregation. Commands change data (PlaceOrder, RefundPayment) and go through a write model that holds all the business rules. Queries only read data (GetOrderHistory) and go through a separate read model shaped for the screen that shows it. In a large system the two sides can use different databases: the write side keeps normalised tables, and events keep a ready-made read view up to date for fast lookups.",
      "Use it when reads and writes have very different loads or shapes, such as a feed read millions of times a day and written thousands. Know the cost: the read side usually trails the write side by a moment (eventual consistency), so a customer may refresh and not yet see the order they just placed. For an ordinary create-read-update-delete app that cost buys nothing, so leave CQRS out.",
      "## 10. Circuit breaker: stop calling a service that is down",
      "Suppose the payment gateway goes down. Without protection, every checkout still calls it and waits for a timeout, say 30 seconds. Each waiting request holds a thread and a connection. This is Little's Law at work: at 50 checkouts a second, 30-second waits mean 1,500 requests stuck in flight. Soon your own service runs out of threads and stops serving pages that have nothing to do with payments. A failure outside your system has become an outage inside it.",
      "A circuit breaker sits in front of the call and counts failures. While things are healthy it is closed, and calls flow normally. After, say, five failures in a row it opens: for the next 30 seconds every call fails immediately with a fallback, such as 'payments are busy, please try again in a minute', instead of waiting on a dead service. When the time is up it goes half-open and lets one test call through. If that call works, the breaker closes again; if it fails, the breaker opens for another round.",
      "Use it on calls to any dependency that can fail over the network, which is all of them. Resilience4j for Java and Polly for .NET provide it as a library, and service meshes such as Istio can apply it without touching your code. Pair it with timeouts and a small number of retries, and decide up front what the customer should see while the circuit is open.",
      "## How the ten work together",
      "Back to the ₹499 order. The request passes through middleware that wraps the handler with auth and logging (decorator). Checkout asks a strategy for the discounted price and assembles a PaymentRequest with a builder. The factory picks Razorpay because the customer is in India, and the Razorpay adapter translates the request into Razorpay's format, behind a circuit breaker in case the gateway is struggling. Every step reads the same configuration (singleton). The paid order is saved through a repository, an OrderPlaced event wakes up stock, email and loyalty (observer), and the order history page reads from its own fast view (CQRS).",
      "None of these patterns is a goal on its own. Each adds a little indirection, and that cost is worth paying only when you can name the problem it solves: database code mixed into business rules, a pile of if statements that keeps growing, an outside API you cannot control, a dependency that keeps falling over. Learn the problem first and the pattern second. Then, when a codebase starts to hurt in one of these ways, you will recognise the shape and know the fix.",
    ],
  },
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
    dek: "A result from queueing theory that links load, latency and concurrency, and quietly explains most capacity problems.",
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
    dek: "Guardrails that keep a cloud estate compliant by default, instead of hoping every engineer remembers the rules.",
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
