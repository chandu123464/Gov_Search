"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { 
  QUALIFICATION_LIST, 
  GOVERNMENT_FIELDS, 
  GOVERNMENT_LEVELS, 
  INDIAN_STATES 
} from "@/lib/types";
import { Filter, X, RotateCcw, ArrowDownUp } from "lucide-react";

interface Props {
  currentFilters: {
    qualification?: string;
    field?: string;
    government_level?: string;
    state?: string;
    status?: string;
    sort?: string;
    search?: string;
  };
}

export default function FilterSidebar({ currentFilters }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "ALL" && value !== "All India") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // Reset to page 1 on filter update
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters = Boolean(
    currentFilters.qualification ||
    currentFilters.field ||
    currentFilters.government_level ||
    (currentFilters.state && currentFilters.state !== "All India") ||
    currentFilters.status ||
    currentFilters.search
  );

  return (
    <aside className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 font-black text-slate-900 text-sm uppercase tracking-wide">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filters &amp; Sort</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="space-y-1.5 pb-2 border-b border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Filters:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {currentFilters.qualification && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                Edu: {currentFilters.qualification}
                <button
                  onClick={() => updateParam("qualification", undefined)}
                  className="hover:text-red-600 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentFilters.field && (
              <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                Field: {currentFilters.field}
                <button
                  onClick={() => updateParam("field", undefined)}
                  className="hover:text-red-600 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentFilters.government_level && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                Level: {currentFilters.government_level}
                <button
                  onClick={() => updateParam("government_level", undefined)}
                  className="hover:text-red-600 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentFilters.state && currentFilters.state !== "All India" && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                State: {currentFilters.state}
                <button
                  onClick={() => updateParam("state", undefined)}
                  className="hover:text-red-600 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentFilters.status && (
              <span className="inline-flex items-center gap-1 bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                Status: {currentFilters.status}
                <button
                  onClick={() => updateParam("status", undefined)}
                  className="hover:text-red-600 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Sorting */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center gap-1.5">
          <ArrowDownUp className="w-3.5 h-3.5 text-blue-600" />
          <span>Sort By</span>
        </label>
        <select
          value={currentFilters.sort || "latest"}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
        >
          <option value="latest">Latest Jobs (Most Recent)</option>
          <option value="last_date">Last Date (Closing Earliest)</option>
          <option value="vacancies_desc">Total Vacancies (High to Low)</option>
          <option value="salary_desc">Salary (High to Low)</option>
          <option value="salary_asc">Salary (Low to High)</option>
        </select>
      </div>

      {/* Application Status Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Job Application Status
        </label>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {[
            { id: "all", label: "All Status" },
            { id: "open", label: "Open Now" },
            { id: "closing_soon", label: "Closing Soon" },
            { id: "upcoming", label: "Upcoming" },
          ].map((st) => {
            const isActive =
              (!currentFilters.status && st.id === "all") ||
              currentFilters.status?.toLowerCase() === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => updateParam("status", st.id === "all" ? undefined : st.id)}
                className={`py-1.5 px-2 rounded-lg font-bold border transition text-center ${
                  isActive
                    ? "bg-blue-700 text-white border-blue-800 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Qualification Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Educational Qualification
        </label>
        <select
          value={currentFilters.qualification || ""}
          onChange={(e) => updateParam("qualification", e.target.value || undefined)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
        >
          <option value="">All Qualifications</option>
          {QUALIFICATION_LIST.map((q) => (
            <option key={q.id} value={q.id}>
              {q.label}
            </option>
          ))}
        </select>
      </div>

      {/* Government Field Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Government Field / Department
        </label>
        <select
          value={currentFilters.field || ""}
          onChange={(e) => updateParam("field", e.target.value || undefined)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
        >
          <option value="">All Fields (Railway, SSC, Bank...)</option>
          {GOVERNMENT_FIELDS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Government Level Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Government Level
        </label>
        <select
          value={currentFilters.government_level || ""}
          onChange={(e) => updateParam("government_level", e.target.value || undefined)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
        >
          <option value="">All Government Levels</option>
          {GOVERNMENT_LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>

      {/* State Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          State / Location
        </label>
        <select
          value={currentFilters.state || "All India"}
          onChange={(e) => updateParam("state", e.target.value || undefined)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
        >
          {INDIAN_STATES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}

