import type {
  AgentDemoContent,
  DemoScenario,
  DemoScenarioId,
} from "@/content/types";

export interface WorkbenchState {
  readonly scenarioId: DemoScenarioId;
  readonly phase: "idle" | "running" | "paused" | "complete";
  readonly visibleStepCount: number;
  readonly stepTotal: number;
}

export type WorkbenchEvent =
  | {
      readonly type: "SELECT_SCENARIO";
      readonly id: DemoScenarioId;
      readonly stepTotal: number;
    }
  | { readonly type: "RUN" }
  | { readonly type: "PAUSE" }
  | { readonly type: "ADVANCE" }
  | { readonly type: "RESET" };

export function getScenario(
  content: AgentDemoContent,
  id: DemoScenarioId,
): DemoScenario {
  const scenario = content.scenarios.find((item) => item.id === id);
  if (!scenario) {
    throw new Error("Unknown scenario");
  }
  return scenario;
}

export function createInitialWorkbenchState(
  content: AgentDemoContent,
): WorkbenchState {
  const scenario = getScenario(content, content.initialScenarioId);
  return {
    scenarioId: scenario.id,
    phase: "idle",
    visibleStepCount: 0,
    stepTotal: scenario.steps.length,
  };
}

export function workbenchReducer(
  state: WorkbenchState,
  event: WorkbenchEvent,
): WorkbenchState {
  switch (event.type) {
    case "SELECT_SCENARIO":
      return {
        scenarioId: event.id,
        phase: "idle",
        visibleStepCount: 0,
        stepTotal: event.stepTotal,
      };
    case "RUN": {
      if (state.phase === "complete") {
        return state;
      }
      if (state.visibleStepCount === 0 && state.stepTotal > 0) {
        const visibleStepCount = 1;
        return {
          ...state,
          visibleStepCount,
          phase: visibleStepCount >= state.stepTotal ? "complete" : "running",
        };
      }
      return { ...state, phase: "running" };
    }
    case "PAUSE":
      if (state.phase !== "running") {
        return state;
      }
      return { ...state, phase: "paused" };
    case "ADVANCE": {
      if (state.stepTotal === 0 || state.visibleStepCount >= state.stepTotal) {
        return { ...state, phase: "complete" };
      }
      const visibleStepCount = state.visibleStepCount + 1;
      const complete = visibleStepCount >= state.stepTotal;
      return {
        ...state,
        visibleStepCount,
        phase: complete
          ? "complete"
          : state.phase === "running"
            ? "running"
            : "paused",
      };
    }
    case "RESET":
      return {
        scenarioId: state.scenarioId,
        phase: "idle",
        visibleStepCount: 0,
        stepTotal: state.stepTotal,
      };
    default: {
      const _exhaustive: never = event;
      return _exhaustive;
    }
  }
}

export function workbenchStatusText(
  state: WorkbenchState,
  currentLabel?: string,
): string {
  if (state.phase === "idle") {
    return "Workflow ready. Press Run to reveal steps.";
  }
  if (state.phase === "complete") {
    return "Workflow complete. Ready for human review.";
  }
  const step = `${state.visibleStepCount} of ${state.stepTotal}`;
  if (state.phase === "paused") {
    return currentLabel
      ? `Paused at step ${step}: ${currentLabel}.`
      : `Paused at step ${step}.`;
  }
  return currentLabel
    ? `Step ${step}: ${currentLabel}.`
    : `Step ${step} in progress.`;
}