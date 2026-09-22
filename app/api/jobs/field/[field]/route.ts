import { NextRequest, NextResponse } from "next/server";
import { getJobs } from "@/lib/jobs-service";

export async function GET(
  request: NextRequest,
  { params }: { params: { field: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const qualification = searchParams.get("qualification") || undefined;
    const government_level = searchParams.get("government_level") || undefined;
    const state = searchParams.get("state") || undefined;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const result = await getJobs({
      field: decodeURIComponent(params.field),
      qualification,
      government_level,
      state,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch jobs by field" }, { status: 500 });
  }
}

