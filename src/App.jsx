import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const NAV = ["About", "Experience", "Skills", "Projects", "Certifications", "Contact"];
const BASE = import.meta.env.BASE_URL;

const EXPERIENCE = [
  {
    title: "Data Operations & Analyst Intern",
    company: "Sodexo — Clarkson University",
    location: "Potsdam, NY",
    period: "Aug 2025 – May 2026",
    color: "#0ea5e9",
    bullets: [
      "Performed data entry, validation, and quality checks on 500+ inventory, post-production, workforce, and invoice records weekly using Microsoft Excel, ensuring 100% data accuracy and regulatory compliance.",
      "Conducted post-production analysis on inventory usage, food waste, and cost trends using Excel pivot tables across 20+ weekly reporting cycles, surfacing actionable insights for management stakeholders.",
      "Designed and delivered 15+ executive-ready KPI dashboards and performance reports using Power BI, translating raw operational data into data-driven decisions across multiple departments.",
      "Managed end-to-end invoice processing and inventory documentation workflows for 100+ transactions per cycle using SwitchBoard Drive.",
    ],
  },
  {
    title: "Research Assistant — Biometric Authentication",
    company: "Clarkson University",
    location: "Potsdam, NY",
    period: "Nov 2024 – Apr 2026",
    color: "#8b5cf6",
    bullets: [
      "Designed and developed a full-stack biometric authentication web application using Java and Spring Boot, exposing RESTful APIs to collect, store, and process 10,000+ keystroke coordinate samples.",
      "Built responsive frontend interfaces using React.js, HTML5, and CSS3 to visualize biometric authentication results, integrating with Java Spring Boot backend services via RESTful API calls.",
      "Engineered Java-based data processing modules following OOP design principles to extract, transform, and analyze 3D spatial keystroke patterns across X, Y, and Z axes.",
      "Optimized MySQL database schemas and JDBC API queries for large-scale biometric datasets, improving data access performance across 50+ user samples.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Cognizant Technology Solutions",
    location: "Hyderabad, India",
    period: "Jan 2022 – Jun 2024",
    color: "#10b981",
    bullets: [
      "Architected and delivered microservices-based full-stack enterprise applications using Java, Spring Boot, Spring MVC, and React.js with RESTful and SOAP web service integrations in Agile/Scrum environments.",
      "Optimized SQL Server and MySQL query performance through JDBC API tuning, stored procedures, and indexing strategies, achieving 30% improvement in data retrieval efficiency.",
      "Engineered responsive frontend UI components using React.js, HTML5, CSS3, Servlets, and JSP, improving enterprise user experience across multi-agency workflows.",
      "Deployed cloud-ready Java EE applications on AWS EC2 with CloudWatch monitoring, ensuring 99.9% uptime, high availability, and real-time alerting.",
      "Implemented containerized deployment pipelines using Docker, Kubernetes, and Ansible, automating infrastructure provisioning and scaling.",
      "Integrated relational (MySQL, PostgreSQL) and NoSQL (MongoDB, Cassandra) databases to support distributed enterprise data architectures.",
      "Automated CI/CD workflows using Jenkins and Git, resolving production and QA defects within Jira-tracked Agile sprints.",
    ],
  },
  {
    title: "Data Science Intern",
    company: "UpGrad",
    location: "Remote, India",
    period: "Jun 2021 – Aug 2021",
    color: "#f59e0b",
    bullets: [
      "Analyzed financial market data for 6 companies using MySQL ETL pipelines, building structured datasets for time series forecasting and investment strategy modeling.",
      "Applied moving average and trend decomposition techniques in Python to generate buy/sell/hold recommendations for financial decision-making.",
      "Engineered and optimized MySQL queries using UDFs and stored procedures, automating data retrieval workflows and reducing manual processing effort.",
    ],
  },
];

const SKILLS = [
  { category: "Languages", icon: "💻", items: ["Java", "Python", "SQL", "JavaScript", "TypeScript", "C# (Basic)", "MATLAB"] },
  { category: "Frameworks", icon: "⚙️", items: ["Spring Boot", "Spring MVC", "React.js", "TensorFlow", "Pandas", "NumPy"] },
  { category: "Web", icon: "🌐", items: ["HTML5", "CSS3", "REST APIs", "SOAP", "Servlets", "JSP"] },
  { category: "Databases", icon: "🗄️", items: ["MySQL", "PostgreSQL", "MongoDB", "Cassandra", "SQL Server", "Oracle"] },
  { category: "Cloud & DevOps", icon: "☁️", items: ["AWS EC2", "Lambda", "CloudWatch", "Docker", "Kubernetes", "Jenkins", "Ansible"] },
  { category: "Data & BI", icon: "📊", items: ["Power BI", "Matplotlib", "Excel", "ETL", "Tableau", "ArcGIS Pro"] },
  { category: "Tools", icon: "🛠️", items: ["Git", "GitHub", "Jira", "Linux", "Jupyter", "Wireshark"] },
  { category: "Hardware & IoT", icon: "🤖", items: ["Raspberry Pi", "Jetson Nano", "OpenCV", "PyTorch", "YOLOv8"] },
];

// Projects — featured ones have images, others use emoji + color + unsplash
const FEATURED_PROJECTS = [
  {
    title: "Decentralized Banking System — Blockchain",
    type: "Blockchain & FinTech",
    period: "Nov 2024",
    tech: ["Blockchain", "Solidity", "Web3.js", "React.js", "Node.js", "Ethereum", "Smart Contracts"],
    color: "#f59e0b",
    icon: "🔗",
    image: `${BASE}blockchain-expo.jpeg`,
    badge: "🏆 Project Expo — Clarkson University",
    team: "Team: Akhil Rajesh & Ravi Sai Teja Kuna · RAPS — Clarkson University",
    description: "Presented at Clarkson University's first Project Expo in the US. Built a decentralized banking platform leveraging blockchain to eliminate intermediaries, reduce transaction costs, and expand global financial access for underserved populations.",
    bullets: [
      "Designed and developed a decentralized banking platform using blockchain to create a secure, transparent, and efficient financial ecosystem without traditional intermediaries.",
      "Implemented smart contracts to automate financial transactions, significantly reducing processing costs and eliminating single points of failure in centralized banking.",
      "Built a React.js frontend integrated with Web3.js for seamless wallet connectivity and real-time transaction tracking on the Ethereum network.",
      "Presented at Clarkson University's Project Expo to faculty, students, and industry professionals, receiving feedback on real-world implementation challenges.",
    ],
  },
  {
    title: "JetAuto Camera-Based Obstacle Detection",
    type: "Robotics & Computer Vision",
    period: "Sep 2025 – Jan 2026",
    tech: ["Python", "YOLOv5", "YOLOv8", "YOLOv26", "PyTorch", "OpenCV", "Jetson Nano", "Linux"],
    color: "#8b5cf6",
    icon: "🤖",
    images: [`${BASE}yolo-demo-0.jpeg`, `${BASE}yolo-demo-1.jpeg`],
    badge: "🎓 Capstone Project — Clarkson University",
    team: "Team: Akhil Rajesh & Ravi Sai Teja Kuna",
    description: "Implemented real-time camera-based obstacle detection on a JetAuto robot using YOLO models. Developed and benchmarked YOLOv5, YOLOv8, and YOLOv26 pipelines — overcoming Jetson Nano hardware constraints through a hybrid streaming architecture.",
    bullets: [
      "Deployed YOLOv5 on Jetson Nano-powered JetAuto robot using PyTorch and OpenCV, implementing real-time bounding box detection integrated directly with autonomous robot motion control logic.",
      "Engineered and benchmarked YOLOv8 and YOLOv26 anchor-free detection pipelines via the Ultralytics API, achieving faster inference speeds on external GPU systems.",
      "Architected a hybrid camera streaming pipeline offloading YOLOv8/YOLOv26 inference from hardware-constrained Jetson Nano to external laptops, diagnosing WiFi latency as the critical bottleneck.",
      "Documented key lessons including hardware validation requirements, GPU compatibility constraints, and network latency impact on real-time embedded robotics systems.",
    ],
  },
];

const GRID_PROJECTS = [
  {
    title: "University Renewable Energy & Transit Optimization",
    type: "GIS & Spatial Analysis",
    period: "Jan 2026 – May 2026",
    tech: ["ArcGIS Pro", "StoryMaps", "Spatial Analysis", "GIS", "Data Visualization"],
    color: "#10b981",
    icon: "🗺️",
    link: "https://storymaps.arcgis.com/stories/a966a1f0d1da419f8b28f8ad44e705c3",
    // Using Unsplash free image for GIS/maps project
    thumb: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80",
    bullets: [
      "Developed an interactive ArcGIS StoryMap analyzing university renewable energy infrastructure and transit optimization strategies using geospatial data analysis.",
      "Conducted spatial analysis to identify optimal locations for renewable energy installations and transit improvements, supporting data-driven sustainability planning.",
      "Visualized complex geospatial datasets creating compelling narratives communicating environmental and transportation insights to university stakeholders.",
    ],
  },
  {
    title: "Operational KPI Dashboard & Reporting System",
    type: "Business Intelligence",
    period: "Aug 2025 – May 2026",
    tech: ["Power BI", "Microsoft Excel", "SwitchBoard Drive", "Data Validation", "ETL"],
    color: "#0ea5e9",
    icon: "📊",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    bullets: [
      "Built 15+ interactive Power BI dashboards consolidating 500+ weekly operational records across inventory, workforce, and invoice datasets, enabling real-time KPI tracking.",
      "Automated recurring Excel-based reporting workflows using pivot tables, VLOOKUP, and dynamic formulas, reducing manual reporting time across 20+ weekly cycles.",
      "Ensured end-to-end data accuracy and compliance across 100+ invoice transactions per cycle through structured data validation and audit-ready documentation.",
    ],
  },
  {
    title: "Human Emotion Detection",
    type: "Computer Vision & AI",
    period: "Oct 2024 – Dec 2024",
    tech: ["Python", "Ultralytics", "YOLOv8", "OpenCV", "TensorFlow", "NLP", "Roboflow"],
    color: "#ec4899",
    icon: "😊",
    thumb: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
    bullets: [
      "Fine-tuned YOLOv8n on 270 annotated images (640x640px, 5 emotion classes) from Roboflow, achieving accurate real-time emotion classification with minimal computational overhead.",
      "Designed a modular computer vision pipeline covering image acquisition, preprocessing, feature extraction, and emotion recognition for end-to-end facial expression processing.",
      "Selected YOLOv8n's lightweight anchor-free architecture to balance detection speed and accuracy for real-time deployment in resource-constrained environments.",
    ],
  },
  {
    title: "Stock Market Financial Analysis & Forecasting",
    type: "Data Analytics",
    period: "Jun 2021 – Aug 2021",
    tech: ["Python", "MySQL", "Pandas", "NumPy", "Matplotlib", "ETL", "Time Series"],
    color: "#f59e0b",
    icon: "📈",
    thumb: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    bullets: [
      "Designed and executed a full data analysis pipeline on stock market data for 6 companies — MySQL ETL, transformation, cleaning, outlier detection, and normalization.",
      "Applied time series forecasting including moving averages and trend decomposition in Python to generate buy/sell/hold recommendations visualized using Matplotlib.",
      "Automated data retrieval using optimized MySQL queries, UDFs, and stored procedures, improving query execution speed by 40%.",
    ],
  },
  {
    title: "CarRental Management Application",
    type: "Full Stack",
    period: "Jan 2023 – Jun 2023",
    tech: ["Java", "Spring Boot", "React.js", "SQL Server", "JDBC API", "HTML5", "CSS3"],
    color: "#10b981",
    icon: "🚗",
    thumb: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
    bullets: [
      "Architected a full-stack multi-agency CarRental platform using Java/Spring Boot backend and React.js frontend, delivering a scalable rental management system.",
      "Integrated SQL Server via JDBC API with optimized query execution and connection pooling, improving data retrieval efficiency by 30%.",
      "Developed RESTful backend logic and dynamic React.js/HTML5/CSS3 UI components enabling seamless multi-agency workflows.",
    ],
  },
  {
    title: "Raspberry Pi Network Monitoring System",
    type: "IoT & Networking",
    period: "Jun 2022 – Aug 2022",
    tech: ["Raspberry Pi", "Python", "SSH", "Linux", "Wireshark", "Shell Scripts"],
    color: "#ef4444",
    icon: "🌐",
    thumb: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
    bullets: [
      "Developed a real-time network monitoring system using Raspberry Pi to analyze network traffic, capture packets, and detect anomalies across connected devices.",
      "Used Wireshark and Python scripts to capture and log network packets for anomaly detection, providing visibility into suspicious traffic patterns.",
      "Automated periodic network scans with Linux shell scripts, generating comprehensive bandwidth and connection reports.",
    ],
  },
];

const CERTS = [
  { name: "Machine Learning Specialization", issuer: "Coursera — Stanford / DeepLearning.AI", icon: "🎓" },
  { name: "KNIME Analytics Platform", issuer: "KNIME AG — Data Science with KNIME, Apr 2025", icon: "📊" },
  { name: "Coders Combat", issuer: "GeeksforGeeks — Competitive Programming Contest", icon: "🏆" },
];

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function FeaturedProjectCard({ p, dark, expanded, onToggle }) {
  const [activeImg, setActiveImg] = useState(0);
  const imgs = p.images || (p.image ? [p.image] : []);

  return (
    <div className={`rounded-2xl border overflow-hidden mb-6 ${dark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white shadow-sm"}`}>
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
      <div className="md:flex">
        {/* Image panel */}
        <div className="md:w-2/5 relative overflow-hidden bg-black/20 min-h-52">
          {imgs.length > 0 && (
            <>
              <img src={imgs[activeImg]} alt={p.title}
                className="w-full h-52 md:h-full object-cover transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {imgs.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {imgs.map((_, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? "bg-white scale-125" : "bg-white/50"}`} />
                  ))}
                </div>
              )}
              {imgs.length > 1 && (
                <div className="absolute top-3 right-3 flex gap-1">
                  <button onClick={() => setActiveImg((activeImg - 1 + imgs.length) % imgs.length)}
                    className="bg-black/50 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-black/70">‹</button>
                  <button onClick={() => setActiveImg((activeImg + 1) % imgs.length)}
                    className="bg-black/50 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-black/70">›</button>
                </div>
              )}
            </>
          )}
          {p.badge && (
            <div className="absolute top-3 left-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-black" style={{ background: p.color + "ee" }}>{p.badge}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="md:w-3/5 p-6">
          <div className="flex items-start gap-3 mb-2">
            <span className="text-2xl">{p.icon}</span>
            <div>
              <h3 className="font-bold text-lg leading-tight">{p.title}</h3>
              <p className="text-xs mt-0.5" style={{ color: p.color }}>{p.type} · {p.period}</p>
            </div>
          </div>
          <p className={`text-sm leading-relaxed mb-3 ${dark ? "text-gray-300" : "text-gray-600"}`}>{p.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {p.tech.map((t) => (
              <span key={t} className={`text-xs px-2.5 py-0.5 rounded-full border ${dark ? "border-white/15 text-gray-400" : "border-gray-200 text-gray-600"}`}>{t}</span>
            ))}
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }} className="space-y-1.5 overflow-hidden mb-2">
                {p.bullets.map((b, j) => (
                  <li key={j} className={`flex gap-2 text-sm leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    {b}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          <div className="flex items-center justify-between mt-2">
            {p.team && <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{p.team}</p>}
            <button onClick={onToggle} className={`text-xs ml-auto ${dark ? "text-gray-500" : "text-gray-400"} hover:opacity-70`}>
              {expanded ? "▲ Show less" : "▼ View details"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [expandedExp, setExpandedExp] = useState(null);
  const [expandedFeatured, setExpandedFeatured] = useState(null);
  const [expandedGrid, setExpandedGrid] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${dark ? "bg-[#0a0f1e] text-white" : "bg-gray-50 text-gray-900"}`}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${dark ? "bg-[#0a0f1e]/90 border-white/10" : "bg-white/90 border-gray-200"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">RST</span>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active === n ? "bg-blue-500/20 text-blue-400" : dark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}>
                {n}
              </button>
            ))}
            <button onClick={() => setDark(!dark)} className={`ml-2 p-2 rounded-lg ${dark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
          <button className="md:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden md:hidden border-t border-white/10">
              {NAV.map((n) => (
                <button key={n} onClick={() => scrollTo(n)} className="block w-full text-left px-6 py-3 text-sm hover:bg-white/5">{n}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex-shrink-0">
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-2xl shadow-blue-500/20">
                  <img src={`${BASE}ravi-profile.jpeg`} alt="Ravi Sai Teja Kuna"
                    className="w-full h-full object-cover object-top scale-110" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full px-3 py-1 text-xs font-semibold text-white flex items-center gap-1 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />Available
                </div>
              </div>
            </motion.div>
            <div className="text-center md:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />Open to opportunities
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
                Ravi Sai Teja{" "}
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Kuna</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className={`text-lg md:text-xl font-medium mb-4 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                Full Stack Developer & Data Analyst
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className={`text-sm md:text-base max-w-xl mb-7 leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
                4+ years building scalable enterprise applications with Java, Spring Boot, React.js, and AWS.
                MS Computer Science at Clarkson University · NY, USA.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a href="mailto:kunaravisaiteja@gmail.com"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-blue-500/25 text-sm">
                  Get in touch
                </a>
                <a href="https://linkedin.com/in/ravisaitejakuna" target="_blank" rel="noreferrer"
                  className={`px-5 py-2.5 rounded-xl border font-medium text-sm transition-all hover:scale-105 ${dark ? "border-white/20 text-gray-300 hover:bg-white/10" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
                  LinkedIn ↗
                </a>
                <a href="https://github.com/ravisaitejakuna" target="_blank" rel="noreferrer"
                  className={`px-5 py-2.5 rounded-xl border font-medium text-sm transition-all hover:scale-105 ${dark ? "border-white/20 text-gray-300 hover:bg-white/10" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
                  GitHub ↗
                </a>
              </motion.div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0">
            {[["4+", "Years Experience"], ["30%", "Performance Gains"], ["99.9%", "System Uptime"]].map(([val, label]) => (
              <div key={label} className={`text-center p-4 rounded-xl border ${dark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"}`}>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{val}</div>
                <div className={`text-xs mt-1 ${dark ? "text-gray-500" : "text-gray-500"}`}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className={`py-24 ${dark ? "" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-2">Experience</h2>
            <p className={`mb-12 ${dark ? "text-gray-400" : "text-gray-500"}`}>My professional journey</p>
          </FadeIn>
          <div className="relative">
            <div className={`absolute left-6 top-0 bottom-0 w-px ${dark ? "bg-white/10" : "bg-gray-200"}`} />
            <div className="space-y-6">
              {EXPERIENCE.map((exp, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className={`relative ml-16 rounded-2xl border transition-all cursor-pointer ${dark ? "border-white/10 bg-white/5 hover:bg-white/[0.08]" : "border-gray-200 bg-white hover:shadow-md"}`}
                    onClick={() => setExpandedExp(expandedExp === i ? null : i)}>
                    <div className="absolute -left-10 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: exp.color, background: dark ? "#0a0f1e" : "#fff" }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: exp.color }} />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>{exp.period}</span>
                      </div>
                      <p style={{ color: exp.color }} className="text-sm font-medium mb-4">{exp.company} · {exp.location}</p>
                      <AnimatePresence>
                        {expandedExp === i && (
                          <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }} className="space-y-2 overflow-hidden">
                            {exp.bullets.map((b, j) => (
                              <li key={j} className={`flex gap-2 text-sm leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}>
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                                {b}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                      <div className={`mt-3 text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
                        {expandedExp === i ? "▲ Show less" : "▼ Show details"}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className={`py-24 ${dark ? "bg-white/[0.02]" : "bg-gray-50"}`}>
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-2">Skills</h2>
            <p className={`mb-12 ${dark ? "text-gray-400" : "text-gray-500"}`}>Technologies and tools I work with</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILLS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className={`p-5 rounded-2xl border ${dark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{s.icon}</span>
                    <h3 className="font-semibold text-sm">{s.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className={`text-xs px-3 py-1 rounded-full border ${dark ? "border-white/15 bg-white/5 text-gray-300" : "border-gray-200 bg-gray-50 text-gray-700"}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={`py-24 ${dark ? "" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-2">Projects</h2>
            <p className={`mb-12 ${dark ? "text-gray-400" : "text-gray-500"}`}>Things I've built and explored</p>
          </FadeIn>

          {/* Featured projects with real photos */}
          <div>
            {FEATURED_PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <FeaturedProjectCard p={p} dark={dark}
                  expanded={expandedFeatured === i}
                  onToggle={() => setExpandedFeatured(expandedFeatured === i ? null : i)} />
              </FadeIn>
            ))}
          </div>

          {/* Grid projects with thumbnails */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
            {GRID_PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className={`rounded-2xl border overflow-hidden transition-all cursor-pointer hover:scale-[1.02] flex flex-col ${dark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white hover:shadow-lg"}`}
                  onClick={() => setExpandedGrid(expandedGrid === i ? null : i)}>
                  {/* Thumbnail */}
                  <div className="relative h-36 overflow-hidden">
                    <img src={p.thumb} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-xs font-medium text-white">{p.type}</span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="text-xs px-2 py-0.5 rounded-full text-white/80 font-medium" style={{ background: p.color + "90" }}>{p.period}</span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-sm leading-tight mb-2">{p.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className={`text-xs px-2 py-0.5 rounded-full border ${dark ? "border-white/15 text-gray-400" : "border-gray-200 text-gray-600"}`}>{t}</span>
                      ))}
                      {p.tech.length > 3 && <span className={`text-xs px-2 py-0.5 rounded-full border ${dark ? "border-white/10 text-gray-500" : "border-gray-100 text-gray-400"}`}>+{p.tech.length - 3}</span>}
                    </div>
                    <AnimatePresence>
                      {expandedGrid === i && (
                        <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }} className="space-y-1.5 overflow-hidden mb-2">
                          {p.bullets.map((b, j) => (
                            <li key={j} className={`flex gap-2 text-xs leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}>
                              <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: p.color }} />
                              {b}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
                        {expandedGrid === i ? "▲ Less" : "▼ Details"}
                      </span>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs px-2.5 py-1 rounded-lg border transition-all hover:scale-105"
                          style={{ color: p.color, borderColor: p.color + "50" }}>
                          View ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className={`py-24 ${dark ? "bg-white/[0.02]" : "bg-gray-50"}`}>
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-2">Certifications</h2>
            <p className={`mb-12 ${dark ? "text-gray-400" : "text-gray-500"}`}>Credentials and achievements</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {CERTS.map((c, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`p-5 rounded-2xl border text-center ${dark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"}`}>
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{c.name}</h3>
                  <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{c.issuer}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`py-24 ${dark ? "" : "bg-white"}`}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
            <p className={`text-lg mb-10 ${dark ? "text-gray-400" : "text-gray-500"}`}>
              Open to Full Stack Developer and Data Analyst roles. Let's build something great together.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href="mailto:kunaravisaiteja@gmail.com"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                kunaravisaiteja@gmail.com
              </a>
              <a href="tel:3156038232"
                className={`px-6 py-3 rounded-xl border font-medium transition-all hover:scale-105 ${dark ? "border-white/20 text-gray-300 hover:bg-white/10" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
                315-603-8232
              </a>
            </div>
            <div className="flex justify-center gap-4">
              {[{ label: "LinkedIn", url: "https://linkedin.com/in/ravisaitejakuna" },
                { label: "GitHub", url: "https://github.com/ravisaitejakuna" }].map((l) => (
                <a key={l.label} href={l.url} target="_blank" rel="noreferrer"
                  className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all hover:scale-105 ${dark ? "border-white/15 text-gray-300 hover:bg-white/10" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className={`py-8 border-t text-center text-sm ${dark ? "border-white/10 text-gray-500" : "border-gray-200 text-gray-400"}`}>
        <p>Ravi Sai Teja Kuna · NY, USA · Built with React & Tailwind</p>
      </footer>
    </div>
  );
}
