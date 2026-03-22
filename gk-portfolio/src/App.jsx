import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Marquee  from './components/Marquee'
import Projects from './components/Projects'
import Skills   from './components/Skills'
import About    from './components/About'
import Resume   from './components/Resume'
import Contact  from './components/Contact'
import Footer   from './components/Footer'
import Chatbot  from './components/Chatbot'

export default function App() {
  return (
    <div className="grain min-h-screen bg-[#0A0A0A] text-[#F0EBE3] font-sans">
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <Skills />
      <About />
      <Resume />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  )
}
