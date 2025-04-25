import { motion } from 'framer-motion'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

const NavLinks = ({ mobile = false, setIsOpen = () => {} }) => {
  // Animation variants for links
  const linkVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  }

  const handleLinkClick = () => {
    if (mobile && setIsOpen) {
      setIsOpen(false)
    }
  }

  return (
    <ul className={`flex ${mobile ? 'flex-col space-y-4 px-4' : 'space-x-8'}`}>
      {links.map((link) => (
        <motion.li key={link.name} variants={linkVariants}>
          <a
            href={link.href}
            onClick={handleLinkClick}
            className={`font-medium transition-colors duration-300 ${
              mobile 
                ? 'block py-2 px-4 hover:bg-primary-50 rounded-md' 
                : 'text-secondary-700 hover:text-primary-500'
            }`}
          >
            {link.name}
          </a>
        </motion.li>
      ))}
    </ul>
  )
}

export default NavLinks