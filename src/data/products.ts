// ─── Coaching Programs ────────────────────────────────────────────────────────
export interface CoachingProgram {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  per: string;
  rating: number;
  features: string[];   // short tag pills
  includes: string[];   // detailed inclusion list
  forWho: string;
  resultsTimeline: string;
  commitment: string;
  badge?: string;
  image: string;
}

export const coachingPrograms: CoachingProgram[] = [
  {
    id: "general-fitness",
    name: "Foundational Fitness",
    tagline: "The foundation for lifelong health and performance.",
    description:
      "Build a stronger, healthier, and more capable body through individualized coaching designed around your physiology, goals, and lifestyle. By integrating training, nutrition, cardio, recovery, and sustainable habits into one adaptive system, Foundational Fitness helps you move better, feel better, and perform better—not just in the gym, but throughout everyday life.",
    price: "USD $99/month",
    per: " + applicable taxes",
    rating: 4.9,
    features: ["Individualized Training System", "Nutrition Strategy", "Recovery & Lifestyle Coaching", "Mobility & Movement Development", "Continuous Program Progression", "Full-Time Coach Support"],
    includes: [
      "Comprehensive onboarding assessment",
      "Individualized training program",
      "Personalized nutrition plan",
      "Cardio protocol",
      "Recovery protocol",
      "Bloodwork analysis (when available)",
      "Reassessments as needed",
      "Ongoing analysis of training, nutrition, recovery, and wearable data (when available)",
      "Continuous program refinement",
      "Coach support & feedback (Monday-Friday, 9:00 AM-6:00 PM GMT)",
    ],
    forWho: "Individuals who want to improve their health, body composition, strength, movement quality, energy, resilience, and long-term performance through structured, evidence-based coaching.",
    resultsTimeline: "Build strength, improve body composition, move better, develop sustainable habits, and create a healthier, more resilient body that performs better every day.",
    commitment: "Meaningful change takes time. We recommend a minimum three-month commitment to build sustainable habits, measurable progress, and lasting results.",
    image: "/unsplash/general.jpg",
  },
  {
    id: "competition-prep",
    name: "Performance",
    tagline: "For those who demand more from their body.",
    description:
      "Designed for athletes, martial artists, endurance athletes, HYROX competitors, dancers, and anyone pursuing exceptional physical performance. By integrating training, nutrition, cardio, recovery, and performance monitoring into one adaptive coaching system, Performance helps you maximize your potential when it matters most.",
    price: "USD $149/month",
    per: " + applicable taxes",
    rating: 5.0,
    features: ["Advanced Performance Programming", "Performance Nutrition Strategy", "Competition Preparation", "Recovery Optimization", "Performance Monitoring", "Full-Time Coach Support"],
    includes: [
      "Comprehensive performance assessment",
      "Individualized performance program",
      "Performance nutrition plan",
      "Cardio & conditioning protocol",
      "Recovery protocol",
      "Bloodwork analysis (when available)",
      "Hormonal optimization (where appropriate)",
      "Supplement strategy (when appropriate)",
      "Competition & contest preparation (if required)",
      "Reassessments as needed",
      "Ongoing analysis of training, nutrition, recovery, and wearable data (when available)",
      "Continuous program refinement",
      "Coach support (Monday-Friday, 9:00 AM-6:00 PM GMT)",
    ],
    forWho: "Athletes, competitors, martial artists, endurance athletes, dancers, and high performers seeking to improve strength, power, speed, endurance, movement efficiency, resilience, and sport-specific performance.",
    resultsTimeline: "Build strength, power, speed, endurance, and resilience while improving movement efficiency, reducing injury risk, and maximizing long-term athletic performance.",
    commitment: "Performance is built over time. We recommend a minimum three-month commitment, with longer coaching based on your goals, competition schedule, and long-term development.",
    image: "/athlete/performance-boxing.jpg",
  }
];

// ─── Feature Highlights ───────────────────────────────────────────────────────
export interface FeatureHighlight {
  title: string;
  description: string;
  icon: "credential" | "plan" | "analytics" | "support";
  position: "left" | "right";
}

export const features: FeatureHighlight[] = [
  {
    title: "Individualized",
    description:
      "Every system is built around your anatomy, movement quality, physiology, health markers, lifestyle, recovery capacity, experience, and goals—not around generic templates.",
    icon: "credential",
    position: "left",
  },
  {
    title: "Adaptive",
    description:
      "Your body changes over time. Your system should too. Strider continuously refines your training, nutrition, recovery, and lifestyle through assessment, performance data, and real-world feedback.",
    icon: "plan",
    position: "right",
  },
  {
    title: "Measurable",
    description:
      "Every decision is supported by meaningful data. Progress is tracked through movement quality, strength, body composition, performance, recovery, and health markers—so improvement is visible, objective, and measurable.",
    icon: "analytics",
    position: "left",
  },
  {
    title: "Integrated",
    description:
      "Real performance isn't built through training alone. Strider integrates movement, nutrition, recovery, lifestyle, and health into one connected system designed for lasting results.",
    icon: "support",
    position: "right",
  },
];
