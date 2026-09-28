"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Award, 
  Search, 
  BookOpen, 
  Clock, 
  AlertCircle, 
  FileText, 
  Download, 
  ExternalLink, 
  ArrowRight,
  Filter,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { EXAM_PATTERNS_AND_SELECTION, ExamPatternAndSelectionItem } from "@/lib/exam-pattern-and-selection-data";

export default function ExamPatternPage() {
  const [selectedBoard, setSelectedBoard] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedExam, setExpandedExam] = useState<string>("ssc-cgl");

  const boards = ["All", "SSC", "RRB", "Banking", "UPSC", "Defence"];

  const filteredExams = useMemo(() => {
    return EXAM_PATTERNS_AND_SELECTION.filter((item) => {
      const matchBoard = selectedBoard === "All" || item.board === selectedBoard;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.examName.toLowerCase().includes(q) ||
        item.boardFullName.toLowerCase().includes(q) ||
        item.postTitle.toLowerCase().includes(q) ||
        item.eligibilityQualification.toLowerCase().includes(q);

      return matchBoard && matchQuery;
    });
  }, [selectedBoard, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      {/* Breadcrumb */}
      <nav className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>›</span>
        <span className="font-bold text-slate-900">Exam Pattern</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b1c3d] via-[#102a5c] to-[#071329] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-900/40 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Exam Pattern for Various Exams 2026
                </h1>
                <span className="bg-blue-400/20 text-blue-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-300/30">
                  Official Schemes
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Subject-wise question weightage, total marks, time duration, negative marking rules and stage schemes (SSC, RRB, Banking, UPSC)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/selection-process"
              className="bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 text-teal-200 font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Selection Process</span>
            </Link>
            <Link
              href="/mock-tests"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition shadow flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Free Mocks &amp; PYQs</span>
            </Link>
          </div>
        </div>

        {/* Search & Board Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {boards.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBoard(b)}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                  selectedBoard === b
                    ? "bg-white text-slate-900 shadow-xs"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {b === "All" ? "All Boards" : b}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exam (e.g. CGL, NTPC, PO)..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:bg-white/20 focus:border-white transition"
            />
          </div>
        </div>
      </div>

      {/* Exam Pattern Cards & Tables */}
      <div className="space-y-6">
        {filteredExams.map((exam) => {
          const isExpanded = expandedExam === exam.id;

          return (
            <div
              key={exam.id}
              id={exam.slug}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden scroll-mt-24"
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedExam(isExpanded ? "" : exam.id)}
                className="p-5 sm:p-6 cursor-pointer hover:bg-slate-50 transition flex items-center justify-between gap-4 border-b border-slate-100"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-black text-xs">
                      {exam.board}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {exam.boardFullName}
                    </span>
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                      {exam.eligibilityQualification}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    {exam.examName}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Posts: {exam.postTitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden sm:inline-block text-xs font-bold text-blue-600">
                    {isExpanded ? "Collapse Details" : "View Pattern"}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              {isExpanded && (
                <div className="p-5 sm:p-6 space-y-6 bg-slate-50/50">
                  {/* Tiers List */}
                  {exam.tiers.map((tier, tIdx) => (
                    <div
                      key={tier.tierName}
                      className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                              {tIdx + 1}
                            </span>
                            <h3 className="font-black text-base text-slate-900">
                              {tier.tierName}
                            </h3>
                          </div>
                          <span className="text-xs text-slate-500 font-medium mt-0.5 block">
                            Mode: {tier.mode} &bull; Negative Marking: {tier.negativeScheme}
                          </span>
                        </div>

                        {/* Summary Badges */}
                        <div className="flex items-center gap-2 text-xs flex-wrap">
                          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-bold border border-blue-200">
                            {tier.totalQuestions} Questions
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                            {tier.totalMarks} Marks
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-bold border border-amber-200">
                            {tier.totalDuration}
                          </span>
                        </div>
                      </div>

                      {/* Subject Table */}
                      <div className="overflow-x-auto border border-slate-200 rounded-xl">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 text-slate-800 font-black uppercase text-[11px]">
                            <tr>
                              <th className="py-2.5 px-3">Subject / Module</th>
                              <th className="py-2.5 px-3 text-center">No. of Questions</th>
                              <th className="py-2.5 px-3 text-center">Max Marks</th>
                              <th className="py-2.5 px-3 text-center">Negative</th>
                              <th className="py-2.5 px-3">Medium</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700">
                            {tier.subjects.map((sub, sIdx) => (
                              <tr key={sIdx} className="hover:bg-slate-50">
                                <td className="py-2.5 px-3 font-semibold text-slate-900">
                                  {sub.subjectName}
                                </td>
                                <td className="py-2.5 px-3 text-center font-bold">
                                  {sub.questions}
                                </td>
                                <td className="py-2.5 px-3 text-center font-bold text-emerald-700">
                                  {sub.marks}
                                </td>
                                <td className="py-2.5 px-3 text-center text-rose-600 font-bold">
                                  {sub.negativeMarking}
                                </td>
                                <td className="py-2.5 px-3 font-medium text-slate-600">
                                  {sub.medium}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {tier.qualifyingCriteria && (
                        <p className="text-xs text-slate-600 bg-amber-50/80 border border-amber-200 p-2.5 rounded-xl font-medium">
                          <strong>Note on Evaluation:</strong> {tier.qualifyingCriteria}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Cutoff Criteria */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900 block mb-2">
                      Minimum Qualifying Cutoff Standards
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {exam.minimumCutoffs.map((cut) => (
                        <div key={cut.category} className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                          <span className="text-slate-500 font-medium block">{cut.category}</span>
                          <span className="font-black text-slate-900 mt-0.5 block">{cut.qualifyingPercent}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/selection-process#${exam.slug}`}
                        className="text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>View Selection Stages</span>
                      </Link>
                      <Link
                        href="/mock-tests"
                        className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Take Free Mock Test</span>
                      </Link>
                    </div>

                    <a
                      href={exam.freeJobAlertPatternUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                    >
                      <span>FreeJobAlert Exam Pattern Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
