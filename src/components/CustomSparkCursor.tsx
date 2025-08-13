import { onCleanup, onMount, type Component } from "solid-js";

type Props = {
  color?: "random" | string;
  count?: number;
  hideNativeCursor?: boolean;
  cursorUrl?: string;
  hotspot?: { x: number; y: number };
};

const CustomSparkleCursor: Component<Props> = (props) => {
  const colour = props.color ?? "random";
  const sparkles = Math.max(8, Math.min(props.count ?? 50, 50));

  let x = 400,
    y = 300,
    ox = 400,
    oy = 300;
  let swide = 800,
    shigh = 600,
    sleft = 0,
    sdown = 0;

  const tiny: HTMLDivElement[] = [];
  const star: HTMLDivElement[] = [];
  const starv = new Array<number>(sparkles).fill(0);
  const starx = new Array<number>(sparkles).fill(0);
  const stary = new Array<number>(sparkles).fill(0);
  const tinyv = new Array<number>(sparkles).fill(0);
  const tinyx = new Array<number>(sparkles).fill(0);
  const tinyy = new Array<number>(sparkles).fill(0);

  let rafId = 0;

  onMount(() => {
    if (typeof window === "undefined" || !document?.body) return;

    const prevCursorHtml = document.documentElement.style.cursor;
    const prevCursorBody = document.body.style.cursor;
    if (props.hideNativeCursor) {
      if (props.cursorUrl) {
        const xHot = props.hotspot?.x ?? 16;
        const yHot = props.hotspot?.y ?? 16;
        document.documentElement.style.cursor = `url("${props.cursorUrl}") ${xHot} ${yHot}, none`;
        document.body.style.cursor = `url("${props.cursorUrl}") ${xHot} ${yHot}, none`;
      } else {
        document.documentElement.style.cursor = "none";
      }
    } else if (props.cursorUrl) {
      const xHot = props.hotspot?.x ?? 16;
      const yHot = props.hotspot?.y ?? 16;
      document.body.style.cursor = `url("${props.cursorUrl}") ${xHot} ${yHot}, auto`;
    }

    for (let i = 0; i < sparkles; i++) {
      const t = createDiv(3, 3);
      t.style.visibility = "hidden";
      t.style.zIndex = "9999";
      t.style.willChange = "transform, opacity, left, top, width, height";
      document.body.appendChild((tiny[i] = t));
      tinyv[i] = 0;

      const s = createDiv(5, 5);
      s.style.backgroundColor = "transparent";
      s.style.visibility = "hidden";
      s.style.zIndex = "9999";
      s.style.willChange = "transform, opacity, left, top, clip";

      const rlef = createDiv(1, 5);
      const rdow = createDiv(5, 1);
      rlef.style.position = "absolute";
      rdow.style.position = "absolute";
      rlef.style.top = "2px";
      rlef.style.left = "0px";
      rdow.style.top = "0px";
      rdow.style.left = "2px";

      s.appendChild(rlef);
      s.appendChild(rdow);
      document.body.appendChild((star[i] = s));
      starv[i] = 0;
    }

    setViewport();
    const moveHandler = (e: MouseEvent) => {
      x = e.pageX;
      y = e.pageY;
    };
    const scrollHandler = () => setScroll();
    const resizeHandler = () => setViewport();

    window.addEventListener("mousemove", moveHandler, { passive: true });
    window.addEventListener("scroll", scrollHandler, { passive: true });
    window.addEventListener("resize", resizeHandler, { passive: true });

    const loop = () => {
      sparkleStep();
      rafId = window.requestAnimationFrame(loop);
    };
    rafId = window.requestAnimationFrame(loop);

    onCleanup(() => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", resizeHandler);
      if (rafId) cancelAnimationFrame(rafId);
      for (let i = 0; i < sparkles; i++) {
        star[i]?.remove();
        tiny[i]?.remove();
      }
      document.documentElement.style.cursor = prevCursorHtml;
      document.body.style.cursor = prevCursorBody;
    });
  });

  function sparkleStep() {
    if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
      ox = x;
      oy = y;
      for (let c = 0; c < sparkles; c++) {
        if (!starv[c]) {
          star[c].style.left = (starx[c] = x) + "px";
          star[c].style.top = (stary[c] = y + 1) + "px";
          star[c].style.clip = "rect(0px, 5px, 5px, 0px)";

          const col = colour === "random" ? randomColor() : colour;
          (star[c].childNodes[0] as HTMLElement).style.backgroundColor = col;
          (star[c].childNodes[1] as HTMLElement).style.backgroundColor = col;

          star[c].style.visibility = "visible";
          starv[c] = 50;
          break;
        }
      }
    }

    for (let c = 0; c < sparkles; c++) {
      if (starv[c]) updateStar(c);
      if (tinyv[c]) updateTiny(c);
    }
  }

  function updateStar(i: number) {
    if (--starv[i] === 25) {
      star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
    }
    if (starv[i]) {
      stary[i] += 1 + Math.random() * 3;
      starx[i] += ((i % 5) - 2) / 5;
      if (stary[i] < shigh + sdown) {
        star[i].style.top = stary[i] + "px";
        star[i].style.left = starx[i] + "px";
      } else {
        star[i].style.visibility = "hidden";
        starv[i] = 0;
      }
    } else {
      tinyv[i] = 50;
      tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
      tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
      tiny[i].style.width = "2px";
      tiny[i].style.height = "2px";
      tiny[i].style.backgroundColor = (star[i].childNodes[0] as HTMLElement).style.backgroundColor;
      star[i].style.visibility = "hidden";
      tiny[i].style.visibility = "visible";
      tiny[i].style.opacity = "1";
    }
  }

  function updateTiny(i: number) {
    if (--tinyv[i] === 25) {
      tiny[i].style.width = "1px";
      tiny[i].style.height = "1px";
    }
    if (tinyv[i]) {
      tinyy[i] += 1 + Math.random() * 3;
      tinyx[i] += ((i % 5) - 2) / 5;
      if (tinyy[i] < shigh + sdown) {
        tiny[i].style.top = tinyy[i] + "px";
        tiny[i].style.left = tinyx[i] + "px";
        const op = Math.max(0, tinyv[i] / 50);
        tiny[i].style.opacity = op.toString();
      } else {
        tiny[i].style.visibility = "hidden";
        tinyv[i] = 0;
      }
    } else {
      tiny[i].style.visibility = "hidden";
    }
  }

  function setScroll() {
    if (typeof (self as any).pageYOffset === "number") {
      sdown = (self as any).pageYOffset;
      sleft = (self as any).pageXOffset;
    } else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
      sdown = document.body.scrollTop;
      sleft = document.body.scrollLeft;
    } else if (
      document.documentElement &&
      (document.documentElement.scrollTop || document.documentElement.scrollLeft)
    ) {
      sleft = document.documentElement.scrollLeft ?? 0;
      sdown = document.documentElement.scrollTop ?? 0;
    } else {
      sdown = 0;
      sleft = 0;
    }
  }

  function setViewport() {
    let sw_min = 999999,
      sh_min = 999999;
    if (document.documentElement) {
      if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
      if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
    }
    if (typeof self.innerWidth === "number" && (self as any).innerWidth) {
      if ((self as any).innerWidth > 0 && (self as any).innerWidth < sw_min)
        sw_min = (self as any).innerWidth;
      if ((self as any).innerHeight > 0 && (self as any).innerHeight < sh_min)
        sh_min = (self as any).innerHeight;
    }
    if (document.body.clientWidth) {
      if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min)
        sw_min = document.body.clientWidth;
      if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min)
        sh_min = document.body.clientHeight;
    }
    if (sw_min === 999999 || sh_min === 999999) {
      sw_min = 800;
      sh_min = 600;
    }
    swide = sw_min;
    shigh = sh_min;
  }

  function createDiv(height: number, width: number) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = `${height}px`;
    div.style.width = `${width}px`;
    div.style.overflow = "hidden";
    div.style.filter = "drop-shadow(0 0 3px rgba(255, 77, 140, .8))";
    return div;
  }

  function randomColor() {
    const c = [255, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
    c.sort(() => 0.5 - Math.random());
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  }

  return null;
};

export default CustomSparkleCursor;
