import React from "react";
import { Metadata } from "next";
import { Newspaper, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "GovSearch Blog & Career Insights – Preparation Guides 2026",
  description: "Expert preparation strategies, exam notifications breakdown, syllabus analysis, and Sarkari Naukri career advice.",
};

export default function BlogPage() {
  const articles = [
    {
      id: "1",
      title: "How to Prepare for SSC CHSL 2026: Tier-1 Strategy & Topic Weightage",
      category: "SSC Preparation",
      date: "18 Sep 2026",
      readTime: "5 min read",
      summary: "Comprehensive guide to mastering Quantitative Aptitude, General Intelligence, English Language, and General Awareness for SSC CHSL.",
    },
    {
      id: "2",
      title: "Railway Group D 2026 Recruitment: Important Changes in CBT & Physical Tests",
      category: "Railway Exams",
      date: "15 Sep 2026",
      readTime: "4 min read",
      summary: "Understand the updated CBT marking scheme, normalized scoring formula, and PET requirements for 32,438 Group D posts.",
    },
    {
      id: "3",
      title: "10th & 12th Pass Government Jobs with High Pay Scales in 2026",
      category: "Career Guidance",
      date: "12 Sep 2026",
      readTime: "6 min read",
      summary: "Discover stable government careers available right after Matriculation and Intermediate with 7th Pay Commission pay bands.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span>›</span>
          <span className="font-bold text-slate-800">Blog</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <Newspaper className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              GovSearch Career Insights &amp; Articles
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Study strategies, vacancy analysis, and expert guidance for government exam aspirants
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((item) => (
          <article key={item.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {item.category}
              </span>
              <h3 className="text-base font-black text-slate-900 mt-2.5 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </span>
              <span>{item.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

