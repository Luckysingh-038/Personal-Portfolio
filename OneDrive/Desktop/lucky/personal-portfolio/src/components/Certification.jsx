import React from "react";
import { Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const CertificateCard = ({ 
  certificate, 
  isDarkMode, 
  isLoading = false
}) => {
  const { title, issuer, date } = certificate;

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
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className={`
              text-xl font-semibold mb-1
              ${isDarkMode ? "text-white" : "text-gray-900"}
            `}>
              {title}
            </h3>
          </div>
          
          <div className="flex items-center">
            <span className={`
              text-sm flex items-center gap-1
              ${isDarkMode ? "text-purple-400" : "text-purple-600"}
            `}>
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {date}
            </span>
          </div>
        </div>

        {/* Issuer */}
        <div 
          className="flex items-center gap-1" 
          aria-label="Issuer"
        >
          <Award className="w-4 h-4" />
          <span className={`
            text-sm
            ${isDarkMode ? "text-gray-400" : "text-gray-600"}
          `}>
            {issuer}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default CertificateCard;