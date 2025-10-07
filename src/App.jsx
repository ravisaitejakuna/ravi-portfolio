import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Download, Moon, Sun, ChevronDown, Cpu, Cloud, Database, Sparkles, Rocket } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

/** THEME **/
const accent = "from-sky-500 via-blue-600 to-indigo-600"; // tech-blue gradient
const glass = "backdrop-blur-md bg-white/60 dark:bg-white/5 border border-white/20";
const card = `rounded-2xl ${glass} shadow-xl`;

/** DATA (from resume) **/
const profile = {
  name: "RAVI SAI TEJA KUNA",
  title: "Software Developer | Cloud & Full‑Stack | ML Enthusiast",
  summary:
    "Engineer with experience across Java full‑stack, AWS/Azure cloud, DevOps, and applied ML/CV. Passionate about secure systems, elegant UI, and shipping resilient products.",
  location: "Potsdam, NY, USA",
  email: "kunar@clarkson.edu",
  phone: "315-603-8232",
  links: {
    github: "https://github.com/ravisaitejakuna",
    linkedin: "https://linkedin.com/in/ravisaitejakuna/",
    resume: "/resume.pdf", // place your PDF in public/resume.pdf
  },
};

const skills = {
  Languages: ["C++", "Java", "Python", "SQL"],
  "Web Tech": ["HTML", "CSS", "React"],
  Databases: ["MySQL", "MongoDB"],
  OS: ["Linux"],
  VCS: ["Git", "Jenkins"],
  Networking: ["Wireshark", "TCP/UDP", "IP routing", "SSH"],
  DevOps: ["Docker", "Nagios", "Ansible", "Kubernetes", "CI/CD", "YAML"],
  Cloud: ["AWS", "Azure", "EC2", "Cloud Infra"],
  Hardware: ["Raspberry Pi"],
};

const education = [
  {
    school: "Clarkson University",
    place: "Potsdam, New York",
    degree: "M.S. in Computer Science",
    period: "2024 – 2026",
    bullets: [
      "Advanced Algorithms",
      "Computer Networks",
      "Cryptography",
      "Fairness, Accountability & Transparency in AI",
      "Machine Learning",
    ],
  },
  {
    school: "Lovely Professional University",
    place: "Punjab, India",
    degree: "B.Tech in Computer Science",
    period: "2019 – 2023",
    bullets: [],
  },
];

const experience = [
  {
    role: "Research Assistant",
    org: "Clarkson University",
    period: "Jan 2025 – Apr 2025",
    bullets: [
      "Designed a custom 3D plane‑distance formula for keystroke dynamics weight calculations.",
      "Enhanced authentication accuracy via 3D keystroke pattern analysis for biometric security.",
      "Implemented the method to increase precision of user identification systems.",
    ],
  },
  {
    role: "Java Full‑Stack Engineer",
    org: "Cognizant Technology Solutions, Chennai, India",
    period: "Jan 2023 – Jun 2023",
    bullets: [
      "Shipped a resilient CarRental application on a Java stack for multi‑agency rental operations.",
      "Optimized workflows and improved operational efficiency with scalable backend services.",
      "Integrated SQL Server + JDBC; boosted data retrieval performance by ~30%.",
    ],
  },
];

const projects = [
  {
    title: "Human Emotion Detection — Computer Vision",
    period: "Oct 2024 – Dec 2024",
    tags: ["Python", "Ultralytics YOLOv8n", "OpenCV", "TensorFlow", "NLP"],
    bullets: [
      "Real‑time emotion detection pipeline (acquisition → preprocessing → features → recognition).",
      "Trained on 270 annotated images (640×640, 5 classes) via Roboflow; used YOLOv8n for speed/accuracy balance.",
    ],
  },
  {
    title: "Raspberry Pi‑Based Network Monitoring System",
    period: "Jun 2022 – Aug 2022",
    tags: ["Raspberry Pi", "Python", "Wireshark", "Linux", "SSH"],
    bullets: [
      "Built real‑time traffic analysis and anomaly detection with packet capture + logging.",
      "Automated scans & generated bandwidth/active‑connection reports; flagged suspicious IPs.",
    ],
  },
  {
    title: "Data Science Intern — Stock Analysis",
    period: "Jun 2021 – Jul 2021",
    tags: ["MySQL", "ETL", "Time Series", "Trend Decomposition"],
    bullets: [
      "Analyzed multi‑company stock datasets to inform buy/sell/hold strategies.",
      "Applied moving averages & decomposition to forecast performance and guide decisions.",
    ],
  },
];

const certs = [
  { name: "Machine Learning — Coursera", when: "Nov 2022" },
  { name: "Coders Combat — GeeksforGeeks", when: "Jun 2022" },
  { name: "Basics of Data Science — UpGrad", when: "Jun 2021" },
  { name: "Agriculture & Horticulture Plantation (NGO) — VMM", when: "Jul 2020" },
];

/** UTIL: Typewriter hook **/
function useTypewriter(text, speed = 75, delay = 350) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let i = 0;
    const startTimer = setTimeout(() => {
      const id = setInterval(() => {
        setOutput((prev) => (i < text.length ? prev + text[i++] : prev));
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [text, speed, delay]);
  return output;
}

/** Dark mode toggle **/
function useDarkMode() {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("theme") === "dark" : false
  );
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  return { dark, setDark };
}

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fade}
        className={`max-w-6xl mx-auto px-4 ${card} p-8`}
      >
        <div className="flex items-center gap-3 mb-6">
          {icon}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function Chip({ children }) {
  return (
    <span className="text-xs md:text-sm px-3 py-1 rounded-full border border-white/30 bg-white/10 dark:bg-white/5">
      {children}
    </span>
  );
}

export default function App() {
  const { dark, setDark } = useDarkMode();
  const typedName = useTypewriter("Hi, I'm Ravi Sai Teja Kuna");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const hue = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900">
      {/* Top progress */}
      <motion.div style={{ scaleX }} className={`fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r ${accent} z-50`} />

      {/* Aurora */}
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ filter: "blur(64px)" }}>
        <motion.div style={{ rotate: hue }} className="absolute -top-40 -left-40 w-[50vw] h-[50vw] rounded-full opacity-40 bg-gradient-to-tr from-sky-400 via-blue-400 to-indigo-400" />
        <motion.div style={{ rotate: hue }} className="absolute -bottom-40 -right-40 w-[50vw] h-[50vw] rounded-full opacity-30 bg-gradient-to-tr from-indigo-400 via-cyan-400 to-emerald-400" />
      </motion.div>

      {/* NAV */}
      <nav className={`sticky top-0 z-40 ${glass} py-3`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <a href="#home" className="font-bold tracking-tight">Ravi.dev</a>
          <div className="flex items-center gap-4 text-sm">
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
            <a href="#certs">Certifications</a>
            <a href="#contact">Contact</a>
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDark(!dark)}
              className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/20 bg-white/10 dark:bg-white/5"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden md:inline">{dark ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }} className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm uppercase tracking-wider opacity-70">Available for internships & full‑time roles</p>
            <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-tight">
              <Typewriter
  words={["Hi, I'm Ravi Sai Teja Kuna"]}
  loop={false}
  cursor
  cursorStyle="▮"
  typeSpeed={60}
  deleteSpeed={50}
  delaySpeed={1000}
/>

              <span className="animate-pulse">▮</span>
            </h1>
            <p className="mt-2 text-lg opacity-90">{profile.title}</p>
            <p className="mt-4 opacity-80">{profile.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={profile.links.linkedin} target="_blank" className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${glass}`}>
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href={profile.links.github} target="_blank" className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${glass}`}>
                <Github size={18} /> GitHub
              </a>
              <a href={`mailto:${profile.email}`} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${glass}`}>
                <Mail size={18} /> Email
              </a>
              <a href={profile.links.resume} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${glass}`}>
                <Download size={18} /> Resume
              </a>
            </div>

            <div className="mt-6 text-sm opacity-80 flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2"><Phone size={16} /> {profile.phone}</span>
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Floating cards */}
          <div className="relative h-72 md:h-96">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className={`absolute right-4 top-4 p-4 ${card}`}>
              <div className="flex items-center gap-2">
                <Cpu className="opacity-80" /> <span>Algorithms</span>
              </div>
              <p className="mt-2 text-sm opacity-80">Advanced Algorithms, Cryptography</p>
            </motion.div>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: -10, opacity: 1 }} transition={{ duration: 1, delay: 0.15 }} className={`absolute left-0 bottom-6 p-4 ${card}`}>
              <div className="flex items-center gap-2">
                <Cloud className="opacity-80" /> <span>Cloud + DevOps</span>
              </div>
              <p className="mt-2 text-sm opacity-80">AWS, Azure, Docker, K8s, CI/CD</p>
            </motion.div>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, delay: 0.3 }} className={`absolute right-10 bottom-2 p-4 ${card}`}>
              <div className="flex items-center gap-2">
                <Database className="opacity-80" /> <span>Data</span>
              </div>
              <p className="mt-2 text-sm opacity-80">MySQL, MongoDB, Time Series</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <a href="#skills" className="inline-flex items-center gap-2 opacity-80 hover:opacity-100">
            <ChevronDown /> Explore my work
          </a>
        </div>
      </header>

      {/* SKILLS */}
      <Section id="skills" title="Technical Skills" icon={<Sparkles className="opacity-80" />}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skills).map(([k, arr]) => (
            <motion.div key={k} whileHover={{ y: -4 }} className={`p-5 rounded-xl ${glass}`}>
              <p className="text-sm uppercase tracking-wider opacity-70 mb-2">{k}</p>
              <div className="flex flex-wrap gap-2">
                {arr.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience" icon={<Rocket className="opacity-80" />}>
        <div className="space-y-6">
          {experience.map((e) => (
            <motion.div key={e.role} whileHover={{ scale: 1.01 }} className={`p-6 rounded-xl ${glass}`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  <p className="opacity-80">{e.org}</p>
                </div>
                <p className="text-sm opacity-70">{e.period}</p>
              </div>
              <ul className="mt-3 list-disc list-inside space-y-1 opacity-90">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" icon={<Sparkles className="opacity-80" />}>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <motion.article key={p.title} whileHover={{ y: -6 }} className={`p-6 rounded-2xl ${glass} shadow-lg`}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <span className="text-xs opacity-70">{p.period}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <ul className="mt-3 list-disc list-inside space-y-1 opacity-90">
                {p.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" title="Education" icon={<Sparkles className="opacity-80" />}>
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((ed) => (
            <motion.div key={ed.school} whileHover={{ scale: 1.01 }} className={`p-6 rounded-xl ${glass}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{ed.school}</h3>
                  <p className="opacity-80">{ed.degree}</p>
                </div>
                <span className="text-sm opacity-70">{ed.period}</span>
              </div>
              {ed.place && <p className="mt-1 text-sm opacity-70">{ed.place}</p>}
              {ed.bullets?.length > 0 && (
                <ul className="mt-3 list-disc list-inside space-y-1 opacity-90">
                  {ed.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CERTS */}
      <Section id="certs" title="Certifications" icon={<Sparkles className="opacity-80" />}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((c) => (
            <motion.div key={c.name} whileHover={{ y: -4 }} className={`p-4 rounded-xl ${glass}`}>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm opacity-70">{c.when}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Get in touch" icon={<Mail className="opacity-80" />}>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = Object.fromEntries(new FormData(form).entries());
              const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
              const body = encodeURIComponent(`${data.message}\n\nFrom: ${data.name} <${data.email}>`);
              window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
            }}
            className={`p-6 rounded-xl ${glass} space-y-3`}
          >
            <div>
              <label className="text-sm opacity-70">Name</label>
              <input name="name" required className="w-full mt-1 px-3 py-2 rounded-lg bg-transparent border border-white/30 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm opacity-70">Email</label>
              <input type="email" name="email" required className="w-full mt-1 px-3 py-2 rounded-lg bg-transparent border border-white/30 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm opacity-70">Message</label>
              <textarea name="message" rows={5} required className="w-full mt-1 px-3 py-2 rounded-lg bg-transparent border border-white/30 focus:outline-none" />
            </div>
            <button className={`px-4 py-2 rounded-xl bg-gradient-to-r ${accent} text-white font-semibold`}>Send</button>
          </form>

          <div className={`p-6 rounded-xl ${glass}`}>
            <p className="opacity-80">Prefer email or a quick call?</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail size={16}/> <a href={`mailto:${profile.email}`}>{profile.email}</a></div>
              <div className="flex items-center gap-2"><Phone size={16}/> <a href={`tel:${profile.phone}`}>{profile.phone}</a></div>
              <div className="flex items-center gap-2"><Linkedin size={16}/> <a target="_blank" href={profile.links.linkedin}>LinkedIn</a></div>
              <div className="flex items-center gap-2"><Github size={16}/> <a target="_blank" href={profile.links.github}>GitHub</a></div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-10 text-center opacity-70">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React + Tailwind + Framer Motion.</p>
      </footer>
    </div>
  );
}
