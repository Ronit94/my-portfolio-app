import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Cpu, Globe, Layers } from "lucide-react";
import { personalInfo } from "../../lib/data";
import { SectionHeading } from "../ui/SectionHeading";

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { label: "Years Experience", value: "9+" },
  { label: "Systems in Production", value: "6+" },
  { label: "Daily Requests Served", value: "10M+" },
  { label: "ML Models Shipped", value: "2+" },
];

// ─── Focus areas ─────────────────────────────────────────────────────────────
const focusAreas = [
  {
    icon: Database,
    title: "Distributed Systems",
    desc: "Designing fault-tolerant, scalable backends with event-driven architecture, message queues, and distributed state.",
  },
  {
    icon: Cpu,
    title: "AI / ML Engineering",
    desc: "Building production ML pipelines, fine-tuning LLMs, and integrating AI capabilities into real-world products.",
  },
  {
    icon: Globe,
    title: "API Design & Performance",
    desc: "Crafting high-throughput, idiomatic APIs with a focus on correctness, caching strategy, and developer experience.",
  },
  {
    icon: Layers,
    title: "Systems Thinking",
    desc: "Approaching problems with depth — understanding trade-offs, failure modes, and long-term architectural consequences.",
  },
];

// ─── Animated section wrapper ─────────────────────────────────────────────────
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
export function About() {
  return (
    <section
      id="about"
      className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-100 dark:border-zinc-800/50"
    >
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <SectionHeading
            label="About"
            title="Engineering with depth."
            subtitle={personalInfo.bio}
          />
        </AnimatedSection>

        {/* Two-column bio */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I work at the intersection of systems engineering and applied AI. My background 
                spans distributed system design, high-performance APIs, database engineering, 
                and production machine learning — with a particular focus on making complex 
                systems reliable, observable, and maintainable.
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I care about building things that actually work — not just demos. That means 
                thinking carefully about failure modes, operational costs, data consistency, 
                and the humans who will eventually maintain the system at 2am.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                On the AI side, I've moved beyond using APIs — I've built ingestion pipelines, 
                fine-tuned domain-specific models, designed RAG systems with hybrid retrieval, 
                and built the infrastructure that makes ML reliable enough for production.
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I believe the best engineers are the ones who can hold both the 10,000-foot 
                architectural view and the granular details of a subtle bug at the same time. 
                That's what I strive for.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 p-6 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Focus areas grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {focusAreas.map((area, i) => (
            <AnimatedSection key={area.title} delay={0.2 + i * 0.08}>
              <div className="group flex gap-4 p-5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
                <div className="mt-0.5 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <area.icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {area.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
