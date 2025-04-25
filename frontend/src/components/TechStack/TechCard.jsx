import { motion } from 'framer-motion'

const TechCard = ({ category, icon, skills, index }) => {
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  }
  // Different background colors for variety
  const bgColors = [
    'bg-primary-50 hover:bg-primary-100',
    'bg-accent-50 hover:bg-accent-100',
    'bg-green-50 hover:bg-green-100',
    'bg-purple-50 hover:bg-purple-100',
    'bg-yellow-50 hover:bg-yellow-100',
    'bg-blue-50 hover:bg-blue-100',
    'bg-red-50 hover:bg-red-100',
    'bg-indigo-50 hover:bg-indigo-100'
  ]
  const iconColors = [
    'text-primary-500',
    'text-accent-500',
    'text-green-500',
    'text-purple-500',
    'text-yellow-500',
    'text-blue-500',
    'text-red-500',
    'text-indigo-500'
  ]
  return (
    <motion.div
      variants={cardVariants}
      className={`card ${bgColors[index % bgColors.length]} transition-all duration-300 group hover:scale-105 hover:shadow-medium`}
    >
      <div className={`text-3xl ${iconColors[index % iconColors.length]} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-secondary-800 group-hover:text-secondary-900">
        {category}
      </h3>
      <ul className="space-y-2">
        {skills.map((skill, skillIndex) => (
          <li key={skillIndex} className="text-secondary-600 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 mr-2"></span>
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default TechCard