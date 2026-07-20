"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import ProtocolModel3D from "@/components/ProtocolModel3D";

const steps = [
  {
    step: "01",
    heading: "Assessment",
    eyebrow: "Read the system",
    description:
      "Every Strider journey begins with a deep understanding of the individual. We evaluate movement quality, structural limitations, current performance, training history, and readiness. The result is clarity on what is holding you back and what needs to be built.",
  },
  {
    step: "02",
    heading: "Blueprint",
    eyebrow: "Build the path",
    description:
      "Your assessment becomes a personalized progression strategy—not a generic workout plan. Exercise selection, intensity, volume, and recovery are organized into a clear roadmap built around your goals, capacity, and current condition.",
  },
  {
    step: "03",
    heading: "Execute",
    eyebrow: "Train with intent",
    description:
      "The plan comes to life through precise, consistent work. Every session has a purpose inside the larger system, with technique and quality of movement turning effort into measurable progress.",
  },
  {
    step: "04",
    heading: "Evolve",
    eyebrow: "Adapt through data",
    description:
      "Strider evolves as you do. Performance feedback and your response to training guide each adjustment, keeping progress moving while fatigue is managed and plateaus are avoided. The system becomes more specific as you become more capable.",
  },
];

const phaseTargets = [0, 0.27, 0.52, 0.77];
const phasePositions = [
  "left-6 bottom-[13vh] items-start text-left md:left-[18vw] md:bottom-[15vh]",
  "right-6 top-[27vh] items-end text-right md:right-[7vw]",
  "left-6 top-[36vh] items-start text-left md:left-[7vw]",
  "right-6 bottom-[7vh] items-end text-right md:right-[7vw]",
];

function PhaseOverlay({
  phase,
  index,
  progress,
}: {
  phase: (typeof steps)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const entry = index * 0.25;
  const exit = (index + 1) * 0.25;
  const input = isFirst
    ? [0, exit - 0.07, exit + 0.02]
    : isLast
      ? [entry - 0.05, entry + 0.02, 1]
      : [entry - 0.05, entry + 0.02, exit - 0.07, exit + 0.02];
  const opacityOutput = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, input, opacityOutput);
  const rightAligned = index % 2 === 1;

  return (
    <motion.div
      className={`pointer-events-none absolute z-30 flex w-[calc(100%-3rem)] max-w-[480px] flex-col ${phasePositions[index]}`}
      style={{ opacity }}
    >
        <div className={`mb-5 flex items-center gap-4 ${rightAligned ? "flex-row-reverse" : ""}`}>
          <span className="h-px w-10 bg-white/50" />
          <p
            className="text-[9px] uppercase tracking-[0.46em] text-white/55"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Phase {phase.step} · {phase.eyebrow}
          </p>
        </div>
        <h3
          className="text-[clamp(52px,7vw,96px)] leading-[0.82] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.025em" }}
        >
          {phase.heading}
        </h3>
        <p
          className="mt-5 max-w-md text-[13px] font-light leading-[1.8] text-white/65 drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)] md:text-sm"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {phase.description}
        </p>
    </motion.div>
  );
}

export default function HowWeWorkSticky() {
  const sectionRef = useRef<HTMLElement>(null);
  const snapLockRef = useRef(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const cinematicProgress = useSpring(scrollYProgress, {
    stiffness: 74,
    damping: 26,
    mass: 0.42,
    restDelta: 0.0001,
  });
  const modelOpacity = useTransform(cinematicProgress, [0, 0.035], [0.5, 0.64]);
  const modelScale = useTransform(cinematicProgress, [0, 0.06], [1.055, 1]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let unlockTimer: ReturnType<typeof setTimeout> | undefined;

    const releaseSnap = () => {
      snapLockRef.current = false;
      if (unlockTimer) clearTimeout(unlockTimer);
      unlockTimer = undefined;
    };

    const snapToPhase = (phaseIndex: number) => {
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      const stickyHeight = Math.max(1, window.innerHeight - 80);
      const scrollableDistance = Math.max(1, section.offsetHeight - stickyHeight);
      const targetY = sectionTop + phaseTargets[phaseIndex] * scrollableDistance;
      const lenis = (window as Window & {
        __lenis?: {
          scrollTo: (
            target: number,
            options?: {
              duration?: number;
              easing?: (value: number) => number;
              onComplete?: () => void;
            }
          ) => void;
        };
      }).__lenis;

      snapLockRef.current = true;
      if (lenis?.scrollTo) {
        lenis.scrollTo(targetY, {
          duration: 0.72,
          easing: (value) => 1 - Math.pow(1 - value, 4),
          onComplete: releaseSnap,
        });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }

      unlockTimer = setTimeout(releaseSnap, 900);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 8) return;

      const rect = section.getBoundingClientRect();
      const sectionIsPinned = rect.top <= 82 && rect.bottom > window.innerHeight - 2;
      if (!sectionIsPinned) return;

      if (snapLockRef.current) {
        event.preventDefault();
        return;
      }

      const progress = scrollYProgress.get();
      const nearestIndex = phaseTargets.reduce(
        (nearest, target, targetIndex) =>
          Math.abs(target - progress) < Math.abs(phaseTargets[nearest] - progress)
            ? targetIndex
            : nearest,
        0
      );
      const direction = Math.sign(event.deltaY);
      let targetIndex: number | null = null;

      if (direction > 0 && nearestIndex < phaseTargets.length - 1) {
        targetIndex = nearestIndex + 1;
      } else if (direction < 0 && progress > phaseTargets[phaseTargets.length - 1] + 0.06) {
        targetIndex = phaseTargets.length - 1;
      } else if (direction < 0 && nearestIndex > 0) {
        targetIndex = nearestIndex - 1;
      }

      if (targetIndex === null) return;
      event.preventDefault();
      snapToPhase(targetIndex);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (unlockTimer) clearTimeout(unlockTimer);
    };
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative h-[500svh] w-full border-t border-white/[0.07] bg-black">
      <div className="sticky top-20 h-[calc(100svh-5rem)] w-full overflow-hidden bg-[#020304]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(107,124,155,0.08),transparent_36%),linear-gradient(to_bottom,rgba(0,0,0,0.2),transparent_24%,transparent_70%,rgba(0,0,0,0.82))]" />

        <motion.div className="absolute inset-0 origin-center" style={{ opacity: modelOpacity, scale: modelScale }}>
          <ProtocolModel3D scrollProgress={cinematicProgress} cinematic />
        </motion.div>

        <header className="pointer-events-none absolute left-6 top-7 z-30 md:left-[7vw] md:top-10">
          <p
            className="mb-3 text-[8px] uppercase tracking-[0.5em] text-white/40"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Four phases · One adaptive system
          </p>
          <h2
            className="text-[clamp(34px,4.2vw,58px)] leading-[0.88] text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.035em" }}
          >
            THE STRIDER PROTOCOL
          </h2>
        </header>

        <div className="pointer-events-none absolute right-6 top-8 z-30 hidden items-center gap-3 md:flex md:right-[7vw] md:top-12">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/35" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/70" />
          </span>
          <span
            className="text-[8px] uppercase tracking-[0.4em] text-white/35"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Scroll to advance
          </span>
        </div>

        {steps.map((phase, index) => (
          <PhaseOverlay key={phase.step} phase={phase} index={index} progress={cinematicProgress} />
        ))}

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-black/75 to-transparent" />
      </div>
    </section>
  );
}
