import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../UI/SectionTitle'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi'

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState(null)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/asinraja42@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          _captcha: 'false', // Disable captcha
          _template: 'table' // Better email formatting
        })
      })
      
      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: 'Message sent successfully! I\'ll get back to you soon.'
        })
        
        // Clear form
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Failed to send message. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage(null)
      }, 5000)
    }
  }

  const contactInfo = [
    { icon: <FiMail />, label: 'Email', value: 'asinraja42@gmail.com' },
    { icon: <FiPhone />, label: 'Phone', value: '+91 6381738184' },
    { icon: <FiMapPin />, label: 'Location', value: 'Tamil Nadu, India' }
  ]

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/ASINRAJA123' },
    { icon: <FiLinkedin />, url: 'www.linkedin.com/in/asin-raja-0b6110289' }
  ]

  return (
    <section id="contact" className="py-20 bg-secondary-50">
      <div className="section-container">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a machine learning project in mind or want to discuss AI solutions? Let's connect!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Left column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-secondary-800">
              Let's Connect
            </h3>
            <p className="text-secondary-600 mb-8">
            I'm currently seeking internships & Job Roles in data science roles and am always open to discussing new AI and machine learning projects, research opportunities, or collaborations to solve real-world problems. Feel free to reach out through any of the following methods.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-3 bg-white rounded-lg shadow-soft text-primary-500 mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-800">{item.label}</h4>
                    <p className="text-secondary-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-lg shadow-soft text-secondary-600 hover:text-primary-500 hover:shadow-medium transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-soft">
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {submitMessage.text}
                </div>
              )}

              {/* Hidden FormSubmit fields */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="New message from your portfolio!" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition-all"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition-all"
                  placeholder="Subject of your message"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition-all resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection