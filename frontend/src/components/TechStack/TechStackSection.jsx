import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '../UI/SectionTitle'
import TechCard from './TechCard'
import {
  FiCode, FiDatabase, FiBarChart2, FiEye,
  FiCpu, FiGlobe, FiServer, FiActivity
} from 'react-icons/fi'

const TechStackSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
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
        staggerChildren: 0.1
      }
    }
  }

  const technologies = [
    {
      category: 'Machine Learning',
      icon: <FiCpu />,
      skills: ['PyTorch', 'Scikit-learn', 'CNNs', 'Transfer Learning', 'LSTM']
    },
    {
      category: 'Data Science',
      icon: <FiBarChart2 />,
      skills: ['Pandas', 'NumPy', 'Matplotlib', 'Data Analysis', 'Financial Modelling']
    },
    {
      category: 'Computer Vision',
      icon: <FiEye />,
      skills: ['OpenCV', 'YOLO', 'PaddleOCR', 'Image Processing', 'Video Analysis']
    },
    {
      category: 'Natural Language',
      icon: <FiGlobe />,
      skills: ['Transformers (BERT)', 'LLaMA', 'RAG', 'Gemini', 'LangChain']
    },
    {
      category: 'Programming',
      icon: <FiCode />,
      skills: ['Python', 'SQL', 'Full Stack Development', 'Frontend', 'Backend']
    },
    {
      category: 'Professional',
      icon: <FiActivity />,
      skills: ['Leadership', 'Client Management', 'Critical Thinking', 'Research & Analysis', 'Problem Solving']
    }
  ]

  return (
    <section id="skills" className="py-20 bg-secondary-50">
      <div className="section-container">
        <SectionTitle
          title="My Tech Stack"
          subtitle="AI & Machine Learning Technologies I Work With"
        />
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
            >
              <TechCard
                category={tech.category}
                icon={tech.icon}
                skills={tech.skills}
                index={index}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TechStackSection