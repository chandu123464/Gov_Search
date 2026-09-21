"use client";

import React from "react";
import { Clock, ArrowRight, Bell, Calendar } from "lucide-react";
import { getDaysRemainingText, formatDateIndian } from "@/lib/date-utils";

interface Props {
  jobs: any[];
}

export default function ClosingSoonWidget({ jobs }: Props) {
  if (!jobs || jobs.length === 0) return null;

  return (
    <div className="w-full bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden mb-6">
      {/* Widget Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm animate-pulse">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-black uppercase tracking-wide">Closing Soon Alerts</h3>
              <span className="bg-white text-red-700 text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase">
                Urgent
              </span>
            </div>
            <p className="text-[11px] text-red-100">
              Applications closing this week — apply before the server deadline
            </p>
          </div>
        </div>

        <a
          href="/last-date-reminder"
          className="text-xs font-bold text-white bg-red-900/60 hover:bg-red-900 px-3 py-1.5 rounded-lg border border-red-300/40 transition flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-100">
        {jobs.slice(0, 5).map((job) => {
          const remaining = getDaysRemainingText(job.last_date);
          const isToday = remaining.text.includes("TODAY");

          return (
            <div
              key={job.id}
              className="p-3.5 hover:bg-red-50/40 transition flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`text-[10px] font-black px-2 py-1 rounded-md tracking-wider flex-shrink-0 uppercase ${
                    isToday
                      ? "bg-red-600 text-white animate-pulse"
                      : remaining.badgeType === "urgent"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-200 text-slate-800"
                  }`}
                >
                  {remaining.text}
                </span>

                <div className="min-w-0">
                  <a
                    href={`/job/${job.slug}`}
                    className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-blue-700 transition truncate block"
                  >
                    {job.organization_name}: {job.post_name}
                  </a>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>Last Date: {formatDateIndian(job.last_date)}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">
                      {job.number_of_posts.toLocaleString("en-IN")} Posts
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={`/job/${job.slug}`}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex-shrink-0 transition"
              >
                Apply →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
