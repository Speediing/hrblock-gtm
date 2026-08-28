import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { NextRequest } from "next/server";

import { POST } from "../src/app/api/login/route";
import { ACCESS_COOKIE, createAccessToken } from "../src/lib/auth";

const originalPassword = process.env.SITE_PASSWORD;
const originalNodeEnv = process.env.NODE_ENV;

function setNodeEnv(value: string | undefined) {
  const env = process.env as { NODE_ENV?: string };
  if (value == null) {
    delete env.NODE_ENV;
    return;
  }
  env.NODE_ENV = value;
}

afterEach(() => {
  if (originalPassword == null) {
    delete process.env.SITE_PASSWORD;
  } else {
    process.env.SITE_PASSWORD = originalPassword;
  }
  setNodeEnv(originalNodeEnv);
});

function requestWith(body: unknown, contentType = "application/json") {
  return new NextRequest("http://localhost/api/login", {
    method: "POST",
    headers: { "content-type": contentType },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/login", () => {
  it("returns 503 when the site is not configured", async () => {
    delete process.env.SITE_PASSWORD;
    const response = await POST(requestWith({ password: "anything" }));
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      ok: false,
      code: "SITE_NOT_CONFIGURED",
    });
    assert.equal(response.headers.get("cache-control"), "no-store");
  });

  it("returns the same malformed and wrong-password failure shape", async () => {
    process.env.SITE_PASSWORD = "expected";
    const malformed = await POST(requestWith({ password: "" }));
    const wrong = await POST(requestWith({ password: "other" }));
    assert.equal(malformed.status, 400);
    assert.equal(wrong.status, 401);
    assert.deepEqual(await malformed.json(), {
      ok: false,
      code: "INVALID_REQUEST",
    });
    assert.deepEqual(await wrong.json(), {
      ok: false,
      code: "INVALID_PASSWORD",
    });
  });

  it("sets an HttpOnly access cookie that is not the raw password", async () => {
    process.env.SITE_PASSWORD = "expected";
    setNodeEnv("production");
    const response = await POST(requestWith({ password: "expected" }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    const cookie = response.cookies.get(ACCESS_COOKIE);
    const expectedToken = await createAccessToken();
    assert.ok(cookie);
    assert.equal(cookie?.value, expectedToken);
    assert.equal(cookie?.value.includes("expected"), false);
    assert.equal(cookie?.httpOnly, true);
    assert.equal(cookie?.path, "/");
    assert.equal(cookie?.sameSite, "lax");
    assert.equal(cookie?.secure, true);
    assert.equal(cookie?.maxAge, 604800);
  });
});