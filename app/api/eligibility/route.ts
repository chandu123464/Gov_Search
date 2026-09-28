import { NextRequest, NextResponse } from "next/server";
import { getJobByIdOrSlug } from "@/lib/jobs-service";
import { getCurrentUser } from "@/lib/session";
import { evaluateEligibility } from "@/lib/eligibility";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") || request.nextUrl.searchParams.get("id");
  if (!slug) return NextResponse.json({ error: "slug is required" }, { status: 400 });

  const job = await getJobByIdOrSlug(slug);
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({
      authenticated: false,
      job: { slug: job.slug, post_name: job.post_name },
      result: null,
    });
  }

  return NextResponse.json({
    authenticated: true,
    result: evaluateEligibility(job, user),
  });
}
