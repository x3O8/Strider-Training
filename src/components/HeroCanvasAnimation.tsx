"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";

const TOTAL_FRAMES = 67;
const FRAME_PATH = "/runframes";

// 3 snap checkpoints (0–3):
//   CP0 (scrollY = 0)    → Landing "Transform. Perform." — run frame 001
//   CP1 (scrollY = 1vh)  → Run animation complete at run-067 (stable stop)
//   CP2 (scrollY = 2vh)  → muscle.png fully faded in   +  "Anatomy of Strength" text
//   CP3 (scrollY = 3vh)  → skel.png fully faded in     +  "Structural Integrity" text
const MAX_CHECKPOINT = 3;

// Transition timing (normalised scrollYProgress fractions):
// CP1 = 1/3, CP2 = 2/3, CP3 = 1
const T1 = 1 / MAX_CHECKPOINT;   // ≈ 0.333
const T2 = 2 / MAX_CHECKPOINT;   // ≈ 0.667
const T3 = 3 / MAX_CHECKPOINT;   // = 1.0

// Cross-fade zone: occupies the scroll from CPn → CP(n+1).
// We start fading slightly before the halfway mark and finish at the next CP.
const FADE_START_1 = T1;         // canvas starts fading at CP1
const FADE_END_1 = T2;         // muscle fully in at CP2
const FADE_START_2 = T2;         // muscle starts fading at CP2
const FADE_END_2 = T3;         // skel fully in at CP3

// How long each snapping animation takes (ms).
// Longer = cross-fade fully resolves before user can trigger next scroll.
const SNAP_DURATION = 1200;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Linear remap clamped to [0, 1]
function lerp01(v: number, a: number, b: number): number {
  if (a === b) return v <= a ? 0 : 1;
  return Math.max(0, Math.min(1, (v - a) / (b - a)));
}

// ─── HeroPlayer ───────────────────────────────────────────────────────────────
interface HeroPlayerProps {
  images: HTMLImageElement[];
  muscleImg: HTMLImageElement | null;
  skelImg: HTMLImageElement | null;
}

function HeroPlayer({ images, muscleImg, skelImg }: HeroPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const targetCPRef = useRef(0);
  const downLockRef = useRef(false);

  const [activeSection, setActiveSection] = useState(0);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");

  // scrollYProgress drives all visual transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // frameIndex: runs 0→66 while scrolling CP0→CP1, then freezes
  const frameIndex = useTransform(scrollYProgress, [0, T1], [0, TOTAL_FRAMES - 1], { clamp: true });

  // ── Canvas render — draw everything via ctx.globalAlpha ────────────────────
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize only when needed (avoids flicker from unnecessary clears)
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sp = scrollYProgress.get();
    const fi = Math.round(frameIndex.get());

    // Opacity values derived from scroll position
    const runAlpha = 1 - lerp01(sp, FADE_START_1, FADE_END_1);
    const muscleAlpha = lerp01(sp, FADE_START_1, FADE_END_1) * (1 - lerp01(sp, FADE_START_2, FADE_END_2));
    const skelAlpha = lerp01(sp, FADE_START_2, FADE_END_2);

    // Helper: draw image centered at 85% scale
    const drawImg = (img: HTMLImageElement, alpha: number) => {
      if (alpha < 0.005) return;
      const ia = img.width / img.height;
      const ca = canvas.width / canvas.height;
      let dw: number, dh: number;
      if (ca > ia) { dh = canvas.height; dw = dh * ia; }
      else { dw = canvas.width; dh = dw / ia; }
      dw *= 0.85; dh *= 0.85;
      const dx = (canvas.width - dw) / 2;
      const dy = (canvas.height - dh) / 2;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // Draw in back-to-front order: run → muscle → skel
    const runImg = images[Math.max(0, Math.min(fi, images.length - 1))];
    if (runImg) drawImg(runImg, runAlpha);
    if (muscleImg) drawImg(muscleImg, muscleAlpha);
    if (skelImg) drawImg(skelImg, skelAlpha);

    ctx.globalAlpha = 1; // Reset for safety
  }, [scrollYProgress, frameIndex, images, muscleImg, skelImg]);

  // Subscribe to all scroll changes so canvas updates continuously during snaps
  useEffect(() => {
    const unsub1 = scrollYProgress.on("change", renderFrame);
    const unsub2 = frameIndex.on("change", renderFrame);
    renderFrame();
    window.addEventListener("resize", renderFrame);
    return () => {
      unsub1();
      unsub2();
      window.removeEventListener("resize", renderFrame);
    };
  }, [scrollYProgress, frameIndex, renderFrame]);

  // ── Snap-scroll engine ──────────────────────────────────────────────────────
  const animateToY = useCallback((targetY: number, onDone?: () => void) => {
    cancelAnimationFrame(rafRef.current);
    const startY = window.scrollY;
    const diff = targetY - startY;

    if (Math.abs(diff) < 1) {
      window.scrollTo(0, targetY);
      onDone?.();
      return;
    }

    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / SNAP_DURATION, 1);
      window.scrollTo(0, startY + diff * easeOutCubic(t));
      if (t < 1) { rafRef.current = requestAnimationFrame(tick); }
      else { onDone?.(); }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const initCP = Math.round(window.scrollY / window.innerHeight);
    targetCPRef.current = Math.max(0, Math.min(MAX_CHECKPOINT, initCP));
    setActiveSection(targetCPRef.current);

    const go = (delta: number): boolean => {
      const maxY = MAX_CHECKPOINT * window.innerHeight;

      if (delta > 0) {
        if (window.scrollY >= maxY) return false;
        if (downLockRef.current) return true; // block but preventDefault
        if (targetCPRef.current >= MAX_CHECKPOINT) return false;

        const next = targetCPRef.current + 1;
        targetCPRef.current = next;
        setScrollDir("down");
        setActiveSection(next);
        downLockRef.current = true;
        // Release lock ONLY after snap fully completes
        animateToY(next * window.innerHeight, () => { downLockRef.current = false; });
        return true;
      } else {
        if (window.scrollY <= 0) return false;
        if (window.scrollY > MAX_CHECKPOINT * window.innerHeight + 200) return false;
        if (targetCPRef.current <= 0) return false;

        cancelAnimationFrame(rafRef.current);
        downLockRef.current = true;
        const prev = targetCPRef.current - 1;
        targetCPRef.current = prev;
        setScrollDir("up");
        setActiveSection(prev);
        animateToY(prev * window.innerHeight, () => { downLockRef.current = false; });
        return true;
      }
    };

    const handleScrollSync = () => {
      if (!downLockRef.current) {
        const cp = Math.max(0, Math.min(MAX_CHECKPOINT, Math.round(window.scrollY / window.innerHeight)));
        if (cp !== targetCPRef.current) {
          targetCPRef.current = cp;
          setActiveSection(cp);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => { if (go(e.deltaY)) e.preventDefault(); };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) >= 30) go(dy);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { if (go(100)) e.preventDefault(); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { if (go(-100)) e.preventDefault(); }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScrollSync, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScrollSync);
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
    <div id="hero-main-container" ref={containerRef} className="relative" style={{ height: `${(MAX_CHECKPOINT + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#08090D]">

        {/* ── Single canvas — all images rendered here ───────────────────────── */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" style={{ zIndex: 1 }} />

        {/* ── Gradient overlays to blend images into background ──────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
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
              On Your Marks
            </p>
            <h1
              className="text-[clamp(80px,18vw,200px)] text-white leading-none"
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
              Every transformation begins before the first step.
            </p>
          </div>
        </div>

        {/* ── S1 : Full Running Checkpoint 1 ─────────────────────────── */}
        <div
          className="absolute inset-0 flex items-center justify-center text-center pointer-events-none px-6"
          style={{ ...slide(1), zIndex: 5 }}
        >
          <div>
            <h2
              className="text-[clamp(50px,12vw,140px)] text-white leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.04em",
                textShadow: "0 0 80px rgba(255,255,255,0.07)",
              }}
            >
              Built for<br />complete fitness.
            </h2>
            <p
              className="text-sm text-white/35 tracking-[0.25em] uppercase mt-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Power, endurance, balance — working as one.
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
          <span className="block w-10 h-px bg-white/40 mb-6" />
          <h2
            className="text-[clamp(48px,6.5vw,90px)] text-white leading-none mb-5"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            Strength<br />from within.
          </h2>
          <p
            className="text-[12px] text-white/45 tracking-[0.18em] uppercase leading-relaxed"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Optimize how your muscles move, not just how they look.
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
          <span className="block w-10 h-px bg-white/40 mb-6 ml-auto" />
          <h2
            className="text-[clamp(48px,6.5vw,90px)] text-white leading-none mb-5"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            Built<br />to last.
          </h2>
          <p
            className="text-[12px] text-white/45 tracking-[0.18em] uppercase leading-relaxed ml-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Alignment. Stability. Longevity.
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
            Discover More
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

// ─── Loading Screen ───────────────────────────────────────────────────────────
function InnerLoadingScreen({ progress, error }: { progress: number; error: boolean }) {
  return (
    <div className="fixed inset-0 bg-[#08090D] flex flex-col items-center justify-center z-50">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(-55deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 32px),
            repeating-linear-gradient( 55deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 32px)
          `,
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4 mb-14">
        <img src="/stryder-logo.jpeg" alt="Strider" className="w-14 h-14 object-contain" />
        <h1 className="text-5xl text-white tracking-[0.15em]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          STRIDER
        </h1>
        <p className="text-[9px] text-white/25 tracking-[0.5em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          Athletic Excellence
        </p>
      </div>
      <div className="relative z-10 w-52">
        <div className="w-full h-px bg-white/10 overflow-hidden mb-3">
          <div className="h-full bg-white transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between">
          <span className="text-[9px] text-white/20 tracking-[0.35em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Loading</span>
          <span className="text-[9px] text-white/40" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{Math.round(progress)}%</span>
        </div>
      </div>
      {error && <p className="text-white/20 text-xs mt-6 relative z-10">Some frames unavailable.</p>}
    </div>
  );
}

// ─── Main export — pre-loads ALL images before mounting HeroPlayer ─────────────
export default function HeroCanvasAnimation() {
  const [runImages, setRunImages] = useState<HTMLImageElement[]>([]);
  const [muscleImg, setMuscleImg] = useState<HTMLImageElement | null>(null);
  const [skelImg, setSkelImg] = useState<HTMLImageElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    // Total assets: 67 run frames + 2 static images
    const TOTAL = TOTAL_FRAMES + 2;
    let loaded = 0;

    const onProgress = () => {
      loaded++;
      setLoadProgress((loaded / TOTAL) * 100);
      if (loaded >= TOTAL) setAllLoaded(true);
    };

    // ── Load run frames ──────────────────────────────────────────────────────
    const runLoaded: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      const num = String(i + 1).padStart(3, "0");
      img.src = `${FRAME_PATH}/run-${num}.jpeg`;
      img.onload = () => {
        runLoaded[i] = img;
        if (i === TOTAL_FRAMES - 1) setRunImages([...runLoaded]);
        onProgress();
      };
      img.onerror = () => {
        if (i > 0 && runLoaded[i - 1]) runLoaded[i] = runLoaded[i - 1];
        if (i === TOTAL_FRAMES - 1) setRunImages([...runLoaded]);
        onProgress();
      };
    });

    // ── Load muscle.png ──────────────────────────────────────────────────────
    const muscle = new Image();
    muscle.src = `${FRAME_PATH}/muscle.png`;
    muscle.onload = () => { setMuscleImg(muscle); onProgress(); };
    muscle.onerror = () => { setLoadError(true); onProgress(); };

    // ── Load skel.png ────────────────────────────────────────────────────────
    const skel = new Image();
    skel.src = `${FRAME_PATH}/skel.png`;
    skel.onload = () => { setSkelImg(skel); onProgress(); };
    skel.onerror = () => { setLoadError(true); onProgress(); };
  }, []);

  if (!allLoaded) return <InnerLoadingScreen progress={loadProgress} error={loadError} />;
  return <HeroPlayer images={runImages} muscleImg={muscleImg} skelImg={skelImg} />;
}
