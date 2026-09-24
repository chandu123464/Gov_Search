import { NextResponse } from "next/server";
import { PRACTICE_RESOURCES, SEVEN_STEP_ROUTINE, EXAM_COMBINATIONS } from "@/lib/practice-resources";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const resourceType = searchParams.get("type");
    const search = searchParams.get("search")?.toLowerCase().trim();

    let filtered = [...PRACTICE_RESOURCES];

    if (category && category !== "All Exams") {
      filtered = filtered.filter(
        (r) =>
          r.category === category ||
          r.category === "All Exams" ||
          r.targetExams.some((e: string) => e.toLowerCase().includes(category.toLowerCase()))
      );
    }

    if (resourceType && resourceType !== "all") {
      filtered = filtered.filter((r) => r.resourceType === resourceType || r.resourceType === "all_in_one");
    }

    if (search) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(search) ||
          r.platform.toLowerCase().includes(search) ||
          r.description.toLowerCase().includes(search) ||
          r.targetExams.some((e: string) => e.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({
      success: true,
      total: filtered.length,
      resources: filtered,
      routine: SEVEN_STEP_ROUTINE,
      combinations: EXAM_COMBINATIONS
    });
  } catch (err) {
    console.error("Error loading practice resources:", err);
    return NextResponse.json(
      { error: "Failed to retrieve practice resources." },
      { status: 500 }
    );
  }
}
