export type LeaveBehindSlug = "hrblock";
export type AccountPlanEvidence = "account-plan";
export type FleetAgentId =
  | "ado-scout"
  | "brownfield-runner"
  | "greenfield-builder"
  | "figma-builder"
  | "bugbot-reviewer"
  | "release-checker";
export type StoryId = "existing-code" | "new-build" | "figma-to-code";

export interface Wordmark {
  readonly src: "/brand/hrblock-wordmark.svg";
  readonly sourceUrl: `https://${string}.hrblock.com/${string}`;
  readonly alt: "H&R Block";
  readonly renderedHeightPx: 16;
  readonly available: boolean;
}

export interface EvidencedClaim {
  readonly statement: string;
  readonly evidence: AccountPlanEvidence;
}

export interface ComputerRow {
  readonly label: string;
  readonly value: string;
  readonly state: "active" | "complete" | "open";
}

export interface ComputerPreview {
  readonly tab: string;
  readonly path: string;
  readonly rows: readonly ComputerRow[];
}

export interface ChatPreview {
  readonly prompt: string;
  readonly status: string;
}

export interface FleetAgent {
  readonly id: FleetAgentId;
  readonly name: string;
  readonly function: string;
  readonly description: string;
  readonly chat: ChatPreview;
  readonly computer: ComputerPreview;
  readonly illustrative: true;
}

export interface WorkflowScene {
  readonly kind: "scene";
  readonly number: "01" | "02";
  readonly label: string;
  readonly description: string;
  readonly chat: ChatPreview;
  readonly computer: ComputerPreview;
  readonly illustrative: true;
}

export interface ArtifactScene {
  readonly kind: "artifact";
  readonly number: "03";
  readonly label: "Artifact";
  readonly title: string;
  readonly summary: string;
  readonly items: readonly string[];
  readonly status: string;
  readonly illustrative: true;
}

export type StoryFrames = readonly [
  WorkflowScene,
  WorkflowScene,
  ArtifactScene,
];

export interface UseCaseStory {
  readonly id: StoryId;
  readonly number: "01" | "02" | "03";
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly agentId: FleetAgentId;
  readonly frames: StoryFrames;
  readonly illustrative: true;
}

export interface UseCaseCard {
  readonly id: StoryId;
  readonly number: "01" | "02" | "03";
  readonly title: string;
  readonly body: string;
  readonly anchor: `#${StoryId}`;
  readonly illustrative: true;
}

export interface EvaluationItem {
  readonly id:
    | "work"
    | "source-control"
    | "context"
    | "environment"
    | "success"
    | "starting-point";
  readonly title: string;
  readonly body: string;
  readonly evidence: AccountPlanEvidence;
}

export interface LeaveBehindContent {
  readonly slug: LeaveBehindSlug;
  readonly meta: {
    readonly title: "H&R Block x SpaceXAI";
    readonly description: string;
  };
  readonly brand: {
    readonly customerName: "H&R Block";
    readonly partnerName: "SpaceXAI";
    readonly lockupLabel: "H&R Block x SpaceXAI";
    readonly partnerMarkSrc: "/brand/spacexai.svg";
    readonly wordmark: Wordmark;
  };
  readonly navigation: readonly {
    readonly label: string;
    readonly href: `#${string}`;
  }[];
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly art: {
      readonly src: "/brand/watercolor-fleet.jpg";
      readonly alt: string;
    };
  };
  readonly fleet: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly label: "Illustrative software workflow";
    readonly initialAgentId: FleetAgentId;
    readonly agents: readonly [
      FleetAgent,
      FleetAgent,
      FleetAgent,
      FleetAgent,
      FleetAgent,
      FleetAgent,
    ];
  };
  readonly useCases: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly cards: readonly [UseCaseCard, UseCaseCard, UseCaseCard];
    readonly stories: readonly [UseCaseStory, UseCaseStory, UseCaseStory];
  };
  readonly fleetBreak: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
  };
  readonly evaluation: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: EvidencedClaim;
    readonly items: readonly EvaluationItem[];
  };
  readonly contact: {
    readonly prompt: string;
    readonly name: "Nick Scallion";
    readonly email: "nick.scallion@cursor.com";
    readonly note: string;
  };
}