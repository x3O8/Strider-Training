"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  progress: number;
  ready: boolean;
  onComplete: () => void;
}

const MINIMUM_LOADING_TIME = 1200;
const EXIT_DURATION = 600;

export default function LoadingScreen({
  progress,
  ready,
  onComplete,
}: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);
  const mountedAtRef = useRef(Date.now());

  useEffect(() => {
    if (!ready || completedRef.current) return;
    completedRef.current = true;

    const elapsed = Date.now() - mountedAtRef.current;
    const remainingMinimum = Math.max(0, MINIMUM_LOADING_TIME - elapsed);
    let completeTimer: number | undefined;

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
      completeTimer = window.setTimeout(onComplete, EXIT_DURATION);
    }, remainingMinimum);

    return () => {
      window.clearTimeout(exitTimer);
      if (completeTimer !== undefined) window.clearTimeout(completeTimer);
    };
  }, [ready, onComplete]);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const displayedProgress = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: EXIT_DURATION / 1000, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "180px",
              height: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
              position: "relative",
            }}
          >
            <video
              ref={videoRef}
              src="/stryder-gif.mp4"
              muted
              loop
              playsInline
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                mixBlendMode: "screen",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              width: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "2px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: "4px",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.9))",
                  width: `${displayedProgress}%`,
                  boxShadow: "0 0 12px rgba(255,255,255,0.3)",
                }}
                transition={{ duration: 0.1 }}
              />
              <motion.div
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "30%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  borderRadius: "4px",
                }}
              />
            </div>

            <span
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "rgba(255, 255, 255, 0.3)",
                textTransform: "uppercase",
              }}
            >
              {displayedProgress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
