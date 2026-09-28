"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  ChevronDown,
  BookOpen,
  FileText,
  Download,
  Eye,
  Tv,
  PlayCircle,
  ExternalLink,
  FileCheck2,
  Timer,
  BarChart3,
  Repeat,
  CheckSquare,
  Square,
  X,
  RefreshCw,
  Printer,
  Info,
  Check
} from "lucide-react";
import SscAdmitCardModal from "@/components/SscAdmitCardModal";
import SscApplicationModal from "@/components/SscApplicationModal";
import { SscStatusResult } from "@/lib/ssc-service";
import EmblemLogo from "@/components/EmblemLogo";
import GovEmblem from "@/components/GovEmblem";
import RecruitmentPosterCard from "@/components/RecruitmentPosterCard";
import { 
  calculateJobStatus, 
  formatDateIndian, 
  getDaysRemainingText, 
  generateGoogleCalendarUrl 
} from "@/lib/date-utils";
import { STUDY_MATERIALS, StudyMaterial } from "@/lib/study-materials";
import { VIDEO_PLAYLISTS, VideoPlaylist } from "@/lib/video-playlists";
import { 
  PRACTICE_RESOURCES, 
  PracticeResource, 
  SEVEN_STEP_ROUTINE, 
  ExamRoutineStep, 
  EXAM_COMBINATIONS 
} from "@/lib/practice-resources";

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
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"matching" | "all" | "closing_soon" | "saved" | "study_notes" | "video_classes" | "mock_tests" | "my_applications">("matching");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [studyModuleFilter, setStudyModuleFilter] = useState<"All" | "Arithmetic" | "Advanced Maths" | "Reasoning">("All");
  const [videoCategoryFilter, setVideoCategoryFilter] = useState<string>("All");
  const [videoLanguageFilter, setVideoLanguageFilter] = useState<"All" | "Hindi / English" | "Telugu">("All");
  const [practiceFilter, setPracticeFilter] = useState<string>("All Exams");
  const [practiceTypeFilter, setPracticeTypeFilter] = useState<string>("all");
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);
  const [activePdfViewer, setActivePdfViewer] = useState<StudyMaterial | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<VideoPlaylist | null>(null);
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [activePosterJob, setActivePosterJob] = useState<any | null>(null);

  // SSC Live Application & Admit Card State
  const [sscStatus, setSscStatus] = useState<SscStatusResult | null>(null);
  const [isSyncingSsc, setIsSyncingSsc] = useState(false);
  const [admitCardModalOpen, setAdmitCardModalOpen] = useState(false);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [emailAlertNotice, setEmailAlertNotice] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Sync tab from ?tab=my_applications query parameter
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "my_applications") {
      setActiveTab("my_applications");
    }
  }, [searchParams]);

  // Load live SSC status & application details from backend
  useEffect(() => {
    async function loadSscStatus() {
      try {
        const res = await fetch("/api/ssc/status");
        if (res.ok) {
          const data = await res.json();
          setSscStatus(data);
        }
      } catch (err) {
        console.error("Failed to load SSC status:", err);
      }
    }
    loadSscStatus();
  }, []);

  const handleSyncSsc = async () => {
    try {
      setIsSyncingSsc(true);
      const res = await fetch("/api/ssc/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.status) {
        setSscStatus(data.status);
      }
    } catch (err) {
      console.error("Failed to sync SSC status:", err);
    } finally {
      setIsSyncingSsc(false);
    }
  };

  const handleSendEmailAlert = async () => {
    try {
      setSendingEmail(true);
      setEmailAlertNotice(null);
      const res = await fetch("/api/ssc/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sendEmail: true }),
      });
      const data = await res.json();
      if (data.emailResult?.success) {
        setEmailAlertNotice(`Notification sent to ${data.emailResult.recipient}`);
      } else {
        setEmailAlertNotice(data.emailResult?.reason || "Email queued");
      }
    } catch (err: any) {
      setEmailAlertNotice("Failed: " + err.message);
    } finally {
      setSendingEmail(false);
      setTimeout(() => setEmailAlertNotice(null), 6000);
    }
  };

  useEffect(() => {
    try {
      const storedSteps = localStorage.getItem("govsearch_routine_steps");
      if (storedSteps) {
        setCompletedSteps(JSON.parse(storedSteps));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => {
      const next = prev.includes(stepNumber)
        ? prev.filter((s) => s !== stepNumber)
        : [...prev, stepNumber].sort((a, b) => a - b);
      try {
        localStorage.setItem("govsearch_routine_steps", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePosterJob(null);
        setActivePdfViewer(null);
        setActiveVideoModal(null);
        setAdmitCardModalOpen(false);
        setApplicationModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background body scroll when any modal is open
  useEffect(() => {
    if (activePosterJob || activePdfViewer || activeVideoModal || admitCardModalOpen || applicationModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePosterJob, activePdfViewer, activeVideoModal, admitCardModalOpen, applicationModalOpen]);

  // Load candidate profile from localStorage or mock session
  useEffect(() => {
    try {
      const stored = localStorage.getItem("govsearch_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
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

  // Distinct categories across video playlists
  const availableVideoCategories = useMemo(() => {
    const set = new Set<string>();
    VIDEO_PLAYLISTS.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  // Filter study materials based on module and search
  const filteredStudyMaterials = useMemo(() => {
    let list = [...STUDY_MATERIALS];

    if (studyModuleFilter !== "All") {
      list = list.filter((m) => m.module === studyModuleFilter);
    }

    if (dashboardSearch.trim()) {
      const q = dashboardSearch.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.topic.toLowerCase().includes(q) ||
          m.module.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.recommendedFor.some((rec) => rec.toLowerCase().includes(q))
      );
    }

    return list;
  }, [studyModuleFilter, dashboardSearch]);

  // Filter video playlists based on category, language, and search
  const filteredVideoPlaylists = useMemo(() => {
    let list = [...VIDEO_PLAYLISTS];

    if (videoCategoryFilter !== "All") {
      list = list.filter((p) => p.category === videoCategoryFilter);
    }

    if (videoLanguageFilter !== "All") {
      list = list.filter((p) => p.language === videoLanguageFilter);
    }

    if (dashboardSearch.trim()) {
      const q = dashboardSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.educatorChannel.toLowerCase().includes(q) ||
          p.subject.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.targetExams.some((ex) => ex.toLowerCase().includes(q))
      );
    }

    return list;
  }, [videoCategoryFilter, videoLanguageFilter, dashboardSearch]);

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
    const studyNotesCount = STUDY_MATERIALS.length;
    const videoClassesCount = VIDEO_PLAYLISTS.length;
    const mockTestsCount = PRACTICE_RESOURCES.length;

    return { total, closingSoonCount, savedCount, matchedCount, studyNotesCount, videoClassesCount, mockTestsCount };
  }, [jobs, user]);

  const filteredPracticeResources = useMemo(() => {
    return PRACTICE_RESOURCES.filter((res) => {
      const matchCat =
        practiceFilter === "All Exams" ||
        res.category === practiceFilter ||
        res.category === "All Exams" ||
        res.targetExams.some((e) => e.toLowerCase().includes(practiceFilter.toLowerCase()));

      const matchType =
        practiceTypeFilter === "all" ||
        res.resourceType === practiceTypeFilter ||
        res.resourceType === "all_in_one";

      const matchSearch =
        !dashboardSearch ||
        res.title.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
        res.platform.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
        res.description.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
        res.targetExams.some((e) => e.toLowerCase().includes(dashboardSearch.toLowerCase()));

      return matchCat && matchType && matchSearch;
    });
  }, [practiceFilter, practiceTypeFilter, dashboardSearch]);

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
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-blue-200 hidden sm:inline-block">
                    Candidate Portal
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Center: Search across dashboard jobs, notes & videos */}
          <div className="relative flex-1 max-w-md mx-2 hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder={
                activeTab === "study_notes"
                  ? "Search study notes by topic, algebra, reasoning..."
                  : activeTab === "video_classes"
                  ? "Search video classes by educator, Telugu, Gagan Pratap, Parmar SSC..."
                  : "Search vacancies by post, department, keyword..."
              }
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
              <Bell className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Notifications</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                {user?.full_name?.charAt(0) || "U"}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                  {user?.full_name || "Candidate"}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {user?.qualification || "Registered"}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition cursor-pointer"
              title="Sign Out"
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

                {/* Tracked Sectors Row */}
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

              {/* Statistics Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 flex-shrink-0">
                <div className="bg-blue-50/70 border border-blue-100/90 rounded-2xl p-3 text-center min-w-[85px] shadow-2xs">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">
                    MATCHED
                  </span>
                  <span className="text-xl font-black text-blue-600 block">{stats.matchedCount}</span>
                </div>
                <div className="bg-red-50/70 border border-red-100/90 rounded-2xl p-3 text-center min-w-[85px] shadow-2xs">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">
                    CLOSING
                  </span>
                  <span className="text-xl font-black text-red-600 block">{stats.closingSoonCount}</span>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-100/90 rounded-2xl p-3 text-center min-w-[85px] shadow-2xs">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">
                    TOTAL JOBS
                  </span>
                  <span className="text-xl font-black text-emerald-600 block">{stats.total}</span>
                </div>
                <div className="bg-indigo-50/70 border border-indigo-100/90 rounded-2xl p-3 text-center min-w-[85px] shadow-2xs">
                  <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider block mb-1">
                    PDF NOTES
                  </span>
                  <span className="text-xl font-black text-indigo-600 block">{stats.studyNotesCount}</span>
                </div>
                <div className="bg-rose-50/70 border border-rose-100/90 rounded-2xl p-3 text-center min-w-[85px] shadow-2xs">
                  <span className="text-[10px] font-black text-rose-700 uppercase tracking-wider block mb-1">
                    VIDEOS
                  </span>
                  <span className="text-xl font-black text-rose-600 block">{stats.videoClassesCount}</span>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-100/90 rounded-2xl p-3 text-center min-w-[85px] shadow-2xs">
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block mb-1">
                    PYQ & MOCKS
                  </span>
                  <span className="text-xl font-black text-emerald-700 block">{stats.mockTestsCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Alert Toast Notice (If triggered) */}
        {emailAlertNotice && (
          <div className="p-3.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl text-xs flex items-center justify-between shadow-xs animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="font-semibold">{emailAlertNotice}</span>
            </div>
            <button onClick={() => setEmailAlertNotice(null)} className="text-blue-500 hover:text-blue-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SSC APPLICATION & ADMIT CARD LIVE NOTIFICATION BANNER */}
        <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs transition ${
          sscStatus?.appliedExam?.admitCardStatus === "RELEASED"
            ? "bg-emerald-50 border-emerald-300 text-emerald-950"
            : "bg-gradient-to-r from-amber-50 via-orange-50/70 to-white border-amber-300 text-amber-950"
        }`}>
          <div className="flex items-start gap-3.5">
            <div className={`p-2.5 rounded-2xl text-white flex-shrink-0 mt-0.5 shadow-xs ${
              sscStatus?.appliedExam?.admitCardStatus === "RELEASED" ? "bg-emerald-600" : "bg-amber-500"
            }`}>
              {sscStatus?.appliedExam?.admitCardStatus === "RELEASED" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Clock className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                  sscStatus?.appliedExam?.admitCardStatus === "RELEASED"
                    ? "bg-emerald-200/80 text-emerald-900"
                    : "bg-amber-200/80 text-amber-900"
                }`}>
                  {sscStatus?.appliedExam?.admitCardStatus === "RELEASED" ? "Admit Card Downloaded" : "Live SSC Status Alert"}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  Sub-Inspector in Delhi Police &amp; CAPFs Exam 2026 (Reg: 10011969007)
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base mt-1 text-slate-900">
                {sscStatus?.appliedExam?.admitCardStatus === "RELEASED"
                  ? "Your admit card is downloaded! Please check it in our Application."
                  : "Still Admit Card is not released."}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 max-w-3xl leading-relaxed">
                {sscStatus?.appliedExam?.admitCardStatus === "RELEASED"
                  ? "Your official Hall Ticket with exam shift, roll number, and Bengaluru centre address is downloaded and ready to view/print."
                  : "Your application was confirmed on 27/09/2026. Staff Selection Commission officially releases Paper-1 CBT Admit Cards 3 to 7 days before the exam date. City intimation slips are published 10 days prior."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => setAdmitCardModalOpen(true)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>See Admit Card</span>
            </button>

            <button
              onClick={() => setApplicationModalOpen(true)}
              className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 shadow-2xs transition flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-slate-600" />
              <span>View App Form</span>
            </button>

            <button
              onClick={handleSyncSsc}
              disabled={isSyncingSsc}
              className="p-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 shadow-2xs transition disabled:opacity-50"
              title="Check Live SSC Server"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncingSsc ? "animate-spin text-blue-600" : ""}`} />
            </button>

            <button
              onClick={() => setActiveTab("my_applications")}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              Application Hub &rarr;
            </button>
          </div>
        </div>

        {/* Tab Navigation & Controls with Dynamic Selector */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          {/* Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            
            {/* NEW TAB: My Applications & Admit Card */}
            <button
              onClick={() => setActiveTab("my_applications")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === "my_applications"
                  ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-300"
                  : "bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>My Applications &amp; Admit Card</span>
              <span className={`px-1.5 py-0.2 text-[10px] font-black rounded-full uppercase ${
                activeTab === "my_applications"
                  ? "bg-white text-amber-800"
                  : "bg-amber-500 text-white"
              }`}>
                SSC 2026
              </span>
            </button>

            <button
              onClick={() => setActiveTab("matching")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === "matching"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended ({stats.matchedCount})</span>
            </button>

            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>All Active ({stats.total})</span>
            </button>

            <button
              onClick={() => setActiveTab("closing_soon")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
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
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === "saved"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved Jobs ({stats.savedCount})</span>
            </button>

            {/* Study Notes Tab */}
            <button
              onClick={() => setActiveTab("study_notes")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === "study_notes"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-indigo-50/80 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study Notes ({stats.studyNotesCount})</span>
            </button>

            {/* OPTION A: Video Classes Tab */}
            <button
              onClick={() => setActiveTab("video_classes")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === "video_classes"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-rose-50/80 text-rose-700 border border-rose-200 hover:bg-rose-100 hover:border-rose-300"
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Video Classes ({stats.videoClassesCount})</span>
            </button>

            {/* PYQs & Mocks Tab */}
            <button
              onClick={() => setActiveTab("mock_tests")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                activeTab === "mock_tests"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-emerald-50/80 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300"
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>PYQs & Mocks ({stats.mockTestsCount})</span>
            </button>
          </div>

          {/* Right Selector: Changes between Category (jobs), Module (study notes), Subject (video classes), or Exam (mocks) */}
          {activeTab === "mock_tests" ? (
            <div className="flex items-center gap-2.5 justify-end flex-shrink-0">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                EXAM:
              </span>
              <div className="relative">
                <select
                  value={practiceFilter}
                  onChange={(e) => setPracticeFilter(e.target.value)}
                  className="bg-white border border-emerald-200 hover:border-emerald-400 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-bold text-emerald-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition shadow-2xs appearance-none cursor-pointer min-w-[160px]"
                >
                  <option value="All Exams">All Exams (7)</option>
                  <option value="SSC">SSC (CGL, CHSL, MTS)</option>
                  <option value="Railway">Railways (RRB NTPC, Group D)</option>
                  <option value="Banking">Banking (IBPS, SBI, RBI)</option>
                  <option value="State PSC">State PSC (APPSC, TSPSC)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-emerald-500 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          ) : activeTab === "study_notes" ? (
            <div className="flex items-center gap-2.5 justify-end flex-shrink-0">
              <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
                MODULE:
              </span>
              <div className="relative">
                <select
                  value={studyModuleFilter}
                  onChange={(e) => setStudyModuleFilter(e.target.value as any)}
                  className="bg-white border border-indigo-200 hover:border-indigo-400 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-bold text-indigo-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition shadow-2xs appearance-none cursor-pointer min-w-[160px]"
                >
                  <option value="All">All Modules (17)</option>
                  <option value="Arithmetic">Arithmetic (12)</option>
                  <option value="Advanced Maths">Advanced Maths (4)</option>
                  <option value="Reasoning">Reasoning (1)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-indigo-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          ) : activeTab === "video_classes" ? (
            <div className="flex items-center gap-2.5 justify-end flex-shrink-0">
              <span className="text-xs font-black text-rose-700 uppercase tracking-wider">
                SUBJECT:
              </span>
              <div className="relative">
                <select
                  value={videoCategoryFilter}
                  onChange={(e) => setVideoCategoryFilter(e.target.value)}
                  className="bg-white border border-rose-200 hover:border-rose-400 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-bold text-rose-900 focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-100 transition shadow-2xs appearance-none cursor-pointer min-w-[170px]"
                >
                  <option value="All">All Subjects (19)</option>
                  {availableVideoCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-rose-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          ) : (
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
          )}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: VIDEO CLASSES TAB (19 PLAYLISTS) */}
        {/* ============================================================== */}
        {activeTab === "video_classes" ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Video Classes Intro Banner */}
            <div className="bg-gradient-to-r from-rose-50/90 via-amber-50/40 to-white rounded-3xl p-5 sm:p-6 border border-rose-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
                    EXPERT VIDEO HUB
                  </span>
                  <span className="text-xs font-bold text-rose-900">
                    19 Handpicked Masterclass Playlists by India&apos;s Top Educators
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
                  Best YouTube Classes for Central &amp; State Government Exams
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Featuring Gagan Pratap, Parmar SSC, StudyIQ, Physics Wallah, Rani Ma&apos;am, Adda247 Telugu &amp; Hareesh Academy.
                </p>
              </div>

              {/* Quick Language Toggle */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-600 mr-1">Language:</span>
                {(["All", "Hindi / English", "Telugu"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setVideoLanguageFilter(lang)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                      videoLanguageFilter === lang
                        ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-rose-300"
                    }`}
                  >
                    {lang === "Telugu" ? "🇮🇳 Telugu (తెలుగు)" : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setVideoCategoryFilter("All")}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition flex-shrink-0 cursor-pointer ${
                  videoCategoryFilter === "All"
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                All Subjects (19)
              </button>
              {availableVideoCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setVideoCategoryFilter(cat)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition flex-shrink-0 cursor-pointer ${
                    videoCategoryFilter === cat
                      ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:border-rose-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Video Playlists List */}
            {filteredVideoPlaylists.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-3">
                <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Tv className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No video classes found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  No playlists matched your filter or search query. Try switching to &quot;All Subjects&quot; or clearing the search text.
                </p>
                <button
                  onClick={() => {
                    setVideoCategoryFilter("All");
                    setVideoLanguageFilter("All");
                    setDashboardSearch("");
                  }}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  Reset Video Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredVideoPlaylists.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative group"
                  >
                    {/* Left Column: Icon + Information */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-13 h-13 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0 group-hover:scale-105 transition">
                        <PlayCircle className="w-7 h-7" />
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        {/* Channel Badge & Language Tag */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                            {item.educatorChannel}
                          </span>
                          <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            {item.subject}
                          </span>
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                            item.language === "Telugu"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}>
                            {item.language === "Telugu" ? "🇮🇳 Telugu Medium" : item.language}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-rose-600 transition block leading-snug">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Highlights & Target Exams */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
                          {item.verifiedBadges.map((badge) => (
                            <span
                              key={badge}
                              className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px] font-semibold"
                            >
                              ★ {badge}
                            </span>
                          ))}
                          <span className="text-slate-400 text-[11px] font-medium ml-1">Target:</span>
                          {item.targetExams.slice(0, 4).map((ex) => (
                            <span
                              key={ex}
                              className="bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 text-[11px]"
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Actions */}
                    <div className="flex sm:flex-row lg:flex-col items-center justify-between lg:justify-center gap-2.5 pt-3 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-100 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveVideoModal(item)}
                        className="w-full sm:w-auto lg:w-44 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition shadow-sm hover:shadow flex items-center justify-center gap-2 text-center cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Watch In-App</span>
                      </button>

                      <a
                        href={item.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto lg:w-44 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 text-center border border-slate-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                        <span>YouTube Playlist</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === "study_notes" ? (
          /* ============================================================== */
          /* TAB 2: STUDY NOTES TAB (17 HANDWRITTEN MATHS/REASONING PDFS)   */
          /* ============================================================== */
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Study Material Intro Banner */}
            <div className="bg-gradient-to-r from-indigo-50/90 via-blue-50/50 to-white rounded-3xl p-5 sm:p-6 border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
                    CANDIDATE STUDY HUB
                  </span>
                  <span className="text-xs font-bold text-indigo-900">
                    Strictly After-Login Verified Preparation Materials
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
                  17 Handwritten Maths, Aptitude &amp; Reasoning Booklets
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Prepared for SSC CGL/CHSL, Railway RRB, Banking, UPSC CSAT, Defence and State PSCs.
                </p>
              </div>

              {/* Quick Module Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {(["All", "Arithmetic", "Advanced Maths", "Reasoning"] as const).map((mod) => (
                  <button
                    key={mod}
                    type="button"
                    onClick={() => setStudyModuleFilter(mod)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                      studyModuleFilter === mod
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {mod}
                  </button>
                ))}
              </div>
            </div>

            {/* Study Material Cards List */}
            {filteredStudyMaterials.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-3">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No study notes found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  No notes matched your search term. Try clearing the search bar or choosing &quot;All Modules&quot;.
                </p>
                <button
                  onClick={() => {
                    setStudyModuleFilter("All");
                    setDashboardSearch("");
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  Reset Module Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredStudyMaterials.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative group"
                  >
                    {/* Left Column: Icon + Information */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-13 h-13 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:scale-105 transition">
                        <FileText className="w-6 h-6" />
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        {/* Module Badge & File Size */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                            item.module === "Arithmetic"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : item.module === "Advanced Maths"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}>
                            {item.module}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            {item.sizeText}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified PDF
                          </span>
                        </div>

                        {/* Note Title */}
                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-600 transition block leading-snug">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Recommended For Badges */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
                          <span className="text-slate-400 text-[11px] font-medium mr-1">Target Exams:</span>
                          {item.recommendedFor.map((rec) => (
                            <span
                              key={rec}
                              className="bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 text-[11px]"
                            >
                              {rec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Actions */}
                    <div className="flex sm:flex-row lg:flex-col items-center justify-between lg:justify-center gap-2.5 pt-3 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-100 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setActivePdfViewer(item)}
                        className="w-full sm:w-auto lg:w-44 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition shadow-sm hover:shadow flex items-center justify-center gap-2 text-center cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Read Online</span>
                      </button>

                      <a
                        href={`/api/study-material/${item.id}?candidate=true&download=true`}
                        download
                        className="w-full sm:w-auto lg:w-44 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 text-center border border-slate-200"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-600" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === "mock_tests" ? (
          /* ============================================================== */
          /* TAB 3: MOCK TESTS & PYQS TAB (7 VERIFIED PLATFORMS & 7-STEP ROUTINE) */
          /* ============================================================== */
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Banner */}
            <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/40 to-white rounded-3xl p-5 sm:p-6 border border-emerald-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
                    EXAM PRACTICE &amp; ANSWER KEYS
                  </span>
                  <span className="text-xs font-bold text-emerald-900">
                    Official SSC/PSC Keys • Authentic Shift-wise PYQs • Free Mocks
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
                  Previous Year Papers, Official Keys &amp; Free Mock Tests
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-2xl">
                  Recommended strategy: Solve 5–10 years shift-wise PYQs, verify with authentic official answer keys, and take full-length mocks under real exam software conditions.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href="/mock-tests"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition shadow-sm hover:shadow flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Public Hub</span>
                </Link>
              </div>
            </div>

            {/* 7-Step Interactive Exam Routine Checklist */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Recommended Daily Routine
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      Click steps to mark completed
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    Your Personalized 7-Step Exam Preparation Checklist
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-black text-slate-700 block">
                      {completedSteps.length} of 7 Done
                    </span>
                    <span className="text-[11px] text-emerald-600 font-bold">
                      {Math.round((completedSteps.length / 7) * 100)}% Progress
                    </span>
                  </div>
                  <div className="w-24 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${(completedSteps.length / 7) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
                {SEVEN_STEP_ROUTINE.map((st) => {
                  const isDone = completedSteps.includes(st.step);
                  return (
                    <div
                      key={st.step}
                      onClick={() => toggleStep(st.step)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isDone
                          ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-2xs"
                          : "bg-slate-50/60 border-slate-200/80 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                            isDone ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
                          }`}>
                            Step {st.step}
                          </span>
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          )}
                        </div>
                        <h4 className="text-xs font-black line-clamp-1 text-slate-900">
                          {st.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-3 leading-snug">
                          {st.action}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200/50">
                        <span className="text-[10px] font-bold text-slate-500 block truncate">
                          Source: {st.recommendedPlatform}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Smart Exam Combination Stacks */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Targeted Exam Combination Stacks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {EXAM_COMBINATIONS.map((combo) => (
                  <div
                    key={combo.examName}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <h4 className="text-xs font-black text-slate-900 leading-snug">
                        {combo.examName}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {combo.tagline}
                      </p>
                    </div>
                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                      {combo.recommendedStack.map((stk) => (
                        <a
                          key={stk.purpose}
                          href={stk.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-white border border-slate-200/70 hover:border-emerald-300 hover:text-emerald-700 transition"
                        >
                          <span className="font-medium truncate max-w-[150px]">{stk.source}</span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100 flex-shrink-0">
                            {stk.badge}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Pills for Practice Resources */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(["all", "pyq", "mock_test", "answer_key"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setPracticeTypeFilter(t)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer flex-shrink-0 ${
                    practiceTypeFilter === t
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {t === "all" ? "All Practice Resources (7)" : t === "pyq" ? "Previous Year Papers (PYQs)" : t === "mock_test" ? "Free Mock Tests" : "Official Answer Keys"}
                </button>
              ))}
            </div>

            {/* Filtered Resources List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredPracticeResources.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative group"
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition border ${
                      item.isOfficial ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                    }`}>
                      {item.resourceType === "answer_key" ? (
                        <FileCheck2 className="w-7 h-7" />
                      ) : item.resourceType === "pyq" ? (
                        <BookOpen className="w-7 h-7" />
                      ) : (
                        <Timer className="w-7 h-7" />
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                          {item.platform}
                        </span>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                        {item.isOfficial && (
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-300">
                            ★ Official Government Source
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition block leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
                        {item.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 text-[11px]"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>

                      <div className="pt-1 text-[11px] text-emerald-800 font-bold">
                        Best For: <span className="font-medium text-slate-600">{item.bestFor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-row lg:flex-col items-center justify-between lg:justify-center gap-2.5 pt-3 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-100 flex-shrink-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto lg:w-44 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition shadow-sm hover:shadow flex items-center justify-center gap-2 text-center"
                    >
                      <span>Practice Free Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === "my_applications" ? (
          /* ============================================================== */
          /* TAB: MY APPLICATIONS & SSC ADMIT CARD TRACKER                  */
          /* ============================================================== */
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-slate-800 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-full bg-blue-600/10 pointer-events-none rounded-r-3xl" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-blue-400">
                      OFFICIAL PORTAL SYNC
                    </span>
                    <span className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Connected to ssc.gov.in (AES-256 Encrypted)
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    My Applications &amp; Admit Card Tracker
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Track the examination you applied for, review your verified candidate profile, monitor live admit card release timelines, and inspect or download your application and admit card directly in GovSearch.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleSyncSsc}
                    disabled={isSyncingSsc}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncingSsc ? "animate-spin" : ""}`} />
                    <span>{isSyncingSsc ? "Syncing SSC..." : "Sync Live SSC Server"}</span>
                  </button>

                  <button
                    onClick={handleSendEmailAlert}
                    disabled={sendingEmail}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition flex items-center gap-2 disabled:opacity-50"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{sendingEmail ? "Sending..." : "Email Notification"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: Candidate Verified SSC Profile (4 Cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <h3 className="font-bold text-sm text-slate-900 uppercase tracking-tight">
                      Verified SSC Profile
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black rounded-full">
                    OTR VERIFIED
                  </span>
                </div>

                {/* Candidate Photo & Signature */}
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="w-20 h-24 bg-white rounded-xl border-2 border-slate-300 shadow-sm overflow-hidden flex-shrink-0">
                    <img
                      src="/candidate-photo.png"
                      alt="Candidate Photograph"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between h-24 min-w-0 flex-1">
                    <div>
                      <span className="text-[10px] font-black text-blue-700 uppercase block">Candidate Name</span>
                      <h4 className="font-black text-sm text-slate-900 leading-tight uppercase truncate">
                        {sscStatus?.candidate?.name || "KARAKA SAI CHANDRA SEKHAR"}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-600 mt-0.5">
                        Reg: {sscStatus?.candidate?.registrationNo || "10011969007"}
                      </p>
                    </div>

                    <div className="bg-white px-2 py-1 rounded border border-slate-200 self-start">
                      <img
                        src="/candidate-signature.png"
                        alt="Signature"
                        className="max-h-6 object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Detailed Profile Attributes */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Father's Name</span>
                    <span className="font-bold text-slate-800 uppercase">
                      {sscStatus?.candidate?.fathersName || "KARAKA SATYANARAYANA"}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Mother's Name</span>
                    <span className="font-bold text-slate-800 uppercase">
                      {sscStatus?.candidate?.mothersName || "KARAKA ADI LAKSHMI"}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Date of Birth</span>
                    <span className="font-bold text-slate-800">
                      {sscStatus?.candidate?.dob || "2003-09-20"} (22 Yrs)
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Gender &bull; Category</span>
                    <span className="font-bold text-slate-800">
                      {sscStatus?.candidate?.gender || "Male"} &bull; {sscStatus?.candidate?.category || "OBC"}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Mobile Number</span>
                    <span className="font-bold text-slate-800">
                      +91 {sscStatus?.candidate?.mobile || "8886315136"}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Email Address</span>
                    <span className="font-bold text-slate-800 truncate max-w-[180px]">
                      {sscStatus?.candidate?.email || "saichandrasekhark@gmail.com"}
                    </span>
                  </div>

                  <div className="pt-1">
                    <span className="text-slate-500 font-medium block text-[11px]">Correspondence Address</span>
                    <p className="font-semibold text-slate-800 text-[11px] mt-0.5 leading-snug">
                      {sscStatus?.candidate?.address || "44-37-7/3 SRINIVASA NAGAR AKKAYYAPALEM VISAKHAPATNAM 530016"}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 text-[11px] text-blue-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Synchronized via secure SSC One-Time Registration credentials stored in your environment config.
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: Applied Exam & Live Admit Card Tracker (8 Cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Applied Examination Master Card */}
                <div className="bg-white rounded-3xl border-2 border-blue-600/30 p-6 sm:p-7 shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                          APPLIED EXAM
                        </span>
                        <span className="text-xs font-bold text-slate-600">
                          SSC Reference No: 10011969007
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                        Sub-Inspector in Delhi Police and Central Armed Police Forces Examination, 2026
                      </h3>
                      <p className="text-xs font-bold text-blue-800">
                        Popularly known as: SSC SI / CPO Exam 2026
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-black">
                        Application Completed
                      </span>
                    </div>
                  </div>

                  {/* Submission and Payment Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Submitted On</span>
                      <span className="font-bold text-slate-800">27-09-2026</span>
                      <span className="text-[10px] text-slate-500 block">05:50 PM IST</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Fee Payment</span>
                      <span className="font-bold text-emerald-700">₹100 Paid</span>
                      <span className="text-[10px] font-mono text-slate-500 block truncate" title="2633a826f75abcef7a">
                        Txn: 2633a826...
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Target Region</span>
                      <span className="font-bold text-slate-800">KKR Region</span>
                      <span className="text-[10px] text-slate-500 block">Karnataka Kerala</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Exam Medium</span>
                      <span className="font-bold text-slate-800">English (02)</span>
                      <span className="text-[10px] text-blue-700 block">NCC 'B' Holder</span>
                    </div>
                  </div>

                  {/* Exam Centers Chosen */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>Selected Examination Centers (Preferences)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-blue-200 text-blue-900 font-semibold flex items-center justify-between">
                        <span>1. KKR-Bengaluru (9001)</span>
                        <span className="text-[9px] font-black uppercase bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Primary</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold">
                        <span>2. KKR-Mysuru (9009)</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold">
                        <span>3. KKR-Mangaluru (9008)</span>
                      </div>
                    </div>
                  </div>

                  {/* ADMIT CARD RELEASE STATUS CALLOUT */}
                  <div className={`p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    sscStatus?.appliedExam?.admitCardStatus === "RELEASED"
                      ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                      : "bg-amber-50 border-amber-400 text-amber-950"
                  }`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                          sscStatus?.appliedExam?.admitCardStatus === "RELEASED"
                            ? "bg-emerald-600 text-white"
                            : "bg-amber-500 text-white"
                        }`}>
                          {sscStatus?.appliedExam?.admitCardStatus === "RELEASED" ? "RELEASED & DOWNLOADED" : "STILL NOT RELEASED"}
                        </span>
                        <span className="text-xs font-bold text-slate-600">
                          {sscStatus?.appliedExam?.expectedReleaseWindow || "Expected 3-7 days prior to CBT Exam"}
                        </span>
                      </div>
                      <h4 className="font-black text-base sm:text-lg text-slate-900">
                        {sscStatus?.appliedExam?.admitCardStatus === "RELEASED"
                          ? "Your admit card is downloaded! Please check it below."
                          : "Still Admit Card is not released."}
                      </h4>
                      <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                        {sscStatus?.appliedExam?.admitCardStatus === "RELEASED"
                          ? "Official hall ticket is available with your assigned roll number, shift timing, and exam venue in Bengaluru."
                          : "Staff Selection Commission officially releases the Paper-1 CBT Admit Card 3 to 7 days before the exam date. City intimation slips are published 10 days before the exam."}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 w-full sm:w-auto flex-shrink-0">
                      <button
                        onClick={() => setAdmitCardModalOpen(true)}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>See Admit Card in Application</span>
                      </button>

                      <button
                        onClick={() => setApplicationModalOpen(true)}
                        className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-xl border border-slate-300 shadow-2xs transition flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-600" />
                        <span>View Application Form (PDF)</span>
                      </button>
                    </div>
                  </div>

                  {/* Document Quick Downloads & External Links */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <a
                        href="/api/ssc/application-pdf?download=true"
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg border border-slate-200 flex items-center gap-1.5 transition"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-600" />
                        Download Application PDF
                      </a>

                      <button
                        onClick={() => setAdmitCardModalOpen(true)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg border border-slate-200 flex items-center gap-1.5 transition"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" />
                        Print Intimation Slip
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://ssc.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline font-bold flex items-center gap-1"
                      >
                        <span>Official ssc.gov.in Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </div>

                {/* FAQ & SSC Timeline Notice */}
                <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>When will the SSC SI/CPO 2026 Admit Card be released?</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                    <li>
                      <strong>Application Window Status:</strong> Your application was successfully completed on 27/09/2026.
                    </li>
                    <li>
                      <strong>Scrutiny &amp; Acceptance Status:</strong> SSC regional offices (including KKR Bengaluru) scrutinize applications before publishing the candidate acceptance list.
                    </li>
                    <li>
                      <strong>City Intimation Slip:</strong> Released approximately <strong>10 to 14 days</strong> before the commencement of Paper-1 Computer Based Examination.
                    </li>
                    <li>
                      <strong>Final e-Admit Card / Hall Ticket:</strong> Released <strong>3 to 7 days</strong> before the exact examination date for each candidate to prevent malpractices.
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        ) : loading ? (
          /* ============================================================== */
          /* LOADING SKELETON                                               */
          /* ============================================================== */
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
          /* ============================================================== */
          /* EMPTY VACANCIES STATE                                          */
          /* ============================================================== */
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* ============================================================== */
          /* TAB 3: FULL WIDTH HORIZONTAL JOB CARDS LIST                    */
          /* ============================================================== */
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
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
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
                        className="py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition flex items-center gap-1 cursor-pointer"
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
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setActivePosterJob(null);
          }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6"
        >
          {/* Always-Visible Fixed Screen-Corner Close Button */}
          <button
            onClick={() => setActivePosterJob(null)}
            type="button"
            aria-label="Close poster card"
            title="Close Poster (Esc)"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] bg-red-600 hover:bg-red-700 text-white font-black rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 border-2 border-white cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[3]" />
          </button>

          <div className="relative w-full max-w-xl mx-auto my-6 sm:my-10">
            <RecruitmentPosterCard 
              job={activePosterJob} 
              onClose={() => setActivePosterJob(null)} 
            />
          </div>
        </div>
      )}

      {/* In-App PDF Reader Modal */}
      {activePdfViewer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between gap-4 flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-indigo-600 rounded-xl text-white flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {activePdfViewer.title}
                  </h3>
                  <span className="text-xs text-slate-400 block">
                    {activePdfViewer.module} • {activePdfViewer.sizeText} • Candidate Study Portal
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`/api/study-material/${activePdfViewer.id}?candidate=true&download=true`}
                  download
                  className="hidden sm:flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                <button
                  onClick={() => setActivePdfViewer(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm transition cursor-pointer"
                  title="Close Viewer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full bg-slate-800 relative">
              <iframe
                src={`/api/study-material/${activePdfViewer.id}?candidate=true#toolbar=1`}
                className="w-full h-full border-none"
                title={activePdfViewer.title}
              />
            </div>
          </div>
        </div>
      )}

      {/* In-App YouTube Video Player Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl h-[88vh] bg-slate-950 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-800">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between gap-4 flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-rose-600 rounded-xl text-white flex-shrink-0">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {activeVideoModal.title}
                  </h3>
                  <span className="text-xs text-rose-400 block truncate">
                    {activeVideoModal.educatorChannel} • {activeVideoModal.subject} • {activeVideoModal.language}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={activeVideoModal.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in YouTube</span>
                </a>

                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm transition cursor-pointer"
                  title="Close Video Player"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Embedded YouTube Player or Responsive Channel Viewer */}
            <div className="flex-1 w-full bg-black relative flex flex-col items-center justify-center">
              {activeVideoModal.embedPlaylistId ? (
                <iframe
                  src={`https://www.youtube.com/embed/videoseries?list=${activeVideoModal.embedPlaylistId}&autoplay=1`}
                  className="w-full h-full border-none"
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="p-8 text-center max-w-xl space-y-4">
                  <div className="w-16 h-16 bg-rose-600/20 text-rose-500 rounded-3xl flex items-center justify-center mx-auto border border-rose-500/30">
                    <Tv className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">
                      {activeVideoModal.educatorChannel}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {activeVideoModal.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {activeVideoModal.targetExams.map((ex) => (
                      <span key={ex} className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-slate-700">
                        {ex}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <a
                      href={activeVideoModal.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-6 rounded-2xl text-sm transition shadow-lg hover:shadow-rose-600/30"
                    >
                      <PlayCircle className="w-5 h-5" />
                      <span>Start Playlist on Official YouTube Channel</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SSC Admit Card In-App Viewer Modal */}
      <SscAdmitCardModal
        isOpen={admitCardModalOpen}
        onClose={() => setAdmitCardModalOpen(false)}
        statusData={sscStatus}
        onRefreshStatus={handleSyncSsc}
        isRefreshing={isSyncingSsc}
      />

      {/* SSC Application Form In-App Viewer Modal */}
      <SscApplicationModal
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
      />
    </div>
  );
}
