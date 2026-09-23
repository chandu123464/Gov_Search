import React from "react";
import { Metadata } from "next";
import { BookOpen, Search, ArrowRight, ExternalLink } from "lucide-react";
import { getJobs } from "@/lib/jobs-service";

export const metadata: Metadata = {
  title: "Sarkari Exam Syllabus 2026 – Download PDF & Exam Pattern | GovSearch",
  description: "Official syllabus, exam pattern, subject-wise weightages and topic breakdown for Central and State government exams.",
};

export default async function SyllabusPage() {
  const result = await getJobs({ limit: 12, sort: "latest" });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span>›</span>
          <span className="font-bold text-slate-800">Syllabus</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sarkari Exam Syllabus &amp; Pattern 2026
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Subject-wise marking schemes, negative marking rules, and official syllabus PDF links
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                {job.organization_name}
              </span>
              <h3 className="text-sm font-black text-slate-900 mt-0.5">
                {job.post_name} Syllabus
              </h3>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                Selection Process: {job.selection_process}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">{job.qualification_level} Level</span>
              <a
                href={`/job/${job.slug}#syllabus-section`}
                className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View Pattern</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

