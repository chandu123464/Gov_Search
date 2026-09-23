import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobByIdOrSlug, getJobs } from "@/lib/jobs-service";
import RecruitmentPosterCard from "@/components/RecruitmentPosterCard";
import JobCard from "@/components/JobCard";
import JobSyllabusSection from "@/components/JobSyllabusSection";
import { 
  formatDateIndian, 
  getDaysRemainingText, 
  generateGoogleCalendarUrl, 
  generateIcsData 
} from "@/lib/date-utils";
import { 
  Building, 
  MapPin, 
  Calendar, 
  Coins, 
  GraduationCap, 
  Users, 
  CreditCard, 
  CheckCircle, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Share2, 
  Download,
  Info,
  BookOpen
} from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJobByIdOrSlug(params.slug);
  if (!job) {
    return { title: "Job Notification Not Found | GovSearch" };
  }

  const lastDateFormatted = formatDateIndian(job.last_date);

  return {
    title: `${job.post_name} Recruitment 2026 – Vacancy, Eligibility, Salary & Apply Online | ${job.organization_name}`,
    description: `${job.organization_name} has announced ${job.number_of_posts} posts for ${job.post_name}. Qualification: ${job.qualification}. Last Date to apply is ${lastDateFormatted}. Check full eligibility and apply online.`,
    openGraph: {
      title: `${job.post_name} Recruitment 2026 - ${job.organization_name}`,
      description: `Total Vacancies: ${job.number_of_posts}. Salary: ${job.salary_text}. Last date: ${lastDateFormatted}`,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const job = await getJobByIdOrSlug(params.slug);

  if (!job) {
    notFound();
  }

  // Fetch similar jobs by qualification or field
  const similarJobsResult = await getJobs({
    qualification: job.qualification_level,
    limit: 3,
  });
  const similarJobs = similarJobsResult.jobs.filter((j) => j.id !== job.id);

  const remaining = getDaysRemainingText(job.last_date, job.start_date);
  const formattedStartDate = formatDateIndian(job.start_date);
  const formattedLastDate = formatDateIndian(job.last_date);
  const formattedNotificationDate = formatDateIndian(job.notification_date);
  const formattedExamDate = formatDateIndian(job.exam_date);
  const formattedAdmitCardDate = formatDateIndian(job.admit_card_date);
  const formattedResultDate = formatDateIndian(job.result_date);

  return (
    <div className="space-y-8">
      {/* 29. BREADCRUMBS (Clickable) */}
      <nav className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <a href="/" className="hover:text-blue-700">Home</a>
        <span>›</span>
        <a href="/government-jobs" className="hover:text-blue-700">Government Jobs</a>
        <span>›</span>
        <a href={`/government-jobs/${job.qualification_level.toLowerCase()}`} className="hover:text-blue-700">
          {job.qualification_level} Pass Jobs
        </a>
        <span>›</span>
        <a href={`/government-jobs?field=${encodeURIComponent(job.government_field)}`} className="hover:text-blue-700">
          {job.government_field} Jobs
        </a>
        <span>›</span>
        <span className="font-bold text-slate-900 truncate max-w-xs">{job.post_name}</span>
      </nav>

      {/* Main Grid: Left Detailed Sections (8 cols) + Right Infographic Poster Spotlight (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Full Comprehensive 16-point Structure */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="bg-blue-100 text-blue-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                {job.government_level}
              </span>

              <span
                className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                  job.calculatedStatus === "CLOSING SOON"
                    ? "bg-red-600 text-white animate-pulse"
                    : job.calculatedStatus === "UPCOMING"
                    ? "bg-sky-100 text-sky-800"
                    : job.calculatedStatus === "CLOSED"
                    ? "bg-slate-200 text-slate-700"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {job.calculatedStatus} • {remaining.text}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase leading-tight">
              {job.post_name} Recruitment 2026
            </h1>

            <div className="text-sm font-bold text-blue-700 flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span>{job.organization_name} ({job.department})</span>
            </div>

            {/* Quick Hero Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Vacancies</span>
                <span className="text-base font-black text-red-600">
                  {job.number_of_posts.toLocaleString("en-IN")} Posts
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Pay Scale</span>
                <span className="text-xs font-black text-amber-600">
                  {job.salary_text}
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Date</span>
                <span className="text-sm font-black text-red-600">
                  {formattedLastDate}
                </span>
              </div>
            </div>

            {/* Quick Syllabus Jump Link */}
            <div className="pt-1">
              <a
                href="#syllabus-section"
                className="inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold px-3 py-1.5 rounded-lg transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Jump to Syllabus, Topics &amp; Weightages ➔</span>
              </a>
            </div>
          </div>

          {/* 1. Job Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span>1. Job Overview &amp; Description</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {job.job_description}
            </p>
          </div>

          {/* 10. Important Dates Schedule */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sky-600" />
                <span>Important Dates Schedule</span>
              </h3>
              <a
                href={generateGoogleCalendarUrl(job)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Add Google Reminder</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {job.notification_date && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                  <span className="text-slate-500 font-medium">Notification Release Date:</span>
                  <span className="font-black text-slate-900">{formattedNotificationDate}</span>
                </div>
              )}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between">
                <span className="text-emerald-800 font-medium">Online Application Start:</span>
                <span className="font-black text-emerald-900">{formattedStartDate}</span>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex justify-between">
                <span className="text-red-800 font-medium">Application Last Date:</span>
                <span className="font-black text-red-900">{formattedLastDate}</span>
              </div>
              {job.exam_date && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                  <span className="text-slate-500 font-medium">Examination Date:</span>
                  <span className="font-black text-slate-900">{formattedExamDate}</span>
                </div>
              )}
              {job.admit_card_date && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                  <span className="text-slate-500 font-medium">Admit Card Release:</span>
                  <span className="font-black text-slate-900">{formattedAdmitCardDate}</span>
                </div>
              )}
              {job.result_date && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                  <span className="text-slate-500 font-medium">Result Announcement:</span>
                  <span className="font-black text-slate-900">{formattedResultDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* 9. Category-Wise Application Fees */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span>Category-Wise Application Fee</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">General</span>
                <span className="text-sm font-black text-slate-900">{job.application_fee_general}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">OBC</span>
                <span className="text-sm font-black text-slate-900">{job.application_fee_obc}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">EWS</span>
                <span className="text-sm font-black text-slate-900">{job.application_fee_ews || "₹100"}</span>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-center">
                <span className="text-emerald-700 block text-[10px] uppercase font-bold">SC / ST</span>
                <span className="text-sm font-black text-emerald-800">{job.application_fee_sc_st}</span>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-center">
                <span className="text-emerald-700 block text-[10px] uppercase font-bold">Female</span>
                <span className="text-sm font-black text-emerald-800">{job.application_fee_female || "₹0"}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">PwD</span>
                <span className="text-sm font-black text-slate-900">{job.application_fee_pwd || "₹0"}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              * Payment Mode: Net Banking, Debit/Credit Card, UPI or SBI Challan where applicable.
            </p>
          </div>

          {/* Eligibility & Qualifications */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <span>Eligibility &amp; Educational Qualification</span>
            </h3>

            <div className="space-y-2 text-sm text-slate-700">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <strong className="text-emerald-950 block text-xs uppercase">Minimum Required Qualification:</strong>
                <span className="text-sm font-bold text-emerald-900">{job.qualification}</span>
              </div>
              <p className="leading-relaxed whitespace-pre-line text-xs">{job.eligibility}</p>
            </div>
          </div>

          {/* Age Limit & Relaxation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Age Limit &amp; Relaxation Norms</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Minimum Age</span>
                <span className="text-base font-black text-slate-900">{job.age_min || 18} Years</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Maximum Age</span>
                <span className="text-base font-black text-slate-900">{job.age_max || 35} Years</span>
              </div>
            </div>

            {job.age_relaxation && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
                <strong>Age Relaxation:</strong> {job.age_relaxation}
              </div>
            )}
          </div>

          {/* Selection Process */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Selection Process Stages</span>
            </h3>
            <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {job.selection_process}
            </p>
          </div>

          {/* Exam Pattern & Syllabus Section */}
          <JobSyllabusSection
            slug={job.slug}
            field={job.government_field}
            postName={job.post_name}
            officialNotificationUrl={job.official_notification_url}
          />

          {/* Required Documents */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-600" />
              <span>Required Documents Checklist</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-xl">
              {job.required_documents}
            </p>
          </div>

          {/* How to Apply */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>How to Apply Step-by-Step</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-xl">
              {job.how_to_apply || "Visit the official recruitment portal and follow application guidelines."}
            </p>
          </div>

          {/* 21. OFFICIAL WEBSITE SAFETY & IMPORTANT LINKS */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="text-lg font-black uppercase tracking-wide">
                  Official Verified Application Links
                </h3>
                <p className="text-xs text-blue-200">
                  Direct official links. Always apply through official government servers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {/* Apply Online Button */}
              <a
                href={job.application_url || job.official_website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black p-3.5 rounded-xl shadow-lg transition flex flex-col items-center justify-center text-center group"
              >
                <span className="text-xs uppercase tracking-wider text-slate-900">Online Registration</span>
                <span className="text-base uppercase tracking-wide flex items-center gap-1 mt-0.5">
                  Apply Online ➔
                </span>
              </a>

              {/* Official Notification PDF */}
              {job.official_notification_url ? (
                <a
                  href={job.official_notification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 p-3.5 rounded-xl transition flex flex-col items-center justify-center text-center"
                >
                  <span className="text-[11px] text-slate-300 uppercase font-bold">Official PDF</span>
                  <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                    View Notification <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                  </span>
                </a>
              ) : (
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-center justify-center text-slate-400 text-xs text-center">
                  PDF will be updated soon
                </div>
              )}

              {/* Official Website Portal */}
              <a
                href={job.official_website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 p-3.5 rounded-xl transition flex flex-col items-center justify-center text-center"
              >
                <span className="text-[11px] text-slate-300 uppercase font-bold">Recruiter Portal</span>
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1 mt-0.5 truncate max-w-[160px]">
                  Official Website <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Recruitment Infographic Poster Card Spotlight */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>Recruitment Poster Card</span>
              </span>
              <span className="text-[10px] text-slate-500 font-bold">Share / Print</span>
            </div>
            <RecruitmentPosterCard job={job as any} />
          </div>

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h4 className="text-sm font-black uppercase text-slate-900 border-b border-slate-100 pb-2">
                Similar Government Jobs
              </h4>
              <div className="space-y-2">
                {similarJobs.map((sJob) => (
                  <a
                    key={sJob.id}
                    href={`/job/${sJob.slug}`}
                    className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition"
                  >
                    <span className="text-[11px] text-blue-700 font-bold block uppercase">
                      {sJob.organization_name}
                    </span>
                    <span className="text-xs font-black text-slate-900 block mt-0.5">
                      {sJob.post_name}
                    </span>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                      <span>{sJob.number_of_posts} Posts</span>
                      <span className="text-red-600 font-bold">
                        Last Date: {formatDateIndian(sJob.last_date)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

