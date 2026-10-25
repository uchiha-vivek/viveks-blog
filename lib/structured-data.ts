import { site } from "@/lib/site";

// Profiles that belong to the same person. Google uses these to connect
// the blog, LinkedIn, GitHub and X into one "Vivek Sharma" entity.
export const sameAs = [site.linkedin, site.github, site.x];

export const personId = `${site.url}/#person`;

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.author,
        url: site.url,
        jobTitle: site.role,
        description: `${site.author} is a software engineer and ${site.role} at ${site.company}, writing about technology, deep tech and mathematics.`,
        knowsAbout: ["Software Engineering", "Deep Tech", "Applied Mathematics"],
        worksFor: { "@type": "Organization", name: site.company },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.masthead,
        alternateName: `${site.author}'s blog`,
        description: site.description,
        author: { "@id": personId },
        publisher: { "@id": personId },
        inLanguage: "en-US",
      },
    ],
  };
}
