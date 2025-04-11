import React from 'react';

const SkillSection = ({ 
  category = "", 
  skills = [], 
  isDarkMode = false 
}) => {
  return (
    <div className="mb-8">
      <h3 className={`
        text-xl font-semibold mb-4
        bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
        bg-clip-text text-transparent
        ${skills.length > 0 ? 'flex items-center gap-2' : ''}
      `}>
        {category}
        {skills.length > 0 && (
          <span className="text-sm opacity-60">
            ({skills.length})
          </span>
        )}
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`
              px-4 py-2 rounded-lg
              transition-all duration-300 ease-in-out
              group relative overflow-hidden
              ${isDarkMode
                ? "bg-gray-900/50 text-purple-200 hover:bg-gray-800/70"
                : "bg-white/30 text-purple-800 hover:bg-purple-100/50"
              }
              border border-transparent
              hover:border-indigo-500/30
              cursor-default
              shadow-[0_0_20px_rgba(79,70,229,0.15)]
              hover:shadow-[0_0_35px_rgba(79,70,229,0.25)]
              hover:transform hover:scale-105
            `}
          >
            {/* Skill text */}
            <span className="relative z-10">
              {skill}
            </span>

            {/* Subtle hover effect background */}
            <div className={`
              absolute inset-0 opacity-0 
              group-hover:opacity-100
              transition-opacity duration-300
              bg-gradient-to-r 
              ${isDarkMode
                ? "from-purple-500/10 to-blue-500/10"
                : "from-purple-200/30 to-blue-200/30"
              }
            `} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillSection;