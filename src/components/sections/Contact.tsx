import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { personalInfo } from "../../lib/data";
import { SectionHeading } from "../ui/SectionHeading";
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

const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.633 5.903-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ─── Form field component ─────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  required?: boolean;
}

function Field({ label, name, type = "text", placeholder, value, onChange, multiline, required }: FieldProps) {
  const inputClass =
    "w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none focus:ring-0 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-zinc-600 dark:focus:bg-zinc-900";

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
        {required && <span className="ml-0.5 text-zinc-400">*</span>}
      </label>
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={5}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClass}
        />
      )}
    </div>
  );
}

// ─── Social link ──────────────────────────────────────────────────────────────
function SocialLink({
  href,
  icon: Icon,
  label,
  subtitle,
}: {
  href: string;
  icon: React.ComponentType;
  label: string;
  subtitle: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-400">
        <Icon />
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">{subtitle}</p>
      </div>
    </a>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          label="Contact"
          title="Let's talk."
          subtitle="I'm open to interesting engineering conversations, collaborations, or new roles. Reach out any way you prefer."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-4xl"
        >
          {/* Contact form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-16 px-6 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center"
              >
                <CheckCircle className="w-10 h-10 text-emerald-500" />
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Message sent!
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                    I'll get back to you as soon as I can. Thanks for reaching out.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors font-mono"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex items-center gap-2 mb-5">
                  <MessageSquare className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Send a message
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Name"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Field
                  label="Subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Message"
                  name="message"
                  placeholder="Tell me what you're working on, what you need, or just say hi."
                  value={form.message}
                  onChange={handleChange}
                  multiline
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Social links sidebar */}
          <div className="lg:col-span-2 space-y-1">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-widest font-mono mb-4">
              Or find me here
            </p>
            <SocialLink
              href={`mailto:${personalInfo.email}`}
              icon={Mail}
              label="Email"
              subtitle={personalInfo.email}
            />
            <SocialLink
              href={personalInfo.github}
              icon={GithubIcon}
              label="GitHub"
              subtitle="@alexchen-dev"
            />
            <SocialLink
              href={personalInfo.linkedin}
              icon={LinkedinIcon}
              label="LinkedIn"
              subtitle="linkedin.com/in/alexchen-dev"
            />
            <SocialLink
              href={personalInfo.twitter}
              icon={TwitterXIcon}
              label="X / Twitter"
              subtitle="@sarma_ronn36755"
            />

            {/* Response time note */}
            <div className="mt-6 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
                <span className="font-medium text-zinc-600 dark:text-zinc-400">Response time: </span>
                I typically reply within 24–48 hours on business days.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
