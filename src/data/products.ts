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
    name: "General Fitness",
    tagline: "Build a resilient and capable body.",
    description:
      "A complete training and lifestyle protocol designed for individuals looking to significantly improve their overall strength, endurance, and body composition. This program focuses on sustainable progress and forming foundational health habits.",
    price: "$199",
    per: "/ month",
    rating: 4.9,
    badge: "Most Popular",
    features: ["Custom Training", "Nutrition Guidance", "Weekly Check-ins", "Video Feedback", "Mobility Screen"],
    includes: [
      "Custom training plan centered around strength and longevity",
      "Tailored nutritional framework that fits your lifestyle",
      "Weekly text and data check-ins to monitor recovery and progress",
      "Continuous video form review for optimal movement mechanics",
      "Personalized mobility and injury prevention routines",
      "1-on-1 direct messaging for daily questions and support",
      "Access to premium exercise library and tracking tools",
    ],
    forWho: "Perfect for anyone determined to overhaul their daily fitness habits and achieve sustainable, lifelong results.",
    resultsTimeline: "Most clients experience a noticeable shift in energy and strength within 4–6 weeks.",
    commitment: "Minimum 3-month engagement recommended for optimal habit formation.",
    image: "/unsplash/general.jpg",
  },
  {
    id: "competition-prep",
    name: "Competition Preparation",
    tagline: "Peak performance for when it matters most.",
    description:
      "An elite, highly demanding protocol built specifically for athletes leading up to a crucial event. Every set, macro, and recovery day is meticulously tracked, periodized, and optimized to ensure you step up in peak condition.",
    price: "$349",
    per: "/ month",
    rating: 5.0,
    badge: "Elite Level",
    features: ["Peak Periodization", "Daily Tracking", "Video Consults", "Macro Precision", "Recovery Protocols"],
    includes: [
      "Advanced periodized programming synchronized to your event date",
      "Detailed daily macronutrient and hydration targeting",
      "Bi-weekly 45-minute tactical video calls to review strategy",
      "Real-time plan iteration based on biometric readiness feedback",
      "Pre-competition tapering and specialized peaking protocols",
      "Post-competition structured recovery phase programming",
      "Unrestricted priority access to your coach via messenger",
    ],
    forWho: "Designed for competitive athletes or highly experienced lifters targeting a specific event or peak physical milestone.",
    resultsTimeline: "Programmed to yield a strategic peak on the exact date of your competition.",
    commitment: "Determined by event timeline — typical minimum is 12-16 weeks.",
    image: "/unsplash/compprep.jpg",
  }
];

// ─── Feature Highlights ───────────────────────────────────────────────────────
export interface FeatureHighlight {
  title: string;
  description: string;
  icon: string;
  position: "left" | "right";
}

export const features: FeatureHighlight[] = [
  {
    title: "Certified Coaches",
    description:
      "Our coaching philosophy is built on experience, empathy, and evidence. We prioritize your long-term health and empower you with the knowledge to sustain your peak physical condition.",
    icon: "🎓",
    position: "left",
  },
  {
    title: "Personalised Plans",
    description:
      "No two clients are the same. Training, nutrition, and recovery protocols are built specifically around your goals, lifestyle, and current fitness level.",
    icon: "📋",
    position: "right",
  },
  {
    title: "Data-Driven Progress",
    description:
      "Weekly check-in analytics, body composition tracking, and performance benchmarks mean your results are always measurable and continuously improving.",
    icon: "📊",
    position: "left",
  },
  {
    title: "Always-On Support",
    description:
      "Direct messaging with your coach every day. Whether you have a question about form or need a plan adjustment, your team is always within reach.",
    icon: "💬",
    position: "right",
  },
];
