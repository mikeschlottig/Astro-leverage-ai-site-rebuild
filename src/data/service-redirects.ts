/**
 * Permanent redirects for service URLs that moved when services were reorganized into hubs.
 * Keys and values are normalized paths with a leading and trailing slash.
 * Every value is a live page: no entry points at another entry, so each redirect is one hop.
 */
export const SERVICE_REDIRECTS: Readonly<Record<string, string>> = {
  "/services/custom-web-design/": "/services/website-design/",
  "/services/local-visibility/": "/services/local-seo/",
  "/services/google-business-profile-optimization/":
    "/services/local-seo/google-business-profile-optimization/",
  "/services/local-seo-consulting/": "/services/local-seo/local-seo-consultant/",
  "/services/lead-capture-ai-follow-up/": "/services/lead-capture-and-ai-follow-up/",
  "/services/search-data-architecture/":
    "/services/ai-search-optimization/search-data-architecture/",
  "/services/software-development/": "/services/automation-and-ai-systems/",
  // Internet Marketing Services hub retired; AI Search Optimization and Lead Capture became hubs.
  "/services/internet-marketing-services/": "/services/ai-search-optimization/",
  "/services/internet-marketing-services/ai-search-optimization/": "/services/ai-search-optimization/",
  "/services/internet-marketing-services/ai-search-optimization/search-data-architecture/":
    "/services/ai-search-optimization/search-data-architecture/",
  "/services/internet-marketing-services/lead-capture-and-ai-follow-up/":
    "/services/lead-capture-and-ai-follow-up/",
  "/services/internet-marketing-services/social-media-management/":
    "/services/local-seo/social-media-management/",
};

export function normalizeServicePath(pathname: string): string {
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}
