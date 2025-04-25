import { useState } from 'react'
import Navbar from './components/Navigation/Navbar'
import HeroSection from './components/Hero/HeroSection'
import AboutSection from './components/About/AboutSection'
import TechStackSection from './components/TechStack/TechStackSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import ContactSection from './components/Contact/ContactSection'
import Footer from './components/Footer/Footer'
import ChatButton from './components/Chat/ChatButton'
import ChatInterface from './components/Chat/ChatInterface'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatButton isOpen={isChatOpen} onClick={toggleChat} />
      {isChatOpen && <ChatInterface onClose={toggleChat} />}
    </div>
  )
}

export default App