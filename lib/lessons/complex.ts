import type { Lesson } from "./series";

export const complexLessons: Lesson[] = [
  {
    slug: "complex-numbers-basics",
    title: "Complex Numbers: Start with the Basics",
    subtitle: "Understand i, calculate with a + bi, and see numbers as points on a plane.",
    readingTime: 20,
    intro: "You can begin with ordinary algebra, fractions, and Pythagoras’ theorem. We will build the new ideas one at a time. Complex numbers extend the real numbers so that equations such as x² + 1 = 0 have solutions. They also give engineers a convenient language for rotations, waves, and alternating current.",
    goals: ["Identify real and imaginary parts and simplify powers of i.", "Add, subtract, multiply, and divide complex numbers.", "Use conjugates, the complex plane, modulus, and argument."],
    sections: [
      {
        id: "why-i", title: "1. Why introduce a new number?",
        paragraphs: ["The square of any real number is nonnegative, so no real number can satisfy $x^2=-1$. We introduce the imaginary unit $i$, defined by $i^2=-1$. The equation now has two solutions: $i$ and $-i$.", "A complex number has the form $z=a+bi$, where $a$ and $b$ are real numbers. The real part is $a$ and the imaginary part is $b$. Despite its name, ‘imaginary’ is simply a mathematical label; these numbers are useful in real physical models.", "Every real number is also complex: $5=5+0i$. A purely imaginary number has zero real part, such as $-3i=0-3i$. Two complex numbers are equal exactly when their real parts match and their imaginary parts match."],
        equations: ["z=a+bi,\\qquad \\operatorname{Re}(z)=a,\\qquad \\operatorname{Im}(z)=b", "a+bi=c+di\\quad\\Longleftrightarrow\\quad a=c\\text{ and }b=d"],
        example: { title: "Worked example · Read the parts", steps: ["For $z=4-7i$, the real part is $4$ and the imaginary part is $-7$.", "If $x+2+(y-1)i=5+3i$ with real $x,y$, compare parts: $x+2=5$ and $y-1=3$.", "Solve the ordinary equations: $x=3$ and $y=4$."] },
        mistake: "The imaginary part of $4-7i$ is $-7$, not $-7i$. The coefficient is the imaginary part.",
        recap: "A complex number has two real components, linked by the rule $i^2=-1$."
      },
      {
        id: "powers-of-i", title: "2. Powers of i repeat in a cycle",
        paragraphs: ["Multiply by $i$ repeatedly. After four multiplications we return to $1$, so the pattern repeats every four powers. Also $i^0=1$.", "For a nonnegative integer exponent, divide it by $4$ and use the remainder: $0$ gives $1$, $1$ gives $i$, $2$ gives $-1$, and $3$ gives $-i$."],
        equations: ["i^1=i,\\qquad i^2=-1,\\qquad i^3=-i,\\qquad i^4=1"],
        example: { title: "Worked example · A large exponent", steps: ["To find $i^{27}$, write $27=4\\times6+3$.", "Then $i^{27}=(i^4)^6i^3=1^6(-i)=-i$.", "For a negative real number, the principal square root is $\\sqrt{-9}=3i$. Solving $x^2=-9$ gives both $x=3i$ and $x=-3i$."] },
        mistake: "The rule $\\sqrt{u}\\sqrt{v}=\\sqrt{uv}$ cannot be used freely for negative or complex inputs. For example, $\\sqrt{-1}\\sqrt{-1}=i^2=-1$, whereas $\\sqrt{1}=1$.",
        recap: "Reduce powers of $i$ using the four-step cycle. Distinguish a principal square root from both solutions of an equation."
      },
      {
        id: "arithmetic", title: "3. Add, subtract, and multiply",
        paragraphs: ["For addition and subtraction, collect real parts together and imaginary parts together. When subtracting a bracket, change the sign of every term inside it.", "For multiplication, expand the brackets just as in algebra, then replace $i^2$ by $-1$ and collect terms."],
        equations: ["(a+bi)+(c+di)=(a+c)+(b+d)i", "(a+bi)(c+di)=(ac-bd)+(ad+bc)i"],
        example: { title: "Worked example · Three operations", steps: ["Add: $(3+2i)+(1-4i)=4-2i$.", "Subtract: $(3+2i)-(1-4i)=3+2i-1+4i=2+6i$.", "Multiply: $(3+2i)(1-4i)=3-12i+2i-8i^2=11-10i$."] },
        mistake: "The product of the imaginary terms contributes to the real part because $i^2=-1$.",
        recap: "Use ordinary algebra and finish by replacing every $i^2$ with $-1$."
      },
      {
        id: "conjugate-division", title: "4. Conjugates make division manageable",
        paragraphs: ["The conjugate of $z=a+bi$ is $\\overline z=a-bi$. It changes the sign of the imaginary part. Multiplying a number by its conjugate gives the real number $a^2+b^2$ because the imaginary terms cancel.", "To divide by a nonzero complex number, multiply the numerator and denominator by the denominator’s conjugate. This is multiplication by $1$, so it keeps the value unchanged."],
        equations: ["z\\overline z=(a+bi)(a-bi)=a^2+b^2", "\\frac{a+bi}{c+di}=\\frac{(ac+bd)+(bc-ad)i}{c^2+d^2}\\qquad(c+di\\ne0)"],
        example: { title: "Worked example · Divide step by step", steps: ["For $(3+2i)/(1-i)$, the denominator’s conjugate is $1+i$.", "Multiply top and bottom: $(3+2i)(1+i)/[(1-i)(1+i)]$.", "The numerator is $3+5i+2i^2=1+5i$. The denominator is $1-i^2=2$.", "The answer in standard form is $1/2+(5/2)i$. As a check, multiplying this answer by $1-i$ returns $3+2i$."] },
        recap: "Conjugation turns a nonzero complex denominator into a positive real denominator."
      },
      {
        id: "complex-plane", title: "5. Draw a complex number",
        illustration: "complex-plane",
        paragraphs: ["The complex plane, also called the Argand plane, has a horizontal real axis and a vertical imaginary axis. Plot $a+bi$ at the point $(a,b)$. For $3+4i$, move three units right and four units up.", "The modulus $|z|$ is the distance from the origin. Pythagoras’ theorem gives $|a+bi|=\\sqrt{a^2+b^2}$. The distance between two complex numbers $z_1$ and $z_2$ is $|z_1-z_2|$.", "Conjugation reflects a point across the real axis: $3+4i$ and $3-4i$ have the same modulus. Adding complex numbers adds their horizontal and vertical components, just like adding displacement vectors."],
        equations: ["|a+bi|=\\sqrt{a^2+b^2},\\qquad z\\overline z=|z|^2", "\\frac1z=\\frac{\\overline z}{|z|^2}\\qquad(z\\ne0)"],
        example: { title: "Worked example · Distance and a locus", steps: ["For $z=3+4i$, the modulus is $\\sqrt{9+16}=5$.", "The distance between $3+4i$ and $1+i$ is $|(3+4i)-(1+i)|=|2+3i|=\\sqrt{13}$.", "A locus is a set of points satisfying a condition. The equation $|z-(1+i)|=2$ describes a circle with centre $(1,1)$ and radius $2$."] },
        recap: "Modulus measures distance; the complex plane makes the algebra visible."
      },
      {
        id: "argument-polar", title: "6. Describe a point by length and angle",
        paragraphs: ["For $z\\ne0$, an argument $\\theta$ is the angle from the positive real axis to the line from the origin to $z$, measured anticlockwise. We use radians: $\\pi$ radians equals $180^\\circ$, so one full turn is $2\\pi$.", "If $r=|z|$, right-triangle trigonometry gives $a=r\\cos\\theta$ and $b=r\\sin\\theta$. This is the polar form. Angles differing by a whole turn describe the same point.", "We choose the principal argument $\\operatorname{Arg}(z)$ in $(-\\pi,\\pi]$. All arguments are $\\operatorname{Arg}(z)+2k\\pi$, where $k$ is any integer. Zero has modulus zero but no defined argument.", "To find the angle, first locate the quadrant using the signs of $a$ and $b$. The ratio $b/a$ alone cannot distinguish opposite quadrants. On a calculator or in code, atan2(b,a) accounts for the quadrant; use radian mode."],
        equations: ["z=r(\\cos\\theta+i\\sin\\theta),\\qquad r=\\sqrt{a^2+b^2}", "\\tan\\theta=\\frac ba\\qquad(a\\ne0)"],
        example: { title: "Worked example · Get the quadrant right", steps: ["For $z=-1+i$, the modulus is $\\sqrt2$. The point is in quadrant II.", "The reference angle is $\\pi/4$, so the principal argument is $3\\pi/4$, not $-\\pi/4$.", "Thus $-1+i=\\sqrt2[\\cos(3\\pi/4)+i\\sin(3\\pi/4)]$. For $z=-2i$, the principal argument is $-\\pi/2$."] },
        mistake: "The argument is an angle, while the modulus is a distance. Never assign an argument to zero.",
        recap: "Rectangular form gives horizontal and vertical components; polar form gives length and direction."
      },
      {
        id: "quadratic-equations", title: "7. Solve an equation with complex roots",
        paragraphs: ["The quadratic formula still works when its discriminant is negative. For real coefficients, nonreal roots occur as conjugate pairs. You can check a proposed root by substitution."],
        equations: ["Ax^2+Bx+C=0\\quad\\Longrightarrow\\quad x=\\frac{-B\\pm\\sqrt{B^2-4AC}}{2A}\\qquad(A\\ne0)"],
        example: { title: "Worked example · Solve x² − 4x + 13 = 0", steps: ["Here $A=1$, $B=-4$, and $C=13$. The discriminant is $16-52=-36$.", "Use $\\sqrt{-36}=6i$: $x=(4\\pm6i)/2=2\\pm3i$.", "Check $x=2+3i$: $(2+3i)^2-4(2+3i)+13=(-5+12i)-(8+12i)+13=0$. The other root is its conjugate $2-3i$."] },
        recap: "A negative discriminant gives two nonreal conjugate roots when the coefficients are real."
      },
      {
        id: "basics-summary", title: "8. Your quick revision sheet",
        paragraphs: ["Start in rectangular form for addition and subtraction. Use a conjugate for division. Draw the point before finding its angle. In the next lessons, polar form will make multiplication, powers, roots, and oscillations much easier."],
        equations: ["i^2=-1,\\quad\\overline{a+bi}=a-bi,\\quad|a+bi|=\\sqrt{a^2+b^2}", "z=r(\\cos\\theta+i\\sin\\theta),\\quad a=r\\cos\\theta,\\quad b=r\\sin\\theta"],
        recap: "Try the objective questions without looking back, then read the explanation for each answer."
      }
    ],
    questions: [
      { prompt: "What is the imaginary part of $6-5i$?", options: ["$6$", "$-5$", "$-5i$", "$5$"], answer: 1, explanation: "In $a+bi$, the imaginary part is the real coefficient $b=-5$." },
      { prompt: "What is $i^{34}$?", options: ["$1$", "$i$", "$-1$", "$-i$"], answer: 2, explanation: "$34=4\\times8+2$, so $i^{34}=i^2=-1$." },
      { prompt: "Find $(2+3i)-(4-i)$.", options: ["$-2+2i$", "$6+2i$", "$-2+4i$", "$6+4i$"], answer: 2, explanation: "Distribute the minus sign: $2+3i-4+i=-2+4i$." },
      { prompt: "What is $(1+i)^2$?", options: ["$2$", "$2i$", "$1+2i$", "$0$"], answer: 1, explanation: "$1+2i+i^2=1+2i-1=2i$." },
      { prompt: "Simplify $(1+i)/(1-i)$.", options: ["$1$", "$-1$", "$-i$", "$i$"], answer: 3, explanation: "Multiply by $(1+i)/(1+i)$. The result is $(1+i)^2/2=2i/2=i$." },
      { prompt: "For $z=-3+4i$, which pair gives its conjugate and modulus?", options: ["$-3-4i$ and $5$", "$3-4i$ and $5$", "$-3-4i$ and $25$", "$3+4i$ and $7$"], answer: 0, explanation: "Change only the sign of the imaginary part; the modulus is $\\sqrt{9+16}=5$." },
      { prompt: "Using $(-\\pi,\\pi]$, what is the principal argument of $-1-i$?", options: ["$\\pi/4$", "$-\\pi/4$", "$3\\pi/4$", "$-3\\pi/4$"], answer: 3, explanation: "The point is in quadrant III. The angle $5\\pi/4$ describes it, but subtracting $2\\pi$ gives the principal value $-3\\pi/4$." },
      { prompt: "Which statement about $z=0$ is correct?", options: ["Its modulus and argument are both zero.", "Its modulus is zero and its argument is undefined.", "Its modulus is one.", "It is not a complex number."], answer: 1, explanation: "Zero is $0+0i$ and has distance zero from the origin. There is no direction from the origin to itself, so its argument is undefined." },
      { prompt: "What are the roots of $x^2+4=0$?", options: ["$2,-2$", "$4i,-4i$", "$2i,-2i$", "$i,-i$"], answer: 2, explanation: "$x^2=-4$, so $x=\\pm2i$. Both square to $-4$." },
      { prompt: "What does $|z-(2-i)|=3$ represent?", options: ["A circle centred at $(2,-1)$ with radius $3$", "A circle centred at $(-2,1)$ with radius $3$", "A line through $(2,-1)$", "A circle of radius $9$"], answer: 0, explanation: "$|z-z_0|$ is the distance from $z$ to $z_0$. Here the fixed point is $2-i$, and the fixed distance is $3$." }
    ]
  },
  {
    slug: "complex-series-and-trigonometry",
    title: "Complex Series and Trigonometric Functions",
    subtitle: "Extend convergence, power series, sine, and cosine to complex inputs, one step at a time.",
    readingTime: 18,
    intro: "You now know how to calculate with complex numbers. The next question is what happens when we add infinitely many of them or put a complex number into a familiar function. This lesson uses partial sums and power series from Chapter 1. We will review the essential definitions before extending them.",
    goals: ["Decide convergence using real and imaginary parts or absolute values.", "Use complex geometric series and understand a disc of convergence.", "Define the exponential, sine, and cosine by power series and evaluate imaginary inputs."],
    sections: [
      {
        id: "complex-convergence", title: "1. What does convergence mean in the plane?",
        paragraphs: ["A sequence $z_n$ converges to $L$ when the distance $|z_n-L|$ approaches zero. The points must settle towards a single point in the complex plane. This happens exactly when the real parts approach the real part of $L$ and the imaginary parts approach its imaginary part.", "For a complex series, first form the partial sum $S_N=z_1+z_2+\\cdots+z_N$. The series converges if $S_N$ approaches a finite complex number. Equivalently, both component series must converge."],
        equations: ["\\sum_{n=1}^{\\infty}(a_n+ib_n)=\\sum_{n=1}^{\\infty}a_n+i\\sum_{n=1}^{\\infty}b_n\\quad\\text{if both sums converge}"],
        example: { title: "Worked example · Separate the components", steps: ["Consider $\\sum_{n=1}^{\\infty}(1+i)/2^n$.", "Its real part is $\\sum_{n=1}^{\\infty}1/2^n=1$. Its imaginary coefficient has the same sum.", "Both converge, so the complex sum is $1+i$."] },
        mistake: "Complex numbers do not have a usual less-than order compatible with real-number arithmetic. Use their moduli to compare sizes.",
        recap: "A complex sum converges when both of its real component sums converge."
      },
      {
        id: "absolute-convergence", title: "2. Absolute convergence gives a useful test",
        paragraphs: ["A series is absolutely convergent if the real, nonnegative series $\\sum|z_n|$ converges. Absolute convergence guarantees convergence of the complex series. It is a sufficient condition, not a necessary one.", "The term test still applies: if $z_n$ does not approach zero, the series diverges. Terms approaching zero do not guarantee convergence; the harmonic series remains a counterexample.", "The ratio test uses the limit $L$ below when it exists and the ratios are eventually defined. If $L<1$, the series converges absolutely. If $L>1$ (including an infinite limit), it diverges. If $L=1$, use another test."],
        equations: ["L=\\lim_{n\\to\\infty}\\left|\\frac{z_{n+1}}{z_n}\\right|"],
        example: { title: "Worked example · Magnitudes remove rotating signs", steps: ["For $\\sum_{n=1}^{\\infty}i^n/n^2$, each $|i^n|=1$, so the absolute-value series is $\\sum1/n^2$.", "That real p-series converges because $p=2>1$. Therefore the complex series converges absolutely.", "We have proved convergence without finding the exact sum. These are different tasks."] },
        recap: "Taking moduli often turns a complex convergence problem into a familiar real one."
      },
      {
        id: "complex-geometric", title: "3. A geometric ratio can be complex",
        paragraphs: ["A geometric series has first term $A$ and common ratio $q$, which may now be complex. The finite-sum derivation uses only algebra, so it still works. When $|q|<1$, the modulus of $q^N$ tends to zero, giving the infinite sum.", "For a nonzero first term, the series diverges when $|q|\\geq1$: its terms do not approach zero. If $A=0$, every term is zero."],
        equations: ["\\sum_{n=0}^{N-1}Aq^n=\\frac{A(1-q^N)}{1-q}\\quad(q\\ne1)", "\\sum_{n=0}^{\\infty}Aq^n=\\frac{A}{1-q}\\quad(|q|<1)"],
        example: { title: "Worked example · Sum 1 + i/2 + (i/2)² + ⋯", steps: ["Here $A=1$, $q=i/2$, and $|q|=1/2<1$.", "The sum is $1/(1-i/2)$. Multiply numerator and denominator by $1+i/2$.", "This gives $(1+i/2)/(1+1/4)=4/5+(2/5)i$." ] },
        mistake: "For $1+i+i^2+i^3+\\cdots$, the ratio has modulus one. Its partial sums cycle, so the infinite-sum formula does not apply.",
        recap: "Check the modulus of the ratio before summing a complex geometric series."
      },
      {
        id: "complex-power-series", title: "4. An interval becomes a disc",
        paragraphs: ["A complex power series has the form $\\sum a_n(z-c)^n$, where the coefficients and centre may be complex. It converges absolutely inside a radius $R$ about $c$ and diverges outside. Boundary points must be checked separately.", "For real inputs, $|x-c|<R$ describes an interval. In the complex plane, $|z-c|<R$ describes the inside of a circle, called an open disc. A power series always converges at its centre. A radius can also be zero or infinite."],
        equations: ["\\sum_{n=0}^{\\infty}\\frac{(z-1)^n}{2^n}=\\frac{1}{1-(z-1)/2}\\qquad(|z-1|<2)"],
        example: { title: "Worked example · Check a complex input", steps: ["The centre of this series is $1$ and its radius is $2$, since its ratio is $(z-1)/2$.", "At $z=1+i$, $|z-1|=|i|=1<2$, so it converges. The sum is $1/(1-i/2)=4/5+(2/5)i$.", "On the boundary $|z-1|=2$, the ratio has modulus one. In this particular geometric example, every boundary point diverges because the terms have modulus one. Other power series can have different boundary behaviour."] },
        recap: "The same radius idea works in two dimensions: replace an interval by a disc."
      },
      {
        id: "exponential-series", title: "5. Define the complex exponential by a series",
        paragraphs: ["For a complex input $z$, define $e^z$ by the same power series used for real inputs. Here $n!$ means the factorial: $n!=1\\times2\\times\\cdots\\times n$, with $0!=1$.", "For fixed $z\\ne0$, the ratio of successive term magnitudes is $|z|/(n+1)$, which tends to zero. At $z=0$, the series equals $1$. Thus the exponential series converges absolutely for every complex $z$.", "A finite truncation is an approximation, not an exact equality. The usual exponential law $e^{u+v}=e^u e^v$ remains valid for complex numbers; it can be derived by multiplying the absolutely convergent series and collecting equal powers."],
        equations: ["e^z=\\sum_{n=0}^{\\infty}\\frac{z^n}{n!}=1+z+\\frac{z^2}{2!}+\\frac{z^3}{3!}+\\cdots"],
        example: { title: "Worked example · Approximate e^(0.1i)", steps: ["Keep terms through $z^3$ with $z=0.1i$.", "Since $(0.1i)^2=-0.01$ and $(0.1i)^3=-0.001i$, the approximation is $1+0.1i-0.01/2-0.001i/6$.", "So $e^{0.1i}\\approx0.995+0.0998333i$. The omitted tail has modulus at most $e^{|z|}|z|^4/4!<0.00000461$ here. This bound follows by bounding the magnitudes of the remaining exponential-series terms."] },
        recap: "The exponential series works for every complex input, and a short polynomial can approximate it."
      },
      {
        id: "sine-cosine-series", title: "6. Sine and cosine also accept complex inputs",
        paragraphs: ["Define complex sine and cosine by the power series below. Both converge absolutely for every complex $z$, using the ratio test on successive nonzero series terms. For real inputs, these agree with the familiar trigonometric functions, with angles measured in radians.", "To evaluate an imaginary input, substitute it into the series and simplify powers of $i$. The alternating signs can disappear. For example, $(iy)^{2n}=(-1)^n y^{2n}$ for real $y$."],
        equations: ["\\cos z=\\sum_{n=0}^{\\infty}\\frac{(-1)^n z^{2n}}{(2n)!}=1-\\frac{z^2}{2!}+\\frac{z^4}{4!}-\\cdots", "\\sin z=\\sum_{n=0}^{\\infty}\\frac{(-1)^n z^{2n+1}}{(2n+1)!}=z-\\frac{z^3}{3!}+\\frac{z^5}{5!}-\\cdots"],
        example: { title: "Worked example · Substitute z = i", steps: ["For cosine, $\\cos i=1-i^2/2!+i^4/4!-\\cdots=1+1/2!+1/4!+\\cdots$.", "For sine, $\\sin i=i-i^3/3!+i^5/5!-\\cdots=i(1+1/3!+1/5!+\\cdots)$.", "Thus $\\cos i$ is real and greater than $1$, while $\\sin i$ is purely imaginary. The familiar real-input bound $|\\cos x|\\leq1$ does not extend to all complex inputs."] },
        mistake: "A complex input is not simply an ordinary geometric angle. Use the series or the exponential identities rather than real-angle intuition alone.",
        recap: "Power series extend sine and cosine consistently beyond the real line."
      },
      {
        id: "hyperbolic-bridge", title: "7. A useful bridge to hyperbolic functions",
        paragraphs: ["Two related functions appear naturally when the input is imaginary. For real $y$, define hyperbolic cosine and hyperbolic sine using the real exponentials below. They are written cosh and sinh.", "Expanding $e^y$ and $e^{-y}$ shows that cosh contains the even powers and sinh the odd powers. Comparing with the sine and cosine series gives $\\cos(iy)=\\cosh y$ and $\\sin(iy)=i\\sinh y$.", "The identity $\\cos^2z+\\sin^2z=1$ still holds for complex inputs. At $z=iy$, it becomes $\\cosh^2y-\\sinh^2y=1$, because $i^2=-1$. These functions later appear in differential equations and models of hanging cables."],
        equations: ["\\cosh y=\\frac{e^y+e^{-y}}2,\\qquad\\sinh y=\\frac{e^y-e^{-y}}2", "\\cos(iy)=\\cosh y,\\qquad\\sin(iy)=i\\sinh y"],
        recap: "Imaginary inputs connect trigonometric functions to real exponential growth and decay."
      }
    ],
    questions: [
      { prompt: "When does $\\sum(a_n+ib_n)$ converge?", options: ["Whenever $a_n$ approaches zero", "Whenever the real-part series converges", "Exactly when both component series converge", "Only when every term is real"], answer: 2, explanation: "The partial sums must approach a point in both coordinates: real and imaginary." },
      { prompt: "What does convergence of $\\sum|z_n|$ guarantee?", options: ["$\\sum z_n$ converges", "The sum is zero", "Every term is real", "The ratio of terms is constant"], answer: 0, explanation: "Absolute convergence implies convergence of a complex series. It does not specify the value of its sum." },
      { prompt: "Find $\\sum_{n=0}^{\\infty}(i/2)^n$.", options: ["$1+i/2$", "$4/5-(2/5)i$", "It diverges", "$4/5+(2/5)i$"], answer: 3, explanation: "The ratio has modulus $1/2$, so the sum is $1/(1-i/2)=4/5+(2/5)i$." },
      { prompt: "Does $1+i+i^2+i^3+\\cdots$ converge?", options: ["Yes, to $0$", "No, its terms do not approach zero", "Yes, to $1/(1-i)$", "Yes, because every four terms sum to zero"], answer: 1, explanation: "Each term has modulus one. The ordinary partial sums cycle instead of approaching one limit; grouping into blocks does not fix this." },
      { prompt: "Which input lies inside $|z-1|<2$?", options: ["$z=3$", "$z=1+2i$", "$z=1+i$", "$z=-2$"], answer: 2, explanation: "For $z=1+i$, the distance to the centre $1$ is $1<2$. The first two alternatives lie on the boundary; the last lies outside." },
      { prompt: "Where does the power series for $e^z$ converge?", options: ["Only for real $z$", "Only for $|z|<1$", "Only for imaginary $z$", "For every complex $z$"], answer: 3, explanation: "For fixed nonzero $z$, the ratio of term magnitudes is $|z|/(n+1)$, tending to zero. At zero the sum is $1$." },
      { prompt: "Which expression equals $\\cos i$?", options: ["$(e+e^{-1})/2$", "$(e-e^{-1})/2$", "$i(e+e^{-1})/2$", "$0$"], answer: 0, explanation: "$\\cos i=\\cosh1=(e+e^{-1})/2$. Its value exceeds one." },
      { prompt: "Which expression equals $\\sin(2i)$?", options: ["$\\sinh2$", "$i\\sinh2$", "$\\cosh2$", "$-i\\cosh2$"], answer: 1, explanation: "Use $\\sin(iy)=i\\sinh y$ with $y=2$." }
    ]
  },
  {
    slug: "euler-formula-powers-and-roots",
    title: "Euler’s Formula: Rotations, Powers, and Roots",
    subtitle: "Connect exponentials to trigonometry and use complex numbers in applied mathematics.",
    readingTime: 22,
    intro: "Euler’s formula connects the exponential function with sine and cosine. We will derive it from the series in the previous lesson, then use it to multiply complex numbers, find all their roots, and describe an oscillation or an AC circuit. Keep angles in radians throughout.",
    goals: ["Derive Euler’s formula and move between rectangular, polar, and exponential forms.", "Use De Moivre’s theorem to calculate powers and all nth roots.", "Express trigonometric functions with exponentials and apply phasors to a simple AC circuit."],
    sections: [
      {
        id: "euler-derivation", title: "1. Derive Euler’s formula from the series",
        paragraphs: ["Substitute $z=i\\theta$ into the exponential series, with $\\theta$ real. The powers of $i$ cycle through $i,-1,-i,1$. Separate the real terms from the imaginary terms.", "The real terms are exactly the cosine series. The imaginary terms are $i$ times the sine series. The exponential series is absolutely convergent, so this regrouping is valid.", "The result is Euler’s formula. At $\\theta=\\pi$, it gives $e^{i\\pi}=-1$, often written $e^{i\\pi}+1=0$."],
        equations: ["e^{i\\theta}=1+i\\theta-\\frac{\\theta^2}{2!}-i\\frac{\\theta^3}{3!}+\\frac{\\theta^4}{4!}+\\cdots", "e^{i\\theta}=\\left(1-\\frac{\\theta^2}{2!}+\\cdots\\right)+i\\left(\\theta-\\frac{\\theta^3}{3!}+\\cdots\\right)", "\\boxed{e^{i\\theta}=\\cos\\theta+i\\sin\\theta}"],
        example: { title: "Worked example · Four points on the unit circle", steps: ["At angles $0$, $\\pi/2$, $\\pi$, and $3\\pi/2$, Euler’s formula gives $1$, $i$, $-1$, and $-i$ respectively.", "Each has modulus $1$, as $\\cos^2\\theta+\\sin^2\\theta=1$.", "Increasing the angle by $2\\pi$ returns to the same point: $e^{i(\\theta+2\\pi)}=e^{i\\theta}$."] },
        recap: "For real $\\theta$, $e^{i\\theta}$ is a point on the unit circle at angle $\\theta$."
      },
      {
        id: "exponential-form", title: "2. Write a complex number as r e^(iθ)",
        paragraphs: ["Euler’s formula shortens the polar form to $z=re^{i\\theta}$. For nonzero $z$, $r=|z|>0$ and $\\theta$ is any argument of $z$.", "For a general exponent $a+ib$ with real $a,b$, the exponential law gives $e^{a+ib}=e^a(\\cos b+i\\sin b)$. The real part of the exponent controls the modulus; the imaginary part controls the angle."],
        equations: ["z=a+bi=r(\\cos\\theta+i\\sin\\theta)=re^{i\\theta}", "|e^{a+ib}|=e^a"],
        example: { title: "Worked example · Convert both ways", steps: ["For $1+i$, $r=\\sqrt2$ and $\\theta=\\pi/4$. Therefore $1+i=\\sqrt2e^{i\\pi/4}$.", "To convert $2e^{-i\\pi/3}$ to rectangular form, use $\\cos(-\\pi/3)=1/2$ and $\\sin(-\\pi/3)=-\\sqrt3/2$.", "Thus $2e^{-i\\pi/3}=1-i\\sqrt3$."] },
        mistake: "For real $\\theta$, $e^{i\\theta}$ has modulus one, not $e^\\theta$. The imaginary exponent describes rotation.",
        recap: "Rectangular, polar, and exponential forms describe the same number in different useful ways."
      },
      {
        id: "multiply-rotate", title: "3. Multiplication scales and rotates",
        paragraphs: ["The exponential law makes multiplication especially simple: multiply the moduli and add the angles. For division by a nonzero number, divide the moduli and subtract the angles.", "Multiplying by $i=e^{i\\pi/2}$ rotates a point anticlockwise by $90^\\circ$ without changing its distance from the origin. More generally, multiplication by $re^{i\\theta}$ scales distances by $r$ and rotates by $\\theta$.", "Angles add as arguments, but the sum may lie outside the principal range. Add or subtract full turns if a principal argument is required."],
        equations: ["(r_1e^{i\\theta_1})(r_2e^{i\\theta_2})=r_1r_2e^{i(\\theta_1+\\theta_2)}", "\\frac{r_1e^{i\\theta_1}}{r_2e^{i\\theta_2}}=\\frac{r_1}{r_2}e^{i(\\theta_1-\\theta_2)}\\qquad(r_2>0)"],
        example: { title: "Worked example · Rotate a displacement", steps: ["Represent the displacement $(2,1)$ by $z=2+i$.", "Multiply by $i$: $i(2+i)=-1+2i$. The new point is $(-1,2)$, a quarter-turn anticlockwise.", "For a polar product, $(2e^{i\\pi/3})(3e^{i\\pi/6})=6e^{i\\pi/2}=6i$."] },
        recap: "Multiplication combines lengths by multiplying and directions by adding angles."
      },
      {
        id: "de-moivre", title: "4. Powers: De Moivre’s theorem",
        paragraphs: ["Multiplying a number by itself repeats the same scaling and rotation. For a positive integer $n$, raise the modulus to the $n$th power and multiply the angle by $n$.", "This gives De Moivre’s theorem. It also holds for zero and negative integer powers when the base is nonzero. Fractional powers require more care because there are generally several roots."],
        equations: ["(re^{i\\theta})^n=r^ne^{in\\theta}", "(\\cos\\theta+i\\sin\\theta)^n=\\cos(n\\theta)+i\\sin(n\\theta)"],
        example: { title: "Worked example · Calculate (1 + i)⁸", steps: ["Write $1+i=\\sqrt2e^{i\\pi/4}$.", "Raise the modulus and multiply the angle: $(1+i)^8=(\\sqrt2)^8e^{i2\\pi}$.", "Since $(\\sqrt2)^8=16$ and $e^{i2\\pi}=1$, the answer is $16$."] },
        recap: "For integer powers, polar or exponential form avoids expanding large brackets."
      },
      {
        id: "nth-roots", title: "5. Find every nth root",
        illustration: "cube-roots",
        paragraphs: ["To solve $w^n=z$ for nonzero $z=re^{i\\theta}$ and a positive integer $n$, write $w=\\rho e^{i\\phi}$. Comparing moduli gives $\\rho^n=r$. Comparing angles gives $n\\phi=\\theta+2k\\pi$.", "There are exactly $n$ distinct roots. Take $k=0,1,\\ldots,n-1$; further integer values repeat the same points. The roots lie equally spaced around a circle of radius $r^{1/n}$. For $z=0$, the only distinct root is $w=0$."],
        equations: ["\\boxed{w_k=r^{1/n}e^{i(\\theta+2k\\pi)/n},\\quad k=0,1,\\ldots,n-1}"],
        example: { title: "Worked example · All cube roots of 8", steps: ["Write $8=8e^{i0}$ and use $n=3$. Every root has modulus $8^{1/3}=2$.", "The three angles are $0$, $2\\pi/3$, and $4\\pi/3$.", "The roots are $2$, $-1+i\\sqrt3$, and $-1-i\\sqrt3$. Their angles differ by $2\\pi/3$, or $120^\\circ$.", "Cubing any of these triples its angle to a full number of turns and cubes its modulus to $8$."] },
        mistake: "Dividing just one chosen angle by $n$ gives only one root. Include $2k\\pi$ before dividing to obtain them all.",
        recap: "An nth-root problem for a nonzero complex number has $n$ equally spaced solutions."
      },
      {
        id: "exponential-trig", title: "6. Recover sine and cosine from exponentials",
        paragraphs: ["Apply Euler’s formula to $\\theta$ and $-\\theta$. Adding the equations isolates cosine; subtracting them isolates sine. These identities also hold for complex inputs $z$, using their power-series definitions.", "Where $\\cos z\\ne0$, tangent is defined as $\\tan z=\\sin z/\\cos z$. Sine and cosine are defined for all complex inputs, but tangent is undefined where its denominator vanishes.", "To see why this is useful, multiply $e^{i\\alpha}$ and $e^{i\\beta}$ and expand their sine-cosine forms. Equating real and imaginary parts gives the familiar angle-addition identities."],
        equations: ["\\cos z=\\frac{e^{iz}+e^{-iz}}2,\\qquad\\sin z=\\frac{e^{iz}-e^{-iz}}{2i}", "\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta", "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"],
        example: { title: "Worked example · A general complex cosine", steps: ["For real $x,y$, substitute $z=x+iy$ into the exponential formula for cosine.", "Simplifying with the definitions of cosh and sinh gives $\\cos(x+iy)=\\cos x\\cosh y-i\\sin x\\sinh y$.", "Similarly, $\\sin(x+iy)=\\sin x\\cosh y+i\\cos x\\sinh y$. At $x=0$, these reduce to the imaginary-input identities from the previous lesson."] },
        recap: "Complex exponentials turn trigonometric identities into algebra."
      },
      {
        id: "oscillations", title: "7. Application: represent a wave by a rotating number",
        paragraphs: ["A real oscillation can be written as $x(t)=A\\cos(\\omega t+\\phi)$, where $A$ is a nonnegative amplitude, $\\omega$ is angular frequency in radians per unit time, and $\\phi$ is a phase angle. Euler’s formula writes this as the real part of a complex exponential.", "The constant complex number $X=Ae^{i\\phi}$ is called a phasor. The time-dependent expression $Xe^{i\\omega t}$ rotates; its real part is the measurable oscillation. A phasor keeps track of amplitude and phase together.", "For signals with the same angular frequency, add the phasors and then take the real part. This can be easier than combining trigonometric expressions. If you know calculus, differentiation multiplies $Xe^{i\\omega t}$ by $i\\omega$, which explains its usefulness in differential equations."],
        equations: ["x(t)=\\operatorname{Re}\\{Ae^{i\\phi}e^{i\\omega t}\\}"],
        example: { title: "Worked example · Add two oscillations", steps: ["Add $\\cos(\\omega t)$ and $\\cos(\\omega t+\\pi/2)$. Their phasors are $1$ and $i$.", "The total phasor is $1+i=\\sqrt2e^{i\\pi/4}$.", "Therefore the combined real signal is $\\sqrt2\\cos(\\omega t+\\pi/4)$. Equal individual amplitudes do not simply add to $2$ because the phases differ."] },
        recap: "A phasor packages amplitude and phase; take the real part to return to the real signal."
      },
      {
        id: "ac-circuit", title: "8. Application: a simple AC circuit",
        paragraphs: ["In sinusoidal steady state at one angular frequency $\\omega>0$, complex impedance relates voltage and current phasors: $V=ZI$. A resistor contributes $R$, an inductor contributes $i\\omega L$, and a capacitor contributes $1/(i\\omega C)=-i/(\\omega C)$. Series impedances add.", "Here $R$ is resistance in ohms, $L$ is inductance in henries, and $C$ is capacitance in farads. Electrical engineering often writes $j$ instead of $i$ to avoid confusion with current; the mathematical rule is the same, $j^2=-1$.", "Use one consistent amplitude convention. In this example, all phasor moduli are peak amplitudes and the real signal is obtained with $e^{i\\omega t}$."],
        equations: ["Z_R=R,\\qquad Z_L=i\\omega L,\\qquad Z_C=-\\frac{i}{\\omega C},\\qquad I=\\frac VZ"],
        example: { title: "Worked example · Current through a series RL circuit", steps: ["Suppose $R=3$ ohms and $\\omega L=4$ ohms. The impedance is $Z=3+4i$ ohms, with modulus $5$ ohms.", "Let the voltage phasor be $V=10$ volts. Then $I=10/(3+4i)=10(3-4i)/25=1.2-1.6i$ amperes.", "The peak current is $|I|=2$ amperes. Its phase is $-\\arctan(4/3)\\approx-0.927$ radians, so the current lags the voltage.", "With $v(t)=10\\cos(\\omega t)$, the real current is $2\\cos(\\omega t-0.927)$ amperes, approximately. Complex division computed both its amplitude and phase."] },
        recap: "In AC analysis, the modulus gives an amplitude ratio and the argument gives a phase shift."
      },
      {
        id: "euler-summary", title: "9. A final formula sheet and study routine",
        paragraphs: ["Use rectangular form for addition and subtraction; exponential form for multiplication, division, powers, and roots. Check a result by converting back or substituting it into the original equation.", "For roots, list every required value of $k$. For angles, keep radians and the principal-argument convention consistent. For series, check convergence before using an infinite-sum formula. These habits are more useful than memorising formulas without their conditions."],
        equations: ["e^{i\\theta}=\\cos\\theta+i\\sin\\theta,\\quad e^{i\\pi}+1=0", "(re^{i\\theta})^n=r^ne^{in\\theta},\\quad w_k=r^{1/n}e^{i(\\theta+2k\\pi)/n}", "\\cos z=\\frac{e^{iz}+e^{-iz}}2,\\quad\\sin z=\\frac{e^{iz}-e^{-iz}}{2i}"],
        recap: "You can now connect complex arithmetic, geometry, series, trigonometry, and simple applied models."
      }
    ],
    questions: [
      { prompt: "Which identity is Euler’s formula for real $\\theta$?", options: ["$e^{i\\theta}=\\sin\\theta+i\\cos\\theta$", "$e^{i\\theta}=\\cos\\theta+i\\sin\\theta$", "$e^{i\\theta}=e^\\theta i$", "$e^{i\\theta}=\\cos\\theta-\\sin\\theta$"], answer: 1, explanation: "Grouping even and odd powers in the exponential series gives cosine plus $i$ times sine." },
      { prompt: "What is $e^{-i\\pi/2}$?", options: ["$i$", "$1$", "$-1$", "$-i$"], answer: 3, explanation: "$\\cos(-\\pi/2)=0$ and $\\sin(-\\pi/2)=-1$, so the value is $-i$." },
      { prompt: "Find $|e^{2+3i}|$.", options: ["$e^2$", "$e^3$", "$1$", "$\\sqrt{13}$"], answer: 0, explanation: "$e^{2+3i}=e^2e^{3i}$, and $|e^{3i}|=1$. The modulus is $e^2$." },
      { prompt: "Simplify $(2e^{i\\pi/3})(3e^{i\\pi/6})$.", options: ["$5e^{i\\pi/2}$", "$6$", "$6i$", "$-6i$"], answer: 2, explanation: "Multiply the moduli and add the angles: $6e^{i\\pi/2}=6i$." },
      { prompt: "What is $(1+i)^8$?", options: ["$8i$", "$-16$", "$16i$", "$16$"], answer: 3, explanation: "$1+i=\\sqrt2e^{i\\pi/4}$, so its eighth power is $16e^{i2\\pi}=16$." },
      { prompt: "How many distinct fourth roots does $16$ have in the complex numbers?", options: ["One", "Two", "Four", "Infinitely many"], answer: 2, explanation: "A nonzero complex number has four distinct fourth roots: here they are $2$, $2i$, $-2$, and $-2i$." },
      { prompt: "Which list contains all cube roots of $8$?", options: ["$2,\\ 2i,\\ -2i$", "$2,\\ -1+i\\sqrt3,\\ -1-i\\sqrt3$", "$2,\\ -2,\\ 0$", "$8,\\ 8i,\\ -8i$"], answer: 1, explanation: "The roots have modulus $2$ and arguments $0$, $2\\pi/3$, and $4\\pi/3$. Converting those gives the stated list." },
      { prompt: "Which expression equals $\\sin z$?", options: ["$(e^{iz}+e^{-iz})/2$", "$(e^{iz}-e^{-iz})/2$", "$(e^{iz}+e^{-iz})/(2i)$", "$(e^{iz}-e^{-iz})/(2i)$"], answer: 3, explanation: "Subtract the two exponential identities to get $e^{iz}-e^{-iz}=2i\\sin z$." },
      { prompt: "What happens when you multiply $3+2i$ by $i$?", options: ["It rotates anticlockwise by $90^\\circ$ to $-2+3i$", "It doubles in length", "It becomes its conjugate $3-2i$", "It rotates clockwise by $90^\\circ$ to $2-3i$"], answer: 0, explanation: "$i(3+2i)=3i+2i^2=-2+3i$. Multiplication by $i$ adds angle $\\pi/2$ and preserves modulus." },
      { prompt: "With peak voltage phasor $V=10$ V and impedance $Z=3+4i$ ohms, what is the peak current?", options: ["$10$ A", "$5$ A", "$2$ A", "$1.2$ A"], answer: 2, explanation: "$|I|=|V|/|Z|=10/\\sqrt{3^2+4^2}=2$ A. The real part of the current phasor, $1.2$, is not its amplitude." }
    ]
  }
];
