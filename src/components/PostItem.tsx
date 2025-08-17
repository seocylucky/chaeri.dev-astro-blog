import type { Component } from "solid-js";
import type { CollectionEntry } from "astro:content";

type Props = {
  post: CollectionEntry<"blog">;
  class?: string;
};

const PostItem: Component<Props> = (props) => {
  const { post } = props;
  return (
    <a
      href={`/posts/${post.slug}/`}
      class="pt-3 pb-2 px-4 flex items-center gap-5 rounded-2xl hover:bg-[#FFD1E7] dark:hover:text-black"
    >
      <div class="flex items-center justify-center gap-2 bg-[#FFD1E7] w-15 h-15 rounded-full">
        <span class="text-4xl pt-1.5">{post.data.imoji}</span>
      </div>

      <li class={`flex items-center w-[88%] ${props.class} text-[20px] overflow-hidden shrink-0`}>
        <div class="text-xl truncate">{post.data.title}</div>
        <span class="ml-4 text-sm text-zinc-400 shrink-0">
          {post.data.pubDate.toLocaleDateString()}
        </span>
      </li>
    </a>
  );
};

export default PostItem;
