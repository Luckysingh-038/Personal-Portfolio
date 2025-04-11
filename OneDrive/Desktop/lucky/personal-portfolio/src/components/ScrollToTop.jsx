import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollToTop = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    const handleScroll = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        const scrollY = window.scrollY;
        setIsVisible(scrollY > 200);
        timeoutId = null;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    const duration = 800;
    const start = window.scrollY;
    const startTime = performance.now();
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const animate = currentTime => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - easeOutCubic(progress)));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="relative">
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          fixed left-4 bottom-4
          flex items-center justify-center 
          w-11 h-11 rounded-full
          transition-all duration-300 
          shadow-lg
          before:content-[''] before:absolute before:inset-0 
          before:rounded-full before:opacity-40
          before:bg-gradient-to-b
          overflow-hidden
          z-30
          ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          ${
            isDarkMode
              ? "bg-gray-900 border-gray-700 hover:bg-gray-800 before:from-purple-400/20 before:to-transparent"
              : "bg-white/90 hover:bg-white before:from-purple-200 before:to-transparent"
          }
        `}
        aria-label="Scroll to top"
      >
        <div className="relative w-6 h-6">
          <ArrowUp 
            className={`
              w-6 h-6
              transition-all duration-300
              transform hover:-translate-y-0.5
              ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}
              drop-shadow-lg
            `} 
            aria-hidden="true" 
          />
        </div>
        
        {/* Glossy overlay effect */}
        <div className={`
          absolute inset-0 rounded-full
          bg-gradient-to-b from-white/20 to-transparent
          pointer-events-none
        `} />
      </button>

      {/* Tooltip with glossy effect */}
      <div
        className={`
          fixed left-14 bottom-4
          px-2 py-1 
          text-xs font-medium
          transition-all duration-300
          rounded-lg
          backdrop-blur-md
          shadow-lg
          whitespace-nowrap
          ${showTooltip && isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
          ${
            isDarkMode
              ? 'bg-gray-900/90 text-gray-100 before:from-purple-400/10'
              : 'bg-white/90 text-gray-900 before:from-purple-200/50'
          }
          before:content-[''] before:absolute before:inset-0 
          before:rounded-lg before:opacity-50
          before:bg-gradient-to-b before:from-white/20 before:to-transparent
        `}
      >
        Scroll to top
      </div>
    </div>
  );
};

export default ScrollToTop;