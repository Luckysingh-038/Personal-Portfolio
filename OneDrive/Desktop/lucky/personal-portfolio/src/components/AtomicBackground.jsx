import React, { useEffect, useRef, useState } from 'react';

const AtomicBackground = ({ isDarkMode }) => {
    const [particles, setParticles] = useState([]);
    const [viewport, setViewport] = useState({ width: 0, height: 0 });
    const animationRef = useRef();
    
    const colors = {
      primary: isDarkMode ? "#6366f1" : "#8b5cf6",
      secondary: isDarkMode ? "#3b82f6" : "#93c5fd",
      background: isDarkMode ? "rgba(0, 0, 0, 0.95)" : "rgba(255, 255, 255, 0.95)"
    };
  
    // Update viewport dimensions and handle resize
    useEffect(() => {
      const updateViewport = () => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
  
      // Initial viewport setup
      updateViewport();
  
      // Add resize listener
      window.addEventListener('resize', updateViewport);
      return () => window.removeEventListener('resize', updateViewport);
    }, []);
  
    // Calculate responsive values with reduced size and increased speed
    const getResponsiveValues = () => {
      // Reduced size but not too small
      const baseRadius = Math.min(viewport.width, viewport.height) * 0.035;
      const particleCount = viewport.width < 768 ? 4 : 
                           viewport.width < 1024 ? 6 : 8;
      // Increased speed
      const speed = viewport.width < 768 ? 1.0 : 2.0;
      
      return { baseRadius, particleCount, speed };
    };
  
    // Initialize particles with responsive values
    useEffect(() => {
      if (viewport.width === 0) return;
  
      const { baseRadius, particleCount, speed } = getResponsiveValues();
  
      const initialParticles = [...Array(particleCount)].map((_, i) => ({
        id: i,
        x: Math.random() * viewport.width,
        y: Math.random() * viewport.height,
        speedX: (Math.random() - 0.5) * speed * 1.5,
        speedY: (Math.random() - 0.5) * speed * 1.5,
        radius: baseRadius + Math.random() * baseRadius * 0.4,
        color: i % 2 ? colors.primary : colors.secondary,
        rotationSpeed: (Math.random() - 0.5) * speed * 2,
        rotation: Math.random() * 360,
        orbitSpeed: speed * (1 + Math.random() * 4),
        orbitPhase: Math.random() * Math.PI * 2,
        directionChangeFrequency: 0.015,
        gradientOffset: Math.random(), // Random starting point for gradient animation
        gradientSpeed: 0.005 + Math.random() * 0.01 // Random speed for gradient animation
      }));
      
      setParticles(initialParticles);
    }, [viewport, isDarkMode]);
  
    // Animation loop with responsive boundaries and increased randomness
    useEffect(() => {
      if (viewport.width === 0) return;
      
      const { speed } = getResponsiveValues();
  
      const animate = () => {
        setParticles(prevParticles => 
          prevParticles.map(particle => {
            let newX = particle.x + particle.speedX;
            let newY = particle.y + particle.speedY;
            let newSpeedX = particle.speedX;
            let newSpeedY = particle.speedY;
            
            // Responsive boundaries with bounce
            if (newX <= 0 || newX >= viewport.width) {
              newSpeedX = -particle.speedX * (0.8 + Math.random() * 0.4);
              newX = Math.max(0, Math.min(newX, viewport.width));
            }
            if (newY <= 0 || newY >= viewport.height) {
              newSpeedY = -particle.speedY * (0.8 + Math.random() * 0.4);
              newY = Math.max(0, Math.min(newY, viewport.height));
            }
  
            // Random direction changes
            if (Math.random() < particle.directionChangeFrequency) {
              newSpeedX = (Math.random() - 0.5) * speed * 1.5;
              newSpeedY = (Math.random() - 0.5) * speed * 1.5;
            }
  
            // Update gradient animation offset
            const newGradientOffset = (particle.gradientOffset + particle.gradientSpeed) % 1;
  
            return {
              ...particle,
              x: newX,
              y: newY,
              speedX: newSpeedX,
              speedY: newSpeedY,
              rotation: (particle.rotation + particle.rotationSpeed) % 360,
              orbitPhase: (particle.orbitPhase + particle.orbitSpeed * 0.01) % (Math.PI * 2),
              gradientOffset: newGradientOffset
            };
          })
        );
        animationRef.current = requestAnimationFrame(animate);
      };
  
      animationRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationRef.current);
    }, [viewport]);
  
    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
          className={`absolute inset-0 transition-colors duration-300 ${
            isDarkMode ? 'bg-black' : 'bg-white'
          }`}
        />
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: isDarkMode ? 0.3 : 0.25 }}
          preserveAspectRatio="none"
        >
          <defs>
            {/* Blue-purple glossy gradients for each particle */}
            {particles.map(particle => (
              <React.Fragment key={`defs-${particle.id}`}>
                {/* Animated gradient for orbit lines */}
                <linearGradient 
                  id={`orbitGradient-${particle.id}`}
                  gradientUnits="userSpaceOnUse"
                  x1="0%" y1="0%" x2="100%" y2="100%"
                  gradientTransform={`rotate(${particle.gradientOffset * 360})`}
                >
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1.0" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="1.0" />
                </linearGradient>
                
                {/* Radial gradient for glossy effect on nucleus */}
                <radialGradient
                  id={`nucleusGradient-${particle.id}`}
                  cx="40%" cy="40%" r="60%" fx="25%" fy="25%"
                >
                  <stop offset="0%" stopColor="#fff" stopOpacity="1.0" />
                  <stop offset="30%" stopColor={particle.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={particle.color} stopOpacity="0.8" />
                </radialGradient>
              </React.Fragment>
            ))}
          </defs>
  
          {particles.map((particle) => (
            <g
              key={particle.id}
              transform={`translate(${particle.x}, ${particle.y}) rotate(${particle.rotation})`}
            >
              {/* Central nucleus with glossy gradient */}
              <circle
                r={particle.radius * 0.25}
                fill={`url(#nucleusGradient-${particle.id})`}
                opacity={isDarkMode ? 0.9 : 0.8}
              />
              
              {/* Middle orbit with gradient and sharp, clear lines */}
              <circle
                r={particle.radius * 0.55}
                fill="none"
                stroke={`url(#orbitGradient-${particle.id})`}
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity={isDarkMode ? 0.8 : 0.7}
                transform={`rotate(${particle.orbitPhase * 180 / Math.PI})`}
              />
              
              {/* Outer orbit with bolder border and gradient */}
              <circle
                r={particle.radius * 0.9}
                fill="none"
                stroke={`url(#orbitGradient-${particle.id})`}
                strokeWidth="4"
                strokeDasharray="5,5"
                opacity={isDarkMode ? 0.7 : 0.65}
                transform={`rotate(${-particle.orbitPhase * 180 / Math.PI})`}
              />
              
              {/* Electron particles with glossy effect */}
              {[0, 120, 240].map((angle, i) => (
                <g key={i}>
                  <circle
                    r={viewport.width < 768 ? 1.5 : 2.5}
                    fill={particle.color}
                    opacity={isDarkMode ? 1.0 : 0.9}
                    transform={`
                      rotate(${angle + particle.orbitPhase * 180 / Math.PI})
                      translate(${particle.radius * 0.55}, 0)
                    `}
                  />
                  {/* Highlight spot for glossy effect */}
                  <circle
                    r={viewport.width < 768 ? 0.7 : 1.0}
                    fill="#ffffff"
                    opacity={1.0}
                    transform={`
                      rotate(${angle + particle.orbitPhase * 180 / Math.PI})
                      translate(${particle.radius * 0.55 - 0.5}, -0.5)
                    `}
                  />
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>
    );
  };
export default AtomicBackground;