"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Check,
  ExternalLink,
  Sparkles,
  Layers,
  Table as TableIcon,
  LayoutGrid,
  Search,
  Filter
} from "lucide-react";
import { 
  EDUCATION_VACANCIES_DATA, 
  TOTAL_EDUCATION_VACANCIES, 
  EducationVacancyItem 
} from "@/lib/education-vacancies-data";

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
  { id: "8TH", label: "8TH", slug: "8th", icon: School, bgClass: "bg-[#EFF6FF]", textClass: "text-[#1E40AF]", borderClass: "border-[#DBEAFE]", hoverBorderClass: "hover:border-blue-400", selectedRingClass: "ring-2 ring-blue-600 bg-blue-100" },
  { id: "10TH", label: "10TH", slug: "10th", icon: BookOpen, bgClass: "bg-[#ECFDF5]", textClass: "text-[#047857]", borderClass: "border-[#D1FAE5]", hoverBorderClass: "hover:border-emerald-400", selectedRingClass: "ring-2 ring-emerald-600 bg-emerald-100" },
  { id: "12TH", label: "12TH", slug: "12th", icon: Book, bgClass: "bg-[#FFF1F2]", textClass: "text-[#BE123C]", borderClass: "border-[#FFE4E6]", hoverBorderClass: "hover:border-rose-400", selectedRingClass: "ring-2 ring-rose-600 bg-rose-100" },
  { id: "ITI", label: "ITI", slug: "iti", icon: Wrench, bgClass: "bg-[#FAF5FF]", textClass: "text-[#7E22CE]", borderClass: "border-[#F3E8FF]", hoverBorderClass: "hover:border-purple-400", selectedRingClass: "ring-2 ring-purple-600 bg-purple-100" },
  { id: "DIPLOMA", label: "Diploma", slug: "diploma", icon: FileText, bgClass: "bg-[#FFFBEB]", textClass: "text-[#B45309]", borderClass: "border-[#FEF3C7]", hoverBorderClass: "hover:border-amber-400", selectedRingClass: "ring-2 ring-amber-600 bg-amber-100" },
  { id: "B.TECH/B.E", label: "B.Tech/B.E", slug: "btech", icon: Settings, bgClass: "bg-[#F0F9FF]", textClass: "text-[#0369A1]", borderClass: "border-[#E0F2FE]", hoverBorderClass: "hover:border-sky-400", selectedRingClass: "ring-2 ring-sky-600 bg-sky-100" },
  { id: "B.COM", label: "B.Com", slug: "bcom", icon: BarChart3, bgClass: "bg-[#F0FDF4]", textClass: "text-[#15803D]", borderClass: "border-[#DCFCE7]", hoverBorderClass: "hover:border-emerald-400", selectedRingClass: "ring-2 ring-emerald-600 bg-emerald-100" },
  { id: "BBA", label: "BBA", slug: "bba", icon: Users, bgClass: "bg-[#FFF1F2]", textClass: "text-[#BE123C]", borderClass: "border-[#FFE4E6]", hoverBorderClass: "hover:border-rose-400", selectedRingClass: "ring-2 ring-rose-600 bg-rose-100" },
  { id: "BCA", label: "BCA", slug: "bca", icon: Laptop, bgClass: "bg-[#F5F3FF]", textClass: "text-[#6D28D9]", borderClass: "border-[#EDE9FE]", hoverBorderClass: "hover:border-indigo-400", selectedRingClass: "ring-2 ring-indigo-600 bg-indigo-100" },
  { id: "B.SC", label: "B.Sc", slug: "bsc", icon: FlaskConical, bgClass: "bg-[#ECFEFF]", textClass: "text-[#0E7490]", borderClass: "border-[#CFFAFE]", hoverBorderClass: "hover:border-cyan-400", selectedRingClass: "ring-2 ring-cyan-600 bg-cyan-100" },
  { id: "BA", label: "BA", slug: "ba", icon: BookOpen, bgClass: "bg-[#FFF7ED]", textClass: "text-[#C2410C]", borderClass: "border-[#FFEDD5]", hoverBorderClass: "hover:border-orange-400", selectedRingClass: "ring-2 ring-orange-600 bg-orange-100" },
  { id: "BSW", label: "BSW", slug: "bsw", icon: Users, bgClass: "bg-[#F1F5F9]", textClass: "text-[#334155]", borderClass: "border-[#E2E8F0]", hoverBorderClass: "hover:border-slate-400", selectedRingClass: "ring-2 ring-slate-600 bg-slate-200" },
  { id: "B.PHARM", label: "B.Pharm", slug: "bpharm", icon: Pill, bgClass: "bg-[#F0FDF4]", textClass: "text-[#15803D]", borderClass: "border-[#DCFCE7]", hoverBorderClass: "hover:border-emerald-400", selectedRingClass: "ring-2 ring-emerald-600 bg-emerald-100" },
  { id: "LLB", label: "LLB", slug: "llb", icon: Scale, bgClass: "bg-[#FFF1F2]", textClass: "text-[#BE123C]", borderClass: "border-[#FFE4E6]", hoverBorderClass: "hover:border-rose-400", selectedRingClass: "ring-2 ring-rose-600 bg-rose-100" },
  { id: "MBA", label: "MBA", slug: "mba", icon: GraduationCap, bgClass: "bg-[#FAF5FF]", textClass: "text-[#7E22CE]", borderClass: "border-[#F3E8FF]", hoverBorderClass: "hover:border-purple-400", selectedRingClass: "ring-2 ring-purple-600 bg-purple-100" },
  { id: "MSW", label: "MSW", slug: "msw", icon: Users, bgClass: "bg-[#EFF6FF]", textClass: "text-[#1D4ED8]", borderClass: "border-[#DBEAFE]", hoverBorderClass: "hover:border-blue-400", selectedRingClass: "ring-2 ring-blue-600 bg-blue-100" },
  { id: "M.SC", label: "M.Sc", slug: "msc", icon: FlaskConical, bgClass: "bg-[#ECFDF5]", textClass: "text-[#047857]", borderClass: "border-[#D1FAE5]", hoverBorderClass: "hover:border-emerald-400", selectedRingClass: "ring-2 ring-emerald-600 bg-emerald-100" },
  { id: "MA", label: "MA", slug: "ma", icon: Book, bgClass: "bg-[#FFFBEB]", textClass: "text-[#B45309]", borderClass: "border-[#FEF3C7]", hoverBorderClass: "hover:border-amber-400", selectedRingClass: "ring-2 ring-amber-600 bg-amber-100" },
  { id: "ANY GRADUATE", label: "Any Graduate", slug: "graduate", icon: GraduationCap, bgClass: "bg-[#F0F9FF]", textClass: "text-[#0284C7]", borderClass: "border-[#E0F2FE]", hoverBorderClass: "hover:border-sky-400", selectedRingClass: "ring-2 ring-sky-600 bg-sky-100" },
  { id: "ANY POST GRADUATE", label: "Any Post Graduate", slug: "postgraduate", icon: Award, bgClass: "bg-[#FAF5FF]", textClass: "text-[#7C3AED]", borderClass: "border-[#F3E8FF]", hoverBorderClass: "hover:border-purple-400", selectedRingClass: "ring-2 ring-purple-600 bg-purple-100" },
  { id: "ENGINEERING", label: "Engineering", slug: "engineering", icon: Settings, bgClass: "bg-[#FEF3C7]", textClass: "text-[#B45309]", borderClass: "border-[#FDE68A]", hoverBorderClass: "hover:border-amber-400", selectedRingClass: "ring-2 ring-amber-600 bg-amber-100" },
  { id: "MEDICAL", label: "Medical", slug: "medical", icon: Stethoscope, bgClass: "bg-[#FFF1F2]", textClass: "text-[#E11D48]", borderClass: "border-[#FFE4E6]", hoverBorderClass: "hover:border-rose-400", selectedRingClass: "ring-2 ring-rose-600 bg-rose-100" },
  { id: "NURSING", label: "Nursing", slug: "nursing", icon: PlusCircle, bgClass: "bg-[#CCFBF1]", textClass: "text-[#0F766E]", borderClass: "border-[#99F6E4]", hoverBorderClass: "hover:border-teal-400", selectedRingClass: "ring-2 ring-teal-600 bg-teal-100" },
  { id: "PHARMACY", label: "Pharmacy", slug: "pharmacy", icon: Pill, bgClass: "bg-[#DCFCE7]", textClass: "text-[#16A34A]", borderClass: "border-[#BBF7D0]", hoverBorderClass: "hover:border-emerald-400", selectedRingClass: "ring-2 ring-emerald-600 bg-emerald-100" },
];

export default function JobsByEducationSection({
  counts = {},
  selectedQual,
  onSelect,
  isWizardMode = false,
  linkMode = false,
}: Props) {
  const normSelected = (selectedQual || "").trim().toUpperCase();
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [tableSearch, setTableSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("All");

  const filteredTableData = EDUCATION_VACANCIES_DATA.filter((item) => {
    const matchTier = tierFilter === "All" || item.level === tierFilter;
    const q = tableSearch.toLowerCase().trim();
    const matchSearch =
      !q ||
      item.education.toLowerCase().includes(q) ||
      item.vacancies.toLowerCase().includes(q) ||
      item.label.toLowerCase().includes(q) ||
      item.popularExams.some((e) => e.toLowerCase().includes(q));
    return matchTier && matchSearch;
  });

  const handleSelectQual = (qualId: string) => {
    if (onSelect) {
      onSelect(qualId);
    }
  };

  return (
    <section id="jobs-by-education" className="w-full bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden my-6 p-6 sm:p-8 space-y-6 scroll-mt-20">
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Education Wise Govt Job Vacancies 2026
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                {TOTAL_EDUCATION_VACANCIES.toLocaleString("en-IN")} Total Vacancies
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Explore government employment opportunities categorized by academic qualification &bull; 10th, 12th, ITI, Diploma, Degrees &amp; Post Graduates
            </p>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === "table"
                  ? "bg-white text-blue-700 shadow-xs font-black"
                  : "hover:text-slate-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table View (FreeJobAlert)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === "cards"
                  ? "bg-white text-blue-700 shadow-xs font-black"
                  : "hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Official "Education Wise Govt Job Vacancies 2026" Table View */}
      {viewMode === "table" && (
        <div className="space-y-4">
          {/* Table Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            {/* Tier Category Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Level:
              </span>
              {["All", "School / Matric", "Certificate / Diploma", "Graduate / Degree", "Post Graduate"].map(
                (tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setTierFilter(tier)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                      tierFilter === tier
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {tier}
                  </button>
                )
              )}
            </div>

            {/* In-table Search */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Search education / exam..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Master Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0b1c3d] text-white uppercase text-[11px] font-black tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4">Education &amp; Vacancies</th>
                  <th className="py-3.5 px-4">Popular Examinations</th>
                  <th className="py-3.5 px-4 text-center">Apply Link (Official / FreeJobAlert)</th>
                  <th className="py-3.5 px-4 text-center">GovSearch Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredTableData.map((item, idx) => {
                  const isSelected =
                    normSelected === item.id ||
                    normSelected === item.education.toUpperCase() ||
                    normSelected.startsWith(item.education.toUpperCase());

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-blue-50/50 transition group ${
                        isSelected ? "bg-blue-50/80 font-bold" : ""
                      }`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4 text-center text-slate-400 font-bold text-xs">
                        {idx + 1}
                      </td>

                      {/* Education & Vacancies (Exact prompt specification) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center flex-shrink-0">
                            {item.education.slice(0, 4)}
                          </span>
                          <div>
                            <span className="font-black text-sm text-slate-900 group-hover:text-blue-600 transition block">
                              {item.education} &ndash; {item.vacancies}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              Academic Tier: {item.level}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Popular Exams */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {item.popularExams.map((exam) => (
                            <span
                              key={exam}
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold"
                            >
                              {exam}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Apply Link (Exact Markdown Link from user prompt) */}
                      <td className="py-3.5 px-4 text-center">
                        <a
                          href={item.freeJobAlertUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-2xs group-hover:border-rose-300"
                        >
                          <span>{item.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>

                      {/* GovSearch In-App Filter */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleSelectQual(item.id)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-900 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Active Filter</span>
                            </>
                          ) : (
                            <>
                              <span>Filter in GovSearch</span>
                              <ArrowRight className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. 24 Qualification Cards Grid View */}
      {viewMode === "cards" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 font-medium">
            Click any qualification card to filter active recruitment notifications on GovSearch:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
            {EDUCATION_ITEMS.map((item) => {
              const isSelected =
                normSelected === item.id ||
                normSelected === item.label.toUpperCase() ||
                normSelected === `${item.id} PASS`;

              const IconComponent = item.icon;

              if (linkMode) {
                return (
                  <Link
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
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectQual(item.id)}
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
      )}

      {/* Summary Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>
            Real-time aggregate data covering 15 qualification tiers across Central &amp; State Govts
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/exam-pattern"
            className="text-blue-600 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Exam Patterns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-slate-300">&bull;</span>
          <Link
            href="/selection-process"
            className="text-teal-600 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Selection Process</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
