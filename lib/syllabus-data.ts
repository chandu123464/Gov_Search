export interface ExamSubjectPattern {
  subject: string;
  questions: number;
  marks: number;
  weightage_percent: number;
  duration_minutes?: number;
}

export interface TopicItem {
  topic_name: string;
  subtopics: string[];
  expected_questions?: string;
}

export interface SubjectSyllabus {
  subject_name: string;
  total_marks: number;
  topics: TopicItem[];
}

export interface JobSyllabusData {
  exam_title: string;
  mode_of_exam: string;
  total_stages: string;
  total_questions: number;
  total_marks: number;
  time_duration: string;
  negative_marking: string;
  pattern: ExamSubjectPattern[];
  subjects: SubjectSyllabus[];
  preparation_tips: string[];
  official_pdf_note?: string;
}

// Pre-defined syllabi for major exams in the system
export const SPECIFIC_JOB_SYLLABUS: Record<string, JobSyllabusData> = {
  "ssc-chsl-recruitment-2026": {
    exam_title: "SSC CHSL (10+2) Tier-1 Examination",
    mode_of_exam: "Computer Based Test (CBT - Objective MCQs)",
    total_stages: "Tier-1 (CBT), Tier-2 (Objective + Typing/Skill Test)",
    total_questions: 100,
    total_marks: 200,
    time_duration: "60 Minutes (80 mins for scribe candidates)",
    negative_marking: "0.50 marks deducted for each wrong answer",
    pattern: [
      { subject: "General Intelligence & Reasoning", questions: 25, marks: 50, weightage_percent: 25 },
      { subject: "General Awareness & Current Affairs", questions: 25, marks: 50, weightage_percent: 25 },
      { subject: "Quantitative Aptitude (Basic Arithmetic)", questions: 25, marks: 50, weightage_percent: 25 },
      { subject: "English Language (Basic Knowledge)", questions: 25, marks: 50, weightage_percent: 25 }
    ],
    subjects: [
      {
        subject_name: "General Intelligence & Reasoning",
        total_marks: 50,
        topics: [
          {
            topic_name: "Verbal Reasoning",
            subtopics: ["Analogy", "Classification", "Series Completion", "Coding-Decoding", "Blood Relations", "Direction Sense", "Syllogism"],
            expected_questions: "12-14 Questions"
          },
          {
            topic_name: "Non-Verbal Reasoning",
            subtopics: ["Paper Folding & Cutting", "Mirror & Water Images", "Embedded Figures", "Figure Completion", "Matrix Pattern", "Venn Diagrams"],
            expected_questions: "11-13 Questions"
          }
        ]
      },
      {
        subject_name: "Quantitative Aptitude",
        total_marks: 50,
        topics: [
          {
            topic_name: "Arithmetic Mathematics",
            subtopics: ["Percentages", "Ratio & Proportion", "Profit & Loss", "Simple & Compound Interest", "Time & Work", "Pipes & Cisterns", "Time, Speed & Distance", "Averages"],
            expected_questions: "13-15 Questions"
          },
          {
            topic_name: "Advanced Mathematics & Geometry",
            subtopics: ["Algebraic Identities", "Linear Equations", "Triangles & Circles", "Trigonometric Ratios & Heights", "Mensuration (2D & 3D)", "Histograms & Bar Graphs"],
            expected_questions: "10-12 Questions"
          }
        ]
      },
      {
        subject_name: "General Awareness",
        total_marks: 50,
        topics: [
          {
            topic_name: "General Science & Static GK",
            subtopics: ["Indian History & Freedom Movement", "Geography & Environment", "Indian Constitution & Polity", "Economics & Five-Year Plans", "Physics, Chemistry & Biology"],
            expected_questions: "14-16 Questions"
          },
          {
            topic_name: "Current Affairs & Miscellaneous",
            subtopics: ["National & International Events (Last 8 Months)", "Govt Schemes & Summits", "Sports & Awards", "Books & Authors", "Important Days"],
            expected_questions: "9-11 Questions"
          }
        ]
      },
      {
        subject_name: "English Language",
        total_marks: 50,
        topics: [
          {
            topic_name: "Vocabulary & Grammar",
            subtopics: ["Spotting the Error", "Fill in the Blanks", "Synonyms & Antonyms", "Spellings / Misspelt Words", "Idioms & Phrases", "One Word Substitution"],
            expected_questions: "15-17 Questions"
          },
          {
            topic_name: "Comprehension & Sentence Structure",
            subtopics: ["Active/Passive Voice", "Direct/Indirect Narration", "Sentence Improvement", "Cloze Test / Reading Comprehension Passage"],
            expected_questions: "8-10 Questions"
          }
        ]
      }
    ],
    preparation_tips: [
      "Dedicate daily 45 minutes to Quantitative formula revision and high-speed calculation tables.",
      "Analyze previous 5 years' SSC CHSL question papers to identify repeating grammar patterns.",
      "Maintain a daily log of National/International current affairs of the last 6-8 months.",
      "Avoid negative marks: Attempt with at least 85% confidence to safeguard high normalized score."
    ]
  },
  "rrb-ntpc-graduate-recruitment-2026": {
    exam_title: "RRB NTPC CBT-1 Computer Based Screening Test",
    mode_of_exam: "Online Computer Based Examination (100 MCQs)",
    total_stages: "CBT-1 (Screening), CBT-2 (Scoring), Typing/CBAT, Document Verification",
    total_questions: 100,
    total_marks: 100,
    time_duration: "90 Minutes (120 mins for PwD)",
    negative_marking: "1/3rd (0.33) mark deducted for each wrong answer",
    pattern: [
      { subject: "General Awareness", questions: 40, marks: 40, weightage_percent: 40 },
      { subject: "Mathematics (Quantitative)", questions: 30, marks: 30, weightage_percent: 30 },
      { subject: "General Intelligence & Reasoning", questions: 30, marks: 30, weightage_percent: 30 }
    ],
    subjects: [
      {
        subject_name: "General Awareness (Highest Weightage)",
        total_marks: 40,
        topics: [
          {
            topic_name: "General Science & Scientific Developments",
            subtopics: ["10th CBSE Science (Physics, Chemistry, Life Sciences)", "Nuclear Science & Space Research (ISRO/DRDO)", "Environmental Issues & Climate Conferences"],
            expected_questions: "15-18 Questions"
          },
          {
            topic_name: "Static GK & Railway History",
            subtopics: ["Indian Railways History & Zones", "Monuments and Places of India", "Indian Literature & Art", "United Nations & Global Bodies", "Computer Basics & Common Abbreviations"],
            expected_questions: "12-14 Questions"
          },
          {
            topic_name: "Current Affairs & Sports",
            subtopics: ["Current Events of National & International Importance", "Sports Tournaments & Medals", "Major Government Welfare Schemes", "Famous Personalities"],
            expected_questions: "10-12 Questions"
          }
        ]
      },
      {
        subject_name: "Mathematics",
        total_marks: 30,
        topics: [
          {
            topic_name: "Arithmetic Fundamentals",
            subtopics: ["Number System, Decimals & Fractions", "LCM and HCF", "Ratio & Proportions", "Percentages", "Mensuration (Area & Volume)", "Time and Work", "Time and Distance"],
            expected_questions: "18-20 Questions"
          },
          {
            topic_name: "Algebra, Geometry & Statistics",
            subtopics: ["Simple and Compound Interest", "Profit and Loss", "Elementary Algebra", "Geometry and Trigonometry", "Elementary Statistics (Mean, Median, Mode)"],
            expected_questions: "10-12 Questions"
          }
        ]
      },
      {
        subject_name: "General Intelligence & Reasoning",
        total_marks: 30,
        topics: [
          {
            topic_name: "Logical & Analytical Reasoning",
            subtopics: ["Analogies & Completion of Number and Alphabetical Series", "Coding and Decoding", "Mathematical Operations", "Similarities and Differences", "Relationships & Blood Relations"],
            expected_questions: "16-18 Questions"
          },
          {
            topic_name: "Critical Reasoning & Data Evaluation",
            subtopics: ["Analytical Reasoning & Syllogism", "Jumbling & Venn Diagrams", "Puzzle & Data Sufficiency", "Statement-Conclusion & Statement-Courses of Action", "Decision Making & Maps"],
            expected_questions: "12-14 Questions"
          }
        ]
      }
    ],
    preparation_tips: [
      "Prioritize General Awareness as it carries 40% weightage in CBT-1.",
      "Focus heavily on NCERT 9th & 10th science concepts for direct physics and biology questions.",
      "Practice solving 100 questions in 75 minutes to leave 15 minutes for review."
    ]
  },
  "ibps-rrb-crp-xv-recruitment-2026": {
    exam_title: "IBPS RRB CRP-XV Preliminary Examination",
    mode_of_exam: "Online Computer Based Test (CBT)",
    total_stages: "Preliminary Exam, Main Exam, Language Proficiency Test / Interview",
    total_questions: 80,
    total_marks: 80,
    time_duration: "Composite time of 45 Minutes",
    negative_marking: "0.25 (1/4th) mark penalty for incorrect answers",
    pattern: [
      { subject: "Reasoning Ability", questions: 40, marks: 40, weightage_percent: 50 },
      { subject: "Quantitative Aptitude / Numerical Ability", questions: 40, marks: 40, weightage_percent: 50 }
    ],
    subjects: [
      {
        subject_name: "Reasoning Ability",
        total_marks: 40,
        topics: [
          {
            topic_name: "Puzzles & Seating Arrangements",
            subtopics: ["Linear Row (Facing North/South)", "Circular & Square Table Arrangements", "Floor & Flat Puzzles", "Box Puzzles & Day/Month Based Scheduling"],
            expected_questions: "20-22 Questions"
          },
          {
            topic_name: "Miscellaneous Reasoning",
            subtopics: ["Inequalities (Direct & Coded)", "Syllogism (Only a few cases)", "Alpha-Numeric-Symbol Series", "Blood Relations", "Distance & Direction", "Order & Ranking"],
            expected_questions: "18-20 Questions"
          }
        ]
      },
      {
        subject_name: "Quantitative Aptitude",
        total_marks: 40,
        topics: [
          {
            topic_name: "Speed Math & Calculation",
            subtopics: ["Simplification & Approximation (10-15 Qs)", "Missing & Wrong Number Series (5 Qs)", "Quadratic Equations Comparison (5 Qs)"],
            expected_questions: "20-25 Questions"
          },
          {
            topic_name: "Data Interpretation (DI)",
            subtopics: ["Table Chart DI", "Bar Graph & Line Graph DI", "Pie Chart & Caselet DI"],
            expected_questions: "10-12 Questions"
          },
          {
            topic_name: "Arithmetic Word Problems",
            subtopics: ["Ages, Partnership, Profit & Loss", "Time & Work, Pipes & Cisterns", "Speed, Boats & Streams, Mensuration"],
            expected_questions: "8-10 Questions"
          }
        ]
      }
    ],
    preparation_tips: [
      "Master speed math tricks to solve 15 simplification questions in under 4 minutes.",
      "Clear sectional cut-offs in both sections are compulsory for qualification.",
      "Attempt mock tests with composite 45-minute timer to master time balance."
    ]
  },
  "delhi-police-constable-recruitment-2026": {
    exam_title: "Delhi Police Constable (Executive) Computer Based Examination",
    mode_of_exam: "Online Computer Based Examination (100 Questions)",
    total_stages: "CBT (100 Marks), PE&MT (Qualifying), Medical Examination",
    total_questions: 100,
    total_marks: 100,
    time_duration: "90 Minutes",
    negative_marking: "0.25 mark deduction for each incorrect answer",
    pattern: [
      { subject: "General Knowledge / Current Affairs", questions: 50, marks: 50, weightage_percent: 50 },
      { subject: "Reasoning Ability", questions: 25, marks: 25, weightage_percent: 25 },
      { subject: "Numerical Ability (Mathematics)", questions: 15, marks: 15, weightage_percent: 15 },
      { subject: "Computer Fundamentals (MS Word/Excel)", questions: 10, marks: 10, weightage_percent: 10 }
    ],
    subjects: [
      {
        subject_name: "General Knowledge / Current Affairs (50% Weightage)",
        total_marks: 50,
        topics: [
          {
            topic_name: "Indian Heritage & Constitution",
            subtopics: ["Indian Constitution, Fundamental Rights, Articles", "Indian History & Culture", "Geography, Indian Economy & Banking Basics"],
            expected_questions: "25-30 Questions"
          },
          {
            topic_name: "Science & Daily Current Events",
            subtopics: ["Everyday Science, Physics & Health", "National Current Events, Sports, Awards, Schemes"],
            expected_questions: "20-25 Questions"
          }
        ]
      },
      {
        subject_name: "Reasoning & Numerical Ability",
        total_marks: 40,
        topics: [
          {
            topic_name: "Reasoning (25 Marks)",
            subtopics: ["Non-Verbal Figures, Series, Coding-Decoding, Venn Diagrams, Spatial Visualization, Analogies"],
            expected_questions: "25 Questions"
          },
          {
            topic_name: "Numerical Ability (15 Marks)",
            subtopics: ["Decimals, Fractions, Percentages, Ratio, Average, Interest, Profit & Loss, Discount, Mensuration, Time & Distance"],
            expected_questions: "15 Questions"
          }
        ]
      },
      {
        subject_name: "Computer Fundamentals",
        total_marks: 10,
        topics: [
          {
            topic_name: "MS Office & Internet Basics",
            subtopics: ["Elements of Word Processing (Word Basics, Editing, Formatting)", "MS Excel (Spreadsheets, Formulas, Cell Editing)", "Communication & Internet (Email, WWW, Web Browsers, Search Engines)"],
            expected_questions: "10 Questions"
          }
        ]
      }
    ],
    preparation_tips: [
      "GK carries 50 marks alone: Allocate 50% of your daily study schedule to static GK and current affairs.",
      "Computer section is scoring: Practice MS Excel shortcuts and basic internet terminology to score 9-10 marks.",
      "Maintain physical fitness simultaneously for 1600m race and high/long jumps."
    ]
  }
};

/**
 * Intelligent Fallback Generator for any other Government Job
 */
export function getJobSyllabus(slug: string, field: string, postName: string): JobSyllabusData {
  if (SPECIFIC_JOB_SYLLABUS[slug]) {
    return SPECIFIC_JOB_SYLLABUS[slug];
  }

  const normalizedField = (field || "").toLowerCase();

  if (normalizedField.includes("bank") || normalizedField.includes("finance")) {
    return {
      exam_title: `${postName} Preliminary & Main Examination Pattern`,
      mode_of_exam: "Online Computer Based Objective Examination",
      total_stages: "Phase-I Preliminary Exam, Phase-II Mains Exam, Interview",
      total_questions: 100,
      total_marks: 100,
      time_duration: "60 Minutes (Sectional timing applicable)",
      negative_marking: "1/4th (0.25) mark penalty for incorrect responses",
      pattern: [
        { subject: "Reasoning Ability", questions: 35, marks: 35, weightage_percent: 35 },
        { subject: "Quantitative Aptitude", questions: 35, marks: 35, weightage_percent: 35 },
        { subject: "English Language", questions: 30, marks: 30, weightage_percent: 30 }
      ],
      subjects: [
        {
          subject_name: "Reasoning Ability",
          total_marks: 35,
          topics: [
            {
              topic_name: "Analytical & Logical Puzzles",
              subtopics: ["Box & Floor Puzzles", "Circular & Linear Seating Arrangements", "Syllogisms", "Inequalities", "Coding-Decoding"],
              expected_questions: "18-20 Questions"
            }
          ]
        },
        {
          subject_name: "Quantitative Aptitude",
          total_marks: 35,
          topics: [
            {
              topic_name: "Calculations & Data Interpretation",
              subtopics: ["Simplification / Approximation", "Number Series", "Quadratic Equations", "Bar & Tabular Data Interpretation"],
              expected_questions: "20-22 Questions"
            }
          ]
        },
        {
          subject_name: "English Language",
          total_marks: 30,
          topics: [
            {
              topic_name: "Grammar & Reading Comprehension",
              subtopics: ["Reading Comprehension Passage", "Cloze Test", "Error Detection", "Sentence Rearrangement", "Vocabulary & Idioms"],
              expected_questions: "15-20 Questions"
            }
          ]
        }
      ],
      preparation_tips: [
        "Focus on speed math and high-speed table mental calculations.",
        "Practice at least 3 varied puzzles daily to master seating arrangement variations."
      ]
    };
  }

  if (normalizedField.includes("railway") || normalizedField.includes("ssc") || normalizedField.includes("police")) {
    return {
      exam_title: `${postName} Official Examination Pattern`,
      mode_of_exam: "Computer Based Test (Objective MCQs)",
      total_stages: "Written Examination / CBT followed by Document Verification & Physical/Skill test",
      total_questions: 100,
      total_marks: 100,
      time_duration: "90 Minutes",
      negative_marking: "0.25 to 0.33 marks deducted per incorrect answer",
      pattern: [
        { subject: "General Awareness & Current Affairs", questions: 35, marks: 35, weightage_percent: 35 },
        { subject: "General Intelligence & Reasoning", questions: 30, marks: 30, weightage_percent: 30 },
        { subject: "Mathematics / Numerical Ability", questions: 25, marks: 25, weightage_percent: 25 },
        { subject: "General English / Language", questions: 10, marks: 10, weightage_percent: 10 }
      ],
      subjects: [
        {
          subject_name: "General Awareness & Science",
          total_marks: 35,
          topics: [
            {
              topic_name: "Core Subjects & Current Events",
              subtopics: ["Indian History & Constitution", "Indian & World Geography", "General Science (Physics, Chemistry, Biology)", "Current Affairs (National/International)"],
              expected_questions: "20-25 Questions"
            }
          ]
        },
        {
          subject_name: "General Intelligence & Reasoning",
          total_marks: 30,
          topics: [
            {
              topic_name: "Verbal & Non-Verbal Logic",
              subtopics: ["Analogies, Series & Classification", "Blood Relations & Direction Sense", "Venn Diagrams & Syllogism", "Mirror Images & Figure Completion"],
              expected_questions: "15-18 Questions"
            }
          ]
        },
        {
          subject_name: "Mathematics",
          total_marks: 25,
          topics: [
            {
              topic_name: "Arithmetic & Mensuration",
              subtopics: ["Percentages, Profit & Loss", "Simple & Compound Interest", "Time, Speed & Distance", "Mensuration 2D/3D & Data Interpretation"],
              expected_questions: "12-15 Questions"
            }
          ]
        }
      ],
      preparation_tips: [
        "Revise standard NCERT textbooks for basic science and static general knowledge.",
        "Take weekly full-length mock tests under real exam timing conditions."
      ]
    };
  }

  // Default General Government Exam Syllabus
  return {
    exam_title: `${postName} Comprehensive Examination Syllabus`,
    mode_of_exam: "Written Examination / Computer Based Test",
    total_stages: "Stage 1 (Written Exam / CBT), Stage 2 (Skill Test / Interview), Document Verification",
    total_questions: 100,
    total_marks: 100,
    time_duration: "120 Minutes",
    negative_marking: "1/4th (0.25) mark deduction for each incorrect answer",
    pattern: [
      { subject: "General Knowledge & Current Affairs", questions: 30, marks: 30, weightage_percent: 30 },
      { subject: "Reasoning & Mental Ability", questions: 25, marks: 25, weightage_percent: 25 },
      { subject: "Quantitative Aptitude & Mathematics", questions: 25, marks: 25, weightage_percent: 25 },
      { subject: "General Language (English/Hindi)", questions: 20, marks: 20, weightage_percent: 20 }
    ],
    subjects: [
      {
        subject_name: "General Knowledge & Studies",
        total_marks: 30,
        topics: [
          {
            topic_name: "Static GK & National Affairs",
            subtopics: ["Indian Polity & Constitution", "Indian History & Freedom Struggle", "Indian Geography & Economy", "Environmental Science & Everyday Ecology"],
            expected_questions: "15-20 Questions"
          }
        ]
      },
      {
        subject_name: "Reasoning & Aptitude",
        total_marks: 50,
        topics: [
          {
            topic_name: "Logical Reasoning & Numerical Skill",
            subtopics: ["Number & Alphabet Series", "Coding-Decoding & Directions", "Basic Percentages & Ratios", "Time & Work, Simple Interest, Profit & Loss"],
            expected_questions: "25-30 Questions"
          }
        ]
      },
      {
        subject_name: "Language Comprehension",
        total_marks: 20,
        topics: [
          {
            topic_name: "Grammar & Reading",
            subtopics: ["Reading Comprehension", "Vocabulary, Synonyms & Antonyms", "Sentence Correction & Grammar Rules"],
            expected_questions: "10-15 Questions"
          }
        ]
      }
    ],
    preparation_tips: [
      "Review the official notification PDF for any post-specific trade or technical subject syllabus.",
      "Solve previous recruitment question papers to understand question distribution and time allocation."
    ]
  };
}

