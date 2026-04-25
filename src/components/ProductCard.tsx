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
        className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out group-hover:opacity-80"
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

export default function ProgramCard({ program, index, expanded, onToggle }: { program: CoachingProgram; index: number; expanded: boolean; onToggle: () => void }) {
  const [applied, setApplied] = useState(false);

  return (
    <motion.div
      id={`program-${program.id}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="group relative flex flex-col border border-white/[0.07] bg-[#0a0a0a] overflow-hidden h-full"
    >
      {/* Badge */}
      {program.badge && (
        <div className="absolute top-3 right-3 z-10">
          <span
            className="px-2.5 py-1 text-[8px] text-white/50 tracking-[0.22em] uppercase border border-white/12"
            style={{ fontFamily: "var(--font-inter), sans-serif", background: "rgba(0,0,0,0.8)" }}
          >
            {program.badge}
          </span>
        </div>
      )}

      {/* Abstract top visual */}
      <ProgramVisual program={program} index={index} />

      {/* Content */}
      <div className="flex flex-col flex-1 p-7 gap-5">

        {/* Title + tagline */}
        <div>
          <h3
            className="text-3xl text-white leading-none mb-1.5"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
          >
            {program.name}
          </h3>
          <p
            className="text-[9px] text-white/35 tracking-[0.22em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {program.tagline}
          </p>
          <p
            className="text-xs text-white/40 leading-relaxed"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {program.description}
          </p>
        </div>

        {/* Short feature tags */}
        <div className="flex flex-wrap gap-1.5">
          {program.features.map((f) => (
            <span
              key={f}
              className="text-[8px] text-white/28 tracking-[0.14em] uppercase border border-white/9 px-2.5 py-1"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Expandable "What's included" */}
        <div>
          <button
            onClick={onToggle}
            className="flex items-center gap-2 text-[9px] text-white/35 tracking-[0.2em] uppercase hover:text-white/60 transition-colors duration-200 mb-3"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▶
            </motion.span>
            What's included
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
                <ul className="space-y-2 mb-4">
                  {program.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-white/25 text-[9px] flex-shrink-0">✓</span>
                      <span
                        className="text-[10px] text-white/32 leading-snug"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Extra meta */}
                <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                  <div className="flex gap-2 items-start">
                    <span className="text-[8px] text-white/22 tracking-[0.2em] uppercase mt-0.5" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Ideal for</span>
                    <span className="text-[10px] text-white/35 leading-snug flex-1" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{program.forWho}</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-[8px] text-white/22 tracking-[0.2em] uppercase mt-0.5 flex-shrink-0" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Results</span>
                    <span className="text-[10px] text-white/35 leading-snug flex-1" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{program.resultsTimeline}</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-[8px] text-white/22 tracking-[0.2em] uppercase mt-0.5 flex-shrink-0" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Term</span>
                    <span className="text-[10px] text-white/35 leading-snug flex-1" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{program.commitment}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto pt-5 border-t border-white/[0.07]">
          <div>
            <span
              className="text-4xl text-white leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
            >
              {program.price}
            </span>
            <span
              className="text-[10px] text-white/28 ml-1"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {program.per}
            </span>
          </div>

          <motion.button
            id={`apply-${program.id}`}
            onClick={() => { setApplied(true); setTimeout(() => setApplied(false), 2000); }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase bg-white text-black transition-colors duration-200 hover:bg-white/88"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {applied ? "✓ Applied" : "Apply Now"}
          </motion.button>
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 border border-white/0 pointer-events-none transition-all duration-300 group-hover:border-white/16" />
    </motion.div>
  );
}
