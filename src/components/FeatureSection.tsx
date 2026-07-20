"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { features, FeatureHighlight } from "@/data/products";

function PremiumIcon({ type }: { type: FeatureHighlight["icon"] }) {
  if (type === "credential") {
    return (
      <div className="relative h-7 w-7" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rotate-45 rounded-[5px] border border-white/75" />
        <div className="absolute left-1/2 top-[7px] h-2 w-2 -translate-x-1/2 rotate-45 bg-white/85" />
        <div className="absolute bottom-0 left-[7px] h-2.5 w-px -rotate-[24deg] bg-white/45" />
        <div className="absolute bottom-0 right-[7px] h-2.5 w-px rotate-[24deg] bg-white/45" />
      </div>
    );
  }

  if (type === "plan") {
    return (
      <div className="flex h-7 w-7 flex-col justify-center gap-[5px]" aria-hidden="true">
        {["w-5", "w-4", "w-6"].map((width, index) => (
          <div key={width} className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-sm border ${index === 1 ? "border-white/40" : "border-white/80"}`} />
            <span className={`h-px ${width} bg-gradient-to-r from-white/80 to-white/20`} />
          </div>
        ))}
      </div>
    );
  }

  if (type === "analytics") {
    return (
      <div className="relative flex h-7 w-7 items-end gap-[3px] border-b border-white/25 pb-0.5" aria-hidden="true">
        <span className="h-2 w-1 bg-white/30" />
        <span className="h-3.5 w-1 bg-white/50" />
        <span className="h-5 w-1 bg-white/80" />
        <span className="h-6 w-1 bg-white" />
        <span className="absolute left-0 top-[7px] h-px w-7 -rotate-[28deg] bg-white/70" />
      </div>
    );
  }

  return (
    <div className="relative h-7 w-7" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-5 rounded-[7px] border border-white/70" />
      <div className="absolute left-1.5 top-2 h-px w-4 bg-gradient-to-r from-white/70 to-white/20" />
      <div className="absolute bottom-1 left-1.5 h-2 w-2 -skew-x-[28deg] border-b border-l border-white/70" />
      <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-white/70" />
    </div>
  );
}

function OrbitalCard({ feature, align, delay }: { feature: FeatureHighlight; align: "left" | "right"; delay: number }) {
  const isLeftAlign = align === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeftAlign ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={`flex flex-col ${
        isLeftAlign ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right"
      } items-center text-center max-w-sm p-6 lg:p-0 rounded-2xl bg-white/[0.02] lg:bg-transparent border border-white/[0.05] lg:border-transparent backdrop-blur-md lg:backdrop-blur-none hover:bg-white/[0.04] lg:hover:bg-transparent transition-all`}
    >
      <div className="group relative mb-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/[0.16] bg-gradient-to-br from-white/[0.09] via-[#0b0b0b] to-black shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_30px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-[3px] rounded-[9px] border border-white/[0.04] transition-colors duration-500 group-hover:border-white/[0.14]" />
        <div className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-white/[0.08] blur-lg" />
        <PremiumIcon type={feature.icon} />
      </div>
      <h3
        className="text-2xl text-white leading-none mb-3"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
      >
        {feature.title}
      </h3>
      <p
        className="text-xs text-white/70 lg:text-white/50 leading-relaxed max-w-xs"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function FeatureSection() {
  const leftFeatures = features.filter((f) => f.position === "left");
  const rightFeatures = features.filter((f) => f.position === "right");

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
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
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

        {/* Orbital Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 relative">
          
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

          {/* Left Arc Cards */}
          <div className="flex flex-col gap-12 lg:gap-24 relative z-10 w-full lg:w-auto items-center lg:items-end">
            <OrbitalCard feature={leftFeatures[0]} align="right" delay={0.1} />
            <OrbitalCard feature={leftFeatures[1]} align="right" delay={0.3} />
          </div>

          {/* Center Dimensional Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-20 w-72 h-72 lg:w-96 lg:h-96 flex-shrink-0 flex items-center justify-center my-10 lg:my-0"
          >
            {/* Structural Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-white/10 border-t-white/40 border-b-white/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute inset-6 rounded-full border border-white/5 border-l-white/50"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-12 rounded-full border border-white/5 border-r-white/30"
            />

            {/* Inner Core */}
            <div className="absolute inset-16 bg-[#030303] rounded-full border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] flex items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/strider-logo.png"
                  alt="Strider"
                  width={176}
                  height={36}
                  className="mb-3 h-auto w-[125px] object-contain opacity-95 lg:w-[176px]"
                />
                <span className="mb-3 h-px w-10 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                <span
                  className="block text-[9px] text-white/60 leading-none uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.28em" }}
                >
                  Training Systems
                </span>

              </div>
            </div>
          </motion.div>

          {/* Right Arc Cards */}
          <div className="flex flex-col gap-12 lg:gap-24 relative z-10 w-full lg:w-auto items-center lg:items-start">
            <OrbitalCard feature={rightFeatures[0]} align="left" delay={0.2} />
            <OrbitalCard feature={rightFeatures[1]} align="left" delay={0.4} />
          </div>

        </div>

      </div>
    </section>
  );
}
