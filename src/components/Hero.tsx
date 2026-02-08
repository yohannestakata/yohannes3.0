"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

interface HeroProps {
  show: boolean;
}

export default function Hero({ show }: HeroProps) {
  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-60">
        <Scene />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/30 via-transparent to-dark/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12">
        {/* First name */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-[-0.04em] uppercase"
            initial={{ y: "120%" }}
            animate={show ? { y: "0%" } : { y: "120%" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            Yohannes
          </motion.h1>
        </div>

        {/* Divider with subtitle */}
        <motion.div
          className="flex items-center gap-4 md:gap-8 my-3 md:my-5"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="h-px bg-line flex-1"
            initial={{ scaleX: 0 }}
            animate={show ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "left" }}
          />
          <p className="text-[10px] md:text-xs text-secondary tracking-[0.35em] uppercase whitespace-nowrap">
            Creative Developer &amp; Designer
          </p>
          <motion.div
            className="h-px bg-line flex-1"
            initial={{ scaleX: 0 }}
            animate={show ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "right" }}
          />
        </motion.div>

        {/* Last name */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-[-0.04em] uppercase text-right"
            initial={{ y: "120%" }}
            animate={show ? { y: "0%" } : { y: "120%" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            Takata
          </motion.h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.35em] uppercase text-muted">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
        >
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
      </motion.div>
    </section>
  );
}
