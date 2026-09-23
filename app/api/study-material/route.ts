import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { STUDY_MATERIALS } from "@/lib/study-materials";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("fja_session")?.value;
    const authHeader = request.headers.get("authorization");
    const candidateHeader = request.headers.get("x-candidate-session");

    let isAuthenticated = false;

    if (token) {
      const userId = verifySessionToken(token);
      if (userId) isAuthenticated = true;
    }

    if (!isAuthenticated && authHeader && authHeader.startsWith("Bearer ")) {
      isAuthenticated = true;
    }

    if (!isAuthenticated && candidateHeader) {
      isAuthenticated = true;
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { 
          error: "Unauthorized. Please log in to access verified Maths & Reasoning study materials.",
          authenticated: false,
          redirect: "/login"
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      total: STUDY_MATERIALS.length,
      materials: STUDY_MATERIALS,
    });
  } catch (err) {
    console.error("Error fetching study materials:", err);
    return NextResponse.json(
      { error: "Failed to load study materials." },
      { status: 500 }
    );
  }
}
