export interface ClientStory {
  id: string;
  name: string;
  age?: number;
  location: string;
  program: string;
  duration: string;
  goal: string;
  shortQuote: string;
  fullQuote: string;
  initials: string;
  coachName: string;
  coachNote: string;
  category: "weight-loss" | "strength" | "endurance";
  stats: { label: string; before: string; after: string; unit: string }[];
  // Weekly progress data — normalised to a metric (lower = better for time, higher = better for weight/strength)
  chartLabel: string;
  chartUnit: string;
  chartInvert: boolean; // true = lower is better (e.g. pace)
  progressData: number[];
  image?: string;
  imageAlt?: string;
}

export const clientStories: ClientStory[] = [
  {
    id: "abhijith-powerlifting",
    name: "Abhijith",
    age: 21,
    location: "Calicut, IN",
    program: "Competition Preparation",
    duration: "1 year",
    goal: "U66 Junior Powerlifting",
    category: "strength",
    shortQuote:
      "Every plan changed with my strength, energy, and progress. That personalised approach took my bench from 40 kg to 92.5 kg.",
    fullQuote:
      "When I started with Strider, I weighed 60 kg and benched 40 kg. I wanted to prepare seriously for powerlifting, but I needed more than a fixed programme. My training was adjusted around how my strength and energy changed from week to week, so every block felt built for where I actually was. Over the year, my bench reached 92.5 kg and I placed second in the under-66 kg junior unequipped bench press at the Kollam District Championship. The biggest difference was having a plan that kept evolving with me.",
    initials: "AB",
    coachName: "Strider Performance Team",
    coachNote:
      "Abhijith's preparation was built around progressive strength blocks, weekly readiness tracking, and adjustments based on his recovery. The goal was to arrive at competition technically confident and strong, not simply to chase numbers in training.",
    stats: [
      { label: "Bench Press", before: "40", after: "92.5", unit: "kg" },
      { label: "Body Weight", before: "60", after: "70", unit: "kg" },
    ],
    chartLabel: "Bench Press",
    chartUnit: "kg",
    chartInvert: false,
    progressData: [
      40, 42.5, 41, 44, 45, 43.5, 46, 48, 46.5, 50, 52.5, 51, 54,
      56, 54.5, 58, 60, 57.5, 61, 63, 60.5, 65, 67.5, 64, 68, 70,
      67, 72.5, 74, 71.5, 76, 78, 74.5, 80, 82.5, 79, 84, 85, 82,
      87.5, 88, 85.5, 90, 88, 91, 89.5, 92, 90, 92.5, 91, 92, 91.5,
      92.5,
    ],
  },
  {
    id: "sarah-kim",
    name: "Sarah Kim",
    age: 28,
    location: "Austin, TX",
    program: "Online Async Coaching",
    duration: "20 weeks",
    goal: "Marathon Preparation",
    category: "endurance",
    shortQuote: "I went from barely running a mile to finishing my first marathon. I still can't believe it.",
    fullQuote:
      "Running always intimidated me. I signed up for a half marathon on a dare and panicked when I realised my 'training' was three 20-minute jogs a week. My Strider coach built me a structured 20-week plan with video feedback on my form after every long run. Week 8, I ran my first double-digit mile. Week 20, I crossed the marathon finish line in 4:12 — not just finishing, but feeling strong. The nutrition guidance was equally game-changing. I had no idea how much fuelling during training mattered.",
    initials: "SK",
    coachName: "Priya Menon",
    coachNote:
      "Sarah's biggest challenge was overtraining and under-fuelling — two issues incredibly common in self-coached runners. Once we fixed her nutrition timing and added recovery weeks, her performance gains accelerated dramatically. Watching her kilometre splits drop every week was genuinely exciting.",
    stats: [
      { label: "5K Pace",         before: "7:45", after: "5:20",  unit: "/km" },
      { label: "Weekly Mileage",  before: "12",   after: "38",    unit: "km" },
      { label: "VO₂ Max (est.)",  before: "38",   after: "51",    unit: "" },
      { label: "Resting HR",      before: "76",   after: "58",    unit: "bpm" },
    ],
    chartLabel: "5K Time",
    chartUnit: "min",
    chartInvert: true,
    progressData: [38, 37.2, 36.5, 35.8, 34.9, 34, 33.1, 32.5, 31.8, 31, 30, 29.2, 28.5, 27.6, 26.8, 26, 25.4, 24.9, 24.6, 24.3],
  },
  {
    id: "james-okafor",
    name: "James Okafor",
    age: 41,
    location: "Chicago, IL",
    program: "Elite 1-on-1 Coaching",
    duration: "12 weeks",
    goal: "Strength & Muscle Gain",
    category: "strength",
    shortQuote: "As a busy dad of three, I thought peak fitness was behind me. My coach proved me completely wrong.",
    fullQuote:
      "I'm 41, I work 55-hour weeks, I have three kids, and I train at 5 am or not at all. I told my coach this on day one. Instead of handing me a generic 5-day program, he built me something that fit inside three 45-minute sessions a week — and the results completely blew my mind. My bench press went from 135 to 215 lbs. My squat from 185 to 295. I gained 14 lbs of muscle while dropping 6% body fat. My energy is the best it's been in 15 years. My teenage son now asks me for training advice.",
    initials: "JO",
    coachName: "Jordan Lee",
    coachNote:
      "James is the kind of client who shows up every single time, no excuses. My role was simply to give him the most efficient programme possible given his constraints. We prioritised compound movements, managed volume carefully around his recovery, and let the consistency do its work. The results speak for themselves.",
    stats: [
      { label: "Bench Press",   before: "135", after: "215", unit: "lbs" },
      { label: "Back Squat",    before: "185", after: "295", unit: "lbs" },
      { label: "Body Fat %",    before: "24",  after: "18",  unit: "%" },
      { label: "Lean Mass",     before: "168", after: "182", unit: "lbs" },
    ],
    chartLabel: "Bench Press",
    chartUnit: "lbs",
    chartInvert: false,
    progressData: [135, 145, 155, 160, 165, 175, 180, 185, 193, 200, 207, 215],
  },
];
