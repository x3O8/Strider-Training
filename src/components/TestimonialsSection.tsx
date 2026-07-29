"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { clientStories } from "@/data/testimonials";
import MobileSwipeHint from "./MobileSwipeHint";

// ── Tiny sparkline chart (preview only, 60px tall) ────────────────────────────
function Sparkline({ data, invert }: { data: number[]; invert: boolean }) {
  const w = 120, h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: invert
      ? ((v - min) / range) * (h - 4) + 2           // higher raw = higher on chart = bad
      : (1 - (v - min) / range) * (h - 4) + 2,      // higher raw = lower on chart = good
  }));

  const d = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const pr = pts[i - 1];
    const cpx = (pr.x + p.x) / 2;
    return `${acc} C ${cpx},${pr.y} ${cpx},${p.y} ${p.x},${p.y}`;
  }, "");

  const first = pts[0];
  const last = pts[pts.length - 1];
  const improved = invert ? last.y < first.y : last.y < first.y;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="overflow-visible">
      <path d={d} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
      <circle cx={last.x} cy={last.y} r="2.5" fill="white" />
      <circle cx={first.x} cy={first.y} r="2" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  "weight-loss": "Weight Loss",
  "strength": "Strength",
  "endurance": "Endurance",
};

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative bg-black border-t border-white/[0.07] overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(-55deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 34px),
            repeating-linear-gradient( 55deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 34px)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12"
        >
          <div>
            <p
              className="text-[9px] text-white/28 tracking-[0.5em] uppercase mb-4"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Real Transformations
            </p>
            <h2
              className="whitespace-nowrap text-[clamp(40px,12vw,48px)] text-white leading-none sm:text-[clamp(48px,8vw,105px)]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
            >
              Client Stories
            </h2>
          </div>
          <Link
            href="/client-stories"
            className="inline-flex min-h-11 sm:min-h-0 items-center gap-2 text-[10px] text-white/35 tracking-[0.25em] uppercase border border-white/14 px-6 py-3 hover:border-white/40 hover:text-white/70 transition-all duration-300 self-start md:self-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            View all stories ↗
          </Link>
        </motion.div>

        {/* Story cards */}
        <MobileSwipeHint />
        <div className="-mx-6 grid touch-auto snap-x snap-mandatory grid-flow-col auto-cols-[90%] gap-4 overflow-x-auto overflow-y-hidden bg-white/[0.06] px-6 min-[360px]:auto-cols-[86%] sm:mx-0 sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-1 sm:overflow-visible sm:px-0 sm:snap-none sm:gap-px sm:touch-pan-x md:grid-cols-3">
          {clientStories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group snap-start bg-black hover:bg-white/[0.015] transition-colors duration-300"
            >
              <div className="flex h-full flex-col gap-5 p-6 sm:gap-6 sm:p-8">

                {/* Client + Category */}
                <div className="flex flex-col gap-3 min-[360px]:flex-row min-[360px]:items-start min-[360px]:justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <span
                        className="text-sm text-white/55"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}
                      >
                        {story.initials}
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-sm text-white leading-none mb-0.5"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}
                      >
                        {story.name}
                      </p>
                      <p
                        className="text-[10px] text-white/28 tracking-wider"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {story.location} · {story.age}
                      </p>
                    </div>
                  </div>
                  <span
                    className="self-start text-[9px] text-white/30 tracking-[0.18em] uppercase border border-white/10 px-2 py-1 flex-shrink-0"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {CATEGORY_LABELS[story.category]}
                  </span>
                </div>

                {/* Short quote */}
                <blockquote
                  className="text-sm md:text-base text-white/55 leading-[1.8] italic"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  "{story.shortQuote}"
                </blockquote>

                {/* Sparkline + key stat */}
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-[9px] text-white/22 tracking-[0.25em] uppercase mb-1"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {story.chartLabel} over {story.duration}
                    </p>
                    <motion.div
                      initial={{ scaleY: 0, originY: 1 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                    >
                      <Sparkline data={story.progressData} invert={story.chartInvert} />
                    </motion.div>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-2xl text-white leading-none"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
                    >
                      {story.stats[0].before}→{story.stats[0].after}
                    </p>
                    <p
                      className="text-[9px] text-white/22 tracking-wider uppercase mt-0.5"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {story.stats[0].label} {story.stats[0].unit}
                    </p>
                  </div>
                </div>

                {/* Program + Read more */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.07]">
                  <span
                    className="text-[10px] text-white/22 tracking-[0.18em]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {story.program}
                  </span>
                  <Link
                    href={`/client-stories#${story.id}`}
                    className="inline-flex min-h-11 items-center text-[10px] text-white/40 tracking-[0.22em] uppercase hover:text-white/75 transition-colors duration-200 sm:min-h-0"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Full story →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big CTA to full page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="hidden text-center mt-10 sm:block md:mt-12"
        >
          <Link
            href="/client-stories"
            className="inline-flex items-center gap-3 px-12 py-4 bg-white text-black text-xs font-bold tracking-[0.28em] uppercase hover:bg-white/88 transition-colors duration-200"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            View All ↗
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
