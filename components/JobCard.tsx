"use client";

import React, { useState, useEffect } from "react";
import EmblemLogo from "@/components/EmblemLogo";
import { 
  Building, 
  GraduationCap, 
  MapPin, 
  Clock, 
  Users, 
  Coins, 
  UserCheck, 
  Calendar, 
  Sparkles, 
  ExternalLink, 
  X, 
  ArrowRight 
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
  isSelected?: boolean;
  onSelect?: (job: any) => void;
}

export default function JobCard({ job, onOpenReminder, isSelected = false, onSelect }: JobCardProps) {
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
          bg: "bg-red-100 text-red-800 border-red-300",
          dot: "bg-red-600 animate-ping",
          label: remaining.text || "CLOSING SOON",
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
      <div
        onClick={() => onSelect && onSelect(job)}
        className={`bg-white rounded-2xl border transition-all duration-200 p-4 sm:p-5 relative group flex flex-col justify-between ${
          isSelected
            ? "border-blue-600 ring-2 ring-blue-500 shadow-md"
            : "border-slate-200 hover:border-blue-300 hover:shadow-sm"
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Organization Emblem */}
          <EmblemLogo
            type={job.organization_name || job.government_field}
            size={44}
            className="flex-shrink-0 mt-0.5"
          />

          {/* Content Area */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  {job.organization_name}
                </span>
                <a
                  href={`/job/${job.slug}`}
                  className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 transition leading-snug block mt-0.5"
                >
                  {job.post_name}
                </a>
              </div>

              {/* Dynamic Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${badge.bg} flex-shrink-0`}
              >
                <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                {badge.label}
              </span>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-bold">
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
                {job.government_level}
              </span>
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                {job.government_field}
              </span>
              {job.state && job.state !== "All India" && (
                <span className="flex items-center gap-0.5 text-slate-600">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {job.state}
                </span>
              )}
              <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-100">
                {job.qualification_level} Pass
              </span>
            </div>

            {/* Key Specs */}
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
                  {job.age_min || 18}–{job.age_max || 27} Yrs
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span className="font-bold text-red-600 truncate">
                  Last: {formattedLastDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPosterModal(true);
              }}
              className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1 rounded-lg transition"
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Poster Card</span>
            </button>

            <a
              href={generateGoogleCalendarUrl(job)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-blue-700 px-1.5 py-1 transition"
            >
              <Clock className="w-3 h-3 text-amber-600" />
              <span>Remind Me</span>
            </a>
          </div>

          <a
            href={`/job/${job.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1 ml-auto"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 stroke-[2.5]" />
          </a>
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
          {/* Floating Screen-Corner Close Button */}
          <button
            onClick={() => setShowPosterModal(false)}
            aria-label="Close poster card"
            title="Close Poster (Esc)"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-red-600 hover:bg-red-700 text-white font-black rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 border-2 border-white cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[3]" />
          </button>

          {/* Modal Card Container */}
          <div className="relative w-full max-w-xl mx-auto my-6 sm:my-10">
            <RecruitmentPosterCard job={job} onClose={() => setShowPosterModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
