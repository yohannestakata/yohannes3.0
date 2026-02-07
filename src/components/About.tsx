"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  { number: "03+", label: "Years of Craft" },
  { number: "20+", label: "Projects Shipped" },
  { number: "15+", label: "Clients Worldwide" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-12" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase text-muted mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          ( About )
        </motion.p>

        <motion.h2
          className="text-2xl md:text-4xl lg:text-[2.75rem] font-normal leading-[1.3] tracking-tight"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          I&apos;m a developer and designer based in Ethiopia who turns bold ideas
          into{" "}
          <span className="italic text-accent font-medium">
            polished digital products
          </span>
          . From interactive 3D experiences to full-stack platforms, I obsess
          over every pixel and every line of code so the end result feels{" "}
          <span className="italic text-accent font-medium">seamless</span>
          . Whether it&apos;s a web app, a mobile experience, or something
          completely new — I build things that look beautiful, perform fast, and
          deliver{" "}
          <span className="italic text-accent font-medium">
            real business value
          </span>
          .
        </motion.h2>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 md:mt-24 pt-8 border-t border-line">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
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
