import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiEye, FiX, FiGithub, FiExternalLink } from 'react-icons/fi'

const ProjectCard = ({ project, index }) => {
  const [showDetails, setShowDetails] = useState(false)

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.2
      }
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  const modalVariants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 30 }
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  // Check if GitHub URL exists
  const hasGithubLink = project.githubUrl && project.githubUrl.trim() !== '';
  
  // Check if video URL exists
  const hasVideoLink = project.videoUrl && project.videoUrl.trim() !== '';

  return (
    <>
      <motion.div
        variants={cardVariants}
        className="card group overflow-hidden"
      >
        {/* Project Image */}
        <div className="h-48 overflow-hidden rounded-lg mb-4 relative">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
              onClick={() => setShowDetails(true)}
              className="bg-white text-secondary-800 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <FiEye size={20} />
            </button>
          </div>
        </div>

        {/* Project Info */}
        <h3 className="text-xl font-bold text-secondary-800 mb-2">
          {project.title}
        </h3>
        <p className="text-secondary-600 line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Project Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-70"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setShowDetails(false)}
          ></motion.div>
          
          <motion.div 
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button 
              className="absolute top-4 right-4 p-2 bg-secondary-100 hover:bg-secondary-200 rounded-full transition-colors"
              onClick={() => setShowDetails(false)}
            >
              <FiX size={20} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                {project.title}
              </h2>
              
              {/* Image Thumbnail (instead of video) */}
              <div className="mb-6 aspect-video rounded-lg overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <h3 className="text-lg font-medium text-secondary-800 mb-2">Description</h3>
              <p className="text-secondary-600 mb-4">
                {project.description}
              </p>
              
              <h3 className="text-lg font-medium text-secondary-800 mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                {hasGithubLink && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary flex items-center space-x-2"
                  >
                    <FiGithub />
                    <span>View Code</span>
                  </a>
                )}
                
                {hasVideoLink && (
                  <a 
                    href={project.videoUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary flex items-center space-x-2"
                  >
                    <FiExternalLink />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default ProjectCard