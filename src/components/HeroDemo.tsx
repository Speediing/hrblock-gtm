"use client";

import { useEffect, useState } from "react";

import { HERO_JOBS, type HeroJobIcon } from "@/data/hero-jobs";

type PlaybackStage = 0 | 1 | 2 | 3;

const PLAYBACK_DELAYS = [
  { delay: 450, stage: 1 },
  { delay: 1_300, stage: 2 },
  { delay: 2_400, stage: 3 },
] as const satisfies ReadonlyArray<{
  delay: number;
  stage: PlaybackStage;
}>;

function JobIcon({ kind }: { kind: HeroJobIcon }) {
  switch (kind) {
    case "evaluation":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "triage":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 5.5h12v13H6z" stroke="currentColor" strokeWidth="1.7" />
          <path d="m8.5 10 1.5 1.5 3-3M8.5 15h7" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "brownfield":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m9 7-5 5 5 5M15 7l5 5-5 5M13.5 4 10.5 20" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 3.5h4v8H8a4 4 0 0 1 0-8ZM12 3.5h4a4 4 0 0 1 0 8h-4v-8ZM8 11.5h4v4a4 4 0 1 1-4-4ZM12 11.5h4a4 4 0 1 1-4 0Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "review":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3.5 19 6v5.2c0 4.2-2.8 7.5-7 9.3-4.2-1.8-7-5.1-7-9.3V6l7-2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="m8.8 11.8 2.1 2.1 4.4-4.5" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "release":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17 17 7M10 7h7v7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M6 10.5H4.5v9h9V18" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "migration":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 8h12l-3-3M19 16H7l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "architecture":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 4.5c.65 4.15 2.85 6.35 7 7-4.15.65-6.35 2.85-7 7-.65-4.15-2.85-6.35-7-7 4.15-.65 6.35-2.85 7-7Z" fill="currentColor" />
        </svg>
      );
  }
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m14.5 6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="11" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function MicrophoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="3.5" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3M9 20h6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function stageLabel(stage: PlaybackStage) {
  if (stage === 0) return "Reading context";
  if (stage === 1) return "Reviewing request";
  if (stage === 2) return "Writing response";
  return "Artifact ready";
}

export function HeroDemo() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playbackRun, setPlaybackRun] = useState(0);
  const [stage, setStage] = useState<PlaybackStage>(0);
  const job = HERO_JOBS[selectedIndex] ?? HERO_JOBS[0];

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers: number[] = [];

    if (motion.matches) {
      timers.push(window.setTimeout(() => setStage(3), 0));
    } else {
      for (const frame of PLAYBACK_DELAYS) {
        timers.push(window.setTimeout(() => setStage(frame.stage), frame.delay));
      }
    }

    const finishPlayback = (event: MediaQueryListEvent) => {
      if (event.matches) setStage(3);
    };

    motion.addEventListener("change", finishPlayback);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      motion.removeEventListener("change", finishPlayback);
    };
  }, [playbackRun]);

  const chooseJob = (index: number) => {
    setSelectedIndex(index);
    setStage(0);
    setPlaybackRun((run) => run + 1);
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">An illustrative software fleet for H&amp;R Block</p>
        <h1 id="hero-title">Agents that keep software work moving.</h1>
        <p className="hero-intro">
          Grok Bot can open selected work, use approved context, and leave an artifact for review. These examples are illustrative and do not show work already completed at H&amp;R Block.
        </p>
        <div className="hero-phone-jobs" aria-label="Choose a Grok Bot job">
          {HERO_JOBS.map((item, index) => {
            const selected = index === selectedIndex;
            return (
              <button
                className={selected ? "is-active" : undefined}
                type="button"
                aria-pressed={selected}
                aria-controls="hero-phone-thread"
                onClick={() => chooseJob(index)}
                key={item.id}
              >
                {selected ? (
                  <span aria-hidden="true">
                    <JobIcon kind={item.icon} />
                  </span>
                ) : null}
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <aside className="hero-bot-demo" aria-label="Illustrative Grok Bot phone demo">
        <div className="hero-phone" data-stage={stage}>
          <div className="hero-phone-notch notch" aria-hidden="true" />
          <header className="hero-phone-header header">
            <span className="hero-phone-back" aria-hidden="true">
              <BackIcon />
            </span>
            <span className="hero-phone-agent" aria-hidden="true">
              <JobIcon kind={job.icon} />
            </span>
            <p>
              <strong>{job.name}</strong>
              <small role="status">
                <span aria-hidden="true" />
                {stageLabel(stage)}
              </small>
            </p>
            <span className="hero-phone-desktop" aria-hidden="true">
              <DesktopIcon />
            </span>
          </header>

          <div
            className="hero-phone-thread thread"
            id="hero-phone-thread"
            role="log"
            aria-live="polite"
            aria-label={`${job.name} illustrative thread`}
            key={`${job.id}-${playbackRun}`}
          >
            <article className="hero-phone-work">
              <p className="hero-phone-work-label">
                <span aria-hidden="true" />
                Illustrative routine
              </p>
              <p className="hero-phone-routine">{job.routine}</p>
              <p className="hero-phone-work-meta">
                <span>Context</span>
                {job.context}
              </p>
              <p className="hero-phone-work-meta">
                <span>Signal</span>
                {job.signal}
              </p>
              <p className="hero-phone-work-copy">{job.work}</p>
              <span
                className="hero-phone-progress"
                role="progressbar"
                aria-label="Illustrative routine progress"
                aria-valuemin={0}
                aria-valuemax={3}
                aria-valuenow={stage}
              >
                <i aria-hidden="true" />
              </span>
              <strong className={stage === 3 ? "is-visible" : undefined} aria-hidden={stage !== 3}>
                {job.result}
              </strong>
            </article>

            <p
              className={`hero-phone-message is-user${stage >= 1 ? " is-visible" : ""}`}
              aria-hidden={stage < 1}
            >
              {job.user}
            </p>

            {stage === 2 ? (
              <span className="hero-phone-message is-bot is-typing" aria-label={`${job.name} is typing`}>
                <i />
                <i />
                <i />
              </span>
            ) : null}

            <p
              className={`hero-phone-message is-bot${stage === 3 ? " is-visible" : ""}`}
              aria-hidden={stage !== 3}
            >
              {job.bot}
            </p>
          </div>

          <footer className="hero-phone-composer composer">
            <span aria-hidden="true">
              <PlusIcon />
            </span>
            <p>Message {job.name}</p>
            <span aria-hidden="true">
              <MicrophoneIcon />
            </span>
          </footer>
        </div>
      </aside>
    </section>
  );
}
