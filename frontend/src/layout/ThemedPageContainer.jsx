// src/components/layout/ThemedPageContainer.jsx

import React from 'react';

const ThemedPageContainer = ({ children }) => {
  return (
    // This is the main container that sets the background, font, and text color for the entire page.
    <div className="w-full bg-black text-gray-300 font-mono flex flex-col items-center relative overflow-x-hidden">
      
      {/* Background Layer 1: A subtle gradient for depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-blue-900/40"></div>
      
      {/* Background Layer 2: The digital grid pattern */}
      <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      
      {/* Content Area: Ensures your page content appears ON TOP of the background effects */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export default ThemedPageContainer;