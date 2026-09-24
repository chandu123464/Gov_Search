"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Timer,
  CheckCircle2,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";
import GovEmblem from "@/components/GovEmblem";
import {
  PRACTICE_RESOURCES,
  PracticeResource,
  SEVEN_STEP_ROUTINE,
  EXAM_COMBINATIONS
} from "@/lib/practice-resources";

export default function MockTestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Exams");
  const [selectedType, setSelectedType] = useState<string>("all");

  const categories = ["All Exams", "SSC", "Railway", "Banking", "State PSC"];

  const filteredResources = useMemo(() => {
    return PRACTICE_RESOURCES.filter((res) => {
      const matchCat =
        selectedCategory === "All Exams" ||
        res.category === selectedCategory ||
        res.category === "All Exams" ||
        res.targetExams.some((e) => e.toLowerCase().includes(selectedCategory.toLowerCase()));

      const matchType =
        selectedType === "all" ||
        res.resourceType === selectedType ||
        res.resourceType === "all_in_one";

      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        res.title.toLowerCase().includes(query) ||
        res.platform.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        res.targetExams.some((e) => e.toLowerCase().includes(query));

      return matchCat && matchType && matchQuery;
    });
  }, [selectedCategory, selectedType, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white relative overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold text-blue-200 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>100% Free Practice Hub &bull; PYQs + Mocks + Official Answer Keys</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Previous Year Papers, Official Keys &amp; <span className="text-blue-400">Free Mock Tests</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Curated repository of top-tier exam practice tools for SSC CGL/CHSL, RRB NTPC, Banking (IBPS/SBI), and AP/TS State PSC exams. Stop just watching lectures—master the exam hall through real shift papers and mock simulations.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
                <span className="text-xl sm:text-2xl font-black text-blue-400 block">500+</span>
                <span className="text-[11px] text-slate-300 font-medium">Shift-Wise PYQs</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block">100+</span>
                <span className="text-[11px] text-slate-300 font-medium">Free Full Mocks</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
                <span className="text-xl sm:text-2xl font-black text-amber-400 block">100%</span>
                <span className="text-[11px] text-slate-300 font-medium">Official Final Keys</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
                <span className="text-xl sm:text-2xl font-black text-indigo-400 block">7 Steps</span>
                <span className="text-[11px] text-slate-300 font-medium">Proven Routine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* SECTION 1: 7-STEP ROUTINE */}
        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-1">
            <span className="text-xs font-black text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              Exam Mastery Framework
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pt-1">
              A Highly Effective Free Preparation Routine
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Follow this 7-step sequence for every topic. This cycle produces 3x better retention and speed than passive video watching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
            {SEVEN_STEP_ROUTINE.map((st) => (
              <div
                key={st.step}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-600 text-white">
                      Step {st.step}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {st.badge}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-blue-700 transition">
                    {st.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {st.action}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-200 text-[10px] text-slate-500">
                  <span className="font-bold text-slate-700 block">Recommended:</span>
                  <span className="truncate block text-blue-600">{st.recommendedPlatform}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: SMART EXAM COMBINATIONS */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Recommended Free Combination Stacks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Optimal resource combinations curated for specific recruitment sectors:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXAM_COMBINATIONS.map((combo) => (
              <div
                key={combo.examName}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    EXAM STACK
                  </span>
                  <h3 className="text-sm font-black text-slate-900 leading-snug">
                    {combo.examName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {combo.tagline}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  {combo.recommendedStack.map((stk) => (
                    <a
                      key={stk.purpose}
                      href={stk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 transition"
                    >
                      <span className="font-semibold text-slate-800 truncate mr-2">{stk.source}</span>
                      <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 flex-shrink-0">
                        {stk.badge}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: DIRECTORY OF PRACTICE RESOURCES */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Verified Practice Resources Directory ({filteredResources.length})
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Direct access to Testbook, Adda247, Oliveboard, and official government portals.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search PYQs, mocks, SSC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 shadow-2xs"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition cursor-pointer flex-shrink-0 ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="h-4 w-px bg-slate-200 mx-1 flex-shrink-0" />

            {(["all", "pyq", "mock_test", "answer_key"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedType(t)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer flex-shrink-0 ${
                  selectedType === t
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {t === "all" ? "All Formats" : t === "pyq" ? "PYQs Only" : t === "mock_test" ? "Mock Tests" : "Answer Keys"}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative group"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition border ${
                    item.isOfficial ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-600 border-blue-100"
                  }`}>
                    {item.resourceType === "answer_key" ? (
                      <FileCheck2 className="w-7 h-7" />
                    ) : item.resourceType === "pyq" ? (
                      <BookOpen className="w-7 h-7" />
                    ) : (
                      <Timer className="w-7 h-7" />
                    )}
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {item.platform}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      {item.isOfficial && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-300">
                          ★ Official Government Portal
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition block leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
                      <span className="text-slate-400 font-medium">Exams:</span>
                      {item.targetExams.slice(0, 6).map((e) => (
                        <span key={e} className="bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 text-[11px]">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-row lg:flex-col items-center justify-between lg:justify-center gap-3 pt-4 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-100 flex-shrink-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto lg:w-48 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm transition shadow-sm hover:shadow flex items-center justify-center gap-2 text-center"
                  >
                    <span>Practice Free Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto lg:w-48 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 text-center border border-slate-200"
                  >
                    <span>Track on Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: IMPORTANT NOTICE ABOUT OFFICIAL ANSWER KEYS */}
        <section className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-black text-amber-950">
              Crucial Tip: Always Verify with Official Final Answer Keys
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
              Coaching websites and test platforms frequently provide tentative solved papers with occasional disputes. For authentic evaluation, always check the official exam website (such as <a href="https://ssc.gov.in" target="_blank" rel="noopener noreferrer" className="font-bold underline text-amber-950">ssc.gov.in</a> or your State PSC portal) to download the final authenticated key and official response sheet.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
