import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
  const all = await getCollection("blog");

  const posts: CollectionEntry<"blog">[] = all.sort(
    (a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
  );

  const toRoute = (slug: string) => `/posts/${slug.split("/")[0]}/`;

  return rss({
    title: "Chae-ri.dev",
    description: "Chae-ri의 개발 블로그",
    site: site ?? new URL("https://chae-ri.dev/"),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? "",
      pubDate: new Date(post.data.pubDate),
      link: toRoute(post.slug),
    })),
    customData: `<language>ko-kr</language>`,
  });
};