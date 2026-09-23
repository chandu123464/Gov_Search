import React from "react";
import { Metadata } from "next";
import { getJobs } from "@/lib/jobs-service";
import JobCard from "@/components/JobCard";
import FilterSidebar from "@/components/FilterSidebar";
import { AlertCircle } from "lucide-react";

interface Props {
  params: { param1: string; param2: string };
  searchParams: Record<string, string | undefined>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p1 = decodeURIComponent(params.param1).toUpperCase();
  const p2 = decodeURIComponent(params.param2).toUpperCase();
  return {
    title: `${p1} ${p2} Government Jobs 2026 | GovSearch`,
    description: `Find all latest ${p1} pass ${p2} recruitment notifications, eligibility, and apply online links.`,
  };
}

export default async function CombinedCategoryPage({ params, searchParams }: Props) {
  const qual = decodeURIComponent(params.param1).toUpperCase();
  const field = decodeURIComponent(params.param2);

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 20;

  const result = await getJobs({
    qualification: qual,
    field: field,
    government_level: searchParams.government_level,
    state: searchParams.state,
    status: searchParams.status,
    search: searchParams.search,
    sort: (searchParams.sort as any) || "latest",
    page,
    limit,
  });

  const activeFilters = {
    ...searchParams,
    qualification: qual,
    field: field,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <a href="/" className="hover:text-blue-700">Home</a>
          <span>›</span>
          <a href="/government-jobs" className="hover:text-blue-700">Government Jobs</a>
          <span>›</span>
          <a href={`/government-jobs/${params.param1}`} className="hover:text-blue-700">{qual} Pass</a>
          <span>›</span>
          <span className="font-bold text-slate-800">{field} Jobs</span>
        </nav>

        <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-wide">
          {qual} Pass {field} Recruitment 2026
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Showing {result.jobs.length} jobs matching qualification <strong>{qual}</strong> and field <strong>{field}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4">
          <FilterSidebar currentFilters={activeFilters} />
        </div>

        <div className="lg:col-span-8 space-y-4">
          {result.jobs.length > 0 ? (
            <div className="space-y-4">
              {result.jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                No active jobs found for {qual} in {field}.
              </h3>
              <a
                href="/government-jobs"
                className="inline-block bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Browse All Government Jobs
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

