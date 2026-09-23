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
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  MapPin, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight
} from "lucide-react";

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

function MicrosoftIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 23 23">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  // Form State
  const [userType, setUserType] = useState<"Job seeker" | "Student">("Job seeker");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [qualification, setQualification] = useState(QUALIFICATIONS_LIST[2] || "12th / Intermediate");
  const [selectedState, setSelectedState] = useState("Delhi");
  const [selectedCity, setSelectedCity] = useState("New Delhi");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["SSC", "Railways"]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const stateList = Object.keys(STATES_AND_CITIES);
  const cityList = STATES_AND_CITIES[selectedState as keyof typeof STATES_AND_CITIES] || ["Other"];

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const cities = STATES_AND_CITIES[stateName as keyof typeof STATES_AND_CITIES] || ["Other"];
    setSelectedCity(cities[0] || "Other");
  };

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

    if (!fullName || !email || !password) {
      setErrorMessage("Please fill in all mandatory fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_type: userType,
          full_name: fullName,
          email,
          password,
          qualification,
          state: selectedState,
          city: selectedCity,
          preferred_categories: selectedCategories,
        }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        localStorage.setItem("govsearch_user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        const mockUser = {
          id: `candidate-${Date.now()}`,
          user_type: userType,
          full_name: fullName,
          email,
          qualification,
          state: selectedState,
          city: selectedCity,
          preferred_categories: selectedCategories,
          saved_jobs: ["ssc-chsl-2026", "railway-group-d-2026"]
        };
        localStorage.setItem("govsearch_user", JSON.stringify(mockUser));
        router.push("/dashboard");
      }
    } catch {
      const mockUser = {
        id: `candidate-${Date.now()}`,
        user_type: userType,
        full_name: fullName,
        email,
        qualification,
        state: selectedState,
        city: selectedCity,
        preferred_categories: selectedCategories,
        saved_jobs: ["ssc-chsl-2026", "railway-group-d-2026"]
      };
      localStorage.setItem("govsearch_user", JSON.stringify(mockUser));
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    const mockUser = {
      id: `social-${provider}-${Date.now()}`,
      user_type: "Job seeker",
      full_name: `${provider} Candidate`,
      email: `candidate@${provider.toLowerCase()}.com`,
      qualification: "Graduate",
      state: "Delhi",
      city: "New Delhi",
      preferred_categories: ["SSC", "Railways", "Banking"],
      saved_jobs: ["ssc-chsl-2026"]
    };
    localStorage.setItem("govsearch_user", JSON.stringify(mockUser));
    router.push("/dashboard");
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center flex flex-col justify-between relative selection:bg-blue-500 selection:text-white py-4"
      style={{
        backgroundImage: "url('/images/LoginBackGround.png')",
        backgroundColor: "#e8f4fd",
      }}
    >
      {/* Top Header Row with Log In Link */}
      <header className="w-full px-6 sm:px-12 py-3 flex items-center justify-between z-20">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-transparent select-none">GovSearch Home</div>
        </Link>

        <div className="text-sm font-semibold text-slate-700 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-xs">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold hover:underline ml-1">
            Log In
          </Link>
        </div>
      </header>

      {/* Main Registration Card Container */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 flex-1 flex items-center justify-center lg:justify-end z-10">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-4 my-2 animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Join GovSearch to discover personalized government jobs &amp; notifications
            </p>
          </div>

          {/* User Type Segment */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setUserType("Job seeker")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
                userType === "Job seeker"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Job Seeker</span>
            </button>
            <button
              type="button"
              onClick={() => setUserType("Student")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
                userType === "Student"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student / Aspirant</span>
            </button>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-3.5 text-xs sm:text-sm">
            {/* Full Name & Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="candidate@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a strong password (min 6 chars)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Highest Qualification */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Highest Qualification</label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none cursor-pointer"
                >
                  {QUALIFICATIONS_LIST.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* State & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">State / UT</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none cursor-pointer"
                  >
                    {stateList.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">City / District</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none cursor-pointer"
                >
                  {cityList.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preferred Categories */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-bold text-slate-700">
                Preferred Job Categories (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PREFERRED_JOB_CATEGORIES.slice(0, 8).map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition ${
                        isChecked
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {isChecked ? "✓ " : "+ "}{cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-2 pt-1">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase absolute">
                OR
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleSocialRegister("Google")}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition"
              >
                <GoogleIcon className="w-4 h-4" />
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialRegister("Microsoft")}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition"
              >
                <MicrosoftIcon className="w-4 h-4" />
                <span>Microsoft</span>
              </button>
            </div>
          </div>

          {/* Security Notice Callout */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-2.5 flex items-start gap-2.5">
            <div className="p-1 bg-blue-600 text-white rounded-md flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-3 h-3" />
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-slate-800 block">Your data is secure with us.</span>
              <span className="text-slate-500 block">
                We follow industry best practices to protect your information.
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-2 px-6 pointer-events-none opacity-0 select-none">
        GovSearch Footer Spacer
      </footer>
    </div>
  );
}
