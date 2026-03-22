import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    num: '01', year: 'Nov 2025',
    title: 'VAARTA',
    sub: 'AI-Based Real-Time Chat Application',
    tag: 'Full Stack · WebRTC',
    hoverBg: 'rgba(120,80,10,0.12)',
    desc: 'A production-grade PERN stack chat platform with real-time bidirectional messaging via Socket.io and peer-to-peer video conferencing through WebRTC — plus an integrated AI chatbot powered by Google Gemini.',
    bullets: [
      'Scalable PostgreSQL + Prisma ORM schema with Cloudinary API for media storage',
      'Type-safe Express + TypeScript backend with VaartaAI chatbot via Gemini API',
      'WebRTC peer-to-peer video conferencing with real-time signalling',
    ],
    tech: ['Express','TypeScript','PostgreSQL','Prisma ORM','Socket.io','WebRTC','Gemini API','Cloudinary','React'],
    github: 'https://github.com/GauravKumar17',
    live: '#',
  },
  {
    num: '02', year: 'Oct 2025',
    title: 'TrackExpense',
    sub: 'Cross-Platform Mobile Expense Tracker',
    tag: 'Mobile · React Native',
    hoverBg: 'rgba(40,40,60,0.25)',
    desc: 'A full-stack React Native + Expo app delivering 60fps smooth animations on iOS and Android. Secure user sessions via Clerk Auth, rate-limiting with Upstash Redis, and a serverless Express + PostgreSQL backend.',
    bullets: [
      '60fps animations using React Native Reanimated across iOS and Android',
      'Clerk Auth + Expo Secure Store protecting 100+ concurrent users',
      'Rate-limiting via Upstash Redis with serverless Express + PostgreSQL backend',
    ],
    tech: ['React Native','Expo','TypeScript','Express.js','PostgreSQL','Upstash Redis','Clerk Auth'],
    github: 'https://github.com/GauravKumar17',
    live: null,
  },
  {
    num: '03', year: 'Sep 2025',
    title: 'BrainX',
    sub: 'Your Second Brain — Content Aggregation',
    tag: 'Full Stack · 3D',
    hoverBg: 'rgba(60,30,80,0.15)',
    desc: 'A full-stack content aggregation system for organising 1000+ bookmarks across videos, docs, tweets and web links — with intelligent categorisation, secure REST API, and Three.js 3D visualisations with sub-100ms transitions.',
    bullets: [
      'JWT auth + bcrypt + Zod schema validation protecting 500+ user accounts',
      'Motion animations and Three.js 3D visualizations on the React frontend',
      'Sub-100ms page transitions; smart categorization across 4 media types',
    ],
    tech: ['React','TypeScript','Tailwind CSS','Three.js','Motion','Express.js','MongoDB','JWT','Zod'],
    github: 'https://github.com/GauravKumar17',
    live: '#',
  },
]

// Standalone component so hooks are at top level (not inside .map())
function ProjectRow({ p, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useReveal('sr', index * 100)

  return (
    <div
      ref={ref}
      className="sr border-b border-white/[0.07] cursor-default transition-colors duration-500"
      style={{ backgroundColor: hovered ? p.hoverBg : 'transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="py-10 md:py-12">
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
          <div className="flex items-baseline gap-4 md:gap-5">
            <span className="font-serif italic font-bold text-3xl md:text-5xl leading-none transition-colors duration-300"
              style={{ color: hovered ? '#C8A84B' : 'rgba(90,85,80,0.45)' }}>
              {p.num}
            </span>
            <div>
              <h3 className="font-serif italic font-bold text-2xl md:text-4xl text-[#F0EBE3] leading-tight tracking-tight">
                {p.title}
              </h3>
              <p className="text-[#C8A84B] text-sm font-semibold mt-1 tracking-wide">{p.sub}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-mono text-[#8A8178] text-xs tracking-widest">{p.year}</span>
            <span className="border border-white/[0.1] text-[#8A8178] text-xs font-mono px-3 py-1 rounded-full">{p.tag}</span>
          </div>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-[1fr_260px] gap-8 md:gap-12">
          <div>
            <p className="text-[#8A8178] text-base md:text-lg leading-relaxed mb-5">{p.desc}</p>
            <ul className="flex flex-col gap-2.5">
              {p.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-[#8A8178] text-sm md:text-base leading-relaxed">
                  <span className="text-[#C8A84B] flex-shrink-0 mt-0.5 text-sm font-bold">→</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-5">
            <div className="flex flex-wrap gap-2">
              {p.tech.map(t => (
                <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.03] text-[#5A554F] tracking-wide">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href={p.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-[#8A8178] hover:text-[#F0EBE3]
                  border border-white/[0.1] hover:border-white/[0.2] px-4 py-2.5 rounded-lg
                  transition-all duration-200 hover:-translate-y-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
                </svg>
                GitHub
              </a>
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-[#C8A84B]
                    border border-[#C8A84B]/25 bg-[#C8A84B]/[0.06] hover:bg-[#C8A84B]/[0.14]
                    px-4 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5">
                  Live ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const hRef = useReveal('sr', 0)
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div ref={hRef} className="sr flex flex-wrap items-end justify-between gap-4 mb-12 pb-6 border-b border-white/[0.08]">
          <div className="flex items-baseline gap-5">
            <span className="font-serif italic text-[#5A554F]/30 text-6xl md:text-8xl font-bold leading-none select-none">02</span>
            <div>
              <p className="font-mono text-[#C8A84B] text-xs tracking-[0.18em] uppercase mb-1">Selected Work</p>
              <h2 className="font-serif italic font-bold text-3xl md:text-5xl text-[#F0EBE3] tracking-tight">Projects</h2>
            </div>
          </div>
          <span className="hidden md:block text-[#8A8178] text-sm font-mono">2025</span>
        </div>
        <div className="flex flex-col">
          {PROJECTS.map((p, i) => <ProjectRow key={p.num} p={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
