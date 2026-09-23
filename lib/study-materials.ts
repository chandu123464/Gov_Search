export interface StudyMaterial {
  id: string;
  title: string;
  topic: string;
  module: "Arithmetic" | "Advanced Maths" | "Reasoning";
  filename: string;
  sizeText: string;
  sizeBytes: number;
  description: string;
  recommendedFor: string[];
}

export const STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: "percentage",
    title: "Percentage - Complete Concepts, Shortcuts & Practice Questions",
    topic: "Percentage",
    module: "Arithmetic",
    filename: "PERCETAGE.pdf",
    sizeText: "6.8 MB",
    sizeBytes: 6764173,
    description: "Fundamental fraction-to-percentage conversion chart, net percentage change formula, successive changes, population and election questions.",
    recommendedFor: ["SSC CGL", "SSC CHSL", "RRB NTPC", "Banking IBPS/SBI"]
  },
  {
    id: "average",
    title: "Average - Formulae, Tricks & Solved Examples",
    topic: "Average",
    module: "Arithmetic",
    filename: "Average Notes.pdf",
    sizeText: "6.5 MB",
    sizeBytes: 6450513,
    description: "Average speed, batting/bowling averages, replacement of person, consecutive number properties, and weighted averages.",
    recommendedFor: ["SSC", "Railway Group D", "Bank PO", "State Police"]
  },
  {
    id: "compound-interest",
    title: "Compound Interest & Simple Interest - Fast Calculation Techniques",
    topic: "Compound Interest",
    module: "Arithmetic",
    filename: "Compound Interest.pdf",
    sizeText: "4.4 MB",
    sizeBytes: 4359316,
    description: "Tree method, CI-SI difference for 2 & 3 years, half-yearly and quarterly compounding, installment problems.",
    recommendedFor: ["SSC CGL", "Bank PO/Clerk", "RRB ALP", "State PSC"]
  },
  {
    id: "discount",
    title: "Discount, Marked Price & Profit/Loss Comprehensive Notes",
    topic: "Discount",
    module: "Arithmetic",
    filename: "DISCOUNT ALL QUESTION .pdf",
    sizeText: "3.8 MB",
    sizeBytes: 3788186,
    description: "Successive discounts, Buy X Get Y Free schemes, Marked price vs Cost price ratios, dishonest shopkeeper tricks.",
    recommendedFor: ["SSC", "Railway NTPC", "Banking", "Defence CDS"]
  },
  {
    id: "ages",
    title: "Problems on Ages - Step-by-Step Ratio & Linear Equations",
    topic: "Problems on Ages",
    module: "Arithmetic",
    filename: "Ages full Notes (1).pdf",
    sizeText: "1.0 MB",
    sizeBytes: 994762,
    description: "Ratio-based age questions, cross-multiplication method, past-present-future timelines for quick mental solving.",
    recommendedFor: ["All Central & State Exams", "SSC MTS", "Police Constable"]
  },
  {
    id: "partnership",
    title: "Partnership - Investment, Time Period & Profit Sharing",
    topic: "Partnership",
    module: "Arithmetic",
    filename: "Partnership Notes.pdf",
    sizeText: "6.7 MB",
    sizeBytes: 6740730,
    description: "Active vs sleeping partners, varying capital investments over different months, managerial salary adjustments.",
    recommendedFor: ["Banking Prelims/Mains", "SSC CGL", "RRB NTPC"]
  },
  {
    id: "time-and-work",
    title: "Time & Work - LCM Efficiency Method & Men-Women-Boys Formula",
    topic: "Time & Work",
    module: "Arithmetic",
    filename: "Time & Work.pdf",
    sizeText: "8.5 MB",
    sizeBytes: 8524032,
    description: "Unit work method, alternate day work, work leaving/joining before completion, MDH/W formula.",
    recommendedFor: ["SSC CGL/CHSL", "RRB Group D", "IBPS PO", "Defence"]
  },
  {
    id: "pipe-and-cistern",
    title: "Pipe and Cistern - Inlets, Outlets & Leakage Problems",
    topic: "Pipe and Cistern",
    module: "Arithmetic",
    filename: "Pipe and Cistern Notes.pdf",
    sizeText: "3.1 MB",
    sizeBytes: 3147835,
    description: "Positive vs negative capacity, emptying leaks, filling cisterns in alternate hours, multiple tap combinations.",
    recommendedFor: ["Railway RRB", "SSC", "Banking", "Delhi Police"]
  },
  {
    id: "time-speed-distance",
    title: "Time, Speed & Distance - Relative Speed & Ratio Method",
    topic: "Time & Distance",
    module: "Arithmetic",
    filename: "time and distance notes.pdf",
    sizeText: "8.7 MB",
    sizeBytes: 8696424,
    description: "Relative speed of two bodies, late/early arrival ratio formulas, circular tracks, police-thief chase problems.",
    recommendedFor: ["SSC CGL", "RRB NTPC", "Bank Clerk", "UPSC CSAT"]
  },
  {
    id: "trains-boats-streams",
    title: "Trains, Boats & Streams - Upstream & Downstream Full Notes",
    topic: "Trains & Boats",
    module: "Arithmetic",
    filename: "Train & Boat and Stream.pdf",
    sizeText: "2.6 MB",
    sizeBytes: 2649070,
    description: "Platform and pole crossing times, trains moving in opposite/same direction, river current & still water speed ratios.",
    recommendedFor: ["Railway RRB ALP/JE", "SSC CGL", "Police SI"]
  },
  {
    id: "lcm",
    title: "LCM Handwritten Notes - Properties & Word Problems",
    topic: "LCM",
    module: "Arithmetic",
    filename: "LCM Handwritten Notes.pdf",
    sizeText: "3.3 MB",
    sizeBytes: 3329706,
    description: "Remainder theorems with LCM, bells tolling together, circular path meeting times, fraction LCM shortcuts.",
    recommendedFor: ["SSC MTS/CHSL", "Railway Group D", "State PSC"]
  },
  {
    id: "hcf",
    title: "HCF Handwritten Notes - Long Division & Factorization Tricks",
    topic: "HCF",
    module: "Arithmetic",
    filename: "HCF Handwritten Notes.pdf",
    sizeText: "3.8 MB",
    sizeBytes: 3756881,
    description: "Greatest number dividing with same remainder, product of two numbers = LCM * HCF, coprime properties.",
    recommendedFor: ["SSC", "Railway", "Defence AFCAT/CDS", "Banking"]
  },
  {
    id: "algebra",
    title: "Algebra Master Notes - Algebraic Identities & Quadratic Equations",
    topic: "Algebra",
    module: "Advanced Maths",
    filename: "Algebra Notes.pdf",
    sizeText: "41.5 MB",
    sizeBytes: 41483936,
    description: "Special symmetry, value putting method, x + 1/x standard results, polynomial factorization, maxima & minima.",
    recommendedFor: ["SSC CGL Tier 1 & 2", "CDS", "RRB JE", "State PSC"]
  },
  {
    id: "geometry",
    title: "Geometry Handwritten Notes - Triangles, Circles, Quadrilaterals",
    topic: "Geometry",
    module: "Advanced Maths",
    filename: "Geometry Notes.pdf",
    sizeText: "19.1 MB",
    sizeBytes: 19115375,
    description: "Centroid/Incentre/Circumcentre/Orthocentre theorems, tangent-secant properties, cyclic quadrilaterals, Apollonius theorem.",
    recommendedFor: ["SSC CGL Tier 2", "CDS", "RRB NTPC CBT 2"]
  },
  {
    id: "mensuration",
    title: "Mensuration 2D & 3D - All Surface Area & Volume Formulae",
    topic: "Mensuration",
    module: "Advanced Maths",
    filename: "Mensuration Notes.pdf",
    sizeText: "11.3 MB",
    sizeBytes: 11327912,
    description: "2D perimeter and area for all polygons, 3D cylinder, cone, sphere, prism, pyramid, and frustum derivation with shortcuts.",
    recommendedFor: ["SSC CGL/CHSL", "RRB Group D & NTPC", "Defence"]
  },
  {
    id: "surds-indices",
    title: "Surds & Indices - Laws, Rationalization & Simplification",
    topic: "Surds & Indices",
    module: "Advanced Maths",
    filename: "surds & Indices Notes.pdf",
    sizeText: "3.8 MB",
    sizeBytes: 3807431,
    description: "Comparison of surds, square root of a binomial surd, rationalizing the denominator, infinite series radicals.",
    recommendedFor: ["SSC CGL", "Railway", "Banking Quantitative Aptitude"]
  },
  {
    id: "reasoning",
    title: "General Intelligence & Reasoning - Verbal & Non-Verbal Notes",
    topic: "Reasoning",
    module: "Reasoning",
    filename: "Reasoning Notes.pdf",
    sizeText: "15.3 MB",
    sizeBytes: 15287366,
    description: "Syllogism, Blood Relations, Direction Sense, Coding-Decoding, Seating Arrangement, Series, Mirror & Water images.",
    recommendedFor: ["All SSC Exams", "All Railway Exams", "Banking Reasoning", "Police Sub-Inspector"]
  }
];
