"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FileText, 
  Search, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Filter,
  Calendar,
  Building
} from "lucide-react";
import { PRACTICE_RESOURCES } from "@/lib/practice-resources";

interface PreviousPaperItem {
  id: string;
  examBoard: "SSC" | "RRB" | "Banking" | "UPSC" | "State PSC" | "Defence";
  examName: string;
  year: number;
  shifts: string;
  paperTitle: string;
  totalMarks: number;
  downloadUrl: string;
  hasOfficialKey: boolean;
  freeJobAlertPaperUrl: string;
  mockTestUrl?: string;
}

const PREVIOUS_PAPERS_DATA: PreviousPaperItem[] = [
  {
    id: "pp-1",
    examBoard: "SSC",
    examName: "SSC Combined Graduate Level (CGL)",
    year: 2026,
    shifts: "39 Shifts (All Days)",
    paperTitle: "SSC CGL 2026 Tier-1 Official Question Papers with Provisional Key",
    totalMarks: 200,
    downloadUrl: "https://ssc.gov.in/",
    hasOfficialKey: true,
    freeJobAlertPaperUrl: "https://www.freejobalert.com/previous-papers/",
    mockTestUrl: "/mock-tests",
  },
  {
    id: "pp-2",
    examBoard: "RRB",
    examName: "RRB NTPC CEN 01/2019 & 05/2026",
    year: 2026,
    shifts: "133 Shifts (CBT-1 & CBT-2)",
    paperTitle: "RRB NTPC Shift-Wise Question Papers with Final Key & Solutions",
    totalMarks: 100,
    downloadUrl: "https://www.rrbapply.gov.in/",
    hasOfficialKey: true,
    freeJobAlertPaperUrl: "https://www.freejobalert.com/previous-papers/",
    mockTestUrl: "/mock-tests",
  },
  {
    id: "pp-3",
    examBoard: "SSC",
    examName: "SSC Sub-Inspector Delhi Police & CAPF (CPO)",
    year: 2025,
    shifts: "9 Shifts (Paper-1)",
    paperTitle: "SSC CPO SI 2024-2025 Paper-1 Shift Question Papers & Answer Keys",
    totalMarks: 200,
    downloadUrl: "https://ssc.gov.in/",
    hasOfficialKey: true,
    freeJobAlertPaperUrl: "https://www.freejobalert.com/previous-papers/",
    mockTestUrl: "/mock-tests",
  },
  {
    id: "pp-4",
    examBoard: "Banking",
    examName: "IBPS PO / MT Prelims & Mains",
    year: 2025,
    shifts: "8 Shifts",
    paperTitle: "IBPS PO Memory Based Question Papers with Detailed Solutions",
    totalMarks: 100,
    downloadUrl: "https://www.ibps.in/",
    hasOfficialKey: true,
    freeJobAlertPaperUrl: "https://www.freejobalert.com/previous-papers/",
    mockTestUrl: "/mock-tests",
  },
  {
    id: "pp-5",
    examBoard: "UPSC",
    examName: "UPSC Civil Services Examination (CSE)",
    year: 2025,
    shifts: "GS-I & CSAT Sets A, B, C, D",
    paperTitle: "UPSC CSE Prelims 2025 Question Papers with Official Commission Key",
    totalMarks: 400,
    downloadUrl: "https://upsc.gov.in/",
    hasOfficialKey: true,
    freeJobAlertPaperUrl: "https://www.freejobalert.com/previous-papers/",
    mockTestUrl: "/mock-tests",
  },
  {
    id: "pp-6",
    examBoard: "SSC",
    examName: "SSC Combined Higher Secondary Level (CHSL)",
    year: 2025,
    shifts: "24 Shifts",
    paperTitle: "SSC CHSL Tier-1 & Tier-2 Solved Papers with Key",
    totalMarks: 200,
    downloadUrl: "https://ssc.gov.in/",
    hasOfficialKey: true,
    freeJobAlertPaperUrl: "https://www.freejobalert.com/previous-papers/",
    mockTestUrl: "/mock-tests",
  },
];

export default function PreviousPapersPage() {
  const [selectedBoard, setSelectedBoard] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const boards = ["All", "SSC", "RRB", "Banking", "UPSC", "State PSC"];

  const filteredPapers = useMemo(() => {
    return PREVIOUS_PAPERS_DATA.filter((p) => {
      const matchBoard = selectedBoard === "All" || p.examBoard === selectedBoard;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.paperTitle.toLowerCase().includes(q) ||
        p.examName.toLowerCase().includes(q) ||
        p.examBoard.toLowerCase().includes(q);

      return matchBoard && matchQuery;
    });
  }, [selectedBoard, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      {/* Breadcrumb */}
      <nav className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>›</span>
        <span className="font-bold text-slate-900">Previous Question Papers</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-800/40 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Previous Year Question Papers &amp; Official Keys
                </h1>
                <span className="bg-blue-400/20 text-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-300/30">
                  PDF Downloads
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Authentic shift-wise question papers with official final master keys released by SSC, RRB, IBPS &amp; UPSC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/mock-tests"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition shadow flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Practice CBT Mock Tests</span>
            </Link>
            <a
              href="https://www.freejobalert.com/previous-papers/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <span>FreeJobAlert Hub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Filter Bar */}
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
            <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search previous papers..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:bg-white/20 focus:border-white transition"
            />
          </div>
        </div>
      </div>

      {/* Papers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-5 sm:p-7 space-y-4">
        <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900 text-white uppercase text-[11px] font-black tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-28">Authority</th>
                <th className="py-3.5 px-4">Exam &amp; Paper Title</th>
                <th className="py-3.5 px-4 w-32">Shifts / Sets</th>
                <th className="py-3.5 px-4 w-28 text-center">Official Key</th>
                <th className="py-3.5 px-4 text-center w-48">Download / Practice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredPapers.map((paper) => (
                <tr key={paper.id} className="hover:bg-blue-50/50 transition group">
                  <td className="py-3.5 px-4 font-black">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-xs border border-slate-200">
                      {paper.examBoard}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block group-hover:text-blue-600 transition">
                      {paper.paperTitle}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Exam: {paper.examName} &bull; Year: {paper.year}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-700 text-xs">
                    {paper.shifts}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {paper.hasOfficialKey ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Included</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs font-medium">Pending</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href={paper.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </a>
                      <Link
                        href={paper.mockTestUrl || "/mock-tests"}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-xl text-xs transition"
                      >
                        Practice CBT
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
