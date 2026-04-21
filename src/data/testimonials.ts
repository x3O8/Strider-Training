export interface ClientStory {
  id: string;
  name: string;
  age: number;
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
}

export const clientStories: ClientStory[] = [
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    age: 34,
    location: "New York, NY",
    program: "Elite 1-on-1 Coaching",
    duration: "16 weeks",
    goal: "Weight Loss",
    category: "weight-loss",
    shortQuote: "I lost 41 lbs without ever feeling like I was on a diet. My coach made it sustainable.",
    fullQuote:
      "I've tried every diet and every app. Nothing stuck — because nothing fit my actual life. With Strider, my coach sat down with me week one and said 'let's build something you can actually do.' The check-ins held me accountable in a way that felt like support, not judgment. Sixteen weeks later, I'm 41 lbs lighter, my blood pressure is normal for the first time in a decade, and I can run a 5K without stopping. This wasn't just weight loss — it was a complete lifestyle change that I'm going to maintain for life.",
    initials: "MC",
    coachName: "Alex Rivera",
    coachNote:
      "Marcus came in with 3 failed diet attempts behind him. The key was removing the all-or-nothing mindset and building one habit at a time. By week 6 he was training 4x/week and cooking 90% of his meals — without ever feeling deprived.",
    stats: [
      { label: "Body Weight",   before: "225", after: "184",  unit: "lbs" },
      { label: "Body Fat %",    before: "33",  after: "20",   unit: "%" },
      { label: "Resting HR",    before: "82",  after: "61",   unit: "bpm" },
      { label: "Weekly Steps",  before: "3.2", after: "11.4", unit: "K" },
    ],
    chartLabel: "Body Weight",
    chartUnit: "lbs",
    chartInvert: true,
    progressData: [225, 222, 220, 217, 213, 210, 207, 204, 200, 197, 193, 190, 188, 186, 184, 184],
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
