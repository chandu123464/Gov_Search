import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy | GovSearch" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 space-y-4 text-sm text-slate-700">
      <h1 className="text-2xl font-black text-slate-900">Privacy Policy</h1>
      <p>
        We store the profile details you provide (name, email, qualification, date of birth, category, state) to match jobs
        and send reminders you opt into.
      </p>
      <p>
        Passwords are stored as salted hashes. Session cookies are httpOnly. Saved jobs, applications, and notifications are
        visible only to the signed-in account.
      </p>
      <p>
        SSC live sync runs only when an administrator links a specific account through server environment variables. Admit
        card and application PDFs are never served to unauthenticated visitors.
      </p>
      <p>You can request account deletion by emailing the site operator.</p>
    </div>
  );
}
