import React from "react";
import { ShieldCheck, Heart } from "lucide-react";
import GovEmblem from "@/components/GovEmblem";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-12 pb-8 mt-16 border-t-4 border-blue-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Brand & About */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <GovEmblem className="w-8 h-8 text-amber-400" />
            <span className="text-xl font-black tracking-tight text-white">
              Gov<span className="text-blue-400">Search</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            India&apos;s premier Government Job Discovery Portal providing verified information on recruitment, exam notifications, admit cards, syllabus, and results from Central &amp; State government bodies.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Official &amp; Verified Recruitment Information</span>
          </div>
        </div>

        {/* Col 2: Top Departments */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-b border-slate-700 pb-1.5">
            Top Departments
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li><a href="/government-jobs/ssc" className="hover:text-amber-400 transition">Staff Selection Commission (SSC)</a></li>
            <li><a href="/government-jobs/railway" className="hover:text-amber-400 transition">Railway Recruitment Boards (RRB)</a></li>
            <li><a href="/government-jobs/banking" className="hover:text-amber-400 transition">Banking Recruitment (IBPS / SBI)</a></li>
            <li><a href="/government-jobs/police" className="hover:text-amber-400 transition">Police &amp; Defence Recruitment</a></li>
            <li><a href="/government-jobs?field=Teaching" className="hover:text-amber-400 transition">Teaching &amp; Education Jobs</a></li>
            <li><a href="/government-jobs?government_level=Central%20Government" className="hover:text-amber-400 transition">Central Government Vacancies</a></li>
          </ul>
        </div>

        {/* Col 3: Education Categories */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-b border-slate-700 pb-1.5">
            Jobs by Education
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li><a href="/government-jobs/10th" className="hover:text-amber-400 transition">10th Pass Government Jobs</a></li>
            <li><a href="/government-jobs/12th" className="hover:text-amber-400 transition">12th Pass Government Jobs</a></li>
            <li><a href="/government-jobs/graduate" className="hover:text-amber-400 transition">Graduate Government Jobs</a></li>
            <li><a href="/government-jobs/engineering" className="hover:text-amber-400 transition">Engineering (B.Tech/Diploma)</a></li>
            <li><a href="/government-jobs?qualification=ITI" className="hover:text-amber-400 transition">ITI Pass Govt Jobs</a></li>
            <li><a href="/government-jobs?qualification=Postgraduate" className="hover:text-amber-400 transition">Post Graduate Vacancies</a></li>
          </ul>
        </div>

        {/* Col 4: Quick Links & Safety */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-b border-slate-700 pb-1.5">
            Quick Discovery
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="/results"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white"
              >
                📊 Exam Results Portal
              </a>
            </li>
            <li>
              <a
                href="/exam-calendar"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white"
              >
                📅 Government Exam Calendar 2026
              </a>
            </li>
            <li>
              <a
                href="/syllabus"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white"
              >
                📖 Syllabus &amp; Exam Patterns
              </a>
            </li>
            <li>
              <a
                href="/admin"
                className="inline-flex items-center gap-1.5 text-amber-400 font-semibold hover:underline"
              >
                ⚙️ Admin Job Management
              </a>
            </li>
          </ul>

          <div className="mt-4 p-2.5 bg-slate-800/80 rounded-xl text-[11px] text-slate-300 border border-slate-700">
            <p className="font-semibold text-amber-300 mb-0.5">⚠️ Caution Notice:</p>
            <p className="text-[10px] leading-relaxed text-slate-400">
              Always verify official notification details directly on the recruiting agency&apos;s official website. GovSearch does not charge any fees for recruitment listings.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} GovSearch Portal. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          Made for Indian Govt Job Aspirants with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
        </p>
      </div>
    </footer>
  );
}
