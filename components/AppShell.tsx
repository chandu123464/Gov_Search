"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Dashboard, Login, and Register pages get a 100% full-screen layout without constricting margins
  const isFullScreenPage = 
    pathname === "/dashboard" || 
    pathname === "/login" || 
    pathname === "/register";

  if (isFullScreenPage) {
    return (
      <div className="min-h-screen w-full flex flex-col">
        {children}
      </div>
    );
  }

  // Public portal pages get standard Navbar, max-w-7xl container, and Footer
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
