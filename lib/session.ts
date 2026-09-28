import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";
import { createSessionToken, verifySessionToken, SessionPayload } from "./auth";
import { mapDisplayQualToLevel } from "./qualification-matching";

export const SESSION_COOKIE = "fja_session";

export type PublicUser = {
  id: string;
  user_type: string;
  full_name: string;
  email: string;
  mobile: string | null;
  dob: string;
  gender: string;
  category: string;
  pwd: boolean;
  qualification: string;
  qualification_level: string;
  state: string;
  city: string;
  preferred_categories: string[];
  saved_jobs: string[];
  preferred_language: string;
  email_alerts: boolean;
  whatsapp_alerts: boolean;
  is_admin: boolean;
};

export function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function toPublicUser(user: {
  id: string;
  user_type: string;
  full_name: string;
  email: string;
  mobile: string | null;
  dob: string;
  gender: string;
  category: string;
  pwd: boolean;
  qualification: string;
  qualification_level: string;
  state: string;
  city: string;
  preferred_categories: string;
  saved_jobs: string;
  preferred_language: string;
  email_alerts: boolean;
  whatsapp_alerts: boolean;
  is_admin: boolean;
}): PublicUser {
  return {
    id: user.id,
    user_type: user.user_type,
    full_name: user.full_name,
    email: user.email,
    mobile: user.mobile,
    dob: user.dob,
    gender: user.gender,
    category: user.category,
    pwd: user.pwd,
    qualification: user.qualification,
    qualification_level: user.qualification_level || mapDisplayQualToLevel(user.qualification),
    state: user.state,
    city: user.city,
    preferred_categories: parseJsonArray(user.preferred_categories),
    saved_jobs: parseJsonArray(user.saved_jobs),
    preferred_language: user.preferred_language,
    email_alerts: user.email_alerts,
    whatsapp_alerts: user.whatsapp_alerts,
    is_admin: user.is_admin,
  };
}

export function setSessionCookie(response: NextResponse, userId: string, isAdmin: boolean) {
  const token = createSessionToken(userId, isAdmin);
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  return response;
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}

export function readTokenFromCookies(): string | null {
  try {
    return cookies().get(SESSION_COOKIE)?.value || null;
  } catch {
    return null;
  }
}

export function readTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(SESSION_COOKIE)?.value || null;
}

export function peekSession(token?: string | null): SessionPayload | null {
  if (!token) token = readTokenFromCookies();
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getCurrentUser(token?: string | null) {
  const session = peekSession(token);
  if (!session) return null;

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return null;
  return toPublicUser(user);
}

export async function requireUser(token?: string | null) {
  const user = await getCurrentUser(token);
  if (!user) {
    return {
      user: null as PublicUser | null,
      error: NextResponse.json({ error: "Please log in to continue." }, { status: 401 }),
    };
  }
  return { user, error: null as NextResponse | null };
}

export async function requireAdmin(token?: string | null) {
  const { user, error } = await requireUser(token);
  if (error || !user) {
    return { user: null as PublicUser | null, error: error! };
  }
  if (!user.is_admin) {
    return {
      user: null as PublicUser | null,
      error: NextResponse.json({ error: "Admin access required." }, { status: 403 }),
    };
  }
  return { user, error: null as NextResponse | null };
}
