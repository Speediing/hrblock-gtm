"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import type { LoginResponse } from "@/lib/login";

import styles from "./login-form.module.css";

const GENERIC_ERROR = "The password is incorrect.";
const CONFIG_ERROR = "This site is not available.";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as LoginResponse;
      if (data.ok) {
        router.replace("/");
        router.refresh();
        return;
      }
      setError(
        data.code === "SITE_NOT_CONFIGURED" ? CONFIG_ERROR : GENERIC_ERROR,
      );
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label htmlFor="site-password">Password</label>
      <input
        id="site-password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <p className={styles.error} role="status" aria-live="polite">
        {error ?? ""}
      </p>
      <button type="submit" disabled={pending}>
        {pending ? "Checking" : "Continue"}
      </button>
    </form>
  );
}