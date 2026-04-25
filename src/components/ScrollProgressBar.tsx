"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      rafId = requestAnimationFrame(update);
    };
    
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${progress}%`,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.7))",
            borderRadius: "2px",
            transition: "none",
            boxShadow: "0 0 6px rgba(255,255,255,0.15)",
          }}
        />
        {/* Thumb dot */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            transition: "none",
          }}
        />
      </div>

      {/* % label, rotated for vertical reading */}
      <div
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
        {Math.round(progress)}%
      </div>
    </>
  );
}
