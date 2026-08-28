import type {
  FleetAgent,
  FleetAgentId,
  LeaveBehindContent,
} from "@/content/types";

export interface FleetState {
  readonly selectedAgentId: FleetAgentId;
}

export type FleetEvent =
  | { readonly type: "SELECT"; readonly id: FleetAgentId }
  | {
      readonly type: "MOVE";
      readonly direction: "next" | "previous" | "first" | "last";
      readonly agentIds: readonly FleetAgentId[];
    };

export function createInitialFleetState(
  fleet: LeaveBehindContent["fleet"],
): FleetState {
  return { selectedAgentId: fleet.initialAgentId };
}

export function fleetReducer(
  state: FleetState,
  event: FleetEvent,
): FleetState {
  if (event.type === "SELECT") {
    return { selectedAgentId: event.id };
  }

  const currentIndex = event.agentIds.indexOf(state.selectedAgentId);
  if (currentIndex < 0 || event.agentIds.length === 0) {
    return state;
  }

  if (event.direction === "first") {
    return { selectedAgentId: event.agentIds[0]! };
  }
  if (event.direction === "last") {
    return { selectedAgentId: event.agentIds.at(-1)! };
  }

  const offset = event.direction === "next" ? 1 : -1;
  const nextIndex =
    (currentIndex + offset + event.agentIds.length) % event.agentIds.length;
  return { selectedAgentId: event.agentIds[nextIndex]! };
}

export function getFleetAgent(
  fleet: LeaveBehindContent["fleet"],
  id: FleetAgentId,
): FleetAgent {
  const agent = fleet.agents.find((item) => item.id === id);
  if (!agent) {
    throw new Error("Unknown fleet agent");
  }
  return agent;
}
