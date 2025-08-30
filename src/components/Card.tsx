import type { Component } from "solid-js";
import type { CollectionEntry } from "astro:content";

type Props = {
  post: CollectionEntry<"blog">;
  class?: string;
  priority?: boolean;
};

const Card: Component<Props> = (props) => {
  const { post } = props;
  const raw: any = post.data.image?.url;
  const imgSrc: string | undefined = typeof raw === "string" ? raw : raw?.src;
  const alt = post.data.image?.alt ?? post.data.title;

  const loading = props.priority ? "eager" : "lazy";
  const fetchpriority = props.priority ? "high" : "auto";
  const decoding = props.priority ? "sync" : "async";

  return (
    <a
      href={`/posts/${post.slug.split("/")[0]}/`}
      class={[
        "group",
        "pt-3 pb-2 px-4 flex items-center gap-5 rounded-2xl",
        "transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
        props.class ?? "",
      ].join(" ")}
    >
      <div
        class="hidden sm:block shrink-0 rounded-xl overflow-hidden w-40 aspect-[5/3] relative"
        aria-hidden="true"
        style={{ "background-color": "#FFD1E7" }}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={alt}
            loading={loading as "eager" | "lazy"}
            fetchpriority={fetchpriority as any}
            decoding={decoding as "sync" | "async"}
            width="320"
            height="192"
            sizes="160px"
            class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:scale-105"
            onLoad={(e) => (e.currentTarget.style.opacity = "1")}
            onError={(e) => (e.currentTarget.style.opacity = "1")}
            ref={(el) => {
              if (el.complete) el.style.opacity = "1";
            }}
          />
        ) : (
          <div class="absolute inset-0 grid place-items-center">
            <span class="text-3xl">{post.data.imoji}</span>
          </div>
        )}
      </div>

      <li class="flex flex-col w-[80ch] justify-between min-w-0">
        <div class="flex flex-col gap-1 min-w-0">
          <div class="text-xl font-semibold truncate">{post.data.title}</div>
          <div class="text-sm text-zinc-500 line-clamp-2">
            {post.data.description}
          </div>
        </div>
        <span class="mt-2 w-full flex flex-row-reverse text-sm text-zinc-400">
          {new Date(post.data.pubDate).toLocaleDateString("ko-KR")}
        </span>
      </li>
    </a>
  );
};

export default Card;
