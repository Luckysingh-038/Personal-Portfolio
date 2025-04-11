import React from 'react';
import { Github, Linkedin, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  {
    icon: <Github className="w-6 h-6" />,
    href: "https://github.com/Luckysingh-038",
    label: "GitHub",
    color: "hover:text-gray-800 dark:hover:text-gray-100"
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    href: "https://www.linkedin.com/in/lucky-singh-48665124b/",
    label: "LinkedIn",
    color: "hover:text-blue-600 dark:hover:text-blue-400"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    href: "mailto:imlucky038@gmail.com",
    label: "Email",
    color: "hover:text-red-600 dark:hover:text-red-400"
  }
];

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-4">
      {SOCIAL_LINKS.map(({ icon, href, label, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`
            relative
            p-2 rounded-lg
            text-gray-600 dark:text-gray-300
            ${color}
            transition-all duration-300
            hover:scale-110
            hover:bg-gray-100 dark:hover:bg-gray-800
            focus:outline-none focus:ring-2 focus:ring-purple-500
            group
          `}
        >
          {/* Icon */}
          <span className="relative z-10 transform transition-transform duration-300 group-hover:rotate-12">
            {icon}
          </span>

          {/* Animated background */}
          <div className="
            absolute inset-0
            rounded-lg
            bg-gradient-to-tr from-transparent via-current to-transparent
            opacity-0 group-hover:opacity-10
            transition-opacity duration-300
          " />

          {/* Ripple effect on hover */}
          <div className="
            absolute inset-0
            rounded-lg
            bg-current
            opacity-0 group-hover:opacity-5
            transform scale-0 group-hover:scale-100
            transition-all duration-300
          " />
        </a>
      ))}
    </div>
  );
};

export default SOCIAL_LINKS;