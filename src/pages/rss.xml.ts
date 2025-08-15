import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
  const all = await getCollection("blog");
  const posts: CollectionEntry<"blog">[] = all.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: "Chae-ri.dev",
    description: "Chae-ri의 개발 블로그",
    site: site!,
    items: posts.map((post) => ({
      title: post.data.title,
      imoji: post.data.imoji,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>ko-kr</language>`,
  });
};
