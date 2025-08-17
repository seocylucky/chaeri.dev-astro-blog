import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      imoji: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      author: z.string().default("Chaeyeon Seo"),
      tags: z.array(z.string()).default([]),
      image: z
        .object({
          url: image().optional(),
          alt: z.string(),
        })
        .optional(),
    }),
});

export const collections = { blog };
