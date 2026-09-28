"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, FilePlus2, Loader2 } from "lucide-react";

export default function JobActions({
  slug,
  jobId,
  postName,
  organization,
}: {
  slug: string;
  jobId: string;
  postName: string;
  organization: string;
}) {
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [tracked, setTracked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/saved-jobs")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.slugs?.includes(slug) || data?.ids?.includes(jobId)) setSaved(true);
      })
      .catch(() => undefined);
  }, [slug, jobId]);

  const toggleSave = async () => {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/saved-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, jobId }),
      });
      if (res.status === 401) {
        window.location.href = `/login?next=/job/${slug}`;
        return;
      }
      const data = await res.json();
      setSaved(Boolean(data.saved));
      setMessage(data.saved ? "Saved. Last-date reminders are on." : "Removed from saved jobs.");
    } catch {
      setMessage("Could not update saved jobs.");
    } finally {
      setBusy(false);
    }
  };

  const trackApplication = async () => {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examName: postName,
          organization,
          slug,
          jobId,
          status: "APPLIED",
        }),
      });
      if (res.status === 401) {
        window.location.href = `/login?next=/job/${slug}`;
        return;
      }
      if (res.ok) {
        setTracked(true);
        setMessage("Added to My Applications.");
      } else {
        const data = await res.json();
        setMessage(data.error || "Could not track application.");
      }
    } catch {
      setMessage("Could not track application.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={toggleSave}
          disabled={busy}
          className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
            saved ? "bg-amber-500 text-white border-amber-500" : "bg-white text-slate-800 border-slate-200"
          }`}
        >
          {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bookmark className="w-3.5 h-3.5" />}
          {saved ? "Saved" : "Save & remind me"}
        </button>
        <button
          type="button"
          onClick={trackApplication}
          disabled={busy || tracked}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white flex items-center gap-1.5"
        >
          <FilePlus2 className="w-3.5 h-3.5" />
          {tracked ? "Tracking" : "I applied"}
        </button>
      </div>
      {message && <p className="text-[11px] text-slate-600">{message}</p>}
    </div>
  );
}
