import { defineSiteIdentity } from "@leverageai/site-standard";
import { defaultAuthor } from "../data/authors";

export const SITE = {
  name: "Leverage AI",
  legalName: "Leverage AI LLC",
  siteUrl: "https://leverageai.network",
  description:
    "AI search optimization, local SEO and fast lead response for Oregon service businesses. Get found, get chosen, get the inquiry answered.",
  location: "Grants Pass, Oregon",
  email: "mike@leverageai.network",
  phone: "541-450-2082",
  phoneHref: "tel:+15414502082",
  social: {
    linkedin: "https://www.linkedin.com/in/schlottig/",
    facebook: "https://www.facebook.com/p/Leverageai-LLC-61575834658691/",
    github: "https://github.com/mikeschlottig",
    instagram: "https://www.instagram.com/mikeschlottig44/",
  },
  nav: [
    { href: "/services/", label: "Services" },
    { href: "/industries/", label: "Industries" },
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

export const OG_IMAGES = {
  default: `${SITE.siteUrl}/images/og/leverage-ai-default.jpg`,
  oregonVoyager: `${SITE.siteUrl}/images/og/oregon-voyager-interview.jpg`,
} as const;

export const SOCIAL_PROFILES = [
  { label: "LinkedIn", href: SITE.social.linkedin },
  { label: "Facebook", href: SITE.social.facebook },
  { label: "GitHub", href: SITE.social.github },
  { label: "Instagram", href: SITE.social.instagram },
] as const;

export const IDENTITY = defineSiteIdentity({
  url: SITE.siteUrl,
  name: SITE.name,
  legalName: SITE.legalName,
  description: SITE.description,
  logoUrl: `${SITE.siteUrl}/images/leverage-ai-mark.svg`,
  defaultOgImageUrl: OG_IMAGES.default,
  email: SITE.email,
  telephone: "+1-541-450-2082",
  address: {
    addressLocality: "Grants Pass",
    addressRegion: "OR",
    addressCountry: "US",
  },
  founder: {
    name: defaultAuthor.name,
    jobTitle: defaultAuthor.role,
    imageUrl: `${SITE.siteUrl}${defaultAuthor.image.src}`,
    sameAs: defaultAuthor.sameAs,
  },
  sameAs: Object.values(SITE.social),
  areaServed: [
    "Oregon",
    "Albany",
    "Ashland",
    "Bend",
    "Corvallis",
    "Eugene",
    "Grants Pass",
    "Klamath Falls",
    "Medford",
    "Portland",
    "Roseburg",
    "Salem",
    "Springfield",
  ],
});
