export type BlogArticle = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "ssc-chsl-2026-tier1-strategy",
    title: "How to Prepare for SSC CHSL 2026: Tier-1 Strategy & Topic Weightage",
    category: "SSC Preparation",
    date: "18 Sep 2026",
    readTime: "5 min read",
    summary:
      "Comprehensive guide to mastering Quantitative Aptitude, General Intelligence, English Language, and General Awareness for SSC CHSL.",
    content: [
      "SSC CHSL Tier-1 is a computer-based test of 100 questions in 60 minutes. Each section carries 25 questions.",
      "Quantitative Aptitude: prioritise arithmetic (percentage, ratio, time and work, SI/CI) before advanced maths. Keep a daily 20-question speed drill.",
      "General Intelligence: practise series, coding-decoding, and figure-based questions with a timer. Accuracy matters more than attempting all 25.",
      "English: one reading comprehension plus error spotting and fill-in-the-blanks. Revise one grammar rule set every day.",
      "General Awareness: last 6 months current affairs, static polity, and basic science. Use monthly PDFs rather than random videos.",
      "In the last 30 days, take a full mock every alternate day and log weak chapters. Apply only through ssc.gov.in.",
    ],
  },
  {
    slug: "railway-group-d-2026-cbt-pet",
    title: "Railway Group D 2026 Recruitment: Important Changes in CBT & Physical Tests",
    category: "Railway Exams",
    date: "15 Sep 2026",
    readTime: "4 min read",
    summary:
      "Understand the updated CBT marking scheme, normalized scoring formula, and PET requirements for Group D posts.",
    content: [
      "RRB Group D CBT is typically 100 questions covering maths, reasoning, general science, and current affairs.",
      "Normalisation is applied across shifts. A harder shift can raise your normalised score, so do not panic after an unusual paper.",
      "PET/PST is qualifying. Practise running and weight-lifting as published in the official CEN. Medical standards differ by post.",
      "Keep 10th certificate, ITI (if any), and photo ID ready before the application window. Servers slow down in the last 48 hours.",
      "Track city intimation and admit card on the regional RRB website listed on the notification.",
    ],
  },
  {
    slug: "10th-12th-pass-high-pay-govt-jobs-2026",
    title: "10th & 12th Pass Government Jobs with High Pay Scales in 2026",
    category: "Career Guidance",
    date: "12 Sep 2026",
    readTime: "6 min read",
    summary:
      "Stable government careers available after Matriculation and Intermediate with 7th Pay Commission pay bands.",
    content: [
      "12th pass candidates can target SSC CHSL (LDC/JSA/DEO), railway commercial posts, and several state police constable exams.",
      "10th pass candidates can target railway Group D, postal GDS, and many state municipal / forest posts. Check exact_qual_required on each notice.",
      "Pay Level 1–3 under the 7th CPC typically starts near ₹18,000–₹21,700 plus DA, HRA, and travel allowance.",
      "Filter GovSearch by education, then save the closing-soon list and add calendar reminders. Never pay a middleman for a government form.",
    ],
  },
];

export function getArticle(slug: string) {
  return BLOG_ARTICLES.find((a) => a.slug === slug) || null;
}
