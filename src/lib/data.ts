// ─── Portfolio Data ───────────────────────────────────────────────────────────
// All content is centralized here for easy updates

export const personalInfo = {
  name: "Ronnie Sarma",
  title: "Full stack & AI Engineer",
  roles: ["Backend Engineer", "AI Developer", "Full Stack Developer"],
  tagline: "I build systems that scale and models that think.",
  bio: `I'm a full stack and AI engineer with a focus on distributed systems, 
  high-throughput APIs, and production-grade machine learning pipelines. 
  I care deeply about correctness, performance, and the engineering judgment 
  it takes to ship reliable software at scale.`,
  bioExtended: `My work lives at the intersection of systems engineering and applied AI — 
  whether that's designing event-driven microservices, fine-tuning LLMs on domain-specific data, 
  or building data pipelines that process millions of records daily. I'm drawn to hard problems 
  with real constraints and real consequences.`,
  location: "Kolkata, India",
  email: "ronnie.sarma94@gmail.com",
  github: "https://github.com/Ronit94",
  linkedin: "https://www.linkedin.com/in/ronnie-sarma-9a1727105",
  twitter: "https://x.com/sarma_ronn36755",
  resumeUrl: "/resume.pdf",
  availableForWork: true,
};

export const skills = {
  backend: [
    "Node.js", "Python", "Go", "FastAPI", "Express", "NestJS",
    "PostgreSQL", "Redis", "MongoDB", "Kafka", "RabbitMQ",
    "REST APIs", "GraphQL", "gRPC", "Microservices",
  ],
  ai_ml: [
    "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "OpenAI API",
    "RAG Pipelines", "Fine-tuning LLMs", "Vector Databases", "Pinecone",
    "scikit-learn", "Pandas", "NumPy", "MLflow", "ONNX",
  ],
  devops: [
    "Docker", "Kubernetes", "AWS", "GCP",
    "GitHub Actions", "CI/CD", "Prometheus", "Grafana", "Nginx",
  ],
  frontend: [
    "React", "Next.js", "TypeScript",
  ],
};

export interface Project {
  id: string;
  title: string;
  problem: string;
  approach: string;
  stack: string[];
  impact: string;
  github?: string;
  demo?: string;
  featured: boolean;
  category: "backend" | "ai" | "fullstack";
  year: number;
}

export const projects: Project[] = [
  {
    id: "neural-query",
    title: "NeuralQuery — LLM-Powered SQL Interface",
    problem:
      "Non-technical stakeholders needed access to complex database insights without writing SQL, creating bottlenecks for the data team.",
    approach:
      "Built a natural language to SQL pipeline using GPT-4 with few-shot prompting and schema-aware context injection. Implemented a validation layer that executes queries in read-only mode with query cost estimation before returning results.",
    stack: ["Python", "FastAPI", "PostgreSQL", "OpenAI API", "LangChain", "Redis", "React"],
    impact:
      "Reduced data team query requests by 68%. ~2,000 queries processed/day with avg latency under 1.2s.",
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
    category: "ai",
    year: 2025,
  },
  {
    id: "distrib-job",
    title: "Distributed Job Scheduler",
    problem:
      "A monolithic cron system was causing cascading failures under load, with no observability into job states or retry logic.",
    approach:
      "Designed a distributed job scheduler with leader election via Redis, a priority queue backed by PostgreSQL, and dead-letter queues for failed jobs. Built a real-time dashboard for job monitoring.",
    stack: ["Go", "PostgreSQL", "Redis", "Docker", "Prometheus", "Grafana"],
    impact:
      "Handles 50K+ jobs/day with 99.97% reliability. Reduced job failure rate from 8% to 0.03%.",
    github: "https://github.com",
    featured: true,
    category: "backend",
    year: 2024,
  },
  {
    id: "rag-docs",
    title: "Enterprise RAG Documentation System",
    problem:
      "A 500-person engineering org had documentation spread across Confluence, Notion, and GitHub wikis — impossible to search effectively.",
    approach:
      "Built an ingestion pipeline that chunked, embedded, and indexed documents from multiple sources into Pinecone. Used a hybrid retrieval approach (BM25 + vector search) with re-ranking, served via a FastAPI backend with streaming responses.",
    stack: ["Python", "FastAPI", "Pinecone", "OpenAI", "Hugging Face", "Kafka", "Next.js"],
    impact:
      "Cut average time-to-answer for internal questions from 15 mins to under 30 seconds.",
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
    category: "ai",
    year: 2025,
  },
  {
    id: "api-gateway",
    title: "High-Performance API Gateway",
    problem:
      "Upstream services were being overloaded by uncontrolled client traffic, with no rate limiting, caching, or auth consolidation.",
    approach:
      "Built a custom API gateway in Go with JWT auth, per-client rate limiting using token buckets, response caching with cache-control headers, and a plugin architecture for middleware. Zero-downtime deployments via blue-green.",
    stack: ["Go", "Redis", "Docker", "Nginx", "Kubernetes", "Prometheus"],
    impact:
      "Reduced upstream load by 73%. Handles 100K+ req/min with p99 latency under 8ms.",
    github: "https://github.com",
    featured: false,
    category: "backend",
    year: 2023,
  },
  {
    id: "stream-pipeline",
    title: "Real-Time ML Feature Pipeline",
    problem:
      "Batch feature computation was causing 6-hour lag between events and ML model predictions, making recommendations stale.",
    approach:
      "Designed a streaming feature pipeline using Kafka Streams for real-time feature computation, with feature versioning stored in Redis and a feature store backed by ClickHouse for historical queries.",
    stack: ["Python", "Kafka", "Redis", "ClickHouse", "MLflow", "Docker", "Kubernetes"],
    impact:
      "Reduced feature lag from 6 hours to under 30 seconds. Improved recommendation CTR by 22%.",
    github: "https://github.com",
    featured: false,
    category: "ai",
    year: 2023,
  },
  {
    id: "auth-service",
    title: "Multi-Tenant Auth Service",
    problem:
      "Multiple products in a SaaS suite needed unified authentication with per-tenant RBAC, SSO, and audit logging.",
    approach:
      "Built an OAuth 2.0 / OIDC-compliant auth service with tenant isolation, fine-grained RBAC, SAML/SSO support, and an immutable audit log. Used event sourcing for permission changes.",
    stack: ["Node.js", "NestJS", "PostgreSQL", "Redis", "TypeScript", "Docker"],
    impact:
      "Serving 40+ tenants, 200K+ users. Zero security incidents post-launch.",
    github: "https://github.com",
    featured: false,
    category: "backend",
    year: 2022,
  },
];

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  stack: string[];
  type: "full-time" | "contract" | "freelance";
}

export const experiences: Experience[] = [
  {
    id: "meridian",
    company: "Meridian AI",
    role: "Senior Backend & AI Engineer",
    period: "Jan 2023 — Present",
    location: "San Francisco, CA",
    description:
      "Lead engineer on the AI platform team, responsible for core ML infrastructure, LLM integrations, and the data pipeline powering real-time predictions.",
    highlights: [
      "Architected a multi-tenant LLM serving infrastructure handling 5M+ daily inference requests with 99.9% uptime",
      "Built a RAG pipeline that improved answer relevance scores by 41% vs. naive retrieval",
      "Led migration from a monolithic Django app to an event-driven microservices architecture (Go + Kafka)",
      "Reduced model serving costs by 34% through quantization, batching, and intelligent caching strategies",
      "Established MLOps practices: automated retraining, A/B testing framework, and drift detection",
    ],
    stack: ["Go", "Python", "Kafka", "PostgreSQL", "Redis", "Kubernetes", "PyTorch", "OpenAI"],
    type: "full-time",
  },
  {
    id: "novatech",
    company: "NovaTech Systems",
    role: "Backend Engineer",
    period: "Jun 2021 — Dec 2022",
    location: "Remote",
    description:
      "Core contributor to a fintech platform processing $2B+ in annual transactions. Focused on payment infrastructure, fraud detection, and API reliability.",
    highlights: [
      "Built a real-time fraud detection service using gradient boosted models — reduced fraud losses by 28%",
      "Redesigned the payments API for idempotency and exactly-once semantics across distributed services",
      "Implemented comprehensive observability stack (Prometheus, Grafana, OpenTelemetry) reducing MTTR by 60%",
      "Scaled the core PostgreSQL database from 10GB to 2TB through partitioning, read replicas, and query optimization",
    ],
    stack: ["Node.js", "PostgreSQL", "Redis", "Python", "scikit-learn", "Docker", "AWS"],
    type: "full-time",
  },
  {
    id: "freelance",
    company: "Independent Consulting",
    role: "Full Stack & AI Consultant",
    period: "Jan 2020 — May 2021",
    location: "Remote",
    description:
      "Worked with early-stage startups on backend architecture, API design, and integrating ML capabilities into their products.",
    highlights: [
      "Delivered a recommendation engine for an e-commerce client — increased conversion rate by 18%",
      "Built a multi-tenant SaaS backend from scratch for a B2B productivity tool (0 to $200K ARR)",
      "Integrated LLM-based content generation into a marketing automation platform",
    ],
    stack: ["Python", "FastAPI", "Node.js", "React", "PostgreSQL", "AWS", "Docker"],
    type: "freelance",
  },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  url: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "rag-production",
    title: "RAG in Production: What the Tutorials Don't Tell You",
    excerpt:
      "Moving from a RAG demo to a reliable production system requires solving chunking strategy, hybrid retrieval, re-ranking, and latency trade-offs that most tutorials ignore.",
    date: "Nov 2024",
    readTime: "12 min",
    tags: ["AI", "RAG", "Production", "LLMs"],
    url: "#",
  },
  {
    id: "distributed-systems-gotchas",
    title: "5 Distributed Systems Mistakes I Made (So You Don't Have To)",
    excerpt:
      "Hard-won lessons on idempotency, clock skew, partial failures, and why you should treat every network call as if it will fail — because eventually, it will.",
    date: "Sep 2024",
    readTime: "9 min",
    tags: ["Distributed Systems", "Backend", "Engineering"],
    url: "#",
  },
  {
    id: "llm-cost-optimization",
    title: "Cutting LLM Inference Costs by 60%: A Practical Guide",
    excerpt:
      "A systematic approach to reducing OpenAI/Anthropic bills through prompt caching, request batching, semantic caching with embeddings, and strategic model selection.",
    date: "Jul 2024",
    readTime: "11 min",
    tags: ["LLMs", "Cost Optimization", "AI Infrastructure"],
    url: "#",
  },
  {
    id: "postgres-at-scale",
    title: "PostgreSQL at Scale: Partitioning, Indexing, and Query Planning",
    excerpt:
      "Deep dive into the techniques that kept our PostgreSQL database performant as it grew from 10GB to 2TB — without a painful migration to a distributed database.",
    date: "Apr 2024",
    readTime: "15 min",
    tags: ["PostgreSQL", "Database", "Performance"],
    url: "#",
  },
];
