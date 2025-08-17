import { type Component } from "solid-js";

const Navigation: Component = () => {
  const currentPath = window.location.pathname;

  return (
    <div class="nav-links flex gap-2">
      <a href="/" class={`nav-link ${currentPath === "/" ? "active" : ""}`}>
        Home
      </a>
      <a href="/about" class={`nav-link ${currentPath === "/about" ? "active" : ""}`}>
        About
      </a>
      <a
        href="/posts"
        class={`nav-link ${
          currentPath.startsWith("/posts/") || currentPath.startsWith("/tags/") ? "active" : ""
        }`}
      >
        Posts
      </a>
      <a href="/guestbook" class={`nav-link ${currentPath === "/guestbook" ? "active" : ""}`}>
        Guestbook
      </a>
    </div>
  );
};

export default Navigation;
