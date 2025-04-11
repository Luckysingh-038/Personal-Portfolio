import React, { useEffect, useState, useCallback } from "react";
import { Github, Linkedin, Mail, Sun, Moon, FileDown, ArrowUp, Code, CheckCircle, Download, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import THEME from "./components/Theme";
import PROJECTS from "./components/Projects";
import SKILLS from "./components/Skills";
import SOCIAL_LINKS from "./components/SocialLinks";
import LoadingAnimation from "./components/LoadingAnimation";
import AtomicBackground from "./components/AtomicBackground";
import AnimatedName from "./components/AnimatedName";
import ProjectCard from "./components/ProjectCard";
import SkillSection from "./components/SkillSection";
import ThemeToggle from "./components/ThemeToggle";
import ScrollToTop from "./components/ScrollToTop";
import ResumeDownload from "./components/ResumeDownload";
import PortfolioLogo from "./components/PortfolioLogo";
import EducationCard from "./components/Education";
import CertificateCard from "./components/Certification";
import AchievementCard from "./components/Achivement";
import InternshipCard from "./components/Internship";
import ACHIEVEMENT_DATA from "./components/AchivementData";
import EDUCATION_DATA from "./components/EducationData";
import CERTIFICATE_DATA from "./components/CertificateData";
import INTERNSHIP_DATA from "./components/InternshipData";
import "./App.css"

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Add custom styles for the flip animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flip {
        0% { transform: rotateY(0); }
        50% { transform: rotateY(180deg); }
        100% { transform: rotateY(360deg); }
      }
      .backface-hidden {
        backface-visibility: hidden;
      }
      .transform-style-preserve-3d {
        transform-style: preserve-3d;
      }
      .perspective-1000 {
        perspective: 1000px;
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  const themeClasses = {
    text: isDarkMode ? "text-white" : "text-gray-900",
    background: isDarkMode ? "bg-black/40" : "bg-white/40",
    section: THEME.spacing.section,
    container: THEME.spacing.container,
    heading: [
      "text-4xl md:text-5xl font-bold text-center mb-16",
      "bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent",
      "relative before:content-[''] before:absolute before:inset-0",
    ].join(" ")
  };

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingAnimation />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen w-full overflow-x-hidden"
          >
            <AtomicBackground isDarkMode={isDarkMode} />

            {/* <div className={`relative z-10 ${themeClasses.text}`}>
             
              <header className={themeClasses.section} role="banner">
                <div className={`${themeClasses.container} text-center max-w-full px-4`}>
                
                  <div className="mb-8 relative">
                    <div className="w-24 h-24 mx-auto relative">
                    
                      <PortfolioLogo />
                    </div>
                  </div>
                  
                  <AnimatedName />
                  <p className="text-xl md:text-2xl leading-relaxed mb-12">
                    Computer Science and Engineering Student
                  </p>

                  <div className="flex justify-center space-x-6 flex-wrap">
                    {SOCIAL_LINKS.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full backdrop-blur-md border m-2
                          ${isDarkMode
                            ? "bg-gray-900/80 border-gray-700 hover:bg-gray-800/90"
                            : "bg-white/40 border-violet-200 hover:bg-white/60"}
                          hover:scale-110 hover:border-purple-400 transition-all duration-300`}
                        aria-label={link.label}
                      >
                        {React.cloneElement(link.icon, {
                          'aria-hidden': 'true',
                          role: 'img'
                        })}
                      </a>
                    ))}
                  </div>
                </div>
              </header> */}

<div className={`relative z-10 ${themeClasses.text}`}>
  <header className={themeClasses.section} role="banner">
    <div className={`${themeClasses.container} max-w-full px-4 flex flex-col md:flex-row items-center md:items-start`}>

      {/* Image on Left */}
      <div className="md:w-1/4 w-full flex justify-center md:justify-start mb-6 md:mb-0 myClass">
        <img
          src="data:image/jpeg;base64,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" // ← Update this path accordingly
          alt="Profile"
          className="w-50 h-50 md:w-60 md:h-60 object-cover rounded-full shadow-xl border-4 border-violet-500"
        />
      </div>

      {/* Main Content on Right */}
      <div className="md:w-3/4 w-full md:pl-10 text-center md:text-left">
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto md:mx-0 relative">
            <PortfolioLogo />
          </div>
        </div>

        <AnimatedName />
        <p className="text-xl md:text-2xl leading-relaxed mb-12">
          Computer Science and Engineering Student
        </p>

        <div className="flex justify-center md:justify-start space-x-6 flex-wrap">
          {SOCIAL_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full backdrop-blur-md border m-2
                ${isDarkMode
                  ? "bg-gray-900/80 border-gray-700 hover:bg-gray-800/90"
                  : "bg-white/40 border-violet-200 hover:bg-white/60"}
                hover:scale-110 hover:border-purple-400 transition-all duration-300`}
              aria-label={link.label}
            >
              {React.cloneElement(link.icon, {
                'aria-hidden': 'true',
                role: 'img'
              })}
            </a>
          ))}
        </div>
      </div>
    </div>
  </header>

              <main id="main-content" className="w-full">
              <section id="internships" className={themeClasses.section} aria-labelledby="internships-heading">
                  <div className={`${themeClasses.container} px-4`}>
                    <h2 id="internships-heading" className={themeClasses.heading}>Internship Experience</h2>
                    <div className="grid grid-cols-1 gap-8">
                      {INTERNSHIP_DATA.map((internship, index) => (
                        <InternshipCard
                          key={index}
                          internship={internship}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  </div>
                </section>
                
                <section id="projects" className={themeClasses.section} aria-labelledby="projects-heading">
                  <div className={`${themeClasses.container} px-4`}>
                    <h2 id="projects-heading" className={themeClasses.heading}>Featured Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {PROJECTS.map((project, index) => (
                        <ProjectCard
                          key={index}
                          project={project}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  </div>
                </section>

               

                <section id="skills" className={themeClasses.section} aria-labelledby="skills-heading">
                  <div className={`${themeClasses.container} px-4`}>
                    <h2 id="skills-heading" className={themeClasses.heading}>Skills & Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {Object.entries(SKILLS).map(([category, skillList]) => (
                        <SkillSection
                          key={category}
                          category={category}
                          skills={skillList}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                <section id="certificates" className={themeClasses.section} aria-labelledby="certificates-heading">
                  <div className={`${themeClasses.container} px-4`}>
                    <h2 id="certificates-heading" className={themeClasses.heading}>Certifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {CERTIFICATE_DATA.map((certificate, index) => (
                        <CertificateCard
                          key={index}
                          certificate={certificate}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  </div>
                </section>
                <section id="education" className={themeClasses.section} aria-labelledby="education-heading">
                  <div className={`${themeClasses.container} px-4`}>
                    <h2 id="education-heading" className={themeClasses.heading}>Education</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {EDUCATION_DATA.map((education, index) => (
                        <EducationCard
                          key={index}
                          education={education}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                <section id="achievements" className={themeClasses.section} aria-labelledby="achievements-heading">
                  <div className={`${themeClasses.container} px-4`}>
                    <h2 id="achievements-heading" className={themeClasses.heading}>Achievements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {ACHIEVEMENT_DATA.map((achievement, index) => (
                        <AchievementCard
                          key={index}
                          achievement={achievement}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                <section id="contact" className={themeClasses.section} aria-labelledby="contact-heading">
                  <div className={`${themeClasses.container} px-4`}>
                    <h2 id="contact-heading" className={themeClasses.heading}>Let's Connect</h2>
                    <div className={`max-w-2xl mx-auto p-8 rounded-xl backdrop-blur-md
                      ${isDarkMode
                        ? "bg-gray-900/80 border-gray-700"
                        : "bg-white/40 border-purple-200"}
                      border`}
                    >
                      <p className="text-center text-lg mb-8">
                        I'm always interested in hearing about new projects and opportunities. 
                        Feel free to reach out if you'd like to collaborate!
                      </p>
                      <div className="flex justify-center space-x-6 flex-wrap">
                        {SOCIAL_LINKS.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-4 rounded-full backdrop-blur-md border m-2
                              ${isDarkMode
                                ? "bg-gray-900/80 border-gray-700 hover:bg-gray-800/90"
                                : "bg-white/40 border-purple-200 hover:bg-white/60"}
                              hover:scale-110 hover:border-purple-500 transition-all duration-300`}
                            aria-label={link.label}
                          >
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </main>

              <footer className={`py-12 px-4 border-t ${isDarkMode ? "border-gray-800" : "border-purple-100"}`} role="contentinfo">
                <div className={`${themeClasses.container} text-center`}>
                  <p className={isDarkMode ? "text-white text-sm" : "text-gray-600 text-sm"}>
                    ©️ {new Date().getFullYear()} Lucky Singh. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>

            <ResumeDownload isDarkMode={isDarkMode} />
            <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
            <ScrollToTop isDarkMode={isDarkMode} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;