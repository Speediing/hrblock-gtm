import Image from "next/image";

import { BrandLockup } from "@/components/brand-lockup";
import { FleetSelector } from "@/components/fleet-selector";
import { SiteFooter } from "@/components/site-footer";
import { SoftwareComputer } from "@/components/software-preview";
import { UseCaseStory } from "@/components/use-case-story";
import type { LeaveBehindContent } from "@/content/types";
import { getFleetAgent } from "@/lib/fleet";

import styles from "./leave-behind.module.css";

export function LeaveBehindPage(props: {
  readonly content: LeaveBehindContent;
}) {
  const { content } = props;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className={`${styles.header} site-header`}>
        <div className={`page-shell ${styles.headerInner}`}>
          <a className={styles.brandLink} href="#top" aria-label="Back to top">
            <BrandLockup brand={content.brand} priority />
          </a>
          <nav className={styles.navigation} aria-label="On this page">
            {content.navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content">
        <section id="top" className={styles.watercolor}>
          <Image
            src={content.hero.art.src}
            alt={content.hero.art.alt}
            width={1280}
            height={720}
            sizes="100vw"
            className={styles.watercolorImage}
            priority
          />
        </section>
        <section className={styles.heroBand} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className="kicker">{content.hero.eyebrow}</p>
            <h1 id="hero-title">{content.hero.title}</h1>
            <p>{content.hero.body}</p>
          </div>
          <FleetSelector content={content.fleet} />
        </section>

        <section
          id="use-cases"
          className={`page-shell ${styles.useCaseIntro}`}
          aria-labelledby="use-case-title"
        >
          <p className="kicker">{content.useCases.eyebrow}</p>
          <div className={styles.useCaseIntroHeading}>
            <h2 id="use-case-title">{content.useCases.title}</h2>
            <p>{content.useCases.body}</p>
          </div>
          <div className={styles.useCaseCards}>
            {content.useCases.cards.map((card) => (
              <a key={card.id} href={card.anchor} className={styles.useCaseCard}>
                <span>Sample {card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </a>
            ))}
          </div>
        </section>

        <div className={`page-shell ${styles.stories}`}>
          {content.useCases.stories.map((story) => (
            <UseCaseStory
              key={story.id}
              story={story}
              agentName={getFleetAgent(content.fleet, story.agentId).name}
            />
          ))}
        </div>

        <section className={styles.fleetBreak} aria-labelledby="fleet-break-title">
          <div className="page-shell">
            <div className={styles.fleetBreakHeading}>
              <div>
                <p className="kicker">{content.fleetBreak.eyebrow}</p>
                <h2 id="fleet-break-title">{content.fleetBreak.title}</h2>
              </div>
              <p>{content.fleetBreak.body}</p>
            </div>
            <div className={styles.fleetGrid}>
              {content.fleet.agents.map((agent) => (
                <article key={agent.id} className={styles.fleetComputer}>
                  <div>
                    <p>{agent.name}</p>
                    <span>{agent.function}</span>
                  </div>
                  <SoftwareComputer computer={agent.computer} compact />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="evaluation"
          className={`page-shell ${styles.evaluation}`}
          aria-labelledby="evaluation-title"
        >
          <div className={styles.evaluationHeading}>
            <p className="kicker">{content.evaluation.eyebrow}</p>
            <h2 id="evaluation-title">{content.evaluation.title}</h2>
            <p>{content.evaluation.intro.statement}</p>
          </div>
          <ol className={styles.evaluationGrid}>
            {content.evaluation.items.map((item, index) => (
              <li key={item.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter brand={content.brand} contact={content.contact} />
    </>
  );
}
