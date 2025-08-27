type TagsProps = {
  tag: string;
  pageTitle: string;
};

const Tags = ({ tag, pageTitle }: TagsProps) => {
  const isActive = tag === pageTitle;
  const href = tag === "ALL" ? "/posts" : `/tags/${encodeURIComponent(tag)}/`;

  const classes = [
    "text-nowrap mt-3 inline-flex items-center rounded-[6px] px-3 py-1 text-m transition-colors",
    "text-gray-300",
    "hover:bg-[#FFF5E8] hover:text-gray-500",
    isActive && "bg-[#FFD1E7] !text-black",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      class={classes}
      data-active={isActive ? "true" : "false"}    
      aria-current={isActive ? "page" : undefined}  
    >
      #{tag}
    </a>
  );
};

export default Tags;
