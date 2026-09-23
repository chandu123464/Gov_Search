import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "GovSearch : Government Jobs, Sarkari Naukri & Exam Discovery 2026",
  description:
    "GovSearch - Find Government Jobs. Build a Better Future. Explore latest Central & State Government Jobs by Education, Department and Location.",
  keywords: [
    "GovSearch",
    "Government jobs",
    "Sarkari Naukri",
    "SSC",
    "Railway Jobs",
    "Bank Jobs",
    "Police Recruitment",
    "10th Pass Govt Jobs",
    "12th Pass Govt Jobs",
    "Graduate Govt Jobs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

