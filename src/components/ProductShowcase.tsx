"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { coachingPrograms } from "@/data/products";

const comparisonContent = {
  "general-fitness": {
    label: "For health & lifelong fitness",
    description: "Build a stronger, healthier, and more capable body for everyday life.",
    benefits: [
      "Improve everyday strength and fitness",
      "Improve body composition and energy",
      "Move better and develop mobility",
      "Build sustainable long-term habits",
    ],
    bestFor: ["General Fitness", "Fat Loss", "Strength", "Mobility", "Health"],
    cta: "Apply Now",
    supporting: "Build lifelong strength, health, and confidence.",
    goal: "General Fitness",
  },
  "competition-prep": {
    label: "For athletic & competitive goals",
    description: "Advanced coaching for athletes and serious performers pursuing measurable results.",
    benefits: [
      "Develop strength, speed, and power",
      "Improve sport-specific endurance",
      "Track performance and recovery",
      "Prepare for events and competitions",
    ],
    bestFor: ["Athletes", "HYROX", "Martial Arts", "Endurance", "Competition"],
    cta: "Apply Now",
    supporting: "Train for higher athletic and competitive performance.",
    goal: "Sports Performance",
  },
} as const;

export default function ProductShowcase({ onApply }: { onApply: (goal: string) => void }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <section id="programs" className="relative border-t border-white/[0.07] bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12"
        >
          <p className="mb-4 text-[9px] uppercase tracking-[0.5em] text-white" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Individualized human performance coaching
          </p>
          <h2 className="text-[clamp(42px,10vw,58px)] leading-none text-white sm:text-[clamp(58px,8vw,110px)]" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
            Choose Your Path.
          </h2>
          <p className="mt-3 text-sm text-white/55 md:text-base" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            The same personalized coaching system, built around different goals.
          </p>
        </motion.header>

        <div className="grid items-stretch gap-4 md:grid-cols-2">
          {coachingPrograms.map((program, index) => {
            const content = comparisonContent[program.id as keyof typeof comparisonContent];
            return (
              <motion.article
                key={program.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group flex h-full flex-col border p-6 sm:p-7 ${index === 1 ? "border-white/20 bg-[#101010]" : "border-white/[0.1] bg-[#0a0a0a]"}`}
              >
                <div className="relative -mx-6 -mt-6 mb-6 h-44 overflow-hidden border-b border-white/[0.1] bg-[#0c0c0c] sm:-mx-7 sm:-mt-7 sm:h-48">
                  <Image src={program.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-80 group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                  <span className="absolute bottom-[-12px] right-4 text-[110px] leading-none text-white/10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/45" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{content.label}</p>
                <h3 className="text-3xl leading-none text-white sm:text-4xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{program.name}</h3>
                <p className="mt-3 min-h-11 text-xs leading-relaxed text-white/65" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{content.description}</p>

                <ul className="mt-5 min-h-[116px] space-y-2.5 border-t border-white/[0.08] pt-5">
                  {content.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-xs leading-relaxed text-white/75" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      <span aria-hidden="true" className="mt-[1px] text-[13px] leading-none text-orange-400">+</span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-4 border-t border-white/[0.08] pt-5">
                  <div>
                    <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.28em] text-white/45" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Description</p>
                    <p className="text-[11px] leading-relaxed text-white/60" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{program.description}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.28em] text-white/45" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Results</p>
                    <p className="text-[11px] leading-relaxed text-white/60" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{program.resultsTimeline}</p>
                  </div>
                </div>

                <div className="mt-5 min-h-[78px]">
                  <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.28em] text-white/45" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Best For</p>
                  <div className="flex flex-wrap gap-2">
                    {content.bestFor.map((tag) => <span key={tag} className="border border-white/15 px-2.5 py-1.5 text-[7px] uppercase tracking-[0.16em] text-white/65" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{tag}</span>)}
                  </div>
                </div>

                <details open={detailsOpen} className="group/details mt-5 border-y border-white/[0.08] py-1">
                  <summary onClick={(event) => { event.preventDefault(); setDetailsOpen((open) => !open); }} className="flex min-h-11 cursor-pointer list-none items-center justify-between text-[8px] font-bold uppercase tracking-[0.22em] text-white/55 focus-visible:outline focus-visible:outline-1 focus-visible:outline-orange-400 [&::-webkit-details-marker]:hidden" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    <span className="group-open/details:hidden">View Full Program Details</span>
                    <span className="hidden group-open/details:inline">Hide Program Details</span>
                    <span aria-hidden="true" className="transition-transform group-open/details:rotate-45">+</span>
                  </summary>
                  <div className="space-y-5 pb-5 text-[10px] leading-relaxed text-white/55" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    <div><strong className="mb-1 block uppercase tracking-[0.18em] text-white/75">Description</strong>{program.description}</div>
                    <div><strong className="mb-1 block uppercase tracking-[0.18em] text-white/75">Ideal For</strong>{program.forWho}</div>
                    <div><strong className="mb-1 block uppercase tracking-[0.18em] text-white/75">Results</strong>{program.resultsTimeline}</div>
                    <div><strong className="mb-2 block uppercase tracking-[0.18em] text-white/75">Your Coaching Experience</strong><ul className="space-y-1.5">{program.includes.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-orange-400">+</span>{item}</li>)}</ul></div>
                    <div><strong className="mb-2 block uppercase tracking-[0.18em] text-white/75">System Components</strong><div className="flex flex-wrap gap-1.5">{program.features.map((feature) => <span key={feature} className="border border-white/12 px-2 py-1 text-[7px] uppercase tracking-[0.12em]">{feature}</span>)}</div></div>
                  </div>
                </details>

                <div className="mt-auto pt-5">
                  <div className="mb-5 flex flex-col items-start gap-1">
                    <span className="whitespace-nowrap text-3xl leading-none text-white sm:text-4xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{program.price}</span>
                    <span className="text-[9px] text-white/45" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{program.per}</span>
                  </div>
                  <button onClick={() => onApply(content.goal)} className="glow-on-hover min-h-12 w-full px-5 py-3 text-[9px] font-bold uppercase tracking-[0.22em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{content.cta}</button>
                  <p className="mt-4 text-center text-[9px] leading-relaxed text-white/35" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{content.supporting}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-4 border border-white/[0.08] bg-[#080808] px-5 py-4 text-center text-[10px] leading-relaxed text-white/55 md:text-[11px]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          Choose Foundational for everyday health, strength, movement, and sustainable fitness. Choose Performance when training for a sport, event, or competition.
        </p>
      </div>
    </section>
  );
}
