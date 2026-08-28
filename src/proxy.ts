import { NextResponse, type NextRequest } from "next/server";

import { ACCESS_COOKIE, verifyAccessToken } from "@/lib/auth";

const ROBOTS_VALUE = "noindex, nofollow, noarchive";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  const allowed = await verifyAccessToken(token);
  if (allowed) {
    return withRobots(NextResponse.next());
  }
  return withRobots(NextResponse.redirect(new URL("/login", request.url), 307));
}

export const config = {
  matcher: [
    "/((?!login|api/login|_next/|favicon.ico|brand/|robots.txt).*)",
  ],
};

function withRobots(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", ROBOTS_VALUE);
  return response;
}