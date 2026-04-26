"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useScroll, useTransform } from "framer-motion";
import NextImage from "next/image";

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
  const winSize = useRef({ w: 0, h: 0, dpr: 1 });

  const updateWinSize = useCallback(() => {
    if (typeof window === "undefined") return;
    const dpr = window.devicePixelRatio || 1;
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

  // frameIndex: runs 0→66 while scrolling CP0→CP1, then freezes
  const frameIndex = useTransform(scrollYProgress, [0, T1], [0, TOTAL_FRAMES - 1], { clamp: true });

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

    const sp = scrollYProgress.get();
    const fi = Math.round(frameIndex.get());

    // Opacity values derived from scroll position
    const runAlpha = 1 - lerp01(sp, FADE_START_1, FADE_END_1);
    const muscleAlpha = lerp01(sp, FADE_START_1, FADE_END_1) * (1 - lerp01(sp, FADE_START_2, FADE_END_2));
    const skelAlpha = lerp01(sp, FADE_START_2, FADE_END_2);

    // Helper: draw image centered at 85% scale
    const drawImg = (img: HTMLImageElement, alpha: number) => {
      if (alpha < 0.005) return;
      const { w, h } = winSize.current;
      const ia = img.width / img.height;
      const ca = w / h;
      let dw: number, dh: number;
      if (ca > ia) { dh = h; dw = dh * ia; }
      else { dw = w; dh = dw / ia; }
      dw *= 0.85; dh *= 0.85;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // Draw in back-to-front order: run → muscle → skel
    // Ensure we don't access out of bounds if images are still loading
    const clampedFi = Math.max(0, Math.min(fi, images.length - 1));
    const runImg = images[clampedFi];
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
              Join the Stride
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
              Stronger. Pain-free. Performance-ready.
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
              FITNESS IS NOT SURFACE LEVEL
            </p>
            <h2
              className="text-[clamp(50px,12vw,140px)] text-white leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.04em",
                textShadow: "0 0 80px rgba(255,255,255,0.07)",
              }}
            >
              SYSTEM-DRIVEN<br />PERFORMANCE
            </h2>
            <p
              className="text-sm text-white/35 tracking-[0.25em] uppercase mt-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Where muscle, structure, and the nervous system align.
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
            The Engine
          </p>
          <h2
            className="text-[clamp(48px,6.5vw,90px)] text-white leading-none mb-5"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            FUNCTIONAL<br />STRENGTH.
          </h2>
          <p
            className="text-[12px] text-white/45 tracking-[0.18em] uppercase leading-relaxed"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Train how your muscles move, not just how they look.
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
            className="text-[clamp(48px,6.5vw,90px)] text-white leading-none mb-5"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            BUILT<br />TO LAST.
          </h2>
          <p
            className="text-[12px] text-white/45 tracking-[0.18em] uppercase leading-relaxed ml-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Alignment, stability, and control, so your body performs without breaking down.
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
            Discover
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

  export default function HeroCanvasAnimation() {
    const [runImages, setRunImages] = useState<HTMLImageElement[]>([]);
    const [muscleImg, setMuscleImg] = useState<HTMLImageElement | null>(null);
    const [skelImg, setSkelImg] = useState<HTMLImageElement | null>(null);
    const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  
    useEffect(() => {
      // ── Load run frames ──────────────────────────────────────────────────────
      const runLoaded: HTMLImageElement[] = new Array(TOTAL_FRAMES);
      let framesLoadedCount = 0;
  
      Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        const img = new Image();
        const num = String(i + 1).padStart(3, "0");
        img.src = `${FRAME_PATH}/run-${num}.png`;
        if (i === 0) (img as any).fetchPriority = "high";
        
        const handleLoadOrError = () => {
          framesLoadedCount++;
          if (i === 0) {
            setFirstFrameLoaded(true);
            setRunImages([...runLoaded]); // Set initially
          }
          if (i > 0 && !runLoaded[i] && runLoaded[i - 1]) {
             runLoaded[i] = runLoaded[i - 1]; // Fallback to previous frame on error
          }
          if (framesLoadedCount === TOTAL_FRAMES) {
            setRunImages([...runLoaded]);
          }
        };

        img.onload = () => {
          runLoaded[i] = img;
          handleLoadOrError();
        };
        img.onerror = () => {
          handleLoadOrError();
        };
      });

    // ── Load muscle.png ──────────────────────────────────────────────────────
    const muscle = new Image();
    muscle.src = `${FRAME_PATH}/muscle.png`;
    muscle.onload = () => { setMuscleImg(muscle); };
  
    // ── Load skel.png ────────────────────────────────────────────────────────
    const skel = new Image();
    skel.src = `${FRAME_PATH}/skel.png`;
    skel.onload = () => { setSkelImg(skel); };
  }, []);
  
  if (!firstFrameLoaded) {
    return (
      <div className="relative" style={{ height: `${(MAX_CHECKPOINT + 1) * 100}vh` }}>
         <div className="sticky top-0 h-screen w-full bg-[#08090D] flex items-center justify-center">
           {/* Placeholder for run-001.png to prevent CLS */}
           <div className="relative w-full h-full max-w-[1400px] mx-auto overflow-hidden">
             <NextImage
                src="/runframes/run-001.png"
                alt="Loading..."
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-contain opacity-20 scale-[0.85]"
                style={{ filter: 'blur(10px)' }}
             />
           </div>
         </div>
      </div>
    );
  }
  return <HeroPlayer images={runImages} muscleImg={muscleImg} skelImg={skelImg} />;
}
