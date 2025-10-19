import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Bug,
  Network,
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Award,
  BadgeCheck,
  Briefcase,
  Sparkles,
} from "lucide-react";

// NOTE: Single-file animated portfolio component.
// TailwindCSS for styles, Framer Motion for animations, lucide-react for icons.

const TAGS = [
  "Web App VAPT",
  "Mobile (Android/iOS)",
  "API Security",
  "Thick Client",
  "SAST/DAST",
  "PCI-DSS",
  "OWASP Top 10",
  "SANS 25",
  "Automation Scripts",
];

const SKILLS = [
  { name: "Burp Suite", level: 92 },
  { name: "Nmap / Nessus", level: 88 },
  { name: "Postman / APIsec", level: 86 },
  { name: "Frida / Objection", level: 80 },
  { name: "Fortify SCA", level: 82 },
  { name: "Metasploit", level: 78 },
  { name: "Java / Python", level: 75 },
];

const CERTS = [
  { title: "eWPTXv2 — iNE Security", icon: <BadgeCheck  className="w-5 h-5" /> },
  { title: "Fortify SCA & SSC Certified Practitioner — Micro Focus", icon: <Award className="w-5 h-5" /> },
];

const EXPERIENCE = [
  {
    role: "Sr. Security Analyst",
    org: "QRC Assurance & Solutions Pvt. Ltd.",
    period: "Jul 2024 — Present",
    bullets: [
      "Lead & mentor analysts; drive security service improvements.",
      "Build automation to streamline reporting & repetitive tasks.",
      "Collaborate with dev teams to triage & remediate findings.",
      "Deliver detailed PoC reports & strategic remediation guidance.",
    ],
  },
  {
    role: "Security Analyst",
    org: "QRC Assurance & Solutions Pvt. Ltd.",
    period: "Apr 2021 — Jun 2024",
    bullets: [
      "VAPT across Web, Mobile, API, POS & Thick Client; internal & external.",
      "DAST/SAST workflows; OWASP Top 10 & SANS 25 aligned reporting.",
      "PCI ASV scans; exposure to Qualys, Nessus, Nmap & more.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Automation Toolkit for VAPT",
    desc:
      "Python/Node utilities to orchestrate scans, parse results, and generate client-ready reports with PoCs.",
    tags: ["Python", "Node", "Reporting", "CI/CD"],
  },
  {
    title: "Nextcloud Personal VPC",
    desc:
      "Self-hosted file sync with verification scripts, colored diff, and chunk-safe uploads on a hardened Ubuntu VPC.",
    tags: ["Linux", "Nextcloud", "DevOps", "Security"],
  },
  {
    title: "Falco → Loki → Grafana",
    desc:
      "Runtime security events piped into Grafana dashboards with custom parsers and alerting rules.",
    tags: ["Falco", "Loki", "Grafana"],
  },
];

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true, amount: 0.3 },
});

const blob = (className = "") => (
  <div className={`absolute blur-3xl opacity-40 pointer-events-none ${className}`} aria-hidden />
);

function Progress({ value }) {
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-white/70"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur text-xs tracking-wide">
      {children}
    </span>
  );
}

function SectionTitle({ icon, title, subtitle }) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-2">
          {icon}
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/70 text-sm mt-1 max-w-prose">{subtitle}</p>
        )}
      </div>
      <Sparkles className="w-5 h-5 text-white/50" />
    </div>
  );
}

export default function Portfolio() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden bg-slate-950">
      {/* Animated gradient background */}
      {blob("w-[32rem] h-[32rem] bg-fuchsia-500 -top-24 -left-10 animate-pulse")} 
      {blob("w-[28rem] h-[28rem] bg-indigo-500 top-40 -right-10 animate-[pulse_3s_ease-in-out_infinite]")}
      {blob("w-[20rem] h-[20rem] bg-cyan-500 -bottom-24 left-1/2 -translate-x-1/2 animate-[pulse_4s_ease-in-out_infinite]")}

      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">Aditya Sawant</a>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#skills" className="hover:opacity-80">Skills</a>
            <a href="#experience" className="hover:opacity-80">Experience</a>
            <a href="#projects" className="hover:opacity-80">Projects</a>
            <a href="#certs" className="hover:opacity-80">Certifications</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="home" className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <motion.div {...fadeIn(0)} className="flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Cyber Security Analyst focused on
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-indigo-300 to-cyan-300">
                VAPT · Web · Mobile · API · Thick Client
              </span>
            </h1>
            <p className="mt-4 text-white/80 max-w-2xl">
              I help teams ship safer software by uncovering vulnerabilities, building crisp PoC reports, and partnering with devs on pragmatic fixes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {TAGS.map((t, i) => (
                <motion.div key={t} {...fadeIn(0.02 * i)}>
                  <Badge>{t}</Badge>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:sawantaditya44@gmail.com"
                className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-semibold hover:opacity-90"
              >
                Contact Me
              </a>
              <a
                href="#projects"
                className="px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/10"
              >
                View Projects
              </a>
            </div>
            <div className="mt-6 flex gap-5 text-white/80">
              <a href="tel:+919527365787" className="inline-flex items-center gap-2 hover:opacity-80">
                <Phone className="w-4 h-4" /> +91 95273 65787
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Badlapur, India
              </span>
            </div>
          </div>
          {/* Hero Card */}
          <motion.div {...fadeIn(0.15)} className="flex-1 w-full">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-2xl">
              <div className="absolute -top-6 -left-6 rotate-[-8deg]">
                <div className="flex items-center gap-2 rounded-2xl px-3 py-2 bg-black/60 border border-white/10">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">Security First</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                  <div className="text-xs opacity-70">Specialties</div>
                  <div className="mt-1 font-semibold">Web · Mobile · API</div>
                </div>
                <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                  <div className="text-xs opacity-70">Approach</div>
                  <div className="mt-1 font-semibold">Manual + Automated</div>
                </div>
                <div className="col-span-2 rounded-2xl bg-black/30 border border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <Bug className="w-4 h-4 opacity-80" />
                    <div>
                      <div className="text-xs opacity-70">Reporting</div>
                      <div className="font-semibold">Actionable PoCs & fixes</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 rotate-[6deg]">
                <div className="flex items-center gap-2 rounded-2xl px-3 py-2 bg-black/60 border border-white/10">
                  <Network className="w-4 h-4" />
                  <span className="text-xs">Enterprise Ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <motion.div {...fadeIn(0)}>
          <SectionTitle
            title="About"
            subtitle="4+ years across banking, government, and service providers—delivering end-to-end security testing and clear communication with stakeholders."
          />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-white/80 leading-relaxed">
                I specialize in VAPT for Web, Mobile, API, and Thick-Client. I
                enjoy building tiny automations that reduce repetition and make
                reports clearer. I’ve trained juniors, collaborated with devs,
                and shipped detailed reports that map to OWASP Top-10 and SANS
                25.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm opacity-80 mb-3">Highlights</div>
              <ul className="space-y-2 text-sm">
                <li>100+ client engagements</li>
                <li>OWASP · PCI-DSS aligned workflows</li>
                <li>Hands-on with Fortify, Qualys, Nessus</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
        <motion.div {...fadeIn(0)}>
          <SectionTitle
            title="Skills"
            subtitle="Tools I reach for most often, with a rough self-assessment."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.name}
                {...fadeIn(0.03 * i)}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm opacity-70">{s.level}%</div>
                </div>
                <div className="mt-3">
                  <Progress value={s.level} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-12">
        <motion.div {...fadeIn(0)}>
          <SectionTitle
            icon={<Briefcase className="w-6 h-6" />}
            title="Experience"
            subtitle="What I did and how I helped."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {EXPERIENCE.map((job, i) => (
              <motion.div
                key={job.role}
                {...fadeIn(0.05 * i)}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">{job.role}</div>
                    <div className="text-sm opacity-80">{job.org}</div>
                  </div>
                  <div className="text-xs opacity-70">{job.period}</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {job.bullets.map((b) => (
                    <li key={b} className="leading-relaxed">
                      • {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
        <motion.div {...fadeIn(0)}>
          <SectionTitle
            title="Projects"
            subtitle="A few things I’ve built or contributed to recently."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeIn(0.05 * i)}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
              >
                <div className="font-semibold text-lg group-hover:translate-x-0.5 transition-transform">
                  {p.title}
                </div>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Certifications */}
      <section id="certs" className="mx-auto max-w-6xl px-4 py-12">
        <motion.div {...fadeIn(0)}>
          <SectionTitle icon={<Award className="w-6 h-6" />} title="Certifications" />
          <div className="grid md:grid-cols-2 gap-6">
            {CERTS.map((c, i) => (
              <motion.div
                key={c.title}
                {...fadeIn(0.05 * i)}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 flex items-center gap-3"
              >
                {c.icon}
                <div className="font-medium">{c.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
        <motion.div {...fadeIn(0)}>
          <SectionTitle
            title="Let’s work together"
            subtitle="Open to security assessments, audits, and security automation projects."
          />
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="mailto:sawantaditya44@gmail.com"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <div className="font-semibold">Email</div>
              </div>
              <div className="mt-2 text-sm opacity-80">sawantaditya44@gmail.com</div>
            </a>
            <a
              href="tel:+919527365787"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <div className="font-semibold">Phone</div>
              </div>
              <div className="mt-2 text-sm opacity-80">+91 95273 65787</div>
            </a>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <div className="font-semibold">Location</div>
              </div>
              <div className="mt-2 text-sm opacity-80">Badlapur, India</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-80">
          <div>© {year} Aditya Sawant • Sharing knowledge and fun | © 2025 Aditya</div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-80"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-80"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
