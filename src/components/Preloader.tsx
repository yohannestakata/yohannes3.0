"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const totalDuration = 2000;
    const interval = 20;
    const increment = 100 / (totalDuration / interval);

    const timer = setInterval(() => {
      current = Math.min(current + increment, 100);
      setCount(Math.floor(current));

      if (current >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-dark flex flex-col justify-between p-8 md:p-12"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-muted text-[10px] tracking-[0.4em] uppercase">
          Portfolio - 2026
        </p>
      </motion.div>

      {/* Bottom */}
      <div className="flex items-end justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-secondary text-sm md:text-base tracking-wide">
            Creative Developer
          </p>
          <p className="text-secondary text-sm md:text-base tracking-wide">
            &amp; Designer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-right leading-none"
        >
          <span className="text-[22vw] md:text-[14vw] font-bold tracking-tighter tabular-nums">
            {count}
          </span>
        </motion.div>
      </div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-accent"
        initial={{ width: "0%" }}
        animate={{ width: `${count}%` }}
        transition={{ ease: "linear" }}
      />
    </motion.div>
  );
}
