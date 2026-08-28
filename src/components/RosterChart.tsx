import { FLEET, type FleetBot } from "@/data/fleet";

function initials(bot: FleetBot) {
  if (bot.mark) return bot.mark;
  const parts = bot.name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

function isLight(hex: string) {
  if (!hex.startsWith("#") || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

function Box({
  bot,
  lead = false,
}: {
  bot: FleetBot;
  lead?: boolean;
}) {
  const className = lead ? "org-box is-chief" : "org-box";
  const body = (
    <>
      <span
        className="org-avatar"
        style={{
          background: bot.color,
          color: isLight(bot.color) ? "#111" : "#fff",
        }}
        aria-hidden
      >
        {initials(bot)}
      </span>
      <span className="org-name">{bot.name}</span>
      <span className="org-blurb">
        {bot.blurb} {bot.computer}.
      </span>
    </>
  );

  if (bot.jobId) {
    return (
      <a className={className} href={`#${bot.jobId}`}>
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export function RosterChart() {
  const lead = FLEET.find((item) => item.lead);
  const agents = FLEET.filter((item) => !item.lead);

  if (!lead) return null;

  return (
    <section id="roster" className="roster">
      <h2>A fleet of software agents with their own computers</h2>
      <p className="section-lede">
        Each named agent has a separate computer and a narrow software task.
        The examples are illustrative and leave work ready for review.
      </p>

      <div className="org" role="tree">
        <div className="org-top">
          <Box bot={lead} lead />
        </div>
        <div className="org-branch">
          <div className="org-connect" aria-hidden>
            <i className="org-stem" />
            <i className="org-bar" />
          </div>
          <ul className="org-kids">
            {agents.map((agent) => (
              <li key={agent.id} className="org-kid">
                <Box bot={agent} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
