"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate loading progress with an eased curve
    const duration = 3200; // total loading time in ms
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const raw = Math.min(elapsed / duration, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        // Loading complete — start exit animation
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 800); // Wait for exit animation to finish
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  // Play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#000000",
          }}
        >
          {/* Video logo animation */}
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

          {/* Progress bar container */}

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
            {/* Progress bar track */}
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
              {/* Progress bar fill */}
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: "4px",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.9))",
                  width: `${progress}%`,
                  boxShadow: "0 0 12px rgba(255,255,255,0.3)",
                }}
                transition={{ duration: 0.1 }}
              />
              {/* Shimmer effect */}
              <motion.div
                animate={{
                  x: ["-100%", "300%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
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

            {/* Progress percentage */}
            <span
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "rgba(255, 255, 255, 0.3)",
                textTransform: "uppercase",
              }}
            >
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
