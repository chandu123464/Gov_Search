import { isUserEligibleForJob, mapDisplayQualToLevel } from "./qualification-matching";

export type EligibilityUser = {
  qualification?: string;
  qualification_level?: string;
  dob?: string;
  gender?: string;
  category?: string;
  pwd?: boolean;
  state?: string;
};

export type EligibilityJob = {
  qualification_level: string;
  qualification?: string;
  exact_qual_required?: boolean;
  specific_discipline?: string | null;
  age_min?: number | null;
  age_max?: number | null;
  age_relaxation?: string | null;
  state?: string;
};

export type EligibilityResult = {
  eligible: boolean;
  score: number;
  ageYears: number | null;
  checks: {
    qualification: { pass: boolean; detail: string };
    age: { pass: boolean; detail: string };
    state: { pass: boolean; detail: string };
  };
  reasons: string[];
};

export function getAgeYears(dob?: string | null): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}

function relaxedMaxAge(job: EligibilityJob, user: EligibilityUser): number {
  const base = job.age_max ?? 35;
  const category = (user.category || "General").toUpperCase();
  let extra = 0;
  if (category === "SC" || category === "ST") extra += 5;
  else if (category === "OBC") extra += 3;
  if (user.pwd) extra += 10;
  const text = (job.age_relaxation || "").toUpperCase();
  if (text.includes("FEMALE") && (user.gender || "").toLowerCase() === "female") extra = Math.max(extra, 3);
  return base + extra;
}

export function evaluateEligibility(job: EligibilityJob, user: EligibilityUser): EligibilityResult {
  const reasons: string[] = [];
  const userLevel = user.qualification_level || mapDisplayQualToLevel(user.qualification || "");

  const qualPass = isUserEligibleForJob(
    {
      qualification_level: job.qualification_level,
      exact_qual_required: job.exact_qual_required,
      specific_discipline: job.specific_discipline,
    },
    userLevel
  );
  const qualDetail = qualPass
    ? `Your ${user.qualification || userLevel} meets ${job.qualification || job.qualification_level}.`
    : `This post needs ${job.qualification || job.qualification_level}. Your profile is ${user.qualification || userLevel}.`;
  if (!qualPass) reasons.push(qualDetail);

  const ageYears = getAgeYears(user.dob);
  const minAge = job.age_min ?? 18;
  const maxAge = relaxedMaxAge(job, user);
  let agePass = true;
  let ageDetail = "Add date of birth on your profile to check age eligibility.";
  if (ageYears !== null) {
    agePass = ageYears >= minAge && ageYears <= maxAge;
    ageDetail = agePass
      ? `Age ${ageYears} is within ${minAge}–${maxAge} years (category relaxation included).`
      : `Age ${ageYears} is outside ${minAge}–${maxAge} years for your category.`;
    if (!agePass) reasons.push(ageDetail);
  }

  const jobState = (job.state || "All India").trim();
  const userState = (user.state || "").trim();
  const statePass =
    !userState ||
    jobState.toLowerCase() === "all india" ||
    jobState.toLowerCase().includes(userState.toLowerCase()) ||
    userState.toLowerCase().includes(jobState.toLowerCase());
  const stateDetail = statePass
    ? `Open for ${jobState}.`
    : `This notification is listed for ${jobState}. Your state is ${userState}.`;
  if (!statePass) reasons.push(stateDetail);

  const eligible = qualPass && agePass && statePass;
  const score = (qualPass ? 50 : 0) + (agePass ? 30 : 0) + (statePass ? 20 : 0);

  return {
    eligible,
    score,
    ageYears,
    checks: {
      qualification: { pass: qualPass, detail: qualDetail },
      age: { pass: agePass, detail: ageDetail },
      state: { pass: statePass, detail: stateDetail },
    },
    reasons,
  };
}
