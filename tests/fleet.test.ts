import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { leaveBehind } from "../src/content/hrblock";
import {
  createInitialFleetState,
  fleetReducer,
  getFleetAgent,
} from "../src/lib/fleet";

const fleet = leaveBehind.fleet;
const agentIds = fleet.agents.map((agent) => agent.id);

describe("fleet reducer", () => {
  it("starts on the configured agent", () => {
    const state = createInitialFleetState(fleet);
    assert.equal(state.selectedAgentId, "ado-scout");
    assert.equal(getFleetAgent(fleet, state.selectedAgentId).name, "ADO Scout");
  });

  it("selects an agent directly", () => {
    const state = fleetReducer(createInitialFleetState(fleet), {
      type: "SELECT",
      id: "figma-builder",
    });
    assert.equal(state.selectedAgentId, "figma-builder");
    assert.equal(getFleetAgent(fleet, state.selectedAgentId).name, "Figma Builder");
  });

  it("moves through the fleet and wraps at both ends", () => {
    const initial = createInitialFleetState(fleet);
    const previous = fleetReducer(initial, {
      type: "MOVE",
      direction: "previous",
      agentIds,
    });
    assert.equal(previous.selectedAgentId, "release-checker");

    const next = fleetReducer(previous, {
      type: "MOVE",
      direction: "next",
      agentIds,
    });
    assert.equal(next.selectedAgentId, "ado-scout");
  });

  it("moves to the first and last agents", () => {
    const selected = fleetReducer(createInitialFleetState(fleet), {
      type: "SELECT",
      id: "bugbot-reviewer",
    });
    const first = fleetReducer(selected, {
      type: "MOVE",
      direction: "first",
      agentIds,
    });
    const last = fleetReducer(first, {
      type: "MOVE",
      direction: "last",
      agentIds,
    });
    assert.equal(first.selectedAgentId, "ado-scout");
    assert.equal(last.selectedAgentId, "release-checker");
  });
});
