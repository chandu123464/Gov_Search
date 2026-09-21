export type QualificationLevel =
  | "8TH"
  | "10TH"
  | "12TH"
  | "ITI"
  | "DIPLOMA"
  | "B.TECH/B.E"
  | "B.COM"
  | "BBA"
  | "BCA"
  | "B.SC"
  | "BA"
  | "BSW"
  | "B.PHARM"
  | "LLB"
  | "MBA"
  | "MSW"
  | "M.SC"
  | "MA"
  | "ANY GRADUATE"
  | "ANY POST GRADUATE"
  | "ENGINEERING"
  | "MEDICAL"
  | "NURSING"
  | "PHARMACY"
  | "OTHER";

export const QUALIFICATION_LIST: { id: QualificationLevel; label: string; countHint?: number }[] = [
  { id: "10TH", label: "10th Pass" },
  { id: "8TH", label: "8th Pass" },
  { id: "12TH", label: "12th Pass" },
  { id: "DIPLOMA", label: "Diploma" },
  { id: "ITI", label: "ITI" },
  { id: "B.TECH/B.E", label: "B.Tech / B.E" },
  { id: "B.COM", label: "B.Com" },
  { id: "BBA", label: "BBA" },
  { id: "BCA", label: "BCA" },
  { id: "B.SC", label: "B.Sc" },
  { id: "BA", label: "BA" },
  { id: "BSW", label: "BSW" },
  { id: "B.PHARM", label: "B.Pharm" },
  { id: "LLB", label: "LLB" },
  { id: "MBA", label: "MBA" },
  { id: "MSW", label: "MSW" },
  { id: "M.SC", label: "M.Sc" },
  { id: "MA", label: "MA" },
  { id: "ANY GRADUATE", label: "Any Graduate" },
  { id: "ANY POST GRADUATE", label: "Any Post Graduate" },
  { id: "ENGINEERING", label: "Engineering" },
  { id: "MEDICAL", label: "Medical" },
  { id: "NURSING", label: "Nursing" },
  { id: "PHARMACY", label: "Pharmacy" },
  { id: "OTHER", label: "Other" },
];

export const GOVERNMENT_FIELDS = [
  "SSC",
  "Railway",
  "Banking",
  "Defence",
  "Police",
  "Postal",
  "Teaching",
  "UPSC",
  "State PSC",
  "Public Sector",
  "Central Government",
  "State Government",
  "Forest Department",
  "Healthcare",
  "Engineering",
  "Agriculture",
  "Judiciary",
  "Municipal Government",
  "Other",
] as const;

export type GovernmentField = (typeof GOVERNMENT_FIELDS)[number];

export const GOVERNMENT_LEVELS = [
  "Central Government",
  "State Government",
  "PSU",
  "Local Government",
  "Other",
] as const;

export type GovernmentLevel = (typeof GOVERNMENT_LEVELS)[number];

export const INDIAN_STATES = [
  "All India",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export type JobStatusCalculated = "OPEN" | "CLOSING SOON" | "CLOSED" | "UPCOMING";

export interface JobFilterParams {
  qualification?: string;
  field?: string;
  government_level?: string;
  state?: string;
  status?: string; // open, closing_soon, upcoming, closed
  search?: string;
  sort?: "latest" | "last_date" | "salary_desc" | "salary_asc" | "vacancies_desc";
  page?: number;
  limit?: number;
}
