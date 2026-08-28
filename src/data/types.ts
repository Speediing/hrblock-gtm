export type JobId =
  | "evaluation-scout"
  | "brownfield-agent"
  | "figma-builder";

export type ParticipantRole = "you" | "bot";

export type Participant = {
  id: string;
  name: string;
  role: ParticipantRole;
  persona?: string;
  color?: string;
};

export type MessageKind = "text" | "draft" | "routine" | "handoff" | "system";
export type SlideVoice = "them" | "us";

export type SlideCard = {
  n: number;
  title: string;
  body: string;
  kicker?: string;
  voice?: SlideVoice;
};

export type StoryScene =
  | "call"
  | "demo"
  | "voice"
  | "notes"
  | "deck"
  | "map"
  | "inspect"
  | "launch"
  | "drill"
  | "send";

export type StoryVisual = {
  kind: "software";
  app: "Azure DevOps" | "GitHub" | "Repository" | "Figma" | "Browser";
  title: string;
  status: string;
  rows: {
    label: string;
    value: string;
    state: "open" | "checked" | "review";
  }[];
};

export type Artifact =
  | {
      kind: "slides";
      title: string;
      cards: SlideCard[];
    }
  | {
      kind: "one-pager";
      title: string;
      eyebrow?: string;
      sections: { heading: string; body: string }[];
    }
  | {
      kind: "packet";
      title: string;
      fields: { label: string; value: string }[];
    };

export type StoryBeat = {
  label: string;
  scene: StoryScene;
  when?: string;
  slides?: SlideCard[];
  artifact?: Artifact;
  visual?: StoryVisual;
};

export type DemoMessage = {
  id: string;
  from: string;
  kind: MessageKind;
  body?: string;
  draftLabel?: string;
  artifact?: Artifact;
  delayMs?: number;
};

export type DemoThread = {
  title: string;
  subtitle: string;
  illustrative: true;
  participants: Participant[];
  messages: DemoMessage[];
};

export type CroJob = {
  id: JobId;
  number: number;
  agent: string;
  illustrative: true;
  title: string;
  trigger: string;
  backgroundAction: string;
  problem: string;
  botJob: string;
  storyboard: StoryBeat[];
  unlock: string;
  summary: string;
  demo: DemoThread;
};

export type Quote = {
  name: string;
  handle: string;
  date: string;
  avatar: string;
  quote: string;
  source: string;
};
