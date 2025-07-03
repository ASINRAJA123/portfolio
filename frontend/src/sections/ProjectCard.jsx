// src/components/sections/ProjectCard.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import ThemedButton from '../ui/ThemedButton';

const ProjectCard = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false);

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col group transition-all duration-300 hover:border-cyan-400/50"
        onClick={() => setShowDetails(true)}
      >
        <div className="h-48 rounded-md overflow-hidden mb-4 relative cursor-pointer">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-cyan-500 text-black rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform">
              <FiEye size={24} />
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-200 mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-gray-800 text-cyan-400 text-xs rounded-full font-semibold">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-mono">
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetails(false)}
            />
            
            <motion.div
              className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-cyan-400">{project.title}</h2>
                  <button onClick={() => setShowDetails(false)} className="text-gray-500 hover:text-cyan-400">
                    <FiX size={24} />
                  </button>
                </div>
                
                <p className="text-gray-400 mb-6">{project.description}</p>
                
                <h3 className="text-lg font-bold text-gray-300 mb-2 uppercase tracking-wider">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 text-cyan-400 text-xs rounded-full font-semibold">{tag}</span>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.githubUrl && (
                    <ThemedButton as="a" href={project.githubUrl} target="_blank">
                      <FiGithub className="mr-2" /> View Code
                    </ThemedButton>
                  )}
                  {project.videoUrl && (
                    <ThemedButton as="a" href={project.videoUrl} target="_blank" className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white">
                      <FiExternalLink className="mr-2" /> View Demo
                    </ThemedButton>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;