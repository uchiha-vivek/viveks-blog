import type { IllustrationId } from "@/components/illustrations";

export type LessonSection = {
  id: string;
  title: string;
  paragraphs: string[];
  equations?: string[];
  illustration?: "complex-plane" | "cube-roots";
  sketch?: IllustrationId; // hand-drawn scene from components/illustrations
  example?: { title: string; steps: string[]; equations?: string[] };
  mistake?: string;
  recap: string;
};
export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};
export type Lesson = {
  slug: string;
  title: string;
  subtitle: string;
  readingTime: number;
  intro: string;
  goals: string[];
  sections: LessonSection[];
  questions: QuizQuestion[];
};

export const seriesLessons: Lesson[] = [
  {
    slug: "infinite-series",
    title: "Infinite Series: Adding Without an End",
    subtitle: "From a list of numbers to a sum that can settle at a finite value.",
    readingTime: 14,
    intro: "Imagine walking halfway to a wall, then half the remaining distance, then half again. You keep adding smaller distances. Can infinitely many pieces fit into a finite distance? Infinite series give us a precise way to answer that question. You only need fractions and basic algebra to begin; we will explain limits as we go.",
    goals: ["Read sequence and summation notation.", "Use partial sums to understand convergence.", "Sum a geometric series and choose a basic convergence test."],
    sections: [
      {
        id: "sequence-and-series", title: "1. A sequence lists; a series adds",
        paragraphs: ["A sequence is an ordered list of numbers. We write $a_n$ for the term in position $n$: the subscript labels the position; it is not a power. For example, $a_n=1/2^n$ for $n=1,2,3,\\ldots$ gives $1/2,1/4,1/8,\\ldots$.", "A series adds the terms of a sequence. The capital Greek letter $\\Sigma$ (sigma) means ‘add’. The expression below says: start at $n=1$, substitute each whole-number value of $n$, and keep adding."],
        equations: ["\\sum_{n=1}^{\\infty}a_n=a_1+a_2+a_3+\\cdots", "\\sum_{n=1}^{\\infty}\\frac{1}{2^n}=\\frac12+\\frac14+\\frac18+\\cdots"],
        mistake: "The symbol infinity does not name a final term or an ordinary number you can substitute. It tells us that there is no last term.",
        recap: "A sequence is a list of terms; a series is their sum."
      },
      {
        id: "partial-sums", title: "2. Add finitely many terms first", sketch: "zeno-walk",
        paragraphs: ["We cannot finish infinitely many additions one at a time. Instead, add the first $N$ terms and call the result the partial sum $S_N$. Then ask what happens as $N$ grows.", "A limit is the value these partial sums approach: we can make the distance from that value as small as we want by taking enough terms. If the partial sums approach a finite number $S$, the series converges, and its sum is $S$. Otherwise, it diverges."],
        equations: ["S_N=\\sum_{n=1}^{N}a_n", "\\sum_{n=1}^{\\infty}a_n=S\\quad\\text{means}\\quad\\lim_{N\\to\\infty}S_N=S"],
        example: { title: "Worked example · Halving the distance", steps: ["For the series $1/2+1/4+1/8+\\cdots$, the first four partial sums are $S_1=1/2$, $S_2=3/4$, $S_3=7/8$, and $S_4=15/16$.", "After $N$ terms, $S_N=1-2^{-N}$. The gap to $1$ is $2^{-N}$, which approaches zero. The series therefore converges to $1$.", "After ten terms, the gap is $1/1024$, less than $0.001$. Partial sums can give useful approximations before we take a limit."] },
        mistake: "Terms and partial sums are different: the terms here approach zero, while their sums approach one.",
        recap: "Convergence describes the limit of the partial sums, not just the individual terms."
      },
      {
        id: "geometric-series", title: "3. The geometric series: a reusable pattern",
        paragraphs: ["A geometric series multiplies each term by the same common ratio $r$. If the first term is $a$, its terms are $a, ar, ar^2, \\ldots$. Starting the index at zero makes $ar^0=a$ the first term.", "For $r\\ne1$, multiply a partial sum by $r$ and subtract. All the middle terms cancel, giving the finite-sum formula below. If $|r|<1$, then $r^N$ approaches zero, giving the infinite-sum formula. Here $|r|$ means the distance of $r$ from zero."],
        equations: ["S_N=a+ar+\\cdots+ar^{N-1}=\\frac{a(1-r^N)}{1-r}", "\\sum_{n=0}^{\\infty}ar^n=\\frac{a}{1-r}\\qquad (|r|<1)"],
        example: { title: "Worked example · A shrinking contribution", steps: ["To sum $3+1+1/3+1/9+\\cdots$, identify $a=3$ and $r=1/3$.", "Since $|1/3|<1$, the sum exists. Substitute into the formula: $3/(1-1/3)=9/2=4.5$.", "A negative ratio can also work. For $1-1/2+1/4-\\cdots$, the ratio is $-1/2$, so the sum is $1/(1+1/2)=2/3$. The partial sums alternate around this limit."] },
        mistake: "Always check the ratio before using the infinite-sum formula. For $1+2+4+\\cdots$, substituting $r=2$ into that formula would give a meaningless answer for this divergent series.",
        recap: "For a nonzero first term, a geometric series converges exactly when the common ratio has magnitude less than one."
      },
      {
        id: "divergence", title: "4. Smaller terms are necessary, but not enough",
        paragraphs: ["If a series converges, its terms must approach zero. So if the terms do not approach zero, the series diverges. This is called the term test for divergence.", "The reverse is false. The harmonic series has terms $1/n$ that approach zero, but the sum grows without bound. Grouping its terms explains why: each group below contributes at least $1/2$, and there are infinitely many groups.", "Divergence can also mean oscillation. The partial sums of $1-1+1-1+\\cdots$ alternate between $1$ and $0$, so they have no single limit."],
        equations: ["\\sum_{n=1}^{\\infty}\\frac1n=1+\\frac12+\\underbrace{\\left(\\frac13+\\frac14\\right)}_{\\geq1/2}+\\underbrace{\\left(\\frac15+\\frac16+\\frac17+\\frac18\\right)}_{\\geq1/2}+\\cdots"],
        mistake: "Finding that $a_n\\to0$ does not establish convergence. It only tells you that you need another test.",
        recap: "Terms failing to approach zero prove divergence; terms approaching zero leave the question open."
      },
      {
        id: "tests", title: "5. A small toolkit for deciding convergence",
        paragraphs: ["Start with the term test. Then look for a geometric pattern. If neither settles the question, choose a test suited to the terms.", "For positive-term series, the p-series rule says that $\\sum_{n=1}^{\\infty}1/n^p$ converges when $p>1$ and diverges when $p\\leq1$. Thus $\\sum1/n^2$ converges, while the harmonic series ($p=1$) diverges. This rule decides convergence; it does not automatically give the sum.", "Comparison test: if $0\\leq a_n\\leq b_n$ for all sufficiently large $n$ and $\\sum b_n$ converges, then $\\sum a_n$ converges too. For example, $1/(n^2+1)\\leq1/n^2$, so its series converges.", "Ratio test: compute the limit $L$ below, when it exists and the ratios are defined eventually. If $L<1$, the series converges absolutely (even the sum of the absolute values converges). If $L>1$, including an infinite limit, the series diverges. If $L=1$, the test gives no answer.", "For alternating signs, $\\sum_{n=1}^{\\infty}(-1)^{n-1}b_n$ converges if $b_n>0$, the $b_n$ decrease eventually, and $b_n\\to0$. For example, $1-1/2+1/3-1/4+\\cdots$ converges, although the sum of its absolute values is the divergent harmonic series. This is conditional convergence."],
        equations: ["L=\\lim_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right|"],
        example: { title: "Worked example · When the ratio test cannot decide", steps: ["For $a_n=1/n$, the ratio $a_{n+1}/a_n=n/(n+1)$ tends to $1$. The harmonic series diverges.", "For $a_n=1/n^2$, the ratio is $n^2/(n+1)^2$, which also tends to $1$. This series converges by the p-series rule.", "The same ratio-test result can occur for both outcomes. When $L=1$, switch tests."] },
        recap: "Choose a test from the pattern of the terms. Proving convergence and finding an exact sum are separate tasks."
      }
    ],
    questions: [
      { prompt: "What does $\\sum_{n=1}^{3}n$ equal?", options: ["3", "6", "9", "An infinite sum"], answer: 1, explanation: "The bounds tell us to add only three terms: $1+2+3=6$." },
      { prompt: "If $a_n\\to0$, what can you conclude about $\\sum a_n$?", options: ["It always converges.", "It always diverges.", "More information or another test is needed.", "Its sum is zero."], answer: 2, explanation: "Both $\\sum1/n$ and $\\sum1/n^2$ have terms approaching zero, but only the second converges." },
      { prompt: "What is the sum of $2+1+1/2+1/4+\\cdots$?", options: ["2", "3", "4", "It diverges."], answer: 2, explanation: "This is geometric with $a=2$ and $r=1/2$. Its sum is $2/(1-1/2)=4$." },
      { prompt: "For $\\sum_{n=1}^{\\infty}1/2^n$, which list gives $S_1$, $S_2$, $S_3$, and the infinite sum, in that order?", options: ["$1/2,\\ 1/4,\\ 1/8;\\quad 0$", "$1/2,\\ 3/4,\\ 7/8;\\quad 1$", "$1/2,\\ 3/4,\\ 7/8;\\quad 2$", "$1,\\ 2,\\ 3;\\quad \\text{diverges}$"], answer: 1, explanation: "Adding successive terms gives $S_1=1/2$, $S_2=3/4$, and $S_3=7/8$. The general partial sum is $S_N=1-2^{-N}$, which approaches $1$." }
    ]

  },
  {
    slug: "power-series",
    title: "Power Series: Building Functions from Powers",
    subtitle: "Turn the ideas of infinite series into a way to represent and approximate functions.",
    readingTime: 15,
    intro: "A polynomial such as $1+x+x^2$ is easy to calculate. A power series extends that idea with infinitely many powers. Its value may depend on where you choose $x$: the same expression can converge at one value and diverge at another. Read the Infinite Series lesson first; only the optional Taylor section uses derivatives.",
    goals: ["Identify coefficients, powers, and the centre of a power series.", "Find a radius and interval of convergence, checking endpoints.", "Approximate a function using a few terms and understand the error."],
    sections: [
      {
        id: "power-series-form", title: "1. A polynomial with infinitely many terms",
        paragraphs: ["A power series adds increasing whole-number powers of $(x-c)$. The number $c$ is the centre, and $a_n$ is the coefficient multiplying the $n$th power. The coefficients do not depend on $x$.", "The subscript in $a_n$ labels a coefficient, while the superscript in $(x-c)^n$ is an exponent. The first term is the constant $a_0$. At $x=c$, every positive-power term vanishes, so the series always converges there to $a_0$."],
        equations: ["\\sum_{n=0}^{\\infty}a_n(x-c)^n=a_0+a_1(x-c)+a_2(x-c)^2+\\cdots"],
        example: { title: "Worked example · Read the ingredients", steps: ["In $\\sum_{n=0}^{\\infty}(x-2)^n/3^n$, the centre is $c=2$ and the coefficients are $a_n=1/3^n$.", "The first terms are $1+(x-2)/3+(x-2)^2/9+\\cdots$. At $x=2$, the value is $1$.", "At a different value, such as $x=3$, it becomes the numerical geometric series $1+1/3+1/9+\\cdots$, which sums to $3/2$."] },
        recap: "Fixing a value of $x$ turns a power series into an ordinary numerical series."
      },
      {
        id: "geometric-function", title: "2. One series, different behaviour at different inputs",
        paragraphs: ["The simplest power series is $1+x+x^2+\\cdots$. It is geometric with first term $1$ and ratio $x$. The geometric formula therefore gives a function representation, but only where $|x|<1$.", "At $x=1/2$, its sum is $2$. At $x=1$, it becomes $1+1+1+\\cdots$ and diverges. At $x=-1$, its partial sums oscillate. At $x=2$, the terms grow rather than approach zero."],
        equations: ["\\frac{1}{1-x}=\\sum_{n=0}^{\\infty}x^n\\qquad (|x|<1)"],
        mistake: "A formula for a function may make sense beyond the convergence interval, but the series representation does not. At $x=2$, the function equals $-1$; the series diverges.",
        recap: "Always attach a convergence condition to a power-series representation."
      },
      {
        id: "radius", title: "3. Radius and interval of convergence",
        paragraphs: ["A power series has a radius of convergence $R$. It converges absolutely for $|x-c|<R$ and diverges for $|x-c|>R$. At the boundary $|x-c|=R$, test each endpoint separately.", "Think of $R$ as how far you can move from the centre before reaching a boundary. If $R=0$, only the centre works. If $R=\\infty$, every real value works. We discuss real inputs in this lesson.", "The interval of convergence includes exactly the real values that work. Round brackets exclude an endpoint; square brackets include it. For example, $[-1,1)$ includes $-1$ and excludes $1$."],
        example: { title: "Worked example · A shifted centre", steps: ["For $\\sum_{n=0}^{\\infty}(x-2)^n/3^n$, the geometric ratio is $(x-2)/3$.", "Solve $|(x-2)/3|<1$: this gives $|x-2|<3$, or $-1<x<5$. The radius is $R=3$.", "At $x=-1$, the series is $1-1+1-\\cdots$ and diverges. At $x=5$, it is $1+1+1+\\cdots$ and diverges. The interval is therefore $(-1,5)$."] },
        recap: "The radius gives the distance from the centre; the interval also records which endpoints converge."
      },
      {
        id: "endpoint-example", title: "4. Find a radius, then check both endpoints",
        paragraphs: ["When a power series is not obviously geometric, the ratio test often helps. Treat the whole term, including its power of $x$, as $u_n$. Here is an example where only one endpoint belongs to the interval."],
        equations: ["\\sum_{n=1}^{\\infty}\\frac{x^n}{n}", "\\lim_{n\\to\\infty}\\left|\\frac{u_{n+1}}{u_n}\\right|=\\lim_{n\\to\\infty}|x|\\frac{n}{n+1}=|x|\\qquad(x\\ne0)"],
        example: { title: "Worked example · One endpoint included", steps: ["At $x=0$, every term is zero, so convergence is immediate. For other values, the ratio test gives convergence when $|x|<1$ and divergence when $|x|>1$. Thus $c=0$ and $R=1$.", "At $x=1$, the series becomes $\\sum1/n$, the divergent harmonic series.", "At $x=-1$, the series becomes $\\sum(-1)^n/n$. The magnitudes $1/n$ decrease to zero, so the alternating-series test proves convergence.", "Combine the interior with the endpoint results: the interval of convergence is $[-1,1)$. The ratio test alone could not settle the endpoints."] },
        mistake: "Do not assume the endpoints have the same behaviour, and do not include them just because the radius is known.",
        recap: "Use a three-step routine: find the interior, substitute the left endpoint, then substitute the right endpoint."
      },
      {
        id: "approximation", title: "5. Approximate a function with a short polynomial", sketch: "taylor-fit",
        paragraphs: ["A partial sum of a power series is a polynomial. Truncating means stopping after finitely many terms. This gives an approximation; it is not usually an exact equality.", "For $1/(1-x)$, retaining the terms through $x^N$ leaves the exact remainder shown below. Inside $|x|<1$, this error tends to zero as $N$ increases. Near the boundary, more terms may be needed."],
        equations: ["\\frac{1}{1-x}=\\underbrace{\\sum_{n=0}^{N}x^n}_{\\text{approximation}}+\\underbrace{\\frac{x^{N+1}}{1-x}}_{\\text{remainder}}\\qquad(|x|<1)"],
        example: { title: "Worked example · An approximation with a known error", steps: ["Choose $x=0.1$. The exact function value is $1/0.9=1.111111\\ldots$.", "Keep terms through $x^3$: $1+0.1+0.01+0.001=1.111$.", "The absolute error is $0.1^4/0.9=1/9000\\approx0.0001111$. Using the remainder tells us how accurate the answer is."] },
        recap: "A finite sum becomes useful when you also know how much error remains."
      },
      {
        id: "familiar-expansions", title: "6. Familiar functions as power series",
        paragraphs: ["Many familiar functions have power-series representations. The formulas below are centred at zero and converge for every real $x$. In the sine and cosine formulas, $x$ is measured in radians.", "The factorial $n!$ means $1\\times2\\times\\cdots\\times n$, with $0!=1$. For example, $4!=24$. Factorials in these denominators make the terms shrink rapidly for a fixed $x$."],
        equations: ["e^x=\\sum_{n=0}^{\\infty}\\frac{x^n}{n!}=1+x+\\frac{x^2}{2!}+\\frac{x^3}{3!}+\\cdots", "\\sin x=\\sum_{n=0}^{\\infty}\\frac{(-1)^n x^{2n+1}}{(2n+1)!}=x-\\frac{x^3}{3!}+\\frac{x^5}{5!}-\\cdots", "\\cos x=\\sum_{n=0}^{\\infty}\\frac{(-1)^n x^{2n}}{(2n)!}=1-\\frac{x^2}{2!}+\\frac{x^4}{4!}-\\cdots"],
        example: { title: "Optional bridge · Where Taylor coefficients come from", steps: ["If you know derivatives, a Taylor series at $c$ uses the coefficients $a_n=f^{(n)}(c)/n!$, where $f^{(n)}$ means the $n$th derivative and $f^{(0)}=f$.", "When $c=0$, it is called a Maclaurin series. All derivatives of $e^x$ equal $e^x$, so at zero each derivative is $1$, giving $a_n=1/n!$.", "A function having derivatives of every order does not alone guarantee it equals its Taylor series. The remainder must tend to zero. The three expansions above do satisfy this condition."] },
        mistake: "Convergence of a Taylor series and equality to the original function are distinct claims. A remainder argument connects them.",
        recap: "Power series let us compute complicated functions with polynomial sums; convergence and error determine where the approximation is valid."
      }
    ],
    questions: [
      { prompt: "In $\\sum_{n=0}^{\\infty}2^n(x-3)^n$, what are the centre and coefficients?", options: ["$c=0$, $a_n=3^n$", "$c=3$, $a_n=2^n$", "$c=2$, $a_n=3^n$", "$c=3$, $a_n=n^2$"], answer: 1, explanation: "Compare with $\\sum a_n(x-c)^n$: the shift is $3$ and the multiplying coefficient is $2^n$." },
      { prompt: "What is the interval of convergence of $\\sum_{n=0}^{\\infty}x^n$?", options: ["$[-1,1]$", "$[0,1)$", "$(-1,1)$", "All real numbers"], answer: 2, explanation: "The geometric ratio is $x$, so $|x|<1$. At $x=1$ the sum grows without bound; at $x=-1$ the partial sums oscillate. Both endpoints are excluded." },
      { prompt: "Using $e^x\\approx1+x+x^2/2!$, what is the approximation at $x=0.2$?", options: ["$1.20$", "$1.22$", "$1.24$", "$0.22$"], answer: 1, explanation: "Substitute $x=0.2$: $1+0.2+0.04/2=1.22$. This is a truncated approximation, not an exact value of $e^{0.2}$." },
      { prompt: "What are the centre, radius, and interval of convergence of $\\sum_{n=1}^{\\infty}(x-2)^n/(n\\,3^n)$?", options: ["$c=2$, $R=3$, interval $(-1,5)$", "$c=0$, $R=3$, interval $[-3,3)$", "$c=2$, $R=3$, interval $[-1,5)$", "$c=2$, $R=3$, interval $[-1,5]$"], answer: 2, explanation: "The ratio test gives $|x-2|/3<1$, so $c=2$, $R=3$, and the interior is $(-1,5)$. At $x=-1$, the alternating harmonic series converges. At $x=5$, the harmonic series diverges. Include only the left endpoint: $[-1,5)$." }
    ]

  }
];

export function getSeriesLesson(slug: string) {
  return seriesLessons.find((lesson) => lesson.slug === slug);
}
