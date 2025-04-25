import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '../UI/SectionTitle'
import ProjectCard from './ProjectCard'

const ProjectsSection = () => {
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
        staggerChildren: 0.2
      }
    }
  }

  // Updated projects with GitHub URLs
  const projects = [
    {
      title: 'Automated Product Analysis System',
      description: 'An advanced system that processes product images and extracts meaningful data using deep learning and NLP. Features include object classification, OCR, price recognition, and freshness detection for automated product evaluation.',
      image: '/src/assets/1.png',
      tags: ['PyTorch', 'PaddleOCR', 'TensorFlow', 'SpaCy', 'Computer Vision'],
      videoUrl: 'https://drive.google.com/file/d/13biDQIrSwb5_NfNFSAOhaOD8auUR4UZ9/view',
      githubUrl: 'https://github.com/ASINRAJA123/Automated-Date-Extraction-and-Product-Classification'
    },
    {
      title: 'Hand-Object Grasping System',
      description: 'A vision-based grasping system for robotic arms that detects hand-object interactions and estimates precise grasping coordinates using YOLO 11 for real-time object detection and orientation estimation.',
      image: '/src/assets/2.png',
      tags: ['YOLO 11', 'OpenCV', 'Computer Vision', 'Robotic Control'],
      videoUrl: 'https://drive.google.com/file/d/1eh-FDm00CiQEqmg5vlx0yJIPDW9u1Pv5/view',
      githubUrl: 'https://github.com/ASINRAJA123/Yolo-Hand-Grasping-System'
    },
    {
      title: 'AI-Driven Oil Spill Detection',
      description: 'An automated system that integrates AIS data and satellite imagery for real-time complete automated detection of oil spills using machine learning, deep learning, and geospatial analytics to enhance maritime safety and environmental protection.',
      image: '/src/assets/3.png',
      tags: ['LSTM', 'GRU', 'SAR Images', 'DeepLabv3', 'Sentinel-1'],
      videoUrl: 'https://drive.google.com/file/d/1W8SWS76n4n9lrRfLqfB4NzinLenSLkpL/view',
      githubUrl: 'https://github.com/ASINRAJA123/OIL_SPILL_DETECTION'
    },
    {
      title: 'Real-Time Deforestation Detection',
      description: 'An automated and scalable system leveraging Sentinel-2 satellite imagery and Sentinel Hub API to monitor and detect deforestation in near real-time by analyzing temporal changes in vegetation indices.',
      image: '/src/assets/4.png',
      tags: ['Sentinel Hub API', 'Machine Learning', 'NDVI', 'Remote Sensing'],
      videoUrl: 'https://drive.google.com/file/d/1k7Rq4I4xvy6pB_wrZUgLp7r2b01Ha5oO/view',
      githubUrl: 'https://github.com/ASINRAJA123/Real-Time_Deforestation_Detection'
    },
    {
      title: 'Smart Grocery Item Counter',
      description: 'A real-time system that automatically counts grocery items using OCR text recognition and ResNet-based image classification. Perfect for automated checkout systems, inventory management, and smart retail shelves.',
      image: '/src/assets/5.png',
      tags: ['OCR', 'ResNet CNN', 'Real-time Processing', 'Computer Vision'],
      videoUrl: 'https://www.linkedin.com/posts/asin-raja-0b6110289_computervision-deeplearning-aiprojects-activity-7316861934211932161-V1eV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFHo13kBGuAWtX2rUaQBSAzAyO3FG7yGsfA',
    },
    {
      title: 'Central Silk Board Data Analysis',
      description: 'Ongoing project focused on analyzing data for the Central Silk Board using advanced data analytics and machine learning techniques to derive meaningful insights and actionable recommendations.',
      image: '/src/assets/6.png',
      tags: ['Data Analysis', 'Machine Learning', 'Visualization', 'Research'],
    },
    {
      title: 'AI Company Voice Assistant (Ongoing)',
      description: 'An ongoing project developing a customized voice assistant for AI companies with specialized functionality and domain-specific knowledge for enhanced user interactions.',
      image: '/src/assets/7.png',
      tags: ['NLP', 'Speech Recognition', 'AI Assistant', 'Personalization'],
    },
    {
      title: 'Stock Market Chatbot (Ongoing)',
      description: 'An ongoing development of an intelligent chatbot that provides real-time stock market information, analysis, and insights using modern AI technologies.',
      image: '/src/assets/8.png',
      tags: ['RAG', 'Gemini', 'LangChain', 'Financial Analysis'],
    }
  ]

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="section-container">
        <SectionTitle
          title="My Projects"
          subtitle="Advanced AI & Computer Vision Solutions I've Developed"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection