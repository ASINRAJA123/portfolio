import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiArrowDown } from 'react-icons/fi'
import { useEffect } from 'react'

const HeroSection = () => {
  // Direct DOM manipulation for scrolling - side-stepping React's event system
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Using native browser method
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-white to-primary-50"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="section-container flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <h2 className="text-xl md:text-2xl font-medium text-primary-500 mb-3">
            Welcome to my portfolio
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-secondary-900 mb-4">
            I'm a Aspiring{' '}
            <span className="text-primary-500">
              <TypeAnimation
                sequence={[
                  'ML Engineer',
                  2000,
                  'Data Scientist',
                  2000,
                  'AI Engineer',
                  2000,
                  'Researcher',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-secondary-600 max-w-3xl mx-auto">
            Aspiring Machine Learning developer focused on deep learning, computer vision, and NLP to solve real-world problems
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
        >
          {/* Simple HTML button with inline style */}
          <button 
            type="button"
            onClick={() => scrollToElement('projects')} 
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--color-primary-500, #4F46E5)',
              color: 'white',
              borderRadius: '0.5rem',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              position: 'relative'
            }}
          >
            View My Projects
          </button>
          
          {/* Direct HTML anchor with inline style for external link */}
          <a 
            href="https://github.com/ASINRAJA123" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'white',
              color: 'var(--color-secondary-800, #1F2937)',
              borderRadius: '0.5rem',
              fontWeight: '500',
              border: '1px solid var(--color-secondary-200, #E5E7EB)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              zIndex: 10,
              position: 'relative'
            }}
          >
            GitHub Profile
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 1,
            repeat: Infinity, 
            repeatType: "reverse", 
            repeatDelay: 0.2 
          }}
          className="absolute bottom-10"
          style={{ zIndex: 5 }}
        >
          {/* Basic button with inline styles */}
          <button
            type="button"
            onClick={() => scrollToElement('about')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-secondary-500, #6B7280)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              zIndex: 10,
              position: 'relative'
            }}
          >
            <span style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Scroll Down</span>
            <FiArrowDown size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection