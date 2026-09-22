import React from "react";
import { ShieldCheck, Info, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-12 pb-8 mt-16 border-t-4 border-blue-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: About */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              FJA
            </div>
            <span className="text-lg font-black text-white">
              FREE<span className="text-amber-500">JOB</span>ALERT.COM
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            India&apos;s leading Sarkari Naukri portal providing daily updates on recruitment, exam notifications, admit cards, answer keys, and results from UPSC, SSC, Railway, Banking, Police, and State PSCs.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Official &amp; Verified Recruitment Information</span>
          </div>
        </div>

        {/* Col 2: Top Sectors */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-b border-slate-700 pb-1.5">
            Top Job Categories
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li><a href="/government-jobs/railway" className="hover:text-amber-400 transition">Railway Recruitment (RRB)</a></li>
            <li><a href="/government-jobs/ssc" className="hover:text-amber-400 transition">Staff Selection Commission (SSC)</a></li>
            <li><a href="/government-jobs/banking" className="hover:text-amber-400 transition">Bank Jobs (IBPS, SBI, RBI)</a></li>
            <li><a href="/government-jobs/police" className="hover:text-amber-400 transition">Police &amp; SI Recruitment</a></li>
            <li><a href="/government-jobs/defence" className="hover:text-amber-400 transition">Defence Jobs (Army, Navy, Airforce)</a></li>
            <li><a href="/government-jobs/teaching" className="hover:text-amber-400 transition">Teaching &amp; Faculty Jobs</a></li>
          </ul>
        </div>

        {/* Col 3: Education */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-b border-slate-700 pb-1.5">
            Jobs by Education
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li><a href="/government-jobs/10th" className="hover:text-amber-400 transition">10th Pass Government Jobs</a></li>
            <li><a href="/government-jobs/12th" className="hover:text-amber-400 transition">12th Pass Government Jobs</a></li>
            <li><a href="/government-jobs/graduate" className="hover:text-amber-400 transition">Graduate Government Jobs</a></li>
            <li><a href="/government-jobs/engineering" className="hover:text-amber-400 transition">B.Tech / Engineering Jobs</a></li>
            <li><a href="/government-jobs?qualification=diploma" className="hover:text-amber-400 transition">Diploma Government Jobs</a></li>
            <li><a href="/government-jobs?qualification=iti" className="hover:text-amber-400 transition">ITI Pass Govt Jobs</a></li>
          </ul>
        </div>

        {/* Col 4: Quick Alerts & Safety */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-b border-slate-700 pb-1.5">
            Important Alert Tools
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="/last-date-reminder"
                className="inline-flex items-center gap-1.5 text-amber-400 font-semibold hover:underline"
              >
                ⏰ Last Date Reminder Portal
              </a>
            </li>
            <li>
              <a
                href="/upcoming-jobs"
                className="inline-flex items-center gap-1.5 text-sky-400 font-semibold hover:underline"
              >
                🚀 Upcoming Recruitment 2026
              </a>
            </li>
            <li>
              <a
                href="/admin"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white"
              >
                Admin Job Management
              </a>
            </li>
          </ul>
          <div className="mt-4 p-2.5 bg-slate-800 rounded text-[11px] text-slate-300 border border-slate-700">
            <p className="font-semibold text-amber-300 mb-0.5">⚠️ Caution Notice:</p>
            <p className="text-[10px] leading-relaxed text-slate-400">
              Always verify official notification details on the recruitment agency&apos;s official website. We do not charge any fees for job notifications.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} FreeJobAlert Portal. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          Made for Indian Govt Job Aspirants with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
        </p>
      </div>
    </footer>
  );
}

