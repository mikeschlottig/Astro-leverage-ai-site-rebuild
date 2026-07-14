import type { ImageMetadata } from "astro";

import daleyAngelOfGypsum from "../assets/case-studies/daley-organics/daleys-angel-of-gypsum.png";
import daleyBlackGold from "../assets/case-studies/daley-organics/DaleysBlackGold.png";
import daleyBoneMeal from "../assets/case-studies/daley-organics/daleys-bone-meal.png";
import daleyInfographic from "../assets/case-studies/daley-organics/DaleyOrganicsInfographic.png";
import daleyMycorrhizalHighway from "../assets/case-studies/daley-organics/daleys-mycorrhizal-highway.png";
import daleySeabirdGuano from "../assets/case-studies/daley-organics/daleys-seabird-guano.png";

export type CaseStudyPreview = {
  kind: "iframe";
  src: string;
  href: string;
  title: string;
  label: string;
  caption: string;
};

export type CaseStudyGalleryItem = {
  image: ImageMetadata;
  alt: string;
  title: string;
  caption: string;
  featured?: boolean;
};

export type CaseStudyGallery = {
  eyebrow: string;
  title: string;
  intro: string;
  items: CaseStudyGalleryItem[];
};

export type CaseStudyMedia = {
  previews?: CaseStudyPreview[];
  gallery?: CaseStudyGallery;
};

const caseStudyMedia: Record<string, CaseStudyMedia> = {
  "daley-organics": {
    previews: [
      {
        kind: "iframe",
        src: "https://daleyorganics.com",
        href: "https://daleyorganics.com",
        title: "Daley Organics live website preview",
        label: "Live site preview",
        caption: "The live surface that turned search visibility into a more credible buying experience.",
      },
      {
        kind: "iframe",
        src: "https://daleyorganics.com/research/",
        href: "https://daleyorganics.com/research/",
        title: "Daley Organics research report preview",
        label: "Research report",
        caption: "A long-form soil-science report that extends the brand from product sales into educational authority.",
      },
    ],
    gallery: {
      eyebrow: "Custom Content System",
      title: "Packaging, product education, and brand language built to reinforce the case study.",
      intro:
        "The visibility lift mattered because it landed on better proof. These pieces show how the Daley Organics story can extend from search and maps into shelf language, product clarity, and memorable visual identity.",
      items: [
        {
          image: daleyInfographic,
          alt: "Daley Organics infographic explaining the living-soil system and the six pillars of soil health.",
          title: "Living Soil explainer",
          caption:
            "A long-form educational asset that turns the product into something buyers can understand, share, and trust.",
          featured: true,
        },
        {
          image: daleyBlackGold,
          alt: "Daley Organics Black Gold label featuring illustrated compost characters in a cave-like soil scene.",
          title: "Black Gold compost label",
          caption:
            "A louder, memorable label concept that gives commodity soil language a distinct personality without losing product clarity.",
        },
        {
          image: daleyAngelOfGypsum,
          alt: "Daley Organics Angel of Gypsum bag art featuring a stylized ingredient illustration.",
          title: "Angel of Gypsum concept",
          caption:
            "Ingredient-specific artwork that makes amendments feel premium and recognizable instead of generic farm-supply inventory.",
        },
        {
          image: daleyBoneMeal,
          alt: "Daley Organics Bone Meal product art with a playful skeleton-driven nutrient concept.",
          title: "Bone Meal concept",
          caption:
            "A custom illustration lane for explaining nutrient role while keeping the packaging unmistakably local and ownable.",
        },
        {
          image: daleySeabirdGuano,
          alt: "Daley Organics Seabird Guano product art with bold seabird imagery and high-contrast packaging treatment.",
          title: "Seabird Guano concept",
          caption:
            "A stronger product-story treatment that turns a specialty input into a retail-facing visual hook.",
        },
        {
          image: daleyMycorrhizalHighway,
          alt: "Daley Organics Mycorrhizal Highway concept showing fungal network imagery tied to soil biology.",
          title: "Mycorrhizal Highway concept",
          caption:
            "A biology-first concept that helps explain why the soil system is valuable, not just what is in the bag.",
        },
      ],
    },
  },
  "oregon-smb-directory": {
    previews: [
      {
        kind: "iframe",
        src: "https://oregonsmbdirectory.com",
        href: "https://oregonsmbdirectory.com",
        title: "Oregon SMB Directory live website preview",
        label: "Live site preview",
        caption: "A working authority asset that shows the directory infrastructure behind the case study.",
      },
    ],
  },
};

export function getCaseStudyMedia(slug: string) {
  return caseStudyMedia[slug];
}
