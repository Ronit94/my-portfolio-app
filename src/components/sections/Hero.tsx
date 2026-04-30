import { ArrowRight, Mail, Download, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { personalInfo } from "../../lib/data";
import { scrollToSection } from "../../lib/utils";
import { Button } from "../ui/Button";

// ─── SVG Social Icons ─────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Animated item wrapper ─────────────────────────────────────────────────────
interface FadeItemProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function FadeItem({ children, delay = 0, className }: FadeItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-grid bg-white dark:bg-zinc-950"
    >
      {/* Subtle radial gradient focal point */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-32 w-full">
        <div className="max-w-2xl">
          {/* Status badge */}
          <FadeItem delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 dark:border-zinc-800 dark:bg-zinc-900 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {personalInfo.availableForWork
                  ? "Available for new roles"
                  : "Currently employed"}
              </span>
            </div>
          </FadeItem>

          {/* Name */}
          <FadeItem delay={0.1}>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl leading-tight">
              {personalInfo.name}
            </h1>
          </FadeItem>

          {/* Role */}
          <FadeItem delay={0.2}>
            <p className="mt-3 font-mono text-sm text-zinc-400 dark:text-zinc-500 tracking-wide">
              {personalInfo.roles.join(" · ")}
            </p>
          </FadeItem>

          {/* Tagline */}
          <FadeItem delay={0.3}>
            <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {personalInfo.tagline}
            </p>
          </FadeItem>

          {/* Bio */}
          <FadeItem delay={0.4}>
            <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed max-w-xl">
              {personalInfo.bio}
            </p>
          </FadeItem>

          {/* CTAs */}
          <FadeItem delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                onClick={() => scrollToSection("projects")}
              >
                View Work
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("contact")}
              >
                Get in Touch
                <Mail className="w-3.5 h-3.5" />
              </Button>
              <Button as="a" href={personalInfo.resumeUrl} variant="ghost" external>
                Resume
                <Download className="w-3.5 h-3.5" />
              </Button>
            </div>
          </FadeItem>

          {/* Social / location */}
          <FadeItem delay={0.6}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{personalInfo.location}</span>
              </div>
              <span className="text-zinc-200 dark:text-zinc-800">|</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors link-underline text-xs flex items-center gap-1.5"
              >
                <GithubIcon />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors link-underline text-xs flex items-center gap-1.5"
              >
                <LinkedinIcon />
                LinkedIn
              </a>
            </div>
          </FadeItem>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-10 left-6 hidden sm:block"
        >
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-mono text-xs text-zinc-300 dark:text-zinc-700"
              style={{ writingMode: "vertical-lr" }}
            >
              scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-zinc-300 to-transparent dark:from-zinc-700 mt-2" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
