import type { LeaveBehindContent } from "@/content/types";

export const leaveBehind = {
  slug: "hrblock",
  meta: {
    title: "H&R Block x SpaceXAI",
    description:
      "A private H&R Block x SpaceXAI page about a fleet of software agents and their computers.",
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
  navigation: [
    { label: "Fleet", href: "#fleet" },
    { label: "Use cases", href: "#use-cases" },
    { label: "Evaluation", href: "#evaluation" },
  ],
  hero: {
    eyebrow: "Grok Bot for software work",
    title:
      "A fleet of agents keeps software work moving while the H&R Block team focuses elsewhere.",
    body: "Each agent has its own computer. It can read context, work in code, run checks, and leave a clear artifact for review.",
    art: {
      src: "/brand/watercolor-fleet.jpg",
      alt: "Watercolor scene of coordinated computers on a long desk",
    },
  },
  fleet: {
    eyebrow: "Meet the fleet",
    title: "Choose an agent and see its computer.",
    body: "Each example is illustrative. Select an agent to change both the chat and the computer beside it.",
    label: "Illustrative software workflow",
    initialAgentId: "ado-scout",
    agents: [
      {
        id: "ado-scout",
        name: "ADO Scout",
        function: "Find the work and its code context",
        description:
          "Reads a selected Azure DevOps item, follows its links, and opens the repository context.",
        chat: {
          prompt:
            "Read the selected work item and find the code that is most likely affected.",
          status:
            "I found the linked repository, nearby tests, and one requirement that still needs an answer.",
        },
        computer: {
          tab: "Work item",
          path: "ado://work-items/selected",
          rows: [
            { label: "Requirement", value: "Context open", state: "complete" },
            { label: "Repository", value: "Linked", state: "complete" },
            { label: "Open point", value: "Needs review", state: "open" },
          ],
        },
        illustrative: true,
      },
      {
        id: "brownfield-runner",
        name: "Brownfield Runner",
        function: "Work safely in existing code",
        description:
          "Maps an existing code path, makes a small change, and checks the work before review.",
        chat: {
          prompt:
            "Make the smallest safe change in this existing flow and keep the review gate visible.",
          status:
            "The patch is ready to review. Tests are complete, and the architecture question is still open.",
        },
        computer: {
          tab: "Repository",
          path: "web-app/src/existing-flow",
          rows: [
            { label: "Code path", value: "Mapped", state: "complete" },
            { label: "Tests", value: "Complete", state: "complete" },
            { label: "Review gate", value: "Open", state: "open" },
          ],
        },
        illustrative: true,
      },
      {
        id: "greenfield-builder",
        name: "Greenfield Builder",
        function: "Build a new starting point",
        description:
          "Uses a clearly scoped requirement and repository patterns to create code, tests, and setup notes.",
        chat: {
          prompt:
            "Build a reviewable starting point for this scoped service requirement.",
          status:
            "The service files, test, and setup notes are ready. Two product choices remain open.",
        },
        computer: {
          tab: "New service",
          path: "services/new-service",
          rows: [
            { label: "Service shape", value: "Ready", state: "complete" },
            { label: "Test", value: "Ready", state: "complete" },
            { label: "Open choices", value: "Review", state: "open" },
          ],
        },
        illustrative: true,
      },
      {
        id: "figma-builder",
        name: "Figma Builder",
        function: "Carry a selected design into code",
        description:
          "Reads the selected Figma context and implements it with the target UI system.",
        chat: {
          prompt:
            "Use this Figma selection to update the matching flow in the web app.",
          status:
            "The selected states are in code. The responsive and keyboard checks are ready to review.",
        },
        computer: {
          tab: "UI change",
          path: "web-app/src/components/flow",
          rows: [
            { label: "Figma context", value: "Read", state: "complete" },
            { label: "UI states", value: "Built", state: "complete" },
            { label: "Visual review", value: "Open", state: "open" },
          ],
        },
        illustrative: true,
      },
      {
        id: "bugbot-reviewer",
        name: "Bugbot Reviewer",
        function: "Review a change for code risks",
        description:
          "Reads the proposed change, checks likely failure paths, and points to code that needs another look.",
        chat: {
          prompt:
            "Review this proposed change and separate real risks from style preferences.",
          status:
            "I found one behavior risk and one question for the owner. The rest is ready for review.",
        },
        computer: {
          tab: "Review",
          path: "pull-request/illustrative",
          rows: [
            { label: "Change", value: "Read", state: "complete" },
            { label: "Behavior risk", value: "Flagged", state: "active" },
            { label: "Owner question", value: "Open", state: "open" },
          ],
        },
        illustrative: true,
      },
      {
        id: "release-checker",
        name: "Release Checker",
        function: "Check the handoff before release",
        description:
          "Runs the agreed checks and packages the results, open items, and release notes for a person.",
        chat: {
          prompt:
            "Run the release checks and prepare a short handoff with anything that still needs a decision.",
          status:
            "The checks are complete. One environment choice remains before this can move forward.",
        },
        computer: {
          tab: "Release check",
          path: "ci://candidate/latest",
          rows: [
            { label: "Code checks", value: "Complete", state: "complete" },
            { label: "Handoff", value: "Ready", state: "complete" },
            { label: "Environment", value: "Open", state: "open" },
          ],
        },
        illustrative: true,
      },
    ],
  },
  useCases: {
    eyebrow: "Three sample use cases",
    title: "Start with real software work.",
    body: "Each story shows three moments. The last moment is always the artifact a person can review.",
    cards: [
      {
        id: "existing-code",
        number: "01",
        title: "Work in existing code",
        body: "Trace a work item into the code, make a small, safe change, and keep the human gate clear.",
        anchor: "#existing-code",
        illustrative: true,
      },
      {
        id: "new-build",
        number: "02",
        title: "Create a new build",
        body: "Turn a scoped requirement into a tested starting point with open choices called out.",
        anchor: "#new-build",
        illustrative: true,
      },
      {
        id: "figma-to-code",
        number: "03",
        title: "Move from Figma to code",
        body: "Read the selected design, implement the states, and package the result for review.",
        anchor: "#figma-to-code",
        illustrative: true,
      },
    ],
    stories: [
      {
        id: "existing-code",
        number: "01",
        eyebrow: "Existing code",
        title: "Move a small change from context to review.",
        intro:
          "The agent follows the work into the repository, makes the small change, and leaves the decision points visible.",
        agentId: "brownfield-runner",
        frames: [
          {
            kind: "scene",
            number: "01",
            label: "Context gathered",
            description:
              "The work item, code path, and nearby tests are open at the same time.",
            chat: {
              prompt:
                "Read the selected work item and show me which code it touches.",
              status:
                "I found the linked flow, the tests beside it, and one open requirement.",
            },
            computer: {
              tab: "Context",
              path: "ado://work-items/selected",
              rows: [
                { label: "Work item", value: "Open", state: "active" },
                { label: "Code path", value: "Found", state: "complete" },
                { label: "Tests", value: "Found", state: "complete" },
              ],
            },
            illustrative: true,
          },
          {
            kind: "scene",
            number: "02",
            label: "Change checked",
            description:
              "The proposed patch and its checks are visible before the handoff.",
            chat: {
              prompt:
                "Make the smallest safe change and run the checks that cover it.",
              status:
                "The patch is ready. The architecture question remains open for a person.",
            },
            computer: {
              tab: "Repository",
              path: "web-app/src/existing-flow",
              rows: [
                { label: "Patch", value: "Ready", state: "complete" },
                { label: "Tests", value: "Complete", state: "complete" },
                { label: "Review gate", value: "Open", state: "open" },
              ],
            },
            illustrative: true,
          },
          {
            kind: "artifact",
            number: "03",
            label: "Artifact",
            title: "Brownfield change review",
            summary:
              "A review packet that shows the proposed patch and what still needs a person.",
            items: [
              "Files changed",
              "Checks run",
              "Open architecture question",
              "Suggested review order",
            ],
            status: "Illustrative review packet",
            illustrative: true,
          },
        ],
        illustrative: true,
      },
      {
        id: "new-build",
        number: "02",
        eyebrow: "New build",
        title: "Turn a clearly scoped requirement into a working starting point.",
        intro:
          "The agent reads the requirement and nearby patterns before it writes the first service files.",
        agentId: "greenfield-builder",
        frames: [
          {
            kind: "scene",
            number: "01",
            label: "Requirement mapped",
            description:
              "The scope, repository conventions, and open choices are gathered first.",
            chat: {
              prompt:
                "Map this service requirement to the patterns in the selected repository.",
              status:
                "The scope is clear. I found the nearby service pattern and two choices to review.",
            },
            computer: {
              tab: "Requirement",
              path: "requirements/service-brief",
              rows: [
                { label: "Scope", value: "Clear", state: "complete" },
                { label: "Repo pattern", value: "Found", state: "complete" },
                { label: "Open choices", value: "Review", state: "open" },
              ],
            },
            illustrative: true,
          },
          {
            kind: "scene",
            number: "02",
            label: "Starting point built",
            description:
              "The first code, test, and setup notes are ready in one place.",
            chat: {
              prompt:
                "Build the starting point and stop before any production choice.",
              status:
                "The service files, test, and setup notes are ready for team review.",
            },
            computer: {
              tab: "New service",
              path: "services/new-service",
              rows: [
                { label: "Service files", value: "Ready", state: "complete" },
                { label: "Test", value: "Ready", state: "complete" },
                { label: "Production choice", value: "Held", state: "open" },
              ],
            },
            illustrative: true,
          },
          {
            kind: "artifact",
            number: "03",
            label: "Artifact",
            title: "New service starting point",
            summary:
              "A reviewable code base with the setup path and open product choices in plain view.",
            items: [
              "Service structure",
              "First test",
              "Local setup notes",
              "Open product choices",
            ],
            status: "Illustrative starting point",
            illustrative: true,
          },
        ],
        illustrative: true,
      },
      {
        id: "figma-to-code",
        number: "03",
        eyebrow: "Figma to code",
        title: "Carry an approved Figma selection into the web app.",
        intro:
          "The agent reads the selected design states, maps them to the UI system, and checks the result at the required widths.",
        agentId: "figma-builder",
        frames: [
          {
            kind: "scene",
            number: "01",
            label: "Design read",
            description:
              "The selected layout, states, and responsive intent are open beside the target component.",
            chat: {
              prompt:
                "Read this Figma selection and map it to the matching component.",
              status:
                "I found the target component, its tokens, and the states shown in the selection.",
            },
            computer: {
              tab: "Figma context",
              path: "figma://selection/approved-flow",
              rows: [
                { label: "Layout", value: "Read", state: "complete" },
                { label: "States", value: "Read", state: "complete" },
                { label: "Target code", value: "Open", state: "active" },
              ],
            },
            illustrative: true,
          },
          {
            kind: "scene",
            number: "02",
            label: "UI compared",
            description:
              "The implementation and its responsive checks are ready for design review.",
            chat: {
              prompt:
                "Implement the selected states and check the required layouts.",
              status:
                "The selected states are in code. Keyboard and responsive checks are ready.",
            },
            computer: {
              tab: "UI change",
              path: "web-app/src/components/flow",
              rows: [
                { label: "Component", value: "Updated", state: "complete" },
                { label: "Keyboard", value: "Checked", state: "complete" },
                { label: "Design review", value: "Open", state: "open" },
              ],
            },
            illustrative: true,
          },
          {
            kind: "artifact",
            number: "03",
            label: "Artifact",
            title: "Figma implementation review",
            summary:
              "A review packet with the component change, checked states, and visual questions.",
            items: [
              "Component change",
              "Responsive states checked",
              "Keyboard check",
              "Visual review notes",
            ],
            status: "Illustrative implementation packet",
            illustrative: true,
          },
        ],
        illustrative: true,
      },
    ],
  },
  fleetBreak: {
    eyebrow: "Illustrative fleet",
    title: "Each agent owns a focused part of the software work.",
    body: "The fleet can split the work while each computer keeps its own context, files, and checks.",
  },
  evaluation: {
    eyebrow: "A grounded next step",
    title: "Define the first evaluation together.",
    intro: {
      statement:
        "The next useful step is to choose representative work and set the environment, connections, and success criteria with the right technical input.",
      evidence: "account-plan",
    },
    items: [
      {
        id: "work",
        title: "Use greenfield and brownfield work",
        body: "The current intent includes one clearly scoped new build and one clearly scoped task in existing code.",
        evidence: "account-plan",
      },
      {
        id: "source-control",
        title: "Meet the current source-control path",
        body: "Most source-control work is in Azure DevOps today. Four to five repositories are already in GitHub, with broader GitHub adoption planned by year end.",
        evidence: "account-plan",
      },
      {
        id: "context",
        title: "Scope the named connections",
        body: "Figma and Azure DevOps were named as useful context for the first evaluation.",
        evidence: "account-plan",
      },
      {
        id: "environment",
        title: "Set the environment boundary",
        body: "Production versus sandbox still needs input from architecture and security.",
        evidence: "account-plan",
      },
      {
        id: "success",
        title: "Define success before the test",
        body: "Success criteria still need to be defined. This page does not set targets.",
        evidence: "account-plan",
      },
      {
        id: "starting-point",
        title: "Keep the starting products as recommendations",
        body: "Cloud Agents and Bugbot were recommended as starting points. Neither one is an agreed decision yet.",
        evidence: "account-plan",
      },
    ],
  },
  contact: {
    prompt: "Choose the first test",
    name: "Nick Scallion",
    email: "nick.scallion@cursor.com",
    note: "Private H&R Block x SpaceXAI leave-behind.",
  },
} as const satisfies LeaveBehindContent;
