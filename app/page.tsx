import React from "react";
import { 
  getJobs, 
  getClosingSoonJobs, 
  getUpcomingJobs, 
  getQualificationCounts, 
  getJobByIdOrSlug 
} from "@/lib/jobs-service";
import JobsByEducationSection from "@/components/JobsByEducationSection";
import MultiStepDiscovery from "@/components/MultiStepDiscovery";
import ClosingSoonWidget from "@/components/ClosingSoonWidget";
import JobCard from "@/components/JobCard";
import RecruitmentPosterCard from "@/components/RecruitmentPosterCard";
import { 
  Bell, 
  Sparkles, 
  Calendar, 
  Clock, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Award 
} from "lucide-react";
import { formatDateIndian } from "@/lib/date-utils";

export const revalidate = 60; // ISR cache revalidation every 60 seconds

export default async function HomePage() {
  const [
    latestJobsResult,
    closingSoonJobs,
    upcomingJobs,
    qualificationCounts,
    featuredGdsJob,
  ] = await Promise.all([
    getJobs({ limit: 6, sort: "latest" }),
    getClosingSoonJobs(6),
    getUpcomingJobs(4),
    getQualificationCounts(),
    getJobByIdOrSlug("indian-postal-gds-recruitment-2026"),
  ]);

  return (
    <div className="space-y-8">
      {/* 1. TOP NOTICE & CLOSING SOON ALERTS */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-amber-500 text-slate-950 rounded-lg">
            <Bell className="w-5 h-5 fill-slate-950 animate-bounce" />
          </span>
          <div>
            <span className="text-xs font-black uppercase text-amber-900 tracking-wide block">
              LIVE SARKARI NAUKRI ALERTS 2026
            </span>
            <p className="text-xs text-amber-950 font-medium">
              Over <strong>1,25,000+</strong> active vacancies available across Indian Railways, Postal, SSC, Banking, and Police departments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/last-date-reminder"
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-3.5 py-2 rounded-lg transition shadow flex items-center gap-1.5 animate-pulse"
          >
            <Clock className="w-4 h-4" />
            <span>Last Date Reminders ({closingSoonJobs.length})</span>
          </a>
          <a
            href="/upcoming-jobs"
            className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-black px-3.5 py-2 rounded-lg transition shadow flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Upcoming Jobs ({upcomingJobs.length})</span>
          </a>
        </div>
      </div>

      {/* 2. CLOSING SOON WIDGET (FREEJOBALERT STYLE) */}
      <ClosingSoonWidget jobs={closingSoonJobs} />

      {/* 3. HERO SECTION: SMART DISCOVERY + SPOTLIGHT POSTER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Multi-Step Discovery Flow (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <MultiStepDiscovery />

          {/* Quick Category Link Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <a
              href="/government-jobs/railway"
              className="p-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl transition shadow-sm group"
            >
              <span className="text-xl block mb-1">🚆</span>
              <span className="text-xs font-black text-slate-800 group-hover:text-blue-700 block">
                Railway Jobs
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">53,000+ Posts</span>
            </a>

            <a
              href="/government-jobs/ssc"
              className="p-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl transition shadow-sm group"
            >
              <span className="text-xl block mb-1">🏛️</span>
              <span className="text-xs font-black text-slate-800 group-hover:text-blue-700 block">
                SSC Recruitment
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">7,900+ Posts</span>
            </a>

            <a
              href="/government-jobs/banking"
              className="p-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl transition shadow-sm group"
            >
              <span className="text-xl block mb-1">🏦</span>
              <span className="text-xs font-black text-slate-800 group-hover:text-blue-700 block">
                Banking Jobs
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">15,700+ Posts</span>
            </a>

            <a
              href="/government-jobs/police"
              className="p-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl transition shadow-sm group"
            >
              <span className="text-xl block mb-1">👮</span>
              <span className="text-xs font-black text-slate-800 group-hover:text-blue-700 block">
                Police &amp; Defence
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">8,000+ Posts</span>
            </a>
          </div>
        </div>

        {/* Right Side: Featured Infographic Recruitment Poster Card (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-slate-900 font-black text-sm uppercase tracking-wide">
              <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
              <span>Mega Recruitment Spotlight</span>
            </div>
            <span className="text-[11px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Closing Soon
            </span>
          </div>

          {featuredGdsJob && (
            <RecruitmentPosterCard job={featuredGdsJob as any} />
          )}
        </div>
      </div>

      {/* 4. JOBS BY EDUCATION SECTION (PROMPT CORE REQUIREMENT) */}
      <JobsByEducationSection counts={qualificationCounts} />

      {/* 5. TODAY LIVE UPDATES & NOTIFICATIONS FEED (FREEJOBALERT 3-COLUMN LAYOUT) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black uppercase text-slate-900 tracking-wide">
                New Recruitment Updates
              </h3>
              <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Daily verified official notifications released across Central &amp; State governments
            </p>
          </div>
          <a
            href="/government-jobs"
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Col 1: SSC & Railway */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2.5">
            <div className="font-extrabold text-blue-900 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>SSC &amp; Railway</span>
              <span className="text-[10px] text-slate-400">2026 Batch</span>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li>
                <a href="/job/ssc-chsl-recruitment-2026" className="hover:text-blue-700 font-semibold block">
                  • SSC 3,712 CHSL (10+2) Online Form 2026
                </a>
              </li>
              <li>
                <a href="/job/rrb-ntpc-graduate-recruitment-2026" className="hover:text-blue-700 font-semibold block">
                  • RRB 8,113 NTPC Graduate Level Online Form
                </a>
              </li>
              <li>
                <a href="/job/ssc-junior-engineer-je-2026" className="hover:text-blue-700 font-semibold block">
                  • SSC 1,748 Junior Engineer (JE) Notification
                </a>
              </li>
              <li>
                <a href="/job/rrb-group-d-recruitment-2026" className="hover:text-blue-700 font-semibold block text-emerald-700">
                  • RRB 45,000 Group D (Level-1) Advance Notice
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Banking & Central Posts */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2.5">
            <div className="font-extrabold text-blue-900 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>Banking &amp; Postal</span>
              <span className="text-[10px] text-slate-400">All India</span>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li>
                <a href="/job/indian-postal-gds-recruitment-2026" className="hover:text-blue-700 font-semibold block text-red-600">
                  • India Post 23,757 GDS Recruitment 2026
                </a>
              </li>
              <li>
                <a href="/job/ibps-rrb-crp-xv-recruitment-2026" className="hover:text-blue-700 font-semibold block">
                  • IBPS 13,706 RRB CRP-XV Officer &amp; Assistant
                </a>
              </li>
              <li>
                <a href="/job/sbi-po-recruitment-2026" className="hover:text-blue-700 font-semibold block text-sky-700">
                  • SBI 2,000 Probationary Officer (PO) Form
                </a>
              </li>
              <li>
                <a href="/job/delhi-police-constable-recruitment-2026" className="hover:text-blue-700 font-semibold block">
                  • Delhi Police 7,547 Constable (Executive)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Defence, Medical & Teaching */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2.5">
            <div className="font-extrabold text-blue-900 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>Teaching, Defence &amp; Medical</span>
              <span className="text-[10px] text-slate-400">State / Central</span>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li>
                <a href="/job/karnataka-teacher-recruitment-2026" className="hover:text-blue-700 font-semibold block">
                  • Karnataka 15,000 Primary Teacher Online Form
                </a>
              </li>
              <li>
                <a href="/job/upsc-combined-defence-services-cds-2026" className="hover:text-blue-700 font-semibold block">
                  • UPSC 459 CDS-II Defence Officer Form
                </a>
              </li>
              <li>
                <a href="/job/pgimer-nursing-officer-recruitment-2026" className="hover:text-blue-700 font-semibold block">
                  • PGIMER 243 Nursing Officer Gr-II Online Form
                </a>
              </li>
              <li>
                <a href="/job/rajasthan-safai-karmachari-recruitment-2026" className="hover:text-blue-700 font-semibold block">
                  • Rajasthan 24,752 Safai Karmachari Form
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6. UPCOMING JOBS SHOWCASE (USER REQUESTED FEATURE) */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-blue-950 rounded-2xl p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-500/20 rounded-xl">
              <Calendar className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black uppercase tracking-wide">
                  Upcoming Government Jobs
                </h3>
                <span className="bg-sky-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Advance Alert
                </span>
              </div>
              <p className="text-xs text-sky-200">
                Official notifications announced with application start date approaching soon
              </p>
            </div>
          </div>

          <a
            href="/upcoming-jobs"
            className="text-xs font-bold bg-white text-slate-900 hover:bg-sky-50 px-4 py-2 rounded-xl transition shadow flex items-center gap-1"
          >
            <span>View All Upcoming</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {upcomingJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition"
            >
              <div>
                <span className="text-[11px] font-bold text-sky-300 block uppercase">
                  {job.organization_name}
                </span>
                <a
                  href={`/job/${job.slug}`}
                  className="font-black text-sm text-white hover:text-amber-300 transition line-clamp-2 mt-0.5"
                >
                  {job.post_name}
                </a>
                <div className="text-xs text-slate-300 mt-2 space-y-0.5">
                  <div>Posts: <strong className="text-white">{job.number_of_posts.toLocaleString("en-IN")}</strong></div>
                  <div>Qualification: <span className="text-sky-200">{job.qualification}</span></div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold">
                  Starts: {formatDateIndian(job.start_date)}
                </span>
                <a
                  href={`/job/${job.slug}`}
                  className="text-white font-bold hover:underline"
                >
                  Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. LATEST GOVERNMENT JOBS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-wide">
              Latest Government Jobs 2026
            </h2>
            <p className="text-xs text-slate-500">
              Browse newly published central, state, and public sector vacancies
            </p>
          </div>
          <a
            href="/government-jobs"
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>Explore All {latestJobsResult.pagination.total} Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestJobsResult.jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
