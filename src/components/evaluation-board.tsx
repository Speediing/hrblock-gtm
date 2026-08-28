import type { LeaveBehindContent } from "@/content/types";

import styles from "./leave-behind.module.css";

export function EvaluationBoard(props: {
  readonly content: LeaveBehindContent["evaluation"];
}) {
  const { content } = props;

  return (
    <section
      id="evaluation"
      className={styles.chapter}
      aria-labelledby="evaluation-title"
    >
      <div className={`page-shell ${styles.chapterGrid}`}>
        <p className={`${styles.chapterNumber} kicker`} aria-hidden="true">
          {content.number}
        </p>
        <div>
          <p className="kicker">{content.kicker}</p>
          <h2 id="evaluation-title">{content.title}</h2>
          <p className={styles.chapterIntro}>{content.intro.statement}</p>
          <ol className={styles.board}>
            {content.items.map((item, index) => (
              <li key={item.id} className={styles.boardItem}>
                <span className={styles.node} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}