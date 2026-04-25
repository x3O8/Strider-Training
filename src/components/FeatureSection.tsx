"use client";

import { motion } from "framer-motion";
import { features, FeatureHighlight } from "@/data/products";
import Image from "next/image";


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
      <div className="relative w-14 h-14 rounded-full border border-white/20 bg-[#0a0a0a] flex items-center justify-center text-2xl mb-5 group">
        <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/40 transition-colors duration-500" />
        <span style={{ filter: "grayscale(1) brightness(2)" }}>{feature.icon}</span>
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

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-28 pb-16 md:pb-20 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
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
          <div className="flex flex-col gap-12 lg:gap-40 relative z-10 w-full lg:w-auto items-center lg:items-end">
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
              <div className="text-center">
                <span
                  className="block text-[9px] text-white/40 tracking-[0.4em] uppercase mb-2"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Powered By
                </span>
                <div className="relative w-32 h-10 lg:w-40 lg:h-12 mx-auto mt-1">
                  <Image
                    src="/strider-logo.png"
                    alt="Strider"
                    fill
                    sizes="(max-width: 1024px) 128px, 160px"
                    className="object-contain"
                  />

                </div>

              </div>
            </div>
          </motion.div>

          {/* Right Arc Cards */}
          <div className="flex flex-col gap-12 lg:gap-40 relative z-10 w-full lg:w-auto items-center lg:items-start">
            <OrbitalCard feature={rightFeatures[0]} align="left" delay={0.2} />
            <OrbitalCard feature={rightFeatures[1]} align="left" delay={0.4} />
          </div>

        </div>

      </div>
    </section>
  );
}
