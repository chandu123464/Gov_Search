import React from "react";
import { Metadata } from "next";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { getJobs } from "@/lib/jobs-service";
import { formatDateIndian } from "@/lib/date-utils";

export const metadata: Metadata = {
  title: "Government Exam Calendar 2026 – Upcoming Exam Dates | GovSearch",
  description: "Annual and monthly government exam schedule for SSC, UPSC, Railway, Banking, Police, and State PSCs.",
};

export default async function ExamCalendarPage() {
  const result = await getJobs({ limit: 12, sort: "last_date" });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span>›</span>
          <span className="font-bold text-slate-800">Exam Calendar</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Government Exam Calendar 2026
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Verified examination dates, admit card schedules, and deadlines
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Recruitment Examination</th>
                <th className="p-3.5">Organization</th>
                <th className="p-3.5">Last Date to Apply</th>
                <th className="p-3.5">Exam Date</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {result.jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 font-bold text-slate-900">
                    <a href={`/job/${job.slug}`} className="hover:text-blue-600">
                      {job.post_name}
                    </a>
                  </td>
                  <td className="p-3.5 text-slate-600">{job.organization_name}</td>
                  <td className="p-3.5 text-red-600 font-bold">{formatDateIndian(job.last_date)}</td>
                  <td className="p-3.5 text-slate-800 font-semibold">
                    {job.exam_date ? formatDateIndian(job.exam_date) : "To be announced"}
                  </td>
                  <td className="p-3.5 text-right">
                    <a
                      href={`/job/${job.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-bold"
                    >
                      Details →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

