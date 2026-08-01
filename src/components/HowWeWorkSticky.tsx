"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
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
    eyebrow: "Understand the individual",
    description:
      "Every Strider journey begins with understanding the individual. We evaluate every variable that influences performance—from internal and external health markers to movement quality, recovery, habits, lifestyle, training history, experience, and goals—to build the system around you.",
  },
  {
    step: "02",
    heading: "Blueprint",
    eyebrow: "Design the system",
    description:
      "Guided by your assessment, we engineer a personalized performance system where every variable—from training and nutrition to recovery, lifestyle, habits, and progression—is intentionally integrated into one adaptive blueprint.",
  },
  {
    step: "03",
    heading: "Execution",
    eyebrow: "Execute the blueprint",
    description:
      "Your blueprint becomes action. Every training session, meal, recovery strategy, and daily habit is executed as part of one connected system. Along the way, Strider continuously collects data on performance, recovery, adherence, and progress—creating the feedback needed to refine your program and drive long-term results.",
  },
  {
    step: "04",
    heading: "Evolution",
    eyebrow: "Adapt and evolve",
    description:
      "Human performance is never static, and neither is your system. Every cycle of execution generates new data, leading to reassessment, refinement, and more precise decisions. As the cycle repeats, Strider continuously evolves your system to match your body's changing needs, helping you achieve better health, performance, and longevity.",
  },
];

const phaseTargets = [0, 0.27, 0.52, 0.77];
const phasePositions = [
  "left-6 bottom-[13vh] items-start text-left md:left-[18vw] md:bottom-[15vh]",
  "right-6 top-[20vh] items-end text-right md:right-[7vw] md:top-[27vh]",
  "left-6 top-[20vh] items-start text-left md:left-[7vw] md:top-[36vh]",
  "right-6 bottom-[2vh] items-end text-right md:right-[7vw] md:bottom-[7vh]",
];

const assessmentMetrics = [
  { label: "Movement capacity", value: 82 },
  { label: "Structural integrity", value: 74 },
  { label: "Health markers", value: 68 },
  { label: "Recovery status", value: 71 },
  { label: "Lifestyle habits", value: 79 },
  { label: "Performance goals", value: 88 },
];

const blueprintInputs = [
  "Anatomy",
  "Movement",
  "Strength",
  "Nutrition",
  "Recovery",
  "Lifestyle",
  "Bloodwork",
  "Goals",
];

const workoutPlan = [
  { day: "Mon", session: "Lower-body strength", detail: "Squat · Hinge · Carry" },
  { day: "Wed", session: "Movement + engine", detail: "Mobility · Zone 2" },
  { day: "Fri", session: "Upper-body strength", detail: "Push · Pull · Stability" },
  { day: "Sat", session: "Restore", detail: "Mobility · Recovery" },
];

const evolutionNodes = [
  { label: "Assessment", status: "82%", position: "left-1/2 top-0 -translate-x-1/2" },
  { label: "Blueprint", status: "Ready", position: "right-0 top-1/2 -translate-y-1/2 min-[360px]:-right-[9px]" },
  { label: "Execution", status: "Active", position: "bottom-0 left-1/2 -translate-x-1/2" },
  { label: "Evolution", status: "+2.4%", position: "left-0 top-1/2 -translate-y-1/2 min-[360px]:-left-[9px]" },
];

const evolutionDots = Array.from({ length: 6 }, (_, index) => index);
const evolutionCycleDuration = 12;

const glassPanelClass =
  "relative mt-5 w-[92%] max-w-[270px] overflow-hidden rounded-[18px] border border-white/[0.16] bg-[linear-gradient(145deg,rgba(25,25,29,0.72),rgba(3,3,5,0.48))] p-3.5 text-left shadow-[0_28px_90px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl min-[360px]:p-4 md:mt-0 md:p-6";

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
          <div key={metric.label} className={metricIndex >= 3 ? "hidden md:block" : undefined}>
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

function BlueprintAnalysis({ opacity, x, progress }: PanelMotion & { progress: MotionValue<number> }) {
  const [generationStatus, setGenerationStatus] = useState<"idle" | "generating" | "complete">("idle");
  const [generationCycle, setGenerationCycle] = useState(0);
  const generationTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const phaseActiveRef = useRef(false);

  useEffect(() => {
    const updateGeneration = (value: number) => {
      const isBlueprintPhase = value >= 0.245 && value < 0.52;

      if (isBlueprintPhase && !phaseActiveRef.current) {
        phaseActiveRef.current = true;
        setGenerationCycle((cycle) => cycle + 1);
        setGenerationStatus("generating");
        generationTimerRef.current = setTimeout(() => {
          setGenerationStatus("complete");
        }, 2200);
      } else if (!isBlueprintPhase && phaseActiveRef.current) {
        phaseActiveRef.current = false;
        if (generationTimerRef.current) clearTimeout(generationTimerRef.current);
        generationTimerRef.current = undefined;
      }
    };

    updateGeneration(progress.get());
    const unsubscribe = progress.on("change", updateGeneration);

    return () => {
      unsubscribe();
      if (generationTimerRef.current) clearTimeout(generationTimerRef.current);
    };
  }, [progress]);

  return (
    <motion.div
      className={`${glassPanelClass} md:absolute md:right-[calc(100%+4rem)] md:top-0 md:w-[340px] md:max-w-none xl:right-[calc(93vw-380px)]`}
      style={{ opacity, x }}
    >
      <GlassHighlights />
      <div className="relative mb-5 border-b border-white/10 pb-4">
        <p className="text-[8px] uppercase tracking-[0.34em] text-white/40">System blueprint</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/75">Input layers · Cycle 01</p>
      </div>
      <div className="relative grid grid-cols-2 gap-3">
        {blueprintInputs.map((input, itemIndex) => (
          <motion.div
            key={input}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 + itemIndex * 0.08 }}
            className="border-l border-blue-400/55 pl-3"
          >
            <p className="text-[9px] uppercase tracking-[0.16em] text-blue-300/85">{input}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.9 }}
        className="relative mt-5 border-t border-white/10 pt-4"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-[8px] uppercase tracking-[0.28em] text-white/35">Output</p>
          <motion.p
            key={generationStatus}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-right text-[8px] uppercase tracking-[0.14em] ${
              generationStatus === "complete" ? "text-emerald-400" : "text-blue-300/85"
            }`}
          >
            {generationStatus === "complete" ? "Adaptive Blueprint Generated" : "Generating..."}
          </motion.p>
        </div>
        <div className="mt-3 h-px overflow-hidden bg-white/10">
          <motion.div
            key={generationCycle}
            className={`h-full origin-left ${generationStatus === "complete" ? "bg-emerald-400" : "bg-blue-400"}`}
            initial={{ scaleX: 0 }}
            animate={
              generationStatus === "complete"
                ? { scaleX: 1, opacity: 1 }
                : generationStatus === "generating"
                  ? { scaleX: 0.94, opacity: 1 }
                  : { scaleX: 0, opacity: 0 }
            }
            transition={
              generationStatus === "generating"
                ? { duration: 2.1, ease: "linear" }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            }
          />
        </div>
      </motion.div>
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

function EvolutionSystemLoop({ opacity, x }: PanelMotion) {
  return (
    <motion.div
      className={`${glassPanelClass} md:absolute md:bottom-0 md:right-[calc(100%+4rem)] md:w-[350px] md:max-w-none xl:right-[calc(93vw-390px)]`}
      style={{ opacity, x }}
    >
      <GlassHighlights />
      <div className="relative mb-4 border-b border-white/10 pb-4">
        <p className="text-[8px] uppercase tracking-[0.34em] text-white/40">System evolution</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/75">Continuous optimization loop</p>
      </div>

      <div className="relative mx-auto aspect-square w-[240px] max-w-full min-[360px]:w-[280px]">
        <svg aria-hidden="true" viewBox="0 0 280 280" className="absolute inset-0 z-10 h-full w-full overflow-visible">
          <circle cx="140" cy="140" r="112" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          {evolutionDots.map((dotIndex) => {
            const stagger = (dotIndex + 1) * 0.01;
            const travel = 0.12;

            return (
              <motion.circle
                key={dotIndex}
                cx="140"
                cy="28"
                r={2.8 + dotIndex * 0.1}
                fill={`rgba(255,255,255,${0.68 + dotIndex * 0.06})`}
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="0.45"
                animate={{ rotate: [0, 0, 90, 90, 180, 180, 270, 270, 360, 360] }}
                transition={{
                  duration: evolutionCycleDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [
                    0,
                    stagger,
                    travel + stagger,
                    0.25 + stagger,
                    0.25 + travel + stagger,
                    0.5 + stagger,
                    0.5 + travel + stagger,
                    0.75 + stagger,
                    0.75 + travel + stagger,
                    1,
                  ],
                }}
                style={{
                  transformBox: "view-box",
                  transformOrigin: "140px 140px",
                  filter: "drop-shadow(0 0 4px rgba(255,255,255,0.95))",
                }}
              />
            );
          })}
        </svg>

        {evolutionNodes.map((node, nodeIndex) => {
          const firstDotArrival = nodeIndex === 0 ? 0.88 : 0.13 + (nodeIndex - 1) * 0.25;

          return (
            <motion.div
              key={node.label}
              className={`absolute z-20 flex h-[56px] w-[74px] flex-col items-center justify-center rounded-xl border border-white/15 bg-black text-center shadow-none min-[360px]:w-[74px] ${node.position}`}
              animate={{
                scale: [1, 1, 1.045, 1, 1],
                borderColor: [
                  "rgba(255,255,255,0.15)",
                  "rgba(255,255,255,0.15)",
                  "rgba(255,255,255,0.72)",
                  "rgba(255,255,255,0.24)",
                  "rgba(255,255,255,0.15)",
                ],
              }}
              transition={{
                duration: evolutionCycleDuration,
                repeat: Infinity,
                ease: "linear",
                times: [0, firstDotArrival - 0.015, firstDotArrival, firstDotArrival + 0.05, 1],
              }}
            >
              <span className="relative z-30 text-[7px] uppercase tracking-[0.12em] text-white/72">{node.label}</span>
              <motion.span
                className="relative z-30 mt-1 text-[7px] uppercase tracking-[0.12em] text-white/62"
                animate={{ opacity: [0.48, 0.88, 0.48] }}
                transition={{ duration: 3.8 + nodeIndex * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                {node.status}
              </motion.span>
            </motion.div>
          );
        })}

        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-transparent text-center">
          <span className="text-xl leading-none text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}>YOU</span>
        </div>
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
    : isLast
      ? [entry - 0.03, entry + 0.018, 1]
      : [entry - 0.03, entry + 0.018, exit - 0.1, exit + 0.01];
  const panelOpacity = useTransform(
    progress,
    panelInput,
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const panelOffset = rightAligned ? -22 : 22;
  const panelX = useTransform(
    progress,
    panelInput,
    isFirst ? [0, 0, panelOffset] : isLast ? [panelOffset, 0, 0] : [panelOffset, 0, 0, panelOffset]
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
        {index === 1 && <BlueprintAnalysis opacity={panelOpacity} x={panelX} progress={progress} />}
        {index === 2 && <ExecuteWorkoutPlan opacity={panelOpacity} x={panelX} />}
        {isLast && <EvolutionSystemLoop opacity={panelOpacity} x={panelX} />}
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
