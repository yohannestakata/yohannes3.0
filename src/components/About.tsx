"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "motion/react";

const stats = [
  { number: "03+", label: "Years of Craft" },
  { number: "20+", label: "Projects Shipped" },
  { number: "15+", label: "Clients Worldwide" },
];

const paragraph =
  "I'm a developer and designer based in Ethiopia who turns bold ideas into polished digital products. From interactive 3D experiences to full-stack platforms, I obsess over every pixel and every line of code so the end result feels seamless. Whether it's a web app, a mobile experience, or something completely new, I build things that look beautiful, perform fast, and deliver real business value.";

const accentPhrases = [
  "polished digital products.",
  "seamless.",
  "real business value.",
];

// Split into words while preserving accent info
const words = paragraph.split(" ").map((word) => {
  const isAccent = accentPhrases.some((phrase) => {
    const phraseWords = phrase.split(" ");
    return phraseWords.some(
      (pw) => pw === word || pw === word + "." || pw === word + ","
    );
  });
  return { word, accent: isAccent };
});

export default function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 0.9", "start 0.25"],
  });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 md:py-40 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="about-heading"
          className="text-[10px] tracking-[0.4em] uppercase text-muted mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About
        </motion.h2>

        {/* Per-word scroll opacity paragraph — Olivier Larose style */}
        <p
          ref={paragraphRef}
          className="text-2xl md:text-4xl lg:text-[2.75rem] font-normal leading-[1.3] tracking-tight flex flex-wrap"
        >
          {words.map((w, i) => (
            <Word
              key={i}
              word={w.word}
              index={i}
              total={words.length}
              progress={scrollYProgress}
              accent={w.accent}
            />
          ))}
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 md:mt-24 pt-8 border-t border-line"
          role="list"
          aria-label="Key statistics"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            >
              <span className="text-5xl md:text-7xl font-bold text-accent tracking-tighter">
                {stat.number}
              </span>
              <p className="text-muted text-[10px] md:text-xs mt-2 tracking-[0.2em] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Word({
  word,
  index,
  total,
  progress,
  accent,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  accent: boolean;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.25em] ${accent ? "italic text-accent font-medium" : ""}`}
    >
      {word}
    </motion.span>
  );
}
