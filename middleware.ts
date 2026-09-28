import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "fja_session";

function hasSession(request: NextRequest) {
  return Boolean(request.cookies.get(SESSION_COOKIE)?.value);
}

function isAdminToken(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    const payload = token.split(".")[0];
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return Boolean(data.isAdmin) && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = hasSession(request);

  if (pathname.startsWith("/dashboard") && !loggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin")) {
    if (!loggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", "/admin");
      return NextResponse.redirect(url);
    }
    if (!isAdminToken(request)) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  if ((pathname === "/login" || pathname === "/register") && loggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
