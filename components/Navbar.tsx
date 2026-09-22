"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Bell, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Briefcase, 
  Menu, 
  X,
  User as UserIcon,
  LogIn,
  UserPlus
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/government-jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Notification Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide">
              Official Alert
            </span>
            <span className="hidden sm:inline text-slate-300">
              India&apos;s leading Sarkari Naukri &amp; Govt Exam Discovery Portal
            </span>
            <span className="sm:hidden text-slate-300">Govt Jobs Discovery Portal</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <a
              href="/latest-notifications"
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition"
            >
              <Bell className="w-3.5 h-3.5 fill-amber-400 animate-bounce" />
              <span>Latest Notifications</span>
            </a>
            <a
              href="/last-date-reminder"
              className="flex items-center gap-1 hover:text-amber-400 transition"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Closing Soon Alerts</span>
            </a>
            <a
              href="/upcoming-jobs"
              className="flex items-center gap-1 hover:text-sky-300 transition"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>Upcoming Jobs</span>
            </a>
            <a
              href="/admin"
              className="text-slate-400 hover:text-white transition hidden md:inline"
            >
              Admin Panel
            </a>
          </div>
        </div>
      </div>

      {/* Main Header with Logo & Search */}
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition">
              FJA
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl md:text-2xl font-black tracking-tight text-blue-900">
                  FREE<span className="text-amber-600">JOB</span>ALERT
                </span>
                <span className="hidden sm:inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  .COM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Stay informed. Stay ahead.
              </p>
            </div>
          </a>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by Post, SSC, Railway, Banking, 10th, 12th, State..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2 border-2 border-slate-200 rounded-full text-sm focus:outline-none focus:border-blue-600 transition bg-slate-50/50"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded-full text-xs font-semibold shadow transition"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick CTA Buttons & User Auth */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="/last-date-reminder"
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-md text-xs font-bold transition shadow-sm"
            >
              <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              Last Date Reminder
            </a>
            <a
              href="/upcoming-jobs"
              className="flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 px-3 py-1.5 rounded-md text-xs font-bold transition shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-700" />
              Upcoming Jobs
            </a>

            {currentUser ? (
              <a
                href="/dashboard"
                className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-300 px-3 py-1.5 rounded-md text-xs font-bold transition shadow-sm"
              >
                <UserIcon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{currentUser.full_name?.split(" ")[0] || "Dashboard"}</span>
              </a>
            ) : (
              <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200">
                <a
                  href="/login"
                  className="flex items-center gap-1 bg-[#d32f2f] hover:bg-[#b71c1c] text-white px-3 py-1.5 rounded-md text-xs font-bold transition shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log in</span>
                </a>
                <a
                  href="/register"
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-xs font-bold transition shadow-sm"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by SSC, Railway, 10th, 12th..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-20 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1 top-1 bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-semibold"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* FreeJobAlert Classic Blue Navigation Bar */}
      <nav className="bg-[#0366d6] text-white border-t border-blue-700">
        <div className="max-w-7xl mx-auto px-2 flex items-center overflow-x-auto whitespace-nowrap text-xs font-semibold scrollbar-none py-1">
          <a
            href="/"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5 flex items-center gap-1"
          >
            Home
          </a>
          <a
            href="/latest-notifications"
            className="px-3 py-1.5 rounded bg-amber-400 text-slate-950 font-black hover:bg-amber-300 transition mx-0.5 flex items-center gap-1.5 shadow"
          >
            <Bell className="w-3.5 h-3.5 fill-slate-950 animate-bounce" />
            <span>Latest Notifications</span>
          </a>
          <a
            href="/government-jobs"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5"
          >
            All Govt Jobs
          </a>
          <a
            href="/government-jobs/10th"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5"
          >
            10th Pass
          </a>
          <a
            href="/government-jobs/12th"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5"
          >
            12th Pass
          </a>
          <a
            href="/government-jobs/graduate"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5"
          >
            Graduate Jobs
          </a>
          <a
            href="/government-jobs/railway"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5"
          >
            Railway
          </a>
          <a
            href="/government-jobs/ssc"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5"
          >
            SSC
          </a>
          <a
            href="/government-jobs/banking"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5"
          >
            Banking
          </a>
          <a
            href="/government-jobs/police"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5"
          >
            Police &amp; Defence
          </a>
          <a
            href="/government-jobs/engineering"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5"
          >
            Engineering
          </a>
          <a
            href="/government-jobs/teaching"
            className="px-3 py-1.5 rounded hover:bg-blue-800 transition mx-0.5"
          >
            Teaching
          </a>
          <a
            href="/last-date-reminder"
            className="px-3 py-1.5 rounded bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition mx-1"
          >
            Last Date Reminder
          </a>
          <a
            href="/upcoming-jobs"
            className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition mx-0.5"
          >
            Upcoming
          </a>
          <a
            href="/admin"
            className="px-3 py-1.5 rounded bg-blue-900 text-blue-100 hover:bg-blue-950 transition mx-0.5 ml-auto"
          >
            Admin
          </a>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white p-4 space-y-3 border-t border-slate-800 text-sm">
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-blue-400"
          >
            Home
          </a>
          <a
            href="/latest-notifications"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-amber-400 font-extrabold flex items-center gap-1.5"
          >
            <Bell className="w-4 h-4 fill-amber-400" />
            <span>Latest Notifications 2026</span>
          </a>
          <a
            href="/government-jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-blue-400"
          >
            All Government Jobs
          </a>
          {currentUser ? (
            <a
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-indigo-400 font-bold"
            >
              👤 My Dashboard ({currentUser.full_name?.split(" ")[0]})
            </a>
          ) : (
            <div className="grid grid-cols-2 gap-2 py-1">
              <a
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#d32f2f] text-white p-2 rounded-lg text-center font-bold"
              >
                Log In
              </a>
              <a
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-indigo-600 text-white p-2 rounded-lg text-center font-bold"
              >
                Register
              </a>
            </div>
          )}
          <a
            href="/last-date-reminder"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-amber-400 font-bold"
          >
            ⏰ Last Date Reminder
          </a>
          <a
            href="/upcoming-jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-sky-400 font-bold"
          >
            🚀 Upcoming Jobs
          </a>
          <div className="border-t border-slate-800 pt-2 grid grid-cols-2 gap-2 text-xs">
            <a
              href="/government-jobs/10th"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-slate-800 p-2 rounded text-center"
            >
              10th Pass
            </a>
            <a
              href="/government-jobs/12th"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-slate-800 p-2 rounded text-center"
            >
              12th Pass
            </a>
            <a
              href="/government-jobs/ssc"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-slate-800 p-2 rounded text-center"
            >
              SSC Jobs
            </a>
            <a
              href="/government-jobs/railway"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-slate-800 p-2 rounded text-center"
            >
              Railway Jobs
            </a>
            <a
              href="/government-jobs/banking"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-slate-800 p-2 rounded text-center"
            >
              Banking Jobs
            </a>
            <a
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-blue-800 p-2 rounded text-center font-bold"
            >
              Admin Panel
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

