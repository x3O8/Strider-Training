"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollProgressBar() {
  const labelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const thumbY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    let lastValue = -1;
    return scrollYProgress.on("change", (value) => {
      const nextValue = Math.round(value * 100);
      if (nextValue === lastValue || !labelRef.current) return;
      lastValue = nextValue;
      labelRef.current.textContent = `${nextValue}%`;
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* ── Fixed LEFT-side progress track ──── */}
      <div
        style={{
          position: "fixed",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          height: "180px",
          width: "2px",
          background: "rgba(255,255,255,0.07)",
          borderRadius: "2px",
          zIndex: 200,
          overflow: "visible",
        }}
      >
        {/* Fill */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            scaleY: scrollYProgress,
            transformOrigin: "top",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.7))",
            borderRadius: "2px",
            boxShadow: "0 0 6px rgba(255,255,255,0.15)",
            willChange: "transform",
          }}
        />
        {/* Thumb dot */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            y: thumbY,
            willChange: "transform",
          }}
        >
          <div
            style={{
              transform: "translate(-50%, -50%)",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.85)",
              boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            }}
          />
        </motion.div>
      </div>

      {/* % label, rotated for vertical reading */}
      <div
        ref={labelRef}
        style={{
          position: "fixed",
          left: "3px",
          top: "calc(50% + 100px)",
          zIndex: 200,
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          fontSize: "8px",
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.25)",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          userSelect: "none",
        }}
      >
        0%
      </div>
    </>
  );
}
