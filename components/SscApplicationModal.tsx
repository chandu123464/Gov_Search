"use client";

import React from "react";
import { X, Download, Printer, ExternalLink, FileText } from "lucide-react";

interface SscApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SscApplicationModal({ isOpen, onClose }: SscApplicationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto h-[92vh] flex flex-col">
        
        {/* HEADER */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Staff Selection Commission &bull; Submitted Application Form
              </h3>
              <p className="text-xs text-slate-400">
                SI/CPO Exam 2026 &bull; Registration No: 10011969007 &bull; Submitted on 27/09/2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/ssc/application-pdf?download=true"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
              title="Download Application PDF"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* EMBEDDED PDF VIEWER */}
        <div className="flex-1 bg-slate-100 relative">
          <iframe
            src="/api/ssc/application-pdf#toolbar=1"
            className="w-full h-full border-none"
            title="SSC Application Form"
          />
        </div>

        {/* FOOTER */}
        <div className="bg-white border-t border-slate-200 px-5 py-3 flex items-center justify-between flex-shrink-0">
          <div className="text-xs text-slate-600">
            Status: <span className="font-bold text-emerald-700">Application Completed (Contents Not Verified)</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/ssc/application-pdf?download=true"
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download Form
            </a>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
