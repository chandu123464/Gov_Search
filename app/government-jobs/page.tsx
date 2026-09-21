import React from "react";
import { getJobs } from "@/lib/jobs-service";
import JobCard from "@/components/JobCard";
import FilterSidebar from "@/components/FilterSidebar";
import { 
  Search, 
  RotateCcw, 
  Briefcase, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle 
} from "lucide-react";

interface Props {
  searchParams: {
    qualification?: string;
    field?: string;
    government_level?: string;
    state?: string;
    status?: string;
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  };
}

export const dynamic = "force-dynamic";

export default async function GovernmentJobsPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 20;

  const result = await getJobs({
    qualification: searchParams.qualification,
    field: searchParams.field,
    government_level: searchParams.government_level,
    state: searchParams.state,
    status: searchParams.status,
    search: searchParams.search,
    sort: (searchParams.sort as any) || "latest",
    page,
    limit,
  });

  const { jobs, pagination } = result;

  // Build pagination URL helper
  const createPageUrl = (targetPage: number) => {
    const p = new URLSearchParams();
    if (searchParams.qualification) p.set("qualification", searchParams.qualification);
    if (searchParams.field) p.set("field", searchParams.field);
    if (searchParams.government_level) p.set("government_level", searchParams.government_level);
    if (searchParams.state) p.set("state", searchParams.state);
    if (searchParams.status) p.set("status", searchParams.status);
    if (searchParams.search) p.set("search", searchParams.search);
    if (searchParams.sort) p.set("sort", searchParams.sort);
    if (searchParams.limit) p.set("limit", searchParams.limit);
    p.set("page", String(targetPage));
    return `/government-jobs?${p.toString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumbs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <a href="/" className="hover:text-blue-700">Home</a>
          <span>›</span>
          <span className="font-bold text-slate-800">Government Jobs</span>
          {searchParams.qualification && (
            <>
              <span>›</span>
              <span className="text-blue-700 font-bold">{searchParams.qualification} Pass</span>
            </>
          )}
          {searchParams.field && (
            <>
              <span>›</span>
              <span className="text-purple-700 font-bold">{searchParams.field}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-wide">
              {searchParams.qualification
                ? `${searchParams.qualification} Pass Government Jobs 2026`
                : searchParams.field
                ? `${searchParams.field} Recruitment 2026`
                : "All Government Jobs & Sarkari Vacancies 2026"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {jobs.length > 0 ? (page - 1) * limit + 1 : 0} –{" "}
              {Math.min(page * limit, pagination.total)} of{" "}
              <strong>{pagination.total.toLocaleString("en-IN")}</strong> verified recruitments
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-xl font-bold">
              {pagination.total} Matching Jobs
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar (4 cols) */}
        <div className="lg:col-span-4">
          <FilterSidebar currentFilters={searchParams} />
        </div>

        {/* Right Listings Area (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Job Cards */}
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            /* EMPTY STATE (Section 27 of prompt) */
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  No government jobs found for your selected filters.
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Try broadening your search or adjusting your Educational Qualification, Government Field, or State filters.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <a
                  href="/government-jobs"
                  className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow"
                >
                  Clear All Filters
                </a>
                <a
                  href="/government-jobs/10th"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition"
                >
                  View 10th Pass Jobs
                </a>
                <a
                  href="/government-jobs/12th"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition"
                >
                  View 12th Pass Jobs
                </a>
              </div>
            </div>
          )}

          {/* Server-Side Pagination */}
          {pagination.totalPages > 1 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3 flex-wrap">
              <div className="text-xs text-slate-500 font-medium">
                Page <strong>{page}</strong> of <strong>{pagination.totalPages}</strong>
              </div>

              <div className="flex items-center gap-1.5">
                {page > 1 ? (
                  <a
                    href={createPageUrl(page - 1)}
                    className="p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </a>
                ) : (
                  <span className="p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-300 cursor-not-allowed flex items-center gap-1">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </span>
                )}

                {/* Page number buttons */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pNum) => (
                  <a
                    key={pNum}
                    href={createPageUrl(pNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-black flex items-center justify-center transition ${
                      pNum === page
                        ? "bg-blue-700 text-white shadow-sm"
                        : "border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {pNum}
                  </a>
                ))}

                {page < pagination.totalPages ? (
                  <a
                    href={createPageUrl(page + 1)}
                    className="p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-300 cursor-not-allowed flex items-center gap-1">
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
