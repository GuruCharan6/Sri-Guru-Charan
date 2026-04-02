import { useState, useEffect, useRef } from "react";

// ── Google Fonts ──────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap";
document.head.appendChild(fontLink);

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
:root{
  --black:#0d1117;--teal-dk:#0a5f6b;--teal:#0d8f8a;--mint:#82d0c2;
  --cream:#e9e0cc;--amber:#d4920a;--orange:#c45e10;--brick:#a32818;
  --bg:#0b0e1a;--border:rgba(130,208,194,0.12);--text:#e2e8f0;--muted:#8892a4;
  --sans:'DM Sans',sans-serif;--display:'Space Grotesk',sans-serif;
}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:var(--sans);overflow-x:hidden;}
body::before{content:'';position:fixed;inset:0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 50%,rgba(13,143,138,.07) 0%,transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 20%,rgba(130,208,194,.04) 0%,transparent 50%),
    radial-gradient(ellipse 50% 50% at 60% 80%,rgba(212,146,10,.04) 0%,transparent 50%);
  pointer-events:none;z-index:0;}
body::after{content:'';position:fixed;inset:0;
  background-image:radial-gradient(circle,rgba(130,208,194,.07) 1px,transparent 1px);
  background-size:36px 36px;pointer-events:none;z-index:0;}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;height:68px;padding:0 60px;
  display:flex;align-items:center;justify-content:space-between;background:transparent;}
.nav-logo{font-family:var(--display);font-size:15px;font-weight:700;
  background:linear-gradient(135deg,var(--mint),var(--amber));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.nav-links{display:flex;gap:36px;list-style:none;align-items:center;}
.nav-links a{font-family:var(--display);font-size:13.5px;font-weight:500;
  color:var(--muted);text-decoration:none;letter-spacing:.01em;transition:color .2s;position:relative;}
.nav-links a:hover,.nav-links a.active{color:var(--mint);}
.nav-links a.active::after{content:'';position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);
  width:4px;height:4px;border-radius:50%;background:var(--mint);}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none;}
.hamburger span{width:22px;height:2px;background:var(--muted);border-radius:2px;transition:all .3s;}
.hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.hamburger.open span:nth-child(2){opacity:0;}
.hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
.mobile-menu{display:none;position:fixed;top:68px;left:0;right:0;background:rgba(11,14,26,.97);
  backdrop-filter:blur(12px);z-index:99;padding:24px;flex-direction:column;gap:4px;}
.mobile-menu.open{display:flex;}
.mobile-menu a{font-family:var(--display);font-size:17px;font-weight:600;color:var(--muted);
  text-decoration:none;padding:14px 0;border-bottom:1px solid var(--border);transition:color .2s;}
.mobile-menu a:last-child{border-bottom:none;}
.mobile-menu a:hover{color:var(--mint);}

/* HERO */
.hero{min-height:100vh;padding-top:68px;display:flex;align-items:center;justify-content:center;
  padding-left:80px;padding-right:80px;position:relative;z-index:1;padding-bottom:80px;}
.hero-inner{display:grid;grid-template-columns:1fr 320px;align-items:center;gap:48px;
  width:100%;max-width:1000px;}
.hero-left{max-width:640px;}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;
  border:1px solid var(--border);border-radius:999px;font-size:13px;font-weight:500;
  color:var(--mint);background:rgba(13,143,138,.08);margin-bottom:32px;font-family:var(--display);
  animation:fadeUp .5s .1s ease both;}
.badge-dot{width:6px;height:6px;border-radius:50%;background:var(--mint);animation:blink 2s infinite;}
@keyframes blink{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.35;transform:scale(1.8);}}
.hero-title{font-family:var(--display);font-size:clamp(54px,8.5vw,108px);font-weight:700;
  line-height:.98;letter-spacing:-.03em;margin-bottom:30px;animation:fadeUp .6s .2s ease both;}
.hero-title .line1{background:linear-gradient(135deg,var(--mint) 0%,var(--teal) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;}
.hero-title .line2{background:linear-gradient(135deg,var(--cream) 0%,var(--amber) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;}
.hero-title .line3{background:linear-gradient(135deg,var(--orange) 0%,var(--brick) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;}
.hero-desc{font-size:16px;line-height:1.8;color:var(--muted);margin-bottom:40px;max-width:500px;
  animation:fadeUp .6s .35s ease both;}
.hero-desc .hl-teal{color:var(--mint);font-weight:600;}
.hero-desc .hl-amber{color:var(--amber);font-weight:700;font-style:italic;}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp .6s .48s ease both;margin-bottom:20px;}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:10px;
  font-family:var(--display);font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;
  border:none;transition:transform .2s,filter .2s;}
.btn:hover{transform:translateY(-2px);filter:brightness(1.12);}
.btn-teal{background:linear-gradient(135deg,var(--teal-dk),var(--teal));color:#fff;}
.btn-outline{background:transparent;border:1.5px solid rgba(130,208,194,.25);color:var(--mint);}
.btn-outline:hover{border-color:var(--mint);}
.hero-right{display:flex;align-items:center;justify-content:center;animation:fadeUp .8s .28s ease both;}
.photo-ring{width:290px;height:290px;border-radius:50%;padding:3px;
  background:linear-gradient(135deg,var(--mint),var(--teal),var(--amber),var(--orange));position:relative;}
.photo-ring::before{content:'';position:absolute;inset:-10px;border-radius:50%;
  border:1px solid rgba(130,208,194,.14);animation:spin 10s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.photo-inner{width:100%;height:100%;border-radius:50%;background:var(--bg);
  display:flex;align-items:center;justify-content:center;overflow:hidden;}
.photo-inner img{width:100%;height:100%;object-fit:cover;}

/* SECTIONS */
section{padding:88px 120px;position:relative;z-index:1;}
.sec-eyebrow{font-family:var(--display);font-size:11px;letter-spacing:.3em;text-transform:uppercase;
  color:var(--mint);font-weight:600;margin-bottom:10px;}
.sec-title{font-family:var(--display);font-size:clamp(32px,4.5vw,56px);font-weight:700;
  letter-spacing:-.025em;line-height:1.08;margin-bottom:52px;}
.grad-teal{background:linear-gradient(135deg,var(--mint),var(--teal));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.grad-amber{background:linear-gradient(135deg,var(--amber),var(--orange));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

/* PROJECTS */
.projects-row1{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;}
.projects-row2{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;}
.proj-card{background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:18px;
  padding:30px 26px;display:flex;flex-direction:column;gap:13px;transition:border-color .25s,transform .25s;}
.proj-card:hover{border-color:rgba(130,208,194,.38);transform:translateY(-5px);}
.proj-num{font-family:var(--display);font-size:11px;font-weight:600;letter-spacing:.18em;color:var(--mint);opacity:.5;}
.proj-icon{font-size:26px;}
.proj-title{font-family:var(--display);font-size:19px;font-weight:700;color:var(--text);line-height:1.25;}

/* Project description as bullet points */
.proj-desc-list{list-style:none;display:flex;flex-direction:column;gap:6px;flex:1;padding:0;margin:0;}
.proj-desc-list li{font-size:13.5px;line-height:1.7;color:var(--muted);
  display:flex;align-items:flex-start;gap:8px;}
.proj-desc-list li::before{content:'▸';color:var(--mint);font-size:11px;
  flex-shrink:0;margin-top:3px;opacity:.75;}

.proj-tags{display:flex;flex-wrap:wrap;gap:7px;}
.ptag{font-family:var(--display);font-size:11px;font-weight:500;padding:4px 11px;border-radius:6px;
  background:rgba(130,208,194,.08);color:var(--mint);border:1px solid rgba(130,208,194,.15);}
.ptag.amber{background:rgba(212,146,10,.08);color:var(--amber);border-color:rgba(212,146,10,.2);}
.ptag.orange{background:rgba(196,94,16,.08);color:#e07a40;border-color:rgba(196,94,16,.2);}
.proj-link{display:inline-flex;align-items:center;gap:6px;font-family:var(--display);font-size:13px;
  font-weight:600;color:var(--mint);text-decoration:none;transition:gap .2s;margin-top:4px;}
.proj-link:hover{gap:10px;}

/* SKILLS */
.skills-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
.skill-group{background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:16px;
  padding:26px 22px;transition:border-color .25s;}
.skill-group:hover{border-color:rgba(130,208,194,.26);}
.sg-title{font-family:var(--display);font-size:11px;font-weight:700;text-transform:uppercase;
  letter-spacing:.2em;margin-bottom:18px;}
.sg-title.t{color:var(--mint);}.sg-title.a{color:var(--amber);}.sg-title.o{color:#e07a40;}
.skill-row{display:flex;align-items:center;justify-content:space-between;
  padding:10px 0;border-bottom:1px solid var(--border);font-size:13.5px;}
.skill-row:last-child{border-bottom:none;}
.sk-name{color:var(--text);font-weight:400;display:flex;align-items:center;gap:9px;}
.dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.dot-t{background:var(--mint);}.dot-a{background:var(--amber);}.dot-o{background:#e07a40;}
.sk-badge{font-family:var(--display);font-size:10px;font-weight:600;padding:2px 8px;
  border-radius:4px;letter-spacing:.05em;}
.sk-badge.strong{background:rgba(13,143,138,.15);color:var(--mint);}
.sk-badge.good{background:rgba(212,146,10,.12);color:var(--amber);}
.sk-badge.learn{background:rgba(130,130,130,.1);color:var(--muted);}

/* EXPERIENCE */
.exp-cards-row{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}
.exp-logo-card{background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:16px;
  padding:24px 22px;display:flex;flex-direction:column;align-items:center;text-align:center;
  gap:10px;transition:border-color .25s,transform .25s;}
.exp-logo-card:hover{border-color:rgba(130,208,194,.3);transform:translateY(-4px);}
.exp-logo-circle{width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.05);
  border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:24px;}
.exp-card-body{display:flex;flex-direction:column;gap:2px;align-items:center;}
.exp-org{font-family:var(--display);font-size:16px;font-weight:700;color:var(--text);}
.exp-role-label{font-family:var(--display);font-size:12.5px;font-weight:600;color:var(--mint);}
.exp-role-label.amber{color:var(--amber);}
.exp-detail{font-size:12px;color:var(--muted);line-height:1.5;margin-top:1px;}
.exp-detail strong{color:var(--text);font-weight:600;}
.exp-pill{font-family:var(--display);font-size:10.5px;font-weight:600;padding:4px 13px;
  border-radius:999px;border:1px solid;margin-top:2px;}
.exp-pill.teal{background:rgba(13,143,138,.1);border-color:rgba(130,208,194,.22);color:var(--mint);}
.exp-pill.amber{background:rgba(212,146,10,.1);border-color:rgba(212,146,10,.25);color:var(--amber);}

/* CONTACT */
.contact-section{text-align:center;}
.contact-sub{font-size:16px;color:var(--muted);line-height:1.75;max-width:480px;margin:-28px auto 48px;}
.contact-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:700px;margin:0 auto 44px;}
.contact-card{background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:14px;
  padding:24px 16px;text-decoration:none;transition:border-color .25s,transform .25s;
  display:flex;flex-direction:column;align-items:center;gap:10px;}
.contact-card:hover{border-color:rgba(130,208,194,.38);transform:translateY(-4px);}
.cc-icon{display:flex;align-items:center;justify-content:center;color:var(--mint);}
.cc-label{font-family:var(--display);font-size:10px;font-weight:700;color:var(--muted);
  text-transform:uppercase;letter-spacing:.12em;}
.cc-value{font-size:12px;font-weight:500;color:var(--mint);word-break:break-all;text-align:center;line-height:1.5;}

/* FOOTER */
footer{background:var(--bg);padding:24px 80px;display:flex;justify-content:space-between;
  align-items:center;position:relative;z-index:1;}
.footer-logo{font-family:var(--display);font-size:16px;font-weight:700;
  background:linear-gradient(135deg,var(--mint),var(--amber));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
footer .fl{font-size:12.5px;color:var(--muted);}

@keyframes fadeUp{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:translateY(0);}}

/* RESPONSIVE */
@media(max-width:1100px){
  nav{padding:0 32px;}
  .hero{padding-left:40px;padding-right:40px;}
  .hero-inner{grid-template-columns:1fr 260px;gap:32px;}
  .photo-ring{width:240px;height:240px;}
  section{padding:72px 40px;}
  .projects-row2{grid-template-columns:1fr 1fr;}
  .exp-cards-row{grid-template-columns:1fr 1fr;}
  footer{padding:22px 40px;}
}
@media(max-width:768px){
  nav{padding:0 20px;height:60px;}
  .nav-links{display:none;}
  .hamburger{display:flex;}
  .hero{padding:80px 20px 60px;}
  .hero-inner{grid-template-columns:1fr;}
  .hero-right{display:none;}
  .hero-title{font-size:clamp(44px,14vw,72px);}
  section{padding:56px 20px;}
  .projects-row1,.projects-row2{grid-template-columns:1fr;}
  .skills-grid{grid-template-columns:1fr;}
  .exp-cards-row{grid-template-columns:1fr;}
  .contact-cards{grid-template-columns:1fr 1fr;}
  footer{padding:20px 20px;flex-direction:column;gap:8px;text-align:center;}
}
@media(max-width:480px){
  .contact-cards{grid-template-columns:1fr;}
  .hero-title{font-size:clamp(38px,12vw,60px);}
}
`;
const styleTag = document.createElement("style");
styleTag.textContent = css;
document.head.appendChild(styleTag);

// ── ICONS ─────────────────────────────────────────────────────────────────────
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

// ── PHOTO ─────────────────────────────────────────────────────────────────────
const PHOTO_SRC = "/charan.png";

// ── DATA ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01", icon: "",
    title: "AI-Powered Document Verification Platform",
    desc: [
      "Supports 20+ Indian document types across 8+ regional languages.",
      "PaddleOCR + Tesseract for field extraction; OpenCV for fraud & tamper detection.",
      "Groq LLM delivers APPROVED / REVIEW / REJECTED verdicts with reasoning.",
      "Production-deployed on Vercel + Render with Supabase Storage and full audit logs.",
    ],
    tags: [
      { label: "FastAPI" }, { label: "React/Vite" }, { label: "PaddleOCR" },
      { label: "Tesseract" }, { label: "OpenCV" }, { label: "Groq LLM", cls: "amber" },
      { label: "Supabase" },
    ],
    link: "https://github.com/GuruCharan6/AI-Powered_Document_Verification",
  },
  {
    num: "02", icon: "",
    title: "JobFeed — AI Daily Job Digest",
    desc: [
      "Fetches real job listings daily and scores each against a personalised user profile.",
      "LLaMA 3.3 70B ranks matches and delivers results via email at a user-configured time.",
      "Smart caching collapses 100 user queries into 1 API call, cutting costs significantly.",
      "Minute-tick scheduler guarantees on-time delivery with zero missed sends.",
    ],
    tags: [
      { label: "FastAPI" }, { label: "LLaMA 3.3 70B", cls: "amber" },
      { label: "React/TS" }, { label: "Supabase" }, { label: "Resend" },
    ],
    link: "https://github.com/GuruCharan6/JodFeed-AI-powered-daily-job-digest",
  },
  {
    num: "03", icon: "",
    title: "AI Digital Twin",
    desc: [
      "FLUX LoRA trained on personal photos for identity-consistent image generation.",
      "Voice cloned via Chatterbox for natural-sounding speech synthesis.",
      "Lip-synced talking-head video rendered at 640×640, 25 FPS using WanVideo 2.1 14B GGUF.",
      "Full pipeline orchestrated inside ComfyUI for end-to-end reproducibility.",
    ],
    tags: [
      { label: "FLUX LoRA", cls: "orange" }, { label: "WanVideo 2.1", cls: "orange" },
      { label: "ComfyUI" }, { label: "Chatterbox" },
    ],
    link: "https://github.com/GuruCharan6/AI-Digital-Twin",
  },
  {
    num: "04", icon: "",
    title: "AI Product Photography",
    desc: [
      "Custom LoRA fine-tuned on FLUX.1 Dev using 100% AI-generated synthetic images.",
      "Produces photorealistic product shots across varied environments via prompt engineering.",
      "Zero real product photos required in training or inference.",
      "Workflow managed end-to-end in ComfyUI for repeatable, high-quality output.",
    ],
    tags: [
      { label: "FLUX.1 Dev", cls: "orange" }, { label: "LoRA Training" },
      { label: "ComfyUI" }, { label: "Synthetic Data" },
    ],
    link: "https://github.com/GuruCharan6/AI-Product-Photography-using-LoRA",
  },
  {
    num: "05", icon: "",
    title: "Currency Notes Classifier",
    desc: [
      "End-to-end ML pipeline trained on 1,100+ currency note samples.",
      "SVM & Random Forest models achieving 98.2% accuracy with strong F1 scores.",
      "Confusion matrix and feature-importance visuals for full model explainability.",
    ],
    tags: [
      { label: "98.2% Accuracy", cls: "amber" }, { label: "scikit-learn" },
      { label: "SVM" }, { label: "Random Forest" },
    ],
    link: "https://github.com/GuruCharan6/Predicting-Currency-Whether-Original-or-Fake-using-Random-Forest-Algorithm",
  },
];

const SKILLS = [
  {
    title: "AI / GenAI", cls: "t",
    items: [
      { name: "LLM APIs (Groq, OpenAI, Claude)", badge: "Strong", bcls: "strong" },
      { name: "LoRA Training (FLUX, Diffusion)", badge: "Strong", bcls: "strong" },
      { name: "Prompt Engineering", badge: "Strong", bcls: "strong" },
      { name: "ComfyUI / Video Generation", badge: "Proficient", bcls: "good" },
      { name: "RAG Pipelines", badge: "Advancing", bcls: "learn" },
      { name: "LLM Fine-tuning / Tool Calling", badge: "Advancing", bcls: "learn" },
    ],
    dot: "dot-t",
  },
  {
    title: "Backend & Frontend", cls: "a",
    items: [
      { name: "Python", badge: "Strong", bcls: "strong" },
      { name: "FastAPI / Flask / REST APIs", badge: "Strong", bcls: "strong" },
      { name: "React / TypeScript / Vite", badge: "Proficient", bcls: "good" },
      { name: "PostgreSQL / Supabase / MySQL", badge: "Proficient", bcls: "good" },
      { name: "JavaScript / TypeScript", badge: "Proficient", bcls: "good" },
      { name: "Git / Jupyter Notebook", badge: "Proficient", bcls: "good" },
    ],
    dot: "dot-a",
  },
  {
    title: "Data / ML / Visualisation", cls: "o",
    items: [
      { name: "Pandas / NumPy", badge: "Proficient", bcls: "good" },
      { name: "scikit-learn / EDA", badge: "Proficient", bcls: "good" },
      { name: "Power BI / Power Query / DAX", badge: "Proficient", bcls: "good" },
      { name: "OpenCV / PaddleOCR / Tesseract", badge: "Proficient", bcls: "good" },
      { name: "Matplotlib", badge: "Proficient", bcls: "good" },
      { name: "Selenium WebDriver", badge: "Familiar", bcls: "learn" },
    ],
    dot: "dot-o",
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const ids = [ "hero" ,"projects", "skills", "experience", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Expertise" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* NAV */}
      <nav>
        <span className="nav-logo"></span>
        <ul className="nav-links">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map(({ id, label }) => (
          <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
            {label}
          </a>
        ))}
      </div>

      {/* HERO */}
      <div className="hero" id="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot" />
              Open to Opportunities
            </div>
            <h1 className="hero-title">
              <span className="line1">Think.</span>
              <span className="line2">Build.</span>
              <span className="line3">Ship.</span>
            </h1>
            <p className="hero-desc">
              Hi, I'm <span className="hl-teal">Sri Guru Charan Punjala</span> — a CSE (Data Science) graduate from Hyderabad building production-grade AI applications. Specialised in{" "}
              <span className="hl-teal">LLM integration, LoRA training, and full-stack AI systems</span>, keeping{" "}
              <span className="hl-amber">outcome</span> as the focus.
            </p>
            <div className="hero-btns">
              <a href="https://www.linkedin.com/in/sri-guru-charan/" target="_blank" rel="noreferrer" className="btn btn-teal">
                <LinkedinIcon size={18} /> LinkedIn
              </a>
              <a href="https://github.com/GuruCharan6" target="_blank" rel="noreferrer" className="btn btn-outline">
                <GithubIcon size={18} /> GitHub
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="photo-ring">
              <div className="photo-inner">
                <img
                  src={PHOTO_SRC}
                  alt="Sri Guru Charan Punjala"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;color:var(--muted);font-size:12px;text-align:center;padding:20px;line-height:1.65;"><div style="font-size:48px">👤</div><div>Add your photo<br/>to the project</div></div>`;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <section id="projects">
        <div className="sec-eyebrow">What I've Built</div>
        <h2 className="sec-title">Production AI <span className="grad-teal">Projects</span></h2>
        <div className="projects-row1">
          {PROJECTS.slice(0, 2).map((p) => <ProjectCard key={p.num} {...p} />)}
        </div>
        <div className="projects-row2">
          {PROJECTS.slice(2).map((p) => <ProjectCard key={p.num} {...p} />)}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="sec-eyebrow">My Toolkit</div>
        <h2 className="sec-title">Skills & <span className="grad-amber">Expertise</span></h2>
        <div className="skills-grid">
          {SKILLS.map((g) => (
            <div className="skill-group" key={g.title}>
              <div className={`sg-title ${g.cls}`}>{g.title}</div>
              {g.items.map((sk) => (
                <div className="skill-row" key={sk.name}>
                  <span className="sk-name"><span className={`dot ${g.dot}`} />{sk.name}</span>
                  <span className={`sk-badge ${sk.bcls}`}>{sk.badge}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="sec-eyebrow">Work History</div>
        <h2 className="sec-title">Experience & <span className="grad-amber">Education</span></h2>
        <div className="exp-cards-row">
          <div className="exp-logo-card">
            <div className="exp-logo-circle">🏛️</div>
            <div className="exp-card-body">
              <div className="exp-org">VBIT Hyderabad</div>
              <div className="exp-role-label">B.Tech — CSE (Data Science)</div>
              <div className="exp-detail">Graduated 2025 · <strong>CGPA 8.03</strong></div>
            </div>
            <span className="exp-pill teal">2021 – 2025</span>
          </div>
          <div className="exp-logo-card">
            <div className="exp-logo-circle">💼</div>
            <div className="exp-card-body">
              <div className="exp-org">iCompaas</div>
              <div className="exp-role-label amber">Python Backend Intern</div>
              <div className="exp-detail">Flask APIs · Selenium WebDriver testing</div>
            </div>
            <span className="exp-pill amber">Jan – May 2025</span>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="sec-eyebrow">Get In Touch</div>
        <h2 className="sec-title">Ready to <span className="grad-teal">Build</span> Together?</h2>
        <p className="contact-sub">
          Actively looking for my first full-time role in AI/ML engineering or GenAI development. I ship real things, learn fast, and care about production quality.
        </p>
        <div className="contact-cards">
          <a href="mailto:gurucharanpunjala@gmail.com" className="contact-card">
            <span className="cc-icon"><EmailIcon size={28} /></span>
            <span className="cc-label">Email</span>
            <span className="cc-value">gurucharanpunjala@gmail.com</span>
          </a>
          <a href="https://www.linkedin.com/in/sri-guru-charan/" target="_blank" rel="noreferrer" className="contact-card">
            <span className="cc-icon"><LinkedinIcon size={28} /></span>
            <span className="cc-label">LinkedIn</span>
            <span className="cc-value">linkedin.com/in/sri-guru-charan</span>
          </a>
          <a href="https://github.com/GuruCharan6" target="_blank" rel="noreferrer" className="contact-card">
            <span className="cc-icon"><GithubIcon size={28} /></span>
            <span className="cc-label">GitHub</span>
            <span className="cc-value">github.com/GuruCharan6</span>
          </a>
        </div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:gurucharanpunjala@gmail.com" className="btn btn-teal">
            <EmailIcon size={16} /> Reach Me
          </a>
          <a href="/SRI GURU CHARAN PUNJALA.pdf" download className="btn btn-outline">
            My Resume
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-logo">Sri Guru Charan Punjala</span>
        <span className="fl">Open to opportunities</span>
      </footer>
    </>
  );
}

function ProjectCard({ num, icon, title, desc, tags, link }) {
  return (
    <div className="proj-card">
      <div className="proj-num">{num}</div>
      <div className="proj-icon">{icon}</div>
      <div className="proj-title">{title}</div>
      <ul className="proj-desc-list">
        {desc.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
      <div className="proj-tags">
        {tags.map((t) => (
          <span key={t.label} className={`ptag ${t.cls || ""}`}>{t.label}</span>
        ))}
      </div>
      <a href={link} target="_blank" rel="noreferrer" className="proj-link">
        <GithubIcon size={14} /> View on GitHub →
      </a>
    </div>
  );
}