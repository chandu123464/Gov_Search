"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Bell, 
  Flame, 
  Calendar, 
  Clock, 
  Search, 
  ExternalLink, 
  FileText, 
  Download, 
  Sparkles, 
  ArrowRight,
  Filter,
  CheckCircle2,
  ChevronRight,
  Award,
  Layers,
  Building,
  GraduationCap
} from "lucide-react";
import { TODAY_TICKER_ITEMS, TODAY_UPDATES_DATA, TodayUpdateItem } from "@/lib/today-updates-data";

export default function TodayUpdatesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBoard, setSelectedBoard] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTickerIdx, setCurrentTickerIdx] = useState(0);

  const categories = ["All", "Notification", "Admit Card", "Exam Date", "Answer Key"];
  const boards = ["All", "SSC", "RRB", "Banking", "UPSC", "Defence", "State PSC"];

  const filteredUpdates = useMemo(() => {
    return TODAY_UPDATES_DATA.filter((item) => {
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchBoard = selectedBoard === "All" || item.boardShort === selectedBoard;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.postName.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.qualification.toLowerCase().includes(q) ||
        item.boardShort.toLowerCase().includes(q);

      return matchCat && matchBoard && matchQuery;
    });
  }, [selectedCategory, selectedBoard, searchQuery]);

  return (
    <section id="today-updates" className="w-full my-6 space-y-4 scroll-mt-20">
      {/* 1. Breaking News / Flash Ticker Bar */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-2xl text-white p-2.5 sm:p-3 shadow-md flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 bg-white text-rose-700 px-2.5 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-xs flex-shrink-0">
          <Flame className="w-3.5 h-3.5 fill-rose-600 animate-pulse" />
          <span>Flash Updates</span>
        </div>

        <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none text-xs sm:text-sm font-semibold flex items-center gap-6 py-0.5">
          {TODAY_TICKER_ITEMS.map((item, idx) => (
            <Link
              key={item.id}
              href={item.href}
              className="inline-flex items-center gap-2 hover:underline text-white/95 hover:text-white transition flex-shrink-0"
            >
              <span className="bg-black/25 text-[10px] uppercase font-black px-1.5 py-0.5 rounded">
                {item.tag}
              </span>
              <span>{item.text}</span>
              {idx < TODAY_TICKER_ITEMS.length - 1 && (
                <span className="text-white/50 text-xs font-bold">&bull;</span>
              )}
            </Link>
          ))}
        </div>

        <Link
          href="/latest-notifications"
          className="hidden md:inline-flex items-center gap-1 text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-xl transition flex-shrink-0"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. Main Today Updates Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-5 sm:p-7 space-y-5">
        {/* Header matching FreeJobAlert Today Updates */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <Bell className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Today Updates
                </h2>
                <span className="bg-rose-100 text-rose-700 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-rose-200">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping inline-block" />
                  LIVE TODAY
                </span>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                  {TODAY_UPDATES_DATA.filter((d) => d.isToday).length} New Alerts
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Official notifications, admit cards, exam dates and provisional answer keys released today
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search today's updates..."
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
            />
          </div>
        </div>

        {/* Filter Badges Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "All" ? "All Updates" : `${cat}s`}
              </button>
            ))}
          </div>

          {/* Board Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 font-bold text-[11px] uppercase mr-1">Authority:</span>
            {boards.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBoard(b)}
                className={`px-2.5 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                  selectedBoard === b
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Today Updates Master Data Table (Desktop View) */}
        <div className="hidden md:block overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white uppercase text-[11px] font-black tracking-wider">
              <tr>
                <th className="py-3 px-3.5 w-28">Post Date</th>
                <th className="py-3 px-3.5 w-36">Recruitment Board</th>
                <th className="py-3 px-3.5">Post Name / Exam Title</th>
                <th className="py-3 px-3.5 w-28">Vacancies</th>
                <th className="py-3 px-3.5 w-36">Qualification</th>
                <th className="py-3 px-3.5 w-36">Last Date / Status</th>
                <th className="py-3 px-3.5 w-36 text-center">More Information</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUpdates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                    No updates matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUpdates.map((item) => (
                  <tr key={item.id} className="hover:bg-rose-50/40 transition group">
                    {/* Date */}
                    <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span>{item.updateDate}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block pl-3">{item.updateTime}</span>
                    </td>

                    {/* Board */}
                    <td className="py-3 px-3.5">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-black text-[10px] border border-slate-200">
                        {item.boardShort}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[140px] mt-0.5" title={item.organization}>
                        {item.organization}
                      </span>
                    </td>

                    {/* Post Name */}
                    <td className="py-3 px-3.5">
                      <Link
                        href={item.detailsUrl}
                        className="font-bold text-slate-900 hover:text-blue-600 transition block text-xs group-hover:underline"
                      >
                        {item.postName}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                          {item.statusBadge}
                        </span>
                        {item.examPatternSlug && (
                          <Link
                            href={`/exam-pattern#${item.examPatternSlug}`}
                            className="text-[10px] font-semibold text-indigo-600 hover:underline flex items-center gap-0.5"
                          >
                            <span>Pattern &amp; Scheme</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </Link>
                        )}
                      </div>
                    </td>

                    {/* Vacancies */}
                    <td className="py-3 px-3.5 font-black text-slate-900 whitespace-nowrap">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {item.vacancies}
                      </span>
                    </td>

                    {/* Qualification */}
                    <td className="py-3 px-3.5 font-medium text-slate-600 text-xs">
                      {item.qualification}
                    </td>

                    {/* Last Date */}
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <span className="text-xs font-bold text-slate-800 block">
                        {item.lastDateOrExamDate}
                      </span>
                    </td>

                    {/* Action Links */}
                    <td className="py-3 px-3.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <a
                          href={item.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs flex items-center gap-1"
                        >
                          <span>Apply</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <Link
                          href={item.detailsUrl}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-lg text-[11px] transition"
                        >
                          Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Today Updates Mobile Cards View */}
        <div className="block md:hidden space-y-3">
          {filteredUpdates.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 hover:border-rose-300 transition"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  {item.updateDate} ({item.updateTime})
                </span>
                <span className="px-2 py-0.5 rounded bg-white text-slate-800 font-black text-[10px] border border-slate-200">
                  {item.boardShort}
                </span>
              </div>

              <div>
                <Link
                  href={item.detailsUrl}
                  className="font-bold text-sm text-slate-900 hover:text-blue-600 block"
                >
                  {item.postName}
                </Link>
                <span className="text-[11px] text-slate-500 block mt-0.5">{item.organization}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-200/60">
                <div>
                  <span className="text-slate-400 text-[10px] block">Vacancies:</span>
                  <span className="font-black text-emerald-700">{item.vacancies}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Eligibility:</span>
                  <span className="font-semibold text-slate-700 truncate block">{item.qualification}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200/60">
                <span className="font-bold text-rose-700 text-[11px]">
                  {item.lastDateOrExamDate}
                </span>

                <div className="flex items-center gap-1.5">
                  <a
                    href={item.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1"
                  >
                    <span>Apply</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link
                    href={item.detailsUrl}
                    className="bg-white border border-slate-200 text-slate-800 font-bold px-2.5 py-1 rounded-lg text-xs"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <span>
            Showing {filteredUpdates.length} of {TODAY_UPDATES_DATA.length} active announcements
          </span>

          <div className="flex items-center gap-3">
            <Link
              href="/exam-pattern"
              className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Exam Pattern Hub</span>
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link
              href="/selection-process"
              className="text-teal-600 font-bold hover:underline flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Selection Process</span>
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link
              href="/latest-notifications"
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>Full Notification Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
