// ─── Portfolio App Entry Point ────────────────────────────────────────────────
// Alex Chen — Backend & AI Engineer Portfolio
// Built with React, Vite, TypeScript, Tailwind CSS, Framer Motion

import { useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Skills } from "./components/sections/Skills";
import { Writing } from "./components/sections/Writing";
import { Contact } from "./components/sections/Contact";
import { CommandPalette } from "./components/CommandPalette";

// ─── Initialize theme before first paint ─────────────────────────────────────
// This prevents FOUC (flash of unstyled content) on theme preference load
function initTheme() {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch {
    // Silently fail in SSR or restricted environments
  }
}

initTheme();

// ─── Root App Component ───────────────────────────────────────────────────────
export default function App() {
  // Apply body background based on theme (prevents flash between sections)
  useEffect(() => {
    const updateBg = () => {
      const isDark = document.documentElement.classList.contains("dark");
      document.body.style.backgroundColor = isDark ? "#09090b" : "#ffffff";
    };
    updateBg();

    // Observe class changes on html element
    const observer = new MutationObserver(updateBg);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero — the first impression */}
        <Hero />

        {/* About — who I am and how I think */}
        <About />

        {/* Projects — the most important section */}
        <Projects />

        {/* Experience — timeline of roles */}
        <Experience />

        {/* Skills — grouped tech stack */}
        <Skills />

        {/* Writing — technical essays */}
        <Writing />

        {/* Contact — reach out */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Command palette (Cmd+K) */}
      <CommandPalette />
    </div>
  );
}
