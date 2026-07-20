"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Field = "name" | "email" | "phone" | "goal" | "level" | "message";

const goalOptions = ["Weight Loss", "Muscle Gain", "Endurance", "Sports Performance", "General Fitness", "Injury Rehabilitation"];
const levelOptions = ["Complete Beginner", "Some Experience", "Intermediate", "Advanced Athlete"];

export default function ClientForm({ preselectedGoal }: { preselectedGoal: string | null }) {
  const [form, setForm] = useState<Record<Field, string>>({
    name: "", email: "", phone: "", goal: "", level: "", message: "",
  });
  const [focused, setFocused] = useState<Field | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedGoal) {
      setForm((v) => ({ ...v, goal: preselectedGoal }));
    }
  }, [preselectedGoal]);

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Replace with your actual Google Apps Script Web App URL after deployment
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyH48_YOzcgta6-pR282e94v0VH0jUI2EE-u5lcBbO-SGC_TZiR_HqHizydf4hO8ZFZ/exec";

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(form),
      });


      // Since mode is 'no-cors', we proceed to success state
      setSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };



  const inputBase = (field: Field) => ({
    onFocus: () => setFocused(field),
    onBlur: () => setFocused(null),
    style: { fontFamily: "var(--font-inter), sans-serif" },
    className: `w-full bg-transparent border-b py-3 text-sm text-white placeholder-white/40 outline-none transition-colors duration-300 ${focused === field ? "border-white/80" : "border-white/30"
      }`,
  });

  return (
    <section id="contact" className="relative bg-black border-t border-white/[0.07] overflow-hidden">

      {/* Background diagonal grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(-55deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 34px),
            repeating-linear-gradient( 55deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 34px)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* ── Left: Copy ─────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-28">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] text-white tracking-[0.5em] uppercase mb-5"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Start Your Journey
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[clamp(52px,8vw,110px)] text-white leading-none mb-8"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
            >
              Ready to<br />Transform?
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <p
                className="text-base text-white leading-[1.9]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Fill in your details and one of our coaches will reach out within 24 hours
                to schedule your free consultation call. No commitment, just a conversation
                about your goals.
              </p>

              {/* Promises */}
              {[
                "Free 30-minute consultation with a certified coach",
                "Transparent pricing — no hidden fees",
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start"
                >
                  <span
                    className="text-sm text-white leading-relaxed"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {p}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Form ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-white/[0.09] bg-white/[0.02] p-12 text-center flex flex-col items-center gap-6"
                >
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center">
                    <span className="text-2xl text-white/70">✓</span>
                  </div>
                  <h3
                    className="text-4xl text-white leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
                  >
                    You're in!
                  </h3>
                  <p
                    className="text-xs text-white/70 leading-relaxed max-w-sm"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Your application has been received. A Strider coach will contact you
                    within 24 hours to schedule your free consultation.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="border border-white/[0.09] bg-white/[0.015] p-5 min-[360px]:p-8 md:p-10 space-y-8"
                >
                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label
                        className="block text-[10px] text-white tracking-[0.35em] uppercase mb-3"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={set("name")}
                        {...inputBase("name")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[10px] text-white tracking-[0.35em] uppercase mb-3"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={set("email")}
                        {...inputBase("email")}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone */}
                  <div>
                    <label
                      className="block text-[9px] text-white tracking-[0.35em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      {...inputBase("phone")}
                    />
                  </div>

                  {/* Row 3: Goal */}
                  <div>
                    <label
                      className="block text-[9px] text-white tracking-[0.35em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Primary Goal *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {goalOptions.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setForm((v) => ({ ...v, goal: g }))}
                          className={`min-h-11 px-3 py-2 text-[9px] tracking-[0.15em] uppercase border transition-all duration-200 sm:min-h-0 ${form.goal === g
                              ? "border-white/80 text-white bg-white/10"
                              : "border-white/30 text-white/80 hover:border-white/60 hover:text-white"
                            }`}
                          style={{ fontFamily: "var(--font-inter), sans-serif" }}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Level */}
                  <div>
                    <label
                      className="block text-[9px] text-white tracking-[0.35em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Current Fitness Level *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {levelOptions.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setForm((v) => ({ ...v, level: l }))}
                          className={`min-h-11 px-3 py-2 text-[9px] tracking-[0.15em] uppercase border transition-all duration-200 sm:min-h-0 ${form.level === l
                              ? "border-white/80 text-white bg-white/10"
                              : "border-white/30 text-white/80 hover:border-white/60 hover:text-white"
                            }`}
                          style={{ fontFamily: "var(--font-inter), sans-serif" }}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 5: Message */}
                  <div>
                    <label
                      className="block text-[9px] text-white tracking-[0.35em] uppercase mb-3"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Tell Us Your Story
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your background, any injuries, or anything else your coach should know..."
                      value={form.message}
                      onChange={set("message")}
                      {...inputBase("message")}
                      className={`${inputBase("message").className} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-white text-black text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-200 hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {submitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="w-3.5 h-3.5 border border-black/40 border-t-black rounded-full"
                        />
                        Submitting…
                      </>
                    ) : (
                      "Begin My Transformation →"
                    )}
                  </motion.button>


                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
