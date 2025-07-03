// src/App.jsx
import { useState, useEffect } from 'react'; // Import useEffect
import Navbar from './components/Navigation/Navbar';
import HeroSection from './components/Hero/HeroSection';
import AboutSection from './components/About/AboutSection';
import TechStackSection from './components/TechStack/TechStackSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import ContactSection from './components/Contact/ContactSection';
import Footer from './components/Footer/Footer';
import ChatButton from './components/Chat/ChatButton';
import ChatInterface from './components/Chat/ChatInterface';
import LoadingPage from './components/loading/LoadingPage'; // Import the LoadingPage component

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  // Function to call when loading is complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Optional: Simulate loading or perform actual loading logic here if needed
  // For this example, LoadingPage manages its own timer, so this useEffect is not strictly needed
  // unless you want to add other asynchronous tasks before loading completes.
  /*
  useEffect(() => {
    // Example: Fetch data, load assets, etc.
    // Once actual loading is done, call setIsLoading(false);
    // If using the LoadingPage's timer, it will call handleLoadingComplete itself.
  }, []);
  */


  return (
    <> {/* Use a fragment if LoadingPage takes up the full screen */}
      {isLoading ? (
        // Render LoadingPage if isLoading is true
        // Pass the duration and the completion handler
        <LoadingPage duration={5000} onComplete={handleLoadingComplete} />
      ) : (
        // Render the main app content if isLoading is false
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <HeroSection />
            <AboutSection />
            <TechStackSection /> {/* TechStackSection is part of main app, not loading messages */}
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
          <ChatButton isOpen={isChatOpen} onClick={toggleChat} />
          {isChatOpen && <ChatInterface onClose={toggleChat} />}
        </div>
      )}
    </>
  );
}

export default App;