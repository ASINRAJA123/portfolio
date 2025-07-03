// src/components/layout/Footer.jsx

import React from 'react';
import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/ASINRAJA123' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/asin-raja-0b6110289' }
  ];

  return (
    <footer className="w-full bg-black border-t border-gray-800 text-gray-400 py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <p className="text-sm">
          © {currentYear} ASIN RAJA M D. SYSTEM_STATUS: <span className="text-green-400">OPERATIONAL</span>
        </p>
        <div className="flex items-center gap-4 text-xl">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;