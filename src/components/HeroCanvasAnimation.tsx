"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll } from "framer-motion";
import NextImage from "next/image";

const TOTAL_FRAMES = 67;
const FRAME_PATH = "/runframes/outputs";

// 3 snap checkpoints (0–3):
//   CP0 (scrollY = 0)    → Landing "Transform. Perform." — run frame 001
//   CP1 (scrollY = 1vh)  → Run animation complete at run-067 (stable stop)
//   CP2 (scrollY = 2vh)  → muscle.png fully faded in   +  "Anatomy of Strength" text
//   CP3 (scrollY = 3vh)  → skel.png fully faded in     +  "Structural Integrity" text
const MAX_CHECKPOINT = 3;
const TOTAL_SCROLL_STEPS = 3;

// Transition timing (normalised scrollYProgress fractions):
// CP1 = 1/3, CP2 = 2/3, CP3 = 1. The skeleton checkpoint now coincides
// with the sticky release edge, so the next scroll moves it immediately.
const T1 = 1 / TOTAL_SCROLL_STEPS;
const T2 = 2 / TOTAL_SCROLL_STEPS;
const T3 = 3 / TOTAL_SCROLL_STEPS;

// Cross-fade zone: occupies the scroll from CPn → CP(n+1).
// We start fading slightly before the halfway mark and finish at the next CP.
const FADE_START_1 = T1;         // canvas starts fading at CP1
const FADE_END_1 = T2;         // muscle fully in at CP2
const FADE_START_2 = T2;         // muscle starts fading at CP2
const FADE_END_2 = T3;         // skel fully in at CP3

// How long each snapping animation takes (ms).
// Longer = cross-fade fully resolves before user can trigger next scroll.
const SNAP_DURATION = 850;
const FIRST_TRANSITION_DURATION = 1250;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Linear remap clamped to [0, 1]
function lerp01(v: number, a: number, b: number): number {
  if (a === b) return v <= a ? 0 : 1;
  return Math.max(0, Math.min(1, (v - a) / (b - a)));
}

// ─── HeroPlayer ───────────────────────────────────────────────────────────────
interface HeroPlayerProps {
  images: Array<HTMLImageElement | undefined>;
  muscleImg: HTMLImageElement | null;
  skelImg: HTMLImageElement | null;
  onFirstFramePaint: () => void;
}

function HeroPlayer({
  images,
  muscleImg,
  skelImg,
  onFirstFramePaint,
}: HeroPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const targetCPRef = useRef(0);
  const downLockRef = useRef(false);
  const transitionDirectionRef = useRef<"down" | "up" | null>(null);
  const transitionIdRef = useRef(0);

  const [activeSection, setActiveSection] = useState(0);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");
  const [canvasHasFrame, setCanvasHasFrame] = useState(false);
  const canvasHasFrameRef = useRef(false);
  const lastRunImageRef = useRef<HTMLImageElement | null>(null);
  const winSize = useRef({ w: 0, h: 0, dpr: 1 });

  const updateWinSize = useCallback(() => {
    if (typeof window === "undefined") return;
    const dprLimit = window.innerWidth < 640 ? 2 : 1.5;
    const dpr = Math.min(window.devicePixelRatio || 1, dprLimit);
    winSize.current = {
      w: window.innerWidth,
      h: window.innerHeight,
      dpr: dpr
    };
  }, []);

  useEffect(() => {
    updateWinSize();
    window.addEventListener("resize", updateWinSize);
    return () => window.removeEventListener("resize", updateWinSize);
  }, [updateWinSize]);


  // scrollYProgress drives all visual transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Canvas render — draw everything via ctx.globalAlpha ────────────────────
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h, dpr } = winSize.current;
    if (w === 0) return;
    
    const canvasW = w * dpr;
    const canvasH = h * dpr;
    
    if (canvas.width !== canvasW || canvas.height !== canvasH) {
      canvas.width = canvasW;
      canvas.height = canvasH;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#08090D";
    ctx.fillRect(0, 0, w, h);

    const sp = scrollYProgress.get();
    const fi = Math.round(lerp01(sp, 0, T1) * (TOTAL_FRAMES - 1));

    // Opacity values derived from scroll position
    let runAlpha = 1 - lerp01(sp, FADE_START_1, FADE_END_1);
    let muscleAlpha = lerp01(sp, FADE_START_1, FADE_END_1) * (1 - lerp01(sp, FADE_START_2, FADE_END_2));
    let skelAlpha = lerp01(sp, FADE_START_2, FADE_END_2);

    // Never clear to black while a later checkpoint image is still decoding.
    // Its opacity is temporarily carried by the most recent available image.
    if (!skelImg) {
      muscleAlpha += skelAlpha;
      skelAlpha = 0;
    }
    if (!muscleImg) {
      runAlpha += muscleAlpha;
      muscleAlpha = 0;
    }

    // Keep the approved desktop framing while letting the athlete fill more of a phone screen.
    const drawImg = (img: HTMLImageElement, alpha: number) => {
      if (alpha < 0.005) return;
      const { w, h } = winSize.current;
      const ia = img.width / img.height;
      const ca = w / h;
      let dw: number, dh: number;
      if (ca > ia) { dh = h; dw = dh * ia; }
      else { dw = w; dh = dw / ia; }
      const imageScale = w < 640 ? 1 : 0.85;
      dw *= imageScale; dh *= imageScale;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // Draw in back-to-front order: run → muscle → skel
    // Prefer an earlier decoded frame so progressive loading never jumps ahead.
    const requestedFrame = Math.max(0, Math.min(fi, TOTAL_FRAMES - 1));
    let runImg = images[requestedFrame];
    for (let index = requestedFrame - 1; !runImg && index >= 0; index -= 1) {
      runImg = images[index];
    }
    for (let index = requestedFrame + 1; !runImg && index < TOTAL_FRAMES; index += 1) {
      runImg = images[index];
    }
    runImg ??= lastRunImageRef.current ?? undefined;
    if (runImg) {
      lastRunImageRef.current = runImg;
      drawImg(runImg, runAlpha);
      if (!canvasHasFrameRef.current) {
        canvasHasFrameRef.current = true;
        setCanvasHasFrame(true);
      }
    }
    if (muscleImg) drawImg(muscleImg, muscleAlpha);
    if (skelImg) drawImg(skelImg, skelAlpha);

    ctx.globalAlpha = 1; // Reset for safety
  }, [scrollYProgress, images, muscleImg, skelImg]);

  // Subscribe to all scroll changes so canvas updates continuously during snaps
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", renderFrame);
    renderFrame();
    window.addEventListener("resize", renderFrame);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", renderFrame);
    };
  }, [scrollYProgress, renderFrame]);

  // ── Snap-scroll engine ──────────────────────────────────────────────────────
  const animateToY = useCallback((
    targetY: number,
    onDone?: () => void,
    duration = SNAP_DURATION
  ) => {
    cancelAnimationFrame(rafRef.current);
    const startY = window.scrollY;
    const diff = targetY - startY;

    if (Math.abs(diff) < 1 || duration <= 0) {
      window.scrollTo(0, targetY);
      onDone?.();
      return;
    }

    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      window.scrollTo(0, startY + diff * easeOutCubic(t));
      if (t < 1) { rafRef.current = requestAnimationFrame(tick); }
      else { onDone?.(); }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const getHeroBounds = () => {
      const hero = containerRef.current;
      const heroTop = hero
        ? window.scrollY + hero.getBoundingClientRect().top
        : 0;
      const heroHeight = hero?.offsetHeight ?? (TOTAL_SCROLL_STEPS + 1) * window.innerHeight;
      const stickyHeight = stickyRef.current?.offsetHeight ?? window.innerHeight;
      const scrollSpan = Math.max(0, heroHeight - stickyHeight);
      const checkpointStep = scrollSpan / MAX_CHECKPOINT;

      return {
        heroTop,
        checkpointStep,
        checkpointEndY: heroTop + scrollSpan,
        stickyEndY: heroTop + scrollSpan,
      };
    };

    const initialBounds = getHeroBounds();
    const initCP = initialBounds.checkpointStep > 0
      ? Math.round((window.scrollY - initialBounds.heroTop) / initialBounds.checkpointStep)
      : 0;
    targetCPRef.current = Math.max(0, Math.min(MAX_CHECKPOINT, initCP));
    setActiveSection(targetCPRef.current);

    const haltLenisAtCurrentPosition = () => {
      const lenis = window.__lenis;
      if (!lenis) return;
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      lenis.stop();
    };

    const completeTransition = (transitionId: number, onComplete?: () => void) => {
      if (transitionId !== transitionIdRef.current) return;
      downLockRef.current = false;
      transitionDirectionRef.current = null;
      onComplete?.();
    };

    const snapToCheckpoint = (
      checkpoint: number,
      direction: "down" | "up",
      heroTop: number,
      duration = SNAP_DURATION
    ) => {
      const clampedCheckpoint = Math.max(0, Math.min(MAX_CHECKPOINT, checkpoint));
      const transitionId = ++transitionIdRef.current;

      targetCPRef.current = clampedCheckpoint;
      setScrollDir(direction);
      setActiveSection(clampedCheckpoint);
      downLockRef.current = true;
      transitionDirectionRef.current = direction;

      const { checkpointStep } = getHeroBounds();
      const targetY = heroTop + clampedCheckpoint * checkpointStep;
      const stickyBoundaryY = heroTop + MAX_CHECKPOINT * checkpointStep;
      const lenis = window.__lenis;

      // When reversing the hero's exit, stay on Lenis until the sticky
      // boundary is reached. Switching to window.scrollTo above that boundary
      // would briefly give two scrollers ownership again.
      if (
        lenis &&
        direction === "up" &&
        clampedCheckpoint === MAX_CHECKPOINT &&
        window.scrollY >= stickyBoundaryY - 1
      ) {
        cancelAnimationFrame(rafRef.current);
        lenis.start();
        lenis.scrollTo(targetY, {
          duration: duration / 1000,
          easing: easeOutCubic,
          lock: true,
          force: true,
          onComplete: () => completeTransition(transitionId),
        });
        return;
      }

      haltLenisAtCurrentPosition();

      animateToY(targetY, () => {
        completeTransition(transitionId, () => {
          // Mobile viewport chrome changes can leave Lenis stopped exactly at
          // the sticky release edge. Hand control back without moving the page.
          if (window.innerWidth < 640 && clampedCheckpoint === MAX_CHECKPOINT) {
            window.__lenis?.start();
          }
        });
      }, duration);
    };

    const interruptTransition = (
      delta: number,
      heroTop: number
    ) => {
      const requestedDirection = delta > 0 ? "down" : "up";
      const activeDirection = transitionDirectionRef.current;

      // Inertial wheel events in the same direction stay absorbed. A genuine
      // reversal cancels the active animation and targets the adjacent card.
      if (!activeDirection || requestedDirection === activeDirection) return true;

      cancelAnimationFrame(rafRef.current);
      haltLenisAtCurrentPosition();

      const destination = requestedDirection === "up"
        ? targetCPRef.current - 1
        : targetCPRef.current + 1;

      snapToCheckpoint(destination, requestedDirection, heroTop, 460);
      return true;
    };

    const go = (delta: number): boolean => {
      const { heroTop, checkpointEndY, stickyEndY } = getHeroBounds();
      const scrollY = window.scrollY;

      // While a checkpoint transition is running, this controller owns
      // the wheel input. Letting Lenis react here is what caused the black flash
      // and the jump back to the skeleton checkpoint.
      if (downLockRef.current) {
        return interruptTransition(delta, heroTop);
      }

      // Lenis owns the short reveal between the end of the sticky canvas and
      // the following section. The hero owns every position above that edge.
      if (scrollY > stickyEndY + 1) return false;

      if (delta > 0) {
        if (scrollY >= checkpointEndY - 2 || targetCPRef.current >= MAX_CHECKPOINT) {
          targetCPRef.current = MAX_CHECKPOINT;
          setScrollDir("down");
          setActiveSection(MAX_CHECKPOINT);
          window.__lenis?.start();
          return false;
        }

        const nextCheckpoint = targetCPRef.current + 1;
        snapToCheckpoint(
          nextCheckpoint,
          "down",
          heroTop,
          targetCPRef.current === 0 ? FIRST_TRANSITION_DURATION : SNAP_DURATION,
        );
        return true;
      } else {
        if (scrollY <= heroTop + 1) return false;

        // Re-enter the pinned canvas at its final checkpoint before moving to
        // earlier phases. This keeps reverse scrolling visually continuous.
        if (scrollY > checkpointEndY + 2) {
          snapToCheckpoint(MAX_CHECKPOINT, "up", heroTop, 460);
          return true;
        }

        if (targetCPRef.current <= 0) return false;

        const previousCheckpoint = targetCPRef.current - 1;
        snapToCheckpoint(
          previousCheckpoint,
          "up",
          heroTop,
          previousCheckpoint === 0 ? FIRST_TRANSITION_DURATION : SNAP_DURATION,
        );
        return true;
      }
    };

    const handleScrollSync = () => {
      if (!downLockRef.current) {
        const { heroTop, checkpointStep } = getHeroBounds();
        const cp = Math.max(
          0,
          Math.min(
            MAX_CHECKPOINT,
            checkpointStep > 0
              ? Math.round((window.scrollY - heroTop) / checkpointStep)
              : 0,
          )
        );
        if (cp !== targetCPRef.current) {
          targetCPRef.current = cp;
          setActiveSection(cp);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!go(e.deltaY)) return;
      (e as WheelEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true;
      e.preventDefault();
    };
    let touchY = 0;
    let touchHandled = false;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      touchHandled = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      if (touchHandled) {
        (e as TouchEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true;
        if (e.cancelable) e.preventDefault();
        return;
      }
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) < 20) return;

      // Resolve mobile gestures while the finger is still moving. At the last
      // checkpoint go() starts Lenis and returns false, allowing this same
      // swipe to continue naturally into the following section.
      if (!go(dy)) return;
      touchHandled = true;
      (e as TouchEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true;
      if (e.cancelable) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchHandled) {
        touchHandled = false;
        return;
      }
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) >= 20) go(dy);
    };
    const onTouchCancel = () => {
      touchHandled = false;
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { if (go(100)) e.preventDefault(); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { if (go(-100)) e.preventDefault(); }
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScrollSync, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScrollSync);
      transitionIdRef.current += 1;
      cancelAnimationFrame(rafRef.current);
    };
  }, [animateToY]);

  // ── Text helpers ────────────────────────────────────────────────────────────
  const fade = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transition: "opacity 0.5s ease, transform 0.55s ease",
  });

  const slide = (idx: number) => {
    const visible = activeSection === idx;
    const behind = scrollDir === "down" ? idx > activeSection : idx < activeSection;
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : behind ? "translateY(40px)" : "translateY(-40px)",
      transition: "opacity 0.5s ease, transform 0.55s ease",
    };
  };

  return (
    <div id="hero-main-container" ref={containerRef} className="relative h-[400svh] sm:h-[400vh]">
      <div ref={stickyRef} className="sticky top-0 h-dvh w-full overflow-hidden bg-[#08090D] sm:h-screen">

        {/* Server-rendered LCP candidate. The canvas takes over as frames decode. */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 0,
            opacity: canvasHasFrame ? 0 : 1,
            transition: "opacity 120ms ease-out",
          }}
        >
          <NextImage
            src={`${FRAME_PATH}/2x-run-001.webp`}
            alt="Athlete preparing to sprint"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            unoptimized
            onLoad={onFirstFramePaint}
            onError={onFirstFramePaint}
            className="object-contain scale-100 sm:scale-[0.85]"
          />
        </div>

        {/* ── Single canvas — all images rendered here ───────────────────────── */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" style={{ zIndex: 1 }} />

        {/* ── Gradient overlays to blend images into background ──────────────────────────── */}
        <div
          className="pointer-events-none absolute inset-0 hidden sm:block"
          style={{
            background: `
              linear-gradient(to top, rgba(8,9,13,1) 0%, rgba(8,9,13,1) 5%, rgba(8,9,13,0.6) 20%, transparent 40%),
              linear-gradient(to right, rgba(8,9,13,1) 0%, rgba(8,9,13,1) 10%, rgba(8,9,13,0.8) 20%, transparent 35%),
              linear-gradient(to left, rgba(8,9,13,1) 0%, rgba(8,9,13,1) 10%, rgba(8,9,13,0.8) 20%, transparent 35%)
            `,
            zIndex: 4,
          }}
        />

        {/* ── S0 : Landing ─────────────────────────── */}
        <div
          className="absolute inset-0 flex items-center justify-center text-center pointer-events-none px-6"
          style={{ ...slide(0), zIndex: 5 }}
        >
          <div>
            <p
              className="text-[9px] text-white/25 tracking-[0.55em] uppercase mb-7"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Strider Training Systems
            </p>
            <h1
              className="text-[clamp(96px,26vw,120px)] text-white leading-none sm:text-[clamp(80px,18vw,200px)]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.04em",
                textShadow: "0 0 80px rgba(255,255,255,0.07)",
              }}
            >
              It starts<br />here.
            </h1>
            <p
              className="text-sm text-white/35 tracking-[0.25em] uppercase mt-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Individualized Coaching • Adaptive Programming • Lifelong Performance
            </p>
          </div>
        </div>

        {/* ── S1 : Full Running Checkpoint 1 ─────────────────────────── */}
        <div
          className="absolute inset-0 flex items-center justify-center text-center pointer-events-none px-6"
          style={{ ...slide(1), zIndex: 5 }}
        >
          <div>
            <p
              className="text-[9px] text-white/25 tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Individualized Systems
            </p>
            <h2
              className="text-[clamp(56px,14vw,64px)] text-white leading-none sm:text-[clamp(50px,12vw,140px)]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.04em",
                textShadow: "0 0 80px rgba(255,255,255,0.07)",
              }}
            >
              UNIQUELY DESIGNED<br />{" "}AROUND YOU.
            </h2>
            <p
              className="text-sm text-white/35 tracking-[0.25em] uppercase mt-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Your physiology, movement, recovery, goals, and lifestyle shape your program.
            </p>
          </div>
        </div>

        {/* ── S2 : Muscle text — left of image ─────────────────────────────── */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 pointer-events-none max-w-[280px]"
          style={{
            ...fade(activeSection === 2),
            transform: activeSection === 2 ? "translateX(0)" : "translateX(-36px)",
            zIndex: 5,
          }}
        >
          <p
            className="text-[9px] text-white/25 tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Movement Systems
          </p>
          <h2
            className="text-[clamp(54px,14vw,62px)] text-white leading-none mb-5 sm:text-[clamp(48px,6.5vw,90px)]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            FUNCTIONAL<br />STRENGTH.
          </h2>
          <p
            className="text-[12px] text-white/45 tracking-[0.18em] uppercase leading-relaxed"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Train your body to move better, not just look better.
          </p>
        </div>

        {/* ── S3 : Skel text — right of image ──────────────────────────────── */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-8 md:right-16 text-right pointer-events-none max-w-[280px]"
          style={{
            ...fade(activeSection === 3),
            transform: activeSection === 3 ? "translateX(0)" : "translateX(36px)",
            zIndex: 5,
          }}
        >
          <p
            className="text-[9px] text-white/25 tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Structure + control
          </p>
          <h2
            className="text-[clamp(54px,14vw,62px)] text-white leading-none mb-5 sm:text-[clamp(48px,6.5vw,90px)]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            BUILT<br />TO LAST.
          </h2>
          <p
            className="text-[12px] text-white/45 tracking-[0.18em] uppercase leading-relaxed ml-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Building resilient bodies that perform for life.
          </p>
        </div>

        {/* ── CTA: visible on S3 (skel) ────────────────────────────────────── */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ ...fade(activeSection === 3), zIndex: 5 }}
        >
          <button
            className="pointer-events-auto px-12 py-3.5 bg-white text-black text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white/90 transition-colors duration-200"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            See How It Works
          </button>
        </div>

        {/* ── Scroll indicator (S0 only) ────────────────────────────────────── */}
        <div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          style={{ ...fade(activeSection === 0), zIndex: 5 }}
        >
          <p
            className="text-[8px] text-white/25 tracking-[0.55em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Scroll
          </p>
          <div className="w-px h-10 bg-gradient-to-b from-white/35 to-transparent" />
        </div>

      </div>
    </div>
  );
}

interface HeroCanvasAnimationProps {
  onReady?: () => void;
}

export default function HeroCanvasAnimation({ onReady }: HeroCanvasAnimationProps) {
    const [runImages, setRunImages] = useState<Array<HTMLImageElement | undefined>>([]);
    const [muscleImg, setMuscleImg] = useState<HTMLImageElement | null>(null);
    const [skelImg, setSkelImg] = useState<HTMLImageElement | null>(null);
    const readySignalledRef = useRef(false);

    const signalReady = useCallback(() => {
      if (readySignalledRef.current) return;
      readySignalledRef.current = true;
      onReady?.();
    }, [onReady]);
  
    useEffect(() => {
      let cancelled = false;
      // ── Load run frames ──────────────────────────────────────────────────────
      const runLoaded: Array<HTMLImageElement | undefined> = new Array(TOTAL_FRAMES);
      let framesLoadedCount = 0;
  
      let backgroundTimer = 0;

      const loadFrame = (i: number, onSettled?: () => void) => {
        const img = new Image();
        const num = String(i + 1).padStart(3, "0");
        img.decoding = "async";
        img.fetchPriority = i === 0 ? "high" : "auto";
        
        const handleLoadOrError = () => {
          if (cancelled) return;
          framesLoadedCount++;
          if (i === 0) {
            setRunImages([...runLoaded]);
            signalReady();
          }
          if (i > 0 && !runLoaded[i] && runLoaded[i - 1]) {
             runLoaded[i] = runLoaded[i - 1];
          }
          if (framesLoadedCount % 4 === 0 || framesLoadedCount === TOTAL_FRAMES) {
            setRunImages([...runLoaded]);
          }
          onSettled?.();
        };

        img.onload = async () => {
          try {
            await img.decode();
          } catch {
            // The load event still makes the image drawable in most browsers.
          }
          if (cancelled) return;
          runLoaded[i] = img;
          handleLoadOrError();
        };
        img.onerror = () => {
          handleLoadOrError();
        };
        img.src = `${FRAME_PATH}/2x-run-${num}.webp`;
      };

      const loadRemainingFrames = () => {
        let nextFrame = 1;
        let activeLoads = 0;

        const pump = () => {
          if (cancelled) return;
          while (activeLoads < 6 && nextFrame < TOTAL_FRAMES) {
            const frame = nextFrame;
            nextFrame += 1;
            activeLoads += 1;
            loadFrame(frame, () => {
              activeLoads -= 1;
              pump();
            });
          }
        };

        pump();
      };

      loadFrame(0, () => {
        backgroundTimer = window.setTimeout(loadRemainingFrames, 0);
      });

    // Load the two later checkpoint images early, after the LCP request has
    // already been issued at high priority.
    const muscle = new Image();
    muscle.onload = async () => {
      try {
        await muscle.decode();
      } catch {
        // Keep the loaded image as a valid fallback if decode() rejects.
      }
      if (!cancelled) setMuscleImg(muscle);
    };
    muscle.decoding = "async";
    muscle.fetchPriority = "auto";
    muscle.src = `${FRAME_PATH}/muscle.webp`;
  
    const skel = new Image();
    skel.onload = async () => {
      try {
        await skel.decode();
      } catch {
        // Keep the loaded image as a valid fallback if decode() rejects.
      }
      if (!cancelled) setSkelImg(skel);
    };
    skel.decoding = "async";
    skel.fetchPriority = "auto";
    skel.src = `${FRAME_PATH}/skel.webp`;

    return () => {
      cancelled = true;
      window.clearTimeout(backgroundTimer);
    };
  }, [signalReady]);
  
  return (
    <HeroPlayer
      images={runImages}
      muscleImg={muscleImg}
      skelImg={skelImg}
      onFirstFramePaint={signalReady}
    />
  );
}
