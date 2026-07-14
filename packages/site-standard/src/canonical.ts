import type { SiteIdentity } from './types/index.js';

/**
 * Canonical URL policy — the single source of truth for both properties:
 *   • apex host (never www)
 *   • https
 *   • trailing slash ALWAYS on routes (matches Astro `trailingSlash: 'always'`
 *     + `build.format: 'directory'`); file paths (with an extension) keep
 *     their exact form
 *   • no query string, no fragment
 *
 * Exists so a canonical can never again point at a redirecting variant
 * (leverageai.network audit finding N4).
 */
export function ensureTrailingSlash(path: string): string {
  if (path === '' || path === '/') return '/';
  const lastSegment = path.slice(path.lastIndexOf('/') + 1);
  const isFile = lastSegment.includes('.');
  if (isFile) return path;
  return path.endsWith('/') ? path : `${path}/`;
}

export function canonicalFor(identity: SiteIdentity, path: string): string {
  const pathOnly = path.split('#')[0]?.split('?')[0] ?? '/';
  const normalized = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  return `${identity.url}${ensureTrailingSlash(normalized)}`;
}
