import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiUser, FiCpu } from 'react-icons/fi'

const ChatInterface = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your personal assistant. Ask me anything about Asin Raja's resume, projects, or experience!",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
  
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);
  
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
        // credentials: 'include',  // Important for cookies/sessions if needed
        mode: 'cors'  // Explicitly enable CORS mode
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.reply || "I couldn't find that information.",
        sender: 'bot',
        timestamp: new Date()
      };
  
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setError(error.message || "Failed to connect to the server.");
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, type: 'spring', stiffness: 500, damping: 25 }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.div
      className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Asin's Resume Assistant</h3>
            <p className="text-xs text-blue-100">Powered by Gemini & Llama3</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white rounded-tr-none'
                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
            }`}>
              <div className="flex items-center mb-1">
                {message.sender === 'bot' ? (
                  <FiCpu className="mr-1 text-gray-500" size={14} />
                ) : (
                  <FiUser className="mr-1 text-blue-200" size={14} />
                )}
                <span className={`text-xs ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none p-3 border border-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-xs p-2 bg-red-50 rounded mb-2">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my experience..."
            className="flex-grow px-4 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={!input.trim() || isTyping}
          >
            <FiSend size={20} />
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default ChatInterface