import { useState, useRef, useEffect } from 'react'

// ─── API KEY SETUP ──────────────────────────────────────────────────────────────
// Create a file called .env in the project root with:
//   VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
//
// For deployment (Netlify / Vercel / Cloudflare Pages):
//   Add VITE_ANTHROPIC_API_KEY as an environment variable in your host dashboard.
//
// Note: for a portfolio chatbot this is acceptable. If you want zero key exposure,
// use a serverless function (Netlify Functions / Vercel Edge) as a thin proxy.
// ────────────────────────────────────────────────────────────────────────────────
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || ''

const SYSTEM = `You are GK Assistant, a friendly AI chatbot on Gaurav Kumar's portfolio. Answer questions about him concisely and professionally.

ABOUT GAURAV KUMAR:
- Email: gauravkumar170303@gmail.com | Phone: +91-7319814361
- GitHub: https://github.com/GauravKumar17
- LinkedIn: https://www.linkedin.com/in/gauravkumar170303

EDUCATION:
- B.Tech CSE, LPU Phagwara — CGPA 8.15 (Aug 2023–present)
- Class XII, Pitts Modern School Ranchi — 83% (2019–2021)
- Class X, Pitts Modern School Ranchi — 92.4% (2018–2019)

SKILLS: C++, JavaScript, TypeScript, Python, Kotlin, C, React.js, Next.js, HTML5, CSS3, Tailwind CSS, Jetpack Compose, Node.js, Express.js, WebSockets, REST APIs, WebRTC, PostgreSQL, MongoDB, Prisma ORM, Redis, Git, Docker, Turborepo, CI/CD, Postman, Clerk Auth

PROJECTS:
1. VAARTA (Sep–Nov 2025) — PERN chat app, Socket.io real-time + WebRTC video, Google Gemini AI chatbot, Cloudinary, TypeScript + Express backend
2. TrackExpense (Sep–Oct 2025) — React Native + Expo, 60fps animations, Clerk Auth + Expo Secure Store, Upstash Redis rate-limiting, PostgreSQL
3. BrainX (Aug–Sep 2025) — Content aggregation for 1000+ bookmarks, JWT+bcrypt+Zod API protecting 500+ users, Three.js 3D + Motion animations, sub-100ms transitions

CERTIFICATIONS: Cloud Computing (NPTEL, Nov 2025) · Data Science/ML/DL/NLP Bootcamp (Udemy, Jul 2025)
AVAILABILITY: Actively seeking internships and campus placements. Open to freelance/collaboration.

Keep answers to 2–4 sentences. Be warm and professional. If unsure, say so honestly.`

const QUICK = [
  'What projects has Gaurav built?',
  'What are his skills?',
  'Is he open to internships?',
]

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#8A8178] inline-block"
          style={{ animation: `chatdot 1.2s ${i * 0.2}s ease-in-out infinite` }} />
      ))}
    </div>
  )
}

function Bubble({ m }) {
  const isUser = m.role === 'user'
  return (
    <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#C8A84B]/15 border border-[#C8A84B]/30
          flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="font-serif italic text-[9px] font-bold text-[#C8A84B]">GK</span>
        </div>
      )}
      <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? 'bg-[#C8A84B] text-[#0A0A0A] font-medium rounded-br-sm'
          : 'bg-[#1A1A1A] text-[#F0EBE3] border border-white/[0.08] rounded-bl-sm'
      }`}>
        {m.content}
      </div>
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen]     = useState(false)
  const [msgs, setMsgs]     = useState([{
    role: 'assistant',
    content: "Hi! I'm GK Assistant 👋 Ask me anything about Gaurav — his projects, skills, experience, or how to reach him."
  }])
  const [input, setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 320)
  }, [open])

  const send = async (text) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    const next = [...msgs, { role: 'user', content: msg }]
    setMsgs(next)
    setInput('')
    setLoading(true)

    if (!API_KEY) {
      setTimeout(() => {
        setMsgs(prev => [...prev, {
          role: 'assistant',
          content: "⚠️ Chatbot not configured — add VITE_ANTHROPIC_API_KEY to your .env file to activate me! Check the README for instructions."
        }])
        setLoading(false)
      }, 600)
      return
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 500,
          system: SYSTEM,
          messages: next.slice(-10).map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      const reply = data?.content?.[0]?.text ?? "Sorry, I couldn't respond right now. Please try again."
      setMsgs(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Connection error — please try again in a moment.' }])
    } finally {
      setLoading(false)
    }
  }

  const onKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open GK Assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
          bg-[#C8A84B] hover:bg-[#A88730] shadow-xl shadow-[#C8A84B]/30
          flex items-center justify-center
          transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
        {!open && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0A0A0A]" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="chat-open fixed bottom-24 right-6 z-50
          w-[360px] max-w-[calc(100vw-1.5rem)]
          bg-[#111111] border border-white/[0.1] rounded-2xl
          shadow-2xl shadow-black/70 flex flex-col overflow-hidden"
          style={{ height: '480px' }}>

          {/* Header */}
          <div className="flex-shrink-0 flex items-center gap-3 px-5 py-4 bg-[#0A0A0A] border-b border-white/[0.08]">
            <div className="w-9 h-9 rounded-full bg-[#C8A84B]/15 border border-[#C8A84B]/30 flex items-center justify-center flex-shrink-0">
              <span className="font-serif italic font-bold text-sm text-[#C8A84B]">GK</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#F0EBE3] text-sm font-semibold">GK Assistant</p>
              <p className="text-green-400 text-xs font-mono">● Online · Knows everything about Gaurav</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-[#5A554F] hover:text-[#F0EBE3] transition-colors p-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4 flex flex-col gap-3">
            {msgs.map((m, i) => <Bubble key={i} m={m} />)}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-[#C8A84B]/15 border border-[#C8A84B]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-serif italic text-[9px] font-bold text-[#C8A84B]">GK</span>
                </div>
                <div className="bg-[#1A1A1A] border border-white/[0.08] rounded-2xl rounded-bl-sm"><TypingDots /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {msgs.length === 1 && !loading && (
            <div className="flex-shrink-0 px-4 pb-3 flex flex-wrap gap-2">
              {QUICK.map(q => (
                <button key={q} onClick={() => send(q)}
                  className="text-xs font-mono text-[#8A8178] border border-white/[0.08] bg-[#1A1A1A]
                    hover:border-[#C8A84B]/30 hover:text-[#C8A84B] px-3 py-1.5 rounded-full transition-all duration-200">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex-shrink-0 flex items-end gap-2 px-4 py-3.5 bg-[#0A0A0A] border-t border-white/[0.08]">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask about Gaurav…"
              rows={1}
              className="flex-1 bg-[#1A1A1A] border border-white/[0.08] rounded-xl px-4 py-3 text-[#F0EBE3] text-sm
                placeholder:text-[#5A554F] outline-none focus:border-[#C8A84B]/40 resize-none
                transition-colors duration-200 leading-relaxed"
              style={{ maxHeight: '90px', overflowY: 'auto' }}
            />
            <button onClick={() => send()}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#C8A84B] hover:bg-[#A88730]
                disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center
                transition-all duration-200 hover:-translate-y-0.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22,2 15,22 11,13 2,9"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
