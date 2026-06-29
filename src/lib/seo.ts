import { SITE } from "./site";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.siteUrl).toString();
}

export function pageTitle(title?: string) {
  return title ? `${title} | ${SITE.name}` : SITE.name;
}
