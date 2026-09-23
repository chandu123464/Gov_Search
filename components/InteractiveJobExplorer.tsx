"use client";

import React, { useState, useEffect } from "react";
import EmblemLogo from "@/components/EmblemLogo";
import { formatDateIndian, calculateJobStatus } from "@/lib/date-utils";
import { 
  FileText, 
  ArrowRight, 
  Users, 
  Coins, 
  UserCheck, 
  Calendar, 
  ExternalLink, 
  Briefcase, 
  Building2, 
  CheckCircle, 
  Clock, 
  Share2, 
  LayoutList, 
  LayoutGrid, 
  X, 
  Check, 
  Info, 
  HelpCircle,
  ShieldCheck
} from "lucide-react";

interface Job {
  id: string;
  slug: string;
  post_name: string;
  organization_name: string;
  department: string;
  government_field: string;
  government_level: string;
  state: string;
  qualification: string;
  qualification_level: string;
  qualification_details?: string | null;
  number_of_posts: number;
  salary_text: string;
  salary_min?: number | null;
  salary_max?: number | null;
  age_min?: number | null;
  age_max?: number | null;
  age_relaxation?: string | null;
  selection_process: string;
  application_fee_sc_st: string;
  application_fee_obc: string;
  application_fee_general: string;
  application_fee_ews?: string | null;
  application_fee_female?: string | null;
  application_fee_pwd?: string | null;
  application_fee_other?: string | null;
  notification_date?: string | Date | null;
  start_date: string | Date;
  last_date: string | Date;
  exam_date?: string | Date | null;
  admit_card_date?: string | Date | null;
  result_date?: string | Date | null;
  official_website: string;
  official_notification_url?: string;
  application_url?: string;
  job_description: string;
  eligibility: string;
  required_documents: string;
  how_to_apply?: string | null;
  status: string;
  calculatedStatus?: string;
}

interface Props {
  initialJobs: Job[];
  selectedQual: string;
  selectedField: string;
  selectedLevel: string;
  selectedState: string;
  onClearFilters: () => void;
  onRemoveFilter: (key: "qual" | "field" | "level" | "state") => void;
}

export default function InteractiveJobExplorer({
  initialJobs,
  selectedQual,
  selectedField,
  selectedLevel,
  selectedState,
  onClearFilters,
  onRemoveFilter,
}: Props) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(
    initialJobs.length > 0 ? initialJobs[0] : null
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "eligibility" | "selection" | "fees" | "dates" | "documents"
  >("overview");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Keep state in sync with initialJobs
  useEffect(() => {
    setJobs(initialJobs);
    if (initialJobs.length > 0) {
      // Retain currently selected if it exists in new results, else pick first
      setSelectedJob((prev) => {
        if (!prev) return initialJobs[0];
        const match = initialJobs.find((j) => j.id === prev.id);
        return match || initialJobs[0];
      });
    } else {
      setSelectedJob(null);
    }
  }, [initialJobs]);

  // Handle client-side sorting of current list
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const sorted = [...jobs];
    if (newSort === "latest") {
      sorted.sort(
        (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
    } else if (newSort === "last_date") {
      sorted.sort(
        (a, b) => new Date(a.last_date).getTime() - new Date(b.last_date).getTime()
      );
    } else if (newSort === "salary_desc") {
      sorted.sort((a, b) => (b.salary_max || 0) - (a.salary_max || 0));
    } else if (newSort === "salary_asc") {
      sorted.sort((a, b) => (a.salary_min || 0) - (b.salary_min || 0));
    } else if (newSort === "vacancies") {
      sorted.sort((a, b) => b.number_of_posts - a.number_of_posts);
    }
    setJobs(sorted);
  };

  // Status Badge Component
  const renderStatusBadge = (job: Job) => {
    const status =
      job.calculatedStatus || calculateJobStatus(job.start_date, job.last_date);

    if (status === "CLOSING SOON") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
          Closing Soon
        </span>
      );
    }
    if (status === "UPCOMING") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
          Upcoming
        </span>
      );
    }
    if (status === "CLOSED") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
          Closed
        </span>
      );
    }
    // Default OPEN
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        Open
      </span>
    );
  };

  const hasActiveFilters =
    Boolean(selectedQual) ||
    Boolean(selectedField) ||
    Boolean(selectedLevel) ||
    Boolean(selectedState && selectedState !== "All States");

  return (
    <div id="available-jobs" className="w-full my-6 space-y-4">
      {/* Active Filter Chips Bar */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap bg-white p-3 rounded-2xl border border-slate-200 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
            Active Filters:
          </span>
          {selectedQual && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full font-bold">
              <span>{selectedQual}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter("qual")}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedField && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full font-bold">
              <span>{selectedField}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter("field")}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedLevel && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full font-bold">
              <span>{selectedLevel}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter("level")}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedState && selectedState !== "All States" && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full font-bold">
              <span>{selectedState}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter("state")}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs text-blue-600 hover:text-red-600 font-bold underline ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Two Column Layout: Left (Job Results) + Right (Selected Job Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: AVAILABLE JOBS (7 cols on lg)              */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-4">
          {/* Header Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Available Jobs
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Showing government jobs for{" "}
                  {selectedQual ? `${selectedQual} qualification` : "all qualifications"}{" "}
                  {selectedField ? `in ${selectedField}` : ""}{" "}
                  {selectedLevel ? `(${selectedLevel})` : ""}
                </p>
              </div>
            </div>

            {/* Total Count, Sort By & Toggle */}
            <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
              <span className="text-slate-500 font-medium whitespace-nowrap">
                Total <strong className="text-slate-900">{jobs.length}</strong> jobs found
              </span>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-bold text-slate-700 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="latest">Latest</option>
                  <option value="last_date">Last Date</option>
                  <option value="salary_desc">Salary High to Low</option>
                  <option value="salary_asc">Salary Low to High</option>
                  <option value="vacancies">Vacancies</option>
                </select>
              </div>

              <div className="hidden sm:flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 ${viewMode === "list" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400"}`}
                  title="List view"
                >
                  <LayoutList className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 ${viewMode === "grid" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400"}`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Job List / Cards */}
          {jobs.length > 0 ? (
            <div className="space-y-3.5">
              {jobs.map((job) => {
                const isSelected = selectedJob?.id === job.id;

                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`bg-white rounded-2xl border transition-all duration-200 p-4 sm:p-5 relative cursor-pointer group ${
                      isSelected
                        ? "border-blue-600 ring-2 ring-blue-500 shadow-md"
                        : "border-slate-200 hover:border-blue-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Left: Organization Emblem */}
                      <EmblemLogo
                        type={job.organization_name || job.government_field}
                        size={48}
                        className="flex-shrink-0 mt-0.5"
                      />

                      {/* Middle: Details */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Title & Status */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 transition leading-snug">
                              {job.post_name}
                            </h4>
                            <p className="text-xs text-slate-500 font-semibold mt-0.5">
                              {job.organization_name}
                            </p>
                          </div>

                          <div className="flex-shrink-0">
                            {renderStatusBadge(job)}
                          </div>
                        </div>

                        {/* Badges / Tags */}
                        <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-bold">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
                            {job.government_level}
                          </span>
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                            {job.government_field}
                          </span>
                          <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-100">
                            {job.qualification_level} Pass
                          </span>
                        </div>

                        {/* Specification Specs: Posts, Salary, Age, Last Date */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Users className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                            <span className="font-extrabold truncate">
                              {job.number_of_posts.toLocaleString("en-IN")} Posts
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Coins className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span className="font-bold truncate">
                              {job.salary_text}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-slate-700">
                            <UserCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="font-bold truncate">
                              {job.age_min || 18}–{job.age_max || 27} Years
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                            <span className="font-bold text-red-600 truncate">
                              Last: {formatDateIndian(job.last_date)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: View Details CTA */}
                      <div className="hidden sm:flex flex-col items-end justify-center self-center flex-shrink-0 pl-2">
                        <button
                          type="button"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  No government jobs found for your selected filters.
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try selecting another qualification, changing the government department, or selecting All States.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: SELECTED JOB DETAILS PREVIEW (6 cols on lg) */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-20 space-y-4">
          {selectedJob ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
              {/* Header: Org Emblem + Title + Status */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <EmblemLogo
                    type={selectedJob.organization_name || selectedJob.government_field}
                    size={48}
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                      {selectedJob.post_name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      {selectedJob.organization_name}
                    </p>
                  </div>
                </div>

                <div>{renderStatusBadge(selectedJob)}</div>
              </div>

              {/* Navigation Tabs matching HomePage.png */}
              <div className="flex items-center overflow-x-auto gap-1 border-b border-slate-200 pb-1 scrollbar-none text-xs font-bold">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "eligibility", label: "Eligibility" },
                  { id: "selection", label: "Selection Process" },
                  { id: "fees", label: "Fees" },
                  { id: "dates", label: "Important Dates" },
                  { id: "documents", label: "Documents" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: OVERVIEW (Main View matching HomePage.png) */}
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  {/* Left Column: Specifications list (7 cols) */}
                  <div className="md:col-span-7 space-y-3.5 text-xs">
                    <div className="flex items-start gap-2.5">
                      <Briefcase className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 block">Post Name:</span>
                        <span className="text-slate-600 font-medium">
                          {selectedJob.post_name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 block">Organization:</span>
                        <span className="text-slate-600 font-medium">
                          {selectedJob.organization_name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Users className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 block">Total Vacancies:</span>
                        <span className="text-slate-900 font-extrabold">
                          {selectedJob.number_of_posts.toLocaleString("en-IN")} Posts (Tentative)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 block">Qualification:</span>
                        <span className="text-slate-900 font-semibold">
                          {selectedJob.qualification}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <UserCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 block">Age Limit:</span>
                        <span className="text-slate-600">
                          {selectedJob.age_min || 18}–{selectedJob.age_max || 27} Years{" "}
                          <span className="text-[11px] text-slate-400 block sm:inline">
                            (Age relaxation as per government rules)
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Coins className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 block">Salary:</span>
                        <span className="text-slate-900 font-bold">
                          {selectedJob.salary_text}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 block">Selection Process:</span>
                        <span className="text-slate-600 leading-relaxed block">
                          {selectedJob.selection_process}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <Coins className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 block">Application Fee:</span>
                        <div className="text-[11px] text-slate-600 space-y-0.5 mt-0.5">
                          <div>SC / ST: <strong>{selectedJob.application_fee_sc_st}</strong></div>
                          <div>General: <strong>{selectedJob.application_fee_general}</strong></div>
                          <div>OBC: <strong>{selectedJob.application_fee_obc}</strong></div>
                          <div>EWS: <strong>{selectedJob.application_fee_ews || "₹100"}</strong></div>
                          <div>Female: <strong>{selectedJob.application_fee_female || "₹0 (as per notification)"}</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Important Dates Card & Actions (5 cols) */}
                  <div className="md:col-span-5 space-y-3.5">
                    {/* Important Dates Box */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-4 space-y-2.5">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 pb-1.5 border-b border-slate-200">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>Important Dates</span>
                      </div>

                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Notification Date:</span>
                          <strong className="text-slate-800 font-semibold">
                            {formatDateIndian(selectedJob.notification_date)}
                          </strong>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Application Start:</span>
                          <strong className="text-slate-800 font-semibold">
                            {formatDateIndian(selectedJob.start_date)}
                          </strong>
                        </div>
                        <div className="flex items-center justify-between text-red-600 pt-1 border-t border-slate-200/60">
                          <span className="font-bold">Last Date:</span>
                          <strong className="font-black text-xs text-red-600">
                            {formatDateIndian(selectedJob.last_date)}
                          </strong>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Exam Date:</span>
                          <span>{selectedJob.exam_date ? formatDateIndian(selectedJob.exam_date) : "To be announced"}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Admit Card:</span>
                          <span>{selectedJob.admit_card_date ? formatDateIndian(selectedJob.admit_card_date) : "To be announced"}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Result Date:</span>
                          <span>{selectedJob.result_date ? formatDateIndian(selectedJob.result_date) : "To be announced"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Official Action Buttons */}
                    <div className="space-y-2">
                      <a
                        href={selectedJob.application_url || selectedJob.official_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition group"
                      >
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                        <span>Apply Online</span>
                      </a>

                      {selectedJob.official_notification_url ? (
                        <a
                          href={selectedJob.official_notification_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-600" />
                          <span>View Official Notification</span>
                        </a>
                      ) : null}

                      <a
                        href={selectedJob.official_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <Building2 className="w-3.5 h-3.5 text-slate-600" />
                        <span>Visit Official Website</span>
                      </a>
                    </div>

                    {/* Share this job */}
                    <div className="pt-2 text-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">
                        Share this job
                      </span>
                      <div className="flex items-center justify-center gap-2">
                        {/* WhatsApp */}
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            `Government Job Alert: ${selectedJob.post_name} at ${selectedJob.organization_name}. Check details: `
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:scale-110 transition shadow-xs"
                          title="Share on WhatsApp"
                        >
                          <span className="text-xs font-black">W</span>
                        </a>
                        {/* Telegram */}
                        <a
                          href={`https://t.me/share/url?url=${encodeURIComponent("https://govsearch.portal/job/" + selectedJob.slug)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center hover:scale-110 transition shadow-xs"
                          title="Share on Telegram"
                        >
                          <span className="text-xs font-black">T</span>
                        </a>
                        {/* Facebook */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://govsearch.portal/job/" + selectedJob.slug)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition shadow-xs"
                          title="Share on Facebook"
                        >
                          <span className="text-xs font-black">f</span>
                        </a>
                        {/* X / Twitter */}
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`New Govt Job: ${selectedJob.post_name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition shadow-xs"
                          title="Share on X"
                        >
                          <span className="text-xs font-black">X</span>
                        </a>
                        {/* LinkedIn */}
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://govsearch.portal/job/" + selectedJob.slug)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center hover:scale-110 transition shadow-xs"
                          title="Share on LinkedIn"
                        >
                          <span className="text-xs font-black">in</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ELIGIBILITY */}
              {activeTab === "eligibility" && (
                <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                    <span className="font-bold text-blue-900 block uppercase text-[10px] mb-0.5">
                      Educational Criteria
                    </span>
                    <p className="font-semibold text-slate-800">{selectedJob.qualification}</p>
                    {selectedJob.qualification_details && (
                      <p className="text-slate-600 mt-1">{selectedJob.qualification_details}</p>
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 mb-1">Detailed Eligibility Norms:</h5>
                    <p className="whitespace-pre-line text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {selectedJob.eligibility}
                    </p>
                  </div>
                  {selectedJob.age_relaxation && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                      <span className="font-bold block uppercase text-[10px] mb-0.5">
                        Age Relaxation Guidelines
                      </span>
                      <p>{selectedJob.age_relaxation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SELECTION PROCESS */}
              {activeTab === "selection" && (
                <div className="space-y-3 text-xs text-slate-700">
                  <h5 className="font-bold text-slate-900">Stages of Examination &amp; Recruitment:</h5>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium whitespace-pre-line leading-relaxed">
                    {selectedJob.selection_process}
                  </div>
                </div>
              )}

              {/* TAB 4: FEES */}
              {activeTab === "fees" && (
                <div className="space-y-3 text-xs text-slate-700">
                  <h5 className="font-bold text-slate-900">Application Fee Details:</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="p-2.5 bg-slate-50 rounded-xl border text-center">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">General</span>
                      <strong className="text-sm font-black text-slate-900">{selectedJob.application_fee_general}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border text-center">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">OBC</span>
                      <strong className="text-sm font-black text-slate-900">{selectedJob.application_fee_obc}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border text-center">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">EWS</span>
                      <strong className="text-sm font-black text-slate-900">{selectedJob.application_fee_ews || "₹100"}</strong>
                    </div>
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                      <span className="text-emerald-700 block text-[10px] uppercase font-bold">SC / ST / PwD</span>
                      <strong className="text-sm font-black text-emerald-800">{selectedJob.application_fee_sc_st}</strong>
                    </div>
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-center col-span-2 sm:col-span-2">
                      <span className="text-emerald-700 block text-[10px] uppercase font-bold">Female / Women</span>
                      <strong className="text-sm font-black text-emerald-800">{selectedJob.application_fee_female || "₹0 (Exempted)"}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: DATES */}
              {activeTab === "dates" && (
                <div className="space-y-3 text-xs text-slate-700">
                  <h5 className="font-bold text-slate-900">Official Schedule &amp; Key Deadlines:</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl border">
                      <span>Online Application Start:</span>
                      <strong>{formatDateIndian(selectedJob.start_date)}</strong>
                    </div>
                    <div className="flex justify-between p-2.5 bg-red-50 text-red-900 rounded-xl border border-red-200">
                      <span className="font-bold">Application Last Date:</span>
                      <strong className="font-black text-sm text-red-600">{formatDateIndian(selectedJob.last_date)}</strong>
                    </div>
                    <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl border">
                      <span>Exam Date:</span>
                      <span>{selectedJob.exam_date ? formatDateIndian(selectedJob.exam_date) : "To be announced"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: DOCUMENTS */}
              {activeTab === "documents" && (
                <div className="space-y-3 text-xs text-slate-700">
                  <h5 className="font-bold text-slate-900">Required Documents Checklist:</h5>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 whitespace-pre-line leading-relaxed">
                    {selectedJob.required_documents}
                  </div>
                  {selectedJob.how_to_apply && (
                    <div>
                      <h5 className="font-bold text-slate-900 mb-1 mt-2">How to Apply:</h5>
                      <p className="whitespace-pre-line text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {selectedJob.how_to_apply}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
              Select a job card on the left to view comprehensive details and application links.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

