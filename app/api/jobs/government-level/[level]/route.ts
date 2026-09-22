import { NextRequest, NextResponse } from "next/server";
import { getJobs } from "@/lib/jobs-service";

export async function GET(
  request: NextRequest,
  { params }: { params: { level: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const qualification = searchParams.get("qualification") || undefined;
    const field = searchParams.get("field") || undefined;
    const state = searchParams.get("state") || undefined;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const result = await getJobs({
      government_level: decodeURIComponent(params.level),
      qualification,
      field,
      state,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch jobs by government level" }, { status: 500 });
  }
}

