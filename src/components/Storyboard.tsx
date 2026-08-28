import type { StoryBeat, StoryScene, StoryVisual } from "@/data/types";

function Screen({ scene }: { scene: StoryScene }) {
  if (scene === "inspect" || scene === "demo") {
    return (
      <>
        <rect x="18" y="15" width="48" height="7" rx="1.4" fill="currentColor" opacity="0.18" />
        <rect x="18" y="27" width="34" height="5" rx="1.2" fill="currentColor" opacity="0.38" />
        <rect x="18" y="36" width="42" height="5" rx="1.2" fill="currentColor" opacity="0.2" />
      </>
    );
  }

  if (scene === "notes" || scene === "voice") {
    return (
      <path
        d="M20 18h44M20 26h44M20 34h30M20 42h22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.45"
      />
    );
  }

  return (
    <path
      d="M24 36 60 16 48 42l-6-12z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      opacity="0.45"
    />
  );
}

function Laptop({ scene }: { scene: StoryScene }) {
  return (
    <svg className="story-laptop" viewBox="0 0 88 58" aria-hidden>
      <rect
        x="10"
        y="4"
        width="68"
        height="44"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect x="14" y="8" width="60" height="36" rx="1.2" fill="currentColor" opacity="0.06" />
      <Screen scene={scene} />
      <path
        d="M4 50h80l3 5H1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SoftwareVisual({ visual }: { visual: StoryVisual }) {
  return (
    <div className="story-ui story-software-ui" aria-label={`${visual.app}: ${visual.title}`}>
      <header className="story-ui-bar">
        <span className="story-ui-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <strong>{visual.app}</strong>
        <span>{visual.status}</span>
      </header>
      <div className="story-software-body">
        <h3>{visual.title}</h3>
        <ul>
          {visual.rows.map((row) => (
            <li key={`${row.label}-${row.value}`} data-state={row.state}>
              <i aria-hidden />
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Storyboard({ beats }: { beats: StoryBeat[] }) {
  const hasLiveFlow = beats.some((beat) => beat.visual);

  return (
    <ol className={`storyboard${hasLiveFlow ? " is-live-flow" : ""}`}>
      {beats.map((beat) => (
        <li
          key={`${beat.when}-${beat.label}`}
          className={`story-beat${beat.visual ? " has-visual" : ""}`}
        >
          {beat.visual ? (
            <SoftwareVisual visual={beat.visual} />
          ) : (
            <Laptop scene={beat.scene} />
          )}
          {beat.when ? <p className="story-when">{beat.when}</p> : null}
          <p className="story-line">{beat.label}</p>
        </li>
      ))}
    </ol>
  );
}
