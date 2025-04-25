import { motion } from 'framer-motion'

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-16">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
        <span className="block w-24 h-1 bg-primary-500 mx-auto mt-4"></span>
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className="section-subtitle mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default SectionTitle