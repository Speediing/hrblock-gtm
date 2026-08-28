import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  computer: "Own computer";
  jobId?: JobId;
  mark?: string;
  lead?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "evaluation-scout",
    name: "Evaluation Scout",
    blurb: "Opens selected work context and prepares a bounded evaluation brief.",
    color: "#14aa40",
    computer: "Own computer",
    jobId: "evaluation-scout",
    lead: true,
  },
  {
    id: "brownfield-agent",
    name: "Brownfield Agent",
    blurb: "Reads linked code and tests before preparing a small candidate patch.",
    color: "#08752e",
    computer: "Own computer",
    jobId: "brownfield-agent",
  },
  {
    id: "figma-builder",
    name: "Figma Builder",
    blurb: "Maps an approved Figma selection to the existing UI system.",
    color: "#6f8f75",
    computer: "Own computer",
    jobId: "figma-builder",
  },
  {
    id: "bugbot-reviewer",
    name: "Bugbot Reviewer",
    blurb: "Reviews a proposed change and leaves findings for the team.",
    color: "#4e7858",
    computer: "Own computer",
  },
  {
    id: "release-checker",
    name: "Release Checker",
    blurb: "Collects release checks and holds open items for review.",
    color: "#9ab69f",
    computer: "Own computer",
  },
];
