import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Team | Strider Training Systems",
  description:
    "Meet Ashik Divakaran and learn how the team behind Strider Training Systems builds individualized human performance systems.",
};

const teamFunctions = [
  {
    number: "01",
    title: "Assessment & Strategy",
    description:
      "Understanding movement, training history, recovery, lifestyle, health markers, experience, and goals before the system is designed.",
  },
  {
    number: "02",
    title: "Coaching & Feedback",
    description:
      "Turning the blueprint into clear daily action, reviewing execution, and keeping every decision connected to the individual.",
  },
  {
    number: "03",
    title: "Performance Analysis",
    description:
      "Tracking meaningful data across training, movement, recovery, readiness, and progress to guide each refinement.",
  },
  {
    number: "04",
    title: "Education & Support",
    description:
      "Helping every Strider understand the system, build better habits, and make sustainable progress beyond the gym.",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/[0.07] px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage: `
                repeating-linear-gradient(-55deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 34px),
                repeating-linear-gradient(55deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 34px)
              `,
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-8 h-96 w-96 rounded-full bg-orange-500/[0.07] blur-[120px]" />

          <div className="relative mx-auto max-w-7xl">
            <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-orange-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              The People Behind Strider
            </p>
            <div className="grid items-end gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <h1 className="text-[clamp(68px,11vw,156px)] leading-[0.78] tracking-[0.025em] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                The people
                <br />
                behind Strider
              </h1>
              <p className="max-w-xl text-base font-light leading-[1.9] text-white/58 md:text-lg" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Strider is led by a simple belief: better coaching starts with understanding the person. The team works through one shared system where assessment, planning, execution, and evolution remain connected.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[0.07] px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div className="relative flex min-h-[360px] overflow-hidden border border-white/[0.1] bg-[#080808] sm:min-h-[480px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 18%, rgba(255,255,255,0.065), transparent 34%),
                    repeating-linear-gradient(-55deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 30px),
                    repeating-linear-gradient(55deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 30px)
                  `,
                }}
              />
              <div aria-hidden="true" className="absolute right-8 top-8 h-24 w-24 border-r border-t border-white/[0.1]" />
              <div aria-hidden="true" className="absolute bottom-8 left-8 h-16 w-16 border-b border-l border-orange-400/30" />
              <div className="relative mt-auto p-6 sm:p-9">
                <p className="text-[9px] uppercase tracking-[0.34em] text-orange-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  Founder &bull; Lead Performance Coach
                </p>
                <h2 className="mt-3 text-5xl leading-none text-white sm:text-7xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.035em" }}>
                  Ashik Divakaran
                </h2>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-5 text-[9px] uppercase tracking-[0.42em] text-white/35" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Why Strider Exists
              </p>
              <h2 className="max-w-2xl text-[clamp(48px,7vw,88px)] leading-[0.9] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
                Coaching should adapt to the person.
              </h2>
              <div className="mt-8 max-w-2xl space-y-5 border-l border-white/20 pl-6 text-sm font-light leading-[1.9] text-white/62 md:pl-8 md:text-base" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                <p>
                  Ashik&apos;s fascination with how the human body moves, adapts, heals, and performs led him into the study of strength training, biomechanics, nutrition, physiology, and human performance.
                </p>
                <p>
                  He built Strider to move beyond generic programmes. Every system begins with the individual and brings movement, anatomy, nutrition, recovery, health markers, lifestyle, experience, and personal goals into one adaptive framework.
                </p>
                <p>
                  As Founder and Lead Performance Coach, Ashik leads the design of systems that help people move better, perform at their highest level, and build healthier, more resilient bodies for life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="mb-5 text-[9px] uppercase tracking-[0.42em] text-orange-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  One Connected Team
                </p>
                <h2 className="text-[clamp(48px,7vw,88px)] leading-[0.9] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
                  Every decision works together.
                </h2>
              </div>

              <div className="grid border-l border-t border-white/[0.1] sm:grid-cols-2">
                {teamFunctions.map((item) => (
                  <article key={item.number} className="relative border-b border-r border-white/[0.1] bg-white/[0.018] p-6 sm:p-8">
                    <span className="text-[9px] tracking-[0.28em] text-orange-400/75" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      {item.number}
                    </span>
                    <h3 className="mt-8 text-3xl leading-none text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.035em" }}>
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm font-light leading-[1.8] text-white/52" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-16 flex flex-col items-start justify-between gap-7 border-t border-white/[0.1] pt-10 sm:flex-row sm:items-center">
              <p className="max-w-xl text-sm leading-[1.8] text-white/50" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Ready to discover what an individualized performance system can look like for you?
              </p>
              <Link href="/contact#contact" className="inline-flex min-h-11 items-center gap-4 bg-white px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-orange-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Meet your coach
                <span aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
