"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || data.error || "Request submitted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-3xl p-8 space-y-4 shadow-xl">
        <h1 className="text-2xl font-black">Reset password</h1>
        <p className="text-sm text-slate-500">Enter the email on your GovSearch account.</p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border rounded-xl px-3 py-2 text-sm"
        />
        <button disabled={loading} className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl">
          {loading ? "Sending..." : "Send reset link"}
        </button>
        {message && <p className="text-xs text-slate-600">{message}</p>}
        <Link href="/login" className="text-xs text-blue-600 font-bold">
          Back to login
        </Link>
      </form>
    </div>
  );
}
