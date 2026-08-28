import { LeaveBehindPage } from "@/components/leave-behind-page";
import { requireSiteAccess } from "@/lib/require-site-access";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await requireSiteAccess();
  const { leaveBehind } = await import("@/content/hrblock");
  return <LeaveBehindPage content={leaveBehind} />;
}