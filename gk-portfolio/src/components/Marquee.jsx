const ITEMS = [
  'React.js','TypeScript','Node.js','PostgreSQL','Socket.io','React Native',
  'Next.js','Express.js','MongoDB','Prisma ORM','Tailwind CSS','WebRTC',
  'Kotlin','Docker','Git','Redis','Gemini API','Clerk Auth','Turborepo','CI/CD',
]
const doubled = [...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-[#111111] py-4 select-none">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#111111] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#111111] to-transparent" />
      <div className="marquee-track whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-5">
            <span className="w-1 h-1 rounded-full bg-[#C8A84B]/50 flex-shrink-0" />
            <span className="text-[#8A8178] text-sm font-mono tracking-widest uppercase">{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
