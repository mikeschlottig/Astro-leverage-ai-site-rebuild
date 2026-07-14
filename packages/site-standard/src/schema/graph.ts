import {
  articleNode,
  breadcrumbNode,
  faqNode,
  itemListNode,
  localBusinessNode,
  organizationNode,
  personNode,
  professionalServiceNode,
  serviceNode,
  webPageNode,
  webSiteNode,
} from './nodes.js';
import type { JsonLdGraph, JsonLdNode, PageMeta, SiteIdentity } from '../types/index.js';

/**
 * Build the full JSON-LD @graph for a page.
 *
 * Every page is self-contained: Organization, Person (founder), and WebSite
 * nodes ship on every page with stable @ids, then page-type nodes reference
 * them. Self-containment costs a few hundred bytes and removes any dependency
 * on crawlers stitching entities across URLs.
 */
export function buildGraph(identity: SiteIdentity, page: PageMeta): JsonLdGraph {
  const nodes: JsonLdNode[] = [];

  nodes.push(organizationNode(identity));
  const person = personNode(identity);
  if (person !== undefined) nodes.push(person);
  nodes.push(webSiteNode(identity));
  nodes.push(webPageNode(identity, page));

  if (page.breadcrumbs !== undefined && page.breadcrumbs.length > 0) {
    nodes.push(breadcrumbNode(identity, page, page.breadcrumbs));
  }

  switch (page.type) {
    case 'home':
      nodes.push(professionalServiceNode(identity));
      break;
    case 'service':
    case 'location':
      nodes.push(serviceNode(identity, page));
      break;
    case 'article':
    case 'caseStudy':
      nodes.push(articleNode(identity, page));
      break;
    case 'listing':
      if (page.listItems !== undefined && page.listItems.length > 0) {
        nodes.push(itemListNode(identity, page, page.listItems));
      }
      break;
    case 'business':
      nodes.push(localBusinessNode(identity, page));
      break;
    case 'page':
      break;
  }

  // One-FAQ-one-URL rule (directory invariant, Rule 4): FAQPage markup ships
  // only when this page carries its own unique FAQ content.
  if (page.faqs !== undefined && page.faqs.length > 0) {
    nodes.push(faqNode(identity, page, page.faqs));
  }

  return { '@context': 'https://schema.org', '@graph': nodes };
}
