"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  QUALIFICATION_LIST, 
  GOVERNMENT_FIELDS, 
  GOVERNMENT_LEVELS, 
  INDIAN_STATES 
} from "@/lib/types";
import { 
  GraduationCap, 
  Building2, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Filter 
} from "lucide-react";

export default function MultiStepDiscovery() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedQual, setSelectedQual] = useState<string>("");
  const [selectedField, setSelectedField] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("All India");

  const handleFinish = () => {
    const params = new URLSearchParams();
    if (selectedQual) params.set("qualification", selectedQual);
    if (selectedField) params.set("field", selectedField);
    if (selectedLevel) params.set("government_level", selectedLevel);
    if (selectedState && selectedState !== "All India") params.set("state", selectedState);

    router.push(`/government-jobs?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden my-6">
      {/* Top Wizard Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wide mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Smart Job Discovery
            </div>
            <h2 className="text-xl md:text-2xl font-black">
              Find Your Eligible Government Jobs in 3 Simple Steps
            </h2>
            <p className="text-xs md:text-sm text-blue-200 mt-0.5">
              Data-driven qualification matching &amp; department filtering engine
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (step === 1 || (step === 2 && selectedQual) || (step === 3 && selectedQual && selectedField)) {
                      setCurrentStep(step as any);
                    }
                  }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${
                    currentStep === step
                      ? "bg-amber-400 text-slate-950 ring-2 ring-white"
                      : currentStep > step
                      ? "bg-emerald-500 text-white"
                      : "bg-blue-950 text-blue-300"
                  }`}
                >
                  {currentStep > step ? <Check className="w-3.5 h-3.5" /> : step}
                </button>
                <span className="text-xs text-blue-200 hidden sm:inline">
                  {step === 1 ? "Education" : step === 2 ? "Govt Field" : "Govt Level"}
                </span>
                {step < 3 && <span className="text-blue-400">›</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Summary Breadcrumb */}
        {(selectedQual || selectedField || selectedLevel) && (
          <div className="mt-4 pt-3 border-t border-blue-800 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-blue-300 font-medium">Selected Path:</span>
            {selectedQual && (
              <span className="bg-blue-700 text-amber-300 px-2 py-0.5 rounded font-bold">
                🎓 {selectedQual}
              </span>
            )}
            {selectedField && (
              <span className="bg-blue-700 text-sky-300 px-2 py-0.5 rounded font-bold">
                🏢 {selectedField}
              </span>
            )}
            {selectedLevel && (
              <span className="bg-blue-700 text-emerald-300 px-2 py-0.5 rounded font-bold">
                🏛️ {selectedLevel} {selectedState !== "All India" ? `(${selectedState})` : ""}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Step Content */}
      <div className="p-5 md:p-6 bg-slate-50/50">
        {/* STEP 1: Select Education */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>Step 1 — Select Your Educational Qualification</span>
              </div>
              <span className="text-xs text-slate-500">Pick highest qualification</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {QUALIFICATION_LIST.map((qual) => {
                const isSelected = selectedQual === qual.id;
                return (
                  <button
                    key={qual.id}
                    type="button"
                    onClick={() => {
                      setSelectedQual(qual.id);
                      setCurrentStep(2);
                    }}
                    className={`p-3 rounded-xl border text-center font-bold text-sm transition flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-blue-700 text-white border-blue-800 shadow-md scale-105"
                        : "bg-white text-slate-800 border-slate-200 hover:border-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    <span>{qual.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Select Government Field */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Step 2 — Select Government Field / Department</span>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Education
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {GOVERNMENT_FIELDS.map((field) => {
                const isSelected = selectedField === field;
                return (
                  <button
                    key={field}
                    type="button"
                    onClick={() => {
                      setSelectedField(field);
                      setCurrentStep(3);
                    }}
                    className={`p-3.5 rounded-xl border text-center font-bold text-sm transition flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-blue-700 text-white border-blue-800 shadow-md scale-105"
                        : "bg-white text-slate-800 border-slate-200 hover:border-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    <span>{field}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedField("");
                  setCurrentStep(3);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                Skip / Any Government Field →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Select Government Level & State */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Step 3 — Select Government Level &amp; State</span>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Field
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                Government Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {GOVERNMENT_LEVELS.map((level) => {
                  const isSelected = selectedLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSelectedLevel(level)}
                      className={`p-3 rounded-xl border text-center font-bold text-sm transition ${
                        isSelected
                          ? "bg-blue-700 text-white border-blue-800 shadow-md"
                          : "bg-white text-slate-800 border-slate-200 hover:border-blue-500 hover:bg-blue-50"
                      }`}
                    >
                      <span>{level}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                Preferred State / Location
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full max-w-md p-3 border border-slate-300 rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg hover:shadow-orange-500/30 transition flex items-center gap-2 text-sm uppercase tracking-wide"
              >
                <span>View Matching Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
