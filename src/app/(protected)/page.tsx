import { BrandLockup } from "@/components/BrandLockup";
import { CompareTable } from "@/components/CompareTable";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";
import { requireSiteAccess } from "@/lib/gate";

export default async function HomePage() {
  await requireSiteAccess("/");

  return (
    <main id="top">
      <div className="hero-watercolor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-watercolor-image"
          src="/brand/hrblock-watercolor-pad.jpg"
          alt=""
        />
        <SiteNav />
      </div>

      <div className="report">
        <div className="report-hero">
          <HeroTelemetry />
          <section className="hero">
            <div>
              <p className="eyebrow">
                An illustrative software fleet for H&amp;R Block
              </p>
              <h1>Software agents with their own computers.</h1>
              <p className="hero-intro">
                These workflows start from the current evaluation context.
                Most engineering work is in Azure DevOps today. Four to five
                repositories are already in GitHub, with broader adoption
                planned by year end.
              </p>
            </div>
          </section>

          <RosterChart />

          <section className="usecase-framing">
            <p className="eyebrow">Three sample use cases</p>
            <h2>
              Three illustrative paths from selected work to a reviewable
              artifact.
            </h2>
            <p className="account-evidence">
              The evaluation should include bounded greenfield and brownfield
              work. Figma and Azure DevOps context can be part of the input.
            </p>
            <p className="account-evidence">
              Production versus sandbox still needs architecture and security
              input. Success criteria still need definition. Cloud Agents and
              Bugbot are recommendations, not agreed decisions.
            </p>
          </section>

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a
                key={job.id}
                className="metric-card"
                href={`#${job.id}`}
              >
                <div className="metric-card-top">
                  <p>Sample {String(job.number).padStart(2, "0")}</p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">Starts when {job.trigger.toLowerCase()}</p>
              </a>
            ))}
          </div>
        </div>

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/hrblock-watercolor-orbit.jpg" alt="" />
      </div>

      <div className="report">
        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <div>
          <BrandLockup size="sm" invert />
          <p className="footer-title">H&amp;R Block x SpaceXAI</p>
          <p>Illustrative Grok Bot software workflows</p>
        </div>
        <address className="footer-contact">
          <p>Contact</p>
          <strong>Nick Scallion</strong>
          <a href="mailto:nick.scallion@cursor.com">nick.scallion@cursor.com</a>
        </address>
      </footer>
    </main>
  );
}
