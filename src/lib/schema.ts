import { SITE } from "./site";
import { absoluteUrl } from "./seo";

type SchemaNode = Record<string, unknown>;
type FaqItem = {
  question: string;
  answer: string;
};

export function baseGraph(): SchemaNode[] {
  return [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: SITE.legalName,
      url: SITE.siteUrl,
      sameAs: Object.values(SITE.social),
      email: SITE.email,
      areaServed: "Oregon",
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: SITE.siteUrl,
      name: SITE.name,
      description: SITE.description,
    },
    {
      "@type": "ProfessionalService",
      "@id": absoluteUrl("/#local-business"),
      name: SITE.legalName,
      url: SITE.siteUrl,
      areaServed: ["Oregon", "Grants Pass", "Medford", "Ashland", "Bend"],
      description: SITE.description,
    },
  ];
}

export function webpageGraph(path: string, title: string, description: string): SchemaNode[] {
  return [
    ...baseGraph(),
    {
      "@type": "WebPage",
      "@id": absoluteUrl(`${path}#webpage`),
      url: absoluteUrl(path),
      name: title,
      description,
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": absoluteUrl("/#local-business") },
    },
  ];
}

export function articleGraph(
  path: string,
  title: string,
  description: string,
  datePublished?: string,
) {
  return [
    ...webpageGraph(path, title, description),
    {
      "@type": "Article",
      "@id": absoluteUrl(`${path}#article`),
      headline: title,
      description,
      url: absoluteUrl(path),
      datePublished,
      publisher: { "@id": absoluteUrl("/#organization") },
      author: {
        "@type": "Person",
        name: "Mike Schlottig",
      },
    },
  ];
}

export function serviceGraph(
  path: string,
  title: string,
  description: string,
  faqs: FaqItem[] = [],
) {
  const graph: SchemaNode[] = [
    ...webpageGraph(path, title, description),
    {
      "@type": "Service",
      "@id": absoluteUrl(`${path}#service`),
      url: absoluteUrl(path),
      name: title,
      serviceType: title,
      description,
      areaServed: ["Oregon", "Grants Pass", "Medford", "Ashland", "Bend"],
      provider: { "@id": absoluteUrl("/#organization") },
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": absoluteUrl(`${path}#faq`),
      url: absoluteUrl(path),
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return graph;
}
