/**
 * Published prices. Pages import these so a range changes in one place.
 * Markdown content cannot import this file: when a range changes, also update
 * src/content/guides/website-redesign-cost-for-local-business.md and run `rg '\$[0-9]' src`.
 */

export type PricingStage = {
  readonly tier: string;
  readonly range: string;
  readonly name: string;
  readonly tagline: string;
  readonly summary: string;
  readonly setup: string;
  readonly featured?: boolean;
  readonly details: readonly string[];
};

export type RetainerTier = {
  readonly name: "Foundation" | "Growth" | "Specialist";
  readonly range: string;
  readonly tagline: string;
  readonly summary: string;
  readonly setup: string;
  readonly featured?: boolean;
  readonly details: readonly string[];
};

/** Prose forms (en dash) of the ranges, for FAQ answers and body copy. */
export const PRICE_TEXT = {
  audit: "$750–$1,500",
  implementation: "$1,500–$4,000",
  foundation: "$1,500–$3,000",
  growth: "$3,000–$6,000",
  specialist: "$5,000–$10,000",
} as const;

export const pricingStages: readonly PricingStage[] = [
  {
    tier: "Step 1",
    range: "$750-$1,500",
    name: "Diagnostic Audit: AI Visibility and Intake",
    tagline: "See exactly where visibility, trust, and response are leaking before you commit to a larger build.",
    summary: "A paid diagnosis with written, fixed deliverables. It shows what AI assistants say about your business today and where inquiries go cold.",
    setup: "One-time engagement. The fee is credited toward the website build or other services that follow, whether or not you choose an ongoing retainer.",
    details: [
      "Cross-LLM baseline: what ChatGPT, Gemini, Perplexity, and Google AI Overviews say about the business today",
      "Entity and name-address-phone consistency check across the website, Google Business Profile, and directories",
      "Schema validation against the vocabulary and Google's documentation",
      "Intake and response-speed review covering forms, calls, and handoff delays",
      "Clear implementation recommendation with scope tied to findings",
    ],
  },
  {
    tier: "Step 2",
    range: "$1,500-$4,000",
    name: "System Implementation",
    tagline: "Implement the highest-value fixes first, then build the public system around real market conditions.",
    summary: "The build phase for the highest-value fixes: local visibility, trust surface, response routing, and measurement setup.",
    setup: "One-time project. You keep the result: when the contract period ends, the code and digital assets are yours.",
    featured: true,
    details: [
      "Service and location architecture that reflects the real market, not statewide filler",
      "Custom website and conversion improvements tied to buyer confidence",
      "Lead capture and routing improvements that reduce the reply gap",
      "Schema, snippet, and entity architecture that strengthens trust and extractability",
      "Analytics and reporting foundations that keep the system measurable",
    ],
  },
];

export const retainerTiers: readonly RetainerTier[] = [
  {
    name: "Foundation",
    range: "$1,500-$3,000/mo",
    tagline: "Keep the local foundation correct and reported on every month.",
    summary: "For businesses whose main constraint is accuracy and consistency across the places customers and AI assistants look.",
    setup: "Monthly retainer.",
    details: [
      "Google Business Profile optimization",
      "Entity cleanup",
      "Name, address, and phone consistency",
      "Core schema",
      "Monthly reporting",
    ],
  },
  {
    name: "Growth",
    range: "$3,000-$6,000/mo",
    tagline: "Add content and citation work on top of a correct foundation.",
    summary: "For businesses in competitive markets or with several service areas that need steady publishing and measurement.",
    setup: "Monthly. Includes everything in Foundation.",
    featured: true,
    details: [
      "Everything in Foundation",
      "GEO content velocity",
      "Citation and directory building",
      "Service-area pages",
      "AI citation tracking",
    ],
  },
  {
    name: "Specialist",
    range: "$5,000-$10,000/mo",
    tagline: "Vertical work for law firms, with attorney review built in.",
    summary: "For law firms, where intake speed and verified content decide the result.",
    setup: "Monthly. Includes everything in Growth. Legal is the first vertical.",
    details: [
      "Everything in Growth",
      "Legal GEO",
      "AI intake and follow-up",
      "Compliance-aware editorial workflow with attorney sign-off",
    ],
  },
];
