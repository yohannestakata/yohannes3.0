"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

const projects = [
  {
    title: "BOTA REVIEW",
    category: "Web Platform",
    year: "2026",
    color: "#34d399",
    description: "Review platform for restaurants and places in Ethiopia",
    href: "https://botareview.com",
  },
  {
    title: "Z'AGOAL",
    category: "Mobile App",
    year: "2026",
    color: "#ee8a44",
    description: "Gamified lifestyle & wellness app",
    href: "https://zagoal.com",
  },
  {
    title: "SERRALE",
    category: "Web Platform",
    year: "2025",
    color: "#44b4ee",
    description: "Full-stack restaurant management suite",
    href: "https://serrale.com",
  },
  {
    title: "GIFTII",
    category: "Web Platform",
    year: "2023",
    color: "#ee5555",
    description: "E-commerce platform for artisan foods",
    href: "https://giftiifoods.com",
  },
  {
    title: "AMEDIE",
    category: "System",
    year: "2023",
    color: "#c8ee44",
    description: "End-to-end hospital management system",
    href: "#",
  },
];

export default function Works() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      className="py-24 md:py-32 px-6 md:px-12"
      ref={sectionRef}
    >
      <motion.div
        className="flex items-end justify-between mb-16 md:mb-24"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none">
          Selected
          <br />
          <span className="text-accent">Works</span>
        </h2>
        <p className="hidden md:block text-muted text-[10px] tracking-[0.4em] uppercase">
          ( 2023 — Present )
        </p>
      </motion.div>

      <div>
        {projects.map((project, i) => (
          <ProjectRow
            key={project.title}
            project={project}
            index={i}
            isInView={isInView}
          />
        ))}
        <div className="border-t border-line" />
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={project.href}
      target={project.href !== "#" ? "_blank" : undefined}
      rel={project.href !== "#" ? "noopener noreferrer" : undefined}
      className="group block border-t border-line py-6 md:py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.15 * index,
        ease: [0.76, 0, 0.24, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-10">
          <motion.span
            className="text-xs font-mono w-6"
            animate={{ color: isHovered ? project.color : "#555555" }}
            transition={{ duration: 0.3 }}
          >
            {(index + 1).toString().padStart(2, "0")}
          </motion.span>

          <motion.h3
            className="text-2xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight"
            animate={{
              x: isHovered ? 16 : 0,
              color: isHovered ? project.color : "#fafafa",
            }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {project.title}
          </motion.h3>

          <motion.span
            className="hidden lg:block text-secondary text-sm"
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            — {project.description}
          </motion.span>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <span className="hidden md:block text-muted text-[10px] tracking-[0.2em] uppercase">
            {project.category}
          </span>
          <span className="text-muted text-xs">{project.year}</span>

          <motion.div
            className="w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden"
            animate={{
              backgroundColor: isHovered ? project.color : "rgba(0,0,0,0)",
              borderColor: isHovered ? project.color : "#252525",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 13L13 1M13 1H1M13 1V13"
                  stroke={isHovered ? "#0e0e0e" : "#fafafa"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}
