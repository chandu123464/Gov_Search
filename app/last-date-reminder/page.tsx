import React from "react";
import { Metadata } from "next";
import { getClosingSoonJobs, getJobs } from "@/lib/jobs-service";
import JobCard from "@/components/JobCard";
import { 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Download, 
  Bell, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import { formatDateIndian, getDaysRemainingText, generateGoogleCalendarUrl } from "@/lib/date-utils";

export const metadata: Metadata = {
  title: "Last Date Reminder : Closing Soon Government Jobs & Online Forms 2026",
  description: "Never miss a Sarkari Naukri deadline. Check jobs closing today, tomorrow, and this week. Download calendar reminders.",
};

export const dynamic = "force-dynamic";

export default async function LastDateReminderPage() {
  const [closingSoonJobs, allActiveJobsResult] = await Promise.all([
    getClosingSoonJobs(15),
    getJobs({ status: "open", sort: "last_date", limit: 20 }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-amber-700 text-white rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-300">
            <Clock className="w-4 h-4 animate-spin" />
            <span>Time-Sensitive Application Alerts</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight">
            Last Date Reminder 2026
          </h1>

          <p className="text-sm md:text-base text-red-100 leading-relaxed">
            Government recruitment servers frequently experience high traffic in the final 24-48 hours. Submit your online forms, pay fees, and upload documents well before the deadlines below.
          </p>
        </div>
      </div>

      {/* Urgent Table View: Closing in 7 Days */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
        <div className="bg-red-50 p-4 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="font-black text-slate-900 text-base uppercase tracking-wide">
              Applications Closing This Week ({closingSoonJobs.length})
            </h2>
          </div>
          <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
            High Priority
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Urgency</th>
                <th className="p-3.5">Recruitment Post &amp; Board</th>
                <th className="p-3.5">Vacancies</th>
                <th className="p-3.5">Last Date</th>
                <th className="p-3.5 text-right">Action / Reminder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {closingSoonJobs.map((job) => {
                const remaining = getDaysRemainingText(job.last_date);
                return (
                  <tr key={job.id} className="hover:bg-red-50/30 transition">
                    <td className="p-3.5">
                      <span className="bg-red-600 text-white font-black px-2 py-1 rounded text-[10px] tracking-wider uppercase inline-block">
                        {remaining.text}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <a
                        href={`/job/${job.slug}`}
                        className="font-bold text-slate-900 hover:text-blue-700 block text-sm"
                      >
                        {job.post_name}
                      </a>
                      <span className="text-slate-500 text-[11px] font-medium">
                        {job.organization_name} • {job.qualification}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">
                      {job.number_of_posts.toLocaleString("en-IN")}
                    </td>
                    <td className="p-3.5 font-black text-red-600">
                      {formatDateIndian(job.last_date)}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <a
                        href={generateGoogleCalendarUrl(job)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg font-bold text-[11px]"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Remind Me</span>
                      </a>
                      <a
                        href={`/job/${job.slug}`}
                        className="inline-flex items-center gap-1 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-lg font-bold text-[11px]"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid of All Jobs Sorted by Last Date */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide">
            All Active Government Jobs Sorted by Deadline
          </h2>
          <p className="text-xs text-slate-500">
            Apply according to closing dates to ensure timely submission
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allActiveJobsResult.jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
