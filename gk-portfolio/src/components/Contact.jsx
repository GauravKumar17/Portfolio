import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

// ─── Optional: replace with your Formspree endpoint ───────────────────────────
// 1. Go to https://formspree.io → create free account → new form
// 2. Paste the endpoint here, e.g. 'https://formspree.io/f/xabc1234'
// 3. Leave as '' to use the mailto fallback instead
const FORMSPREE_ENDPOINT = ''
// ─────────────────────────────────────────────────────────────────────────────

function Field({ label, name, value, onChange, placeholder, type = 'text', textarea = false, rows = 5 }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[#5A554F] text-xs tracking-[0.12em] uppercase">{label}</label>
      {textarea
        ? <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows}
            className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#F0EBE3] text-base placeholder:text-[#5A554F] outline-none focus:border-[#C8A84B]/40 focus:bg-[#C8A84B]/[0.02] transition-all duration-200 resize-none" />
        : <input name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} required
            className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#F0EBE3] text-base placeholder:text-[#5A554F] outline-none focus:border-[#C8A84B]/40 focus:bg-[#C8A84B]/[0.02] transition-all duration-200" />
      }
    </div>
  )
}

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const hRef     = useReveal('sr', 0)
  const leftRef  = useReveal('sr-l', 100)
  const rightRef = useReveal('sr-r', 150)

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('loading')

    if (FORMSPREE_ENDPOINT) {
      // ── Formspree (no backend needed) ──────────────────────────────────────
      try {
        const r = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (r.ok) { setStatus('ok'); setForm({ name: '', email: '', subject: '', message: '' }) }
        else setStatus('err')
      } catch { setStatus('err') }
    } else {
      // ── Mailto fallback — opens user's email client ─────────────────────────
      const subject = encodeURIComponent(`[Portfolio] ${form.subject}`)
      const body    = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )
      window.open(`mailto:gauravkumar170303@gmail.com?subject=${subject}&body=${body}`)
      setStatus('ok')
      setForm({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

        <div ref={hRef} className="sr flex flex-wrap items-end justify-between gap-4 mb-12 pb-6 border-b border-white/[0.08]">
          <div className="flex items-baseline gap-5">
            <span className="font-serif italic text-[#5A554F]/30 text-6xl md:text-8xl font-bold leading-none select-none">06</span>
            <div>
              <p className="font-mono text-[#C8A84B] text-xs tracking-[0.18em] uppercase mb-1">Reach Out</p>
              <h2 className="font-serif italic font-bold text-3xl md:text-5xl text-[#F0EBE3] tracking-tight">Let's Talk</h2>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16 items-start">

          {/* Left */}
          <div ref={leftRef} className="sr-l flex flex-col gap-7">
            <p className="font-serif italic font-bold text-4xl md:text-5xl text-[#F0EBE3] leading-snug tracking-tight">
              Open to<br /><span className="gold-text">opportunities.</span>
            </p>
            <p className="text-[#8A8178] text-base md:text-lg leading-relaxed">
              Looking for internships, freelance projects, or want to collaborate? I respond within 24 hours.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { label: 'Email',    val: 'gauravkumar170303@gmail.com', href: 'mailto:gauravkumar170303@gmail.com' },
                { label: 'LinkedIn', val: 'in/gauravkumar170303',        href: 'https://www.linkedin.com/in/gauravkumar170303' },
                { label: 'GitHub',   val: 'GauravKumar17',               href: 'https://github.com/GauravKumar17' },
                { label: 'Phone',    val: '+91 7319814361',              href: 'tel:+917319814361' },
              ].map(c => (
                <a key={c.label} href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  className="group flex items-center justify-between px-5 py-4 rounded-xl border border-white/[0.08]
                    bg-[#1A1A1A] hover:border-[#C8A84B]/25 hover:bg-[#C8A84B]/[0.04]
                    transition-all duration-200 hover:-translate-y-0.5">
                  <div>
                    <span className="font-mono text-[#5A554F] text-xs tracking-widest uppercase block mb-0.5">{c.label}</span>
                    <span className="text-[#F0EBE3] text-sm font-medium group-hover:text-[#C8A84B] transition-colors">{c.val}</span>
                  </div>
                  <span className="text-[#5A554F] group-hover:text-[#C8A84B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 text-lg">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div ref={rightRef} className="sr-r">
            <form onSubmit={submit}
              className="border border-white/[0.08] rounded-2xl p-7 bg-[#1A1A1A] flex flex-col gap-5">
              <h3 className="font-serif italic font-bold text-2xl text-[#F0EBE3]">Send a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name"  name="name"  value={form.name}  onChange={set} placeholder="Your name" />
                <Field label="Email" name="email" value={form.email} onChange={set} placeholder="you@email.com" type="email" />
              </div>
              <Field label="Subject" name="subject" value={form.subject} onChange={set} placeholder="Internship / Collab / Project..." />
              <Field label="Message" name="message" value={form.message} onChange={set} placeholder="Tell me what you're working on..." textarea />

              <button type="submit" disabled={status === 'loading'}
                className="w-full bg-[#C8A84B] hover:bg-[#A88730] disabled:opacity-60 text-[#0A0A0A] text-sm font-bold
                  tracking-wide py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5
                  flex items-center justify-center gap-2">
                {status === 'loading'
                  ? <><span className="w-4 h-4 border-2 border-[#0A0A0A]/20 border-t-[#0A0A0A] rounded-full spin" />Sending…</>
                  : 'Send Message →'
                }
              </button>

              {status === 'ok' && (
                <p className="text-green-400 text-sm text-center">
                  {FORMSPREE_ENDPOINT ? '✓ Sent! I\'ll reply within 24 hours.' : '✓ Your email client opened with the message pre-filled.'}
                </p>
              )}
              {status === 'err' && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Email me at <a href="mailto:gauravkumar170303@gmail.com" className="underline">gauravkumar170303@gmail.com</a>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
