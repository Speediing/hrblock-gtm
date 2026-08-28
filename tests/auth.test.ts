import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  ACCESS_COOKIE_MAX_AGE,
  ACCESS_TOKEN_CONTEXT,
  SiteNotConfiguredError,
  createAccessToken,
  getAccessCookieOptions,
  getSitePassword,
  verifyAccessToken,
  verifySubmittedPassword,
} from "../src/lib/auth";

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

describe("site password configuration", () => {
  it("fails closed when SITE_PASSWORD is missing", () => {
    delete process.env.SITE_PASSWORD;
    assert.throws(() => getSitePassword(), SiteNotConfiguredError);
  });

  it("fails closed when SITE_PASSWORD is empty", () => {
    process.env.SITE_PASSWORD = "";
    assert.throws(() => getSitePassword(), SiteNotConfiguredError);
  });

  it("does not trim the configured password", () => {
    process.env.SITE_PASSWORD = " keep ";
    assert.equal(getSitePassword(), " keep ");
  });
});

describe("password verification", () => {
  it("accepts the correct password and rejects a wrong one", async () => {
    process.env.SITE_PASSWORD = "correct-horse";
    assert.equal(await verifySubmittedPassword("correct-horse"), true);
    assert.equal(await verifySubmittedPassword("wrong-horse"), false);
  });
});

describe("access token", () => {
  it("creates a deterministic token that never contains the raw password", async () => {
    process.env.SITE_PASSWORD = "secret-value";
    const first = await createAccessToken();
    const second = await createAccessToken();
    assert.equal(first, second);
    assert.equal(first.includes("secret-value"), false);
    assert.match(first, /^[A-Za-z0-9_-]+$/);
    assert.equal(ACCESS_TOKEN_CONTEXT, "hrblock:site-access:v1");
    assert.equal(await verifyAccessToken(first), true);
    assert.equal(await verifyAccessToken("forged-token"), false);
    assert.equal(await verifyAccessToken(undefined), false);
  });

  it("fails closed when configuration is missing", async () => {
    delete process.env.SITE_PASSWORD;
    assert.equal(await verifyAccessToken("anything"), false);
  });
});

describe("cookie options", () => {
  it("sets HttpOnly Lax Path=/ and a 7-day max age", () => {
    setNodeEnv("test");
    const options = getAccessCookieOptions();
    assert.equal(options.httpOnly, true);
    assert.equal(options.sameSite, "lax");
    assert.equal(options.path, "/");
    assert.equal(options.maxAge, ACCESS_COOKIE_MAX_AGE);
    assert.equal(options.maxAge, 604800);
    assert.equal(options.secure, false);
  });

  it("marks the cookie Secure in production", () => {
    setNodeEnv("production");
    assert.equal(getAccessCookieOptions().secure, true);
  });
});