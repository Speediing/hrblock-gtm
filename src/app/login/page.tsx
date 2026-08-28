import { redirect } from "next/navigation";

import { BrandLockup } from "@/components/brand-lockup";
import { LoginForm } from "@/components/login-form";
import { leaveBehind } from "@/content/hrblock";
import { hasSiteAccess } from "@/lib/require-site-access";

import styles from "./login.module.css";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await hasSiteAccess()) {
    redirect("/");
  }

  return (
    <main className={styles.shell}>
      <section className={styles.card} aria-labelledby="login-title">
        <BrandLockup brand={leaveBehind.brand} priority />
        <p className="kicker">{leaveBehind.meta.title}</p>
        <h1 id="login-title">Enter the site password</h1>
        <LoginForm />
      </section>
    </main>
  );
}