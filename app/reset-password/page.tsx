"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function ResetForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password updated. Redirecting to login...");
        setTimeout(() => router.push("/login"), 1200);
      } else {
        setMessage(data.error || "Reset failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-md bg-white rounded-3xl p-8 space-y-4 shadow-xl">
      <h1 className="text-2xl font-black">Choose a new password</h1>
      <input
        type="password"
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Minimum 8 characters"
        className="w-full border rounded-xl px-3 py-2 text-sm"
      />
      <button disabled={loading || !token} className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl">
        {loading ? "Saving..." : "Update password"}
      </button>
      {message && <p className="text-xs text-slate-600">{message}</p>}
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Suspense>
        <ResetForm />
      </Suspense>
    </div>
  );
}
