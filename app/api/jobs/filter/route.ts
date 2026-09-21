import { NextRequest, NextResponse } from "next/server";
import { getJobs } from "@/lib/jobs-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const qualification = searchParams.get("qualification") || undefined;
    const field = searchParams.get("field") || undefined;
    const government_level = searchParams.get("government_level") || undefined;
    const state = searchParams.get("state") || undefined;
    const status = searchParams.get("status") || undefined;
    const sort = (searchParams.get("sort") as any) || undefined;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const result = await getJobs({
      qualification,
      field,
      government_level,
      state,
      status,
      sort,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to filter jobs" }, { status: 500 });
  }
}
