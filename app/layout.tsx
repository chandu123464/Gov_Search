import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

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
      <body className="min-h-screen bg-[#0b0f19] antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

