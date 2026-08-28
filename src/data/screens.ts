import type { JobId } from "./types";

export type SiteKind =
  | "azure-devops"
  | "github"
  | "repository"
  | "figma"
  | "browser"
  | "review";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerRow = {
  label: string;
  value: string;
  state: "open" | "checked" | "review";
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  tabs: ChromeTab[];
  rows: ComputerRow[];
};

const azureDevOps = {
  id: "azure-devops",
  host: "dev.azure.com",
  label: "Azure DevOps",
};
const github = { id: "github", host: "github.com", label: "GitHub" };
const repository = {
  id: "repository",
  host: "workspace.local",
  label: "Repository",
};
const figma = { id: "figma", host: "figma.com", label: "Figma" };
const browser = { id: "browser", host: "localhost", label: "Browser" };
const review = { id: "review", host: "review.local", label: "Review" };

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "evaluation-scout": {
    m1: {
      pill: "Opening the selected work item",
      host: "dev.azure.com",
      path: "/hrblock/evaluation/workitems/selected",
      title: "Evaluation work item",
      site: "azure-devops",
      tabs: [azureDevOps, github, review],
      rows: [
        { label: "Work item", value: "Selected", state: "checked" },
        { label: "Scope", value: "Bounded", state: "checked" },
        { label: "Changes", value: "None", state: "review" },
      ],
    },
    m2: {
      pill: "Reviewing repository signals",
      host: "github.com",
      path: "/hrblock",
      title: "Repository signals",
      site: "github",
      tabs: [azureDevOps, github, review],
      rows: [
        { label: "Azure DevOps", value: "Current center", state: "checked" },
        { label: "GitHub", value: "4 to 5 repos", state: "checked" },
        { label: "Broader adoption", value: "Planned", state: "open" },
      ],
    },
    m3: {
      pill: "Preparing the evaluation brief",
      host: "review.local",
      path: "/hrblock/evaluation-brief",
      title: "Scoped evaluation brief",
      site: "review",
      tabs: [azureDevOps, github, review],
      rows: [
        { label: "Greenfield", value: "Bounded task", state: "checked" },
        { label: "Brownfield", value: "Bounded task", state: "checked" },
        { label: "Open decisions", value: "Listed", state: "review" },
      ],
    },
    m4: {
      pill: "Brief parked for review",
      host: "review.local",
      path: "/hrblock/evaluation-brief",
      title: "Scoped evaluation brief",
      site: "review",
      tabs: [azureDevOps, github, review],
      rows: [
        { label: "Artifact", value: "Ready to review", state: "checked" },
        { label: "Customer changes", value: "None", state: "checked" },
        { label: "Next step", value: "Team review", state: "review" },
      ],
    },
  },
  "brownfield-agent": {
    m1: {
      pill: "Opening linked code and tests",
      host: "workspace.local",
      path: "/hrblock/repository",
      title: "Existing-code task",
      site: "repository",
      tabs: [azureDevOps, repository, review],
      rows: [
        { label: "Task", value: "Linked", state: "checked" },
        { label: "Repository guide", value: "Reading", state: "open" },
        { label: "Nearby tests", value: "Located", state: "checked" },
      ],
    },
    m2: {
      pill: "Narrowing the candidate patch",
      host: "workspace.local",
      path: "/hrblock/repository/change",
      title: "Candidate patch",
      site: "repository",
      tabs: [azureDevOps, repository, review],
      rows: [
        { label: "Change surface", value: "Smallest patch", state: "checked" },
        { label: "Existing checks", value: "Listed", state: "checked" },
        { label: "Questions", value: "Held for review", state: "review" },
      ],
    },
    m3: {
      pill: "Building the change packet",
      host: "review.local",
      path: "/hrblock/change-packet",
      title: "Brownfield change packet",
      site: "review",
      tabs: [azureDevOps, repository, review],
      rows: [
        { label: "Candidate change", value: "Grouped", state: "checked" },
        { label: "Test plan", value: "Included", state: "checked" },
        { label: "Open questions", value: "Visible", state: "review" },
      ],
    },
    m4: {
      pill: "Packet parked for review",
      host: "review.local",
      path: "/hrblock/change-packet",
      title: "Brownfield change packet",
      site: "review",
      tabs: [azureDevOps, repository, review],
      rows: [
        { label: "Artifact", value: "Ready to review", state: "checked" },
        { label: "Patch applied", value: "No", state: "checked" },
        { label: "Test claims", value: "None", state: "checked" },
      ],
    },
  },
  "figma-builder": {
    m1: {
      pill: "Opening the approved selection",
      host: "figma.com",
      path: "/file/hrblock/approved-selection",
      title: "Approved Figma selection",
      site: "figma",
      tabs: [figma, repository, browser, review],
      rows: [
        { label: "Frame", value: "Selected", state: "checked" },
        { label: "Variants", value: "Inspecting", state: "open" },
        { label: "UI context", value: "Linked", state: "checked" },
      ],
    },
    m2: {
      pill: "Checking responsive and keyboard states",
      host: "localhost",
      path: "/hrblock/preview",
      title: "Interface checks",
      site: "browser",
      tabs: [figma, repository, browser, review],
      rows: [
        { label: "UI system", value: "Mapped", state: "checked" },
        { label: "Responsive", value: "Desktop + mobile", state: "checked" },
        { label: "Keyboard", value: "Review needed", state: "review" },
      ],
    },
    m3: {
      pill: "Preparing the implementation review",
      host: "review.local",
      path: "/hrblock/implementation-review",
      title: "Figma implementation review",
      site: "review",
      tabs: [figma, repository, browser, review],
      rows: [
        { label: "Selection", value: "Recorded", state: "checked" },
        { label: "UI mapping", value: "Included", state: "checked" },
        { label: "Open questions", value: "Visible", state: "review" },
      ],
    },
    m4: {
      pill: "Review parked for the team",
      host: "review.local",
      path: "/hrblock/implementation-review",
      title: "Figma implementation review",
      site: "review",
      tabs: [figma, repository, browser, review],
      rows: [
        { label: "Artifact", value: "Ready to review", state: "checked" },
        { label: "Customer changes", value: "None", state: "checked" },
        { label: "Next step", value: "Team review", state: "review" },
      ],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
