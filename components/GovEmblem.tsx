import React from "react";

export default function GovEmblem({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="National Emblem of India"
    >
      {/* Three Lions Representation */}
      {/* Central Lion Head */}
      <path
        d="M50 15 C45 15 42 18 42 22 C42 25 44 27 46 28 C44 29 42 32 42 36 C42 41 45 44 50 44 C55 41 58 36 58 32 C58 29 56 27 54 28 C56 27 58 25 58 22 C58 18 55 15 50 15 Z"
        fill="#334155"
      />
      {/* Left Lion Head */}
      <path
        d="M32 20 C28 20 25 23 25 27 C25 30 27 32 29 33 C27 34 25 37 25 41 C25 45 28 48 33 48 C37 45 39 41 39 37 C39 34 37 32 35 33 C37 32 39 30 39 27 C39 23 36 20 32 20 Z"
        fill="#475569"
      />
      {/* Right Lion Head */}
      <path
        d="M68 20 C64 20 61 23 61 27 C61 30 63 32 65 33 C63 34 61 37 61 41 C61 45 64 48 69 48 C73 45 75 41 75 37 C75 34 73 32 71 33 C73 32 75 30 75 27 C75 23 72 20 68 20 Z"
        fill="#475569"
      />
      {/* Main Mane & Chest Structure */}
      <path
        d="M35 48 C33 55 35 68 37 73 L63 73 C65 68 67 55 65 48 C60 52 55 54 50 54 C45 54 40 52 35 48 Z"
        fill="#334155"
      />
      {/* Abacus platform */}
      <rect x="22" y="75" width="56" height="7" rx="1.5" fill="#1E293B" />
      {/* Ashoka Chakra in Abacus center */}
      <circle cx="50" cy="78.5" r="3" stroke="#F8FAFC" strokeWidth="0.8" fill="none" />
      <circle cx="50" cy="78.5" r="0.8" fill="#F8FAFC" />
      {/* Left Bull & Right Horse motifs */}
      <ellipse cx="32" cy="78.5" rx="4" ry="1.5" fill="#94A3B8" />
      <ellipse cx="68" cy="78.5" rx="4" ry="1.5" fill="#94A3B8" />
      {/* Bell Capital / Lotus Base */}
      <path
        d="M26 84 C30 92 40 96 50 96 C60 96 70 92 74 84 L26 84 Z"
        fill="#334155"
      />
      <rect x="30" y="97" width="40" height="3" rx="1" fill="#1E293B" />
      {/* Satyameva Jayate Banner base */}
      <rect x="20" y="103" width="60" height="4" rx="1.5" fill="#475569" />
    </svg>
  );
}

