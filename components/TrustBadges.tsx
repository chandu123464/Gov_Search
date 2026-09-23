import React from "react";
import { CheckCircle2, Search, RefreshCw, Smartphone, DollarSign, Award } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 my-8">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        {/* Five Value Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 flex-1">
          {/* 1. Verified */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block leading-tight">
                100% Verified Jobs
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Only official notifications
              </span>
            </div>
          </div>

          {/* 2. Easy Search & Filters */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block leading-tight">
                Easy Search &amp; Filters
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Find relevant jobs quickly
              </span>
            </div>
          </div>

          {/* 3. Regular Updates */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block leading-tight">
                Regular Updates
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Never miss an opportunity
              </span>
            </div>
          </div>

          {/* 4. Mobile Friendly */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block leading-tight">
                Mobile Friendly
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Access anywhere, anytime
              </span>
            </div>
          </div>

          {/* 5. Free to Use */}
          <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-black">₹</span>
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block leading-tight">
                Free to Use
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                No subscription required
              </span>
            </div>
          </div>
        </div>

        {/* National Slogan and Tricolor Ribbon */}
        <div className="flex flex-col items-center xl:items-end justify-center pt-4 xl:pt-0 border-t xl:border-t-0 xl:border-l border-slate-100 xl:pl-6 flex-shrink-0">
          <span className="font-serif italic text-sm sm:text-base font-bold text-slate-700 select-none">
            &ldquo;A Better Career Builds a Stronger Nation&rdquo;
          </span>
          {/* Tricolor Ribbon */}
          <div className="flex items-center w-36 h-2 rounded-full overflow-hidden shadow-xs mt-1.5">
            <div className="flex-1 h-full bg-[#FF9933]" />
            <div className="flex-1 h-full bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full border-[0.5px] border-[#000088]" />
            </div>
            <div className="flex-1 h-full bg-[#128807]" />
          </div>
        </div>
      </div>
    </div>
  );
}

