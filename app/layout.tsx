import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FreeJobAlert.Com : Latest Government Jobs, Sarkari Naukri & Admit Cards 2026",
  description:
    "India's #1 Government Job notification portal. Find latest Sarkari Naukri vacancies, admit cards, and exam results from UPSC, SSC, Railway, Banking, Police, and State PSCs.",
  keywords: [
    "Government jobs",
    "Sarkari Naukri",
    "SSC",
    "Railway Jobs",
    "Bank Jobs",
    "Police Recruitment",
    "10th Pass Govt Jobs",
    "12th Pass Govt Jobs",
    "FreeJobAlert",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#f4f6f8] text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
