import { onMount, onCleanup } from "solid-js";

export default function Comment() {
  let container!: HTMLDivElement;

  function mount(dark: boolean) {
    if (typeof document === "undefined" || !container) return;
    container.innerHTML = "";
    const s = document.createElement("script");
    s.src = "https://utteranc.es/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.setAttribute("repo", "seocylucky/chaeri.dev-astro-blog");
    s.setAttribute("issue-term", "pathname");
    s.setAttribute("theme", dark ? "dark-blue" : "github-light");
    container.appendChild(s);
  }

  onMount(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const onThemeChange = (e: Event) => {
      const dark = !!(e as CustomEvent).detail?.dark;
      mount(dark);
    };

    const initialDark = document.documentElement.classList.contains("dark");
    mount(initialDark);

    window.addEventListener("themechange", onThemeChange);

    onCleanup(() => {
      window.removeEventListener("themechange", onThemeChange);
      if (container) container.innerHTML = "";
    });
  });

  return <div ref={(el) => (container = el)} />;
}
