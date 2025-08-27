import { onMount, onCleanup } from "solid-js";

export default function Comment() {
  let container!: HTMLDivElement;
  let mounted = false;
  let observer: MutationObserver | null = null;

  function mount(dark: boolean) {
    if (typeof document === "undefined" || !container) return;
    if (mounted) return; 

    const s = document.createElement("script");
    s.src = "https://utteranc.es/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.setAttribute("repo", "seocylucky/chaeri.dev-astro-blog");
    s.setAttribute("issue-term", "pathname");
    s.setAttribute("theme", dark ? "dark-blue" : "github-light");
    container.innerHTML = "";
    container.appendChild(s);
    mounted = true;
  }

  function setUtterancesTheme(dark: boolean) {
    const iframe = container?.querySelector<HTMLIFrameElement>("iframe.utterances-frame");
    iframe?.contentWindow?.postMessage(
      { type: "set-theme", theme: dark ? "dark-blue" : "github-light" },
      "https://utteranc.es"
    );
  }

  onMount(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const initialDark = document.documentElement.classList.contains("dark");
    mount(initialDark);

    observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      setUtterancesTheme(dark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onThemeChange = (e: Event) => {
      const dark = !!(e as CustomEvent).detail?.dark;
      setUtterancesTheme(dark);
    };
    window.addEventListener("themechange", onThemeChange);

    onCleanup(() => {
      window.removeEventListener("themechange", onThemeChange);
      observer?.disconnect();
    });
  });

  return <div ref={(el) => (container = el)} />;
}
