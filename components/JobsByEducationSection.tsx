"use client";

import React from "react";
import { 
  GraduationCap, 
  ArrowRight, 
  School, 
  BookOpen, 
  Book, 
  Wrench, 
  FileText, 
  Settings, 
  BarChart3, 
  Users, 
  Laptop, 
  FlaskConical, 
  Scale, 
  Award, 
  Stethoscope, 
  PlusCircle, 
  Pill, 
  Check 
} from "lucide-react";

interface Props {
  counts?: Record<string, number>;
  selectedQual?: string;
  onSelect?: (qualId: string) => void;
  isWizardMode?: boolean;
  linkMode?: boolean;
}

interface EducationCardItem {
  id: string;
  label: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  bgClass: string;
  textClass: string;
  borderClass: string;
  hoverBorderClass: string;
  selectedRingClass: string;
}

const EDUCATION_ITEMS: EducationCardItem[] = [
  {
    id: "8TH",
    label: "8TH",
    slug: "8th",
    icon: School,
    bgClass: "bg-[#EFF6FF]",
    textClass: "text-[#1E40AF]",
    borderClass: "border-[#DBEAFE]",
    hoverBorderClass: "hover:border-blue-400",
    selectedRingClass: "ring-2 ring-blue-600 bg-blue-100",
  },
  {
    id: "10TH",
    label: "10TH",
    slug: "10th",
    icon: BookOpen,
    bgClass: "bg-[#ECFDF5]",
    textClass: "text-[#047857]",
    borderClass: "border-[#D1FAE5]",
    hoverBorderClass: "hover:border-emerald-400",
    selectedRingClass: "ring-2 ring-emerald-600 bg-emerald-100",
  },
  {
    id: "12TH",
    label: "12TH",
    slug: "12th",
    icon: Book,
    bgClass: "bg-[#FFF1F2]",
    textClass: "text-[#BE123C]",
    borderClass: "border-[#FFE4E6]",
    hoverBorderClass: "hover:border-rose-400",
    selectedRingClass: "ring-2 ring-rose-600 bg-rose-100",
  },
  {
    id: "ITI",
    label: "ITI",
    slug: "iti",
    icon: Wrench,
    bgClass: "bg-[#FAF5FF]",
    textClass: "text-[#7E22CE]",
    borderClass: "border-[#F3E8FF]",
    hoverBorderClass: "hover:border-purple-400",
    selectedRingClass: "ring-2 ring-purple-600 bg-purple-100",
  },
  {
    id: "DIPLOMA",
    label: "Diploma",
    slug: "diploma",
    icon: FileText,
    bgClass: "bg-[#FFFBEB]",
    textClass: "text-[#B45309]",
    borderClass: "border-[#FEF3C7]",
    hoverBorderClass: "hover:border-amber-400",
    selectedRingClass: "ring-2 ring-amber-600 bg-amber-100",
  },
  {
    id: "B.TECH/B.E",
    label: "B.Tech/B.E",
    slug: "btech",
    icon: Settings,
    bgClass: "bg-[#F0F9FF]",
    textClass: "text-[#0369A1]",
    borderClass: "border-[#E0F2FE]",
    hoverBorderClass: "hover:border-sky-400",
    selectedRingClass: "ring-2 ring-sky-600 bg-sky-100",
  },
  {
    id: "B.COM",
    label: "B.Com",
    slug: "bcom",
    icon: BarChart3,
    bgClass: "bg-[#F0FDF4]",
    textClass: "text-[#15803D]",
    borderClass: "border-[#DCFCE7]",
    hoverBorderClass: "hover:border-emerald-400",
    selectedRingClass: "ring-2 ring-emerald-600 bg-emerald-100",
  },
  {
    id: "BBA",
    label: "BBA",
    slug: "bba",
    icon: Users,
    bgClass: "bg-[#FFF1F2]",
    textClass: "text-[#BE123C]",
    borderClass: "border-[#FFE4E6]",
    hoverBorderClass: "hover:border-rose-400",
    selectedRingClass: "ring-2 ring-rose-600 bg-rose-100",
  },
  {
    id: "BCA",
    label: "BCA",
    slug: "bca",
    icon: Laptop,
    bgClass: "bg-[#F5F3FF]",
    textClass: "text-[#6D28D9]",
    borderClass: "border-[#EDE9FE]",
    hoverBorderClass: "hover:border-indigo-400",
    selectedRingClass: "ring-2 ring-indigo-600 bg-indigo-100",
  },
  {
    id: "B.SC",
    label: "B.Sc",
    slug: "bsc",
    icon: FlaskConical,
    bgClass: "bg-[#ECFEFF]",
    textClass: "text-[#0E7490]",
    borderClass: "border-[#CFFAFE]",
    hoverBorderClass: "hover:border-cyan-400",
    selectedRingClass: "ring-2 ring-cyan-600 bg-cyan-100",
  },
  {
    id: "BA",
    label: "BA",
    slug: "ba",
    icon: BookOpen,
    bgClass: "bg-[#FFF7ED]",
    textClass: "text-[#C2410C]",
    borderClass: "border-[#FFEDD5]",
    hoverBorderClass: "hover:border-orange-400",
    selectedRingClass: "ring-2 ring-orange-600 bg-orange-100",
  },
  {
    id: "BSW",
    label: "BSW",
    slug: "bsw",
    icon: Users,
    bgClass: "bg-[#F1F5F9]",
    textClass: "text-[#334155]",
    borderClass: "border-[#E2E8F0]",
    hoverBorderClass: "hover:border-slate-400",
    selectedRingClass: "ring-2 ring-slate-600 bg-slate-200",
  },
  {
    id: "B.PHARM",
    label: "B.Pharm",
    slug: "bpharm",
    icon: Pill,
    bgClass: "bg-[#F0FDF4]",
    textClass: "text-[#15803D]",
    borderClass: "border-[#DCFCE7]",
    hoverBorderClass: "hover:border-emerald-400",
    selectedRingClass: "ring-2 ring-emerald-600 bg-emerald-100",
  },
  {
    id: "LLB",
    label: "LLB",
    slug: "llb",
    icon: Scale,
    bgClass: "bg-[#FFF1F2]",
    textClass: "text-[#BE123C]",
    borderClass: "border-[#FFE4E6]",
    hoverBorderClass: "hover:border-rose-400",
    selectedRingClass: "ring-2 ring-rose-600 bg-rose-100",
  },
  {
    id: "MBA",
    label: "MBA",
    slug: "mba",
    icon: GraduationCap,
    bgClass: "bg-[#FAF5FF]",
    textClass: "text-[#7E22CE]",
    borderClass: "border-[#F3E8FF]",
    hoverBorderClass: "hover:border-purple-400",
    selectedRingClass: "ring-2 ring-purple-600 bg-purple-100",
  },
  {
    id: "MSW",
    label: "MSW",
    slug: "msw",
    icon: Users,
    bgClass: "bg-[#EFF6FF]",
    textClass: "text-[#1D4ED8]",
    borderClass: "border-[#DBEAFE]",
    hoverBorderClass: "hover:border-blue-400",
    selectedRingClass: "ring-2 ring-blue-600 bg-blue-100",
  },
  {
    id: "M.SC",
    label: "M.Sc",
    slug: "msc",
    icon: FlaskConical,
    bgClass: "bg-[#ECFDF5]",
    textClass: "text-[#047857]",
    borderClass: "border-[#D1FAE5]",
    hoverBorderClass: "hover:border-emerald-400",
    selectedRingClass: "ring-2 ring-emerald-600 bg-emerald-100",
  },
  {
    id: "MA",
    label: "MA",
    slug: "ma",
    icon: Book,
    bgClass: "bg-[#FFFBEB]",
    textClass: "text-[#B45309]",
    borderClass: "border-[#FEF3C7]",
    hoverBorderClass: "hover:border-amber-400",
    selectedRingClass: "ring-2 ring-amber-600 bg-amber-100",
  },
  {
    id: "ANY GRADUATE",
    label: "Any Graduate",
    slug: "graduate",
    icon: GraduationCap,
    bgClass: "bg-[#F0F9FF]",
    textClass: "text-[#0284C7]",
    borderClass: "border-[#E0F2FE]",
    hoverBorderClass: "hover:border-sky-400",
    selectedRingClass: "ring-2 ring-sky-600 bg-sky-100",
  },
  {
    id: "ANY POST GRADUATE",
    label: "Any Post Graduate",
    slug: "postgraduate",
    icon: Award,
    bgClass: "bg-[#FAF5FF]",
    textClass: "text-[#7C3AED]",
    borderClass: "border-[#F3E8FF]",
    hoverBorderClass: "hover:border-purple-400",
    selectedRingClass: "ring-2 ring-purple-600 bg-purple-100",
  },
  {
    id: "ENGINEERING",
    label: "Engineering",
    slug: "engineering",
    icon: Settings,
    bgClass: "bg-[#FEF3C7]",
    textClass: "text-[#B45309]",
    borderClass: "border-[#FDE68A]",
    hoverBorderClass: "hover:border-amber-400",
    selectedRingClass: "ring-2 ring-amber-600 bg-amber-100",
  },
  {
    id: "MEDICAL",
    label: "Medical",
    slug: "medical",
    icon: Stethoscope,
    bgClass: "bg-[#FFF1F2]",
    textClass: "text-[#E11D48]",
    borderClass: "border-[#FFE4E6]",
    hoverBorderClass: "hover:border-rose-400",
    selectedRingClass: "ring-2 ring-rose-600 bg-rose-100",
  },
  {
    id: "NURSING",
    label: "Nursing",
    slug: "nursing",
    icon: PlusCircle,
    bgClass: "bg-[#CCFBF1]",
    textClass: "text-[#0F766E]",
    borderClass: "border-[#99F6E4]",
    hoverBorderClass: "hover:border-teal-400",
    selectedRingClass: "ring-2 ring-teal-600 bg-teal-100",
  },
  {
    id: "PHARMACY",
    label: "Pharmacy",
    slug: "pharmacy",
    icon: Pill,
    bgClass: "bg-[#DCFCE7]",
    textClass: "text-[#16A34A]",
    borderClass: "border-[#BBF7D0]",
    hoverBorderClass: "hover:border-emerald-400",
    selectedRingClass: "ring-2 ring-emerald-600 bg-emerald-100",
  },
];

export default function JobsByEducationSection({
  counts = {},
  selectedQual,
  onSelect,
  isWizardMode = false,
  linkMode = false,
}: Props) {
  const normSelected = (selectedQual || "").trim().toUpperCase();

  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden my-6 p-6 sm:p-8">
      {/* Header matching HomePage.png */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Jobs by Education
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Select your qualification to find suitable government jobs
            </p>
          </div>
        </div>

        <a
          href="/government-jobs"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition group self-start sm:self-auto"
        >
          <span>Choose your education level and start your journey</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* 24 Qualification Cards Grid (6 Columns on desktop matching HomePage.png) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 pt-6">
        {EDUCATION_ITEMS.map((item) => {
          const isSelected =
            normSelected === item.id ||
            normSelected === item.label.toUpperCase() ||
            normSelected === `${item.id} PASS`;

          const IconComponent = item.icon;

          if (linkMode) {
            return (
              <a
                key={item.id}
                href={`/government-jobs/${item.slug}`}
                className={`relative flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-200 group ${
                  item.bgClass
                } ${item.borderClass} ${item.hoverBorderClass} hover:shadow-md hover:-translate-y-0.5 ${
                  isSelected ? item.selectedRingClass : ""
                }`}
              >
                <div className={`p-2 rounded-xl bg-white shadow-xs flex-shrink-0 ${item.textClass}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className={`text-xs sm:text-sm font-black truncate ${item.textClass}`}>
                  {item.label}
                </span>
                {isSelected && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect && onSelect(item.id)}
              className={`relative flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 group cursor-pointer ${
                item.bgClass
              } ${item.borderClass} ${item.hoverBorderClass} hover:shadow-md hover:-translate-y-0.5 ${
                isSelected ? item.selectedRingClass : ""
              }`}
            >
              <div className={`p-2 rounded-xl bg-white shadow-xs flex-shrink-0 ${item.textClass}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className={`text-xs sm:text-sm font-black truncate ${item.textClass}`}>
                {item.label}
              </span>
              {isSelected && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

