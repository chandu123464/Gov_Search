import React from "react";
import { Metadata } from "next";
import { Award, Search, ArrowRight, ExternalLink, Calendar } from "lucide-react";
import { getJobs } from "@/lib/jobs-service";

export const metadata: Metadata = {
  title: "Sarkari Results 2026 – Latest Government Exam Results | GovSearch",
  description: "Check latest Central & State Government Exam Results, Merit Lists, Scorecards, and Cut-off marks.",
};

export default async function ResultsPage() {
  const result = await getJobs({ limit: 10, sort: "latest" });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span>›</span>
          <span className="font-bold text-slate-800">Results</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Government Exam Results 2026
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Direct official links for newly declared Sarkari Result scorecards and merit lists
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Latest Declared Results &amp; Merit Lists
        </h2>

        <div className="divide-y divide-slate-100 text-sm">
          {result.jobs.slice(0, 8).map((job) => (
            <div key={job.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 px-2 rounded-xl transition">
              <div>
                <span className="text-[11px] font-bold text-blue-600 block uppercase">
                  {job.organization_name}
                </span>
                <span className="font-bold text-slate-900">
                  {job.post_name} Final Result / Merit List
                </span>
              </div>
              <a
                href={job.official_website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg self-start sm:self-auto"
              >
                <span>Check Official Result</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

