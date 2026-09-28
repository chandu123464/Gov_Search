"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchSuggest({
  value,
  onChange,
  onSubmit,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
}) {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value.trim().length < 2) {
      setItems([]);
      return;
    }
    const handle = setTimeout(() => {
      fetch(`/api/jobs/search?suggest=true&q=${encodeURIComponent(value.trim())}`)
        .then((r) => r.json())
        .then((data) => setItems(data.suggestions || []))
        .catch(() => setItems([]));
    }, 200);
    return () => clearTimeout(handle);
  }, [value]);

  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setOpen(false);
            onSubmit();
          }
        }}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
      />
      {open && items.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {items.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => {
                setOpen(false);
                router.push(`/job/${item.slug}`);
              }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50"
            >
              <span className="font-bold text-slate-900 block">{item.post_name}</span>
              <span className="text-slate-500">
                {item.organization_name} · {item.government_field}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
