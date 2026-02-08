"use client";

import { useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

interface HeroProps {
  show: boolean;
}

export default function Hero({ show }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const scrollRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v;
  });

  return (
    <section
      ref={heroRef}
      aria-label="Hero"
      className="relative h-screen flex flex-col px-6 md:px-12"
    >
      {/* 3D Scene — full coverage, decorative */}
      <div className="absolute inset-0 opacity-70" aria-hidden="true">
        <Scene scrollProgress={scrollRef} />
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Nav clearance */}
      <div className="pt-20" />

      {/* ---- Center: Name left + description right ---- */}
      <div className="relative z-10 flex-1 flex items-center pointer-events-none">
        {/* Left — Name stack */}
        <div className="flex-1">
          <motion.p
            className="text-[10px] tracking-[0.4em] uppercase text-muted mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            ( Creative Developer & Designer )
          </motion.p>

          {/* Single h1 wrapping the full name for SEO — one h1 per page */}
          <h1 className="sr-only">
            Yohannes Takata — Creative Developer &amp; Designer based in
            Ethiopia
          </h1>

          <div className="overflow-hidden py-1">
            <motion.span
              role="presentation"
              className="block text-[15vw] md:text-[11vw] font-bold leading-[0.88] tracking-[-0.05em] uppercase"
              initial={{ y: "120%" }}
              animate={show ? { y: "0%" } : { y: "120%" }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              Yohannes
            </motion.span>
          </div>

          <div className="overflow-hidden py-1">
            <motion.span
              role="presentation"
              className="block text-[15vw] md:text-[11vw] font-bold leading-[0.88] tracking-[-0.05em] uppercase"
              initial={{ y: "120%" }}
              animate={show ? { y: "0%" } : { y: "120%" }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              Takata
            </motion.span>
          </div>
        </div>

        {/* Right — Description block (desktop only) */}
        <motion.div
          className="hidden md:flex flex-col items-end gap-6 max-w-[200px] shrink-0 ml-8"
          initial={{ opacity: 0, x: 20 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="w-12 h-px bg-accent" aria-hidden="true" />
          <p className="text-secondary text-sm leading-relaxed text-right">
            Building polished web &amp; mobile experiences from Ethiopia for
            clients worldwide.
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted text-right">
            ( 2023 — Present )
          </p>
        </motion.div>
      </div>

      {/* ---- Bottom bar ---- */}
      <motion.div
        className="relative z-10 pb-8 flex items-end justify-between border-t border-line pt-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted">
          Developer & Designer
          <br />
          Based in Ethiopia
        </p>

        <div
          className="flex flex-col items-center gap-2"
          role="presentation"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-muted">
            Scroll
          </span>
          <motion.div className="w-px h-10 overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-accent to-transparent"
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.5,
              }}
            />
          </motion.div>
        </div>

        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted text-right">
          Portfolio &apos;26
        </p>
      </motion.div>
    </section>
  );
}
