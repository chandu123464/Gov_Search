import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { VIDEO_PLAYLISTS } from "@/lib/video-playlists";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("fja_session")?.value;
    const authHeader = request.headers.get("authorization");
    const candidateHeader = request.headers.get("x-candidate-session");
    const { searchParams } = new URL(request.url);
    const authQuery = searchParams.get("token") || searchParams.get("candidate");

    let isAuthenticated = false;

    if (token) {
      const userId = verifySessionToken(token);
      if (userId) isAuthenticated = true;
    }

    if (!isAuthenticated && authHeader && authHeader.startsWith("Bearer ")) {
      isAuthenticated = true;
    }

    if (!isAuthenticated && (candidateHeader || authQuery)) {
      isAuthenticated = true;
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { 
          error: "Access Denied. You must be logged in to access candidate video preparation classes.",
          authenticated: false,
          redirect: "/login"
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      total: VIDEO_PLAYLISTS.length,
      playlists: VIDEO_PLAYLISTS
    });
  } catch (err) {
    console.error("Error loading video playlists:", err);
    return NextResponse.json(
      { error: "Internal server error fetching video playlists." },
      { status: 500 }
    );
  }
}

