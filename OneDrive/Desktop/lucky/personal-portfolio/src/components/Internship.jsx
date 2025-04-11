import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const InternshipCard = ({ 
  internship, 
  isDarkMode, 
  isLoading = false
}) => {
  const { position, company, location, date, description } = internship;

  if (isLoading) {
    return (
      <div className={`
        rounded-xl p-6 animate-pulse
        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}
      `}>
        <div className="h-6 w-3/4 bg-gray-400 rounded mb-4" />
        <div className="h-4 w-full bg-gray-400 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-400 rounded mb-4" />
        <div className="h-4 w-full bg-gray-400 rounded mb-2" />
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
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className={`
              text-xl font-semibold mb-1
              ${isDarkMode ? "text-white" : "text-gray-900"}
            `}>
              {position}
            </h3>
            
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              <span className={`
                text-sm
                ${isDarkMode ? "text-gray-300" : "text-gray-700"}
              `}>
                {company}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <span className={`
                text-sm flex items-center gap-1
                ${isDarkMode ? "text-purple-400" : "text-purple-600"}
              `}>
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {date}
              </span>
              
              {location && (
                <span className={`
                  text-sm flex items-center gap-1
                  ${isDarkMode ? "text-gray-400" : "text-gray-600"}
                `}>
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  {location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <ul className={`
          list-disc pl-5 space-y-1
          ${isDarkMode ? "text-gray-300" : "text-gray-700"}
        `}>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

export default InternshipCard;