import { canonicalFor } from '../canonical.js';
import type {
  AggregateRatingInput,
  BreadcrumbItem,
  FaqItem,
  GeoCoordinatesInput,
  JsonLdNode,
  ListItemInput,
  PageMeta,
  PostalAddressInput,
  SiteIdentity,
} from '../types/index.js';

/** Stable @id anchors, referenced across every page of a property. */
export function anchorIds(identity: SiteIdentity): {
  readonly organization: string;
  readonly founder: string;
  readonly website: string;
} {
  return {
    organization: `${identity.url}/#organization`,
    founder: `${identity.url}/#founder`,
    website: `${identity.url}/#website`,
  } as const;
}

function postalAddress(a: PostalAddressInput): JsonLdNode {
  return {
    '@type': 'PostalAddress',
    ...(a.streetAddress !== undefined ? { streetAddress: a.streetAddress } : {}),
    addressLocality: a.addressLocality,
    addressRegion: a.addressRegion,
    ...(a.postalCode !== undefined ? { postalCode: a.postalCode } : {}),
    addressCountry: a.addressCountry,
  };
}

function areaServedNodes(names: readonly string[]): readonly JsonLdNode[] {
  return names.map((name) => ({ '@type': 'City', name }));
}

export function organizationNode(identity: SiteIdentity): JsonLdNode {
  const ids = anchorIds(identity);
  return {
    '@type': 'Organization',
    '@id': ids.organization,
    name: identity.name,
    legalName: identity.legalName,
    url: `${identity.url}/`,
    description: identity.description,
    logo: { '@type': 'ImageObject', url: identity.logoUrl },
    ...(identity.email !== undefined ? { email: identity.email } : {}),
    ...(identity.telephone !== undefined ? { telephone: identity.telephone } : {}),
    ...(identity.address !== undefined ? { address: postalAddress(identity.address) } : {}),
    ...(identity.sameAs !== undefined && identity.sameAs.length > 0 ? { sameAs: identity.sameAs } : {}),
    ...(identity.founder !== undefined ? { founder: { '@id': ids.founder } } : {}),
  };
}

export function personNode(identity: SiteIdentity): JsonLdNode | undefined {
  if (identity.founder === undefined) return undefined;
  const ids = anchorIds(identity);
  const f = identity.founder;
  return {
    '@type': 'Person',
    '@id': ids.founder,
    name: f.name,
    jobTitle: f.jobTitle,
    worksFor: { '@id': ids.organization },
    ...(f.imageUrl !== undefined ? { image: f.imageUrl } : {}),
    ...(f.sameAs !== undefined && f.sameAs.length > 0 ? { sameAs: f.sameAs } : {}),
  };
}

export function webSiteNode(identity: SiteIdentity): JsonLdNode {
  const ids = anchorIds(identity);
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    name: identity.name,
    url: `${identity.url}/`,
    publisher: { '@id': ids.organization },
  };
}

export function professionalServiceNode(identity: SiteIdentity): JsonLdNode {
  const ids = anchorIds(identity);
  return {
    '@type': 'ProfessionalService',
    '@id': `${identity.url}/#professionalservice`,
    name: identity.legalName,
    url: `${identity.url}/`,
    parentOrganization: { '@id': ids.organization },
    ...(identity.address !== undefined ? { address: postalAddress(identity.address) } : {}),
    ...(identity.areaServed !== undefined && identity.areaServed.length > 0
      ? { areaServed: areaServedNodes(identity.areaServed) }
      : {}),
  };
}

export function webPageNode(identity: SiteIdentity, page: PageMeta): JsonLdNode {
  const ids = anchorIds(identity);
  const url = canonicalFor(identity, page.path);
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': ids.website },
  };
}

export function breadcrumbNode(identity: SiteIdentity, page: PageMeta, crumbs: readonly BreadcrumbItem[]): JsonLdNode {
  const url = canonicalFor(identity, page.path);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      ...(crumb.url !== undefined ? { item: crumb.url } : {}),
    })),
  };
}

export function serviceNode(identity: SiteIdentity, page: PageMeta): JsonLdNode {
  const ids = anchorIds(identity);
  const url = canonicalFor(identity, page.path);
  const area = page.serviceArea ?? identity.areaServed ?? [];
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: page.serviceName ?? page.title,
    description: page.description,
    url,
    provider: { '@id': ids.organization },
    ...(area.length > 0 ? { areaServed: areaServedNodes(area) } : {}),
  };
}

export function articleNode(identity: SiteIdentity, page: PageMeta): JsonLdNode {
  const ids = anchorIds(identity);
  const url = canonicalFor(identity, page.path);
  const author: JsonLdNode =
    identity.founder !== undefined && (page.authorName === undefined || page.authorName === identity.founder.name)
      ? { '@type': 'Person', '@id': ids.founder }
      : { '@type': 'Person', name: page.authorName ?? identity.name };
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: page.title,
    description: page.description,
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    author,
    publisher: { '@id': ids.organization },
    ...(page.datePublished !== undefined ? { datePublished: page.datePublished } : {}),
    ...(page.dateModified !== undefined ? { dateModified: page.dateModified } : {}),
    ...(page.articleSection !== undefined ? { articleSection: page.articleSection } : {}),
    ...(page.aboutUrl !== undefined ? { about: { '@type': 'Thing', url: page.aboutUrl } } : {}),
    image: page.ogImageUrl ?? identity.defaultOgImageUrl,
  };
}

export function faqNode(identity: SiteIdentity, page: PageMeta, faqs: readonly FaqItem[]): JsonLdNode {
  const url = canonicalFor(identity, page.path);
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function itemListNode(identity: SiteIdentity, page: PageMeta, items: readonly ListItemInput[]): JsonLdNode {
  const url = canonicalFor(identity, page.path);
  return {
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    name: page.title,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position ?? index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function localBusinessNode(identity: SiteIdentity, page: PageMeta): JsonLdNode {
  const url = canonicalFor(identity, page.path);
  const geo: GeoCoordinatesInput | undefined = page.businessGeo;
  const rating: AggregateRatingInput | undefined = page.businessRating;
  return {
    '@type': 'LocalBusiness',
    '@id': `${url}#localbusiness`,
    name: page.businessName ?? page.title,
    url: page.businessWebsite ?? url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    ...(page.businessCategory !== undefined ? { additionalType: page.businessCategory } : {}),
    ...(page.businessTelephone !== undefined ? { telephone: page.businessTelephone } : {}),
    ...(page.businessAddress !== undefined ? { address: postalAddress(page.businessAddress) } : {}),
    ...(geo !== undefined
      ? { geo: { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude } }
      : {}),
    ...(rating !== undefined
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating.ratingValue,
            reviewCount: rating.reviewCount,
          },
        }
      : {}),
  };
}
