import { defineSiteIdentity } from "@leverageai/site-standard";
import { defaultAuthor } from "../data/authors";

export const SITE = {
  name: "Leverage AI",
  legalName: "Leverage AI LLC",
  siteUrl: "https://leverageai.network",
  description:
    "Outcome-led websites, local visibility systems, and lead-response infrastructure for Oregon service businesses.",
  location: "Grants Pass, Oregon",
  email: "mike@leverageai.network",
  phone: "(541) 000-0000",
  social: {
    linkedin: "https://www.linkedin.com/in/schlottig/",
    github: "https://github.com/mikeschlottig",
    instagram: "https://www.instagram.com/mikeschlottig44/",
  },
  nav: [
    { href: "/services/", label: "Services" },
    { href: "/portfolio/", label: "Portfolio" },
    { href: "/pricing/", label: "Pricing" },
    { href: "/blog/", label: "Blog" },
    { href: "/reports/", label: "Reports" },
    { href: "/locations/", label: "Locations" },
    { href: "/knowledge-base/", label: "Knowledge Base" },
    { href: "/about/", label: "About" },
    { href: "/contact/", label: "Contact" },
  ],
};

export const IDENTITY = defineSiteIdentity({
  url: SITE.siteUrl,
  name: SITE.name,
  legalName: SITE.legalName,
  description: SITE.description,
  logoUrl: `${SITE.siteUrl}/images/leverage-ai-mark.svg`,
  defaultOgImageUrl: `${SITE.siteUrl}${defaultAuthor.image}`,
  email: SITE.email,
  address: {
    addressLocality: "Grants Pass",
    addressRegion: "OR",
    addressCountry: "US",
  },
  founder: {
    name: defaultAuthor.name,
    jobTitle: defaultAuthor.role,
    imageUrl: `${SITE.siteUrl}${defaultAuthor.image}`,
    sameAs: defaultAuthor.sameAs,
  },
  sameAs: Object.values(SITE.social),
  areaServed: ["Oregon", "Grants Pass", "Medford", "Ashland", "Bend"],
});
