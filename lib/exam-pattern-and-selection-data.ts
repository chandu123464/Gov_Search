export interface ExamSubjectRow {
  subjectName: string;
  questions: number;
  marks: number;
  durationMinutes: number;
  negativeMarking: string;
  medium: string;
}

export interface ExamTierPattern {
  tierName: string;
  mode: "Computer Based Test (CBT)" | "Descriptive / Offline (OMR)" | "Physical Efficiency Test" | "Skill / Typing";
  totalQuestions: number;
  totalMarks: number;
  totalDuration: string;
  negativeScheme: string;
  subjects: ExamSubjectRow[];
  qualifyingCriteria?: string;
}

export interface SelectionStage {
  stageNumber: number;
  stageName: string;
  stageType: "Written Exam" | "Physical Test" | "Skill Test" | "Document Verification" | "Medical Test" | "Final Merit";
  description: string;
  details: string[];
}

export interface ExamPatternAndSelectionItem {
  id: string;
  slug: string;
  board: "SSC" | "RRB" | "Banking" | "UPSC" | "Defence" | "State Police";
  boardFullName: string;
  examName: string;
  postTitle: string;
  eligibilityQualification: string;
  freeJobAlertPatternUrl: string;
  freeJobAlertSelectionUrl: string;
  tiers: ExamTierPattern[];
  selectionStages: SelectionStage[];
  physicalCriteria?: {
    gender: "Male" | "Female";
    heightCm: number;
    chestCm?: string;
    race: string;
    highJump?: string;
    longJump?: string;
  }[];
  minimumCutoffs: {
    category: string;
    qualifyingPercent: string;
  }[];
}

export const EXAM_PATTERNS_AND_SELECTION: ExamPatternAndSelectionItem[] = [
  {
    id: "ssc-cgl",
    slug: "ssc-cgl",
    board: "SSC",
    boardFullName: "Staff Selection Commission",
    examName: "SSC Combined Graduate Level (CGL) 2026",
    postTitle: "Assistant Section Officer (ASO), Inspector (GST, Examiner, IT), Sub Inspector (CBI)",
    eligibilityQualification: "Any Graduate (Bachelor's Degree)",
    freeJobAlertPatternUrl: "https://www.freejobalert.com/ssc-cgl-exam-pattern/21085/",
    freeJobAlertSelectionUrl: "https://www.freejobalert.com/ssc-cgl-selection-process/21087/",
    tiers: [
      {
        tierName: "Tier-I (Computer Based Examination)",
        mode: "Computer Based Test (CBT)",
        totalQuestions: 100,
        totalMarks: 200,
        totalDuration: "60 Minutes (80 Mins for PwD)",
        negativeScheme: "0.50 marks deducted for each wrong answer (1/4th)",
        qualifyingCriteria: "Qualifying in nature. Marks used to shortlist candidates for Tier-II.",
        subjects: [
          { subjectName: "General Intelligence and Reasoning", questions: 25, marks: 50, durationMinutes: 60, negativeMarking: "-0.50", medium: "Bilingual (Hindi / English)" },
          { subjectName: "General Awareness (Current Affairs, Science, History)", questions: 25, marks: 50, durationMinutes: 60, negativeMarking: "-0.50", medium: "Bilingual (Hindi / English)" },
          { subjectName: "Quantitative Aptitude (Arithmetic & Advanced Maths)", questions: 25, marks: 50, durationMinutes: 60, negativeMarking: "-0.50", medium: "Bilingual (Hindi / English)" },
          { subjectName: "English Comprehension & Grammar", questions: 25, marks: 50, durationMinutes: 60, negativeMarking: "-0.50", medium: "English" },
        ],
      },
      {
        tierName: "Tier-II (Mains CBT + Computer & Data Entry Test)",
        mode: "Computer Based Test (CBT)",
        totalQuestions: 150,
        totalMarks: 390,
        totalDuration: "2 Hours 15 Minutes + 15 Mins Typing",
        negativeScheme: "1 mark deducted for each wrong answer in Section I & II",
        qualifyingCriteria: "Merit ranking based on 390 marks (Section I & II). Computer Module & DEST are qualifying.",
        subjects: [
          { subjectName: "Section-I (Module 1: Mathematical Abilities)", questions: 30, marks: 90, durationMinutes: 60, negativeMarking: "-1.00", medium: "Bilingual" },
          { subjectName: "Section-I (Module 2: Reasoning and General Intelligence)", questions: 30, marks: 90, durationMinutes: 60, negativeMarking: "-1.00", medium: "Bilingual" },
          { subjectName: "Section-II (Module 1: English Language & Comprehension)", questions: 45, marks: 135, durationMinutes: 60, negativeMarking: "-1.00", medium: "English" },
          { subjectName: "Section-II (Module 2: General Awareness)", questions: 25, marks: 75, durationMinutes: 60, negativeMarking: "-1.00", medium: "Bilingual" },
          { subjectName: "Section-III (Computer Knowledge Module - Qualifying)", questions: 20, marks: 60, durationMinutes: 15, negativeMarking: "-1.00", medium: "Bilingual" },
          { subjectName: "Section-III (Data Entry Speed Test DEST - 2000 Key Depressions)", questions: 1, marks: 0, durationMinutes: 15, negativeMarking: "Accuracy Based", medium: "English / Hindi" },
        ],
      },
    ],
    selectionStages: [
      { stageNumber: 1, stageName: "Tier-I Examination", stageType: "Written Exam", description: "Objective screening test with 100 questions (200 marks).", details: ["Normalized scores used to calculate cutoff", "Approx 10x vacancies shortlisted for Tier-II"] },
      { stageNumber: 2, stageName: "Tier-II Examination", stageType: "Written Exam", description: "Comprehensive test across Math, Reasoning, English, GA, Computer, and DEST.", details: ["Session 1 (Paper 1) mandatory for all posts", "Paper 2 (Statistics) only for JSO post"] },
      { stageNumber: 3, stageName: "Document Verification (DV)", stageType: "Document Verification", description: "Conducted directly by Indenting User Departments / Ministries.", details: ["Original educational degrees, category certificates verified", "Final Post Preference confirmed"] },
      { stageNumber: 4, stageName: "Medical Examination & Final Merit", stageType: "Final Merit", description: "Final merit list formulated on aggregate marks of Tier-II (Section I + II = 390 Marks).", details: ["Post allotment made strictly in order of merit-cum-preference"] },
    ],
    minimumCutoffs: [
      { category: "UR (Unreserved)", qualifyingPercent: "30% (117 Marks / 390)" },
      { category: "OBC / EWS", qualifyingPercent: "25% (97.5 Marks / 390)" },
      { category: "SC / ST / PwD / ESM", qualifyingPercent: "20% (78 Marks / 390)" },
    ],
  },
  {
    id: "rrb-ntpc",
    slug: "rrb-ntpc",
    board: "RRB",
    boardFullName: "Railway Recruitment Boards",
    examName: "RRB NTPC Graduate & Undergraduate (CEN 05/2026)",
    postTitle: "Station Master, Goods Train Manager, Senior Clerk Cum Typist, Junior Account Assistant",
    eligibilityQualification: "12th Pass (UG Posts) / Any Graduate (Graduate Posts)",
    freeJobAlertPatternUrl: "https://www.freejobalert.com/rrb-ntpc-exam-pattern/21150/",
    freeJobAlertSelectionUrl: "https://www.freejobalert.com/rrb-ntpc-selection-process/21152/",
    tiers: [
      {
        tierName: "1st Stage Computer Based Test (CBT-1)",
        mode: "Computer Based Test (CBT)",
        totalQuestions: 100,
        totalMarks: 100,
        totalDuration: "90 Minutes (120 Mins for PwBD)",
        negativeScheme: "1/3rd marks deducted for each wrong answer",
        qualifyingCriteria: "Common for all posts. Shortlists candidates at 15 times the vacancy for CBT-2.",
        subjects: [
          { subjectName: "General Awareness (Current Affairs, Railway GK, History, Science)", questions: 40, marks: 40, durationMinutes: 90, negativeMarking: "-0.33", medium: "15 Indian Languages" },
          { subjectName: "Mathematics (Arithmetic, Algebra, Trigonometry, Geometry)", questions: 30, marks: 30, durationMinutes: 90, negativeMarking: "-0.33", medium: "15 Indian Languages" },
          { subjectName: "General Intelligence and Reasoning", questions: 30, marks: 30, durationMinutes: 90, negativeMarking: "-0.33", medium: "15 Indian Languages" },
        ],
      },
      {
        tierName: "2nd Stage Computer Based Test (CBT-2)",
        mode: "Computer Based Test (CBT)",
        totalQuestions: 120,
        totalMarks: 120,
        totalDuration: "90 Minutes",
        negativeScheme: "1/3rd marks deducted for each wrong answer",
        qualifyingCriteria: "Level-wise separate CBT-2. Decides final merit for non-typing posts.",
        subjects: [
          { subjectName: "General Awareness", questions: 50, marks: 50, durationMinutes: 90, negativeMarking: "-0.33", medium: "15 Indian Languages" },
          { subjectName: "Mathematics", questions: 35, marks: 35, durationMinutes: 90, negativeMarking: "-0.33", medium: "15 Indian Languages" },
          { subjectName: "General Intelligence & Reasoning", questions: 35, marks: 35, durationMinutes: 90, negativeMarking: "-0.33", medium: "15 Indian Languages" },
        ],
      },
    ],
    selectionStages: [
      { stageNumber: 1, stageName: "1st Stage CBT (Screening)", stageType: "Written Exam", description: "Common screening test across 100 questions in 90 minutes.", details: ["Shortlists 15x candidates level-wise for 2nd stage CBT"] },
      { stageNumber: 2, stageName: "2nd Stage CBT (Merit Scoring)", stageType: "Written Exam", description: "Advanced test with 120 questions across General Awareness, Maths & Reasoning.", details: ["Scores directly determine merit for non-typing posts"] },
      { stageNumber: 3, stageName: "CBAT (Aptitude) / Typing Skill Test", stageType: "Skill Test", description: "CBAT for Station Master (Score 70:30 ratio); Typing test for Clerks (30 WPM English / 25 WPM Hindi).", details: ["Qualifying in nature for Clerical posts without editing tools"] },
      { stageNumber: 4, stageName: "Document Verification & Medical", stageType: "Document Verification", description: "Verification of matriculation, degree, caste certificates followed by Railway Medical (A-2, A-3, B-2).", details: ["Strict eye-vision test required for Station Master & Guards"] },
    ],
    minimumCutoffs: [
      { category: "UR / EWS", qualifyingPercent: "40% (40 Marks CBT-1 / 48 Marks CBT-2)" },
      { category: "OBC (Non-Creamy Layer)", qualifyingPercent: "30% (30 Marks CBT-1 / 36 Marks CBT-2)" },
      { category: "SC / ST", qualifyingPercent: "30% (SC) / 25% (ST)" },
    ],
  },
  {
    id: "ssc-cpo",
    slug: "ssc-cpo",
    board: "SSC",
    boardFullName: "Staff Selection Commission",
    examName: "SSC Sub-Inspector in Delhi Police & CAPFs 2026 (SI / CPO)",
    postTitle: "Sub-Inspector in Delhi Police, BSF, CISF, CRPF, ITBP, SSB",
    eligibilityQualification: "Any Bachelor's Degree (Driving License required for Delhi Police Male)",
    freeJobAlertPatternUrl: "https://www.freejobalert.com/ssc-cpo-exam-pattern/21110/",
    freeJobAlertSelectionUrl: "https://www.freejobalert.com/ssc-cpo-selection-process/21112/",
    tiers: [
      {
        tierName: "Paper-I (Computer Based Examination)",
        mode: "Computer Based Test (CBT)",
        totalQuestions: 200,
        totalMarks: 200,
        totalDuration: "2 Hours (120 Minutes)",
        negativeScheme: "0.25 marks deducted for each wrong answer (1/4th)",
        subjects: [
          { subjectName: "General Intelligence and Reasoning", questions: 50, marks: 50, durationMinutes: 120, negativeMarking: "-0.25", medium: "Bilingual" },
          { subjectName: "General Knowledge and General Awareness", questions: 50, marks: 50, durationMinutes: 120, negativeMarking: "-0.25", medium: "Bilingual" },
          { subjectName: "Quantitative Aptitude", questions: 50, marks: 50, durationMinutes: 120, negativeMarking: "-0.25", medium: "Bilingual" },
          { subjectName: "English Comprehension", questions: 50, marks: 50, durationMinutes: 120, negativeMarking: "-0.25", medium: "English" },
        ],
      },
      {
        tierName: "Paper-II (English Language & Comprehension)",
        mode: "Computer Based Test (CBT)",
        totalQuestions: 200,
        totalMarks: 200,
        totalDuration: "2 Hours (120 Minutes)",
        negativeScheme: "0.25 marks deducted for each wrong answer",
        subjects: [
          { subjectName: "English Language and Comprehension (Vocabulary, Grammar, Error Detection, Cloze Test, Reading)", questions: 200, marks: 200, durationMinutes: 120, negativeMarking: "-0.25", medium: "English" },
        ],
      },
    ],
    selectionStages: [
      { stageNumber: 1, stageName: "Paper-I CBT", stageType: "Written Exam", description: "200 Questions (200 Marks) in Reasoning, GK, Maths & English.", details: ["Qualifying in Paper-I makes candidate eligible for PST / PET"] },
      { stageNumber: 2, stageName: "Physical Standard & Physical Endurance Test (PST/PET)", stageType: "Physical Test", description: "Mandatory qualifying physical benchmarks conducted by CAPF Nodal Force.", details: ["Height/Chest measurement", "100m sprint + 1.6km run + Long Jump + High Jump + Shot Put"] },
      { stageNumber: 3, stageName: "Paper-II CBT (English Language)", stageType: "Written Exam", description: "Only candidates qualifying PET/PST are permitted to appear in Paper-II.", details: ["Aggregate marks in Paper-I + Paper-II (400 Marks) determine final ranking"] },
      { stageNumber: 4, stageName: "Detailed Medical Examination (DME)", stageType: "Medical Test", description: "Vision standard 6/6 & 6/9, colour blindness, knock-knee, flat-foot check.", details: ["Review Medical Examination (RME) permitted within prescribed appeal time"] },
    ],
    physicalCriteria: [
      { gender: "Male", heightCm: 170, chestCm: "80 cm unexpanded / 85 cm expanded", race: "100m sprint in 16 secs & 1.6km run in 6.5 mins", longJump: "3.65m in 3 chances", highJump: "1.2m in 3 chances" },
      { gender: "Female", heightCm: 157, race: "100m sprint in 18 secs & 800m run in 4 mins", longJump: "2.7m in 3 chances", highJump: "0.9m in 3 chances" },
    ],
    minimumCutoffs: [
      { category: "UR", qualifyingPercent: "30% (60 Marks in Paper-I / Paper-II)" },
      { category: "OBC / EWS", qualifyingPercent: "25% (50 Marks in Paper-I / Paper-II)" },
      { category: "All other categories", qualifyingPercent: "20% (40 Marks in Paper-I / Paper-II)" },
    ],
  },
  {
    id: "ibps-po",
    slug: "ibps-po",
    board: "Banking",
    boardFullName: "Institute of Banking Personnel Selection",
    examName: "IBPS PO / MT XIV & SBI PO 2026",
    postTitle: "Probationary Officer / Management Trainee in Public Sector Commercial Banks",
    eligibilityQualification: "Any Graduation Degree",
    freeJobAlertPatternUrl: "https://www.freejobalert.com/ibps-po-exam-pattern/21135/",
    freeJobAlertSelectionUrl: "https://www.freejobalert.com/ibps-po-selection-process/21137/",
    tiers: [
      {
        tierName: "Preliminary Examination",
        mode: "Computer Based Test (CBT)",
        totalQuestions: 100,
        totalMarks: 100,
        totalDuration: "60 Minutes (Sectional 20 Mins each)",
        negativeScheme: "0.25 marks deducted for each wrong response",
        subjects: [
          { subjectName: "English Language", questions: 30, marks: 30, durationMinutes: 20, negativeMarking: "-0.25", medium: "English" },
          { subjectName: "Quantitative Aptitude", questions: 35, marks: 35, durationMinutes: 20, negativeMarking: "-0.25", medium: "Bilingual" },
          { subjectName: "Reasoning Ability", questions: 35, marks: 35, durationMinutes: 20, negativeMarking: "-0.25", medium: "Bilingual" },
        ],
      },
      {
        tierName: "Mains Examination (Objective + Descriptive Essay/Letter)",
        mode: "Computer Based Test (CBT)",
        totalQuestions: 157,
        totalMarks: 225,
        totalDuration: "3 Hours 30 Minutes",
        negativeScheme: "1/4th of mark allotted to question deducted for wrong answer",
        subjects: [
          { subjectName: "Reasoning & Computer Aptitude", questions: 45, marks: 60, durationMinutes: 60, negativeMarking: "-0.25", medium: "Bilingual" },
          { subjectName: "General / Economy / Banking Awareness", questions: 40, marks: 40, durationMinutes: 35, negativeMarking: "-0.25", medium: "Bilingual" },
          { subjectName: "English Language", questions: 35, marks: 40, durationMinutes: 40, negativeMarking: "-0.25", medium: "English" },
          { subjectName: "Data Analysis & Interpretation", questions: 35, marks: 60, durationMinutes: 45, negativeMarking: "-0.25", medium: "Bilingual" },
          { subjectName: "English Language Descriptive (Letter Writing & Essay)", questions: 2, marks: 25, durationMinutes: 30, negativeMarking: "Quality Based", medium: "English" },
        ],
      },
    ],
    selectionStages: [
      { stageNumber: 1, stageName: "Preliminary Exam", stageType: "Written Exam", description: "100 marks online test with sectional cutoff in each of the 3 tests.", details: ["Shortlists approx 10x candidates for Mains"] },
      { stageNumber: 2, stageName: "Mains Exam (225 Marks)", stageType: "Written Exam", description: "Objective test (200 marks) + Descriptive typing test (25 marks).", details: ["Only candidates securing sectional and total cutoffs shortlisted for Interview"] },
      { stageNumber: 3, stageName: "Common Interview (100 Marks)", stageType: "Skill Test", description: "Conducted jointly by Participating Banks and coordinated by Nodal Bank.", details: ["Weightage ratio of Mains Exam and Interview is 80:20"] },
      { stageNumber: 4, stageName: "Provisional Allotment", stageType: "Final Merit", description: "Combined score out of 100 calculated (Mains converted to 80 + Interview converted to 20).", details: ["Banks allotted on merit-cum-preference basis"] },
    ],
    minimumCutoffs: [
      { category: "UR / EWS", qualifyingPercent: "40% in Interview (40/100)" },
      { category: "SC / ST / OBC / PwBD", qualifyingPercent: "35% in Interview (35/100)" },
    ],
  },
  {
    id: "upsc-cse",
    slug: "upsc-cse",
    board: "UPSC",
    boardFullName: "Union Public Service Commission",
    examName: "UPSC Civil Services Examination (CSE) 2026",
    postTitle: "Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), IRS",
    eligibilityQualification: "Graduate Degree in any discipline",
    freeJobAlertPatternUrl: "https://www.freejobalert.com/upsc-civil-services-exam-pattern/21170/",
    freeJobAlertSelectionUrl: "https://www.freejobalert.com/upsc-civil-services-selection-process/21172/",
    tiers: [
      {
        tierName: "Preliminary Examination (Objective Screening)",
        mode: "Descriptive / Offline (OMR)",
        totalQuestions: 180,
        totalMarks: 400,
        totalDuration: "4 Hours (2 Hours per Paper)",
        negativeScheme: "1/3rd (0.33) marks deducted for each wrong answer",
        subjects: [
          { subjectName: "General Studies Paper-I (History, Polity, Economy, Geo, Environment, Science, Current Affairs)", questions: 100, marks: 200, durationMinutes: 120, negativeMarking: "-0.66", medium: "Bilingual" },
          { subjectName: "General Studies Paper-II / CSAT (Comprehension, Logical Reasoning, Basic Numeracy - Qualifying at 33%)", questions: 80, marks: 200, durationMinutes: 120, negativeMarking: "-0.83", medium: "Bilingual" },
        ],
      },
      {
        tierName: "Main Examination (Written 9 Papers) + Personality Test",
        mode: "Descriptive / Offline (OMR)",
        totalQuestions: 9,
        totalMarks: 2025,
        totalDuration: "5 Days (3 Hours per paper)",
        negativeScheme: "No negative marking (Pen & Paper Essay/Subjective Answers)",
        subjects: [
          { subjectName: "Paper-A: Indian Language (Qualifying - 25%)", questions: 1, marks: 300, durationMinutes: 180, negativeMarking: "None", medium: "Chosen Indian Language" },
          { subjectName: "Paper-B: English (Qualifying - 25%)", questions: 1, marks: 300, durationMinutes: 180, negativeMarking: "None", medium: "English" },
          { subjectName: "Paper-I: Essay (Merit Counted)", questions: 2, marks: 250, durationMinutes: 180, negativeMarking: "None", medium: "Authorized Medium" },
          { subjectName: "Paper-II: General Studies-I (Heritage, Culture, History & Geography)", questions: 20, marks: 250, durationMinutes: 180, negativeMarking: "None", medium: "Authorized Medium" },
          { subjectName: "Paper-III: General Studies-II (Governance, Constitution, Polity, Social Justice & IR)", questions: 20, marks: 250, durationMinutes: 180, negativeMarking: "None", medium: "Authorized Medium" },
          { subjectName: "Paper-IV: General Studies-III (Technology, Economic Development, Biodiversity, Security)", questions: 20, marks: 250, durationMinutes: 180, negativeMarking: "None", medium: "Authorized Medium" },
          { subjectName: "Paper-V: General Studies-IV (Ethics, Integrity and Aptitude)", questions: 14, marks: 250, durationMinutes: 180, negativeMarking: "None", medium: "Authorized Medium" },
          { subjectName: "Paper-VI: Optional Subject - Paper 1", questions: 8, marks: 250, durationMinutes: 180, negativeMarking: "None", medium: "Authorized Medium" },
          { subjectName: "Paper-VII: Optional Subject - Paper 2", questions: 8, marks: 250, durationMinutes: 180, negativeMarking: "None", medium: "Authorized Medium" },
        ],
      },
    ],
    selectionStages: [
      { stageNumber: 1, stageName: "Civil Services (Preliminary) Exam", stageType: "Written Exam", description: "Two objective papers (GS-I and CSAT). Shortlists for Mains.", details: ["CSAT requires minimum 33% (66 marks)", "GS-I determines prelims cutoff"] },
      { stageNumber: 2, stageName: "Civil Services (Main) Written Exam", stageType: "Written Exam", description: "9 subjective essay-style papers over 5 days (1750 marks counted for merit).", details: ["Paper A & B qualifying in nature", "Candidate can write in any 8th Schedule language"] },
      { stageNumber: 3, stageName: "Personality Test / Interview (275 Marks)", stageType: "Skill Test", description: "Assesses personal suitability, mental alertness, balance of judgment and leadership.", details: ["Conducted at Dholpur House, New Delhi"] },
      { stageNumber: 4, stageName: "Final Service Allocation", stageType: "Final Merit", description: "Total Score = Mains Written (1750) + Interview (275) = 2025 Marks.", details: ["Allotment to IAS, IPS, IFS, IRS in accordance with rank and cadre preference"] },
    ],
    minimumCutoffs: [
      { category: "CSAT Paper-II", qualifyingPercent: "33.00% (66.00 Marks / 200)" },
      { category: "Mains Paper A & B", qualifyingPercent: "25.00% (75.00 Marks / 300)" },
    ],
  },
];
