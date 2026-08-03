"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CoachingProgram } from "@/data/products";
import { useState } from "react";
import Image from "next/image";

function ProgramVisual({ program, index }: { program: CoachingProgram; index: number }) {
  const tiers = ["01", "02", "03"];
  return (
    <div className="relative w-full aspect-[4/3] md:h-48 bg-[#0b0b0b] overflow-hidden flex items-center justify-center">
      <Image
        src={program.image}
        alt={program.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out group-hover:opacity-80 ${program.id === "competition-prep" ? "object-top" : "object-center"}`}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent pointer-events-none" />

      {/* Large tier number overlay */}
      <span
        className="absolute text-[110px] text-white/10 leading-none select-none pointer-events-none right-4 bottom-[-15px]"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {tiers[index]}
      </span>
    </div>
  );
}

export default function ProgramCard({ 
  program, 
  index, 
  expanded, 
  onToggle,
  onApply
}: { 
  program: CoachingProgram; 
  index: number; 
  expanded: boolean; 
  onToggle: () => void;
  onApply: (goal: string) => void;
}) {
  const [applied, setApplied] = useState(false);

  const handleApplyClick = () => {
    setApplied(true);
    // Map program ID to specific form goal
    const goalMap: Record<string, string> = {
      "general-fitness": "General Fitness",
      "competition-prep": "Sports Performance"
    };
    onApply(goalMap[program.id] || "General Fitness");
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <motion.div
      id={`program-${program.id}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="group relative flex h-full snap-start flex-col overflow-hidden border border-white/[0.07] bg-[#0a0a0a]"
    >
      {/* Badge */}
      {program.badge && (
        <div className="absolute top-3 right-3 z-10">
          <span
            className="px-2.5 py-1 text-[8px] text-white tracking-[0.22em] uppercase border border-white/20"
            style={{ fontFamily: "var(--font-inter), sans-serif", background: "rgba(0,0,0,0.8)" }}
          >
            {program.badge}
          </span>
        </div>
      )}

      {/* Abstract top visual */}
      <ProgramVisual program={program} index={index} />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5 min-[360px]:p-6 sm:gap-5 sm:p-7">

        {/* Title + tagline */}
        <div>
          <h3
            className="text-2xl text-white leading-none mb-1.5 sm:text-3xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
          >
            {program.name}
          </h3>
          <p
            className="text-[10px] font-bold text-white tracking-[0.22em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {program.tagline}
          </p>
          <p
            className="ml-3 border-l border-white/30 pl-5 text-[10px] leading-[1.75] text-white md:ml-5 md:text-[11px]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {program.description}
          </p>
        </div>

        {/* Primary programme outcomes */}
        <div className="space-y-5 border-y border-white/[0.1] py-5">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Ideal for</p>
            <p className="ml-3 border-l border-white/20 pl-5 text-[10px] leading-[1.75] text-white md:ml-5 md:text-[11px]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{program.forWho}</p>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Results</p>
            <p className="ml-3 border-l border-white/20 pl-5 text-[10px] leading-[1.75] text-white md:ml-5 md:text-[11px]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{program.resultsTimeline}</p>
          </div>
        </div>

        {/* Expandable "What's included" */}
        <div>
          <button
            onClick={onToggle}
            className="mb-3 flex min-h-11 items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 sm:min-h-0"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▶
            </motion.span>
            Your Coaching Experience
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="mb-4 ml-3 space-y-2 border-l border-white/20 pl-5 md:ml-5">
                  {program.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-white text-[9px] flex-shrink-0">✓</span>
                      <span
                        className="text-[9px] text-white leading-snug md:text-[10px]"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Commitment */}
                <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-[8px] font-bold text-white tracking-[0.2em] uppercase mt-0.5 flex-shrink-0" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Recommended commitment</span>
                    <span className="ml-3 border-l border-white/20 pl-5 text-[9px] leading-snug text-white md:ml-5 md:text-[10px]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{program.commitment}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* System components */}
        <div>
          <p
            className="mb-2 text-[9px] font-bold uppercase tracking-[0.24em] text-white"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            System Components
          </p>
          <div className="ml-3 flex flex-wrap gap-1.5 border-l border-white/20 pl-5 md:ml-5">
            {program.features.map((feature) => (
              <span
                key={feature}
                className="border border-white/20 px-2.5 py-1 text-[7px] uppercase tracking-[0.14em] text-white md:text-[8px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-col gap-4 mt-auto pt-5 border-t border-white/[0.07] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              className="text-4xl text-white leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
            >
              {program.price}
            </span>
            <span
              className="ml-1 text-[10px] text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {program.per}
            </span>
          </div>

          <motion.button
            id={`apply-${program.id}`}
            onClick={handleApplyClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto min-h-11 px-5 py-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase bg-white text-black transition-colors duration-200 hover:bg-white/88 sm:min-h-0"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {applied ? "✓ Applied" : "START YOUR JOURNEY"}
          </motion.button>
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 border border-white/0 pointer-events-none transition-all duration-300 group-hover:border-white/16" />
    </motion.div>
  );
}
