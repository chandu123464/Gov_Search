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
    <div
      className="relative overflow-hidden rounded-3xl border border-slate-200/80 my-4 shadow-sm min-h-[380px] sm:min-h-[440px] flex items-center bg-cover bg-right sm:bg-right-top bg-no-repeat"
      style={{
        backgroundImage: "url('/images/HomePage%20Image.png')",
        backgroundColor: "#f0f7ff",
      }}
    >
      {/* Soft gradient wash on left for maximum text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:via-white/70 lg:to-transparent pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 sm:py-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading, Search & Trending Tags (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Your Government Job,{" "}
              <span className="text-blue-600 block sm:inline">One Click Away</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl">
              Explore latest Central &amp; State Government Jobs by Education, Department and Location.
            </p>
          </div>

          {/* Large Search Box */}
          <form onSubmit={handleSearchSubmit} className="pt-1">
            <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-200/90 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 shadow-md transition-all p-1.5 max-w-2xl">
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
          <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
            <span className="text-slate-500 font-medium">Trending:</span>
            {trendingTags.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="bg-white/90 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-3 py-1 rounded-full font-semibold transition border border-slate-200 hover:border-blue-300 shadow-xs"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Slogan Calligraphy overlay above the dome (5 cols) */}
        <div className="lg:col-span-5 hidden lg:flex flex-col items-end justify-start self-start pt-2 pr-6">
          <div className="text-right select-none font-serif italic">
            <span className="text-2xl xl:text-3xl font-bold text-slate-700/90 tracking-wide drop-shadow-sm block">
              Sarkari Naukri
            </span>
            <span className="text-3xl xl:text-4xl font-extrabold text-blue-900 tracking-wide drop-shadow-sm block mt-0.5">
              Sashakt Bharat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
