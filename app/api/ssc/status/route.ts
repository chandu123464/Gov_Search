import { NextResponse } from "next/server";
import { getLiveSscStatus } from "@/lib/ssc-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const status = await getLiveSscStatus();
    return NextResponse.json(status);
  } catch (error: any) {
    console.error("Error in /api/ssc/status:", error);
    return NextResponse.json(
      { error: "Failed to get SSC status", details: error.message },
      { status: 500 }
    );
  }
}
