"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Bell, 
  LogOut, 
  Bookmark, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Calendar, 
  ExternalLink, 
  Search,
  Filter,
  Flame,
  ArrowRight,
  ShieldCheck,
  Home
} from "lucide-react";
import JobCard from "@/components/JobCard";

interface UserProfile {
  id: string;
  user_type: string;
  full_name: string;
  email: string;
  mobile?: string;
  qualification: string;
  state: string;
  city: string;
  preferred_categories: string[];
  saved_jobs: string[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"matching" | "all" | "closing_soon">("matching");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>("All");
  const [dashboardSearch, setDashboardSearch] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);

        // Fetch jobs for dashboard
        const jobsRes = await fetch("/api/jobs?limit=100");
        const jobsData = await jobsRes.json();
        setJobs(jobsData.jobs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0b0f19] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-300">Loading your full-screen dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Filter matching jobs based on user profile
  const matchingJobs = jobs.filter((job) => {
    const userQual = (user.qualification || "").toLowerCase();
    const jobQual = (job.qualification || "").toLowerCase();
    const jobQualLevel = (job.qualification_level || "").toLowerCase();

    const qualMatches = 
      jobQual.includes(userQual) || 
      userQual.includes(jobQualLevel) || 
      jobQualLevel.includes(userQual) ||
      (jobQual.includes("graduate") && userQual.includes("b.")) ||
      (userQual.includes("10th") && jobQual.includes("10th")) ||
      (userQual.includes("12th") && jobQual.includes("12th"));

    const stateMatches = 
      job.state === "All India" || 
      (job.state && job.state.toLowerCase().includes(user.state.toLowerCase()));

    const categoryMatches = 
      user.preferred_categories.length === 0 || 
      user.preferred_categories.some(cat => 
        (job.government_field || "").toLowerCase().includes(cat.toLowerCase())
      );

    return qualMatches || stateMatches || categoryMatches;
  });

  const closingSoonJobs = jobs.filter((j) => j.calculatedStatus === "CLOSING SOON");

  let baseList = jobs;
  if (activeTab === "matching") baseList = matchingJobs;
  if (activeTab === "closing_soon") baseList = closingSoonJobs;

  const filteredJobs = baseList.filter((job) => {
    const matchesCategory = selectedFilterCategory === "All" ||
      (job.government_field || "").toLowerCase().includes(selectedFilterCategory.toLowerCase());

    const matchesSearch = !dashboardSearch.trim() ||
      job.post_name.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
      job.organization_name.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
      job.qualification.toLowerCase().includes(dashboardSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* 1. Dedicated Full-Screen Dashboard Top Navigation Bar */}
      <header className="w-full bg-[#0f172a] border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3">
        <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Left: Brand & Dashboard Indicator */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition">
                FJA
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-base sm:text-lg font-black tracking-tight text-white">
                    FREE<span className="text-amber-500">JOB</span>ALERT
                  </span>
                  <span className="bg-indigo-900/80 border border-indigo-700/60 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase hidden sm:inline-block">
                    CANDIDATE PORTAL
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Full Screen Candidate Hub</span>
              </div>
            </Link>
          </div>

          {/* Center: Search across jobs */}
          <div className="relative flex-1 max-w-md mx-2 hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by post, board, exam, qualification..."
              value={dashboardSearch}
              onChange={(e) => setDashboardSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#131b2e] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Right: Quick actions, user badge & logout */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Main Portal</span>
            </Link>

            <Link
              href="/latest-notifications"
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs shadow transition"
            >
              <Bell className="w-3.5 h-3.5 fill-slate-950" />
              <span className="hidden sm:inline">Latest Notifications</span>
              <span className="sm:hidden">Alerts</span>
            </Link>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 bg-[#182032] border border-slate-700/80 px-2.5 py-1 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow">
                {user.full_name ? user.full_name[0].toUpperCase() : "U"}
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <span className="font-extrabold text-white block max-w-[120px] truncate">
                  {user.full_name}
                </span>
                <span className="text-[10px] text-indigo-400 font-semibold">{user.user_type}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-slate-800 hover:bg-red-950/80 hover:text-red-300 hover:border-red-800 border border-slate-700 text-slate-300 p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              title="Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Top Profile Hero Stats Bar (Full Width) */}
      <section className="w-full bg-gradient-to-b from-[#0f172a] to-[#0b0f19] border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full max-w-[1700px] mx-auto space-y-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Welcome back, {user.full_name}! 👋
                </h2>
                <span className="bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Profile Active</span>
                </span>
              </div>

              <div className="flex items-center gap-3 sm:gap-6 text-xs text-slate-400 mt-2 flex-wrap">
                <span className="flex items-center gap-1 text-indigo-300 font-semibold bg-indigo-950/50 border border-indigo-900/60 px-2.5 py-1 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>{user.qualification}</span>
                </span>
                <span className="flex items-center gap-1 text-slate-300 bg-slate-800/50 border border-slate-700 px-2.5 py-1 rounded-lg">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{user.city ? `${user.city}, ${user.state}` : user.state}</span>
                </span>
                <span className="text-slate-400 font-medium">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Quick KPI Badges */}
            <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="bg-[#131b2e] border border-slate-800 p-3 rounded-2xl text-center shadow-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Matched Jobs</span>
                <span className="text-xl sm:text-2xl font-black text-indigo-400 block mt-0.5">
                  {matchingJobs.length}
                </span>
              </div>

              <div className="bg-[#131b2e] border border-slate-800 p-3 rounded-2xl text-center shadow-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Closing Soon</span>
                <span className="text-xl sm:text-2xl font-black text-red-500 block mt-0.5">
                  {closingSoonJobs.length}
                </span>
              </div>

              <div className="bg-[#131b2e] border border-slate-800 p-3 rounded-2xl text-center shadow-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Active</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block mt-0.5">
                  {jobs.length}
                </span>
              </div>
            </div>
          </div>

          {/* Preferred Categories Pills */}
          {user.preferred_categories && user.preferred_categories.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-800/60 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[11px] tracking-wide">
                Tracked Sectors:
              </span>
              {user.preferred_categories.map((cat) => (
                <span
                  key={cat}
                  className="bg-[#161f36] border border-slate-700/80 text-slate-300 px-3 py-0.5 rounded-full text-xs font-semibold"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Main Dashboard Workspace (Expansive Full Width on Wide Monitors) */}
      <main className="w-full flex-1 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Tabs & Category Dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-4 flex-wrap">
          {/* Tab Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("matching")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === "matching"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Recommended For You ({matchingJobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>All Active Vacancies ({jobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("closing_soon")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === "closing_soon"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Clock className="w-4 h-4 text-red-400" />
              <span>Closing Soon ({closingSoonJobs.length})</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2.5 text-xs w-full sm:w-auto justify-end">
            <span className="text-slate-400 font-bold uppercase text-[11px]">Category:</span>
            <select
              value={selectedFilterCategory}
              onChange={(e) => setSelectedFilterCategory(e.target.value)}
              className="bg-[#131b2e] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Railway">Railway</option>
              <option value="SSC">SSC</option>
              <option value="Banking">Banking</option>
              <option value="Police">Police</option>
              <option value="Defence">Defence</option>
              <option value="Teaching">Teaching</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
        </div>

        {/* Mobile Search input if on mobile */}
        <div className="block md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search posts..."
              value={dashboardSearch}
              onChange={(e) => setDashboardSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#131b2e] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Notice Info Card */}
        <div className="bg-gradient-to-r from-indigo-950/80 via-blue-950/70 to-slate-900 border border-indigo-900/60 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs font-black uppercase text-indigo-300">
                Live Verification &amp; Eligibility Match
              </div>
              <p className="text-xs text-slate-300">
                Showing vacancies matched with your qualification (<strong>{user.qualification}</strong>) and state (<strong>{user.state}</strong>).
              </p>
            </div>
          </div>

          <Link
            href="/latest-notifications"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All Latest Notifications Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Job Cards Grid (Expansive 4-column layout on XL screens) */}
        {filteredJobs.length === 0 ? (
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-16 text-center space-y-3">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No jobs found matching your criteria</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try switching tabs or resetting the category filter to explore all available central and state vacancies.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>

      {/* Full-Screen Dashboard Footer */}
      <footer className="w-full bg-[#0a0e17] border-t border-slate-800/80 py-4 px-4 sm:px-8 mt-auto text-center text-xs text-slate-500">
        <p>FreeJobAlert Candidate Portal • Verified Official Government Exam &amp; Job Notifications</p>
      </footer>
    </div>
  );
}
