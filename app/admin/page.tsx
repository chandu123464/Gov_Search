"use client";

import React, { useState, useEffect } from "react";
import { 
  QUALIFICATION_LIST, 
  GOVERNMENT_FIELDS, 
  GOVERNMENT_LEVELS, 
  INDIAN_STATES 
} from "@/lib/types";
import { formatDateIndian } from "@/lib/date-utils";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  ShieldCheck, 
  Search, 
  RotateCcw,
  Clock,
  Sparkles,
  Layers,
  X
} from "lucide-react";

interface JobRecord {
  id: string;
  slug: string;
  post_name: string;
  organization_name: string;
  department: string;
  government_field: string;
  government_level: string;
  state: string;
  qualification: string;
  qualification_level: string;
  specific_discipline?: string | null;
  exact_qual_required: boolean;
  number_of_posts: number;
  salary_text: string;
  salary_min?: number | null;
  salary_max?: number | null;
  age_min?: number | null;
  age_max?: number | null;
  age_relaxation?: string | null;
  selection_process: string;
  application_fee_sc_st: string;
  application_fee_obc: string;
  application_fee_general: string;
  application_fee_other?: string | null;
  start_date: string;
  last_date: string;
  official_website: string;
  official_notification_url?: string;
  application_url?: string;
  job_description: string;
  eligibility: string;
  required_documents: string;
  how_to_apply?: string | null;
  status: string;
}

const emptyJobForm = {
  post_name: "",
  organization_name: "",
  department: "General Administration",
  government_field: "SSC",
  government_level: "Central Government",
  state: "All India",
  qualification: "",
  qualification_level: "10TH",
  specific_discipline: "",
  exact_qual_required: false,
  number_of_posts: 100,
  salary_text: "₹21,700 – ₹69,100 (Level-3)",
  salary_min: 21700,
  salary_max: 69100,
  age_min: 18,
  age_max: 27,
  age_relaxation: "SC/ST: 5 Yrs, OBC: 3 Yrs",
  selection_process: "Written Examination & Document Verification",
  application_fee_sc_st: "₹0/-",
  application_fee_obc: "₹100/-",
  application_fee_general: "₹100/-",
  application_fee_other: "Women & PwD: ₹0/-",
  start_date: new Date().toISOString().split("T")[0],
  last_date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  official_website: "https://ssc.gov.in",
  official_notification_url: "",
  application_url: "",
  job_description: "Recruitment notice for eligible candidates.",
  eligibility: "Candidates must satisfy age and educational criteria.",
  required_documents: "Aadhaar Card, 10th/12th Certificate, Photograph, Signature.",
  how_to_apply: "Apply online at official portal.",
  status: "PUBLISHED",
};

export default function AdminPage() {
  const [jobs, setJobs] = useState<JobRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(emptyJobForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs?limit=100");
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenCreate = () => {
    setEditingJobId(null);
    setFormData(emptyJobForm);
    setFormError(null);
    setFormSuccess(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (job: JobRecord) => {
    setEditingJobId(job.id);
    setFormData({
      ...job,
      start_date: new Date(job.start_date).toISOString().split("T")[0],
      last_date: new Date(job.last_date).toISOString().split("T")[0],
    });
    setFormError(null);
    setFormSuccess(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job record?")) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs(jobs.filter((j) => j.id !== id));
      } else {
        alert("Failed to delete job");
      }
    } catch (e) {
      alert("Error deleting job");
    }
  };

  const handleToggleStatus = async (job: JobRecord) => {
    const newStatus = job.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setJobs(jobs.map((j) => (j.id === job.id ? { ...j, status: newStatus } : j)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // Validation
    if (!formData.post_name?.trim()) {
      setFormError("Post name is required");
      return;
    }
    if (!formData.organization_name?.trim()) {
      setFormError("Organization name is required");
      return;
    }
    if (!formData.qualification?.trim()) {
      setFormError("Qualification description is required");
      return;
    }
    if (new Date(formData.last_date) < new Date(formData.start_date)) {
      setFormError("Last date cannot be earlier than start date");
      return;
    }

    try {
      const url = editingJobId ? `/api/jobs/${editingJobId}` : "/api/jobs";
      const method = editingJobId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to save job");
        return;
      }

      setFormSuccess(editingJobId ? "Job updated successfully!" : "New Job published successfully!");
      setTimeout(() => {
        setModalOpen(false);
        fetchJobs();
      }, 1000);
    } catch (err: any) {
      setFormError(err.message || "Failed to save job");
    }
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.post_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.organization_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.government_field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs font-black px-2.5 py-1 rounded-lg uppercase">
              Admin Portal
            </span>
            <h1 className="text-xl md:text-2xl font-black text-slate-900">
              Government Job Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Create, edit, validate, and manage recruitment listings and key dates
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Government Job</span>
        </button>
      </div>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Recruitments</span>
          <span className="text-2xl font-black text-slate-900">{jobs.length}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Published &amp; Active</span>
          <span className="text-2xl font-black text-emerald-600">
            {jobs.filter((j) => j.status === "PUBLISHED").length}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Drafts / Unpublished</span>
          <span className="text-2xl font-black text-amber-600">
            {jobs.filter((j) => j.status === "DRAFT").length}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Vacancies</span>
          <span className="text-2xl font-black text-blue-600">
            {jobs.reduce((acc, j) => acc + (j.number_of_posts || 0), 0).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Search & Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by post, organization, field..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
        <button
          onClick={fetchJobs}
          className="p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Post &amp; Board</th>
                <th className="p-3.5">Field / Level</th>
                <th className="p-3.5">Qualification</th>
                <th className="p-3.5">Vacancies</th>
                <th className="p-3.5">Start / Last Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3.5">
                    <a
                      href={`/job/${job.slug}`}
                      className="font-bold text-slate-900 hover:text-blue-700 block text-sm"
                    >
                      {job.post_name}
                    </a>
                    <span className="text-slate-500 text-[11px]">
                      {job.organization_name}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-slate-800 block">{job.government_field}</span>
                    <span className="text-slate-400 text-[11px]">{job.government_level}</span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">
                    {job.qualification_level}
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">
                    {job.number_of_posts.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3.5">
                    <span className="text-slate-600 block">{formatDateIndian(job.start_date)}</span>
                    <span className="text-red-600 font-bold">{formatDateIndian(job.last_date)}</span>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => handleToggleStatus(job)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        job.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {job.status}
                    </button>
                  </td>
                  <td className="p-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(job)}
                      className="p-1.5 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded-lg transition"
                      title="Edit Job"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-1.5 bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-700 rounded-lg transition"
                      title="Delete Job"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT JOB MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wide">
                  {editingJobId ? "Edit Government Job" : "Create New Government Job"}
                </h3>
                <p className="text-xs text-slate-400">
                  Ensure all information matches the official recruitment notification
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="bg-red-50 border border-red-300 text-red-800 p-3 rounded-xl text-xs font-bold">
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl text-xs font-bold">
                  {formSuccess}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Post Name */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Post Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.post_name}
                    onChange={(e) => setFormData({ ...formData, post_name: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                    placeholder="e.g. Lower Division Clerk / JSA"
                  />
                </div>

                {/* Organization Name */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization_name}
                    onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                    placeholder="e.g. Staff Selection Commission"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                {/* Number of Posts */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Total Vacancies *</label>
                  <input
                    type="number"
                    required
                    value={formData.number_of_posts}
                    onChange={(e) => setFormData({ ...formData, number_of_posts: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                {/* Qualification Level Dropdown */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Qualification Level *</label>
                  <select
                    value={formData.qualification_level}
                    onChange={(e) => setFormData({ ...formData, qualification_level: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    {QUALIFICATION_LIST.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Qualification Display Text */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Qualification Description *</label>
                  <input
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                    placeholder="e.g. 12th Pass from recognized Board"
                  />
                </div>

                {/* Government Field Dropdown */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Government Field *</label>
                  <select
                    value={formData.government_field}
                    onChange={(e) => setFormData({ ...formData, government_field: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    {GOVERNMENT_FIELDS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Government Level Dropdown */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Government Level *</label>
                  <select
                    value={formData.government_level}
                    onChange={(e) => setFormData({ ...formData, government_level: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    {GOVERNMENT_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State Dropdown */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">State / Location</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary Text */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Salary / Pay Scale</label>
                  <input
                    type="text"
                    value={formData.salary_text}
                    onChange={(e) => setFormData({ ...formData, salary_text: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Application Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                {/* Last Date */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Application Last Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.last_date}
                    onChange={(e) => setFormData({ ...formData, last_date: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                {/* Official Website */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Website URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.official_website}
                    onChange={(e) => setFormData({ ...formData, official_website: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                {/* Application URL */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Apply Online Portal URL</label>
                  <input
                    type="url"
                    value={formData.application_url}
                    onChange={(e) => setFormData({ ...formData, application_url: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              {/* Exact Qualification Required Checkbox */}
              <div className="flex items-center gap-2 pt-1 text-xs">
                <input
                  type="checkbox"
                  id="exact_qual_required"
                  checked={formData.exact_qual_required}
                  onChange={(e) => setFormData({ ...formData, exact_qual_required: e.target.checked })}
                  className="rounded text-blue-600"
                />
                <label htmlFor="exact_qual_required" className="font-bold text-slate-700">
                  Strict Qualification Requirement (Higher education degrees cannot substitute)
                </label>
              </div>

              {/* Selection Process */}
              <div>
                <label className="font-bold text-slate-700 block mb-1 text-xs">Selection Process</label>
                <input
                  type="text"
                  value={formData.selection_process}
                  onChange={(e) => setFormData({ ...formData, selection_process: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="font-bold text-slate-700 block mb-1 text-xs">Job Description</label>
                <textarea
                  rows={2}
                  value={formData.job_description}
                  onChange={(e) => setFormData({ ...formData, job_description: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs"
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-xl text-xs font-black shadow transition"
                >
                  {editingJobId ? "Save Changes" : "Publish Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
