export type LeaveBehindSlug = "hrblock";
export type DemoScenarioId = "brownfield" | "greenfield" | "design-handoff";
export type DemoStepKind = "context" | "reasoning" | "action" | "review";
export type AccountPlanEvidence = "account-plan";

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

export interface DemoStep {
  readonly id: string;
  readonly kind: DemoStepKind;
  readonly label: string;
  readonly detail: string;
}

export interface DemoScenario {
  readonly id: DemoScenarioId;
  readonly shortLabel: string;
  readonly title: string;
  readonly prompt: string;
  readonly context: readonly string[];
  readonly steps: readonly DemoStep[];
  readonly output: string;
  readonly reviewGate: string;
}

export interface AgentDemoContent {
  readonly label: "Illustrative agent workflow";
  readonly initialScenarioId: DemoScenarioId;
  readonly scenarios: readonly [DemoScenario, DemoScenario, DemoScenario];
}

export interface UseCaseContent {
  readonly id: string;
  readonly number: `${number}${number}`;
  readonly title: string;
  readonly body: string;
  readonly signals: readonly string[];
  readonly evidence: AccountPlanEvidence;
}

export interface EvaluationItem {
  readonly id: "work" | "environment" | "connections" | "success";
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
  readonly hero: {
    readonly eyebrow: "H&R Block x SpaceXAI";
    readonly title: string;
    readonly body: string;
  };
  readonly demo: AgentDemoContent;
  readonly opportunity: {
    readonly number: "01";
    readonly kicker: string;
    readonly title: string;
    readonly intro: EvidencedClaim;
    readonly items: readonly UseCaseContent[];
  };
  readonly evaluation: {
    readonly number: "02";
    readonly kicker: string;
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