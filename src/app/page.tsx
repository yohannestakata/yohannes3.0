"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <SmoothScroll>
        <CustomCursor />
        <Navigation show={!loading} />
        <main>
          <Hero show={!loading} />
          <Marquee />
          <About />
          <Works />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
