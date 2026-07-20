"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type SmoothScrollTarget = number | string | HTMLElement;

interface SmoothScrollToOptions {
  duration?: number;
  easing?: (value: number) => number;
  immediate?: boolean;
  lock?: boolean;
  force?: boolean;
  onComplete?: () => void;
}

interface SmoothScrollBridge {
  start: () => void;
  stop: () => void;
  scrollTo: (target: SmoothScrollTarget, options?: SmoothScrollToOptions) => void;
}

declare global {
  interface Window {
    __lenis?: SmoothScrollBridge;
  }
}

/**
 * Runs Lenis below the hero while giving the hero exclusive ownership of its
 * pinned checkpoints. The public bridge keeps programmatic transitions in
 * sync with the same Lenis instance and its internal stopped state.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      lerp: reducedMotion ? 1 : 0.12,
      orientation: "vertical",
      smoothWheel: !reducedMotion,
      overscroll: false,
      autoRaf: true,
    });

    let isStopped = false;

    const bridge: SmoothScrollBridge = {
      start: () => {
        if (!isStopped) return;
        lenis.start();
        isStopped = false;
      },
      stop: () => {
        if (isStopped) return;
        lenis.stop();
        isStopped = true;
      },
      scrollTo: (target, options) => {
        lenis.scrollTo(target, options);
      },
    };

    const syncScrollOwner = () => {
      const hero = document.getElementById("hero-main-container");
      if (!hero) {
        bridge.start();
        return;
      }

      const stickyEndY =
        hero.offsetTop + Math.max(0, hero.offsetHeight - window.innerHeight);
      const heroOwnsScroll = window.scrollY < stickyEndY - 0.5;

      if (heroOwnsScroll) bridge.stop();
      else bridge.start();
    };

    window.__lenis = bridge;
    window.addEventListener("scroll", syncScrollOwner, { passive: true });
    window.addEventListener("resize", syncScrollOwner, { passive: true });
    syncScrollOwner();

    return () => {
      if (window.__lenis === bridge) delete window.__lenis;
      window.removeEventListener("scroll", syncScrollOwner);
      window.removeEventListener("resize", syncScrollOwner);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
