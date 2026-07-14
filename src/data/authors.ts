export type AuthorProfile = {
  id: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  image: string;
  imageAlt: string;
  bio: string;
  expertise: string[];
  sameAs: string[];
};

export const authors = {
  mikeSchlottig: {
    id: "mike-schlottig",
    name: "Mike Schlottig",
    role: "Founder and systems strategist",
    organization: "Leverage AI",
    location: "Grants Pass, Oregon",
    image: "/images/founder/mike-schlottig.jpg",
    imageAlt: "Mike Schlottig, founder of Leverage AI",
    bio: "Mike works directly with Oregon service businesses on local visibility, website strategy, market research, and lead-response systems. His focus is practical: find where good demand is being lost, fix that constraint, and measure whether the work creates better business outcomes.",
    expertise: [
      "Local search and market visibility",
      "Website and content architecture",
      "Lead capture and response systems",
      "Oregon service-business research",
    ],
    sameAs: [
      "https://www.linkedin.com/in/schlottig/",
      "https://github.com/mikeschlottig",
      "https://www.instagram.com/mikeschlottig44/",
    ],
  },
} satisfies Record<string, AuthorProfile>;

export const defaultAuthor = authors.mikeSchlottig;
