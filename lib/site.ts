// Global site configuration — edit these to make the paper your own.
export const site = {
  masthead: "Root & Branch",
  tagline: "Notes from the Bottom of the Stack",
  author: "Vivek Sharma",
  role: "Head of Engineering",
  company: "Ally Solutions",
  logo: "/ally-logo.png",
  domain: "vivek.blog",
  // Topic filter shown above the feed.
  topics: ["Tech", "Deep Tech", "Mathematics"] as const,
  // Signal is the curation level, like the "Signal" toggle.
  signals: ["recommended", "must-read"] as const,
};

export type Topic = (typeof site.topics)[number];
export type Signal = (typeof site.signals)[number];
