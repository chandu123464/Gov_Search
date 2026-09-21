"use client";

import React, { useState } from "react";
import { 
  User, 
  Clock, 
  GraduationCap, 
  CreditCard, 
  Calendar, 
  Users, 
  ExternalLink, 
  CheckCircle2, 
  Share2, 
  Copy, 
  Bell,
  Download
} from "lucide-react";
import { formatDateIndian, generateGoogleCalendarUrl, generateIcsData } from "@/lib/date-utils";

interface PosterProps {
  job: {
    id: string;
    slug: string;
    post_name: string;
    organization_name: string;
    department?: string;
    number_of_posts: number;
    salary_text: string;
    age_min?: number | null;
    age_max?: number | null;
    qualification: string;
    application_fee_sc_st?: string;
    application_fee_general?: string;
    application_fee_obc?: string;
    application_fee_other?: string | null;
    start_date: string | Date;
    last_date: string | Date;
    selection_process: string;
    official_website: string;
    application_url?: string;
    calculatedStatus?: string;
  };
}

export default function RecruitmentPosterCard({ job }: PosterProps) {
  const [copied, setCopied] = useState(false);

  const formattedStartDate = formatDateIndian(job.start_date);
  const formattedEndDate = formatDateIndian(job.last_date);

  // Consolidated Fee string
  const feeString = `SC/ST/PwD – ${job.application_fee_sc_st || "₹0/-"} | General/OBC – ${job.application_fee_general || "₹100/-"}`;

  // Age string
  const ageString = job.age_min && job.age_max 
    ? `${job.age_min} – ${job.age_max} Years`
    : job.age_max 
    ? `Up to ${job.age_max} Years` 
    : "As per rules";

  const handleCopySummary = () => {
    const text = `📢 ${job.organization_name.toUpperCase()} RECRUITMENT 2026
📌 Post Name: ${job.post_name}
🔢 Total Vacancies: ${job.number_of_posts.toLocaleString("en-IN")}
💰 Salary: ${job.salary_text}
🎓 Qualification: ${job.qualification}
🎂 Age Limit: ${ageString}
📅 Last Date: ${formattedEndDate}
🔗 Apply Online: ${job.application_url || job.official_website}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadIcs = () => {
    const icsContent = generateIcsData(job);
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${job.slug}-last-date.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900 bg-gradient-to-b from-[#071329] via-[#0b1c3d] to-[#040c1c] text-white font-sans transition hover:shadow-blue-900/30">
      {/* Top Banner Row */}
      <div className="pt-4 px-5 pb-2 flex items-center justify-between border-b border-blue-900/50">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="w-6 h-6 text-amber-400 fill-amber-400 animate-bounce" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
              1
            </span>
          </div>
          <div>
            <div className="text-amber-400 font-black tracking-wider text-xs md:text-sm uppercase leading-none drop-shadow">
              DAILY JOB UPDATES
            </div>
            <div className="text-[10px] text-slate-300 font-medium">Stay informed. Stay ahead.</div>
          </div>
        </div>

        <div className="bg-amber-400/90 text-slate-950 font-black text-[10px] md:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
          ALL GOVERNMENT ALERTS
        </div>
      </div>

      {/* Main Title Header */}
      <div className="px-5 py-4 text-center">
        <div className="inline-block bg-blue-950/80 text-blue-300 border border-blue-700/60 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase mb-1.5">
          {job.organization_name}
        </div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-md">
          {job.post_name}
        </h2>
        <div className="text-amber-400 font-extrabold text-sm md:text-base tracking-widest uppercase mt-0.5">
          RECRUITMENT 2026
        </div>
      </div>

      {/* Hero Stats (Twin Big Badges) */}
      <div className="px-5 py-1 grid grid-cols-2 gap-3">
        {/* Total Vacancies Card */}
        <div className="bg-white rounded-2xl p-3 text-center shadow-lg border-2 border-slate-200 flex flex-col justify-center">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            TOTAL VACANCIES
          </span>
          <span className="text-2xl md:text-3xl font-black text-red-600 leading-tight">
            {job.number_of_posts.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Salary Card */}
        <div className="bg-white rounded-2xl p-3 text-center shadow-lg border-2 border-slate-200 flex flex-col justify-center">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            SALARY
          </span>
          <span className="text-base md:text-lg font-black text-amber-600 leading-tight break-words">
            {job.salary_text}
          </span>
        </div>
      </div>

      {/* Spec Table with Circular Icon Badges */}
      <div className="p-5 space-y-2.5">
        <div className="bg-white/95 text-slate-900 rounded-2xl p-3.5 space-y-2.5 shadow-md">
          {/* Post Name */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">POST NAME : </span>
              <span className="text-xs md:text-sm font-black text-slate-900 ml-1">{job.post_name}</span>
            </div>
          </div>

          {/* Age Limit */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">AGE : </span>
              <span className="text-xs md:text-sm font-extrabold text-slate-900 ml-1">{ageString}</span>
            </div>
          </div>

          {/* Qualification */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">QUALIFICATION : </span>
              <span className="text-xs md:text-sm font-bold text-slate-900 ml-1">{job.qualification}</span>
            </div>
          </div>

          {/* Application Fee */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">APPLICATION FEE : </span>
              <span className="text-xs md:text-sm font-bold text-slate-900 ml-1">{feeString}</span>
            </div>
          </div>

          {/* Important Dates */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
            <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wide">IMPORTANT DATES : </span>
              <span className="font-bold text-emerald-700 ml-1">Start: {formattedStartDate}</span>
              <span className="font-black text-red-600 ml-2">Last Date: {formattedEndDate}</span>
            </div>
          </div>

          {/* Selection Process */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">SELECTION : </span>
              <span className="text-xs md:text-sm font-bold text-slate-900 ml-1">{job.selection_process}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="px-5 pb-5 space-y-3">
        {/* Apply & Official Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <a
            href={job.application_url || job.official_website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-slate-950 font-black py-3 px-4 rounded-xl shadow-lg hover:shadow-orange-500/50 transition transform hover:-translate-y-0.5 text-sm uppercase tracking-wide"
          >
            APPLY NOW ➔
          </a>

          <a
            href={job.official_website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-700 py-2 px-3 rounded-xl transition text-center"
          >
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Official Website</span>
            <span className="text-xs font-semibold text-sky-400 truncate max-w-[200px]">
              {job.official_website.replace(/^https?:\/\//, "")}
            </span>
          </a>
        </div>

        {/* Poster Utility Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1 hover:text-white transition"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Details"}</span>
          </button>

          <a
            href={generateGoogleCalendarUrl(job)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Add Calendar Reminder</span>
          </a>

          <button
            onClick={handleDownloadIcs}
            className="flex items-center gap-1 hover:text-white transition"
            title="Download .ICS for Apple/Android/Outlook Calendar"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.ICS</span>
          </button>
        </div>

        {/* Telegram / Channel Footer pill matching image */}
        <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-slate-950 text-center py-1 rounded-lg text-[11px] font-black uppercase tracking-wider shadow">
          Govt Job Alert Portal • 100% Free Alerts
        </div>
      </div>
    </div>
  );
}
