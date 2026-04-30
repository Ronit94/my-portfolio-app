import { useState, useEffect, useCallback, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Mail, FileText, Hash } from "lucide-react";
import { scrollToSection } from "../lib/utils";
import { personalInfo } from "../lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────
type CommandItem = {
  label: string;
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: () => void;
};

type CommandGroup = {
  group: string;
  items: CommandItem[];
};

// ─── Command palette data ─────────────────────────────────────────────────────
const COMMANDS: CommandGroup[] = [
  {
    group: "Navigate",
    items: [
      { label: "Home", id: "hero", icon: Hash },
      { label: "About", id: "about", icon: Hash },
      { label: "Projects", id: "projects", icon: Hash },
      { label: "Experience", id: "experience", icon: Hash },
      { label: "Skills", id: "skills", icon: Hash },
      { label: "Writing", id: "writing", icon: Hash },
      { label: "Contact", id: "contact", icon: Hash },
    ],
  },
  {
    group: "Links",
    items: [
      {
        label: "GitHub",
        id: "github",
        icon: ArrowRight,
        action: () => window.open(personalInfo.github, "_blank"),
      },
      {
        label: "LinkedIn",
        id: "linkedin",
        icon: ArrowRight,
        action: () => window.open(personalInfo.linkedin, "_blank"),
      },
      {
        label: "Resume / CV",
        id: "resume",
        icon: FileText,
        action: () => window.open(personalInfo.resumeUrl, "_blank"),
      },
      {
        label: `Email — ${personalInfo.email}`,
        id: "email",
        icon: Mail,
        action: () => { window.location.href = `mailto:${personalInfo.email}`; },
      },
    ],
  },
];

const ALL_ITEMS: CommandItem[] = COMMANDS.flatMap((g) => g.items);

// ─── Command Palette Component ────────────────────────────────────────────────
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? ALL_ITEMS.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : ALL_ITEMS;

  const executeItem = useCallback((item: CommandItem) => {
    if (item.action) {
      item.action();
    } else {
      scrollToSection(item.id);
    }
    setOpen(false);
    setQuery("");
  }, []);

  // Open/close via Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Arrow key + enter navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((v) => Math.min(v + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((v) => Math.max(v - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[selectedIndex];
        if (item) executeItem(item);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selectedIndex, executeItem]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Build grouped list for display
  const groupsToShow: CommandGroup[] = query.trim()
    ? [{ group: "Results", items: filtered }]
    : COMMANDS.map((g) => ({
        group: g.group,
        items: g.items.filter((i) => filtered.some((f) => f.id === i.id)),
      })).filter((g) => g.items.length > 0);

  // Global idx tracker for keyboard selection
  let globalIdx = -1;

  return (
    <>
      {/* Trigger hint */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <button
          onClick={() => { setOpen(true); setQuery(""); setSelectedIndex(0); }}
          className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white/90 backdrop-blur-sm px-3 py-2 text-xs text-zinc-500 shadow-sm hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:border-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          <Search className="w-3 h-3" />
          <span>Search</span>
          <kbd className="ml-1 rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Palette */}
            <motion.div
              key="palette"
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="fixed left-1/2 top-1/4 z-50 w-full max-w-md -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3.5 dark:border-zinc-800">
                <Search className="w-4 h-4 flex-shrink-0 text-zinc-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  placeholder="Search or jump to..."
                  className="flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-600"
                />
                <kbd className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500">
                  Esc
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-sm text-zinc-400">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  groupsToShow.map((group) => (
                    <Fragment key={group.group}>
                      <div className="px-4 py-1.5">
                        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                          {group.group}
                        </span>
                      </div>
                      {group.items.map((item) => {
                        globalIdx++;
                        const myIdx = globalIdx;
                        const isSelected = myIdx === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            onClick={() => executeItem(item)}
                            onMouseEnter={() => setSelectedIndex(myIdx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              isSelected
                                ? "bg-zinc-100 dark:bg-zinc-800"
                                : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                            }`}
                          >
                            <item.icon className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 flex-shrink-0" />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </Fragment>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 py-2">
                <span className="font-mono text-xs text-zinc-400">
                  ↑↓ navigate &nbsp;·&nbsp; ↵ select &nbsp;·&nbsp; esc close
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
