"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  QUALIFICATIONS_LIST, 
  STATES_AND_CITIES, 
  PREFERRED_JOB_CATEGORIES 
} from "@/lib/registration-data";
import { 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap 
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  // Form State
  const [userType, setUserType] = useState<"Job seeker" | "Student">("Job seeker");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cfVerified, setCfVerified] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const availableCities = state ? STATES_AND_CITIES[state] || ["Other"] : [];

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!agreeTerms) {
      setErrorMessage("Please agree to the Terms and Privacy Policy to proceed.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify both passwords.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters with letters and numbers.");
      return;
    }

    if (!qualification) {
      setErrorMessage("Please select your highest qualification.");
      return;
    }

    if (!state) {
      setErrorMessage("Please select your state.");
      return;
    }

    if (!city) {
      setErrorMessage("Please select your city.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_type: userType,
          full_name: fullName,
          email,
          password,
          mobile,
          dob,
          gender,
          qualification,
          state,
          city,
          preferred_categories: selectedCategories,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccessMessage("Account created successfully! Redirecting to your dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (err: any) {
      setErrorMessage("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 py-10 px-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-xl bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/20 space-y-6">
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>FreeJobAlert Portal Registration</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Never miss an update!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Get job alerts and college guidance in one place. Join Now!
          </p>
        </div>

        {/* Error / Success Alerts */}
        {errorMessage && (
          <div className="bg-red-950/70 border border-red-800 text-red-300 text-xs p-3.5 rounded-xl flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs p-3.5 rounded-xl flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-xs sm:text-sm">
          {/* "I am a" Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType("Job seeker")}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold border transition ${
                  userType === "Job seeker"
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30"
                    : "bg-[#161f36] text-slate-300 border-slate-700/60 hover:bg-[#1c2744]"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Job seeker</span>
              </button>

              <button
                type="button"
                onClick={() => setUserType("Student")}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold border transition ${
                  userType === "Student"
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30"
                    : "bg-[#161f36] text-slate-300 border-slate-700/60 hover:bg-[#1c2744]"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="8+ characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#131b2e] border border-slate-700 rounded-xl pl-3.5 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Use 8+ characters with letters and numbers.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Confirm password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#131b2e] border border-slate-700 rounded-xl pl-3.5 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile & Date of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Mobile number <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <div className="flex">
                <span className="bg-[#1b253d] border border-r-0 border-slate-700 rounded-l-xl px-3 py-2.5 text-slate-400 font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-[#131b2e] border border-slate-700 rounded-r-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Date of birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Highest Qualification */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Highest qualification <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            >
              <option value="">Select qualification</option>
              {QUALIFICATIONS_LIST.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* State & City (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                State <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity("");
                }}
                className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              >
                <option value="">Select state</option>
                {Object.keys(STATES_AND_CITIES).sort().map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                City <span className="text-red-500">*</span>
              </label>
              <select
                required
                disabled={!state}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50"
              >
                <option value="">
                  {state ? "Select city" : "Select state first"}
                </option>
                {availableCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferred Job Categories (Exact Dark Pill Buttons from Screenshot) */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Preferred job categories <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {PREFERRED_JOB_CATEGORIES.map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30"
                        : "bg-[#182032] border-slate-700/80 text-slate-300 hover:bg-[#202b44] hover:border-slate-600"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="pt-2 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded bg-[#131b2e] border-slate-600 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="terms" className="text-xs text-slate-400 leading-tight select-none">
              I agree to the{" "}
              <a href="#" className="text-indigo-400 hover:underline">
                Terms and Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* Cloudflare Turnstile Simulated Verification Card (Matching Screenshot) */}
          <div className="bg-[#111827] border border-slate-700 rounded-xl p-3 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">
                Success!
              </span>
            </div>

            <div className="flex flex-col items-end text-right">
              <div className="flex items-center gap-1">
                {/* Cloudflare Cloud Logo Icon */}
                <svg className="w-5 h-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
                </svg>
                <span className="text-[10px] font-black text-slate-300 tracking-wider">
                  CLOUDFLARE
                </span>
              </div>
              <span className="text-[9px] text-slate-500">
                Privacy • Help
              </span>
            </div>
          </div>

          {/* Create Account Submit Button (Pill Button Matching Screenshot) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#818cf8] hover:bg-[#6366f1] active:bg-[#4f46e5] text-slate-950 hover:text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base tracking-wide uppercase disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="text-center pt-2 border-t border-slate-800 text-xs sm:text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 font-bold hover:underline ml-1">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

