"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X, Bell, FileText, Clock, CheckCircle2, ChevronRight, LogOut } from "lucide-react";
import GovEmblem from "@/components/GovEmblem";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sscStatus, setSscStatus] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [candidateName, setCandidateName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("govsearch_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setIsLoggedIn(true);
        setCandidateName(parsed.full_name || "Candidate");
      }
    } catch {}
  }, []);

  const handleNavbarLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error in navbar:", err);
    } finally {
      try {
        localStorage.removeItem("govsearch_user");
        localStorage.removeItem("govsearch_routine_steps");
      } catch {}
      setIsLoggedIn(false);
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    async function loadSscNotification() {
      try {
        const res = await fetch("/api/ssc/status");
        if (res.ok) {
          const data = await res.json();
          setSscStatus(data);
        }
      } catch (err) {
        console.error("Failed to load SSC notification in navbar:", err);
      }
    }
    loadSscNotification();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/government-jobs?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchModalOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Today Updates", href: "/#today-updates" },
    { label: "Jobs by Education", href: "/#jobs-by-education" },
    { label: "Exam Pattern", href: "/exam-pattern" },
    { label: "Selection Process", href: "/selection-process" },
    { label: "Previous Papers", href: "/previous-papers" },
    { label: "Mock Tests", href: "/mock-tests" },
    { label: "My Applications", href: "/dashboard?tab=my_applications" },
  ];

  const isReleased = sscStatus?.appliedExam?.admitCardStatus === "RELEASED";

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: Government Emblem + Brand */}
          <a href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
              <GovEmblem className="w-9 h-10 text-slate-800" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                <span className="text-slate-900">Gov</span>
                <span className="text-blue-600">Search</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5">
                Find Government Jobs. Build a Better Future.
              </span>
            </div>
          </a>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1 font-semibold text-sm">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.split("?")[0]);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg transition-colors relative ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                  {link.label === "My Applications" && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-white text-[10px] font-black rounded-full uppercase">
                      SSC 2026
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Search, Notifications, Login, Sign Up */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setSearchModalOpen(!searchModalOpen)}
              aria-label="Search jobs"
              className="p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* NOTIFICATION BELL WITH FLYOUT */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="View notifications"
                className="p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-fadeIn">
                  <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">Notifications</span>
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-black rounded-full">
                        1 New
                      </span>
                    </div>
                    <a
                      href="/dashboard?tab=my_applications"
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      View Hub
                    </a>
                  </div>

                  <div className="p-2 max-h-80 overflow-y-auto space-y-1.5">
                    {/* Notification Item */}
                    <div
                      onClick={() => {
                        router.push("/dashboard?tab=my_applications");
                        setNotificationsOpen(false);
                      }}
                      className="p-3 rounded-xl bg-amber-50/80 hover:bg-amber-100/70 border border-amber-200 cursor-pointer transition flex items-start gap-3"
                    >
                      <div className="p-2 bg-amber-500 text-white rounded-lg flex-shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-bold text-xs text-slate-900 truncate">
                            {isReleased ? "Admit Card Downloaded" : "Still Admit Card is not released"}
                          </h5>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">Just now</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {isReleased 
                            ? "Your admit card is downloaded. Please check it in our Application."
                            : "For your applied exam: SI/CPO Exam 2026 (Reg: 10011969007). Application confirmed. Hall tickets will be issued 3–7 days before CBT."}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-blue-700">
                          <span>Check in Dashboard</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        router.push("/dashboard?tab=my_applications");
                        setNotificationsOpen(false);
                      }}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition flex items-start gap-3"
                    >
                      <div className="p-2 bg-emerald-600 text-white rounded-lg flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-bold text-xs text-slate-900 truncate">
                            Application Form Confirmed
                          </h5>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">27 Sep</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                          SSC SI/CPO Exam 2026 application submitted (Txn: 2633a826f75abcef7a). Center preferences: Bengaluru, Mysuru, Mangaluru.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-3 pt-2 border-t border-slate-100 text-center">
                    <a
                      href="/dashboard?tab=my_applications"
                      className="text-xs font-bold text-slate-700 hover:text-blue-600 transition block py-1"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      Open My Applications & Admit Card Tracker &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <>
                <a
                  href="/dashboard"
                  className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-bold transition flex items-center gap-1.5"
                >
                  <span>Dashboard</span>
                  {candidateName && (
                    <span className="text-xs font-normal text-blue-600 hidden xl:inline">
                      ({candidateName.split(" ")[0]})
                    </span>
                  )}
                </a>

                <button
                  onClick={handleNavbarLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-bold transition shadow-2xs cursor-pointer"
                  title="Sign Out of GovSearch"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <a
                  href="/dashboard"
                  className="px-3.5 py-1.5 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-lg text-sm font-semibold transition"
                >
                  Dashboard
                </a>

                <a
                  href="/login"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm hover:shadow transition"
                >
                  Portal Login
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu & Search Icon */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={() => router.push("/dashboard?tab=my_applications")}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
            </button>
            <button
              onClick={() => setSearchModalOpen(!searchModalOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Global Search Expandable Bar (If toggled) */}
        {searchModalOpen && (
          <form onSubmit={handleSearch} className="mt-3 pt-3 border-t border-slate-100 animate-fadeIn">
            <div className="relative w-full max-w-2xl mx-auto">
              <input
                type="text"
                autoFocus
                placeholder="Search jobs by post name, organization, department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2 border-2 border-blue-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
              />
              <Search className="w-4 h-4 text-blue-600 absolute left-3.5 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-xs font-bold transition shadow-sm"
              >
                Search
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.split("?")[0]);

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <a
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50"
            >
              Dashboard
            </a>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavbarLogout();
                }}
                className="flex-1 text-center py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 flex items-center justify-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span>Sign Out</span>
              </button>
            ) : (
              <a
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm"
              >
                Portal Login
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
