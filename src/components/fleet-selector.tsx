"use client";

import { useReducer, useRef, type KeyboardEvent } from "react";

import { ChatSurface, SoftwareComputer } from "@/components/software-preview";
import type { FleetAgentId, LeaveBehindContent } from "@/content/types";
import {
  createInitialFleetState,
  fleetReducer,
  getFleetAgent,
  type FleetEvent,
} from "@/lib/fleet";

import styles from "./leave-behind.module.css";

export function FleetSelector(props: {
  readonly content: LeaveBehindContent["fleet"];
}) {
  const { content } = props;
  const [state, dispatch] = useReducer(
    fleetReducer,
    content,
    createInitialFleetState,
  );
  const tabs = useRef(new Map<FleetAgentId, HTMLButtonElement>());
  const agentIds = content.agents.map((agent) => agent.id);
  const selectedAgent = getFleetAgent(content, state.selectedAgentId);

  function selectAgent(id: FleetAgentId) {
    dispatch({ type: "SELECT", id });
  }

  function moveSelection(
    event: KeyboardEvent<HTMLButtonElement>,
    direction: Extract<FleetEvent, { type: "MOVE" }>["direction"],
  ) {
    event.preventDefault();
    const action = { type: "MOVE", direction, agentIds } as const;
    const nextState = fleetReducer(state, action);
    dispatch(action);
    tabs.current.get(nextState.selectedAgentId)?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      moveSelection(event, "next");
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      moveSelection(event, "previous");
    } else if (event.key === "Home") {
      moveSelection(event, "first");
    } else if (event.key === "End") {
      moveSelection(event, "last");
    }
  }

  return (
    <div id="fleet" className={styles.fleetSelector}>
      <div className={styles.fleetHeading}>
        <div>
          <p className="kicker">{content.eyebrow}</p>
          <h2>{content.title}</h2>
        </div>
        <p>{content.body}</p>
      </div>
      <div
        className={styles.fleetTabs}
        role="tablist"
        aria-label="Illustrative software agents"
      >
        {content.agents.map((agent) => {
          const selected = agent.id === state.selectedAgentId;
          return (
            <button
              key={agent.id}
              ref={(node) => {
                if (node) {
                  tabs.current.set(agent.id, node);
                } else {
                  tabs.current.delete(agent.id);
                }
              }}
              type="button"
              role="tab"
              id={`fleet-tab-${agent.id}`}
              aria-selected={selected}
              aria-controls="fleet-panel"
              tabIndex={selected ? 0 : -1}
              className={selected ? styles.fleetTabActive : styles.fleetTab}
              onClick={() => selectAgent(agent.id)}
              onKeyDown={onTabKeyDown}
            >
              {agent.name}
            </button>
          );
        })}
      </div>
      <div
        key={selectedAgent.id}
        id="fleet-panel"
        className={styles.fleetPanel}
        role="tabpanel"
        aria-labelledby={`fleet-tab-${selectedAgent.id}`}
      >
        <div className={styles.fleetDescription}>
          <p>{content.label}</p>
          <h3>{selectedAgent.function}</h3>
          <span>{selectedAgent.description}</span>
        </div>
        <div className={styles.fleetPreview}>
          <div className={styles.phoneWrap}>
            <p className={styles.previewLabel}>Chat</p>
            <ChatSurface
              agentName={selectedAgent.name}
              chat={selectedAgent.chat}
              phone
            />
          </div>
          <div className={styles.computerWrap}>
            <p className={styles.previewLabel}>Computer</p>
            <SoftwareComputer computer={selectedAgent.computer} />
          </div>
        </div>
      </div>
    </div>
  );
}
