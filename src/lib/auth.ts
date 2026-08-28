export const ACCESS_COOKIE = "hrblock_site_access";
export const ACCESS_TOKEN_CONTEXT = "hrblock:site-access:v1";
export const ACCESS_COOKIE_MAX_AGE = 604800;

export class SiteNotConfiguredError extends Error {
  readonly code = "SITE_NOT_CONFIGURED" as const;

  constructor() {
    super("SITE_NOT_CONFIGURED");
    this.name = "SiteNotConfiguredError";
  }
}

export interface AccessCookieOptions {
  readonly httpOnly: true;
  readonly sameSite: "lax";
  readonly secure: boolean;
  readonly path: "/";
  readonly maxAge: number;
}

export function getSitePassword(): string {
  const value = process.env.SITE_PASSWORD;
  if (value == null || value === "") {
    throw new SiteNotConfiguredError();
  }
  return value;
}

export function getAccessCookieOptions(): AccessCookieOptions {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_COOKIE_MAX_AGE,
  };
}

export async function verifySubmittedPassword(candidate: string): Promise<boolean> {
  const expected = getSitePassword();
  const left = await digestUtf8(candidate);
  const right = await digestUtf8(expected);
  return timingSafeEqualBytes(left, right);
}

export async function createAccessToken(): Promise<string> {
  const password = getSitePassword();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(ACCESS_TOKEN_CONTEXT),
  );
  return toBase64Url(signature);
}

export async function verifyAccessToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) {
    return false;
  }
  try {
    const expected = await createAccessToken();
    const left = await digestUtf8(token);
    const right = await digestUtf8(expected);
    return timingSafeEqualBytes(left, right);
  } catch {
    return false;
  }
}

async function digestUtf8(value: string): Promise<Uint8Array> {
  const bytes = new TextEncoder().encode(value);
  return new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
}

function timingSafeEqualBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) {
    return false;
  }
  let mismatch = 0;
  for (let index = 0; index < left.byteLength; index += 1) {
    mismatch |= left[index]! ^ right[index]!;
  }
  return mismatch === 0;
}

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}