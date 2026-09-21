"use client";

import React from "react";
import { QUALIFICATION_LIST } from "@/lib/types";
import { GraduationCap, ArrowRight } from "lucide-react";

interface Props {
  counts?: Record<string, number>;
  selectedQual?: string;
  onSelect?: (qualId: string) => void;
  isWizardMode?: boolean;
}

export default function JobsByEducationSection({
  counts = {},
  selectedQual,
  onSelect,
  isWizardMode = false,
}: Props) {
  // Pre-formatted route slugs for SEO links
  const getQualHref = (id: string) => {
    const slugMap: Record<string, string> = {
      "10TH": "10th",
      "8TH": "8th",
      "12TH": "12th",
      "ANY GRADUATE": "graduate",
      "ENGINEERING": "engineering",
    };
    return `/government-jobs/${slugMap[id] || id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden my-6">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-white">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <GraduationCap className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide">
              Jobs by Education
            </h2>
            <p className="text-xs text-blue-100">
              Select your qualification to discover eligible Government Jobs &amp; Sarkari vacancies
            </p>
          </div>
        </div>
        <a
          href="/government-jobs"
          className="hidden sm:flex items-center gap-1 text-xs font-bold text-white bg-blue-800/80 hover:bg-blue-900 px-3 py-1.5 rounded-lg border border-blue-400/30 transition shadow-sm"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Button Grid */}
      <div className="p-5 md:p-6 bg-slate-50/50">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 md:gap-3">
          {QUALIFICATION_LIST.map((qual) => {
            const count = counts[qual.id];
            const isSelected = selectedQual?.toUpperCase() === qual.id;

            if (isWizardMode && onSelect) {
              return (
                <button
                  key={qual.id}
                  type="button"
                  onClick={() => onSelect(qual.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition font-bold text-sm shadow-sm ${
                    isSelected
                      ? "bg-blue-700 text-white border-blue-800 ring-2 ring-blue-500 shadow-md scale-105"
                      : "bg-white text-slate-800 border-slate-200 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50/50"
                  }`}
                >
                  <span className="truncate w-full">{qual.label}</span>
                  {count !== undefined && (
                    <span
                      className={`text-[11px] font-semibold mt-0.5 ${
                        isSelected ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {count > 0 ? `${count} ${count === 1 ? "Job" : "Jobs"}` : "Vacancies"}
                    </span>
                  )}
                </button>
              );
            }

            return (
              <a
                key={qual.id}
                href={getQualHref(qual.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition font-bold text-sm shadow-sm ${
                  isSelected
                    ? "bg-blue-700 text-white border-blue-800 ring-2 ring-blue-500 shadow-md"
                    : "bg-white text-slate-800 border-slate-200 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50/50"
                }`}
              >
                <span className="truncate w-full">{qual.label}</span>
                {count !== undefined && (
                  <span
                    className={`text-[11px] font-semibold mt-0.5 ${
                      isSelected ? "text-blue-100" : "text-slate-500"
                    }`}
                  >
                    {count > 0 ? `${count} ${count === 1 ? "Job" : "Jobs"}` : "Vacancies"}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
