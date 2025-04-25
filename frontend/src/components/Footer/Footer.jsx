import { FiHeart } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
      
      {/* Column 1 - About */}
      <div>
        <h2 className="text-xl font-bold mb-3">Asin Raja M D</h2>
        <p className="text-sm">
          Aspiring Machine Learning & Data Science student passionate about solving real-world problems with AI, deep learning, and computer vision. Focused on continuous learning through impactful projects and research.
        </p>
      </div>

      {/* Column 2 - Quick Links */}
      <div>
        <h2 className="text-xl font-bold mb-3">Quick Links</h2>
        <ul className="text-sm space-y-2">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
            <li key={link} className="hover:underline cursor-pointer">{link}</li>
          ))}
        </ul>
      </div>

      {/* Column 3 - Connect */}
      <div>
        <h2 className="text-xl font-bold mb-3">Connect with Me</h2>
        <p className="text-sm mb-4">Follow for project updates and research insights:</p>
        <div className="flex items-center space-x-4 text-lg">
          <a href="https://github.com/ASINRAJA123" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/asin-raja-0b6110289/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Footer bottom text */}
      <div className="col-span-1 md:col-span-3 text-center mt-10 text-xs text-gray-400">
        <p>© {currentYear} Asin Raja Portfolio. All rights reserved.</p>
        <p className="flex justify-center items-center gap-1 mt-1">
        </p>
      </div>
    </footer>
  )
}

export default Footer
