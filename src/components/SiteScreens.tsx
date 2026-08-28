import type { DemoMessage } from "@/data/types";
import type { ComputerBeat, SiteKind } from "@/data/screens";
import { ArtifactCard } from "./ArtifactCard";

const SITE_LABELS: Record<SiteKind, string> = {
  "azure-devops": "Azure DevOps",
  github: "GitHub",
  repository: "Repository",
  figma: "Figma",
  browser: "Browser",
  review: "Review",
};

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  return (
    <div className="site site-workspace" data-site={beat.site}>
      <header>
        <strong>{SITE_LABELS[beat.site]}</strong>
        <span>{account} · illustrative</span>
        <em>{sent ? "Reviewed" : beat.site === "review" ? "Draft" : "Open"}</em>
      </header>
      <div className="site-workspace-title">
        <p>{beat.site === "review" ? "Artifact" : "Agent computer"}</p>
        <h3>{beat.title}</h3>
      </div>
      {beat.site === "review" && artifact ? (
        <ArtifactCard artifact={artifact} />
      ) : (
        <ul className="site-workspace-rows">
          {beat.rows.map((row) => (
            <li key={`${row.label}-${row.value}`} data-state={row.state}>
              <i aria-hidden />
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
