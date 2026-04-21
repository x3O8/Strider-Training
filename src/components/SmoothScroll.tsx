"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth scroll for all sections BELOW the hero.
 * Lenis is paused while we're in the hero scroll-hijack zone (scrollY < 4*vh),
 * and becomes active once the user is past it.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      orientation: "vertical",
      smoothWheel: true,
    });

    let isStopped = false;

    // Pause Lenis when inside hero zone so our custom scroll hijack works
    const checkZone = () => {
      const hero = document.getElementById("hero-main-container");
      if (!hero) {
        if (isStopped) {
          lenis.start();
          isStopped = false;
        }
        return;
      }

      // 3 snap checkpoints = 3 * 100vh.
      const heroEnd = 3 * window.innerHeight - 10;
      if (window.scrollY < heroEnd) {
        if (!isStopped) {
          lenis.stop();
          isStopped = true;
        }
      } else {
        if (isStopped) {
          lenis.start();
          isStopped = false;
        }
      }
    };

    window.addEventListener("scroll", checkZone, { passive: true });
    checkZone(); // initial check

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", checkZone);
    };
  }, []);

  return <>{children}</>;
}
