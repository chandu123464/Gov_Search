import React from "react";
import { getJobs } from "@/lib/jobs-service";
import HomePageClient from "@/components/HomePageClient";

export const revalidate = 60; // ISR cache revalidation every 60 seconds

export default async function HomePage() {
  const result = await getJobs({ limit: 100, sort: "latest" });
  return <HomePageClient initialJobs={result.jobs} />;
}
