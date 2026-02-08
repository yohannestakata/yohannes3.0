"use client";

import { motion } from "motion/react";
import { useLenis } from "@/components/SmoothScroll";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

interface NavigationProps {
  show: boolean;
}

export default function Navigation({ show }: NavigationProps) {
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement && lenis) {
      lenis.scrollTo(targetElement, {
        offset: -80, // Account for fixed header
        duration: 1.5,
      });
    } else if (targetElement) {
      // Fallback if Lenis isn't available
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference"
      initial={{ y: -100, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <a href="#" className="text-lg font-bold tracking-tight">
        YO<span className="text-accent">.</span>TA
      </a>

      <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="relative text-[11px] tracking-[0.25em] uppercase group cursor-pointer"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300 ease-out" />
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="text-[11px] tracking-[0.2em] uppercase hidden sm:inline">
          Available for work
        </span>
      </div>
    </motion.header>
  );
}
