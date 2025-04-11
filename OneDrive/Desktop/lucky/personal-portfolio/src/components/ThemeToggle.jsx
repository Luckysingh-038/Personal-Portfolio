import { Moon, Sun } from "lucide-react";
import React, { useState } from "react";

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          fixed right-6 top-6 
          flex items-center justify-center 
          w-11 h-11 rounded-full
          transition-all duration-300 
          shadow-lg
          before:content-[''] before:absolute before:inset-0 
          before:rounded-full before:opacity-40
          before:bg-gradient-to-b
          overflow-hidden
          z-30
          ${
            isDarkMode
              ? "bg-gray-900 border-gray-700 hover:bg-gray-800 before:from-purple-400/20 before:to-transparent"
              : "bg-white/90 hover:bg-white before:from-purple-200 before:to-transparent"
          }
        `}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <div className="relative w-6 h-6">
          <div
            className={`
              absolute inset-0 
              transition-all duration-500
              transform
              ${isDarkMode ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}
            `}
          >
            <Sun 
              className={`
                w-6 h-6 
                ${isDarkMode ? 'text-purple-200' : 'text-purple-600'}
                drop-shadow-lg
              `} 
              aria-hidden="true" 
            />
          </div>
          <div
            className={`
              absolute inset-0 
              transition-all duration-500
              transform
              ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-50'}
            `}
          >
            <Moon 
              className="w-6 h-6 text-purple-300 drop-shadow-lg" 
              aria-hidden="true" 
            />
          </div>
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
          absolute right-16 top-1/2 -translate-y-1/2
          px-4 py-2 
          text-sm font-medium
          transition-all duration-300
          rounded-xl
          backdrop-blur-md
          shadow-lg
          ${showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
          ${
            isDarkMode
              ? 'bg-gray-900/90 text-gray-100 before:from-purple-400/10'
              : 'bg-white/90 text-gray-900 before:from-purple-200/50'
          }
          before:content-[''] before:absolute before:inset-0 
          before:rounded-xl before:opacity-50
          before:bg-gradient-to-b before:from-white/20 before:to-transparent
        `}
      >
        {`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      </div>
    </div>
  );
};

export default ThemeToggle;