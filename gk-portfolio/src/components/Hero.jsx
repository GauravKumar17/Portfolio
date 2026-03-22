import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const ROLES = ['FullStack Developer', 'Mobile App Dev', 'AI Integrator', 'Backend Engineer']

function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const word = ROLES[idx]
    let ms   // how long before next tick
    let next // what to do on tick

    if (!del && txt.length < word.length) {
      ms   = 65
      next = () => setTxt(word.slice(0, txt.length + 1))
    } else if (!del && txt.length === word.length) {
      ms   = 2200               // hold fully-typed word
      next = () => setDel(true)
    } else if (del && txt.length > 0) {
      ms   = 30
      next = () => setTxt(prev => prev.slice(0, -1))
    } else {
      // txt === '' while deleting → move to next word
      ms   = 80
      next = () => {
        setDel(false)
        setIdx(i => (i + 1) % ROLES.length)
      }
    }

    const id = setTimeout(next, ms)
    return () => clearTimeout(id)
  }, [txt, del, idx])

  // No opacity here — the outer sr wrapper controls visibility.
  // Just render the text and cursor at all times.
  return (
    <span className="font-mono text-[#8A8178] text-base md:text-lg tracking-wide">
      {txt}
      <span className="cursor-blink inline-block w-0.5 h-[1.1em] bg-[#C8A84B] ml-0.5 align-middle" />
    </span>
  )
}

function StatCounter({ to, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const num = parseFloat(to)
      const isFloat = String(to).includes('.')
      let start = null
      const step = ts => {
        if (!start) start = ts
        const p = Math.min((ts - start) / 1600, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setVal(isFloat ? (num * ease).toFixed(2) : Math.floor(num * ease))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [to])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function Hero() {
  const tagRef      = useReveal('sr', 0)
  const n1Ref       = useReveal('sr', 100)
  const n2Ref       = useReveal('sr', 200)
  const bioDesktop  = useReveal('sr', 380)
  const bioMobile   = useReveal('sr', 380)
  const ctaRef      = useReveal('sr', 450)
  const statsRef    = useReveal('sr', 520)

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-20 overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[#C8A84B]/[0.035] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#C8A84B]/[0.025] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 lg:px-10 flex flex-col gap-7 pt-8">

        {/* Availability tag */}
        <div ref={tagRef} className="sr flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 border border-[#C8A84B]/30 bg-[#C8A84B]/[0.07]
            text-[#C8A84B] text-xs font-mono tracking-[0.14em] uppercase px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A84B] animate-pulse" />
            B.Tech CSE · LPU · 8.34 CGPA
          </span>
          <span className="hidden md:block text-[#5A554F] text-xs font-mono tracking-widest">
            Available for Opportunities
          </span>
        </div>

        {/* Name + Photo row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

          {/* Left — name stack */}
          <div className="flex-1">
            <h1 ref={n1Ref}
              className="sr font-serif italic font-bold leading-[0.9] tracking-tighter
                text-[clamp(4.5rem,13vw,11rem)] text-[#F0EBE3]">
              Gaurav
            </h1>
            <h1 ref={n2Ref}
              className="sr sd1 font-serif italic font-bold leading-[0.9] tracking-tighter
                text-[clamp(4.5rem,13vw,11rem)] gold-text">
              Kumar
            </h1>
          </div>

          {/* Right — photo on desktop */}
          <div className="hidden lg:flex flex-col items-end gap-4 pb-2 flex-shrink-0">
            {/* Photo */}
            <div className="relative w-64 h-80 xl:w-72 xl:h-96">
              {/* Decorative offset border */}
              <div className="absolute -bottom-2.5 -right-2.5 w-full h-full border border-[#C8A84B]/20 rounded-2xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/[0.1]">
               
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <img src="/Gaurav.jpeg" alt="Gaurav Kumar" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
            {/* Desktop role + bio */}
            <div className="flex flex-col gap-2 text-right max-w-[220px]">
              <Typewriter />
              <p ref={bioDesktop} className="sr text-[#8A8178] text-sm leading-relaxed">
                Building real-time apps, mobile products &amp; AI-powered tools at LPU, Phagwara.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile — photo + role + bio */}
        <div className="lg:hidden flex flex-col gap-4">
          {/* Photo on mobile — smaller, inline */}
          <div className="relative w-28 h-32 self-start">
            <div className="absolute -bottom-2 -right-2 w-full h-full border border-[#C8A84B]/20 rounded-xl" />
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#1A1A1A] border border-white/[0.1]">
              {/*
                TO ADD YOUR PHOTO:
                <img src="/photo.jpg" alt="Gaurav Kumar" className="w-full h-full object-cover object-top" />
              */}
              <div className="w-full h-full flex items-center justify-center">
                <img src="/Gaurav.jpeg" alt="Gaurav Kumar" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
          <Typewriter />
          <p ref={bioMobile} className="sr text-[#8A8178] text-base md:text-lg leading-relaxed max-w-lg">
            Building real-time apps, mobile products &amp; AI-powered tools while studying full-time at LPU.
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="sr flex flex-wrap items-center gap-3 md:gap-4">
          <button
            onClick={() => scrollTo('projects')}
            className="group flex items-center gap-2.5 bg-[#C8A84B] hover:bg-[#A88730]
              text-[#0A0A0A] text-sm font-bold tracking-wide px-6 py-3.5 rounded-lg
              transition-all duration-200 hover:-translate-y-0.5">
            View Projects
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
          <button
            onClick={() => scrollTo('resume')}
            className="text-sm font-semibold text-[#F0EBE3] border border-white/[0.12]
              hover:border-[#C8A84B]/40 hover:text-[#C8A84B] px-6 py-3.5 rounded-lg
              transition-all duration-200 hover:-translate-y-0.5">
            Download CV
          </button>
          <div className="flex items-center gap-5 ml-1">
            {[
              { l: 'GitHub',   h: 'https://github.com/GauravKumar17' },
              { l: 'LinkedIn', h: 'https://www.linkedin.com/in/gauravkumar170303' },
            ].map(s => (
              <a key={s.l} href={s.h} target="_blank" rel="noreferrer"
                className="text-[#8A8178] hover:text-[#C8A84B] text-sm font-medium transition-colors
                  underline underline-offset-4 decoration-white/20 hover:decoration-[#C8A84B]/40">
                {s.l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div ref={statsRef} className="sr relative z-10 mt-10 border-t border-white/[0.07]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07]">
            {[
              { n: '3',    s: '',  label: 'Major Projects' },
              { n: '8.34', s: '',  label: 'CGPA at LPU' },
              { n: '350+',    s: '+', label: 'Leetcode Problems Solved' },
              { n: '5+',    s: '',  label: 'Certifications' },
            ].map((st, i) => (
              <div key={st.label} className={`py-7 px-5 md:px-8 flex flex-col gap-1 ${i === 0 ? 'pl-0' : ''}`}>
                <span className="font-serif italic text-3xl md:text-4xl font-bold text-[#C8A84B] leading-none">
                  <StatCounter to={st.n} suffix={st.s} />
                </span>
                <span className="text-[#8A8178] text-sm font-medium tracking-wide mt-0.5">{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
