import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

/**
 * The date the site is built "as of". Defaults to now. Set PUBLISH_AS_OF=YYYY-MM-DD to build
 * as if on that day, which includes scheduled posts so every gate can validate them early.
 */
export function publishAsOf(): Date {
  const override = import.meta.env.PUBLISH_AS_OF;
  if (override === undefined || override === "") return new Date();
  const date = new Date(`${override}T23:59:59Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`PUBLISH_AS_OF must be YYYY-MM-DD, got "${override}"`);
  }
  return date;
}

/** Published posts, newest first. A post dated after the build date is not built at all. */
export async function publishedPosts(): Promise<BlogPost[]> {
  const asOf = publishAsOf();
  const posts = await getCollection("blog", ({ data }) => data.publishedAt <= asOf);
  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || a.id.localeCompare(b.id),
  );
}

/**
 * The published posts a post names in `relatedPosts`. An id that is not a blog post at all fails
 * the build, so a typo cannot silently drop a link. A real post that is not yet published is skipped.
 */
export async function relatedPublishedPosts(post: BlogPost): Promise<BlogPost[]> {
  const all = await getCollection("blog");
  const known = new Set(all.map((entry) => entry.id));
  const unknown = post.data.relatedPosts.filter((id) => !known.has(id));
  if (unknown.length > 0) {
    throw new Error(`blog/${post.id}: relatedPosts names unknown post(s): ${unknown.join(", ")}`);
  }
  const published = await publishedPosts();
  return post.data.relatedPosts.flatMap((id) => published.filter((entry) => entry.id === id));
}

/** Whole minutes to read, at 220 words per minute, never below 1. */
export function readingMinutes(body: string | undefined): number {
  const words = (body ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
