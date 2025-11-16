export const EVENT_DATE = new Date("2025-11-22T10:30:00-05:00").getTime();

export function getTimeRemaining() {
  const now = new Date().getTime();
  const distance = EVENT_DATE - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export const ABOUT_CONTENT = {
  title: "About the Masterclass",
  description: "This session cuts through confusion and gives you a clear, current, and practical understanding of the PMP exam - whether you're starting fresh or restarting your prep, you'll get the right direction, strategy, and tools with real techniques you can apply immediately."
};

export const LEARNING_ITEMS = [
  { id: 1, text: "Key changes in the 2025-2026 PMP exam structure", color: "black" },
  { id: 2, text: "The 10-Day PMP Sprint Strategy for fast prep", color: "yellow" },
  { id: 3, text: "How to tackle new scenario-based agile + hybrid questions", color: "yellow" },
  { id: 4, text: "Updated question distribution, exam blueprint & domain shifts", color: "black" },
  { id: 5, text: "High-efficiency study techniques + what to skip", color: "black" },
  { id: 6, text: "Mock test benchmarks & revision flow that actually works", color: "yellow" }
];

export const INSTRUCTOR_INFO = {
  name: "By The Edu Ocean Expert",
  title: "PMI Approved Instructor for PMP & CAPM",
  organization: "The Edu Ocean",
  experience: [
    "Ex Bell Labs",
    "Ex Cap Gemini",
    "Ex HCL Technologies",
    "Ex Satyam"
  ],
  achievement: "Trained 25,000+ professionals across the globe",
  description: "Our expert brings decades of real-world project leadership and is known for simplifying complex PMP concepts into easy, exam-focused instruction."
};

export const WHO_IS_THIS_FOR = {
  left: [
    "PMP aspirants planning to take the exam soon",
    "Working professionals needing a fast-track approach",
    "Candidates confused by the new exam structure"
  ],
  right: [
    "Students using old or outdated study materials",
    "CAPM holders upgrading to PMP",
    "Trainers who want to stay updated on exam changes"
  ]
};

export const TESTIMONIALS = [
  {
    quote: "EduOcean's structure helped me pass PMP in just eight weeks.",
    author: "Sarah Mitchell",
    role: "Project Analyst (USA)"
  },
  {
    quote: "The coach made the new exam question patterns easy to understand. I walked into the exam confident.",
    author: "David Reynolds",
    role: "Program Manager (UAE)"
  },
  {
    quote: "The 10-day sprint plan finally gave me clear direction and momentum.",
    author: "Linda Parker",
    role: "IT Delivery Lead (USA)"
  }
];

export const FAQ_ITEMS = [
  {
    q: "1. Who is this masterclass for?",
    a: "Anyone preparing for PMP or restarting their study plan."
  },
  {
    q: "2. Will there be a Q&A session?",
    a: "Yes - a dedicated segment at the end of the class."
  },
  {
    q: "3. What is the duration of this session?",
    a: "A focused 60-75 minute live session."
  },
  {
    q: "4. Will this session help me build a study plan?",
    a: "Yes - you'll leave with a complete 10-day roadmap."
  },
  {
    q: "5. Is the session live or recorded?",
    a: "Live only. Recording will not be shared."
  }
];
