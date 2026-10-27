// Global site configuration — edit these to make the paper your own.
export const site = {
  masthead: "Root & Branch",
  tagline: "Notes from the Bottom of the Stack",
  author: "Vivek Sharma",
  role: "Technical Co-Founder",
  company: "Ally Solutions",
  logo: "/ally-logo.png",
  domain: "viveksharma.blog",
  url: "https://www.viveksharma.blog",
  description: "From first principles to real-world systems, exploring the ideas behind technology, deep tech, and mathematics.",
  github: "https://github.com/uchiha-vivek",
  linkedin: "https://www.linkedin.com/in/vivekuchiha/",
  x: "https://x.com/VivekSh80330931",
  xHandle: "@VivekSh80330931",
  // Topic filter shown above the feed.
  topics: ["Tech", "Deep Tech", "Mathematics"] as const,
  // Signal is the curation level, like the "Signal" toggle.
  signals: ["recommended", "must-read"] as const,
};

export type Topic = (typeof site.topics)[number];
export type Signal = (typeof site.signals)[number];
