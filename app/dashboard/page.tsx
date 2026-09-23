"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Mail,
  Bell, 
  LogOut, 
  Bookmark, 
  Sparkles, 
  Clock, 
  Calendar, 
  Search,
  ArrowRight,
  ShieldCheck,
  Home,
  Users,
  Coins,
  UserCheck,
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import EmblemLogo from "@/components/EmblemLogo";
import GovEmblem from "@/components/GovEmblem";
import RecruitmentPosterCard from "@/components/RecruitmentPosterCard";
import { 
  calculateJobStatus, 
  formatDateIndian, 
  getDaysRemainingText, 
  generateGoogleCalendarUrl 
} from "@/lib/date-utils";

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
  const [activeTab, setActiveTab] = useState<"matching" | "all" | "closing_soon" | "saved">("matching");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [activePosterJob, setActivePosterJob] = useState<any | null>(null);

  // Load candidate profile from localStorage or mock session
  useEffect(() => {
    try {
      const stored = localStorage.getItem("govsearch_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default candidate profile matching user identity & screenshot
        const demoUser: UserProfile = {
          id: "demo-cand-01",
          user_type: "Job seeker",
          full_name: "Karaka Sai chandra sekhar",
          email: "saichandrasekhark@gmail.com",
          qualification: "MCA",
          state: "Karnataka",
          city: "Bengaluru",
          preferred_categories: ["Banking", "SSC", "Railways", "UPSC", "Teaching", "Govt Engineering"],
          saved_jobs: ["ssc-chsl-2026"]
        };
        setUser(demoUser);
        localStorage.setItem("govsearch_user", JSON.stringify(demoUser));
      }
    } catch {
      // Fallback
    }
  }, []);

  // Fetch verified recruitment jobs from API
  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setJobs(data.jobs || []);
        }
      } catch (err) {
        console.error("Failed to fetch jobs in dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("govsearch_user");
    router.push("/login");
  };

  const handleToggleSave = (jobSlug: string) => {
    if (!user) return;
    const currentSaved = user.saved_jobs || [];
    const updatedSaved = currentSaved.includes(jobSlug)
      ? currentSaved.filter((slug) => slug !== jobSlug)
      : [...currentSaved, jobSlug];

    const updatedUser = { ...user, saved_jobs: updatedSaved };
    setUser(updatedUser);
    localStorage.setItem("govsearch_user", JSON.stringify(updatedUser));
  };

  // Distinct categories available across jobs
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.government_field) set.add(j.government_field);
    });
    ["Banking", "SSC", "Railways", "UPSC", "Defence", "Teaching", "Police", "PSU", "Govt Engineering"].forEach((c) => set.add(c));
    return Array.from(set).sort();
  }, [jobs]);

  // Filter jobs based on active tab, category dropdown, and search text
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Category dropdown filter
    if (selectedCategory && selectedCategory !== "All Categories") {
      const catLower = selectedCategory.toLowerCase();
      result = result.filter(
        (j) =>
          j.government_field?.toLowerCase() === catLower ||
          j.organization_name?.toLowerCase().includes(catLower) ||
          j.post_name?.toLowerCase().includes(catLower)
      );
    }

    // Search filter
    if (dashboardSearch.trim()) {
      const q = dashboardSearch.toLowerCase();
      result = result.filter(
        (j) =>
          j.post_name?.toLowerCase().includes(q) ||
          j.organization_name?.toLowerCase().includes(q) ||
          j.government_field?.toLowerCase().includes(q) ||
          j.qualification_level?.toLowerCase().includes(q) ||
          j.state?.toLowerCase().includes(q)
      );
    }

    // Tab filter
    if (activeTab === "matching" && user) {
      const userQual = (user.qualification || "").toLowerCase();
      const userCats = (user.preferred_categories || []).map((c) => c.toLowerCase());

      result = result.filter((j) => {
        const jobQual = (j.qualification_level || "").toLowerCase();
        const jobField = (j.government_field || "").toLowerCase();
        const matchQual = userQual.includes(jobQual) || jobQual.includes("10") || jobQual.includes("12") || jobQual.includes("graduate") || jobQual.includes("mca");
        const matchCat = userCats.some((cat) => jobField.includes(cat) || j.organization_name?.toLowerCase().includes(cat));
        return matchQual || matchCat;
      });
    } else if (activeTab === "closing_soon") {
      result = result.filter((j) => {
        const status = calculateJobStatus(j.start_date, j.last_date);
        return status === "CLOSING SOON";
      });
    } else if (activeTab === "saved" && user) {
      const savedList = user.saved_jobs || [];
      result = result.filter((j) => savedList.includes(j.slug) || savedList.includes(j.id));
    }

    return result;
  }, [jobs, activeTab, selectedCategory, dashboardSearch, user]);

  // Statistics
  const stats = useMemo(() => {
    const total = jobs.length;
    const closingSoonCount = jobs.filter(
      (j) => calculateJobStatus(j.start_date, j.last_date) === "CLOSING SOON"
    ).length;
    const savedCount = user?.saved_jobs?.length || 0;
    const matchedCount = jobs.filter((j) => {
      if (!user) return true;
      const userCats = (user.preferred_categories || []).map((c) => c.toLowerCase());
      return userCats.some((cat) => j.government_field?.toLowerCase().includes(cat));
    }).length;

    return { total, closingSoonCount, savedCount, matchedCount };
  }, [jobs, user]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand & Hub Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center p-1.5 shadow-2xs">
                <GovEmblem className="w-full h-full text-blue-900" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-slate-900 tracking-tight">
                    Gov<span className="text-blue-600">Search</span>
                  </span>
                  <span className="bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-md uppercase hidden sm:inline-block">
                    CANDIDATE DASHBOARD
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Verified Government Jobs Hub</span>
              </div>
            </Link>
          </div>

          {/* Center: Search across dashboard jobs */}
          <div className="relative flex-1 max-w-md mx-2 hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search your vacancies by post, department, keyword..."
              value={dashboardSearch}
              onChange={(e) => setDashboardSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
            />
          </div>

          {/* Right: User profile chip & Logout */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded-lg transition hover:bg-slate-100"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Public Portal</span>
            </Link>

            <Link
              href="/latest-notifications"
              className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-xl text-xs border border-blue-200 transition"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Notifications</span>
            </Link>

            {user && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                  {user.full_name?.charAt(0).toUpperCase() || "K"}
                </div>
                <div className="hidden sm:block text-left text-xs leading-tight">
                  <span className="font-extrabold text-slate-900 block max-w-[120px] truncate">
                    {user.full_name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{user.qualification}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Candidate Profile Summary Banner */}
        {user && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-blue-50/80 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Welcome back, <span className="text-blue-600">{user.full_name}!</span> 👋
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    PROFILE ACTIVE
                  </span>
                </div>

                {/* Candidate Credential Tags */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-xl font-semibold border border-slate-200/70">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                    {user.qualification}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-xl font-semibold border border-slate-200/70">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {user.city}, {user.state}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-xl font-semibold border border-slate-200/70">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {user.email}
                  </span>
                </div>

                {/* Tracked Sectors Row matching screenshot */}
                <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    TRACKED SECTORS:
                  </span>
                  {user.preferred_categories?.map((cat) => (
                    <span
                      key={cat}
                      className="bg-blue-50/80 hover:bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-lg font-semibold border border-blue-200/80 transition"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Statistics Overview Cards matching screenshot */}
              <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                <div className="bg-blue-50/70 border border-blue-100/90 rounded-2xl p-4 text-center min-w-[100px] shadow-2xs">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">
                    MATCHED JOBS
                  </span>
                  <span className="text-3xl font-black text-blue-600 block">{stats.matchedCount}</span>
                </div>
                <div className="bg-red-50/70 border border-red-100/90 rounded-2xl p-4 text-center min-w-[100px] shadow-2xs">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">
                    CLOSING SOON
                  </span>
                  <span className="text-3xl font-black text-red-600 block">{stats.closingSoonCount}</span>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-100/90 rounded-2xl p-4 text-center min-w-[100px] shadow-2xs">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1">
                    TOTAL ACTIVE
                  </span>
                  <span className="text-3xl font-black text-emerald-600 block">{stats.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation & Controls with CATEGORY SECTION */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          {/* Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab("matching")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 ${
                activeTab === "matching"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended For You ({stats.matchedCount})</span>
            </button>

            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 ${
                activeTab === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>All Active Vacancies ({stats.total})</span>
            </button>

            <button
              onClick={() => setActiveTab("closing_soon")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 ${
                activeTab === "closing_soon"
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Closing Soon ({stats.closingSoonCount})</span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 ${
                activeTab === "saved"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved Jobs ({stats.savedCount})</span>
            </button>
          </div>

          {/* Right: CATEGORY Section Dropdown matching user uploaded image */}
          <div className="flex items-center gap-2.5 justify-end flex-shrink-0">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              CATEGORY:
            </span>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="All Categories">All Categories</option>
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FULL WIDTH HORIZONTAL JOB CARDS LIST — USER REQUESTED PATTERN */}
        {/* ============================================================== */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl border border-slate-200 p-6 animate-pulse space-y-4"
              >
                <div className="h-6 bg-slate-200 rounded w-1/3" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
                <div className="h-10 bg-slate-50 rounded" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-3">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No recruitment jobs found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              No vacancies matched &quot;{selectedCategory}&quot; under the current tab. Try selecting &quot;All Categories&quot; or &quot;All Active Vacancies&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setActiveTab("all");
                setDashboardSearch("");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map((job) => {
              const status = calculateJobStatus(job.start_date, job.last_date);
              const remaining = getDaysRemainingText(job.last_date, job.start_date);
              const formattedLastDate = formatDateIndian(job.last_date);
              const isSaved = user?.saved_jobs?.includes(job.slug) || user?.saved_jobs?.includes(job.id);

              return (
                <div
                  key={job.id || job.slug}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative group"
                >
                  {/* Left Column: Organization Emblem + Information */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <EmblemLogo
                      type={job.organization_name || job.government_field}
                      size={52}
                      className="flex-shrink-0 mt-1"
                    />

                    <div className="space-y-2 flex-1 min-w-0">
                      {/* Organization Name + Status Badge */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                          {job.organization_name}
                        </span>

                        {status === "OPEN" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            Open
                          </span>
                        )}
                        {status === "CLOSING SOON" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                            Closing Soon ({remaining.days} days)
                          </span>
                        )}
                        {status === "UPCOMING" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-100 text-purple-900 border border-purple-300">
                            Upcoming
                          </span>
                        )}
                      </div>

                      {/* Post Name Title */}
                      <Link
                        href={`/job/${job.slug}`}
                        className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition block leading-snug"
                      >
                        {job.post_name}
                      </Link>

                      {/* Attribute Pills */}
                      <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-100">
                          {job.government_level}
                        </span>
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                          {job.government_field}
                        </span>
                        <span className="bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-md border border-amber-200/80">
                          {job.qualification_level} Pass
                        </span>
                        {job.state && job.state !== "All India" && (
                          <span className="flex items-center gap-1 text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {job.state}
                          </span>
                        )}
                      </div>

                      {/* 4-Column Key Metrics Spec Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">Vacancies</span>
                            <span className="font-extrabold text-slate-900">
                              {job.number_of_posts?.toLocaleString("en-IN")} Posts
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Coins className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">Pay Scale</span>
                            <span className="font-extrabold text-slate-900">
                              {job.salary_text || "As per Rules"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-700">
                          <UserCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">Age Limit</span>
                            <span className="font-extrabold text-slate-900">
                              {job.age_min || 18}–{job.age_max || 27} Yrs
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">Last Date</span>
                            <span className="font-extrabold text-red-600">
                              {formattedLastDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex sm:flex-row lg:flex-col items-center justify-between lg:justify-center gap-2.5 pt-3 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-100 flex-shrink-0">
                    <Link
                      href={`/job/${job.slug}`}
                      className="w-full sm:w-auto lg:w-44 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition shadow-sm hover:shadow flex items-center justify-center gap-2 text-center"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center gap-2 w-full justify-center">
                      <button
                        type="button"
                        onClick={() => handleToggleSave(job.slug)}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition flex items-center justify-center gap-1.5 ${
                          isSaved
                            ? "bg-amber-50 text-amber-700 border-amber-300"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                        title={isSaved ? "Remove bookmark" : "Save this job"}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-amber-600 text-amber-600" : ""}`} />
                        <span>{isSaved ? "Saved" : "Save"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActivePosterJob(job)}
                        className="py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition flex items-center gap-1"
                        title="View Official Poster Card"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span className="hidden sm:inline">Poster</span>
                      </button>

                      <a
                        href={generateGoogleCalendarUrl(job)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded-lg text-xs text-slate-500 hover:text-blue-700 border border-slate-200 hover:bg-slate-50 transition"
                        title="Add to Google Calendar"
                      >
                        <Clock className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Recruitment Poster Modal */}
      {activePosterJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-white rounded-3xl p-4 shadow-2xl">
            <button
              onClick={() => setActivePosterJob(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white font-black flex items-center justify-center shadow-lg hover:bg-slate-800"
            >
              ✕
            </button>
            <RecruitmentPosterCard job={activePosterJob} />
          </div>
        </div>
      )}
    </div>
  );
}
