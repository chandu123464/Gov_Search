import { QualificationLevel } from "./types";

// Education levels hierarchy ranking
const HIERARCHY_LEVELS: Record<string, number> = {
  "8TH": 1,
  "10TH": 2,
  "12TH": 3,
  "ITI": 4,
  "DIPLOMA": 4,
  "ANY GRADUATE": 5,
  "BA": 5,
  "B.SC": 5,
  "B.COM": 5,
  "BBA": 5,
  "BCA": 5,
  "BSW": 5,
  "LLB": 5,
  "B.TECH/B.E": 5,
  "ENGINEERING": 5,
  "B.PHARM": 5,
  "PHARMACY": 5,
  "NURSING": 5,
  "MEDICAL": 5,
  "ANY POST GRADUATE": 6,
  "MA": 6,
  "M.SC": 6,
  "MBA": 6,
  "MSW": 6,
  "OTHER": 0,
};

// All graduate degrees
export const GRADUATE_DEGREES = [
  "B.TECH/B.E",
  "B.COM",
  "BBA",
  "BCA",
  "B.SC",
  "BA",
  "BSW",
  "B.PHARM",
  "LLB",
  "ENGINEERING",
  "MEDICAL",
  "NURSING",
  "PHARMACY",
  "ANY GRADUATE",
];

// All post-graduate degrees
export const POST_GRADUATE_DEGREES = [
  "MBA",
  "MSW",
  "M.SC",
  "MA",
  "ANY POST GRADUATE",
];

// Specific professional disciplines that cannot be substituted by general degrees
const SPECIALIZED_FIELDS: Record<string, string[]> = {
  "B.TECH/B.E": ["B.TECH/B.E", "ENGINEERING"],
  "ENGINEERING": ["B.TECH/B.E", "ENGINEERING"],
  "MEDICAL": ["MEDICAL"],
  "NURSING": ["NURSING"],
  "B.PHARM": ["B.PHARM", "PHARMACY"],
  "PHARMACY": ["B.PHARM", "PHARMACY"],
  "LLB": ["LLB"],
  "ITI": ["ITI"],
};

/**
 * Determines whether a job requiring `jobLevel` is eligible for a candidate with `userQualification`.
 */
export function isUserEligibleForJob(
  job: {
    qualification_level: string;
    exact_qual_required?: boolean;
    specific_discipline?: string | null;
  },
  userQualification: string
): boolean {
  const normUser = userQualification.trim().toUpperCase();
  const normJob = job.qualification_level.trim().toUpperCase();

  // 1. Direct match
  if (normUser === normJob) return true;

  // 2. If the job specifically demands "ANY GRADUATE"
  if (normJob === "ANY GRADUATE") {
    // Any candidate with a Graduate or Post-Graduate degree is eligible
    if (GRADUATE_DEGREES.includes(normUser) || POST_GRADUATE_DEGREES.includes(normUser)) {
      return true;
    }
  }

  // 3. If the job specifically demands "ANY POST GRADUATE"
  if (normJob === "ANY POST GRADUATE") {
    if (POST_GRADUATE_DEGREES.includes(normUser)) {
      return true;
    }
  }

  // 4. If the candidate says "ANY GRADUATE"
  if (normUser === "ANY GRADUATE") {
    // Can view general Graduate jobs and lower basic jobs (12th, 10th, 8th) if not strictly restricted
    if (normJob === "ANY GRADUATE" || normJob === "GRADUATE") return true;
    if (!job.exact_qual_required && ["8TH", "10TH", "12TH"].includes(normJob)) return true;
  }

  // 5. If the candidate says "ANY POST GRADUATE"
  if (normUser === "ANY POST GRADUATE") {
    if (normJob === "ANY POST GRADUATE" || normJob === "ANY GRADUATE") return true;
    if (!job.exact_qual_required && ["8TH", "10TH", "12TH"].includes(normJob)) return true;
  }

  // 6. If the job requires an exact specialized qualification (e.g. B.Sc Nursing, B.Pharm, ITI)
  if (job.exact_qual_required) {
    return normJob === normUser;
  }

  // 7. Check specialized discipline restrictions
  const requiredSpecialties = SPECIALIZED_FIELDS[normJob];
  if (requiredSpecialties && !requiredSpecialties.includes(normUser)) {
    // If the job requires Engineering or Nursing, a BA/B.Com graduate is not eligible
    return false;
  }

  // 8. General Hierarchy Check:
  // If candidate has a higher general qualification, they can apply for basic lower posts (8th, 10th, 12th)
  const userRank = HIERARCHY_LEVELS[normUser] || 0;
  const jobRank = HIERARCHY_LEVELS[normJob] || 0;

  if (jobRank > 0 && userRank >= jobRank) {
    // Allow basic qualifications to be satisfied by higher education
    if (["8TH", "10TH", "12TH"].includes(normJob)) {
      return true;
    }
    // Allow Post Graduate to apply for general Graduate jobs
    if (normJob === "ANY GRADUATE" && POST_GRADUATE_DEGREES.includes(normUser)) {
      return true;
    }
  }

  return false;
}

/**
 * Builds the database Prisma query condition for qualification filtering.
 * When the user selects a qualification tab/filter:
 * e.g., "12TH" -> fetches jobs that are targeted at 12th or accept 12th candidates.
 */
export function getPrismaQualificationFilter(selectedQual: string) {
  const norm = selectedQual.trim().toUpperCase();

  // If user selected "ANY GRADUATE" or "GRADUATE"
  if (norm === "ANY GRADUATE" || norm === "GRADUATE") {
    return {
      OR: [
        { qualification_level: "ANY GRADUATE" },
        { qualification_level: { in: GRADUATE_DEGREES } },
        { qualification_level: { in: ["8TH", "10TH", "12TH"] }, exact_qual_required: false },
      ],
    };
  }

  // If user selected "ANY POST GRADUATE"
  if (norm === "ANY POST GRADUATE") {
    return {
      OR: [
        { qualification_level: "ANY POST GRADUATE" },
        { qualification_level: { in: POST_GRADUATE_DEGREES } },
        { qualification_level: "ANY GRADUATE" },
        { qualification_level: { in: ["8TH", "10TH", "12TH"] }, exact_qual_required: false },
      ],
    };
  }

  // If user selected "10TH"
  if (norm === "10TH") {
    return {
      OR: [
        { qualification_level: "10TH" },
        { qualification_level: "8TH", exact_qual_required: false },
      ],
    };
  }

  // If user selected "12TH"
  if (norm === "12TH") {
    return {
      OR: [
        { qualification_level: "12TH" },
        { qualification_level: { in: ["8TH", "10TH"] }, exact_qual_required: false },
      ],
    };
  }

  // If user selected "8TH"
  if (norm === "8TH") {
    return {
      qualification_level: "8TH",
    };
  }

  // If user selected a specific Graduate degree (e.g. B.Tech, B.Com, B.Sc, BA, etc.)
  if (GRADUATE_DEGREES.includes(norm)) {
    return {
      OR: [
        { qualification_level: norm },
        { qualification_level: "ANY GRADUATE" },
        { qualification_level: { in: ["8TH", "10TH", "12TH"] }, exact_qual_required: false },
      ],
    };
  }

  // If user selected a specific Post-Graduate degree (e.g. MBA, MSW, M.Sc, MA)
  if (POST_GRADUATE_DEGREES.includes(norm)) {
    return {
      OR: [
        { qualification_level: norm },
        { qualification_level: "ANY POST GRADUATE" },
        { qualification_level: "ANY GRADUATE" },
        { qualification_level: { in: ["8TH", "10TH", "12TH"] }, exact_qual_required: false },
      ],
    };
  }

  // Default fallback
  return {
    qualification_level: { contains: norm },
  };
}

