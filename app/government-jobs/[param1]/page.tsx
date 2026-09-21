import React from "react";
import { Metadata } from "next";
import { getJobs } from "@/lib/jobs-service";
import JobCard from "@/components/JobCard";
import FilterSidebar from "@/components/FilterSidebar";
import { AlertCircle } from "lucide-react";

interface Props {
  params: { param1: string };
  searchParams: Record<string, string | undefined>;
}

// Helper to determine whether param is qualification or government field
function resolveParam(raw: string): { qualification?: string; field?: string; title: string } {
  const norm = decodeURIComponent(raw).toLowerCase().trim();

  // Qualification mappings
  const qualMap: Record<string, string> = {
    "10th": "10TH",
    "8th": "8TH",
    "12th": "12TH",
    "diploma": "DIPLOMA",
    "iti": "ITI",
    "graduate": "ANY GRADUATE",
    "btech": "B.TECH/B.E",
    "engineering": "ENGINEERING",
    "bcom": "B.COM",
    "bsc": "B.SC",
    "ba": "BA",
    "mba": "MBA",
    "postgraduate": "ANY POST GRADUATE",
  };

  if (qualMap[norm]) {
    return {
      qualification: qualMap[norm],
      title: `${qualMap[norm]} Pass Government Jobs 2026`,
    };
  }

  // Field mappings
  const fieldMap: Record<string, string> = {
    "ssc": "SSC",
    "railway": "Railway",
    "banking": "Banking",
    "police": "Police",
    "defence": "Defence",
    "postal": "Postal",
    "teaching": "Teaching",
    "engineering": "Engineering",
    "healthcare": "Healthcare",
  };

  if (fieldMap[norm]) {
    return {
      field: fieldMap[norm],
      title: `${fieldMap[norm]} Recruitment & Government Jobs 2026`,
    };
  }

  return {
    qualification: norm.toUpperCase(),
    title: `${raw} Government Jobs 2026`,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = resolveParam(params.param1);
  return {
    title: `${resolved.title} | FreeJobAlert.Com`,
    description: `Latest notifications, vacancy details, eligibility, syllabus, and online application links for ${resolved.title}.`,
  };
}

export default async function DynamicCategoryPage({ params, searchParams }: Props) {
  const resolved = resolveParam(params.param1);

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 20;

  const result = await getJobs({
    qualification: resolved.qualification || searchParams.qualification,
    field: resolved.field || searchParams.field,
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
    qualification: resolved.qualification || searchParams.qualification,
    field: resolved.field || searchParams.field,
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <a href="/" className="hover:text-blue-700">Home</a>
          <span>›</span>
          <a href="/government-jobs" className="hover:text-blue-700">Government Jobs</a>
          <span>›</span>
          <span className="font-bold text-slate-800">{resolved.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-wide">
              {resolved.title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {result.jobs.length} of <strong>{result.pagination.total}</strong> active recruitment notices
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-xl font-bold">
              {result.pagination.total} Vacancies Available
            </span>
          </div>
        </div>
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
                No active jobs currently found under {resolved.title}.
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
