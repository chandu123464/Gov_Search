import React from "react";

interface EmblemLogoProps {
  type: string;
  className?: string;
  size?: number;
}

export default function EmblemLogo({ type, className = "", size = 48 }: EmblemLogoProps) {
  const norm = (type || "").toUpperCase();

  // 1. Staff Selection Commission (SSC) Golden Lion Emblem
  if (norm.includes("SSC") || norm.includes("STAFF SELECTION")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 p-0.5 shadow-sm flex items-center justify-center flex-shrink-0 ${className}`}
      >
        <div className="w-full h-full rounded-full bg-red-800 flex flex-col items-center justify-center p-1 border-2 border-yellow-200">
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full text-yellow-300">
            {/* Ashoka Lion silhouette */}
            <circle cx="18" cy="18" r="16" stroke="#FDE047" strokeWidth="1.5" />
            <path
              d="M18 7C14.5 7 12 9.5 12 13C12 15.5 13.5 17.5 15.5 18.5V23H20.5V18.5C22.5 17.5 24 15.5 24 13C24 9.5 21.5 7 18 7Z"
              fill="#FDE047"
            />
            <circle cx="18" cy="12" r="1.5" fill="#991B1B" />
            <rect x="15" y="24" width="6" height="2" fill="#FDE047" rx="0.5" />
            <circle cx="18" cy="28" r="1.5" fill="#FDE047" />
          </svg>
        </div>
      </div>
    );
  }

  // 2. Indian Railways (RRB) Emblem
  if (norm.includes("RAIL") || norm.includes("RRB") || norm.includes("TRAIN")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-amber-500 p-0.5 shadow-sm flex items-center justify-center flex-shrink-0 ${className}`}
      >
        <div className="w-full h-full rounded-full bg-red-700 flex flex-col items-center justify-center border-2 border-white/80">
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full text-white">
            <circle cx="18" cy="18" r="15" stroke="white" strokeWidth="1.5" />
            {/* Train wheel / tracks symbol */}
            <circle cx="18" cy="18" r="7" stroke="#FEF08A" strokeWidth="1.5" strokeDasharray="3 2" />
            <rect x="14" y="13" width="8" height="9" rx="1.5" fill="white" />
            <circle cx="16" cy="19.5" r="1" fill="#B91C1C" />
            <circle cx="20" cy="19.5" r="1" fill="#B91C1C" />
            <path d="M13 25L23 25" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 25L14 27" stroke="white" strokeWidth="1.5" />
            <path d="M21 25L22 27" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    );
  }

  // 3. Banking / IBPS / SBI Emblem
  if (norm.includes("BANK") || norm.includes("IBPS") || norm.includes("SBI")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full bg-gradient-to-tr from-blue-700 via-sky-600 to-cyan-400 p-0.5 shadow-sm flex items-center justify-center flex-shrink-0 ${className}`}
      >
        <div className="w-full h-full rounded-full bg-blue-900 flex items-center justify-center border-2 border-white/80">
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full text-white">
            <circle cx="18" cy="18" r="15" stroke="#38BDF8" strokeWidth="1.5" />
            {/* Pillars / bank facade */}
            <path d="M10 13L18 8L26 13V15H10V13Z" fill="#38BDF8" />
            <rect x="12" y="16" width="2" height="8" fill="white" />
            <rect x="17" y="16" width="2" height="8" fill="white" />
            <rect x="22" y="16" width="2" height="8" fill="white" />
            <rect x="9" y="25" width="18" height="2.5" rx="0.5" fill="#38BDF8" />
          </svg>
        </div>
      </div>
    );
  }

  // 4. Police / Defence
  if (norm.includes("POLICE") || norm.includes("DEFENCE") || norm.includes("ARMY") || norm.includes("NAVY")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full bg-gradient-to-tr from-blue-900 via-indigo-700 to-amber-400 p-0.5 shadow-sm flex items-center justify-center flex-shrink-0 ${className}`}
      >
        <div className="w-full h-full rounded-full bg-indigo-950 flex items-center justify-center border-2 border-amber-300">
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full text-amber-300">
            <path
              d="M18 5L28 9V17C28 23 23.5 28 18 31C12.5 28 8 23 8 17V9L18 5Z"
              fill="#1E1B4B"
              stroke="#FBBF24"
              strokeWidth="1.5"
            />
            {/* Star inside shield */}
            <polygon
              points="18,11 20,15 24,15.5 21,18.5 22,23 18,20.5 14,23 15,18.5 12,15.5 16,15"
              fill="#FBBF24"
            />
          </svg>
        </div>
      </div>
    );
  }

  // 5. Postal Department
  if (norm.includes("POST") || norm.includes("GDS")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-amber-400 p-0.5 shadow-sm flex items-center justify-center flex-shrink-0 ${className}`}
      >
        <div className="w-full h-full rounded-full bg-red-700 flex items-center justify-center border-2 border-amber-300">
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full text-yellow-300">
            <rect x="9" y="11" width="18" height="14" rx="2" stroke="white" strokeWidth="1.5" />
            <path d="M9 13L18 20L27 13" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    );
  }

  // Default: Government Ashoka Lions Emblem
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full bg-gradient-to-tr from-blue-700 via-sky-600 to-blue-500 p-0.5 shadow-sm flex items-center justify-center flex-shrink-0 ${className}`}
    >
      <div className="w-full h-full rounded-full bg-blue-900 flex items-center justify-center border-2 border-white/80">
        <svg viewBox="0 0 36 36" fill="none" className="w-full h-full text-amber-300">
          <circle cx="18" cy="18" r="15" stroke="#FDE047" strokeWidth="1.5" />
          <path
            d="M18 8C15 8 13 10.5 13 13.5C13 15.5 14.2 17 16 18V22H20V18C21.8 17 23 15.5 23 13.5C23 10.5 21 8 18 8Z"
            fill="#FDE047"
          />
          <rect x="14" y="23" width="8" height="2" fill="#FDE047" rx="0.5" />
          <circle cx="18" cy="27" r="1.5" fill="#FDE047" />
        </svg>
      </div>
    </div>
  );
}

