"use client";

const items = [
  "React / Next.js",
  "React Native",
  "Three.js / R3F",
  "Motion & Animation",
  "Node.js / Express",
  "UI/UX Design",
  "Full-Stack Apps",
  "REST & GraphQL APIs",
  "TypeScript",
  "Figma to Code",
];

export default function Marquee() {
  return (
    <section
      className="py-5 border-y border-line overflow-hidden"
      aria-label="Skills and technologies"
    >
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((setIndex) => (
          <div
            key={setIndex}
            className="flex shrink-0"
            aria-hidden={setIndex === 1}
          >
            {items.map((item, i) => (
              <div
                key={`${setIndex}-${i}`}
                className="flex items-center shrink-0"
              >
                <span className="text-sm md:text-base font-medium uppercase tracking-[0.2em] whitespace-nowrap px-5 md:px-8">
                  {item}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
