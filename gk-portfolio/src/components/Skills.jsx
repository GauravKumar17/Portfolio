import { useReveal } from '../hooks/useReveal'

const GROUPS = [
  { id:'lang',  title:'Languages',    items:['C++','JavaScript','TypeScript','Python','Kotlin','C'],                          dot:'#F59E0B' },
  { id:'fe',    title:'Frontend',     items:['React.js','Next.js','React Native','Tailwind CSS','HTML5','CSS3','Jetpack Compose'], dot:'#38BDF8' },
  { id:'be',    title:'Backend',      items:['Node.js','Express.js','WebSockets','REST APIs','WebRTC'],                       dot:'#34D399' },
  { id:'db',    title:'Databases',    items:['PostgreSQL','MongoDB','Prisma ORM','Redis'],                                    dot:'#A78BFA' },
  { id:'tools', title:'Tools & DevOps', items:['Git','GitHub','Docker','Turborepo','CI/CD Pipelines','Postman','Clerk Auth','Cloudinary'], dot:'#FB7185', wide:true },
]
const CERTS = [
  { name:'Cloud Computing', org:'NPTEL', date:'Nov 2025', dot:'#38BDF8' },
  { name:'Complete Data Science, ML, DL & NLP Bootcamp', org:'Udemy', date:'Jul 2025', dot:'#A78BFA' },
  { name:'Data Structure And Algorithms - Abdul Bari', org:'Udemy', date:'Jul 2025', dot:'#A78BFA' },
  {name:'Android Development', org:'Coursera', date:'Jul 2025', dot:'#A78BFA' }
]

function SkillCard({ g, delay }) {
  const ref = useReveal('sr-sc', delay)
  return (
    <div ref={ref} className={`sr-sc border border-white/[0.08] rounded-2xl p-6 md:p-7 bg-[#1A1A1A]
      hover:border-white/[0.16] hover:-translate-y-1 transition-all duration-300 ${g.wide ? 'md:col-span-2' : ''}`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: g.dot }} />
          <h3 className="font-serif italic font-bold text-lg text-[#F0EBE3]">{g.title}</h3>
        </div>
        <span className="font-mono text-[#5A554F] text-xs">{g.items.length} skills</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {g.items.map(item => (
          <span key={item} className="inline-block font-mono text-sm px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.07] text-[#8A8178]
            hover:text-[#F0EBE3] hover:border-white/[0.15] hover:bg-white/[0.07]
            transition-all duration-200 cursor-default">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function CertCard({ c, delay }) {
  const ref = useReveal('sr', delay)
  return (
    <div ref={ref} className="sr flex items-start gap-4 border border-white/[0.08] rounded-2xl p-6 bg-[#1A1A1A]
      hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300">
      <span className="text-2xl flex-shrink-0 mt-0.5">🏅</span>
      <div>
        <p className="text-[#F0EBE3] text-base font-semibold leading-snug">{c.name}</p>
        <p className="text-[#8A8178] text-sm font-mono mt-1.5">
          <span style={{ color: c.dot }}>{c.org}</span> · {c.date}
        </p>
      </div>
    </div>
  )
}

export default function Skills() {
  const hRef = useReveal('sr', 0)
  return (
    <section id="skills" className="py-24 md:py-32 bg-[#111111]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div ref={hRef} className="sr flex flex-wrap items-end justify-between gap-4 mb-12 pb-6 border-b border-white/[0.08]">
          <div className="flex items-baseline gap-5">
            <span className="font-serif italic text-[#5A554F]/30 text-6xl md:text-8xl font-bold leading-none select-none">03</span>
            <div>
              <p className="font-mono text-[#C8A84B] text-xs tracking-[0.18em] uppercase mb-1">Capabilities</p>
              <h2 className="font-serif italic font-bold text-3xl md:text-5xl text-[#F0EBE3] tracking-tight">Skills</h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {GROUPS.map((g, i) => <SkillCard key={g.id} g={g} delay={i * 70} />)}
        </div>

        <div>
          <p className="font-mono text-[#C8A84B] text-xs tracking-[0.14em] uppercase mb-4 mt-8">Certifications</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTS.map((c, i) => <CertCard key={c.name} c={c} delay={300 + i * 80} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
