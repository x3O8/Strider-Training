"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { features, FeatureHighlight } from "@/data/products";

function PremiumIcon({ type }: { type: FeatureHighlight["icon"] }) {
  if (type === "credential") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3.5 25 7v7.2c0 6.1-3.6 10.9-9 14.3-5.4-3.4-9-8.2-9-14.3V7l9-3.5Z" />
        <path d="m11.5 15.7 3 3 6.3-6.5" />
      </svg>
    );
  }

  if (type === "plan") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round">
        <path d="M5 8h8M19 8h8M5 16h15M25 16h2M5 24h4M15 24h12" />
        <circle cx="16" cy="8" r="3" />
        <circle cx="23" cy="16" r="3" />
        <circle cx="12" cy="24" r="3" />
      </svg>
    );
  }

  if (type === "analytics") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5v22h22" />
        <path d="m8 22 5.2-5.5 4.2 2.7L25 10" />
        <path d="M20.5 10H25v4.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6.5h20a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-2.5 2.5H15l-6.5 5v-5H6A2.5 2.5 0 0 1 3.5 20V9A2.5 2.5 0 0 1 6 6.5Z" />
      <path d="M10 13h12M10 17h8" />
    </svg>
  );
}

const sectorLayout = [
  {
    clipPath: "polygon(50% 50%, 0 50%, 0 0, 50% 0)",
    contentClass: "left-[21%] top-[21%]",
  },
  {
    clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 50%)",
    contentClass: "left-[79%] top-[21%]",
  },
  {
    clipPath: "polygon(50% 50%, 50% 100%, 0 100%, 0 50%)",
    contentClass: "left-[21%] top-[79%]",
  },
  {
    clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
    contentClass: "left-[79%] top-[79%]",
  },
] as const;

export default function FeatureSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const activeFeature = features[activeIndex];

  useEffect(() => {
    if (isInteracting) return;
    const rotationTimer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 4000);
    return () => window.clearTimeout(rotationTimer);
  }, [activeIndex, isInteracting]);

  return (
    <section id="features" className="relative bg-black border-t border-white/8 overflow-hidden">
      
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-14 md:pb-16 relative z-10">
        <div
          className="grid items-center gap-y-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(430px,1.14fr)] lg:gap-x-16 lg:gap-y-0"
        >
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center lg:self-end lg:text-left"
        >
          <p
            className="text-[9px] text-white/40 tracking-[0.5em] uppercase mb-5"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Why Choose Strider
          </p>
          <h2
            className="text-[clamp(48px,8vw,90px)] text-white leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
          >
            Results You<br />Can Measure
          </h2>
        </motion.div>

        {/* Interactive system wheel */}
        <div
          className="relative flex min-h-[460px] flex-col items-center justify-center gap-7 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-[540px]"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onFocusCapture={() => setIsInteracting(true)}
          onBlurCapture={() => setIsInteracting(false)}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.014] blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-20 aspect-square w-[min(80vw,320px)] flex-shrink-0 lg:w-[430px]"
          >
            {/* Quiet idle orbits */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 44, ease: "linear" }}
              className="pointer-events-none absolute -inset-2 rounded-full border border-white/[0.08] border-t-white/28"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 64, ease: "linear" }}
              className="pointer-events-none absolute -inset-4 rounded-full border border-white/[0.04] border-b-white/14"
            />

            <div className="pointer-events-none absolute inset-0 rounded-full border border-white/14 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.045),rgba(255,255,255,0.008)_52%,rgba(0,0,0,0.92)_78%)] shadow-[inset_0_0_45px_rgba(255,255,255,0.018),0_24px_70px_rgba(0,0,0,0.5)]" />

            {features.map((feature, index) => {
              const isActive = activeIndex === index;
              const layout = sectorLayout[index];

              return (
                <motion.button
                  key={feature.title}
                  type="button"
                  aria-label={`${feature.title}: ${feature.description}`}
                  aria-pressed={isActive}
                  aria-controls="feature-dialog"
                  onMouseEnter={() => {
                    setIsInteracting(true);
                    setActiveIndex(index);
                  }}
                  onMouseLeave={() => setIsInteracting(false)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  animate={isActive
                    ? {
                        scale: [1.035, 1.055, 1.035],
                        opacity: [0.96, 1, 0.96],
                        boxShadow: [
                          "inset 0 0 32px rgba(255,255,255,0.10), 0 0 18px rgba(255,255,255,0.06)",
                          "inset 0 0 64px rgba(255,255,255,0.28), 0 0 34px rgba(255,255,255,0.16)",
                          "inset 0 0 32px rgba(255,255,255,0.10), 0 0 18px rgba(255,255,255,0.06)",
                        ],
                      }
                    : { scale: 1, opacity: 1, boxShadow: "inset 0 0 0 rgba(255,255,255,0)" }}
                  transition={isActive
                    ? { duration: 1.9, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-0 rounded-full focus-visible:outline-none ${
                    isActive
                      ? "z-20 bg-white/[0.16]"
                      : "z-10 bg-white/[0.012] hover:bg-white/[0.04]"
                  }`}
                  style={{ clipPath: layout.clipPath }}
                >
                  <span className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${layout.contentClass}`}>
                    <motion.span
                      className="flex items-center justify-center"
                      animate={isActive
                        ? { y: 0, scale: 1.18, opacity: 1 }
                        : { y: [0, -3, 0], scale: [1, 1.025, 1], opacity: [0.72, 0.95, 0.72] }}
                      transition={isActive
                        ? { duration: 0.25, ease: "easeOut" }
                        : { duration: 4.6 + index * 0.55, delay: index * 0.35, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className={`flex h-10 w-10 items-center justify-center transition-all duration-300 lg:h-12 lg:w-12 ${
                        isActive
                          ? "text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.65)]"
                          : "text-white/62"
                      }`}>
                        <PremiumIcon type={feature.icon} />
                      </span>
                    </motion.span>
                  </span>
                </motion.button>
              );
            })}

            {/* Inner boundary */}
            <div className="pointer-events-none absolute inset-[18%] z-20 rounded-full border border-white/10" />

            {/* Inner Core */}
            <motion.div
              className="absolute inset-[18%] z-30 flex items-center justify-center rounded-full border border-white/10 bg-[#030303] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_0_42px_rgba(0,0,0,0.88)]"
              animate={{ scale: [1, 1.008, 1] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/strider-logo.png"
                  alt="Strider"
                  width={176}
                  height={36}
                  className="mb-2 h-auto w-[104px] object-contain opacity-95 min-[360px]:w-[116px] lg:mb-3 lg:w-[176px]"
                />
                <span className="mb-2 h-px w-8 bg-gradient-to-r from-transparent via-white/35 to-transparent lg:mb-3 lg:w-10" />
                <span
                  className="block text-[7px] uppercase leading-none text-white/60 lg:text-[9px]"
                  style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.28em" }}
                >
                  Training Systems
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center gap-3 text-[8px] uppercase tracking-[0.34em] text-white lg:absolute lg:bottom-5"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/35" />
            Hover or tap a sector
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-white/35" />
          </motion.div>

        </div>

          {/* Description dialog */}
          <div className="relative z-30 w-full max-w-sm lg:col-start-1 lg:row-start-2 lg:h-[360px] lg:w-full lg:max-w-[390px] lg:self-start" aria-live="polite">
            <AnimatePresence mode="wait">
              {activeFeature ? (
                <motion.div
                  id="feature-dialog"
                  key={activeFeature.title}
                  initial={{ opacity: 0, x: -22, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -12, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="relative border border-white/15 bg-[#070707]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:absolute lg:inset-x-0 lg:top-0 lg:p-8"
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                  <span className="absolute -right-16 top-1/2 hidden h-px w-16 bg-gradient-to-l from-transparent to-white/25 lg:block" />
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center text-white/85">
                      <PremiumIcon type={activeFeature.icon} />
                    </span>
                    <span
                      className="text-[9px] uppercase tracking-[0.35em] text-white/30"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      System {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    className="mb-4 text-4xl leading-none text-white lg:text-5xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.035em" }}
                  >
                    {activeFeature.title}
                  </h3>
                  <p
                    className="text-sm font-light leading-[1.8] text-white/58"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {activeFeature.description}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
