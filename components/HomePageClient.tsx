"use client";

import React, { useState } from "react";
import HomeHero from "@/components/HomeHero";
import JobsByEducationSection from "@/components/JobsByEducationSection";
import StepFilterBar from "@/components/StepFilterBar";
import InteractiveJobExplorer from "@/components/InteractiveJobExplorer";
import TrustBadges from "@/components/TrustBadges";

interface Props {
  initialJobs: any[];
}

export default function HomePageClient({ initialJobs }: Props) {
  // Default states initialized to 12TH + SSC + Central Government matching HomePage.png
  const [selectedQual, setSelectedQual] = useState<string>("12TH");
  const [selectedField, setSelectedField] = useState<string>("SSC");
  const [selectedLevel, setSelectedLevel] = useState<string>("Central Government");
  const [selectedState, setSelectedState] = useState<string>("All States");
  const [allJobs] = useState<any[]>(initialJobs);
  const [displayedJobs, setDisplayedJobs] = useState<any[]>(() => {
    // Initial filter matching HomePage.png (12TH + SSC + Central Government)
    const filtered = initialJobs.filter((job) => {
      const matchQual =
        job.qualification_level === "12TH" ||
        job.qualification?.toUpperCase().includes("12TH") ||
        (job.qualification_level === "10TH" && !job.exact_qual_required);
      const matchField =
        !job.government_field || job.government_field.toUpperCase() === "SSC";
      const matchLevel =
        !job.government_level ||
        job.government_level.toUpperCase().includes("CENTRAL");
      return matchQual && matchField && matchLevel;
    });
    return filtered.length > 0 ? filtered : initialJobs;
  });

  // Client-side and API filtering function
  const applyFilters = async (
    qual = selectedQual,
    field = selectedField,
    level = selectedLevel,
    state = selectedState,
    search = ""
  ) => {
    try {
      const params = new URLSearchParams();
      if (qual && !qual.toLowerCase().startsWith("all")) params.set("qualification", qual);
      if (field && !field.toLowerCase().startsWith("all")) params.set("field", field);
      if (level && !level.toLowerCase().startsWith("all")) params.set("government_level", level);
      if (state && state !== "All States" && state !== "All India") params.set("state", state);
      if (search) params.set("search", search);

      const res = await fetch(`/api/jobs/filter?${params.toString()}&limit=50`);
      if (res.ok) {
        const data = await res.json();
        if (data.jobs) {
          setDisplayedJobs(data.jobs);
          return;
        }
      }
    } catch (err) {
      console.error("Filter API fetch failed, falling back to local filter:", err);
    }

    // Local fallback filter
    const filtered = allJobs.filter((job) => {
      let matchQual = true;
      if (qual && !qual.toLowerCase().startsWith("all")) {
        const qNorm = qual.toUpperCase();
        matchQual =
          job.qualification_level === qNorm ||
          job.qualification?.toUpperCase().includes(qNorm) ||
          (qNorm === "12TH" && ["8TH", "10TH"].includes(job.qualification_level) && !job.exact_qual_required);
      }

      let matchField = true;
      if (field && !field.toLowerCase().startsWith("all")) {
        matchField = job.government_field?.toUpperCase() === field.toUpperCase();
      }

      let matchLevel = true;
      if (level && !level.toLowerCase().startsWith("all")) {
        matchLevel = job.government_level?.toUpperCase().includes(level.toUpperCase());
      }

      let matchState = true;
      if (state && state !== "All States" && state !== "All India") {
        matchState = job.state === "All India" || job.state?.toUpperCase().includes(state.toUpperCase());
      }

      let matchSearch = true;
      if (search) {
        const s = search.toLowerCase();
        matchSearch =
          job.post_name.toLowerCase().includes(s) ||
          job.organization_name.toLowerCase().includes(s) ||
          job.government_field.toLowerCase().includes(s);
      }

      return matchQual && matchField && matchLevel && matchState && matchSearch;
    });

    setDisplayedJobs(filtered);
  };

  const handleEducationSelect = (qualId: string) => {
    setSelectedQual(qualId);
    applyFilters(qualId, selectedField, selectedLevel, selectedState);
    const target = document.getElementById("available-jobs");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearch = (term: string) => {
    applyFilters(selectedQual, selectedField, selectedLevel, selectedState, term);
    const target = document.getElementById("available-jobs");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFindJobsClick = () => {
    applyFilters(selectedQual, selectedField, selectedLevel, selectedState);
    const target = document.getElementById("available-jobs");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClearFilters = () => {
    setSelectedQual("");
    setSelectedField("");
    setSelectedLevel("");
    setSelectedState("All States");
    setDisplayedJobs(allJobs);
  };

  const handleRemoveFilter = (key: "qual" | "field" | "level" | "state") => {
    let q = selectedQual;
    let f = selectedField;
    let l = selectedLevel;
    let s = selectedState;

    if (key === "qual") {
      q = "";
      setSelectedQual("");
    } else if (key === "field") {
      f = "";
      setSelectedField("");
    } else if (key === "level") {
      l = "";
      setSelectedLevel("");
    } else if (key === "state") {
      s = "All States";
      setSelectedState("All States");
    }

    applyFilters(q, f, l, s);
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero Section matching HomePage.png */}
      <HomeHero onSearch={handleSearch} />

      {/* 2. Jobs by Education 24 Pastel Cards Grid */}
      <JobsByEducationSection
        selectedQual={selectedQual}
        onSelect={handleEducationSelect}
      />

      {/* 3. Four-Step Discovery Filter Bar */}
      <StepFilterBar
        selectedQual={selectedQual}
        selectedField={selectedField}
        selectedLevel={selectedLevel}
        selectedState={selectedState}
        onQualChange={(val) => {
          setSelectedQual(val);
          applyFilters(val, selectedField, selectedLevel, selectedState);
        }}
        onFieldChange={(val) => {
          setSelectedField(val);
          applyFilters(selectedQual, val, selectedLevel, selectedState);
        }}
        onLevelChange={(val) => {
          setSelectedLevel(val);
          applyFilters(selectedQual, selectedField, val, selectedState);
        }}
        onStateChange={(val) => {
          setSelectedState(val);
          applyFilters(selectedQual, selectedField, selectedLevel, val);
        }}
        onFindJobs={handleFindJobsClick}
      />

      {/* 4. Available Jobs & Selected Job Details Explorer (Two Columns) */}
      <InteractiveJobExplorer
        initialJobs={displayedJobs}
        selectedQual={selectedQual}
        selectedField={selectedField}
        selectedLevel={selectedLevel}
        selectedState={selectedState}
        onClearFilters={handleClearFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      {/* 5. Trust Badges & National Slogan */}
      <TrustBadges />
    </div>
  );
}

