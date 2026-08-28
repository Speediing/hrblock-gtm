import { AgentWorkbench } from "@/components/agent-workbench";
import { BrandLockup } from "@/components/brand-lockup";
import { EvaluationBoard } from "@/components/evaluation-board";
import { SiteFooter } from "@/components/site-footer";
import { UseCaseMatrix } from "@/components/use-case-matrix";
import type { LeaveBehindContent } from "@/content/types";

import styles from "./leave-behind.module.css";

export function LeaveBehindPage(props: {
  readonly content: LeaveBehindContent;
}) {
  const { content } = props;

  return (
    <>
      <a className="skip-link" href="#workbench">
        Skip to workbench
      </a>
      <header className={styles.header}>
        <div className={`page-shell ${styles.headerInner}`}>
          <BrandLockup brand={content.brand} priority />
          <a className={`${styles.headerLink} header-link`} href="#opportunity">
            Explore use cases
          </a>
        </div>
      </header>
      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`page-shell ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className="kicker">{content.hero.eyebrow}</p>
              <h1 id="hero-title">{content.hero.title}</h1>
              <p className={styles.heroBody}>{content.hero.body}</p>
            </div>
            <AgentWorkbench content={content.demo} />
          </div>
        </section>
        <UseCaseMatrix content={content.opportunity} />
        <EvaluationBoard content={content.evaluation} />
      </main>
      <SiteFooter brand={content.brand} contact={content.contact} />
    </>
  );
}