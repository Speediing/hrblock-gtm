import type { Artifact } from "@/data/types";
import { HeardSlide } from "./HeardSlide";

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  if (artifact.kind === "slides") {
    return <HeardSlide slides={artifact.cards} size="sm" />;
  }

  if (artifact.kind === "one-pager") {
    return (
      <div className="art art-doc">
        <p className="art-kicker">{artifact.eyebrow || "Review artifact"}</p>
        <h3 className="art-title">{artifact.title}</h3>
        {artifact.sections.map((section) => (
          <div key={section.heading} className="art-block">
            <p className="art-label">{section.heading}</p>
            <p>{section.body}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="art art-doc">
      <p className="art-kicker">Review packet</p>
      <h3 className="art-title">{artifact.title}</h3>
      {artifact.fields.map((field) => (
        <div key={field.label} className="art-block">
          <p className="art-label">{field.label}</p>
          <p>{field.value}</p>
        </div>
      ))}
    </div>
  );
}
