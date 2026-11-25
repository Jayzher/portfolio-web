export const portfolioData = {
  profile: {
    name: "Jayzher D. Juaniza",
    preferredName: "Jayzher",
    role: "Full-Stack Software Engineer",
    specialization: "Specializing in Business Systems, Workflow Automation & Agentic AI Systems",
    subRole: "Python • Django • Fastify • React • Next.js • TypeScript • PostgreSQL • Claude Agents",
    availability: "Available for Remote Worldwide Engineering Roles",
    status: "active",
    location: "Surallah, South Cotabato, Philippines",
    phone: "+63 951 880 4288",
    email: "jayzherjuaniza@gmail.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/Jayzher",
    githubAlt: "https://github.com/Jayz-EE",
    resumeUrl: `${import.meta.env.BASE_URL}Jayzher_Juaniza_Resume.pdf`,
    avatar: "https://res.cloudinary.com/dgzhcuwym/image/upload/v1788801420/rhm2ccgcxlm7vepxx5r7.jpg",
    tagline: "Full-Stack Software Engineer specializing in Business Systems, Workflow Automation & Agentic AI Systems.",
    bio: [
      "Full-Stack Software Engineer with 2+ years of experience building enterprise web applications, school management systems and workflow automation with Python (Django/DRF), Fastify, React, TypeScript and PostgreSQL, including single-codebase multi-tenant platforms.",
      "Designed and built an agentic AI pipeline that has produced 29 production websites. Seeking remote Full-Stack Developer / Software Engineer roles."
    ],
  },

  remoteStatus: {
    isOpen: true,
    badge: "Open to Remote Opportunities",
    title: "Available for International Remote Roles",
    statement: "I am currently seeking remote Full-Stack Developer / Software Engineer opportunities with international engineering teams.",
    location: "Remote Worldwide",
    timezone: "UTC+8 / Flexible Overlap",
    employmentType: "Full-Time / Contract",
    highlights: [
      { label: "Remote Worldwide", value: "100% Remote Ready" },
      { label: "Timezone Flexibility", value: "UTC+8 with US / EU Overlap" },
      { label: "Contract & Full-Time", value: "30-Day Notice Period" },
    ]
  },

  stats: [
    { label: "Years Experience", value: "2+", change: "Full-Stack Engineering" },
    { label: "Production Systems", value: "8+", change: "Enterprise Deployed" },
    { label: "Users & Institutions", value: "3,000+", change: "Students, Staff & Clients" },
    { label: "Workflow Delivery", value: "100%", change: "Requirements to Production" },
  ],

  services: [
    {
      id: "fullstack",
      title: "Enterprise & Business Systems",
      description: "Designing end-to-end software architecture for asset management, business inventory platforms, single-codebase multi-tenant portals, and helpdesk systems.",
      icon: "CodeXml",
      highlights: [
        "Single Codebase Multi-Tenancy System Architecture",
        "Business Management & Inventory Systems (BMIS - Fastify & Celery)",
        "Asset Management Systems (Full Lifecycle Audit Trails)",
        "Multi-Tenant Ticket Support with Kanban & SLA Workflows",
        "School Record Management Systems (RMS & LMS Integration)",
        "System Validation & Evaluation (SVE) Automated QC",
      ],
    },
    {
      id: "backend",
      title: "Backend & RESTful API Engineering",
      description: "Robust, scalable, and secure backend microservices built with Python, Django, DRF, Fastify, Celery, and PostgreSQL.",
      icon: "Zap",
      highlights: [
        "Django & Fastify REST API Microservice Architecture",
        "Asynchronous Task Queues with Celery & Redis",
        "Single Codebase Multi-Tenancy Schema & Tenant Routing",
        "PostgreSQL & MySQL Relational Database Optimization",
        "Role-Based Access Control (RBAC) & Authentication",
      ],
    },
    {
      id: "frontend",
      title: "Modern Frontend & UI Architecture",
      description: "Clean, responsive, and type-safe user interfaces crafted with React.js, Redux Toolkit, TypeScript, Tailwind CSS, and Framer Motion.",
      icon: "Smartphone",
      highlights: [
        "React.js, Redux & TypeScript Single Page Applications",
        "Multi-Tenant Workspace & Client Organization UI",
        "Interactive Dashboards & Analytics Visualization",
        "Mobile-First Responsive Web Design",
        "State Management & Async API Integration",
      ],
    },
    {
      id: "ai",
      title: "AI-Accelerated Engineering Workflows",
      description: "Leveraging cutting-edge AI developer tooling to accelerate system design, automated testing, debugging, and code refactoring.",
      icon: "Sparkles",
      highlights: [
        "GitHub Copilot, Claude & Gemini Workflows",
        "Windsurf & Codex AI-Driven Development",
        "Automated Code Quality & Security Verification",
        "Rapid Feature Prototyping & Turnaround",
      ],
    },
  ],

  skillsCategorized: [
    {
      category: "Backend",
      description: "Robust server-side logic, high-performance APIs & task queue engines",
      items: [
        { name: "Python", tag: "Primary Language" },
        { name: "Django & Django REST Framework", tag: "Web & API Engine" },
        { name: "Fastify", tag: "High-Speed Node API" },
        { name: "Celery & Redis", tag: "Task Queue Engine" },
        { name: "PHP", tag: "Server-side Scripting" },
        { name: "Java", tag: "Object-Oriented Core" },
      ]
    },
    {
      category: "Frontend",
      description: "Modern component architectures & state management systems",
      items: [
        { name: "React.js", tag: "UI Library" },
        { name: "Redux / Redux Toolkit", tag: "State Management" },
        { name: "Next.js", tag: "React Framework" },
        { name: "JavaScript (ES6+)", tag: "Core Language" },
        { name: "TypeScript", tag: "Type Safety" },
        { name: "Tailwind CSS", tag: "Styling Framework" },
        { name: "HTML5 / CSS3", tag: "Semantic Markup" },
        { name: "Bootstrap", tag: "UI Framework" },
      ]
    },
    {
      category: "Database & Storage",
      description: "Relational schema design, query optimization & multi-tenant data modeling",
      items: [
        { name: "PostgreSQL", tag: "Relational DB" },
        { name: "MySQL", tag: "Relational DB" },
        { name: "MongoDB", tag: "Document Store" },
        { name: "Multi-Tenant Schemas", tag: "Architecture" },
      ]
    },
    {
      category: "AI & Agents",
      description: "Multi-agent pipelines, cost-aware model routing & AI-assisted development",
      items: [
        { name: "Claude Agents (Opus / Sonnet / Haiku)", tag: "Agent Models" },
        { name: "Multi-Agent Pipelines", tag: "Orchestration" },
        { name: "Model Routing", tag: "Cost Optimization" },
        { name: "Claude Code", tag: "AI Dev Tool" },
        { name: "GitHub Copilot", tag: "AI Dev Tool" },
        { name: "Gemini", tag: "AI Dev Tool" },
      ]
    },
    {
      category: "Software Engineering & Infrastructure",
      description: "Single codebase multi-tenancy, security, containerization, deployment & post-deployment support",
      items: [
        { name: "Single Codebase Multi-Tenancy", tag: "Architecture" },
        { name: "REST APIs & Microservices", tag: "Integration" },
        { name: "Authentication & RBAC", tag: "Security" },
        { name: "Docker", tag: "Containerization" },
        { name: "Git & GitHub", tag: "Version Control" },
        { name: "CI/CD", tag: "Delivery" },
        { name: "Render & Cloudflare", tag: "Hosting & DNS" },
        { name: "System Support & Operations", tag: "Maintenance" },
      ]
    }
  ],

  experience: [
    {
      period: "Private Commercial Project",
      role: "Designer & Builder",
      company: "Agentic Website Factory",
      type: "Agentic AI System",
      description: "Multi-agent AI system for building corporate and school websites.",
      achievements: [
        "Designed 34 agent roles, each with a written contract defining its inputs, outputs and responsibilities, so work passes between agents in a fixed, checkable form.",
        "Built a 17-phase pipeline (research, business analysis, design, code, testing, audits, deploy) where every phase ends in a pass/fail gate, with human sign-off before key stages and go-live.",
        "Cut AI costs by routing each role to the cheapest capable model across Opus, Sonnet and Haiku sub-agents.",
        "Wrote Python tooling for schema validation, automated checks and fleet-wide changes across all sites from one toolset.",
        "Delivered 29 websites (25 live, 4 deploying) — 27 corporate and 2 school sites — each passing the same security, SEO, performance, accessibility and compliance audits. Examples: gensanfeedmill.com, vetsgrow.com.ph, primekatsu.com, sncfi.edu.ph, cheetahlogistics.com.ph."
      ],
      skills: ["Claude Agents", "Python", "Next.js", "TypeScript", "Tailwind CSS", "Django REST Framework", "PostgreSQL (CMS Studio)"],
    },
    {
      period: "July 2024 — Present",
      role: "Web Developer",
      company: "Classify Inc.",
      location: "Surallah, South Cotabato, Philippines",
      type: "Professional Experience",
      description: "Build and maintain enterprise and school management platforms used by about 3,000 students, faculty and staff across multiple client organizations.",
      achievements: [
        "Built the Business Management & Inventory System (BMIS), a multi-tenant platform with Celery workers for inventory auditing and purchase order processing, cutting stock count errors by roughly 80% and speeding up purchase order processing by about 5x.",
        "Developed an Asset Management System with barcode categorization, stock movement auditing and preventive maintenance scheduling, tracking about 1,000 items across 4 departments and cutting audit cycle times by roughly 65%.",
        "Engineered a multi-tenant Ticket Support & Task Management System with Kanban boards, SLA monitoring and automated escalation, served from a single codebase; handled around 500 tickets at about 98% SLA compliance and cut deployment maintenance overhead by roughly 70%.",
        "Co-built (3-developer team) a School Record Management System covering enrollment, grading and transcripts, with two-way LMS synchronization, digitizing records for about 2,000 students across 3 institutions.",
        "Designed a System Validation & Evaluation platform with weighted scoring and automated PDF certificate generation.",
        "Maintain school portal CMS platforms and provide post-deployment support, monitoring and client communication."
      ],
      skills: ["React", "Redux", "Fastify", "Celery", "Python", "Django", "DRF", "PostgreSQL", "Docker", "TypeScript", "Tailwind CSS", "Render", "Cloudflare"],
    },
    {
      period: "November 2023 — March 2024",
      role: "ICT Intern (OJT)",
      company: "Department of Agriculture",
      location: "Regional Field Office XII, South Cotabato",
      type: "Internship Experience",
      description: "Digitized internal service and travel workflows for regional government operations.",
      achievements: [
        "Built a Request Service System with multi-tier approvals and division routing, replacing a paper-based process and cutting approval time from about 3 days to around 4 hours across roughly 5 agency divisions.",
        "Built a Travel Order System with sequential authorization and automated PDF travel voucher generation.",
        "Designed MySQL schemas and role-based access for staff, division chiefs, regional directors and ICT admins; wrote ERDs and API specs."
      ],
      skills: ["PHP", "JavaScript", "MySQL", "Bootstrap", "REST APIs", "PDF generation"],
    },
  ],

  education: [
    {
      degree: "Bachelor of Science in Information Technology (BSIT)",
      institution: "Holy Child Central Colleges Inc.",
      period: "2020 — 2024",
      description: "Comprehensive foundation in software engineering, object-oriented design, relational database systems, and application architecture.",
    },
    {
      degree: "Full Stack Web Development (MERN Stack)",
      institution: "Zuitt Coding Bootcamp",
      period: "2023 — 2024",
      description: "Intensive engineering bootcamp focused on modern full-stack web development with MongoDB, Express, React, and Node.js.",
    },
  ],

  testimonials: [
    {
      name: "Burliegn Earl Ponce",
      role: "Co-Developer, School RMS",
      company: "Classify Inc.",
      text: "We go back to college as classmates, and working together again on the School RMS confirmed what I already knew — Jayzher picks up new stacks and unfamiliar project requirements incredibly fast. His speed of learning and adaptation kept our module handoffs smooth even under tight timelines.",
      rating: 5,
    },
    {
      name: "Royd Catalunes",
      role: "Software Developer",
      company: "Classify Inc.",
      text: "We collaborated closely connecting the LMS and RMS like a microsystem — academic histories from the LMS get stored in the RMS, while the RMS handles enrollment, subject loading, and schedule creation that the LMS receives to run the classes. Jayzher made that two-way handoff feel seamless, and his communication kept both sides in sync throughout.",
      rating: 5,
    },
    {
      name: "Johann Maguad",
      role: "ICTU Head",
      company: "Department of Agriculture — RFO XII",
      text: "Jayzher's Request Service System and Travel Order System were delivered efficiently and on schedule. His work ethic and consistency in project delivery made a noticeable difference to our department's turnaround time.",
      rating: 5,
    },
  ],
}
