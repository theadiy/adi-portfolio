import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, Cpu, Code2, Github, Linkedin, Mail, Play, Pause, X, Sparkles, Boxes, Keyboard, Wand2 } from "lucide-react";

/**
 * Aditya — Hacker‑Theme Showcase (One‑Page)
 * Focus: SHOWCASE > selling. Unique, terminal/CRT vibes, out-of-the-box animations.
 * Stack: React + Tailwind + Framer Motion (no external CSS frameworks).
 * How it feels: A living lab console where projects are "runnable" panels.
 */

// === THEME TOGGLES ==========================================================
const useKey = (key, handler) => {
  useEffect(() => {
    const fn = (e) => e.key === key && handler(e);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [key, handler]);
};

// === MATRIX RAIN BACKDROP ====================================================
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h;
    const setSize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const fontSize = 14;
    const columns = () => Math.floor(w / fontSize);
    let drops = new Array(columns()).fill(1);

    let raf;
    const draw = () => {
      // translucent black to create trail
      ctx.fillStyle = "rgba(2,8,23,0.2)"; // slate-950 w/ alpha
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillStyle = Math.random() > 0.97 ? "#22d3ee" : "#22c55e"; // cyan/green
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-40" />;
}

// === UI PRIMS ===============================================================
const crt = "before:pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] before:bg-[length:100%_2px] before:opacity-20";

function Card({ children, className = "" }) {
  return (
    <div className={`relative border border-emerald-400/30 bg-black/40 backdrop-blur-sm rounded-xl ${crt} ${className}`}>
      <div className="absolute inset-0 rounded-xl ring-1 ring-emerald-400/20 shadow-[0_0_40px_-10px_#10b981]" />
      <div className="relative p-5">{children}</div>
    </div>
  );
}

function Glitch({ text }) {
  return (
    <div className="relative inline-block select-none">
      <span className="relative z-10 text-emerald-300">{text}</span>
      <span className="absolute left-0 top-0 -z-0 translate-x-0.5 translate-y-0.5 text-cyan-300 opacity-60">
        {text}
      </span>
      <span className="absolute left-0 top-0 -z-0 -translate-x-0.5 -translate-y-0.5 text-fuchsia-300 opacity-50">
        {text}
      </span>
    </div>
  );
}

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.6, delay: d } });

// === DATA ===================================================================
// === DATA ===================================================================
const PROJECTS = [
  {
	id: "ai-report-maker",
	title: "AI-Report-Maker-OpenAI",
	blurb: "AI-based Report Builder for web application pentesting. Requires an OpenAI API key.",
	stack: ["HTML", "OpenAI API", "Pentest Reports"],
	actions: ["demo", "readme", "code"],
	},
  {
    id: "nessus-auto-report",
    title: "NessusAutomateReportScreenshotIntegration",
    blurb:
      "Takes Nessus IP & scan name → auto-creates DOCX report with captured screenshots. Opinionated Nessus settings for clean output.",
    stack: ["Python", "Automation", "Nessus"],
    actions: ["readme", "screens", "code"],
  },
  {
    id: "certin-revise",
    title: "CertinReviseReportMaker",
    blurb:
      "Converts Nessus CSV into CERT-IN compliant DOCX template with tidy formatting and sections.",
    stack: ["Python", "Reporting", "Nessus"],
    actions: ["readme", "export"],
  },
  {
    id: "fortify-xml-doc",
    title: "FortifySCAReportXMLtoDoc",
    blurb:
      "Transforms legacy Fortify SCA XML findings into a structured Word report (DOCX).",
    stack: ["Python", "Fortify", "DOCX"],
    actions: ["readme", "example"],
  },
  {
    id: "fortify-resan-gui",
    title: "FortifySCAResanGUI",
    blurb:
      "GUI tool to compare Fortify SCA XML files and surface repetitive/recurring findings.",
    stack: ["Python", "GUI", "Fortify"],
    actions: ["screens", "code"],
  },
  {
    id: "luna",
    title: "Luna",
    blurb:
      "Offline desktop ASR lab (Vosk) with automation glue: hotkeys, windows control, logging—my sandbox for speech & scripting.",
    stack: ["Python", "Vosk", "Automation"],
    actions: ["readme", "demo"],
  },

  // keep your earlier showcase items too:
  {
    id: "nextcloud",
    title: "Nextcloud Personal VPC",
    blurb:
      "Hardened Ubuntu + verification script: bi-directional diff, color coded, size match.",
    stack: ["Linux", "Nextcloud", "Python"],
    actions: ["readme", "screens", "code"],
  },
  {
    id: "falco",
    title: "Falco → Loki → Grafana",
    blurb:
      "Runtime rules streaming to pretty dashboards; custom parsers & alerts.",
    stack: ["Falco", "Loki", "Grafana"],
    actions: ["demo", "rules"],
  },
  {
    id: "vaptkit",
    title: "VAPT Automation Kit",
    blurb:
      "Orchestrates scans, parses results, emits client-ready docs with PoCs.",
    stack: ["Python", "Node", "CLI"],
    actions: ["code", "run"],
  },
];


// === LIVE CONSOLE (auto-stream loop) ========================================
const LOGS = [
  "[ok] parsed 42 alerts from falco",
  "[ok] synced nextcloud ✓",
  "[ok] generated PoC docx (jwt-bypass)",
  "[warn] rate-limit missing on /otp",
  "[ok] pushed grafana dashboard update",
  "[ok] uploaded report to nextcloud /clients/upi/sec-review.docx",
  "[info] reran jwt-signer confusion PoC",
];

function LiveConsole() {
  const [lines, setLines] = useState(["$ whoami", "aditya", "$ tail -f today.log"]);
  const scroller = useRef(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, LOGS[i]];
        return next.length > 80 ? next.slice(-80) : next; // cap lines
      });
      i = (i + 1) % LOGS.length;
    }, 1600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!scroller.current) return;
    scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [lines]);

  return (
    <pre ref={scroller} className="mt-3 h-48 overflow-auto text-[12px] leading-6 text-emerald-200/90 font-mono">
      {lines.map((l, idx) => (
        <div key={idx}>$ {l}</div>
      ))}
    </pre>
  );
}

// === COMMAND PALETTE (K to open) ============================================
function CommandPalette({ open, onClose }) {
  const items = [
    { id: "about", label: "About", k: "go" },
    { id: "projects", label: "Projects", k: "go" },
    { id: "skills", label: "Skills", k: "go" },
    { id: "contact", label: "Contact", k: "go" },
    { id: "theme", label: "Toggle CRT", k: "ctrl+`" },
  ];
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} className={`mx-auto mt-24 w-[min(680px,92vw)] ${crt} border border-emerald-400/30 rounded-2xl bg-slate-950/90 shadow-2xl`}> 
            <div className="flex items-center gap-2 px-4 py-3 border-b border-emerald-400/20">
              <Keyboard className="w-4 h-4 text-emerald-300" />
              <span className="text-sm text-emerald-200/90">Command Palette — press Esc to close</span>
            </div>
            <ul className="p-2">
              {items.map((it) => (
                <li key={it.id} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
                  <span className="text-emerald-200/90">{it.label}</span>
                  <span className="text-xs text-emerald-300/70">{it.k}</span>
                </li>
              ))}
            </ul>
            <div className="px-4 py-3 flex justify-end">
              <button onClick={onClose} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-emerald-400/30 text-emerald-200 hover:bg-white/5">
                <X className="w-4 h-4" /> Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// === INTERACTIVE CONSOLE ====================================================
function InteractiveConsole({ onToggleCRT }) {
  const [lines, setLines] = React.useState(["$ whoami", "aditya", "$ help (type and press Enter)"]);
  const [cmd, setCmd] = React.useState("");
  const wrapRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const add = (text) => setLines((prev) => [...prev, text]);

  React.useEffect(() => {
    if (wrapRef.current) wrapRef.current.scrollTop = wrapRef.current.scrollHeight;
  }, [lines]);

  const run = (input) => {
    if (!input) return;
    const [base, ...rest] = input.trim().split(/\s+/);
    switch (base) {
      case "help":
        add("Commands: help, whoami, projects, open <id>, cat notes.md, echo <text>, clear, theme");
        add("Sections as <id>: about, projects, skills, contact. Project ids: nextcloud, falco, vaptkit");
        break;
      case "whoami":
        add("aditya");
        break;
      case "projects":
        PROJECTS.forEach((p) => add(`- ${p.id} — ${p.title}`));
        break;
      case "open": {
        const id = rest[0];
        if (!id) { add("usage: open <about|projects|skills|contact|project-id>"); break; }
        const target = document.querySelector(`#${id}`) || document.querySelector(`[data-id="${id}"]`);
        if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); add(`[nav] scrolled to ${id}`); }
        else { add(`[nav] unknown id: ${id}`); }
        break;
      }
      case "cat": {
        const file = rest.join(" ");
        if (file === "notes.md") {
          ["# lab notes", "- jwt alg:none check", "- otp rate-limit", "- nextcloud verify"].forEach((l) => add(l));
        } else add(`cat: ${file}: No such file`);
        break;
      }
      case "echo":
        add(rest.join(" "));
        break;
      case "clear":
        setLines([]);
        break;
      case "theme":
        onToggleCRT && onToggleCRT();
        add("toggled CRT");
        break;
      default:
        add(`command not found: ${base}`);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      const input = cmd;
      setCmd("");
      add(`$ ${input}`);
      run(input);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="mt-3 h-48 overflow-auto text-[12px] leading-6 text-emerald-200/90 font-mono border border-emerald-400/20 rounded-md p-2"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((l, idx) => (
        <div key={idx}>{l}</div>
      ))}
      <div className="flex items-center">
        <span className="text-emerald-300 mr-2">$</span>
        <input
          ref={inputRef}
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 bg-transparent outline-none placeholder-emerald-300/40"
          placeholder="type 'help' and press Enter"
        />
      </div>
    </div>
  );
}


// === MAIN ===================================================================
export default function Portfolio() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [palette, setPalette] = useState(false);
  const [crtOn, setCrtOn] = useState(true);

  useKey("k", (e) => { if (e.metaKey || e.ctrlKey) { e.preventDefault(); setPalette(true); } });
  useKey("Escape", () => setPalette(false));
  useKey("`", (e) => { if (e.ctrlKey) setCrtOn((v) => !v); });

  return (
    <main className={`relative min-h-screen text-emerald-100 bg-slate-950 ${crtOn ? '' : 'before:hidden'}`}>
      <MatrixRain />

      {/* TOP BAR */}
      <div className="sticky top-0 z-40 border-b border-emerald-400/20 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalSquare className="w-5 h-5 text-emerald-300" />
            <span className="font-mono tracking-tight">aditya.sh — showcase</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <a href="#about" className="hover:text-emerald-300">about</a>
            <a href="#projects" className="hover:text-emerald-300">projects</a>
            <a href="#skills" className="hover:text-emerald-300">skills</a>
            <a href="#contact" className="hover:text-emerald-300">contact</a>
            <button onClick={() => setPalette(true)} className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-emerald-400/30 hover:bg-white/5">
              <Wand2 className="w-4 h-4" />
              <span className="hidden md:inline">palette</span>
              <kbd className="ml-1 text-[10px] text-emerald-300/70">Ctrl</kbd>
              <kbd className="text-[10px] text-emerald-300/70">K</kbd>
            </button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <header id="home" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <motion.div {...fadeUp(0)} className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight font-mono">
              <Glitch text="Aditya Sawant" />
            </h1>
            <p className="mt-4 text-emerald-200/80 font-mono">Security engineer crafting small, sharp tools and clean write‑ups. This page is my lab log — not a brochure.</p>
            <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs">
              {["web-vapt","api","android/ios","thick-client","automation","owasp","sans"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full border border-emerald-400/30 bg-black/30">{t}</span>
              ))}
            </div>
            <div className="mt-6 flex gap-4 text-sm font-mono">
              <a href="mailto:sawantaditya44@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-emerald-400/30 hover:bg-white/5"><Mail className="w-4 h-4"/>email</a>
              <a href="https://github.com/theadiy" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-emerald-400/30 hover:bg-white/5"><Github className="w-4 h-4"/>github</a>
              <a href="https://www.linkedin.com/in/aditya-d-sawant" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-emerald-400/30 hover:bg-white/5"><Linkedin className="w-4 h-4"/>linkedin</a>
            </div>
          </div>
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between font-mono text-xs text-emerald-300/80">
              <span className="inline-flex items-center gap-2"><Cpu className="w-4 h-4"/> live console</span>
              <span>press <kbd className="px-1 bg-white/10 rounded">ctrl</kbd>+<kbd className="px-1 bg-white/10 rounded">k</kbd></span>
            </div>
            <InteractiveConsole onToggleCRT={() => setCrtOn((v) => !v)} />
          </Card>
        </motion.div>
      </header>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-10">
        <motion.h2 {...fadeUp(0)} className="font-mono text-2xl flex items-center gap-2"><Boxes className="w-5 h-5 text-emerald-300"/> projects</motion.h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div key={p.id} data-id={p.id} {...fadeUp(i * 0.05)} className="group">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-emerald-200">{p.title}</div>
                    <p className="text-sm text-emerald-200/80 mt-1">{p.blurb}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
                  {p.stack.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded border border-emerald-400/30">{s}</span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
                  {p.actions.map((a) => (
                    <button key={a} className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-emerald-400/30 hover:bg-white/5">
                      <Code2 className="w-3.5 h-3.5"/> {a}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SKILLS (ASCII bars) */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-10">
        <motion.h2 {...fadeUp(0)} className="font-mono text-2xl flex items-center gap-2"><Sparkles className="w-5 h-5 text-emerald-300"/> skills</motion.h2>
        <Card className="mt-6">
          <ul className="font-mono text-sm space-y-2">
            {[
              ["burp", 92],
              ["nmap/nessus", 88],
              ["postman/apisec", 86],
              ["frida/objection", 80],
              ["fortify sca", 82],
              ["metasploit", 78],
              ["java/python", 75],
            ].map(([name, val]) => (
              <li key={name} className="flex items-center gap-3">
                <span className="w-40 text-emerald-200/80">{name}</span>
                <span className="grow bg-white/10 rounded h-2 overflow-hidden">
                  <motion.span className="block h-full bg-emerald-400/80" initial={{ width: 0 }} whileInView={{ width: `${val}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }}/>
                </span>
                <span className="w-12 text-right text-emerald-300/80">{val}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-10">
        <Card>
          <div className="grid sm:grid-cols-3 gap-4 font-mono text-sm">
            <a href="mailto:sawantaditya44@gmail.com" className="inline-flex items-center gap-2 hover:text-emerald-300"><Mail className="w-4 h-4"/> sawantaditya44@gmail.com</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-emerald-300"><Github className="w-4 h-4"/> github</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-emerald-300"><Linkedin className="w-4 h-4"/> linkedin</a>
          </div>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-emerald-400/20">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-80 font-mono">
          <div>© {year} aditya.sh — lab log</div>
          <div className="text-emerald-300/80">press <kbd className="px-1 bg-white/10 rounded">ctrl</kbd>+<kbd className="px-1 bg-white/10 rounded">k</kbd> for palette · <kbd className="px-1 bg-white/10 rounded">ctrl</kbd>+<kbd className="px-1 bg-white/10 rounded">`</kbd> CRT</div>
        </div>
      </footer>

      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </main>
  );
}
