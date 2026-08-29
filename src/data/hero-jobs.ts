export type HeroJobIcon =
  | "evaluation"
  | "triage"
  | "brownfield"
  | "figma"
  | "review"
  | "release"
  | "migration"
  | "architecture";

export type HeroJobThread = {
  readonly id: string;
  readonly name: string;
  readonly icon: HeroJobIcon;
  readonly context: string;
  readonly signal: string;
  readonly routine: string;
  readonly work: string;
  readonly result: string;
  readonly user: string;
  readonly bot: string;
  readonly illustrative: true;
};

export type HeroJobs = readonly [
  HeroJobThread,
  HeroJobThread,
  HeroJobThread,
  HeroJobThread,
  HeroJobThread,
  HeroJobThread,
  HeroJobThread,
  HeroJobThread,
];

export const HERO_JOBS = [
  {
    id: "evaluation-scout",
    name: "Evaluation Scout",
    icon: "evaluation",
    context: "H&R Block evaluation",
    signal: "Bounded greenfield and brownfield work",
    routine:
      "When scoped evaluation work is selected, read the linked context and list the open decisions.",
    work:
      "I can gather the selected Azure DevOps context, repository signals, and review gates without changing a customer system.",
    result: "Illustrative artifact: scoped evaluation brief",
    user: "keep the scope small and show what is still open",
    bot: "the illustrative brief is ready for review. no customer system changed.",
    illustrative: true,
  },
  {
    id: "work-item-triage",
    name: "Work Item Triage",
    icon: "triage",
    context: "Azure DevOps",
    signal: "Scoped work item selected",
    routine:
      "Watch for a selected work item, then separate known inputs from questions.",
    work:
      "I can organize the request, linked design context, repository location, and missing acceptance checks for team review.",
    result: "Illustrative artifact: work item intake note",
    user: "separate the known inputs from the open questions",
    bot: "done. the note keeps every open question visible.",
    illustrative: true,
  },
  {
    id: "brownfield-agent",
    name: "Brownfield Agent",
    icon: "brownfield",
    context: "Existing code",
    signal: "Bounded brownfield task selected",
    routine:
      "Read the linked code and tests before proposing the smallest reviewable change.",
    work:
      "I can trace the affected files, check current tests, and prepare a candidate patch with assumptions called out.",
    result: "Illustrative artifact: brownfield change packet",
    user: "keep the patch small and leave it for review",
    bot: "the candidate patch and checks are packaged. nothing was merged.",
    illustrative: true,
  },
  {
    id: "figma-builder",
    name: "Figma Builder",
    icon: "figma",
    context: "Figma and repository",
    signal: "Approved Figma selection shared",
    routine:
      "Map approved design context to the existing UI system and review states.",
    work:
      "I can match the selected design to current components, then check responsive and keyboard behavior.",
    result: "Illustrative artifact: implementation review",
    user: "show the component mapping and the states to check",
    bot: "the illustrative review is ready with open UI questions.",
    illustrative: true,
  },
  {
    id: "bugbot-reviewer",
    name: "Bugbot Reviewer",
    icon: "review",
    context: "Candidate change",
    signal: "Bugbot included as an evaluation option",
    routine:
      "Review a candidate change after checks run and keep findings tied to the code.",
    work:
      "I can sort concrete findings from low-risk notes and leave each item for an engineer to accept or dismiss.",
    result: "Illustrative artifact: review findings packet",
    user: "show only findings that need a decision",
    bot: "the illustrative packet is grouped by decision. no finding was auto-applied.",
    illustrative: true,
  },
  {
    id: "release-checker",
    name: "Release Checker",
    icon: "release",
    context: "Illustrative release",
    signal: "Candidate change reaches release review",
    routine:
      "Collect the required checks and hold unresolved items before release.",
    work:
      "I can gather build, test, accessibility, and owner checks into one reviewable list.",
    result: "Illustrative artifact: release readiness checklist",
    user: "leave any unresolved check open",
    bot: "the illustrative checklist is ready. open checks remain blocked.",
    illustrative: true,
  },
  {
    id: "repo-migration",
    name: "Repo Migration",
    icon: "migration",
    context: "Azure DevOps and GitHub",
    signal: "Broader GitHub adoption planned",
    routine:
      "Compare a selected repository with the target GitHub conventions before any move.",
    work:
      "Four to five repositories are already in GitHub. I can map a selected repository, required checks, and migration questions.",
    result: "Illustrative artifact: repository migration plan",
    user: "make the unknowns clear before any migration",
    bot: "the illustrative plan is ready. no repository was moved.",
    illustrative: true,
  },
  {
    id: "architecture-brief",
    name: "Architecture Brief",
    icon: "architecture",
    context: "Evaluation guardrails",
    signal: "Production versus sandbox needs input",
    routine:
      "Keep architecture, security, and success criteria questions visible during evaluation planning.",
    work:
      "I can organize the production versus sandbox decision, required reviewers, and success criteria that still need definition.",
    result: "Illustrative artifact: architecture question brief",
    user: "do not choose an environment for the team",
    bot: "the illustrative brief records the decision points without making the decision.",
    illustrative: true,
  },
] as const satisfies HeroJobs;
