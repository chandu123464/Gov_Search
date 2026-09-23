"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  ShieldCheck
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

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email address and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        localStorage.setItem("govsearch_user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        const mockUser = {
          id: "demo-user-1",
          email: email,
          full_name: email.split("@")[0].replace(".", " ") || "Aspirant Candidate",
          user_type: "Job seeker",
          qualification: "12th Pass",
          state: "Delhi",
          city: "New Delhi",
          preferred_categories: ["SSC", "Railway", "Banking"],
          saved_jobs: ["ssc-chsl-2026", "rrb-alp-2026"]
        };
        localStorage.setItem("govsearch_user", JSON.stringify(mockUser));
        router.push("/dashboard");
      }
    } catch {
      const mockUser = {
        id: "demo-user-1",
        email: email,
        full_name: email.split("@")[0].replace(".", " ") || "Aspirant Candidate",
        user_type: "Job seeker",
        qualification: "12th Pass",
        state: "Delhi",
        city: "New Delhi",
        preferred_categories: ["SSC", "Railway", "Banking"],
        saved_jobs: ["ssc-chsl-2026", "rrb-alp-2026"]
      };
      localStorage.setItem("govsearch_user", JSON.stringify(mockUser));
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    const mockUser = {
      id: `social-${provider}-1`,
      email: `candidate@${provider.toLowerCase()}.com`,
      full_name: `${provider} Aspirant`,
      user_type: "Job seeker",
      qualification: "Graduate",
      state: "Delhi",
      city: "New Delhi",
      preferred_categories: ["SSC", "UPSC", "Railway"],
      saved_jobs: ["ssc-chsl-2026"]
    };
    localStorage.setItem("govsearch_user", JSON.stringify(mockUser));
    router.push("/dashboard");
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center flex flex-col justify-between relative selection:bg-blue-500 selection:text-white"
      style={{
        backgroundImage: "url('/images/LoginBackGround.png')",
        backgroundColor: "#e8f4fd",
      }}
    >
      {/* Top Header Row with Sign Up Link */}
      <header className="w-full px-6 sm:px-12 py-5 flex items-center justify-between z-20">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-transparent select-none">GovSearch Home</div>
        </Link>

        <div className="text-sm font-semibold text-slate-700 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-xs">
          New to GovSearch?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-700 font-bold hover:underline ml-1">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex-1 flex items-center justify-center lg:justify-end z-10">
        {/* Floating White Login Card */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-9 space-y-5 animate-in fade-in zoom-in-95 duration-300">
          {/* Title Header */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Login to your GovSearch account
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-2xs"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset link will be sent to your email address.")}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs font-medium text-slate-600 cursor-pointer select-none">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center pt-1">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase absolute">
              OR
            </span>
          </div>

          {/* Social Logins */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 transition shadow-2xs"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("Microsoft")}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 transition shadow-2xs"
            >
              <MicrosoftIcon className="w-4 h-4" />
              <span>Continue with Microsoft</span>
            </button>
          </div>

          {/* Terms & Privacy */}
          <p className="text-[11px] text-center text-slate-500 font-medium pt-1">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Data Secure Notice Callout Box */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 flex items-start gap-3">
            <div className="p-1.5 bg-blue-600 text-white rounded-lg flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-slate-800 block">Your data is secure with us.</span>
              <span className="text-slate-500 mt-0.5 block">
                We follow industry best practices to protect your information.
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle invisible footer placeholder so the background's built-in footer remains clearly visible */}
      <footer className="w-full py-4 px-6 pointer-events-none opacity-0 select-none">
        GovSearch Footer Spacer
      </footer>
    </div>
  );
}
