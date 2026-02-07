"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden"
      ref={ref}
    >
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase text-muted mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Have an idea? Let&apos;s talk.
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-[0.9]"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            Let&apos;s Build
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-[0.9] text-accent"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            Something Great
          </motion.h2>
        </div>

        <motion.div
          className="mt-12 md:mt-16 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="mailto:yohannesmasayuki@gmail.com"
            className="group inline-flex items-center gap-3 text-sm md:text-base border border-line rounded-full px-8 py-4 hover:bg-accent hover:text-dark hover:border-accent transition-all duration-500"
          >
            <span>yohannesmasayuki@gmail.com</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 group-hover:rotate-45"
            >
              <path
                d="M1 13L13 1M13 1H1M13 1V13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/yohannes-takata"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-300 text-[10px] tracking-[0.25em] uppercase"
            >
              LinkedIn
            </a>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <a
              href="https://github.com/yohannestakata"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-300 text-[10px] tracking-[0.25em] uppercase"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
