"use client";

import React, { useState } from "react";
import { 
  JobSyllabusData, 
  getJobSyllabus 
} from "@/lib/syllabus-data";
import { 
  BookOpen, 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Award, 
  TrendingUp, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  BarChart3,
  ExternalLink
} from "lucide-react";

interface JobSyllabusProps {
  slug: string;
  field: string;
  postName: string;
  officialNotificationUrl?: string;
}

export default function JobSyllabusSection({
  slug,
  field,
  postName,
  officialNotificationUrl
}: JobSyllabusProps) {
  const syllabus: JobSyllabusData = getJobSyllabus(slug, field, postName);
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);

  return (
    <div id="syllabus-section" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
            <BookOpen className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight">
                Exam Pattern &amp; Detailed Syllabus 2026
              </h3>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                Official Scheme
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Subject-wise marks distribution, topics, subtopics, and negative marking rules
            </p>
          </div>
        </div>

        {officialNotificationUrl && (
          <a
            href={officialNotificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Official Syllabus PDF</span>
          </a>
        )}
      </div>

      {/* Key Exam Rules Overview Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Questions</span>
          <span className="text-base font-black text-slate-900 mt-0.5 block">
            {syllabus.total_questions} MCQs
          </span>
          <span className="text-[10px] text-slate-500">Objective Mode</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Marks</span>
          <span className="text-base font-black text-indigo-700 mt-0.5 block">
            {syllabus.total_marks} Marks
          </span>
          <span className="text-[10px] text-slate-500">{syllabus.total_stages.split(",")[0]}</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Exam Duration</span>
          <span className="text-base font-black text-emerald-700 mt-0.5 block">
            {syllabus.time_duration.split("(")[0]}
          </span>
          <span className="text-[10px] text-slate-500">Standard Timing</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Negative Marking</span>
          <span className="text-xs font-black text-red-600 mt-1 block">
            {syllabus.negative_marking.split(" ")[0]} Mark
          </span>
          <span className="text-[10px] text-slate-500 truncate block">Per incorrect answer</span>
        </div>
      </div>

      {/* 1. Exam Pattern & Weightage Table */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <span>Subject-Wise Marks &amp; Weightage Distribution</span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-2.5 px-3">Subject / Test Section</th>
                <th className="py-2.5 px-3 text-center">Questions</th>
                <th className="py-2.5 px-3 text-center">Maximum Marks</th>
                <th className="py-2.5 px-3">Weightage (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {syllabus.pattern.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-bold text-slate-800">
                    {item.subject}
                  </td>
                  <td className="py-3 px-3 text-center font-extrabold text-slate-900">
                    {item.questions}
                  </td>
                  <td className="py-3 px-3 text-center font-black text-indigo-700">
                    {item.marks}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${item.weightage_percent}%` }}
                        />
                      </div>
                      <span className="font-extrabold text-slate-700 w-9 text-right">
                        {item.weightage_percent}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-black text-slate-900 border-t-2 border-slate-200">
                <td className="py-2.5 px-3 uppercase">Total Combined</td>
                <td className="py-2.5 px-3 text-center">{syllabus.total_questions} Qs</td>
                <td className="py-2.5 px-3 text-center text-indigo-700">{syllabus.total_marks} Marks</td>
                <td className="py-2.5 px-3 font-bold">100% Weightage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Topics & Sub-topics Detailed Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Topics &amp; Sub-topics Syllabus Breakdown</span>
          </div>

          <span className="text-[11px] text-slate-500 italic">
            Click subjects below to inspect detailed topics
          </span>
        </div>

        {/* Subject Select Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {syllabus.subjects.map((sub, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSubjectIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                activeSubjectIndex === idx
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
              }`}
            >
              <span>{sub.subject_name}</span>
              <span className="ml-1.5 opacity-80 font-normal">({sub.total_marks}M)</span>
            </button>
          ))}
        </div>

        {/* Selected Subject Detailed Topics */}
        {syllabus.subjects[activeSubjectIndex] && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-black uppercase text-indigo-900">
                {syllabus.subjects[activeSubjectIndex].subject_name} Syllabus
              </span>
              <span className="text-xs font-bold text-slate-500">
                Total Marks: {syllabus.subjects[activeSubjectIndex].total_marks}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {syllabus.subjects[activeSubjectIndex].topics.map((topic, tIdx) => (
                <div 
                  key={tIdx} 
                  className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-extrabold text-xs text-slate-900">
                      {topic.topic_name}
                    </h5>
                    {topic.expected_questions && (
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                        {topic.expected_questions}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {topic.subtopics.map((subtopic, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-800 text-[11px] font-medium px-2 py-0.5 rounded-md transition"
                      >
                        {subtopic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Preparation Strategy & Rules */}
      {syllabus.preparation_tips && syllabus.preparation_tips.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-950 uppercase tracking-wide">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Preparation Strategy &amp; Syllabus Guidance</span>
          </div>

          <ul className="space-y-1.5 text-xs text-amber-900 leading-relaxed pl-1">
            {syllabus.preparation_tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

