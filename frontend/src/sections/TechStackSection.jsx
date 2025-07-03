// src/components/sections/TechCard.jsx

import { motion } from 'framer-motion';

const TechCard = ({ category, icon, skills }) => {
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 h-full transition-all duration-300 hover:border-cyan-400/50 hover:bg-gray-900"
    >
      <div className="text-3xl text-cyan-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-200">{category}</h3>
      <ul className="space-y-2">
        {skills.map((skill, skillIndex) => (
          <li key={skillIndex} className="text-gray-400 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mr-3 shrink-0"></span>
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TechCard;