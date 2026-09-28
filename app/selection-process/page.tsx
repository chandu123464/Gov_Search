"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Layers, 
  Search, 
  Award, 
  CheckCircle2, 
  FileCheck2, 
  Activity, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles
} from "lucide-react";
import { EXAM_PATTERNS_AND_SELECTION } from "@/lib/exam-pattern-and-selection-data";

export default function SelectionProcessPage() {
  const [selectedBoard, setSelectedBoard] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedExam, setExpandedExam] = useState<string>("ssc-cpo");

  const boards = ["All", "SSC", "RRB", "Banking", "UPSC", "Defence"];

  const filteredExams = useMemo(() => {
    return EXAM_PATTERNS_AND_SELECTION.filter((item) => {
      const matchBoard = selectedBoard === "All" || item.board === selectedBoard;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.examName.toLowerCase().includes(q) ||
        item.boardFullName.toLowerCase().includes(q) ||
        item.postTitle.toLowerCase().includes(q);

      return matchBoard && matchQuery;
    });
  }, [selectedBoard, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      {/* Breadcrumb */}
      <nav className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>›</span>
        <span className="font-bold text-slate-900">Selection Process</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-teal-800/40 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center shadow-md flex-shrink-0">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Selection Process for Various Exams 2026
                </h1>
                <span className="bg-teal-400/20 text-teal-200 text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-300/30">
                  Step-by-Step Procedure
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Complete recruitment workflows: CBT Written Exam &rarr; Physical PET/PST &rarr; Skill/Typing &rarr; Document Verification &rarr; Medical &rarr; Final Merit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/exam-pattern"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Exam Pattern Hub</span>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {boards.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBoard(b)}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                  selectedBoard === b
                    ? "bg-teal-400 text-slate-950 shadow-xs"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {b === "All" ? "All Authorities" : b}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-teal-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search selection process..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:bg-white/20 focus:border-white transition"
            />
          </div>
        </div>
      </div>

      {/* Selection Process List */}
      <div className="space-y-6">
        {filteredExams.map((exam) => {
          const isExpanded = expandedExam === exam.id;

          return (
            <div
              key={exam.id}
              id={exam.slug}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden scroll-mt-24"
            >
              {/* Header */}
              <div
                onClick={() => setExpandedExam(isExpanded ? "" : exam.id)}
                className="p-5 sm:p-6 cursor-pointer hover:bg-slate-50 transition flex items-center justify-between gap-4 border-b border-slate-100"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-teal-900 text-white font-black text-xs">
                      {exam.board}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {exam.boardFullName}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    {exam.examName} &ndash; Selection Workflow
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Total {exam.selectionStages.length} Mandatory Stages &bull; {exam.postTitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden sm:inline-block text-xs font-bold text-teal-700">
                    {isExpanded ? "Collapse Stages" : "View Workflow"}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-5 sm:p-6 space-y-6 bg-slate-50/50">
                  {/* Visual Stage Stepper */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {exam.selectionStages.map((stage) => (
                      <div
                        key={stage.stageNumber}
                        className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs relative flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-black text-xs flex items-center justify-center">
                              {stage.stageNumber}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                              {stage.stageType}
                            </span>
                          </div>

                          <h3 className="font-black text-sm text-slate-900 leading-snug">
                            {stage.stageName}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>

                        <ul className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-600">
                          {stage.details.map((d, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1">
                              <span className="text-teal-600 font-bold">&bull;</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Physical Standard & Endurance Test Benchmark Table (If applicable) */}
                  {exam.physicalCriteria && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-rose-600" />
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                          Physical Standard Test (PST) &amp; Physical Endurance Test (PET)
                        </h4>
                      </div>

                      <div className="overflow-x-auto border border-slate-200 rounded-xl">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 text-slate-800 font-black uppercase text-[10px]">
                            <tr>
                              <th className="py-2.5 px-3">Candidate Category</th>
                              <th className="py-2.5 px-3">Height (Min)</th>
                              <th className="py-2.5 px-3">Chest (Unexpanded / Exp.)</th>
                              <th className="py-2.5 px-3">Running / Sprint Test</th>
                              <th className="py-2.5 px-3">Long Jump</th>
                              <th className="py-2.5 px-3">High Jump</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700">
                            {exam.physicalCriteria.map((pc, pIdx) => (
                              <tr key={pIdx} className="hover:bg-slate-50">
                                <td className="py-2.5 px-3 font-bold text-slate-900">
                                  {pc.gender} Candidates
                                </td>
                                <td className="py-2.5 px-3 font-semibold text-blue-700">
                                  {pc.heightCm} cm
                                </td>
                                <td className="py-2.5 px-3 font-medium">
                                  {pc.chestCm || "Not Applicable"}
                                </td>
                                <td className="py-2.5 px-3 font-medium text-emerald-700">
                                  {pc.race}
                                </td>
                                <td className="py-2.5 px-3 font-medium">
                                  {pc.longJump || "N/A"}
                                </td>
                                <td className="py-2.5 px-3 font-medium">
                                  {pc.highJump || "N/A"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Footer Action Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/exam-pattern#${exam.slug}`}
                        className="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View Exam Pattern &amp; Marks</span>
                      </Link>
                      <Link
                        href="/mock-tests"
                        className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Practice Mocks</span>
                      </Link>
                    </div>

                    <a
                      href={exam.freeJobAlertSelectionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                    >
                      <span>FreeJobAlert Selection Process Source</span>
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
