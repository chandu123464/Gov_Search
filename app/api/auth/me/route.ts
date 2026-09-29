import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("fja_session")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const session = verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        user_type: true,
        full_name: true,
        email: true,
        mobile: true,
        dob: true,
        gender: true,
        qualification: true,
        state: true,
        city: true,
        preferred_categories: true,
        saved_jobs: true,
        created_at: true,
      },
    });

    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    let parsedCategories = [];
    let parsedSavedJobs = [];
    try {
      parsedCategories = JSON.parse(user.preferred_categories);
    } catch {}
    try {
      parsedSavedJobs = JSON.parse(user.saved_jobs);
    } catch {}

    return NextResponse.json({
      authenticated: true,
      user: {
        ...user,
        preferred_categories: parsedCategories,
        saved_jobs: parsedSavedJobs,
      },
    });
  } catch (err: any) {
    console.error("Auth check error:", err);
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}

