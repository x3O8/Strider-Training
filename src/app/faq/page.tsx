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
      "Strider is designed for people who want coaching built around them, not a generic programme. Whether your goal is improving your health, building strength, changing body composition, returning from injury, or preparing for competition, your coaching is tailored to your starting point, goals, and progress. Your consultation helps determine whether Strider is the right fit for you.",
  },
  {
    question: "Can I join if I have an injury or medical condition?",
    answer:
      "In many cases, yes. Your coaching can be adapted around injuries, medical conditions, or physical limitations where appropriate. If you're under the care of a doctor or other healthcare professional, we'll take their recommendations into account and adapt your coaching accordingly. In some situations, we may recommend delaying coaching until it's appropriate to begin training safely.",
  },
  {
    question: "Do I need access to a gym?",
    answer:
      "No. Your coaching is designed around the equipment and environment available to you. Whether you train in a commercial gym, home gym, or with minimal equipment, we'll build the most effective coaching system for your situation. For highly specific performance goals, we may recommend access to additional equipment where appropriate.",
  },
  {
    question: "How is my coaching individualized?",
    answer:
      "Your coaching begins with a comprehensive assessment of your goals, training history, lifestyle, movement, recovery, and any relevant health data. We use that information to build your initial coaching system, then continuously refine your training, nutrition, and recovery strategies as your progress, feedback, and performance data evolve.",
  },
  {
    question: "What happens after I join?",
    answer:
      "Your journey begins with a comprehensive onboarding process. We'll collect the information needed to understand your goals, training history, lifestyle, movement, recovery, and any relevant health data before building your individualized coaching system. Once onboarding is complete, we'll deliver your initial coaching system, guide you through getting started, and support you throughout your journey as your coaching evolves over time.",
  },
  {
    question: "How often is my coaching updated?",
    answer:
      "Your coaching isn't updated on a fixed schedule. It's updated when it's needed. Your coach continuously monitors your progress, feedback, recovery, lifestyle, and available performance data. Your coaching system is refined whenever meaningful changes are needed, whether you've achieved a phase goal, reached a plateau, sustained an injury, experienced lifestyle changes, or your data indicates it's time to progress.",
  },
  {
    question: "How do I communicate with my coach?",
    answer:
      "You'll have ongoing access to your coach throughout your membership. Questions, updates, and feedback are handled through your dedicated coaching channel, with support available Monday-Friday, 9:00 AM-6:00 PM GMT. If needed, or when recommended by your coach, you may book one coaching call per week. We aim to respond as promptly and accurately as possible, so you receive thoughtful guidance rather than rushed answers.",
  },
  {
    question: "Do I need bloodwork to join?",
    answer:
      "No. Bloodwork is recommended where appropriate, but it isn't required to begin coaching. If you have recent bloodwork, we'll use it to better understand your internal health and further individualize your coaching. Based on your assessment, we may also recommend additional blood tests when they can help guide better coaching decisions and optimize your health. If you don't have bloodwork, we can still build an effective coaching system using your assessment and available data.",
  },
  {
    question: "What results can I realistically expect?",
    answer:
      "Every client starts from a different place, with different goals, genetics, lifestyle, and level of commitment. Because of this, results vary from person to person. Our focus is on building an individualized coaching system that gives you the best opportunity to make consistent, measurable progress toward your goals over time.",
  },
  {
    question: "Can I cancel my coaching?",
    answer:
      "Yes. Strider operates on a subscription model without long-term contracts. If you decide to stop coaching, simply let us know before your next billing cycle. If appropriate, your coach can also help you decide whether adjusting your coaching or taking a short break is the better option.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a complimentary consultation through our website or WhatsApp. We'll discuss your goals, answer your questions, and determine whether Strider is the right fit for your needs. If you decide to move forward, we'll guide you through onboarding, collect the information needed to individualize your coaching, and begin building your coaching system.",
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
              <h1 className="text-[clamp(58px,11vw,150px)] leading-[0.78] tracking-[0.025em] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Frequently Asked
                <br />
                Questions.
              </h1>
              <p className="max-w-xl text-base font-light leading-[1.9] text-white/58 md:text-lg" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Learn how Strider works, what to expect, and how our coaching adapts to your goals. If you don&apos;t find the answer you&apos;re looking for, our team is here to help.
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
                Most questions are answered below. If you still need guidance, we&apos;re happy to help you choose the right next step.
              </p>
            </div>

            <div className="border-t border-white/[0.12]">
              {faqs.map((faq, index) => (
                <details key={faq.question} name="strider-faq" className="group border-b border-white/[0.12]">
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
              <p className="mt-4 max-w-xl text-sm font-light leading-[1.8] text-white/45" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Book a complimentary consultation to discuss your goals, ask questions, and find the coaching approach that&apos;s right for you.
              </p>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 items-center gap-4 bg-white px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-orange-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Book Free Consultation
              <span aria-hidden="true">&#9654;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
