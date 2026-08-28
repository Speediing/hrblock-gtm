import { ChatSurface, SoftwareComputer } from "@/components/software-preview";
import type { UseCaseStory as UseCaseStoryContent } from "@/content/types";

import styles from "./leave-behind.module.css";

export function UseCaseStory(props: {
  readonly story: UseCaseStoryContent;
  readonly agentName: string;
}) {
  const { story, agentName } = props;

  return (
    <section
      id={story.id}
      className={styles.story}
      aria-labelledby={`${story.id}-title`}
    >
      <div className={styles.storyHeading}>
        <p className={styles.storyNumber}>{story.number}</p>
        <div>
          <p className="kicker">{story.eyebrow}</p>
          <h2 id={`${story.id}-title`}>{story.title}</h2>
          <p className={styles.storyIntro}>{story.intro}</p>
        </div>
      </div>
      <ol className={styles.sceneStrip}>
        {story.frames.map((frame) => (
          <li
            key={`${story.id}-${frame.number}`}
            className={
              frame.kind === "artifact"
                ? `${styles.sceneFrame} ${styles.artifactFrame}`
                : styles.sceneFrame
            }
          >
            <header className={styles.sceneHeader}>
              <span>Scene {frame.number}</span>
              <strong>{frame.label}</strong>
            </header>
            {frame.kind === "scene" ? (
              <>
                <div className={styles.sceneSplit}>
                  <div className={styles.scenePane}>
                    <p className={styles.previewLabel}>Chat</p>
                    <ChatSurface agentName={agentName} chat={frame.chat} />
                  </div>
                  <div className={styles.scenePane}>
                    <p className={styles.previewLabel}>Computer</p>
                    <SoftwareComputer computer={frame.computer} compact />
                  </div>
                </div>
                <p className={styles.sceneDescription}>{frame.description}</p>
              </>
            ) : (
              <article className={styles.artifact}>
                <div className={styles.artifactTop}>
                  <p>Reviewable output</p>
                  <span>{frame.status}</span>
                </div>
                <h3>{frame.title}</h3>
                <p>{frame.summary}</p>
                <ul>
                  {frame.items.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )}
            <p className={styles.illustrative}>Illustrative workflow</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
