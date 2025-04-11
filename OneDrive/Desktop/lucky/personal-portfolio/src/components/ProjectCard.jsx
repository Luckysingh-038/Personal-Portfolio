import React from "react";
import { ExternalLink, Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";

const ProjectCard = ({ 
  project, 
  isDarkMode, 
  isLoading = false,
  onFavorite = () => {},
  isFavorited = false 
}) => {
  const { title, description, tags, date, link, image } = project;

  if (isLoading) {
    return (
      <div className={`
        rounded-xl p-6 animate-pulse
        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}
      `}>
        <div className="h-6 w-3/4 bg-gray-400 rounded mb-4" />
        <div className="h-4 w-full bg-gray-400 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-400 rounded mb-4" />
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-6 w-16 bg-gray-400 rounded" />
          ))}
        </div>
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
      {/* Optional Project Image */}
      

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
            <button
              onClick={() => onFavorite(project)}
              className={`
                p-2 rounded-full transition-colors duration-200
                ${isDarkMode 
                  ? "hover:bg-gray-700" 
                  : "hover:bg-purple-100"
                }
              `}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Star
                className={`w-5 h-5 ${
                  isFavorited 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-gray-400"
                }`}
              />
            </button>
            
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                p-2 rounded-full transition-colors duration-200
                ${isDarkMode 
                  ? "text-purple-400 hover:bg-gray-700 hover:text-purple-300" 
                  : "text-purple-600 hover:bg-purple-100 hover:text-purple-500"
                }
              `}
              aria-label={`View project: ${title}`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Description */}
        <p className={`
          mb-4 line-clamp-3
          ${isDarkMode ? "text-gray-300" : "text-gray-700"}
        `}>
          {description}
        </p>

        {/* Tags */}
        <div 
          className="flex flex-wrap gap-2" 
          aria-label="Technologies used"
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`
                px-3 py-1 text-sm rounded-full transition-colors duration-200
                ${isDarkMode 
                  ? "bg-purple-900/50 text-purple-200 hover:bg-purple-800/50" 
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;