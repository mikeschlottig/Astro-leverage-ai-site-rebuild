/**
 * Permanent redirects for service URLs that moved when services were reorganized into hubs.
 * Keys and values are normalized paths with a leading and trailing slash.
 */
export const SERVICE_REDIRECTS: Readonly<Record<string, string>> = {
  "/services/custom-web-design/": "/services/website-design/",
  "/services/local-visibility/": "/services/local-seo/",
  "/services/lead-capture-ai-follow-up/":
    "/services/internet-marketing-services/lead-capture-and-ai-follow-up/",
  "/services/search-data-architecture/":
    "/services/internet-marketing-services/ai-search-optimization/search-data-architecture/",
};

export function normalizeServicePath(pathname: string): string {
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}
