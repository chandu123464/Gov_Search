export interface PracticeResource {
  id: string;
  title: string;
  platform: string;
  category: "SSC" | "Railway" | "Banking" | "State PSC" | "All Exams";
  resourceType: "pyq" | "mock_test" | "answer_key" | "all_in_one";
  badge: string;
  badgeColor: string;
  url: string;
  isOfficial?: boolean;
  description: string;
  highlights: string[];
  targetExams: string[];
  languages: string[];
  isFree: boolean;
  frequencyOrCount?: string;
  bestFor: string;
}

export interface ExamRoutineStep {
  step: number;
  title: string;
  action: string;
  recommendedPlatform: string;
  badge: string;
  tip: string;
  iconName: string;
}

export interface ExamCombination {
  examName: string;
  tagline: string;
  recommendedStack: {
    purpose: string;
    source: string;
    url: string;
    badge: string;
  }[];
}

export const SEVEN_STEP_ROUTINE: ExamRoutineStep[] = [
  {
    step: 1,
    title: "Finish a Topic",
    action: "Complete conceptual syllabus & foundational video lectures / notes for one specific chapter.",
    recommendedPlatform: "Gagan Pratap / Parmar SSC / StudyIQ / Study Notes",
    badge: "Foundation",
    tip: "Do not jump directly into full mocks without conceptual clarity on formulas & rules.",
    iconName: "BookOpen"
  },
  {
    step: 2,
    title: "Solve 5–10 Years PYQs",
    action: "Solve previous year exam papers topic-wise to identify real exam patterns & question traps.",
    recommendedPlatform: "Testbook PYQs & Adda247",
    badge: "Pattern Analysis",
    tip: "Target minimum 50-100 previous year questions per chapter before attempting timers.",
    iconName: "FileCheck2"
  },
  {
    step: 3,
    title: "Check Answers & Solutions",
    action: "Cross-check against authentic step-by-step solutions or official SSC/PSC final answer keys.",
    recommendedPlatform: "Official SSC Portal (ssc.gov.in) & Testbook Solved Keys",
    badge: "Accuracy Check",
    tip: "Verify calculation shortcuts and check official answer keys for disputed questions.",
    iconName: "CheckCircle2"
  },
  {
    step: 4,
    title: "Give a Free Sectional Mock",
    action: "Attempt 15–25 question timed sectional & topic quizzes for speed and speed calculation.",
    recommendedPlatform: "Adda247 Sectional Quizzes & Oliveboard",
    badge: "Speed & Accuracy",
    tip: "Keep negative marking strictly enabled during practice tests.",
    iconName: "Timer"
  },
  {
    step: 5,
    title: "Give a Full-Length Free Mock",
    action: "Take a realistic 100 or 200 question full-length mock under strict exam hall conditions.",
    recommendedPlatform: "Adda247 + Testbook Free Mocks",
    badge: "Real Simulation",
    tip: "Attempt mocks at your actual exam slot time (e.g., 9:00 AM - 10:00 AM) to train your brain.",
    iconName: "MonitorCheck"
  },
  {
    step: 6,
    title: "Analyze Mistakes",
    action: "Review unattempted and wrong questions. Classify errors: Silly mistake, conceptual gap, or time lapse.",
    recommendedPlatform: "Oliveboard AI Analytics / Testbook Report",
    badge: "Deep Analysis",
    tip: "Spend double the mock test duration on analyzing your mistakes notebook.",
    iconName: "BarChart3"
  },
  {
    step: 7,
    title: "Repeat Weak Topics",
    action: "Re-read notes on low-accuracy topics and re-attempt 20 targeted questions before next mock.",
    recommendedPlatform: "GovSearch Study Notes & Video Playlists",
    badge: "Mastery Loop",
    tip: "Consistent revision of the mistake notebook is what separates selected candidates from repeaters.",
    iconName: "Repeat"
  }
];

export const EXAM_COMBINATIONS: ExamCombination[] = [
  {
    examName: "Staff Selection Commission (SSC CGL, CHSL, MTS, GD, CPO)",
    tagline: "The golden formula for 150+ Tier-1 raw score",
    recommendedStack: [
      { purpose: "Previous Year Papers (Shift-wise)", source: "Testbook PYQs", url: "https://testbook.com/previous-year-papers", badge: "Primary PYQ" },
      { purpose: "Free Full & Sectional Mocks", source: "Adda247 SSC Mocks", url: "https://www.adda247.com/mock-tests", badge: "Free Full Mock" },
      { purpose: "Authentic Final Answer Keys", source: "SSC Official Portal (ssc.gov.in)", url: "https://ssc.gov.in/", badge: "Official Source" }
    ]
  },
  {
    examName: "Indian Railways (RRB NTPC, Group D, ALP, Technician, JE)",
    tagline: "Speed, science revision & shift-wise practice",
    recommendedStack: [
      { purpose: "5-Year Railway PYQs (CBT-1 & CBT-2)", source: "Testbook RRB PYQs", url: "https://testbook.com/previous-year-papers", badge: "PYQ Papers" },
      { purpose: "Bilingual Free Mock Series", source: "Adda247 Railway", url: "https://www.adda247.com/mock-tests", badge: "Free Mock" }
    ]
  },
  {
    examName: "Banking & Insurance (IBPS PO, Clerk, SBI PO, RBI, RRB)",
    tagline: "High-speed sectional cutoffs & puzzle drills",
    recommendedStack: [
      { purpose: "Topic & Sectional Speed Quizzes", source: "Adda247 Banking", url: "https://www.adda247.com/mock-tests", badge: "Sectional Speed" },
      { purpose: "High-Percentile All-India Mocks", source: "Oliveboard Free Banking Tests", url: "https://www.oliveboard.in/test-series/", badge: "Percentile & Rank" }
    ]
  },
  {
    examName: "State PSC & Police (APPSC, TSPSC, UPPSC, BPSC, Police SI/Constable)",
    tagline: "State General Studies + Official PSC Key Verification",
    recommendedStack: [
      { purpose: "State Group 1 & 2 Free Mocks", source: "Adda247 Telugu / State", url: "https://www.adda247.com/mock-tests", badge: "State Mocks" },
      { purpose: "Exam-wise PYQs with Solutions", source: "Testbook State PYQs", url: "https://testbook.com/previous-year-papers", badge: "State PYQ" },
      { purpose: "Master Question Papers & Final Keys", source: "Official PSC Portals (APPSC / TSPSC)", url: "https://psc.ap.gov.in/", badge: "Official Key" }
    ]
  }
];

export const PRACTICE_RESOURCES: PracticeResource[] = [
  {
    id: "testbook-pyqs",
    title: "Testbook Previous Year Question Papers (PYQs)",
    platform: "Testbook",
    category: "All Exams",
    resourceType: "pyq",
    badge: "Best for 5-10 Year PYQs",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    url: "https://testbook.com/previous-year-papers",
    description: "Extensive repository of hundreds of Indian government exams with shift-wise and exam-wise question papers. Download authentic PDFs with detailed solutions.",
    highlights: [
      "Covers SSC, Railway, Banking, Teaching, Defence, Police & State PSCs",
      "Official shift-wise question papers with original answer keys",
      "Instant PDF downloads and test-mode practice with live timer",
      "Step-by-step explanatory solutions in Hindi & English"
    ],
    targetExams: ["SSC CGL", "SSC CHSL", "RRB NTPC", "RRB Group D", "IBPS PO", "SBI Clerk", "APPSC", "TSPSC", "NDA", "CDS", "UGC NET"],
    languages: ["English", "Hindi"],
    isFree: true,
    frequencyOrCount: "500+ Exams Available",
    bestFor: "Step 2: Solving authentic shift-wise PYQs after completing syllabus chapters."
  },
  {
    id: "adda247-mock-tests",
    title: "Adda247 Free Mock Tests & Sectional Quizzes",
    platform: "Adda247",
    category: "All Exams",
    resourceType: "mock_test",
    badge: "Best for Free Full & Sectional Mocks",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    url: "https://www.adda247.com/mock-tests",
    description: "High-quality free full-length mock tests, subject-wise quizzes, and sectional mini-mocks covering SSC, Railway, Banking, Teaching, and AP/TS state exams.",
    highlights: [
      "Free full-length mocks matching latest 2025-2026 exam syllabus",
      "Section-wise & topic-wise quizzes with timer and negative marking",
      "Immediate solutions and All-India percentile rank calculation",
      "Dedicated Telugu and regional state exam coverage (APPSC & TSPSC)"
    ],
    targetExams: ["SSC CGL", "SSC CHSL", "RRB NTPC", "IBPS Clerk", "SBI PO", "APPSC Group 2", "TSPSC", "CTET", "Delhi Police"],
    languages: ["English", "Hindi", "Telugu"],
    isFree: true,
    frequencyOrCount: "Daily Live Mocks & Quizzes",
    bestFor: "Step 4 & 5: Sectional drills and full-length exam simulation."
  },
  {
    id: "testbook-free-mocks",
    title: "Testbook Free Mock Test Series (SSC CGL & Multi-Exam)",
    platform: "Testbook",
    category: "SSC",
    resourceType: "mock_test",
    badge: "Best for Real Exam Interface",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    url: "https://testbook.com/ssc-cgl/test-series",
    description: "Industry-standard CBT mock test interface simulating the exact TCS-iON software used in SSC and Railway exams. Includes free full tests, chapter tests and speed drills.",
    highlights: [
      "Exact replica of TCS-iON exam screen interface and color palette",
      "Free chapter tests, subject tests, and full-length mock exams",
      "Available in dual language: English and Hindi with quick toggle",
      "In-depth accuracy matrix, speed per question and weak-area alerts"
    ],
    targetExams: ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC GD", "RRB ALP", "RRB Technician"],
    languages: ["English", "Hindi"],
    isFree: true,
    frequencyOrCount: "Free Tier Available",
    bestFor: "Step 5: Simulating real TCS exam software pressure and timing."
  },
  {
    id: "oliveboard-free-mocks",
    title: "Oliveboard 100+ Free Mock Tests & AI Analytics",
    platform: "Oliveboard",
    category: "Banking",
    resourceType: "mock_test",
    badge: "Best for AI Mistake Analysis",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    url: "https://www.oliveboard.in/test-series/",
    description: "Top-rated mock test series known for higher difficulty questions matching latest cutoff benchmarks in Banking, SSC, and Railway exams. Offers 100+ free mock tests.",
    highlights: [
      "100+ free sectional, topic, and full-length mock tests",
      "AI-powered Mistake Analyzer highlighting time traps & careless errors",
      "All-India Percentile comparison against top 1% candidates",
      "Specialized high-level puzzles, Data Interpretation, and Grammar tests"
    ],
    targetExams: ["SBI PO", "IBPS PO", "RBI Grade B", "SSC CGL Tier 2", "UPSC EPFO", "RRB NTPC"],
    languages: ["English", "Hindi"],
    isFree: true,
    frequencyOrCount: "100+ Free Tests",
    bestFor: "Step 6: AI-driven mistake classification and tough question practice."
  },
  {
    id: "ssc-official-portal",
    title: "Staff Selection Commission Official Final Answer Keys",
    platform: "SSC Official (ssc.gov.in)",
    category: "SSC",
    resourceType: "answer_key",
    badge: "100% Authentic Final Answer Keys",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    url: "https://ssc.gov.in/",
    isOfficial: true,
    description: "The primary government source for official candidate response sheets, tentative answer keys, and final official answer keys. Always cross-verify final scores here.",
    highlights: [
      "Official answer key updates with candidate roll number login",
      "Direct release of final answer keys and scorecards for CHSL, CGL, MTS",
      "Authentic government representation without commercial coaching bias",
      "Master question papers and representation challenge reports"
    ],
    targetExams: ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC GD Constable", "SSC CPO", "SSC Selection Posts"],
    languages: ["English", "Hindi"],
    isFree: true,
    bestFor: "Step 3: Authentic final answer key verification directly from the exam board."
  },
  {
    id: "adda247-free-resources",
    title: "Adda247 All-In-One Free Resource Portal",
    platform: "Adda247",
    category: "All Exams",
    resourceType: "all_in_one",
    badge: "Daily Current Affairs & Practice",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    url: "https://www.adda247.com/",
    description: "A comprehensive free learning hub offering Daily Current Affairs PDFs, PYQ collections, free live doubt-clearing sessions, and daily sectional practice tests.",
    highlights: [
      "Daily & Monthly Current Affairs PDF digests",
      "Previous Year Papers archive across central & state recruitments",
      "Free live revision marathons on YouTube and web platform",
      "Subject-wise mini practice tests updated daily"
    ],
    targetExams: ["SSC", "Banking", "Railway", "Defence", "Teaching", "State PSC"],
    languages: ["English", "Hindi", "Telugu"],
    isFree: true,
    bestFor: "Daily routine: Current affairs revision & supplementary practice."
  },
  {
    id: "state-psc-official-portals",
    title: "APPSC & TSPSC State Public Service Commission Portals",
    platform: "APPSC & TSPSC Official",
    category: "State PSC",
    resourceType: "answer_key",
    badge: "Official State Keys & Gazettes",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    url: "https://psc.ap.gov.in/",
    isOfficial: true,
    description: "Official Andhra Pradesh (APPSC) & Telangana (TSPSC) commission websites for downloading master question papers, official preliminary keys, and final evaluated answer keys.",
    highlights: [
      "Official Group 1, Group 2, Group 3, and Panchayat Secretary keys",
      "Telugu & English bilingual official question papers",
      "Official notification brochures, syllabus blueprints, and cutoff marks",
      "Web notes and objection filing notices"
    ],
    targetExams: ["APPSC Group 1", "APPSC Group 2", "TSPSC Group 1", "TSPSC Group 2", "AP Police Constable & SI", "TS Police"],
    languages: ["Telugu", "English"],
    isFree: true,
    bestFor: "Official state exam master papers, notifications, and authenticated answer keys."
  }
];
