import { NextResponse, type NextRequest } from "next/server";

import {
  ACCESS_COOKIE,
  SiteNotConfiguredError,
  createAccessToken,
  getAccessCookieOptions,
  verifySubmittedPassword,
} from "@/lib/auth";
import type { LoginResponse } from "@/lib/login";

export type { LoginResponse } from "@/lib/login";

export interface LoginRequest {
  readonly password: string;
}

const NO_STORE = { "Cache-Control": "no-store" } as const;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponse>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("INVALID_REQUEST", 400);
  }

  const password = readPassword(body);
  if (password == null) {
    return fail("INVALID_REQUEST", 400);
  }

  try {
    const matched = await verifySubmittedPassword(password);
    if (!matched) {
      return fail("INVALID_PASSWORD", 401);
    }
    const token = await createAccessToken();
    const response = NextResponse.json<LoginResponse>(
      { ok: true },
      { status: 200, headers: NO_STORE },
    );
    response.cookies.set(ACCESS_COOKIE, token, getAccessCookieOptions());
    return response;
  } catch (error) {
    if (error instanceof SiteNotConfiguredError) {
      return fail("SITE_NOT_CONFIGURED", 503);
    }
    return fail("SITE_NOT_CONFIGURED", 503);
  }
}

function readPassword(body: unknown): string | null {
  if (body == null || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }
  const password = (body as { password?: unknown }).password;
  if (typeof password !== "string" || password.length === 0) {
    return null;
  }
  return password;
}

function fail(
  code: Exclude<LoginResponse, { ok: true }>["code"],
  status: 400 | 401 | 503,
): NextResponse<LoginResponse> {
  return NextResponse.json<LoginResponse>(
    { ok: false, code },
    { status, headers: NO_STORE },
  );
}