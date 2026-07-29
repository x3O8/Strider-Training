"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const loadProtocolModel = () => import("@/components/ProtocolModel3D");
const ProtocolModel3D = dynamic(loadProtocolModel, {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.35em] text-white/35">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />
        Loading model
      </div>
    </div>
  ),
});

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
  "right-6 top-[14vh] items-end text-right md:right-[7vw] md:top-[27vh]",
  "left-6 top-[12vh] items-start text-left md:left-[7vw] md:top-[36vh]",
  "right-6 bottom-[7vh] items-end text-right md:right-[7vw]",
];

const assessmentMetrics = [
  { label: "Movement quality", value: 82 },
  { label: "Joint stability", value: 74 },
  { label: "Hip mobility", value: 68 },
  { label: "Shoulder balance", value: 71 },
  { label: "Recovery capacity", value: 79 },
  { label: "Training readiness", value: 88 },
];

const correctiveActions = [
  { issue: "Shoulder imbalance", action: "Unilateral stability work · 3x weekly" },
  { issue: "Restricted hip rotation", action: "Daily 10-minute mobility block" },
  { issue: "Low trunk control", action: "Anti-rotation and carry progressions" },
];

const workoutPlan = [
  { day: "Mon", session: "Lower-body strength", detail: "Squat · Hinge · Carry" },
  { day: "Wed", session: "Movement + engine", detail: "Mobility · Zone 2" },
  { day: "Fri", session: "Upper-body strength", detail: "Push · Pull · Stability" },
  { day: "Sat", session: "Restore", detail: "Mobility · Recovery" },
];

const glassPanelClass =
  "relative mt-5 w-full max-w-[330px] overflow-hidden rounded-[18px] border border-white/[0.16] bg-[linear-gradient(145deg,rgba(25,25,29,0.72),rgba(3,3,5,0.48))] p-4 text-left shadow-[0_28px_90px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl min-[360px]:p-5 md:mt-0 md:p-6";

type PanelMotion = {
  opacity: MotionValue<number>;
  x: MotionValue<number>;
};

function GlassHighlights() {
  return (
    <>
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
      <span className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-orange-500/[0.07] blur-3xl" />
    </>
  );
}

function AssessmentReport({ opacity, x }: PanelMotion) {
  return (
    <motion.div
      className={`${glassPanelClass} md:absolute md:bottom-0 md:left-[calc(100%+4rem)] md:w-[340px] md:max-w-none xl:left-[calc(82vw-380px)]`}
      style={{ opacity, x }}
    >
      <GlassHighlights />
      <div className="relative mb-5 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p
            className="text-[8px] uppercase tracking-[0.34em] text-white/40"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Assessment report
          </p>
          <p
            className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/75"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Athlete profile · 01
          </p>
        </div>
        <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.8)]" />
      </div>
      <div className="relative grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-1">
        {assessmentMetrics.map((metric, metricIndex) => (
          <div key={metric.label}>
            <div className="mb-1.5 flex items-center justify-between text-[8px] uppercase tracking-[0.16em] text-white/45">
              <span>{metric.label}</span>
              <span className="text-white/70">{metric.value}%</span>
            </div>
            <div className="h-px overflow-hidden bg-white/12">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.12 + metricIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="h-full origin-left bg-gradient-to-r from-orange-600 to-orange-400"
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BlueprintAnalysis({ opacity, x }: PanelMotion) {
  return (
    <motion.div
      className={`${glassPanelClass} md:absolute md:right-[calc(100%+4rem)] md:top-0 md:w-[340px] md:max-w-none xl:right-[calc(93vw-380px)]`}
      style={{ opacity, x }}
    >
      <GlassHighlights />
      <div className="relative mb-5 border-b border-white/10 pb-4">
        <p className="text-[8px] uppercase tracking-[0.34em] text-white/40">Correction analysis</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/75">Priority actions · Cycle 01</p>
      </div>
      <div className="relative space-y-4">
        {correctiveActions.map((item, itemIndex) => (
          <motion.div
            key={item.issue}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 + itemIndex * 0.1 }}
            className="border-l border-orange-500/55 pl-3"
          >
            <p className="text-[9px] uppercase tracking-[0.16em] text-orange-400/85">{item.issue}</p>
            <p className="mt-1 text-[10px] leading-relaxed text-white/55">{item.action}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ExecuteWorkoutPlan({ opacity, x }: PanelMotion) {
  return (
    <motion.div
      className={`${glassPanelClass} md:absolute md:left-[calc(100%+4rem)] md:top-0 md:w-[350px] md:max-w-none xl:left-[calc(93vw-390px)]`}
      style={{ opacity, x }}
    >
      <GlassHighlights />
      <div className="relative mb-3 flex items-end justify-between border-b border-white/10 pb-3 md:mb-4 md:pb-4">
        <div>
          <p className="text-[8px] uppercase tracking-[0.34em] text-white/40">Workout plan</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/75">Foundation week · 01</p>
        </div>
        <span className="text-[8px] uppercase tracking-[0.18em] text-orange-400/75">4 sessions</span>
      </div>
      <div className="relative divide-y divide-white/[0.08]">
        {workoutPlan.map((session, sessionIndex) => (
          <motion.div
            key={session.day}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 + sessionIndex * 0.08 }}
            className="grid grid-cols-[38px_1fr] gap-4 py-2.5 md:py-3"
          >
            <span className="text-[9px] uppercase tracking-[0.16em] text-orange-400/80">{session.day}</span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/72">{session.session}</p>
              <p className="mt-0.5 text-[9px] text-white/38">{session.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

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
  const panelInput = isFirst
    ? [0, exit - 0.11, exit + 0.01]
    : [entry - 0.03, entry + 0.018, exit - 0.1, exit + 0.01];
  const panelOpacity = useTransform(progress, panelInput, isFirst ? [1, 1, 0] : [0, 1, 1, 0]);
  const panelOffset = rightAligned ? -22 : 22;
  const panelX = useTransform(
    progress,
    panelInput,
    isFirst ? [0, 0, panelOffset] : [panelOffset, 0, 0, panelOffset]
  );

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
        {isFirst && <AssessmentReport opacity={panelOpacity} x={panelX} />}
        {index === 1 && <BlueprintAnalysis opacity={panelOpacity} x={panelX} />}
        {index === 2 && <ExecuteWorkoutPlan opacity={panelOpacity} x={panelX} />}
    </motion.div>
  );
}

export default function HowWeWorkSticky({ preloadModel = false }: { preloadModel?: boolean }) {
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
  const modelOpacity = useTransform(cinematicProgress, [0, 0.035], [0.62, 0.72]);
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
              lock?: boolean;
              force?: boolean;
              onComplete?: () => void;
            }
          ) => void;
        };
      }).__lenis;

      snapLockRef.current = true;
      if (lenis?.scrollTo) {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        lenis.scrollTo(targetY, {
          duration: reducedMotion ? 0 : 0.58,
          easing: (value) => 1 - Math.pow(1 - value, 4),
          lock: true,
          force: true,
          onComplete: releaseSnap,
        });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }

      unlockTimer = setTimeout(releaseSnap, 720);
    };

    const requestPhase = (direction: -1 | 1) => {
      const rect = section.getBoundingClientRect();
      const sectionIsPinned = rect.top <= 82 && rect.bottom > window.innerHeight - 2;
      if (!sectionIsPinned) return false;

      if (snapLockRef.current) {
        return true;
      }

      const progress = scrollYProgress.get();
      const nearestIndex = phaseTargets.reduce(
        (nearest, target, targetIndex) =>
          Math.abs(target - progress) < Math.abs(phaseTargets[nearest] - progress)
            ? targetIndex
            : nearest,
        0
      );
      let targetIndex: number | null = null;

      if (direction > 0 && nearestIndex < phaseTargets.length - 1) {
        targetIndex = nearestIndex + 1;
      } else if (direction < 0 && progress > phaseTargets[phaseTargets.length - 1] + 0.06) {
        targetIndex = phaseTargets.length - 1;
      } else if (direction < 0 && nearestIndex > 0) {
        targetIndex = nearestIndex - 1;
      }

      if (targetIndex === null) return false;
      snapToPhase(targetIndex);
      return true;
    };

    const claimGesture = (event: Event & { lenisStopPropagation?: boolean }) => {
      event.lenisStopPropagation = true;
      if (event.cancelable) event.preventDefault();
    };

    let accumulatedWheelDelta = 0;
    let wheelResetTimer: ReturnType<typeof setTimeout> | undefined;
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0) return;
      if (Math.sign(accumulatedWheelDelta) !== Math.sign(event.deltaY)) {
        accumulatedWheelDelta = 0;
      }
      accumulatedWheelDelta += event.deltaY;
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
      wheelResetTimer = setTimeout(() => {
        accumulatedWheelDelta = 0;
      }, 120);
      if (Math.abs(accumulatedWheelDelta) < 18) return;

      const direction = accumulatedWheelDelta > 0 ? 1 : -1;
      accumulatedWheelDelta = 0;
      if (!requestPhase(direction)) return;
      (event as WheelEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true;
      event.preventDefault();
    };

    let touchStartY = 0;
    let touchHandled = false;
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
      touchHandled = false;
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (touchHandled || !event.touches[0]) return;
      const deltaY = touchStartY - event.touches[0].clientY;
      if (Math.abs(deltaY) < 28) return;
      if (!requestPhase(deltaY > 0 ? 1 : -1)) return;
      touchHandled = true;
      claimGesture(event as TouchEvent & { lenisStopPropagation?: boolean });
    };
    const handleTouchEnd = () => {
      touchHandled = false;
    };
    const handleKey = (event: KeyboardEvent) => {
      const direction = event.key === "ArrowDown" || event.key === "PageDown"
        ? 1
        : event.key === "ArrowUp" || event.key === "PageUp"
          ? -1
          : 0;
      if (direction === 0 || !requestPhase(direction)) return;
      event.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKey);
      if (unlockTimer) clearTimeout(unlockTimer);
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
    };
  }, [scrollYProgress]);

  return (
    <section id="protocol" ref={sectionRef} className="relative h-[500svh] w-full border-t border-white/[0.07] bg-black">
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
          {preloadModel && (
            <ProtocolModel3D scrollProgress={cinematicProgress} cinematic />
          )}
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
