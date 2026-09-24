"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import GovEmblem from "@/components/GovEmblem";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

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
    { label: "Government Jobs", href: "/government-jobs" },
    { label: "Mock Tests & PYQs", href: "/mock-tests" },
    { label: "Results", href: "/results" },
    { label: "Exam Calendar", href: "/exam-calendar" },
    { label: "Syllabus", href: "/syllabus" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

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
                  : pathname.startsWith(link.href);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Search, Login, Sign Up */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => setSearchModalOpen(!searchModalOpen)}
              aria-label="Search jobs"
              className="p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href="/login"
              className="px-4 py-1.5 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-lg text-sm font-semibold transition"
            >
              Login
            </a>

            <a
              href="/register"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm hover:shadow transition"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Menu & Search Icon */}
          <div className="flex sm:hidden items-center gap-1.5">
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
                : pathname.startsWith(link.href);

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
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50"
            >
              Login
            </a>
            <a
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
