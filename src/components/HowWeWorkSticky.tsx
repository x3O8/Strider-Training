"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    step: "01",
    heading: "Assessment",
    description:
      "Every Strider journey begins with a deep understanding of the individual. The assessment phase evaluates movement quality, structural limitations, current performance levels, and overall readiness to train. This may include posture analysis, mobility screening, training history, and, where relevant, internal health markers. The goal is to identify what’s holding you back and what needs to be built, ensuring that training starts from a position of clarity rather than guesswork.",
    image: "/unsplash/anat0.png",
  },
  {
    step: "02",
    heading: "Blueprint",
    description:
      "Based on the assessment, a personalized blueprint is created. This is not just a workout plan, but a structured progression strategy tailored to your goals, capacity, and current condition. It defines how your training will evolve over time — including exercise selection, intensity, volume, and recovery. Every element is intentional, forming a clear roadmap that guides your development step by step.",
    image: "/unsplash/anat1.png",
  },
  {
    step: "03",
    heading: "Execute",
    description:
      "Execution is where the plan comes to life. Training is carried out with a focus on precision, consistency, and quality of movement rather than just intensity. Each session has a purpose within the larger system, ensuring that effort translates into measurable progress. This phase emphasizes discipline, proper technique, and adherence to the structure laid out in the blueprint.",
    image: "/unsplash/anat3.png",
  },
  {
    step: "04",
    heading: "Evolve",
    description:
      "Strider is not static — it adapts as you do. The evolve phase ensures that your training continuously improves based on real data, performance feedback, and your body’s response to training. Adjustments are made to keep progress moving forward while managing fatigue and preventing plateaus. This ongoing refinement is what allows Strider to deliver sustainable, long-term results rather than short-term gains.",
    image: "/unsplash/anat3.png",
  },
];

export default function HowWeWorkSticky() {
  const [activeStep, setActiveStep] = useState(0);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveStep(index);
          }
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px", // Trigger when text is right in the middle
        threshold: 0,
      }
    );

    textRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-black w-full border-t border-white/[0.07] pt-28">

      {/* ---- Centered Heading Before Effects ---- */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16 relative z-20">
        <h2
          className="text-[clamp(50px,8vw,100px)] text-white leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
        >
          THE STRIDER PROTOCOL
        </h2>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 flex flex-col md:flex-row relative">

        {/* ---- Left Side (Scrolling Text) ---- */}
        <div className="w-full md:w-1/2 flex flex-col pb-[20vh] relative z-20">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => { textRefs.current[index] = el; }}
              data-index={index}
              className="min-h-screen flex flex-col justify-center min-h-[80vh] md:pr-16"
            >
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: activeStep === index ? 1 : 0.3 }}
                transition={{ duration: 0.4 }}
                className="max-w-md w-full transition-opacity"
              >
                <p
                  className="text-[10px] md:text-xs text-white/40 tracking-[0.4em] uppercase mb-6"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Step {step.step}
                </p>
                <h3
                  className="text-[clamp(40px,5vw,72px)] text-white leading-none mb-8"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
                >
                  {step.heading}
                </h3>
                <p
                  className="text-sm md:text-base text-white/70 leading-[1.8] font-light"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ---- Center Divider & Diamond (Sticky to Viewport) ---- */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/[0.1] z-20 pointer-events-none">
          <div className="sticky top-0 h-screen w-full">
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-[#08090D] border border-white/20 flex items-center justify-center transition-all duration-300 ease-in-out"
              style={{ transform: "translate(-50%, -50%) rotate(45deg)" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: -45 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  transition={{ duration: 0.2 }}
                  className="text-white font-bold text-lg pointer-events-auto"
                  style={{ fontFamily: "var(--font-inter), sans-serif", transform: "rotate(-45deg)" }}
                >
                  {steps[activeStep].step}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ---- Right Side (Sticky Media) ---- */}
        <div className="w-full md:w-1/2 h-screen sticky top-0 flex items-center justify-center md:pl-16 pb-8 md:pb-0 overflow-hidden z-10">
          <div className="w-full h-[95%] max-h-[850px] relative overflow-hidden bg-[#08090D]">

            {/* 1. Base Layer: anat0. "anat0 stays in position" -> Always opacity 1 */}
            <Image
              src="/unsplash/anat0.png"
              alt="Assessment"
              fill
              className="object-cover"
              style={{ opacity: 1 }}
              priority
            />

            {/* 2. Middle Layer: anat3. "anat3 already behind anat1" -> Structurally underneath anat1. Fades in for Step 2+ */}
            <Image
              src="/unsplash/anat3.png"
              alt="Execute"
              fill
              className="object-cover transition-opacity duration-[800ms] ease-in-out"
              style={{ opacity: activeStep >= 2 ? 1 : 0 }}
              priority
            />

            {/* 3. Top Layer: anat1. "anat1 fades in... after that fades out". Fades in ONLY for Step 1 */}
            <Image
              src="/unsplash/anat1.png"
              alt="Blueprint"
              fill
              className="object-cover transition-opacity duration-[800ms] ease-in-out"
              style={{ opacity: activeStep === 1 ? 1 : 0 }}
              priority
            />

            {/* Premium overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
