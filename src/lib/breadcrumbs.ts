import type { BreadcrumbItem } from "@leverageai/site-standard";
import { canonicalFor } from "@leverageai/site-standard";
import { IDENTITY } from "./site";

const sectionLabels: Record<string, string> = {
  about: "About",
  accessibility: "Accessibility",
  blog: "Blog",
  contact: "Contact",
  industries: "Industries",
  "intellectual-property": "Intellectual Property",
  "knowledge-base": "Knowledge Base",
  locations: "Locations",
  portfolio: "Portfolio",
  pricing: "Pricing",
  privacy: "Privacy",
  reports: "Reports",
  services: "Services",
  terms: "Terms",
};

const titleFromSlug = (segment: string) =>
  segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function breadcrumbItems(path: string, pageName: string): BreadcrumbItem[] {
  const segments = path.split("/").filter(Boolean);

  if (segments.length === 0) {
    return [{ name: "Home" }];
  }

  return [
    { name: "Home", url: canonicalFor(IDENTITY, "/") },
    ...segments.map((segment, index) => {
      const isCurrent = index === segments.length - 1;
      const itemPath = `/${segments.slice(0, index + 1).join("/")}/`;
      const name = isCurrent ? pageName : sectionLabels[segment] ?? titleFromSlug(segment);

      return isCurrent
        ? { name }
        : { name, url: canonicalFor(IDENTITY, itemPath) };
    }),
  ];
}
