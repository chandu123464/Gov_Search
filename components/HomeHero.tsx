"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface HomeHeroProps {
  onSearch?: (term: string) => void;
}

export default function HomeHero({ onSearch }: HomeHeroProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm.trim());
    } else if (searchTerm.trim()) {
      router.push(`/government-jobs?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const trendingTags = [
    { label: "SSC", field: "SSC" },
    { label: "Railway", field: "Railway" },
    { label: "Banking", field: "Banking" },
    { label: "Police", field: "Police" },
    { label: "Teaching", field: "Teaching" },
    { label: "Defence", field: "Defence" },
    { label: "State Government", level: "State Government" },
  ];

  const handleTagClick = (tag: typeof trendingTags[0]) => {
    if (tag.field) {
      if (onSearch) {
        onSearch(tag.field);
      } else {
        router.push(`/government-jobs?field=${encodeURIComponent(tag.field)}`);
      }
    } else if (tag.level) {
      if (onSearch) {
        onSearch(tag.level);
      } else {
        router.push(`/government-jobs?government_level=${encodeURIComponent(tag.level)}`);
      }
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-white border border-blue-100/60 p-6 sm:p-10 my-4 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Heading, Search & Trending Tags (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Your Government Job,{" "}
              <span className="text-blue-600 block sm:inline">One Click Away</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-normal max-w-xl">
              Explore latest Central &amp; State Government Jobs by Education, Department and Location.
            </p>
          </div>

          {/* Large Search Box */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-200 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100/60 shadow-md transition-all p-1.5">
              <Search className="w-5 h-5 text-slate-400 ml-3.5 flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs by post name, organization, department..."
                className="w-full px-3 py-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-sm hover:shadow flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          {/* Trending Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
            <span className="text-slate-500 font-medium">Trending:</span>
            {trendingTags.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="bg-blue-50/90 hover:bg-blue-100 text-slate-700 hover:text-blue-700 px-3 py-1 rounded-full font-medium transition border border-blue-200/50"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Monument & National Theme (5 cols) */}
        <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/30 to-amber-100/20 rounded-full blur-3xl pointer-events-none" />

          {/* Rashtrapati Bhavan / Parliament Architectural Dome Artwork with Tricolor */}
          <div className="relative w-full max-w-sm flex flex-col items-center">
            {/* Elegant Script Slogan */}
            <div className="text-right w-full pr-4 mb-2">
              <span className="font-serif italic text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm select-none">
                Sarkari Naukri
              </span>
              <span className="block font-serif italic text-3xl font-extrabold text-blue-900 tracking-wide drop-shadow-sm select-none">
                Sashakt Bharat
              </span>
            </div>

            {/* Monument Silhouette SVG */}
            <svg
              viewBox="0 0 400 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-md"
            >
              {/* Sky and clouds backdrop */}
              <ellipse cx="200" cy="180" rx="180" ry="60" fill="#E0F2FE" fillOpacity="0.4" />

              {/* Central Dome (Rashtrapati Bhavan style) */}
              {/* Flag Mast & Tricolor */}
              <rect x="198" y="20" width="3" height="75" fill="#475569" />
              {/* Fluttering Indian Flag */}
              <g transform="translate(201, 20)">
                <rect x="0" y="0" width="42" height="7" fill="#FF9933" />
                <rect x="0" y="7" width="42" height="7" fill="#FFFFFF" />
                <circle cx="21" cy="10.5" r="2.8" stroke="#000088" strokeWidth="0.8" fill="none" />
                <circle cx="21" cy="10.5" r="0.7" fill="#000088" />
                <rect x="0" y="14" width="42" height="7" fill="#128807" />
              </g>

              {/* Main Sandstone Dome */}
              <path
                d="M170 95 C170 65 230 65 230 95 Z"
                fill="#D97706"
                fillOpacity="0.85"
              />
              <path
                d="M165 95 L235 95 L232 105 L168 105 Z"
                fill="#B45309"
              />
              <rect x="175" y="105" width="50" height="25" fill="#D97706" fillOpacity="0.7" />
              {/* Arched windows in dome base */}
              <path d="M182 118 C182 112 188 112 188 118 V130 H182 Z" fill="#78350F" />
              <path d="M197 118 C197 112 203 112 203 118 V130 H197 Z" fill="#78350F" />
              <path d="M212 118 C212 112 218 112 218 118 V130 H212 Z" fill="#78350F" />

              {/* Colonnade Building Façade */}
              <rect x="60" y="130" width="280" height="15" fill="#F59E0B" fillOpacity="0.8" />
              <rect x="50" y="145" width="300" height="40" fill="#FDE68A" fillOpacity="0.9" />

              {/* Pillars */}
              {Array.from({ length: 19 }).map((_, i) => (
                <rect
                  key={i}
                  x={65 + i * 14}
                  y="145"
                  width="4"
                  height="40"
                  fill="#D97706"
                  fillOpacity="0.7"
                />
              ))}

              {/* Base plinth */}
              <rect x="35" y="185" width="330" height="12" rx="2" fill="#B45309" />
              <rect x="20" y="197" width="360" height="16" rx="2" fill="#92400E" />

              {/* Foreground Greenery Hedge */}
              <ellipse cx="60" cy="216" rx="35" ry="12" fill="#15803D" />
              <ellipse cx="120" cy="218" rx="40" ry="14" fill="#16A34A" />
              <ellipse cx="200" cy="220" rx="60" ry="15" fill="#15803D" />
              <ellipse cx="280" cy="218" rx="40" ry="14" fill="#16A34A" />
              <ellipse cx="340" cy="216" rx="35" ry="12" fill="#15803D" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

