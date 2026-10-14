// The Applied Mathematics curriculum — 13 chapters.
// To fill a chapter, add a post in lib/posts.ts with topic: "Mathematics"
// and chapter: <number>. It appears on that chapter's page automatically.
export type Chapter = {
  n: number;
  slug: string;
  title: string;
  sections: string[];
};

export const appliedMath = {
  title: "Applied Mathematics",
  slug: "applied-mathematics",
  chapters: [
    {
      n: 1,
      slug: "infinite-series-and-power-series",
      title: "Infinite Series and Power Series",
      sections: [],
    },
    {
      n: 2,
      slug: "complex-numbers",
      title: "Complex Numbers",
      sections: [
        "Basics, infinite and power series",
        "Trig functions",
        "Euler formula",
      ],
    },
    {
      n: 3,
      slug: "rudiments-of-linear-algebra",
      title: "Rudiments of Linear Algebra",
      sections: [
        "Linear equations",
        "Row reduction",
        "Matrix operations",
        "Eigenvalues, eigenvectors, and diagonalization",
      ],
    },
    {
      n: 4,
      slug: "partial-derivatives",
      title: "Partial Derivatives",
      sections: [
        "Total differential",
        "Taylor and power series in several variables",
        "Chain rule",
        "Lagrange multipliers",
      ],
    },
    {
      n: 5,
      slug: "multiple-integration-and-vector-analysis",
      title: "Multiple Integration and Vector Analysis",
      sections: [
        "Multiple integrals",
        "The Jacobian and change of variables",
        "Inner, cross, and triple products",
        "Gradient and line integrals",
        "Green’s theorem, the divergence theorem, and Stokes’ theorem",
      ],
    },
    {
      n: 6,
      slug: "fourier-series-and-transforms",
      title: "Fourier Series and Transforms",
      sections: [],
    },
    {
      n: 7,
      slug: "ordinary-differential-equations-i",
      title: "Ordinary Differential Equations I",
      sections: [
        "Constant coefficient differential equations and the Laplace transform",
      ],
    },
    {
      n: 8,
      slug: "variational-calculus",
      title: "Variational Calculus",
      sections: [
        "Euler equation, Lagrange’s equation, and some example problems",
      ],
    },
    {
      n: 9,
      slug: "assorted-special-functions",
      title: "Assorted Special Functions",
      sections: [
        "Gamma, Beta, and error functions",
        "Asymptotic series and Stirling’s formula",
      ],
    },
    {
      n: 10,
      slug: "ordinary-differential-equations-ii",
      title: "Ordinary Differential Equations II",
      sections: [
        "Series solution of differential equations",
        "Orthogonal functions, Legendre polynomials, Bessel functions",
        "Other classes of orthogonal functions and their ODEs",
      ],
    },
    {
      n: 11,
      slug: "partial-differential-equations",
      title: "Partial Differential Equations",
      sections: [
        "Basic types of PDEs",
        "Model problems (heat flow, vibrating string, steady state temperature)",
      ],
    },
    {
      n: 12,
      slug: "complex-function-theory",
      title: "Complex Function Theory",
      sections: [
        "Contour integrals and Cauchy’s theorem",
        "Laurent series and the residue calculus",
        "Conformal maps",
      ],
    },
    {
      n: 13,
      slug: "probability-and-statistics",
      title: "Probability and Statistics",
      sections: [
        "Sample spaces and random variables",
        "Discrete and continuous distributions",
        "The binomial, the Gaussian, and the Poisson distribution",
        "Sampling and confidence intervals",
      ],
    },
  ] satisfies Chapter[],
};

export function getChapter(slug: string): Chapter | undefined {
  return appliedMath.chapters.find((c) => c.slug === slug);
}

export function getChapterByNumber(n: number): Chapter | undefined {
  return appliedMath.chapters.find((c) => c.n === n);
}
