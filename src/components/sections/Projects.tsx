import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
} from "lucide-react";
import { projects, type Project } from "../../lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// ─── Category filter tabs ─────────────────────────────────────────────────────
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Backend", value: "backend" },
  { label: "AI / ML", value: "ai" },
  { label: "Full Stack", value: "fullstack" },
] as const;

type FilterValue = "all" | "backend" | "ai" | "fullstack";

// ─── Category label colors ────────────────────────────────────────────────────
function categoryBadge(category: Project["category"]) {
  const map: Record<Project["category"], string> = {
    backend: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    ai: "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    fullstack: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };
  const label: Record<Project["category"], string> = {
    backend: "Backend",
    ai: "AI / ML",
    fullstack: "Full Stack",
  };
  return { className: map[category], label: label[category] };
}

// ─── Single Project Card ──────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const cat = categoryBadge(project.category);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      className="group rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
    >
      {/* Card header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${cat.className}`}
            >
              {cat.label}
            </span>
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
              {project.year}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                className="p-1.5 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="p-1.5 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <GithubIcon />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug mb-2">
          {project.title}
        </h3>

        {/* Problem statement — always visible */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.problem}
        </p>

        {/* Stack badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="mono">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Expandable section */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-4">
              {/* Approach */}
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-2">
                  Approach
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.approach}
                </p>
              </div>
              {/* Impact */}
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-2">
                  Impact
                </p>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-center gap-1.5 py-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors font-mono"
        aria-expanded={expanded}
      >
        {expanded ? (
          <>
            <ChevronUp className="w-3.5 h-3.5" />
            Collapse
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5" />
            View approach &amp; impact
          </>
        )}
      </button>
    </motion.div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = projects.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );
  const displayed = showAll ? filtered : filtered.slice(0, 4);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          label="Projects"
          title="Selected work."
          subtitle="Real problems, real constraints, real impact. Each project highlights the engineering decisions that mattered."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setActiveFilter(f.value);
                setShowAll(false);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono transition-colors ${
                activeFilter === f.value
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Show all toggle */}
        {filtered.length > 4 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-mono group"
            >
              {showAll ? "Show less" : `Show all ${filtered.length} projects`}
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
