import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { blogPosts } from "../../lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";

// ─── Blog Post Row ────────────────────────────────────────────────────────────
function BlogPostRow({
  post,
  index,
}: {
  post: (typeof blogPosts)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.a
      ref={ref}
      href={post.url}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="group block p-5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 transition-all duration-200"
      aria-label={post.title}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
              {post.date}
            </span>
            <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} read</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors mb-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Arrow icon */}
        <div className="flex-shrink-0 mt-1">
          <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-700 dark:text-zinc-700 dark:group-hover:text-zinc-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  );
}

// ─── Writing Section ──────────────────────────────────────────────────────────
export function Writing() {
  return (
    <section
      id="writing"
      className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-100 dark:border-zinc-800/50"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          label="Writing"
          title="Notes from the workbench."
          subtitle="Short technical essays on systems, AI engineering, and the lessons learned in production."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {blogPosts.map((post, i) => (
            <BlogPostRow key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* More writing CTA */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 max-w-xs bg-zinc-200 dark:bg-zinc-800" />
          <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
            More essays coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
