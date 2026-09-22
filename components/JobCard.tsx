"use client";

import React, { useState, useEffect } from "react";
import { 
  Building, 
  GraduationCap, 
  MapPin, 
  Clock, 
  Users, 
  Coins, 
  Calendar, 
  Eye, 
  Share2, 
  Sparkles,
  ExternalLink,
  X
} from "lucide-react";
import { 
  calculateJobStatus, 
  formatDateIndian, 
  getDaysRemainingText, 
  generateGoogleCalendarUrl 
} from "@/lib/date-utils";
import RecruitmentPosterCard from "./RecruitmentPosterCard";

interface JobCardProps {
  job: any;
  onOpenReminder?: (job: any) => void;
}

export default function JobCard({ job, onOpenReminder }: JobCardProps) {
  const [showPosterModal, setShowPosterModal] = useState(false);

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    if (!showPosterModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowPosterModal(false);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [showPosterModal]);

  const status = job.calculatedStatus || calculateJobStatus(job.start_date, job.last_date);
  const remaining = getDaysRemainingText(job.last_date, job.start_date);
  const formattedLastDate = formatDateIndian(job.last_date);

  // Status badge style configuration
  const getBadgeConfig = () => {
    switch (status) {
      case "CLOSING SOON":
        return {
          bg: "bg-red-100 text-red-800 border-red-300 animate-pulse-glow",
          dot: "bg-red-600",
          label: remaining.text,
        };
      case "UPCOMING":
        return {
          bg: "bg-sky-100 text-sky-800 border-sky-300",
          dot: "bg-sky-600",
          label: remaining.text || "UPCOMING",
        };
      case "CLOSED":
        return {
          bg: "bg-slate-200 text-slate-700 border-slate-300",
          dot: "bg-slate-500",
          label: "CLOSED",
        };
      case "OPEN":
      default:
        return {
          bg: "bg-emerald-100 text-emerald-800 border-emerald-300",
          dot: "bg-emerald-600",
          label: `OPEN • ${remaining.text}`,
        };
    }
  };

  const badge = getBadgeConfig();

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200 p-5 flex flex-col justify-between relative group">
        {/* Top Header Row */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                {job.organization_name}
              </span>
              <a
                href={`/job/${job.slug}`}
                className="text-base md:text-lg font-black text-slate-900 group-hover:text-blue-700 transition leading-snug block mt-0.5"
              >
                {job.post_name}
              </a>
            </div>

            {/* Dynamic Status Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold border ${badge.bg} flex-shrink-0`}
            >
              <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
              {badge.label}
            </span>
          </div>

          {/* Department & Government Level Badges */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 mb-3.5">
            <span className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
              {job.government_field}
            </span>
            <span>•</span>
            <span className="text-slate-600 font-medium">{job.government_level}</span>
            {job.state && job.state !== "All India" && (
              <>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-slate-600">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {job.state}
                </span>
              </>
            )}
          </div>

          {/* Key Job Specification Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 border-y border-slate-100 text-xs">
            {/* Vacancies */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Posts</span>
                <span className="font-extrabold text-slate-900">
                  {job.number_of_posts.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Qualification */}
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Qualification</span>
                <span className="font-bold text-slate-900 truncate block">
                  {job.qualification}
                </span>
              </div>
            </div>

            {/* Salary */}
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Salary</span>
                <span className="font-bold text-slate-900 truncate block">
                  {job.salary_text}
                </span>
              </div>
            </div>

            {/* Last Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Date</span>
                <span className="font-black text-red-600">
                  {formattedLastDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 mt-2 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPosterModal(true)}
              className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-lg transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Poster Card</span>
            </button>

            <a
              href={generateGoogleCalendarUrl(job)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-700 px-2 py-1.5 transition"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Remind Me</span>
            </a>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <a
              href={`/job/${job.slug}`}
              className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-1"
            >
              <span>View Details</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Poster Preview Modal */}
      {showPosterModal && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPosterModal(false);
          }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6"
        >
          {/* Floating Screen-Corner Close Button (ALWAYS VISIBLE in top right of screen) */}
          <button
            onClick={() => setShowPosterModal(false)}
            aria-label="Close poster card"
            title="Close Poster (Esc)"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-red-600 hover:bg-red-700 text-white font-black rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 border-2 border-white cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[3]" />
          </button>

          {/* Modal Card Container (Centered with mx-auto, NEVER cut off at top) */}
          <div className="relative w-full max-w-xl mx-auto my-6 sm:my-10">
            <RecruitmentPosterCard job={job} onClose={() => setShowPosterModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}

