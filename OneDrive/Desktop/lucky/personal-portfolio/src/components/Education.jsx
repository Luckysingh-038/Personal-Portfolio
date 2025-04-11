import React from "react";
import { School, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const EducationCard = ({ 
  education, 
  isDarkMode, 
  isLoading = false
}) => {
  const { institution, degree, date, location, gpa } = education;

  if (isLoading) {
    return (
      <div className={`
        rounded-xl p-6 animate-pulse
        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}
      `}>
        <div className="h-6 w-3/4 bg-gray-400 rounded mb-4" />
        <div className="h-4 w-full bg-gray-400 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-400 rounded mb-4" />
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
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className={`
              text-xl font-semibold mb-1
              ${isDarkMode ? "text-white" : "text-gray-900"}
            `}>
              {institution}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`
                text-sm flex items-center gap-1
                ${isDarkMode ? "text-purple-400" : "text-purple-600"}
              `}>
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {date}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`
              px-3 py-1 text-sm rounded-full
              ${isDarkMode 
                ? "bg-purple-900/50 text-purple-200" 
                : "bg-purple-100 text-purple-800"
              }
            `}>
              {gpa}
            </span>
          </div>
        </div>

        {/* Degree */}
        <p className={`
          mb-2
          ${isDarkMode ? "text-gray-300" : "text-gray-700"}
        `}>
          {degree}
        </p>

        {/* Location */}
        <div 
          className="flex items-center gap-1" 
          aria-label="Location"
        >
          <School className="w-4 h-4" />
          <span className={`
            text-sm
            ${isDarkMode ? "text-gray-400" : "text-gray-600"}
          `}>
            {location}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default EducationCard;