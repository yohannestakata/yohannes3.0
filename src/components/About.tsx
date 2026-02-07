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

// Text segments — accent segments render in lime italic
const segments: { text: string; accent: boolean }[] = [
  {
    text: "I'm a developer and designer based in Ethiopia who turns bold ideas into ",
    accent: false,
  },
  { text: "polished digital products", accent: true },
  {
    text: ". From interactive 3D experiences to full-stack platforms, I obsess over every pixel and every line of code so the end result feels ",
    accent: false,
  },
  { text: "seamless", accent: true },
  {
    text: ". Whether it's a web app, a mobile experience, or something completely new, I build things that look beautiful, perform fast, and deliver ",
    accent: false,
  },
  { text: "real business value", accent: true },
  { text: ".", accent: false },
];

// Flatten all characters with their accent flag
const chars = segments.flatMap((seg) =>
  seg.text.split("").map((char) => ({ char, accent: seg.accent }))
);

export default function About() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.15"],
  });

  return (
    <section
      id="about"
      className="py-24 md:py-40 px-6 md:px-12"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase text-muted mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ( About )
        </motion.p>

        {/* Per-character scroll opacity text */}
        <p className="text-2xl md:text-4xl lg:text-[2.75rem] font-normal leading-[1.3] tracking-tight">
          {chars.map((c, i) => (
            <ScrollChar
              key={i}
              char={c.char}
              index={i}
              total={chars.length}
              progress={scrollYProgress}
              accent={c.accent}
            />
          ))}
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 md:mt-24 pt-8 border-t border-line"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
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

function ScrollChar({
  char,
  index,
  total,
  progress,
  accent,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  accent: boolean;
}) {
  const start = index / total;
  const end = Math.min(start + 0.04, 1);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={accent ? "italic text-accent font-medium" : ""}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}
