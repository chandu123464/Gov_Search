"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ShieldCheck } from "lucide-react";

export default function EligibilityPanel({ slug }: { slug: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/eligibility?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [slug]);

  if (!data) return null;

  if (!data.authenticated) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-2">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          Can I apply?
        </h3>
        <p className="text-xs text-slate-600">
          Log in with your qualification, date of birth, category, and state to see a personal eligibility check.
        </p>
        <Link href={`/login?next=/job/${slug}`} className="inline-block text-xs font-bold text-blue-700 hover:underline">
          Log in to check eligibility →
        </Link>
      </div>
    );
  }

  const result = data.result;
  if (!result) return null;

  return (
    <div
      className={`rounded-2xl p-5 border space-y-3 ${
        result.eligible ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
      }`}
    >
      <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
        {result.eligible ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        ) : (
          <XCircle className="w-4 h-4 text-amber-600" />
        )}
        {result.eligible ? "You appear eligible to apply" : "Some criteria may not match"}
      </h3>
      <div className="space-y-2 text-xs">
        {Object.entries(result.checks).map(([key, check]: any) => (
          <div key={key} className="flex items-start gap-2">
            {check.pass ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5" />
            )}
            <span className="text-slate-700">
              <strong className="capitalize">{key}:</strong> {check.detail}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500">
        Always confirm age, category, and documents on the official notification before paying fees.
      </p>
    </div>
  );
}
