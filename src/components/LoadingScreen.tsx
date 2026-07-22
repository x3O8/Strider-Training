"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
  ready: boolean;
  onComplete: () => void;
}

const EXIT_DURATION = 320;
const COMPLETION_HOLD = 180;
const SAFETY_TIMEOUT = 10000;

export default function LoadingScreen({ ready, onComplete }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(4);
  const exitStartedRef = useRef(false);
  const completionTimerRef = useRef<number | undefined>(undefined);
  const readyTimerRef = useRef<number | undefined>(undefined);

  const exit = useCallback(() => {
    if (exitStartedRef.current) return;
    exitStartedRef.current = true;
    setIsExiting(true);
    completionTimerRef.current = window.setTimeout(onComplete, EXIT_DURATION);
  }, [onComplete]);

  useEffect(() => {
    if (ready) {
      readyTimerRef.current = window.setTimeout(exit, COMPLETION_HOLD);
      return () => {
        if (readyTimerRef.current !== undefined) {
          window.clearTimeout(readyTimerRef.current);
        }
      };
    }

    const startedAt = performance.now();
    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      // Move quickly through the first half, then ease toward 92% while the
      // hero and the preloaded Protocol scene finish in the background.
      const nextProgress = Math.min(
        92,
        Math.round(4 + 88 * (1 - Math.exp(-elapsed / 1300))),
      );
      setProgress(nextProgress);
    }, 80);

    return () => window.clearInterval(progressTimer);
  }, [ready, exit]);

  useEffect(() => {
    const safetyTimer = window.setTimeout(exit, SAFETY_TIMEOUT);
    return () => {
      window.clearTimeout(safetyTimer);
      if (completionTimerRef.current !== undefined) {
        window.clearTimeout(completionTimerRef.current);
      }
      if (readyTimerRef.current !== undefined) {
        window.clearTimeout(readyTimerRef.current);
      }
    };
  }, [exit]);

  const displayedProgress = ready ? 100 : progress;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          aria-hidden="true"
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION / 1000, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
        >
          <div className="flex -translate-y-[2vh] flex-col items-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              src="/stryder-gif.mp4"
              className="h-auto w-[310px] max-w-[calc(100vw-10px)] object-contain sm:w-[clamp(11rem,18vw,15rem)] sm:max-w-none"
            />

            <div className="mt-8 w-[clamp(10rem,17vw,15.5rem)]">
              <div className="h-px overflow-hidden bg-white/25">
                <div
                  className="h-full origin-left bg-white transition-transform duration-150 ease-out"
                  style={{ transform: `scaleX(${displayedProgress / 100})` }}
                />
              </div>
              <p
                className="mt-4 text-center text-[9px] tracking-[0.22em] text-white/35 tabular-nums"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {displayedProgress}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
