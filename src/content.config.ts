import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const seoFields = {
  title: z.string(),
  description: z.string(),
  heroTitle: z.string().optional(),
  ogImage: z.string().optional(),
};

const richSection = z.object({
  title: z.string(),
  paragraphs: z.array(z.string()).default([]),
});

const metric = z.object({
  value: z.string(),
  label: z.string(),
  detail: z.string().optional(),
});

const flowStep = z.object({
  label: z.string(),
  name: z.string(),
  accent: z.boolean().optional(),
});

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    ...seoFields,
    summary: z.string(),
    order: z.number(),
    outcomes: z.array(z.string()).default([]),
    capabilities: z.array(z.string()).default([]),
    proofPoints: z.array(z.string()).default([]),
    diagnosticQuestions: z.array(z.string()).default([]),
    deliverables: z.array(z.string()).default([]),
    faqs: z.array(faqItem).default([]),
    relatedReports: z.array(z.string()).default([]),
    relatedKnowledgeBase: z.array(z.string()).default([]),
    relatedCaseStudies: z.array(z.string()).default([]),
    relatedLocations: z.array(z.string()).default([]),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: z.object({
    ...seoFields,
    client: z.string(),
    location: z.string(),
    summary: z.string(),
    heroLabel: z.string().default("Case Study"),
    industry: z.string().optional(),
    market: z.string().optional(),
    services: z.array(z.string()).default([]),
    relatedReports: z.array(z.string()).default([]),
    relatedLocations: z.array(z.string()).default([]),
    stats: z.array(metric).default([]),
    challenge: richSection,
    stakes: richSection,
    quote: z
      .object({
        text: z.string(),
        attribution: z.string().optional(),
      })
      .optional(),
    flow: z
      .object({
        title: z.string().optional(),
        steps: z.array(flowStep).default([]),
      })
      .optional(),
    context: richSection.optional(),
    execution: z
      .object({
        title: z.string(),
        paragraphs: z.array(z.string()).default([]),
        items: z.array(z.string()).default([]),
      })
      .optional(),
    impact: richSection.optional(),
    outcomesCallout: z.object({
      headline: z.string(),
      body: z.string(),
      badgeValue: z.string(),
      badgeLabel: z.string(),
      theme: z.enum(["accent", "ink"]).default("accent"),
    }),
    results: z.array(z.string()).default([]),
  }),
});

const reports = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/reports" }),
  schema: z.object({
    ...seoFields,
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tldr: z.array(z.string()).default([]),
    relatedServices: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    ...seoFields,
    publishedAt: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    relatedServices: z.array(z.string()).default([]),
    relatedCaseStudies: z.array(z.string()).default([]),
  }),
});

const knowledgeBase = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/knowledge-base" }),
  schema: z.object({
    ...seoFields,
    publishedAt: z.coerce.date(),
    relatedServices: z.array(z.string()).default([]),
  }),
});

const industries = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/industries" }),
  schema: z.object({
    ...seoFields,
    summary: z.string(),
    relatedServices: z.array(z.string()).default([]),
  }),
});

export const collections = {
  services,
  caseStudies,
  reports,
  blog,
  knowledgeBase,
  industries,
};
