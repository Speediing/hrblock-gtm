import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { leaveBehind } from "../src/content/hrblock";
import {
  createInitialWorkbenchState,
  getScenario,
  workbenchReducer,
  workbenchStatusText,
} from "../src/lib/workbench";

const demo = leaveBehind.demo;

describe("workbench reducer", () => {
  it("starts on the existing-code scenario with no revealed steps", () => {
    const state = createInitialWorkbenchState(demo);
    assert.equal(state.scenarioId, "brownfield");
    assert.equal(state.phase, "idle");
    assert.equal(state.visibleStepCount, 0);
    assert.equal(getScenario(demo, state.scenarioId).shortLabel, "Existing code");
  });

  it("runs, pauses, advances, and resets without network state", () => {
    let state = createInitialWorkbenchState(demo);
    state = workbenchReducer(state, { type: "RUN" });
    assert.equal(state.phase, "running");
    assert.equal(state.visibleStepCount, 1);

    state = workbenchReducer(state, { type: "PAUSE" });
    assert.equal(state.phase, "paused");

    state = workbenchReducer(state, { type: "ADVANCE" });
    assert.equal(state.visibleStepCount, 2);
    assert.equal(state.phase, "paused");

    state = workbenchReducer(state, { type: "RESET" });
    assert.equal(state.phase, "idle");
    assert.equal(state.visibleStepCount, 0);
    assert.equal(state.scenarioId, "brownfield");
  });

  it("completes when every step is visible", () => {
    let state = createInitialWorkbenchState(demo);
    for (let index = 0; index < state.stepTotal; index += 1) {
      state = workbenchReducer(state, { type: "ADVANCE" });
    }
    assert.equal(state.visibleStepCount, state.stepTotal);
    assert.equal(state.phase, "complete");
    assert.match(workbenchStatusText(state), /complete/i);
  });

  it("resets the trace when switching scenarios", () => {
    const next = getScenario(demo, "greenfield");
    let state = createInitialWorkbenchState(demo);
    state = workbenchReducer(state, { type: "RUN" });
    state = workbenchReducer(state, {
      type: "SELECT_SCENARIO",
      id: "greenfield",
      stepTotal: next.steps.length,
    });
    assert.equal(state.scenarioId, "greenfield");
    assert.equal(state.phase, "idle");
    assert.equal(state.visibleStepCount, 0);
    assert.equal(state.stepTotal, next.steps.length);
    assert.equal(next.shortLabel, "New build");
  });
});