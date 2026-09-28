import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service | GovSearch" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 space-y-4 text-sm text-slate-700">
      <h1 className="text-2xl font-black text-slate-900">Terms of Service</h1>
      <p>
        GovSearch is a discovery portal for publicly announced government recruitments. Listings are informational. Always
        verify dates, fees, and eligibility on the recruiting agency&apos;s official website before applying.
      </p>
      <p>GovSearch does not charge candidates for browsing jobs, saving vacancies, or receiving last-date reminders.</p>
      <p>You are responsible for keeping your password private and for the accuracy of the profile you submit.</p>
      <p>Admin tools are restricted to authorised operators. Unauthorised use of write APIs is prohibited.</p>
    </div>
  );
}
