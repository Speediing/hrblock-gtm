"use client";

import {
  useEffect,
  useId,
  useReducer,
  useRef,
  type KeyboardEvent,
} from "react";

import type { AgentDemoContent, DemoScenarioId } from "@/content/types";
import {
  createInitialWorkbenchState,
  getScenario,
  workbenchReducer,
  workbenchStatusText,
} from "@/lib/workbench";

import styles from "./workbench.module.css";

const STEP_MS = 1400;

export function AgentWorkbench(props: { readonly content: AgentDemoContent }) {
  const { content } = props;
  const labelId = useId();
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [state, dispatch] = useReducer(
    workbenchReducer,
    content,
    createInitialWorkbenchState,
  );
  const scenario = getScenario(content, state.scenarioId);
  const visibleSteps = scenario.steps.slice(0, state.visibleStepCount);
  const currentLabel = visibleSteps.at(-1)?.label;
  const status = workbenchStatusText(state, currentLabel);
  const selectedIndex = content.scenarios.findIndex(
    (item) => item.id === state.scenarioId,
  );

  useEffect(() => {
    if (state.phase !== "running") {
      return;
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      dispatch({ type: "PAUSE" });
      return;
    }
    const timer = window.setInterval(() => {
      dispatch({ type: "ADVANCE" });
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [state.phase, state.scenarioId]);

  function selectScenario(id: DemoScenarioId) {
    const next = getScenario(content, id);
    dispatch({ type: "SELECT_SCENARIO", id, stepTotal: next.steps.length });
    window.requestAnimationFrame(() => {
      headingRef.current?.focus();
    });
  }

  function onTabListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = content.scenarios.length - 1;
    let next = selectedIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = selectedIndex === last ? 0 : selectedIndex + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = selectedIndex === 0 ? last : selectedIndex - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    } else {
      return;
    }
    event.preventDefault();
    const nextScenario = content.scenarios[next];
    if (nextScenario) {
      selectScenario(nextScenario.id);
    }
  }

  return (
    <aside
      id="workbench"
      className={styles.device}
      aria-labelledby={labelId}
    >
      <noscript>
        <style>{`[data-workbench-step][hidden]{display:grid!important}`}</style>
      </noscript>
      <p id={labelId} className={styles.label}>
        {content.label}
      </p>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Workflow scenarios"
        onKeyDown={onTabListKeyDown}
      >
        {content.scenarios.map((item, index) => {
          const selected = item.id === state.scenarioId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`scenario-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`scenario-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={selected ? styles.tabActive : styles.tab}
              onClick={() => selectScenario(item.id)}
            >
              {item.shortLabel}
              <span className={styles.srOnly}>
                {`, scenario ${index + 1} of ${content.scenarios.length}`}
              </span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`scenario-panel-${scenario.id}`}
        aria-labelledby={`scenario-tab-${scenario.id}`}
        className={styles.panel}
      >
        <h2
          ref={headingRef}
          id={headingId}
          className={styles.heading}
          tabIndex={-1}
        >
          {scenario.title}
        </h2>
        <p className={styles.prompt}>{scenario.prompt}</p>
        <ul className={styles.chips}>
          {scenario.context.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
        <div className={styles.body}>
          <ol className={styles.trace}>
            {scenario.steps.map((step, index) => {
              const revealed = index < state.visibleStepCount;
              return (
                <li
                  key={step.id}
                  className={revealed ? styles.stepOn : styles.step}
                  data-kind={step.kind}
                  data-workbench-step=""
                  hidden={!revealed}
                >
                  <span className={styles.stepMeta}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{step.kind}</span>
                  </span>
                  <strong>{step.label}</strong>
                  <span>{step.detail}</span>
                </li>
              );
            })}
          </ol>
          <div className={styles.side}>
            <section className={styles.artifact} aria-label="Artifact summary">
              <p className={styles.sideKicker}>Artifact summary</p>
              <p>{scenario.output}</p>
            </section>
            <section className={styles.gate} aria-label="Human review gate">
              <p className={styles.sideKicker}>Human review gate</p>
              <p>{scenario.reviewGate}</p>
            </section>
          </div>
        </div>
      </div>
      <p className={styles.status} role="status" aria-live="polite">
        {status}
      </p>
      <div className={`${styles.controls} workbench-controls`}>
        <button
          type="button"
          disabled={state.phase === "running" || state.phase === "complete"}
          onClick={() => dispatch({ type: "RUN" })}
        >
          Run
        </button>
        <button
          type="button"
          disabled={state.phase !== "running"}
          onClick={() => dispatch({ type: "PAUSE" })}
        >
          Pause
        </button>
        <button
          type="button"
          disabled={state.phase === "complete"}
          onClick={() => dispatch({ type: "ADVANCE" })}
        >
          Next
        </button>
        <button type="button" onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>
      </div>
    </aside>
  );
}