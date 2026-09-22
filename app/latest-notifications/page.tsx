"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  Search, 
  Calendar, 
  Clock, 
  Building, 
  GraduationCap, 
  Sparkles, 
  ExternalLink, 
  ArrowRight,
  Filter,
  CheckCircle2,
  X
} from "lucide-react";
import RecruitmentPosterCard from "@/components/RecruitmentPosterCard";
import { formatDateIndian, getDaysRemainingText } from "@/lib/date-utils";

export default function LatestNotificationsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPosterJob, setSelectedPosterJob] = useState<any | null>(null);

  useEffect(() => {
    async function fetchLatestJobs() {
      try {
        const res = await fetch("/api/jobs?limit=100&sort=latest");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestJobs();
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPosterJob(null);
    };
    if (selectedPosterJob) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPosterJob]);

  const categories = [
    "All",
    "SSC",
    "Railway",
    "Banking",
    "Police",
    "Defence",
    "Teaching",
    "Engineering",
    "State PSC"
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (job.government_field || "").toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      !searchQuery.trim() ||
      job.post_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.organization_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.state || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      {/* Breadcrumb */}
      <nav className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>›</span>
        <span className="font-bold text-slate-900">Latest Notifications</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071329] via-[#0b1c3d] to-[#040c1c] text-white rounded-2xl p-6 shadow-md border border-blue-900/40 space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-400 text-slate-950 rounded-xl shadow">
            <Bell className="w-5 h-5 fill-slate-950 animate-bounce" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
              Latest Notifications 2026
            </h1>
            <p className="text-xs text-slate-300">
              Daily verified Sarkari Naukri, Central &amp; State government recruitment announcements across India
            </p>
          </div>
        </div>

        {/* Search Bar & Stats */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search notifications by post, department, qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-blue-800/60 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="text-xs text-slate-300 flex items-center gap-2 font-medium">
            <span>Showing <strong className="text-amber-400">{filteredJobs.length}</strong> active notifications</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
                selectedCategory === cat
                  ? "bg-amber-400 text-slate-950 border-amber-400 shadow"
                  : "bg-blue-950/60 text-slate-300 border-blue-800/50 hover:bg-blue-900 hover:text-white"
              }`}
            >
              {cat === "All" ? "All Notifications" : `${cat} Jobs`}
            </button>
          ))}
        </div>
      </div>

      {/* FreeJobAlert Table View */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
          Loading latest official recruitment notifications...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-2">
          <p className="text-base font-bold text-slate-800">No notifications found matching your search</p>
          <p className="text-xs text-slate-500">Try clearing the search box or selecting another category.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0366d6] text-white uppercase text-[11px] font-black tracking-wider border-b border-blue-700">
                  <th className="py-3 px-3.5 whitespace-nowrap">Post Date</th>
                  <th className="py-3 px-3.5">Recruitment Board</th>
                  <th className="py-3 px-3.5">Post Name</th>
                  <th className="py-3 px-3.5">Qualification</th>
                  <th className="py-3 px-3 text-center whitespace-nowrap">Vacancies</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Last Date</th>
                  <th className="py-3 px-3 text-center whitespace-nowrap">More Information</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.map((job, idx) => {
                  const remaining = getDaysRemainingText(job.last_date, job.start_date);
                  const isClosingSoon = job.calculatedStatus === "CLOSING SOON";

                  return (
                    <tr 
                      key={job.id} 
                      className={`hover:bg-blue-50/60 transition ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      }`}
                    >
                      {/* Post Date */}
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-600 font-semibold">
                        {formatDateIndian(job.start_date)}
                      </td>

                      {/* Recruitment Board */}
                      <td className="py-3 px-3.5 font-bold text-blue-900">
                        <span>{job.organization_name}</span>
                        {job.department && (
                          <span className="block text-[11px] text-slate-500 font-normal">
                            {job.department}
                          </span>
                        )}
                      </td>

                      {/* Post Name */}
                      <td className="py-3 px-3.5">
                        <Link 
                          href={`/job/${job.slug}`}
                          className="font-extrabold text-slate-900 hover:text-blue-700 block line-clamp-2"
                        >
                          {job.post_name}
                        </Link>
                        <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded mt-1">
                          {job.government_field}
                        </span>
                      </td>

                      {/* Qualification */}
                      <td className="py-3 px-3.5 text-slate-700 font-medium">
                        {job.qualification}
                      </td>

                      {/* Vacancies */}
                      <td className="py-3 px-3 text-center font-black text-red-600 whitespace-nowrap">
                        {job.number_of_posts.toLocaleString("en-IN")}
                      </td>

                      {/* Last Date */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="font-extrabold text-slate-900">
                          {formatDateIndian(job.last_date)}
                        </div>
                        {isClosingSoon ? (
                          <span className="text-[10px] font-black text-red-600 animate-pulse block">
                            Closing Soon ({remaining.text})
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-700 font-bold block">
                            {remaining.text}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link
                            href={`/job/${job.slug}`}
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition shadow-sm"
                          >
                            Get Details
                          </Link>

                          <button
                            onClick={() => setSelectedPosterJob(job)}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition flex items-center gap-1"
                            title="View Poster Card"
                          >
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>Poster</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Poster Preview Modal with X Close Button */}
      {selectedPosterJob && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPosterJob(null);
          }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6"
        >
          {/* Floating Screen-Corner Close Button (ALWAYS VISIBLE in top right of screen) */}
          <button
            onClick={() => setSelectedPosterJob(null)}
            aria-label="Close poster card"
            title="Close Poster (Esc)"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-red-600 hover:bg-red-700 text-white font-black rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 border-2 border-white cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[3]" />
          </button>

          <div className="relative w-full max-w-xl mx-auto my-6 sm:my-10">
            <RecruitmentPosterCard 
              job={selectedPosterJob} 
              onClose={() => setSelectedPosterJob(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

