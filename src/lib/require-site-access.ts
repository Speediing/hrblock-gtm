import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ACCESS_COOKIE, verifyAccessToken } from "@/lib/auth";

export interface CookieReader {
  get(name: string): { readonly value: string } | undefined;
}

export async function hasSiteAccess(
  cookieStore?: CookieReader,
): Promise<boolean> {
  try {
    const store = cookieStore ?? (await cookies());
    return verifyAccessToken(store.get(ACCESS_COOKIE)?.value);
  } catch {
    return false;
  }
}

export async function requireSiteAccess(): Promise<void> {
  const allowed = await hasSiteAccess();
  if (!allowed) {
    redirect("/login");
  }
}