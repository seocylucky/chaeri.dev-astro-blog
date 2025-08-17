import type { Component } from "solid-js";
import type { CollectionEntry } from "astro:content";

type Props = {
  post: CollectionEntry<"blog">;
  class?: string;
};

const Card: Component<Props> = (props) => {
  const { post } = props;
  const meta = post.data.image?.url;

  return (
    <a
      href={`/posts/${post.slug}/`}
      class={[
        "group",
        "pt-3 pb-2 px-4 flex items-center gap-5 rounded-2xl",
        props.class ?? "",
      ].join(" ")}
    >
      <div class="w-40 h-24 rounded-xl overflow-hidden shrink-0 bg-[#FFD1E7]" aria-hidden="true">
        {meta ? (
          <img
            src={meta.src}
            width={meta.width}
            height={meta.height}
            alt={post.data.image?.alt ?? post.data.title}
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
          />
        ) : (
          <div class="w-full h-full grid place-items-center">
            <span class="text-3xl">{post.data.imoji}</span>
          </div>
        )}
      </div>

      <li class="flex flex-col w-[80ch] justify-between min-w-0">
        <div class="flex flex-col gap-1 min-w-0">
          <div class="text-xl font-semibold truncate overflow-hidden">{post.data.title}</div>
          <div class="text-sm text-zinc-500 line-clamp-2 overflow-hidden">
            {post.data.description}
          </div>
        </div>
        <span class="mt-2 w-full flex flex-row-reverse text-sm text-zinc-400">
          {post.data.pubDate.toLocaleDateString()}
        </span>
      </li>
    </a>
  );
};

export default Card;
