import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '../UI/SectionTitle'
import { FiUser, FiBook, FiAward, FiCode, FiDatabase } from 'react-icons/fi'

const AboutSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const stats = [
    { icon: <FiCode />, value: '5+', label: 'ML Projects' },
    { icon: <FiDatabase />, value: '2+', label: 'AI Projects' },
    { icon: <FiAward />, value: '1+', label: 'Data Analysis Project for Central Silk Board' }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="section-container">
        <SectionTitle
          title="About Me"
          subtitle="Get to Know About me"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12"
        >
          {/* Left column - Image */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-100 rounded-lg"></div>
              <div className="relative w-full h-96 bg-secondary-200 rounded-lg overflow-hidden">
                <img 
                  src="/src/assets/profile.png" 
                  alt="Professional photo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right column - Content */}
          <div>
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-secondary-800">
                Machine Learning Developer <span className="text-primary-500">&</span> Data Scientist
              </h3>
              <p className="text-secondary-600 mb-4 leading-relaxed">
                I'm an aspiring Machine Learning and Data Science student with a strong foundation in AI-driven solutions, 
                deep learning, NLP, and computer vision. Currently pursuing my B.Tech in Information Technology at 
                Bannari Amman Institute of Technology.
              </p>
              <p className="text-secondary-600 leading-relaxed">
                I specialize in developing innovative solutions using PyTorch, Scikit-learn, OpenCV, and Transformers. 
                My passion lies in leveraging technology to solve real-world problems through hands-on projects
                ranging from deepfake detection to automated expiry date validation systems.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
            >
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-4 rounded-lg bg-secondary-50 hover:bg-primary-50 transition-colors duration-300"
                >
                  <div className="text-primary-500 text-2xl mb-2">
                    {stat.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-secondary-800">
                    {stat.value}
                  </h4>
                  <p className="text-secondary-600 text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection