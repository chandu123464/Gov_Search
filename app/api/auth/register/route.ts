import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      user_type = "Job seeker",
      full_name,
      email,
      password,
      mobile,
      dob,
      gender,
      qualification,
      state,
      city,
      preferred_categories = [],
    } = body;

    // Validation
    if (!full_name || !email || !password || !dob || !gender || !qualification || !state || !city) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        user_type,
        full_name: full_name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        mobile: mobile ? mobile.trim() : null,
        dob,
        gender,
        qualification,
        state,
        city,
        preferred_categories: JSON.stringify(preferred_categories),
        saved_jobs: JSON.stringify([]),
      },
    });

    // Create session token
    const token = createSessionToken(user.id);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        user_type: user.user_type,
        full_name: user.full_name,
        email: user.email,
        qualification: user.qualification,
        state: user.state,
        city: user.city,
        preferred_categories,
      },
    });

    // Set cookie
    response.cookies.set("fja_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

