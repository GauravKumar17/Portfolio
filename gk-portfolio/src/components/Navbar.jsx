import { useState, useEffect } from 'react'

const NAV = [
  { id: 'hero',        label: 'Home' },
  { id: 'projects',    label: 'Work' },
  { id: 'skills',      label: 'Skills' },
  { id: 'about',       label: 'About' },
  { id: 'resume',      label: 'Resume' },
  { id: 'contact',     label: 'Contact' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('hero')
  const [open,     setOpen]     = useState(false)
  const [pct,      setPct]      = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      const dh = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(sy > 40)
      setPct(dh > 0 ? (sy / dh) * 100 : 0)
      const ids = NAV.map(n => n.id).reverse()
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && sy >= el.offsetTop - 140) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#C8A84B] to-[#E8D070] z-[9998] pointer-events-none transition-all duration-100"
        style={{ width: pct + '%' }} />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.06]' : ''
      }`}>
        <nav className="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-center justify-between py-4">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
            <span className="font-serif italic text-xl font-bold text-[#F0EBE3]">GK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A84B] group-hover:scale-125 transition-transform" />
          </button>

          <ul className="hidden md:flex items-center gap-0.5">
            {NAV.map(n => (
              <li key={n.id}>
                <button onClick={() => { scrollTo(n.id); setOpen(false) }}
                  className={`relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200
                    ${active === n.id ? 'text-[#F0EBE3]' : 'text-[#8A8178] hover:text-[#F0EBE3]'}`}>
                  {n.label}
                  {active === n.id &&
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-[1.5px] bg-[#C8A84B] rounded-full" />}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scrollTo('resume')}
              className="text-sm font-semibold bg-[#C8A84B] hover:bg-[#A88730] text-[#0A0A0A] px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 tracking-wide">
              Download CV
            </button>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-1" aria-label="Menu">
            <span className={`block h-px w-5 bg-[#F0EBE3] transition-all duration-300 origin-center ${open?'rotate-45 translate-y-[7px]':''}`} />
            <span className={`block h-px w-5 bg-[#F0EBE3] transition-opacity duration-300 ${open?'opacity-0':''}`} />
            <span className={`block h-px w-5 bg-[#F0EBE3] transition-all duration-300 origin-center ${open?'-rotate-45 -translate-y-[7px]':''}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${open?'max-h-96':'max-h-0'}`}>
          <div className="bg-[#0A0A0A] border-t border-white/[0.06] px-6 py-3 flex flex-col">
            {NAV.map(n => (
              <button key={n.id} onClick={() => { scrollTo(n.id); setOpen(false) }}
                className={`text-left py-3 text-base font-medium border-b border-white/[0.05] transition-colors
                  ${active===n.id?'text-[#C8A84B]':'text-[#8A8178] hover:text-[#F0EBE3]'}`}>
                {n.label}
              </button>
            ))}
            <button onClick={() => { scrollTo('resume'); setOpen(false) }}
              className="mt-3 text-center text-sm font-bold bg-[#C8A84B] text-[#0A0A0A] px-5 py-3 rounded-lg">
              Download CV
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
