import type { CollectionEntry } from "astro:content";
import type { BreadcrumbItem } from "@leverageai/site-standard";
import { canonicalFor } from "@leverageai/site-standard";
import { IDENTITY, SITE } from "./site";

export type ServiceEntry = CollectionEntry<"services">;
export type ServiceKind = ServiceEntry["data"]["kind"];

export type ServiceNode = {
  readonly entry: ServiceEntry;
  readonly slug: string;
  /** Absolute site path with leading and trailing slash, e.g. /services/local-seo/entity-seo-audits/ */
  readonly path: string;
  readonly parent: ServiceNode | null;
  readonly children: ServiceNode[];
};

export type ServiceTree = ReadonlyMap<string, ServiceNode>;

export class ServiceTreeError extends Error {
  constructor(message: string) {
    super(`[services] ${message}`);
    this.name = "ServiceTreeError";
  }
}

const SERVICES_ROOT = "/services/";
const MAX_META_TITLE = 60;
const MAX_META_DESCRIPTION = 160;

const allowedParentKinds: Record<ServiceKind, readonly ServiceKind[]> = {
  hub: [],
  subhub: ["hub"],
  spoke: ["hub", "subhub"],
};

export function slugifyPhrase(phrase: string): string {
  return phrase
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Semantic sync rule: the slug, meta title and H1 must all contain the same key phrase.
 * Fails the build instead of shipping a page whose three signals disagree.
 */
function assertPhraseSync(entry: ServiceEntry): void {
  const { phrase, title, heroTitle } = entry.data;
  const needle = phrase.toLowerCase();
  if (slugifyPhrase(phrase) !== entry.id) {
    throw new ServiceTreeError(
      `"${entry.id}": slug does not match phrase "${phrase}" (expected "${slugifyPhrase(phrase)}")`,
    );
  }
  if (!title.toLowerCase().includes(needle)) {
    throw new ServiceTreeError(`"${entry.id}": title "${title}" does not contain phrase "${phrase}"`);
  }
  const metaTitle = `${title} | ${SITE.name}`;
  if (metaTitle.length > MAX_META_TITLE) {
    throw new ServiceTreeError(`"${entry.id}": meta title is ${metaTitle.length} characters, limit ${MAX_META_TITLE}`);
  }
  if (entry.data.description.length > MAX_META_DESCRIPTION) {
    throw new ServiceTreeError(
      `"${entry.id}": description is ${entry.data.description.length} characters, limit ${MAX_META_DESCRIPTION}`,
    );
  }
  const h1 = heroTitle ?? title;
  if (!h1.toLowerCase().includes(needle)) {
    throw new ServiceTreeError(`"${entry.id}": H1 "${h1}" does not contain phrase "${phrase}"`);
  }
}

export function buildServiceTree(entries: readonly ServiceEntry[]): ServiceTree {
  const byId = new Map<string, ServiceEntry>();
  for (const entry of entries) {
    if (byId.has(entry.id)) {
      throw new ServiceTreeError(`duplicate service slug "${entry.id}"`);
    }
    assertPhraseSync(entry);
    byId.set(entry.id, entry);
  }

  const pathCache = new Map<string, string>();
  const resolvePath = (id: string, trail: readonly string[]): string => {
    const cached = pathCache.get(id);
    if (cached !== undefined) return cached;
    if (trail.includes(id)) {
      throw new ServiceTreeError(`cycle detected: ${[...trail, id].join(" > ")}`);
    }
    const entry = byId.get(id);
    if (entry === undefined) {
      throw new ServiceTreeError(`unknown service "${id}"`);
    }
    const { kind, parent } = entry.data;
    let path: string;
    if (parent === undefined) {
      if (kind !== "hub") {
        throw new ServiceTreeError(`"${id}" is a ${kind} but has no parent`);
      }
      path = `${SERVICES_ROOT}${id}/`;
    } else {
      const parentEntry = byId.get(parent);
      if (parentEntry === undefined) {
        throw new ServiceTreeError(`"${id}" names missing parent "${parent}"`);
      }
      if (!allowedParentKinds[kind].includes(parentEntry.data.kind)) {
        throw new ServiceTreeError(
          `"${id}" (${kind}) cannot sit under "${parent}" (${parentEntry.data.kind})`,
        );
      }
      path = `${resolvePath(parent, [...trail, id])}${id}/`;
    }
    pathCache.set(id, path);
    return path;
  };

  const nodes = new Map<string, { entry: ServiceEntry; path: string; children: ServiceNode[] }>();
  for (const [id, entry] of byId) {
    nodes.set(id, { entry, path: resolvePath(id, []), children: [] });
  }

  const tree = new Map<string, ServiceNode>();
  const build = (id: string): ServiceNode => {
    const existing = tree.get(id);
    if (existing !== undefined) return existing;
    const raw = nodes.get(id);
    if (raw === undefined) throw new ServiceTreeError(`unknown service "${id}"`);
    const parentId = raw.entry.data.parent;
    const node: ServiceNode = {
      entry: raw.entry,
      slug: id,
      path: raw.path,
      parent: parentId === undefined ? null : build(parentId),
      children: raw.children,
    };
    tree.set(id, node);
    return node;
  };

  for (const id of byId.keys()) build(id);
  for (const node of tree.values()) {
    node.parent?.children.push(node);
  }
  for (const node of tree.values()) {
    node.children.sort((a, b) => a.entry.data.order - b.entry.data.order);
  }
  return tree;
}

export function hubsOf(tree: ServiceTree): ServiceNode[] {
  return [...tree.values()]
    .filter((node) => node.entry.data.kind === "hub")
    .sort((a, b) => a.entry.data.order - b.entry.data.order);
}

export function siblingsOf(node: ServiceNode): ServiceNode[] {
  return (node.parent?.children ?? []).filter((sibling) => sibling.slug !== node.slug);
}

export function servicePath(tree: ServiceTree, slug: string): string | undefined {
  return tree.get(slug)?.path;
}

export function serviceBreadcrumbs(node: ServiceNode): BreadcrumbItem[] {
  const chain: ServiceNode[] = [];
  for (let cursor: ServiceNode | null = node; cursor !== null; cursor = cursor.parent) {
    chain.unshift(cursor);
  }
  return [
    { name: "Home", url: canonicalFor(IDENTITY, "/") },
    { name: "Services", url: canonicalFor(IDENTITY, SERVICES_ROOT) },
    ...chain.map((item) =>
      item.slug === node.slug
        ? { name: item.entry.data.navLabel }
        : { name: item.entry.data.navLabel, url: canonicalFor(IDENTITY, item.path) },
    ),
  ];
}

/** Route param for the catch-all route: path without leading /services/ and trailing slash. */
export function routeParam(node: ServiceNode): string {
  return node.path.slice(SERVICES_ROOT.length, -1);
}
