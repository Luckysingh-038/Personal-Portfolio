import React from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

const AchievementCard = ({ 
  achievement, 
  isDarkMode, 
  isLoading = false
}) => {
  const { title, description } = achievement;

  if (isLoading) {
    return (
      <div className={`
        rounded-xl p-6 animate-pulse
        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}
      `}>
        <div className="h-6 w-3/4 bg-gray-400 rounded mb-4" />
        <div className="h-4 w-full bg-gray-400 rounded mb-2" />
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        group relative overflow-hidden rounded-xl backdrop-blur-md
        ${isDarkMode 
          ? "bg-gray-900/80 hover:bg-gray-800/90" 
          : "bg-white/40 hover:bg-white/60"
        }
        border border-transparent
        ${isDarkMode ? "hover:border-gray-700" : "hover:border-purple-200"}
        transition-all duration-300 hover:-translate-y-2
        shadow-[0_0_30px_rgba(79,70,229,0.15)]
        hover:shadow-[0_0_35px_rgba(79,70,229,0.35)]
      `}
    >
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start mb-4 gap-3">
          <div className={`
            p-2 rounded-full
            ${isDarkMode 
              ? "bg-purple-900/50 text-purple-300" 
              : "bg-purple-100 text-purple-700"
            }
          `}>
            <Trophy className="w-5 h-5" />
          </div>
          
          <div>
            <h3 className={`
              text-xl font-semibold mb-1
              ${isDarkMode ? "text-white" : "text-gray-900"}
            `}>
              {title}
            </h3>
            
            {/* Description */}
            {description && (
              <p className={`
                ${isDarkMode ? "text-gray-300" : "text-gray-700"}
              `}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default AchievementCard;