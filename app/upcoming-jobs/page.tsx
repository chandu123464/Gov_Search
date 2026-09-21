import React from "react";
import { Metadata } from "next";
import { getUpcomingJobs } from "@/lib/jobs-service";
import JobCard from "@/components/JobCard";
import { Calendar, Bell, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { formatDateIndian, getDaysRemainingText } from "@/lib/date-utils";

export const metadata: Metadata = {
  title: "Upcoming Government Jobs 2026 : Advance Recruitment Notifications",
  description: "Explore upcoming Sarkari Naukri recruitments for Railway, SSC, Banking, and Police before online applications begin.",
};

export const dynamic = "force-dynamic";

export default async function UpcomingJobsPage() {
  const upcomingJobs = await getUpcomingJobs(20);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-blue-900 text-white rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-sky-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-sky-300">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Advance Recruitment Calendar</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight">
            Upcoming Government Jobs 2026
          </h1>

          <p className="text-sm md:text-base text-sky-100 leading-relaxed">
            Get early access to officially announced notifications. Prepare your eligibility documents, photo scans, and study material before registration windows open.
          </p>
        </div>
      </div>

      {/* Advance Notice Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide">
              Officially Announced Vacancies (Starting Soon)
            </h2>
            <p className="text-xs text-slate-500">
              Online applications will go live on the respective start dates below
            </p>
          </div>
          <span className="text-xs font-bold bg-sky-100 text-sky-800 px-3 py-1 rounded-full">
            {upcomingJobs.length} Upcoming Vacancies
          </span>
        </div>

        {upcomingJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Calendar className="w-12 h-12 text-sky-600 mx-auto mb-3" />
            <h3 className="text-lg font-black text-slate-900">All Announced Forms Are Currently Active</h3>
            <p className="text-xs text-slate-500 mt-1">
              Check back daily for newly released official employment notices.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
