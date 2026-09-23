import React from "react";
import { Metadata } from "next";
import GovEmblem from "@/components/GovEmblem";
import { ShieldCheck, Target, Heart, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About GovSearch – India's Trusted Government Job Discovery Portal",
  description: "Learn about GovSearch mission, verified notification framework, and commitment to Indian job seekers.",
};

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
          <GovEmblem className="w-12 h-12 text-slate-800" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              About GovSearch
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Find Government Jobs. Build a Better Future.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            <strong>GovSearch</strong> is India&apos;s premier, dedicated discovery platform designed specifically to connect millions of aspiring job seekers with authentic, verified Central and State Government recruitment notifications.
          </p>

          <p>
            Navigating thousands of decentralized government recruitment portals, complex eligibility conditions, and critical application deadlines can be overwhelming. GovSearch simplifies this journey through our <strong>Data-Driven Qualification Matching Engine</strong>, transparent category filtering, and direct links to official recruiting websites.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
              <div className="flex items-center gap-2 font-black text-blue-900 text-sm">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>100% Official Notifications</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every job notice, vacancy count, qualification requirement, and date is verified against official Gazette notifications and recruitment portal releases.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
              <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                <Target className="w-5 h-5 text-emerald-600" />
                <span>Zero Subscription Fees</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our discovery tools, notifications, last-date reminders, and eligibility filters are 100% free to use for all Indian citizens and students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

