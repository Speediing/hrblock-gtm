import type { Artifact, CroJob } from "./types";

const EVALUATION_BRIEF = {
  kind: "one-pager",
  eyebrow: "Illustrative artifact",
  title: "Scoped evaluation brief",
  sections: [
    {
      heading: "Work",
      body: "Select one bounded greenfield task and one bounded brownfield task.",
    },
    {
      heading: "Source control",
      body: "Most engineering work is in Azure DevOps today. Four to five repositories are already in GitHub, with broader adoption planned by year end.",
    },
    {
      heading: "Context",
      body: "Use the selected Azure DevOps work item, linked repository context, and approved Figma context when relevant.",
    },
    {
      heading: "Environment",
      body: "Production versus sandbox still needs architecture and security input.",
    },
    {
      heading: "Success",
      body: "Success criteria still need to be defined before the evaluation starts.",
    },
    {
      heading: "Starting point",
      body: "Cloud Agents and Bugbot are recommendations for the evaluation, not agreed decisions.",
    },
  ],
} satisfies Extract<Artifact, { kind: "one-pager" }>;

const CHANGE_PACKET = {
  kind: "packet",
  title: "Brownfield change packet",
  fields: [
    {
      label: "Scope",
      value: "Prepare the smallest reviewable patch for the selected existing-code task.",
    },
    {
      label: "Code context",
      value: "Read the linked code, nearby tests, and repository guidance before editing.",
    },
    {
      label: "Checks",
      value: "List the existing checks that should run. Do not claim a result until they run.",
    },
    {
      label: "Review",
      value: "Leave the candidate change, affected files, test plan, and open questions together.",
    },
  ],
} satisfies Extract<Artifact, { kind: "packet" }>;

const IMPLEMENTATION_REVIEW = {
  kind: "one-pager",
  eyebrow: "Illustrative artifact",
  title: "Figma implementation review",
  sections: [
    {
      heading: "Selection",
      body: "Record the approved Figma frame and the UI states included in the task.",
    },
    {
      heading: "UI mapping",
      body: "Map the selection to the existing component and style system before adding new patterns.",
    },
    {
      heading: "Responsive states",
      body: "Review desktop and mobile layouts for the selected interface.",
    },
    {
      heading: "Keyboard states",
      body: "Review focus order, visible focus, and keyboard operation.",
    },
    {
      heading: "Review",
      body: "Leave the implementation notes and open questions with the candidate change.",
    },
  ],
} satisfies Extract<Artifact, { kind: "one-pager" }>;

export const JOBS: CroJob[] = [
  {
    id: "evaluation-scout",
    number: 1,
    agent: "Evaluation Scout",
    illustrative: true,
    title: "Scope the evaluation before work starts",
    trigger: "A scoped Azure DevOps work item is selected",
    backgroundAction: "Opening work context and repository signals",
    problem:
      "An evaluation needs a small, reviewable scope. The work, environment, and success criteria should be clear before an agent starts.",
    botJob:
      "Evaluation Scout opens the selected work item and related repository signals, then prepares a brief for review.",
    storyboard: [
      {
        when: "Scene 01",
        label: "A scoped Azure DevOps work item becomes the starting point.",
        scene: "inspect",
        visual: {
          kind: "software",
          app: "Azure DevOps",
          title: "Evaluation work item",
          status: "Selected",
          rows: [
            { label: "Scope", value: "Bounded task", state: "checked" },
            { label: "Context", value: "Work item linked", state: "open" },
            { label: "Changes", value: "None yet", state: "review" },
          ],
        },
      },
      {
        when: "Scene 02",
        label: "The agent opens source-control context and records what is still unknown.",
        scene: "notes",
        visual: {
          kind: "software",
          app: "GitHub",
          title: "Repository signals",
          status: "Reviewing",
          rows: [
            { label: "Azure DevOps", value: "Current center", state: "checked" },
            { label: "GitHub", value: "4 to 5 repos", state: "checked" },
            { label: "Environment", value: "Decision needed", state: "review" },
          ],
        },
      },
      {
        when: "Artifact",
        label: "A scoped evaluation brief is ready for team review.",
        scene: "send",
        artifact: EVALUATION_BRIEF,
      },
    ],
    unlock:
      "The team gets one place to review scope, source control, environment questions, and success criteria.",
    summary: "The last frame is a scoped evaluation brief for review.",
    demo: {
      title: "Evaluation Scout",
      subtitle: "Scoped work item to evaluation brief",
      illustrative: true,
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "scout",
          name: "Evaluation Scout",
          role: "bot",
          persona: "Opens work context and prepares a bounded evaluation brief",
          color: "#14aa40",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "scout",
          kind: "routine",
          body: "Illustrative workflow. A scoped Azure DevOps work item was selected. I am opening the work context and linked repository signals.",
        },
        {
          id: "m2",
          from: "scout",
          kind: "text",
          body: "The evaluation should include one bounded greenfield task and one bounded brownfield task. Production versus sandbox and success criteria still need decisions.",
        },
        {
          id: "m3",
          from: "scout",
          kind: "draft",
          draftLabel: "Evaluation brief",
          artifact: EVALUATION_BRIEF,
        },
        {
          id: "m4",
          from: "scout",
          kind: "system",
          body: "Illustrative only. No customer system was changed.",
        },
      ],
    },
  },
  {
    id: "brownfield-agent",
    number: 2,
    agent: "Brownfield Agent",
    illustrative: true,
    title: "Prepare the smallest reviewable code change",
    trigger: "An existing-code task is selected",
    backgroundAction: "Reading linked code and nearby tests",
    problem:
      "Existing code carries local rules and test expectations. A useful first change should stay small and make its review path clear.",
    botJob:
      "Brownfield Agent reads the linked code and tests, prepares the smallest candidate patch, and leaves a change packet.",
    storyboard: [
      {
        when: "Scene 01",
        label: "The selected task points the agent to existing code and tests.",
        scene: "inspect",
        visual: {
          kind: "software",
          app: "Repository",
          title: "Existing-code task",
          status: "Context open",
          rows: [
            { label: "Task", value: "Linked", state: "checked" },
            { label: "Code", value: "Reading", state: "open" },
            { label: "Tests", value: "Nearby suite", state: "open" },
          ],
        },
      },
      {
        when: "Scene 02",
        label: "The agent narrows the candidate patch and its test plan.",
        scene: "notes",
        visual: {
          kind: "software",
          app: "Repository",
          title: "Candidate patch",
          status: "Reviewing",
          rows: [
            { label: "Change", value: "Smallest patch", state: "checked" },
            { label: "Tests", value: "Plan listed", state: "checked" },
            { label: "Open questions", value: "Held for review", state: "review" },
          ],
        },
      },
      {
        when: "Artifact",
        label: "A change packet groups the candidate patch and review notes.",
        scene: "send",
        artifact: CHANGE_PACKET,
      },
    ],
    unlock:
      "The reviewer sees the candidate change, affected context, test plan, and open questions together.",
    summary: "The last frame is a brownfield change packet for review.",
    demo: {
      title: "Brownfield Agent",
      subtitle: "Existing code to reviewable change packet",
      illustrative: true,
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "brownfield",
          name: "Brownfield Agent",
          role: "bot",
          persona: "Reads local code and tests before preparing a small patch",
          color: "#08752e",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "brownfield",
          kind: "routine",
          body: "Illustrative workflow. An existing-code task was selected. I am opening the linked code, repository guidance, and nearby tests.",
        },
        {
          id: "m2",
          from: "brownfield",
          kind: "text",
          body: "I am keeping the candidate patch small. I will list affected files, the existing checks to run, and any question that needs a reviewer.",
        },
        {
          id: "m3",
          from: "brownfield",
          kind: "draft",
          draftLabel: "Change packet",
          artifact: CHANGE_PACKET,
        },
        {
          id: "m4",
          from: "brownfield",
          kind: "system",
          body: "Illustrative only. No patch was applied and no test result is claimed.",
        },
      ],
    },
  },
  {
    id: "figma-builder",
    number: 3,
    agent: "Figma Builder",
    illustrative: true,
    title: "Map an approved Figma selection to the UI",
    trigger: "An approved Figma selection is shared",
    backgroundAction: "Mapping the selection to the existing UI system",
    problem:
      "A Figma selection still needs code context. The implementation should use the current UI system and account for responsive and keyboard states.",
    botJob:
      "Figma Builder opens the approved selection, maps it to existing UI patterns, and prepares an implementation review.",
    storyboard: [
      {
        when: "Scene 01",
        label: "The approved Figma selection defines the interface to review.",
        scene: "inspect",
        visual: {
          kind: "software",
          app: "Figma",
          title: "Approved selection",
          status: "Shared",
          rows: [
            { label: "Frame", value: "Selected", state: "checked" },
            { label: "Components", value: "Inspecting", state: "open" },
            { label: "Variants", value: "Included states", state: "open" },
          ],
        },
      },
      {
        when: "Scene 02",
        label: "The agent checks UI mapping, responsive states, and keyboard use.",
        scene: "notes",
        visual: {
          kind: "software",
          app: "Browser",
          title: "Interface checks",
          status: "Reviewing",
          rows: [
            { label: "UI system", value: "Mapped", state: "checked" },
            { label: "Responsive", value: "Desktop + mobile", state: "checked" },
            { label: "Keyboard", value: "Focus review", state: "review" },
          ],
        },
      },
      {
        when: "Artifact",
        label: "An implementation review records the mapping and open questions.",
        scene: "send",
        artifact: IMPLEMENTATION_REVIEW,
      },
    ],
    unlock:
      "The reviewer gets the approved selection, UI mapping, interaction checks, and open questions in one artifact.",
    summary: "The last frame is a Figma implementation review.",
    demo: {
      title: "Figma Builder",
      subtitle: "Approved selection to implementation review",
      illustrative: true,
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "figma",
          name: "Figma Builder",
          role: "bot",
          persona: "Maps approved Figma context to the existing UI system",
          color: "#6f8f75",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "figma",
          kind: "routine",
          body: "Illustrative workflow. An approved Figma selection was shared. I am opening the frame, variants, and existing UI context.",
        },
        {
          id: "m2",
          from: "figma",
          kind: "text",
          body: "The selection maps to the current UI system. I am checking desktop, mobile, focus order, and keyboard operation before review.",
        },
        {
          id: "m3",
          from: "figma",
          kind: "draft",
          draftLabel: "Implementation review",
          artifact: IMPLEMENTATION_REVIEW,
        },
        {
          id: "m4",
          from: "figma",
          kind: "system",
          body: "Illustrative only. No customer interface or repository was changed.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
