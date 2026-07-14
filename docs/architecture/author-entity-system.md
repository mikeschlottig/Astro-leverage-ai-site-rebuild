# Author And Entity System

Date: 2026-06-30

## Purpose

Provide one programmatic author identity for visible trust building and structured entity recognition without duplicating biography copy across content files.

## Source of truth

`src/data/authors.ts` contains the portable `AuthorProfile` contract and the default Mike Schlottig profile.

The profile includes:

- stable entity ID
- name and role
- organization and location
- portrait and alt text
- short biography
- expertise topics
- authoritative `sameAs` profiles

## Rendering

`src/components/site/AboutAuthor.astro` renders the visible author block. It accepts:

- `author`: an `AuthorProfile`
- `heading`: contextual label such as `Report author` or `Case study author`

The component is currently used on:

- blog articles
- reports
- knowledge-base articles
- industry pages
- service detail pages
- case studies

## Structured data

`packages/site-standard` emits one stable `Person` node at `/#founder` from the identity configured
in `src/lib/site.ts`.

- the Organization references Mike as founder;
- every Article references the same Person `@id`;
- `sameAs`, expertise, image, role, and organization stay synchronized with the visible author configuration.

## Reuse in Daley Organics and Oregon SMB Directory

Copy the `AuthorProfile` type and component interface into each Astro project, then supply a site-specific profile rather than hard-coding a biography into templates.

Recommended examples:

- Daley Organics: use the relevant founder, farm operator, soil educator, or named subject-matter reviewer.
- Oregon SMB Directory: use the directory editor, researcher, or contributing business author.

Each site should keep its own canonical Person URL, portrait permission, accurate role, and verified `sameAs` links. Do not point every site to the Leverage AI Person entity unless Mike is genuinely the author or reviewer of that page.
