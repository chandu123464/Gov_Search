"use client";

import React, { useState } from "react";
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  RefreshCw,
  Mail,
  User,
  Info
} from "lucide-react";
import GovEmblem from "@/components/GovEmblem";
import { SscStatusResult } from "@/lib/ssc-service";

interface SscAdmitCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  statusData: SscStatusResult | null;
  onRefreshStatus?: () => void;
  isRefreshing?: boolean;
}

export default function SscAdmitCardModal({
  isOpen,
  onClose,
  statusData,
  onRefreshStatus,
  isRefreshing = false,
}: SscAdmitCardModalProps) {
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentNotice, setEmailSentNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const appliedExam = statusData?.appliedExam;
  const candidate = statusData?.candidate;
  const isReleased = appliedExam?.admitCardStatus === "RELEASED";

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async () => {
    try {
      setEmailSending(true);
      setEmailSentNotice(null);
      const res = await fetch("/api/ssc/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sendEmail: true }),
      });
      const data = await res.json();
      if (data.emailResult?.success) {
        setEmailSentNotice(`Status notification successfully sent to ${data.emailResult.recipient}`);
      } else {
        setEmailSentNotice(data.emailResult?.reason || "Email notification queued.");
      }
    } catch (err: any) {
      setEmailSentNotice("Failed to send email: " + err.message);
    } finally {
      setEmailSending(false);
      setTimeout(() => setEmailSentNotice(null), 6000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg tracking-tight">
                  Staff Selection Commission &bull; Admit Card Portal
                </h3>
                <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                  isReleased 
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}>
                  {isReleased ? "Released" : "Still Not Released"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sub-Inspector in Delhi Police and Central Armed Police Forces Examination, 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print document"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 bg-slate-50/50 flex-1">
          
          {/* Email dispatch notice alert */}
          {emailSentNotice && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{emailSentNotice}</span>
              </div>
              <button onClick={() => setEmailSentNotice(null)} className="text-blue-500 hover:text-blue-700">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* STATUS NOTIFICATION CALLOUT BANNER */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isReleased 
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}>
            <div className="flex items-start gap-3">
              {isReleased ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <Clock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-sm sm:text-base">
                  {isReleased ? "Your admit card is downloaded! Please check it below." : "Still Admit Card is not released."}
                </h4>
                <p className="text-xs mt-0.5 opacity-90 leading-relaxed">
                  {isReleased 
                    ? "Your official Hall Ticket for SSC SI/CPO Exam 2026 is downloaded. Review your examination date, shift time, and exam centre venue below."
                    : "For SI/CPO Exam 2026 (Registration No: 10011969007), your application form was confirmed on 27/09/2026. SSC officially releases Paper-1 CBT Admit Cards 3 to 7 days before the examination date."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
              {onRefreshStatus && (
                <button
                  onClick={onRefreshStatus}
                  disabled={isRefreshing}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
                  {isRefreshing ? "Checking SSC..." : "Sync Live SSC"}
                </button>
              )}
              <button
                onClick={handleSendEmail}
                disabled={emailSending}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <Mail className="w-3.5 h-3.5" />
                {emailSending ? "Sending..." : "Email Notification"}
              </button>
            </div>
          </div>

          {/* OFFICIAL ADMIT CARD / INTIMATION SLIP DOCUMENT CONTAINER */}
          <div className="bg-white border-2 border-slate-300 rounded-xl p-5 sm:p-7 shadow-md relative overflow-hidden print:border-none print:shadow-none print:p-0">
            
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <GovEmblem className="w-96 h-96 text-slate-900" />
            </div>

            {/* Official Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b-2 border-slate-800 gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <GovEmblem className="w-12 h-14 text-slate-800 flex-shrink-0" />
                <div>
                  <h2 className="text-sm font-black text-slate-900 tracking-wide uppercase">
                    STAFF SELECTION COMMISSION
                  </h2>
                  <p className="text-[11px] text-slate-600 font-semibold">
                    (Government of India) &bull; Karnataka Kerala Region (KKR) / Central
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Block No. 12, CGO Complex, Lodhi Road, New Delhi - 110003 &bull; ssc.gov.in
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded">
                  {isReleased ? "E-ADMIT CARD" : "PROVISIONAL INTIMATION SLIP"}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-mono">
                  REF: SSC/2026/CAPF/10011969007
                </p>
              </div>
            </div>

            {/* Exam Title Banner */}
            <div className="my-4 py-2 bg-slate-100 border-y border-slate-300 text-center">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">
                Sub-Inspector in Delhi Police and Central Armed Police Forces Examination, 2026
              </h3>
              <p className="text-[11px] font-bold text-blue-800">
                PAPER-I (COMPUTER BASED EXAMINATION)
              </p>
            </div>

            {/* Candidate Info Grid with Authentic Cropped Photo & Signature */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-5 border-b border-slate-200">
              
              {/* Left Details (3 cols) */}
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Registration Number</span>
                  <span className="font-mono font-black text-sm text-slate-900">
                    {candidate?.registrationNo || "10011969007"}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Roll Number (Paper-1)</span>
                  <span className="font-mono font-bold text-sm text-slate-900">
                    {isReleased ? "9001048291" : "To be generated upon Admit Card Release"}
                  </span>
                </div>

                <div className="sm:col-span-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Candidate's Name</span>
                  <span className="font-black text-sm text-slate-900 uppercase">
                    {candidate?.name || "KARAKA SAI CHANDRA SEKHAR"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Father's Name</span>
                  <span className="font-semibold text-slate-800 uppercase">
                    {candidate?.fathersName || "KARAKA SATYANARAYANA"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Mother's Name</span>
                  <span className="font-semibold text-slate-800 uppercase">
                    {candidate?.mothersName || "KARAKA ADI LAKSHMI"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Date of Birth / Gender</span>
                  <span className="font-semibold text-slate-800">
                    {candidate?.dob || "20/09/2003"} &bull; {candidate?.gender || "Male"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Category</span>
                  <span className="font-semibold text-slate-800">
                    {candidate?.category || "OBC"} &bull; NCC 'B' Certificate: Yes
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Candidate Address</span>
                  <span className="font-medium text-slate-700 text-[11px]">
                    {candidate?.address || "44-37-7/3 SRINIVASA NAGAR AKKAYYAPALEM VISAKHAPATNAM 530016"}
                  </span>
                </div>

              </div>

              {/* Right Details: Authentic Candidate Photo & Signature */}
              <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 gap-2">
                <div className="w-24 h-32 bg-white rounded border border-slate-300 shadow-inner overflow-hidden flex items-center justify-center">
                  <img 
                    src="/candidate-photo.png" 
                    alt="Candidate Photograph" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase">Photograph</span>

                <div className="w-28 h-10 bg-white rounded border border-slate-300 flex items-center justify-center overflow-hidden px-1">
                  <img 
                    src="/candidate-signature.png" 
                    alt="Candidate Signature" 
                    className="max-h-8 max-w-full object-contain"
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase">Signature</span>
              </div>
            </div>

            {/* Examination Centre & Preferences */}
            <div className="py-4 border-b border-slate-200 space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Examination Venue & Chosen Regional Preferences
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-700 block">First Preference (Preferred)</span>
                  <span className="font-bold text-slate-900">KKR-Bengaluru (9001)</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Karnataka Kerala Region</p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-600 block">Second Preference</span>
                  <span className="font-semibold text-slate-800">KKR-Mysuru (9009)</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Karnataka Kerala Region</p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-600 block">Third Preference</span>
                  <span className="font-semibold text-slate-800">KKR-Mangaluru (9008)</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Karnataka Kerala Region</p>
                </div>
              </div>

              {/* Exact venue status notice */}
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Exact Centre Venue & Exam Shift Timing:</span>{" "}
                  {isReleased 
                    ? "Assigned at iON Digital Zone, Bengaluru. Reporting Time: 07:30 AM | Exam Shift: 09:00 AM - 11:00 AM"
                    : "Exact venue address and shift time will be imprinted upon final Admit Card release (3 to 7 days before examination). City intimation is issued 10 days prior."}
                </div>
              </div>
            </div>

            {/* Examination Scheme (Paper 1) */}
            <div className="py-4 border-b border-slate-200">
              <h4 className="text-xs font-black uppercase text-slate-900 mb-2">
                Paper-I Scheme of Examination (200 Marks &bull; 2 Hours)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Part A</span>
                  <span className="font-bold text-slate-800">General Intelligence & Reasoning</span>
                  <span className="text-[10px] text-blue-600 block mt-0.5">50 Qs / 50 Marks</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Part B</span>
                  <span className="font-bold text-slate-800">General Knowledge & Awareness</span>
                  <span className="text-[10px] text-blue-600 block mt-0.5">50 Qs / 50 Marks</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Part C</span>
                  <span className="font-bold text-slate-800">Quantitative Aptitude</span>
                  <span className="text-[10px] text-blue-600 block mt-0.5">50 Qs / 50 Marks</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Part D</span>
                  <span className="font-bold text-slate-800">English Comprehension</span>
                  <span className="text-[10px] text-blue-600 block mt-0.5">50 Qs / 50 Marks</span>
                </div>
              </div>
            </div>

            {/* Essential Candidate Guidelines */}
            <div className="pt-3 text-[11px] text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 uppercase text-[10px]">Essential Candidate Guidelines:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Candidates must bring a printed copy of the Admit Card to the exam centre.</li>
                <li>Original Government Photo ID Proof (Aadhaar Card, Voter ID, Driving Licence, or Passport) with matching Date of Birth is mandatory.</li>
                <li>Two recent passport size color photographs are required at the examination hall.</li>
                <li>Electronic gadgets, mobile phones, smartwatches, and calculators are strictly prohibited.</li>
              </ul>
            </div>

            {/* Barcode & Security Stamp */}
            <div className="mt-5 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2">
              <span className="font-mono">
                SECURE DIGITALLY VERIFIED &bull; CANDIDATE ID: 10011969007 &bull; SSC GOV IN
              </span>
              <span className="font-bold text-slate-600">
                Staff Selection Commission (GoI)
              </span>
            </div>
          </div>

          {/* APPLICATION FORM & ADMIT CARD ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <a
                href="/api/ssc/application-pdf"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-300 shadow-sm flex items-center gap-1.5 transition"
              >
                <FileText className="w-4 h-4 text-slate-600" />
                View Full Application Form (PDF)
              </a>

              <a
                href="/api/ssc/application-pdf?download=true"
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-300 shadow-sm flex items-center gap-1.5 transition"
                title="Download Application Form"
              >
                <Download className="w-4 h-4 text-slate-600" />
                Download App
              </a>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://ssc.gov.in"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Official SSC Portal
              </a>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
              >
                Done
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
