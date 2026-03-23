import { useReveal } from '../hooks/useReveal'

// Put your CV PDF at: public/Gaurav_Kumar_general_cvn.pdf
// It will be served as a static file automatically by Vite / any host
const CV_FILE = '/GAURAV_KUMAR_general_cvn.pdf'

const HIGHLIGHTS = [
  { icon: '🎓', label: 'Education',      val: 'B.Tech CSE · LPU · 8.15 CGPA' },
  { icon: '💻', label: 'Key Skills',     val: 'TypeScript · React · Node.js · PostgreSQL · React Native' },
  { icon: '🚀', label: 'Projects',       val: 'VAARTA · TrackExpense · BrainX' },
  { icon: '🏅', label: 'Certifications', val: 'NPTEL Cloud Computing · Udemy DS/ML Bootcamp' },
]

export default function Resume() {
  const hRef    = useReveal('sr', 0)
  const cardRef = useReveal('sr-sc', 100)
  const listRef = useReveal('sr-r', 200)

  return (
    <section id="resume" className="py-24 md:py-32 bg-[#111111]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={hRef} className="sr flex flex-wrap items-end justify-between gap-4 mb-12 pb-6 border-b border-white/[0.08]">
          <div className="flex items-baseline gap-5">
            <span className="font-serif italic text-[#5A554F]/30 text-6xl md:text-8xl font-bold leading-none select-none">05</span>
            <div>
              <p className="font-mono text-[#C8A84B] text-xs tracking-[0.18em] uppercase mb-1">Credentials</p>
              <h2 className="font-serif italic font-bold text-3xl md:text-5xl text-[#F0EBE3] tracking-tight">Resume / CV</h2>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_340px] gap-10 md:gap-14 items-start">

          {/* Left — highlights */}
          <div className="flex flex-col gap-6">
            <p className="text-[#8A8178] text-base md:text-lg leading-relaxed">
              A one-page overview of my education, skills, projects, and certifications — tailored for tech
              internship and campus placement applications.
            </p>

            <div ref={listRef} className="sr-r grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIGHLIGHTS.map(h => (
                <div key={h.label}
                  className="flex items-start gap-4 border border-white/[0.08] rounded-2xl p-5 bg-[#1A1A1A]
                    hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-2xl flex-shrink-0">{h.icon}</span>
                  <div>
                    <p className="font-mono text-[#C8A84B] text-xs tracking-widest uppercase mb-1">{h.label}</p>
                    <p className="text-[#8A8178] text-sm leading-relaxed">{h.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact detail strip */}
            <div className="border border-white/[0.08] rounded-2xl overflow-hidden bg-[#1A1A1A]">
              <div className="px-5 py-3 border-b border-white/[0.07]">
                <p className="font-mono text-[#5A554F] text-xs tracking-widest uppercase">Contact Details</p>
              </div>
              {[
                { k: 'Email',    v: 'gauravkumar170303@gmail.com', href: 'mailto:gauravkumar170303@gmail.com' },
                { k: 'Mobile',   v: '+91 7319814361' },
                { k: 'GitHub',   v: 'github.com/GauravKumar17',  href: 'https://github.com/GauravKumar17' },
                { k: 'LinkedIn', v: 'in/gauravkumar170303',       href: 'https://www.linkedin.com/in/gauravkumar170303' },
              ].map(r => (
                <div key={r.k} className="flex justify-between items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] last:border-0 flex-wrap">
                  <span className="font-mono text-[#5A554F] text-xs uppercase tracking-widest flex-shrink-0">{r.k}</span>
                  {r.href
                    ? <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                        className="text-[#C8A84B] text-sm hover:opacity-75 transition-opacity">{r.v}</a>
                    : <span className="text-[#F0EBE3] text-sm">{r.v}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Right — download card */}
          <div ref={cardRef} className="sr-sc">
            <div className="border border-[#C8A84B]/20 bg-[#C8A84B]/[0.04] rounded-2xl p-8 flex flex-col items-center gap-6 text-center">
              {/* PDF icon */}
              <div className="w-20 h-20 rounded-2xl bg-[#C8A84B]/10 border border-[#C8A84B]/20 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <polyline points="9,15 12,18 15,15"/>
                </svg>
              </div>

              <div>
                <h3 className="font-serif italic font-bold text-2xl text-[#F0EBE3] mb-2">Gaurav Kumar</h3>
                <p className="text-[#8A8178] text-sm font-mono">B.Tech CSE · LPU · 2023</p>
              </div>

              <div className="w-full space-y-3">
                {/* Direct static file download — no server needed */}
                <a
                  href={CV_FILE}
                  download="Gaurav_Kumar_Resume.pdf"
                  className="w-full flex items-center justify-center gap-3 bg-[#C8A84B] hover:bg-[#A88730]
                    text-[#0A0A0A] font-bold text-sm tracking-wide py-4 rounded-xl
                    transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#C8A84B]/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download CV (PDF)
                </a>

                <a href="https://www.linkedin.com/in/gauravkumar170303" target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-3 border border-white/[0.1]
                    hover:border-[#C8A84B]/30 text-[#8A8178] hover:text-[#C8A84B] font-semibold text-sm
                    py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                  View LinkedIn Profile ↗
                </a>
              </div>

              <p className="text-[#5A554F] text-xs font-mono leading-relaxed">
                Place your CV at<br />
                <span className="text-[#C8A84B]">public/Gaurav_Kumar_Resume.pdf</span><br />
                to enable the download button
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
