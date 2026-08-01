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
    name: "Foundation",
    tagline: "The foundation for becoming a Strider.",
    description:
      "Build the foundation for lifelong health, performance, and longevity through an individualized system designed around your body—not a generic program. By integrating training, nutrition, recovery, and lifestyle, Strider helps you build a body that's stronger, healthier, and capable of performing wherever life demands—not just inside the gym.",
    price: "USD $99",
    per: "/ month + applicable taxes",
    rating: 4.9,
    features: ["Individualized Training System", "Nutrition Strategy", "Recovery & Lifestyle Coaching", "Mobility & Movement Development", "Continuous Program Progression", "Full-Time Coach Support"],
    includes: [
      "Comprehensive onboarding assessment",
      "Individualized training program",
      "Personalized nutrition guidance",
      "Recovery and lifestyle recommendations",
      "Exercise video library with demonstrations",
      "Form review and movement analysis",
      "Weekly progress reviews and program adjustments",
      "Continuous coach messaging and guidance",
      "Ongoing program refinement based on your progress",
    ],
    forWho: "Individuals who want to improve their health, body composition, strength, movement quality, and long-term performance through a structured, science-backed, and sustainable system.",
    resultsTimeline: "Become stronger, healthier, and more capable while building habits and systems that improve the way you move, perform, recover, and live—far beyond the gym.",
    commitment: "Lasting change takes time. We recommend committing to at least three months to build meaningful habits, measurable progress, and sustainable results.",
    image: "/unsplash/general.jpg",
  },
  {
    id: "competition-prep",
    name: "Performance",
    tagline: "For those who demand more from their body.",
    description:
      "Whether you're an athlete, martial artist, endurance athlete, dancer, HYROX competitor, or simply someone pursuing exceptional physical performance, Strider continuously optimizes every variable—from training and nutrition to recovery, readiness, and competition strategy—so you can perform at your highest level when it matters most.",
    price: "USD $149",
    per: "/ month + applicable taxes",
    rating: 5.0,
    features: ["Advanced Performance Programming", "Performance Nutrition Strategy", "Competition Preparation", "Recovery Optimization", "Performance Monitoring", "Full-Time Coach Support"],
    includes: [
      "Comprehensive performance assessment",
      "Advanced individualized programming",
      "Performance-focused nutrition strategy",
      "Recovery and fatigue management",
      "Exercise analysis and technical feedback",
      "Weekly performance reviews and program adjustments",
      "Competition planning and peaking strategy",
      "Continuous coach messaging and guidance",
      "Ongoing system optimization using training and performance data",
    ],
    forWho: "Athletes, competitors, martial artists, endurance athletes, and individuals pursuing the highest levels of physical performance, precision, and accountability.",
    resultsTimeline: "Develop the strength, power, endurance, resilience, and movement efficiency required to consistently perform at your highest level while reducing injury risk and maximizing long-term athletic development.",
    commitment: "Program duration is based on your performance goals or competitive calendar. A minimum three-month commitment is recommended for meaningful adaptation and measurable progress.",
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
