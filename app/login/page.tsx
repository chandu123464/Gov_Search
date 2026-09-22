"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck 
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setErrorMessage("Network error. Please try again later.");
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("aspirant.demo@freejobalert.com");
    setPassword("Pass@2026");
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 py-12 px-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/20 space-y-6">
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Govt Job Alerts Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Log in to your job and college alerts.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-red-950/70 border border-red-800 text-red-300 text-xs p-3.5 rounded-xl flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Email address
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

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300">
                Password
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset instructions will be sent to your registered email address.");
                }}
                className="text-xs text-indigo-400 hover:underline font-semibold"
              >
                Forgot password?
              </a>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
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
          </div>

          {/* Cloudflare Verification Badge */}
          <div className="bg-[#111827] border border-slate-700/80 rounded-xl p-2.5 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold text-white">
                Connection Secured
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>CLOUDFLARE</span>
            </div>
          </div>

          {/* Log in Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#818cf8] hover:bg-[#6366f1] active:bg-[#4f46e5] text-slate-950 hover:text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base tracking-wide uppercase disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Log in</span>
            )}
          </button>
        </form>

        {/* Footer Link to Register */}
        <div className="text-center pt-2 border-t border-slate-800 text-xs sm:text-sm text-slate-400">
          New to FreeJobAlert?{" "}
          <Link href="/register" className="text-indigo-400 font-bold hover:underline ml-1">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

