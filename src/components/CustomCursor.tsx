"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Inner dot — snappy
  const dotConfig = { damping: 30, stiffness: 500, mass: 0.3 };
  const dotX = useSpring(cursorX, dotConfig);
  const dotY = useSpring(cursorY, dotConfig);

  // Outer ring — trails behind
  const ringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  useEffect(() => {
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button");
      setIsPointer(isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-primary"
          animate={{
            width: isPointer ? 0 : 6,
            height: isPointer ? 0 : 6,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-primary/60"
          animate={{
            width: isPointer ? 56 : 32,
            height: isPointer ? 56 : 32,
            borderColor: isPointer
              ? "rgba(200,238,68,0.8)"
              : "rgba(250,250,250,0.4)",
          }}
          whileTap={{
            width: 20,
            height: 20,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}
