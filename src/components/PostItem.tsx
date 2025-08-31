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
      href={`/posts/${post.slug.split('/')[0]}/`}
      class="flex items-center gap-3 sm:gap-5 rounded-2xl 
         hover:bg-[#FFD1E7] dark:hover:text-black
         transition-colors duration-150 ease-in-out"
    >
      <div class="flex items-center justify-center bg-[#FFD1E7] w-[44px] h-[44px] sm:w-[60px] sm:h-[60px] rounded-full">
        <span class="text-[28px] sm:text-4xl sm:pt-0">{post.data.imoji}</span>
      </div>

      <li class={`flex items-center w-[82%] sm:[88%] ${props.class} text-[20px] overflow-hidden shrink-0`}>
        <div class="text-[18px] text-wrap sm:text-nowrap sm:text-xl line-clamp-2 truncate">{post.data.title}</div>
        <span class="ml-4 text-sm text-zinc-400 shrink-0">
          {post.data.pubDate.toLocaleDateString()}
        </span>
      </li>
    </a>
  );
};

export default PostItem;
