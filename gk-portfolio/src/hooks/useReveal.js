import { useEffect, useRef } from 'react'

export function useReveal(cls = 'sr', delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fire = () => setTimeout(() => el.classList.add('visible'), delay)
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.98 && rect.bottom > 0) { fire(); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { fire(); io.unobserve(el) } },
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
