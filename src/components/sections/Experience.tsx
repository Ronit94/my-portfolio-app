import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { experiences } from "../../lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";

// ─── Experience Item ──────────────────────────────────────────────────────────
function ExperienceItem({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex gap-6"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <div className="relative flex items-center justify-center w-3 h-3 mt-1.5">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-zinc-400 bg-white dark:bg-zinc-950 dark:border-zinc-600 z-10" />
        </div>
        {/* Vertical line */}
        {!isLast && (
          <div className="flex-1 w-px bg-zinc-200 dark:bg-zinc-800 mt-2 mb-0" />
        )}
      </div>

      {/* Content */}
      <div className={`pb-12 flex-1 ${isLast ? "pb-0" : ""}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {exp.role}
            </h3>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                {exp.company}
              </span>
              {exp.type !== "full-time" && (
                <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                  {exp.type}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
            <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
              <Calendar className="w-3 h-3" />
              <span className="font-mono">{exp.period}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
              <MapPin className="w-3 h-3" />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed mb-4">
          {exp.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {exp.highlights.map((highlight, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {exp.stack.map((tech) => (
            <Badge key={tech} variant="mono">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────
export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-100 dark:border-zinc-800/50"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          label="Experience"
          title="Where I've worked."
          subtitle="A focused career building systems that handle scale, complexity, and the unexpected."
        />

        {/* Timeline */}
        <div className="max-w-3xl">
          {experiences.map((exp, i) => (
            <ExperienceItem
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
