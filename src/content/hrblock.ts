import type { LeaveBehindContent } from "@/content/types";

export const leaveBehind = {
  slug: "hrblock",
  meta: {
    title: "H&R Block x SpaceXAI",
    description:
      "A private H&R Block x SpaceXAI working page for evaluating agent-assisted software work on real systems.",
  },
  brand: {
    customerName: "H&R Block",
    partnerName: "SpaceXAI",
    lockupLabel: "H&R Block x SpaceXAI",
    partnerMarkSrc: "/brand/spacexai.svg",
    wordmark: {
      src: "/brand/hrblock-wordmark.svg",
      sourceUrl:
        "https://www.hrblock.com/tax-center/media-kit/hr-block-media-kit/",
      alt: "H&R Block",
      renderedHeightPx: 16,
      available: false,
    },
  },
  hero: {
    eyebrow: "H&R Block x SpaceXAI",
    title: "See an agent work through the work",
    body: "Explore how an agent can move from context to a reviewable change across existing systems, new builds, and design-led work.",
  },
  demo: {
    label: "Illustrative agent workflow",
    initialScenarioId: "brownfield",
    scenarios: [
      {
        id: "brownfield",
        shortLabel: "Existing code",
        title: "Move an existing work item toward a safe change",
        prompt:
          "Take an existing work item, locate the affected code, propose a safe change, and prepare it for review.",
        context: [
          "Azure DevOps work item",
          "Existing repository",
          "Team guidance",
        ],
        steps: [
          {
            id: "read",
            kind: "context",
            label: "Read the work item",
            detail: "Collect requirements and linked context.",
          },
          {
            id: "map",
            kind: "reasoning",
            label: "Map the existing code",
            detail: "Identify relevant modules, dependencies, and tests.",
          },
          {
            id: "plan",
            kind: "review",
            label: "Propose the change",
            detail: "Surface the plan and assumptions before editing.",
          },
          {
            id: "verify",
            kind: "action",
            label: "Implement and verify",
            detail: "Prepare a reviewable patch with test evidence.",
          },
          {
            id: "gate",
            kind: "review",
            label: "Pause at the gate",
            detail:
              "Route production-impacting decisions to architecture and security.",
          },
        ],
        output: "Change plan, patch summary, test evidence, and review notes.",
        reviewGate: "Architecture and security review before production use",
      },
      {
        id: "greenfield",
        shortLabel: "New build",
        title: "Turn a scoped requirement into a working starting point",
        prompt:
          "Create a reviewable service starting point that follows the selected repository's conventions.",
        context: [
          "Scoped requirement",
          "Repository conventions",
          "Security guidance",
        ],
        steps: [
          {
            id: "scope",
            kind: "context",
            label: "Clarify the scope",
            detail: "List requirements, assumptions, and open questions.",
          },
          {
            id: "patterns",
            kind: "reasoning",
            label: "Find the patterns",
            detail: "Read nearby services and team guidance before coding.",
          },
          {
            id: "scaffold",
            kind: "action",
            label: "Build the starting point",
            detail: "Create the service shape, tests, and documentation.",
          },
          {
            id: "checks",
            kind: "action",
            label: "Run the checks",
            detail: "Report what passed, what failed, and what remains.",
          },
          {
            id: "handoff",
            kind: "review",
            label: "Prepare the handoff",
            detail: "Package decisions and open items for team review.",
          },
        ],
        output:
          "Implementation plan, initial code, test results, and open decisions.",
        reviewGate: "Team approval before the starting point becomes a baseline",
      },
      {
        id: "design-handoff",
        shortLabel: "Figma to code",
        title: "Carry approved design context into implementation",
        prompt:
          "Use selected Figma context to implement a UI change in the chosen repository.",
        context: ["Figma selection", "UI system", "Target repository"],
        steps: [
          {
            id: "design",
            kind: "context",
            label: "Read the design",
            detail: "Capture layout, content, states, and responsive intent.",
          },
          {
            id: "system",
            kind: "reasoning",
            label: "Map to the UI system",
            detail: "Reuse existing components and tokens where possible.",
          },
          {
            id: "implementation",
            kind: "action",
            label: "Implement the change",
            detail: "Build the selected flow with accessible interactions.",
          },
          {
            id: "compare",
            kind: "action",
            label: "Check the result",
            detail: "Review key viewports and interaction states.",
          },
          {
            id: "review",
            kind: "review",
            label: "Package for review",
            detail: "Share the change, checks, and remaining questions.",
          },
        ],
        output: "Component change, responsive checks, and implementation notes.",
        reviewGate: "Design and engineering review before merge",
      },
    ],
  },
  opportunity: {
    number: "01",
    kicker: "Opportunity",
    title: "Where this can help first",
    intro: {
      statement:
        "The first test should use real greenfield and brownfield work, not a canned demo, and it should meet the current stack as well as the source-control path already underway.",
      evidence: "account-plan",
    },
    items: [
      {
        id: "brownfield",
        number: "01",
        title: "Work safely in existing systems",
        body: "Start with a real brownfield task. The agent should show what it read, what it would change, and where a person still has to approve.",
        signals: ["Existing code", "Tests", "Reviewable change"],
        evidence: "account-plan",
      },
      {
        id: "greenfield",
        number: "02",
        title: "Explore a greenfield build",
        body: "Pick one bounded new-build requirement. Use it to see how the agent plans, scaffolds, checks its work, and hands off decisions.",
        signals: ["New service", "Team patterns", "Open decisions"],
        evidence: "account-plan",
      },
      {
        id: "connected-context",
        number: "03",
        title: "Bring work and design context closer",
        body: "Azure DevOps and Figma are already part of how work is described. The evaluation should use that context in the workflow instead of pasting it into a separate prompt.",
        signals: ["Azure DevOps", "Figma", "Repository context"],
        evidence: "account-plan",
      },
      {
        id: "source-control",
        number: "04",
        title: "Meet the source-control landscape",
        body: "Azure DevOps is the center of gravity today. Four to five repositories are already on GitHub, with a broader GitHub move planned by the end of the year.",
        signals: ["Azure DevOps today", "GitHub path", "Incremental rollout"],
        evidence: "account-plan",
      },
    ],
  },
  evaluation: {
    number: "02",
    kicker: "Evaluation",
    title: "Decisions to make before a real test",
    intro: {
      statement:
        "Success criteria are not yet defined. Agree on the work, the environment, and the connections before the evaluation window starts.",
      evidence: "account-plan",
    },
    items: [
      {
        id: "work",
        title: "Choose representative work",
        body: "Select one bounded greenfield task and one bounded brownfield task that matter to the teams evaluating the workflow.",
        evidence: "account-plan",
      },
      {
        id: "environment",
        title: "Choose the environment",
        body: "Decide what belongs in a sandbox and what could reach production, with architecture and security input.",
        evidence: "account-plan",
      },
      {
        id: "connections",
        title: "Confirm the connections",
        body: "Define the initial Azure DevOps and Figma integration scope, then account for the existing and planned GitHub footprint.",
        evidence: "account-plan",
      },
      {
        id: "success",
        title: "Define success together",
        body: "Success criteria are still to be defined. Agree on them before the evaluation begins. No targets are set on this page.",
        evidence: "account-plan",
      },
    ],
  },
  contact: {
    prompt: "Continue the working session",
    name: "Nick Scallion",
    email: "nick.scallion@cursor.com",
    note: "Shared privately with H&R Block.",
  },
} as const satisfies LeaveBehindContent;