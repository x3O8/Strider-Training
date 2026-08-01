import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Strider Training Systems",
  description:
    "Answers to common questions about Strider Training Systems, individualized coaching, onboarding, programme selection, and ongoing support.",
};

const faqs = [
  {
    question: "Who is Strider coaching designed for?",
    answer:
      "Strider is designed for people who want an individualized approach to health and performance—from those building a stronger foundation to athletes preparing for demanding performance goals.",
  },
  {
    question: "How is my programme individualized?",
    answer:
      "Your system begins with an assessment of your goals, experience, movement, recovery, lifestyle, training history, and relevant health markers. Those inputs guide the training, nutrition, recovery, and progression decisions within your programme.",
  },
  {
    question: "What is the difference between Foundation and Performance?",
    answer:
      "Foundation focuses on lifelong health, strength, movement quality, body composition, and sustainable habits. Performance is intended for athletes and competitors who need advanced programming, monitoring, and preparation around a specific performance target or competitive calendar.",
  },
  {
    question: "Can I work with Strider remotely?",
    answer:
      "Yes. Strider supports clients worldwide through structured online coaching, regular reviews, programme updates, movement feedback, and direct communication with the coaching team.",
  },
  {
    question: "What happens during the initial assessment?",
    answer:
      "The assessment establishes your starting point. It reviews your goals, training background, movement capacity, recovery, lifestyle, current challenges, and any information needed to design an appropriate coaching system.",
  },
  {
    question: "How often will my programme be updated?",
    answer:
      "Your programme evolves as meaningful feedback and performance data become available. Reviews consider execution, progress, readiness, recovery, and changing circumstances rather than relying on a fixed generic schedule.",
  },
  {
    question: "Can Strider work around injuries or movement limitations?",
    answer:
      "Training can be adapted around many limitations after they are understood. During your consultation and assessment, share any injury history, pain, medical guidance, or restrictions so the team can determine whether Strider is the appropriate coaching option.",
  },
  {
    question: "How much time do I need to commit each week?",
    answer:
      "The required schedule depends on your goals, current capacity, and lifestyle. The system is designed around the time and resources you can use consistently, with the exact commitment agreed during onboarding.",
  },
  {
    question: "Do I need access to a fully equipped gym?",
    answer:
      "Not always. Available equipment is considered when your programme is designed. Tell the team what you have access to during your assessment so the plan can be built around realistic training conditions.",
  },
  {
    question: "How do I know which programme is right for me?",
    answer:
      "Start with a complimentary consultation. The team will discuss your goals, training history, lifestyle, and expectations, then recommend the most suitable path without pressure or obligation.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/[0.07] px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
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
              Questions, answered
            </p>
            <div className="grid items-end gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
              <h1 className="text-[clamp(72px,12vw,164px)] leading-[0.78] tracking-[0.025em] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Frequently
                <br />
                asked.
              </h1>
              <p className="max-w-xl text-base font-light leading-[1.9] text-white/58 md:text-lg" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                A straightforward guide to Strider&apos;s coaching process. Open any question below to learn how the system works and what you can expect.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
            <div>
              <p className="text-[9px] uppercase tracking-[0.42em] text-white/35" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Coaching FAQ
              </p>
              <h2 className="mt-4 text-5xl leading-[0.9] text-white md:text-7xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
                Start with clarity.
              </h2>
              <p className="mt-6 max-w-sm text-sm font-light leading-[1.8] text-white/45" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                If your question is not covered here, the Strider team can help you understand the right next step.
              </p>
            </div>

            <div className="border-t border-white/[0.12]">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group border-b border-white/[0.12]">
                  <summary className="flex min-h-[76px] cursor-pointer list-none items-center justify-between gap-5 py-5 text-left marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex min-w-0 items-start gap-4 sm:gap-6">
                      <span className="mt-1 text-[8px] tracking-[0.2em] text-orange-400/75" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base leading-snug text-white/82 sm:text-lg" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        {faq.question}
                      </span>
                    </span>
                    <span aria-hidden="true" className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/12 transition-colors duration-300 group-open:border-orange-400/45">
                      <span className="absolute h-px w-3.5 bg-white/60" />
                      <span className="absolute h-3.5 w-px bg-white/60 transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <div className="overflow-hidden pb-6 pl-8 pr-3 sm:pb-8 sm:pl-[3.75rem] sm:pr-16">
                    <p className="max-w-2xl border-l border-white/15 pl-5 text-sm font-light leading-[1.85] text-white/48" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.07] px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-orange-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Still have questions?
              </p>
              <h2 className="mt-3 text-4xl leading-none text-white md:text-6xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
                Talk to the Strider team.
              </h2>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 items-center gap-4 bg-white px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-orange-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Contact us
              <span aria-hidden="true">&#9654;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
