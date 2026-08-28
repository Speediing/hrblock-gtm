import type { LeaveBehindContent } from "@/content/types";

import styles from "./leave-behind.module.css";

export function UseCaseMatrix(props: {
  readonly content: LeaveBehindContent["opportunity"];
}) {
  const { content } = props;

  return (
    <section
      id="opportunity"
      className={styles.chapter}
      aria-labelledby="opportunity-title"
    >
      <div className={`page-shell ${styles.chapterGrid}`}>
        <p className={`${styles.chapterNumber} kicker`} aria-hidden="true">
          {content.number}
        </p>
        <div>
          <p className="kicker">{content.kicker}</p>
          <h2 id="opportunity-title">{content.title}</h2>
          <p className={styles.chapterIntro}>{content.intro.statement}</p>
          <ol className={styles.useCaseList}>
            {content.items.map((item) => (
              <li key={item.id} className={styles.useCase}>
                <span className={styles.itemNumber}>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <ul className={styles.signals}>
                    {item.signals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}