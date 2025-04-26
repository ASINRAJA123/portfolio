import { motion } from 'framer-motion'
import { FiMessageCircle, FiX } from 'react-icons/fi'

const ChatButton = ({ isOpen, onClick }) => {
  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors duration-300 flex items-center gap-2"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isOpen ? (
        <>
          <FiX size={24} />
          <span className="font-medium">Close</span>
        </>
      ) : (
        <>
          <FiMessageCircle size={24} />
          <span className="font-medium">Use me</span>
        </>
      )}
    </motion.button>
  )
}

export default ChatButton