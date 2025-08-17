import { createSignal, onMount } from "solid-js";

function getInitial(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export const [isDark, setIsDark] = createSignal<boolean>(getInitial());

export function applyTheme(d = isDark()) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", d);
  localStorage.setItem("theme", d ? "dark" : "light");
}

onMount(() => applyTheme(isDark()));
