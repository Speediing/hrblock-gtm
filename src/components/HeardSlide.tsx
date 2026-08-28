import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <ol className={`deck-slides size-${size}`}>
        {slides.map((slide) => (
          <li
            key={`${slide.n}-${slide.title}`}
            className={`deck-tile voice-${slide.voice || "us"}`}
          >
            <div className="deck-tile-bar">
              <span className="deck-kicker">{slide.kicker || "Artifact"}</span>
              <span className="deck-n">{String(slide.n).padStart(2, "0")}</span>
            </div>
            <h3 className="deck-tile-title">{slide.title}</h3>
            <p className={slide.voice === "them" ? "deck-quote" : "deck-map"}>
              {slide.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
