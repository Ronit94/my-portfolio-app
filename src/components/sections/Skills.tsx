import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Server, Brain, Cloud, Monitor } from "lucide-react";
import { skills } from "../../lib/data";
import { SectionHeading } from "../ui/SectionHeading";

// ─── Skill group config ───────────────────────────────────────────────────────
const skillGroups = [
  {
    key: "backend" as const,
    label: "Backend & Databases",
    icon: Server,
    desc: "APIs, databases, messaging, and distributed systems primitives.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    key: "ai_ml" as const,
    label: "AI / Machine Learning",
    icon: Brain,
    desc: "Model training, inference pipelines, LLMs, and ML infrastructure.",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    key: "devops" as const,
    label: "DevOps & Cloud",
    icon: Cloud,
    desc: "Infrastructure, orchestration, CI/CD, and observability.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    key: "frontend" as const,
    label: "Frontend",
    icon: Monitor,
    desc: "UI development — enough to ship full-stack products independently.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
];

// ─── Skill Tag ────────────────────────────────────────────────────────────────
function SkillTag({ label, delay }: { label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className="inline-flex items-center px-2.5 py-1 rounded-md font-mono text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-default select-none"
    >
      {label}
    </motion.span>
  );
}

// ─── Skill Group Card ─────────────────────────────────────────────────────────
function SkillGroup({
  group,
  skillList,
  groupIndex,
}: {
  group: (typeof skillGroups)[0];
  skillList: string[];
  groupIndex: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: groupIndex * 0.1, ease: "easeOut" }}
      className="p-6 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
    >
      {/* Group header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${group.bg}`}>
          <group.icon className={`w-4 h-4 ${group.color}`} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {group.label}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
            {group.desc}
          </p>
        </div>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2">
        {skillList.map((skill, i) => (
          <SkillTag
            key={skill}
            label={skill}
            delay={groupIndex * 0.05 + i * 0.025}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
export function Skills() {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          label="Skills"
          title="Tools of the trade."
          subtitle="Technologies I reach for to solve hard problems — grouped by domain."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillGroups.map((group, i) => (
            <SkillGroup
              key={group.key}
              group={group}
              skillList={skills[group.key]}
              groupIndex={i}
            />
          ))}
        </div>

        {/* Philosophy note */}
        <div className="mt-10 p-5 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed text-center">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Philosophy: </span>
            Tools are means, not ends. I pick the right tool for the problem — and I'm
            comfortable learning a new one when the situation demands it.
          </p>
        </div>
      </div>
    </section>
  );
}
