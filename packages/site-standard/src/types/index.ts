/**
 * @leverageai/site-standard — shared type definitions (barrel).
 * All types are defined here and imported everywhere else, per LEVERAGEAI
 * engineering standards. No `any`, strict throughout.
 */

/** Discriminator for which JSON-LD graph a page receives. */
export type PageType =
  | 'home'
  | 'service'      // /services/{slug} on leverageai.network
  | 'location'     // /locations/{city} on leverageai.network
  | 'article'      // reports, blog posts, knowledge-base guides
  | 'caseStudy'    // /portfolio/{slug}
  | 'listing'      // directory listing pages (city×category, subcategory×city)
  | 'business'     // directory business entity pages
  | 'page';        // generic (about, contact, pricing, legal)

export interface FounderIdentity {
  readonly name: string;
  readonly jobTitle: string;
  readonly imageUrl?: string;
  /** Social / profile URLs used for entity disambiguation. */
  readonly sameAs?: readonly string[];
}

export interface PostalAddressInput {
  readonly streetAddress?: string;
  readonly addressLocality: string;
  readonly addressRegion: string;
  readonly postalCode?: string;
  readonly addressCountry: string;
}

export interface SiteIdentity {
  /** Canonical https origin, no trailing slash. e.g. "https://leverageai.network" */
  readonly url: string;
  readonly name: string;
  readonly legalName: string;
  readonly description: string;
  /** Absolute URL to the logo image. */
  readonly logoUrl: string;
  /** Absolute URL to the default 1200×630 social share image. */
  readonly defaultOgImageUrl: string;
  readonly email?: string;
  readonly telephone?: string;
  readonly address?: PostalAddressInput;
  readonly founder?: FounderIdentity;
  /** Organization-level profile URLs (GBP, LinkedIn, GitHub, ...). */
  readonly sameAs?: readonly string[];
  /** Human-readable service area names, e.g. Oregon cities. */
  readonly areaServed?: readonly string[];
}

export interface BreadcrumbItem {
  readonly name: string;
  /** Absolute URL. Omit on the final (current-page) crumb. */
  readonly url?: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface ListItemInput {
  readonly name: string;
  /** Absolute URL of the item’s canonical page. */
  readonly url: string;
  readonly position?: number;
}

export interface GeoCoordinatesInput {
  readonly latitude: number;
  readonly longitude: number;
}

export interface AggregateRatingInput {
  readonly ratingValue: number;
  readonly reviewCount: number;
}

/** Per-page metadata consumed by SeoHead and SchemaGraph. */
export interface PageMeta {
  readonly type: PageType;
  readonly title: string;
  readonly description: string;
  /** Path beginning with "/". Canonical is derived from this + SiteIdentity.url. */
  readonly path: string;
  readonly breadcrumbs?: readonly BreadcrumbItem[];
  readonly ogImageUrl?: string;
  readonly noindex?: boolean;

  // article / caseStudy
  readonly datePublished?: string;   // ISO 8601
  readonly dateModified?: string;    // ISO 8601
  readonly authorName?: string;      // defaults to identity.founder
  readonly articleSection?: string;  // "Reports" | "Blog" | "Knowledge Base" | ...
  readonly aboutUrl?: string;        // caseStudy: the subject business's site

  // service / location
  readonly serviceName?: string;
  readonly serviceArea?: readonly string[];
  readonly faqs?: readonly FaqItem[];

  // listing
  readonly listItems?: readonly ListItemInput[];

  // business (directory entity pages)
  readonly businessName?: string;
  readonly businessCategory?: string;
  readonly businessAddress?: PostalAddressInput;
  readonly businessTelephone?: string;
  readonly businessWebsite?: string;
  readonly businessGeo?: GeoCoordinatesInput;
  readonly businessRating?: AggregateRatingInput;
}

/** A single JSON-LD node inside an @graph. */
export interface JsonLdNode {
  readonly '@type': string | readonly string[];
  readonly '@id'?: string;
  readonly [key: string]: unknown;
}

export interface JsonLdGraph {
  readonly '@context': 'https://schema.org';
  readonly '@graph': readonly JsonLdNode[];
}

export class SiteStandardConfigError extends Error {
  public override readonly name = 'SiteStandardConfigError';
  public constructor(message: string) {
    super(message);
  }
}
