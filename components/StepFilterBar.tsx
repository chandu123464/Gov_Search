"use client";

import React from "react";
import { 
  GraduationCap, 
  Building2, 
  Flag, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight 
} from "lucide-react";
import { 
  QUALIFICATION_LIST, 
  GOVERNMENT_FIELDS, 
  GOVERNMENT_LEVELS, 
  INDIAN_STATES 
} from "@/lib/types";

interface StepFilterBarProps {
  selectedQual: string;
  selectedField: string;
  selectedLevel: string;
  selectedState: string;
  onQualChange: (val: string) => void;
  onFieldChange: (val: string) => void;
  onLevelChange: (val: string) => void;
  onStateChange: (val: string) => void;
  onFindJobs: () => void;
}

export default function StepFilterBar({
  selectedQual,
  selectedField,
  selectedLevel,
  selectedState,
  onQualChange,
  onFieldChange,
  onLevelChange,
  onStateChange,
  onFindJobs,
}: StepFilterBarProps) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 p-4 sm:p-5 my-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Step 1: Qualification */}
        <div className="flex-1 min-w-[180px]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">
              1
            </span>
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800">Qualification</span>
            {selectedQual && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
            )}
          </div>
          <select
            value={selectedQual}
            onChange={(e) => onQualChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
          >
            <option value="">All Qualifications</option>
            {QUALIFICATION_LIST.map((q) => (
              <option key={q.id} value={q.id}>
                {q.label}
              </option>
            ))}
          </select>
        </div>

        {/* Separator Chevron 1 */}
        <div className="hidden lg:flex items-center justify-center text-slate-300">
          <ChevronRight className="w-5 h-5" />
        </div>

        {/* Step 2: Government Field */}
        <div className="flex-1 min-w-[180px]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">
              2
            </span>
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800">Government Field</span>
            {selectedField && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
            )}
          </div>
          <select
            value={selectedField}
            onChange={(e) => onFieldChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
          >
            <option value="">All Fields</option>
            {GOVERNMENT_FIELDS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Separator Chevron 2 */}
        <div className="hidden lg:flex items-center justify-center text-slate-300">
          <ChevronRight className="w-5 h-5" />
        </div>

        {/* Step 3: Government Level */}
        <div className="flex-1 min-w-[180px]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">
              3
            </span>
            <Flag className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-800">Government Level</span>
            {selectedLevel && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
            )}
          </div>
          <select
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
          >
            <option value="">All Levels</option>
            {GOVERNMENT_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Separator Chevron 3 */}
        <div className="hidden lg:flex items-center justify-center text-slate-300">
          <ChevronRight className="w-5 h-5" />
        </div>

        {/* Step 4: State (Optional) */}
        <div className="flex-1 min-w-[180px]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">
              4
            </span>
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-slate-800">State</span>
            <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
            {selectedState && selectedState !== "All States" && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
            )}
          </div>
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
          >
            <option value="All States">All States</option>
            {INDIAN_STATES.filter((s) => s !== "All India").map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Find Jobs Button */}
        <div className="lg:self-end pt-1 lg:pt-0">
          <button
            type="button"
            onClick={onFindJobs}
            className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>Find Jobs</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}

