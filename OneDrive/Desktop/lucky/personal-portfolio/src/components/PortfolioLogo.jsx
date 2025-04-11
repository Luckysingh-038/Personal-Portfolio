import React, { useEffect, useState } from 'react';

const PortfolioLogo = ({ isDarkMode = false }) => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [rotate, setRotate] = useState(0);
  const [rotationDirection, setRotationDirection] = useState(1); // 1 for clockwise, -1 for counterclockwise
  const [circleProgress, setCircleProgress] = useState(0);
  const [octagonPulse, setOctagonPulse] = useState(1);
  const [showDirectionIndicator, setShowDirectionIndicator] = useState(false);

  // Theme colors based on mode
  const colors = {
    primary: isDarkMode ? "#6366f1" : "#8b5cf6",
    secondary: isDarkMode ? "#3b82f6" : "#93c5fd",
    background: isDarkMode ? "#000000" : "#ffffff",
    glow: isDarkMode ? "rgba(99, 102, 241, 0.2)" : "rgba(139, 92, 246, 0.1)"
  };

  // Generate direction indicator arrow path
  const generateArrowPath = (isClockwise) => {
    const radius = 52; // Slightly outside the octagon
    const arrowSize = 4;
    const startAngle = isClockwise ? 0 : Math.PI;
    const x1 = 50 + radius * Math.cos(startAngle);
    const y1 = 50 + radius * Math.sin(startAngle);
    const x2 = x1 + (isClockwise ? arrowSize : -arrowSize);
    const y2 = y1 - arrowSize;
    const x3 = x1 + (isClockwise ? arrowSize : -arrowSize);
    const y3 = y1 + arrowSize;
    return `M ${x1},${y1} L ${x2},${y2} L ${x3},${y3} Z`;
  };

  // Rest of the existing functions (generateHexagonalNodes, generateOctagonPath) remain the same...
  const generateHexagonalNodes = () => {
    const centerX = 50;
    const centerY = 50;
    const hexRadius = 20;
    
    const centerNode = { id: 0, x: centerX, y: centerY, isActive: false, pulse: false };
    
    const outerNodes = Array.from({ length: 6 }, (_, i) => {
      const angle = (i * Math.PI) / 3;
      return {
        id: i + 1,
        x: centerX + hexRadius * Math.cos(angle),
        y: centerY + hexRadius * Math.sin(angle),
        isActive: false,
        pulse: false
      };
    });

    return [centerNode, ...outerNodes];
  };

  const generateOctagonPath = (centerX, centerY, radius) => {
    const points = Array.from({ length: 8 }, (_, i) => {
      const angle = (i * Math.PI) / 4;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')} Z`;
  };

  useEffect(() => {
    const allNodes = generateHexagonalNodes();
    
    // Original connection generation code remains the same...
    const newConnections = [];
    for (let i = 1; i < allNodes.length; i++) {
      newConnections.push({
        id: `0-${i}`,
        start: allNodes[0],
        end: allNodes[i],
        opacity: 0
      });
    }
    for (let i = 1; i < allNodes.length; i++) {
      const next = i === allNodes.length - 1 ? 1 : i + 1;
      newConnections.push({
        id: `${i}-${next}`,
        start: allNodes[i],
        end: allNodes[next],
        opacity: 0
      });
    }

    setNodes(allNodes);
    setConnections(newConnections);

    // Alternating rotation logic
    const startRotation = () => {
      let startTime = Date.now();
      let prevTime = startTime;
      
      const rotateInterval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const deltaTime = currentTime - prevTime;
        prevTime = currentTime;

        // Change direction every 5 seconds
        if (elapsedTime % 10000 < 5000) {
          if (rotationDirection === -1) {
            setRotationDirection(1);
            setShowDirectionIndicator(true);
            setTimeout(() => setShowDirectionIndicator(false), 1000);
          }
          setRotate(prev => (prev + 0.5) % 360);
        } else {
          if (rotationDirection === 1) {
            setRotationDirection(-1);
            setShowDirectionIndicator(true);
            setTimeout(() => setShowDirectionIndicator(false), 1000);
          }
          setRotate(prev => (prev - 0.5 + 360) % 360);
        }
      }, 30);

      return rotateInterval;
    };

    // Original animation functions remain the same...
    const animateNodes = async () => {
      for (let i = 0; i < allNodes.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setNodes(prev => 
          prev.map((node, idx) => 
            idx === i ? { ...node, isActive: true, pulse: true } : node
          )
        );
      }
    };

    const animateConnections = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      for (let i = 0; i < newConnections.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setConnections(prev =>
          prev.map((conn, idx) =>
            idx === i ? { ...conn, opacity: 0.8 } : conn
          )
        );
      }
    };

    const animateOctagon = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const duration = 1000;
      const frames = 60;
      const increment = 100 / frames;
      let progress = 0;

      const octagonInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
          clearInterval(octagonInterval);
          progress = 100;
        }
        setCircleProgress(progress);
      }, duration / frames);
    };

    // Start all animations
    const rotateInterval = startRotation();
    const pulseInterval = setInterval(() => {
      setOctagonPulse(prev => prev === 1 ? 1.05 : 1);
    }, 1000);

    animateNodes();
    animateConnections();
    animateOctagon();

    return () => {
      clearInterval(rotateInterval);
      clearInterval(pulseInterval);
    };
  }, [isDarkMode]);

  return (
    <div className="w-32 h-32 mx-auto relative">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full transform transition-transform duration-300"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <defs>
          <linearGradient id="octagonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0000FF">
              <animate 
                attributeName="stop-color" 
                values="#0000FF;#8A2BE2;#0000FF"
                dur="3s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.6" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Bolder animated outer octagon */}
        <path
          d={generateOctagonPath(50, 50, 45)}
          fill="none"
          stroke="url(#octagonGradient)"
          strokeWidth="3.5"
          className="opacity-90"
          strokeDasharray={`${2 * Math.PI * 45}`}
          strokeDashoffset={`${2 * Math.PI * 45 * (1 - circleProgress / 100)}`}
          style={{ 
            transition: 'stroke-dashoffset 0.1s linear',
            transform: `scale(${octagonPulse})`,
            transformOrigin: 'center'
          }}
        />

        {/* Direction indicator arrows */}
        {showDirectionIndicator && (
          <>
            <path
              d={generateArrowPath(rotationDirection === 1)}
              fill="url(#octagonGradient)"
              className="opacity-80"
              filter="url(#glow)"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1s"
                repeatCount="1"
              />
            </path>
          </>
        )}
        
        {/* Original inner connections */}
        {connections.map(({ id, start, end, opacity }) => (
          <line
            key={id}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={colors.secondary}
            strokeWidth="1.2"
            style={{ opacity }}
          />
        ))}
        
        {/* Original inner nodes */}
        {nodes.map(({ id, x, y, isActive, pulse }) => (
          <circle
            key={id}
            cx={x}
            cy={y}
            r={id === 0 ? "4" : "3"}
            fill="url(#nodeGradient)"
            filter="url(#glow)"
            className={`transition-all duration-300 ${
              isActive ? 'opacity-100' : 'opacity-0'
            } ${pulse ? 'animate-pulse' : ''}`}
          />
        ))}
      </svg>
    </div>
  );
};

export default PortfolioLogo;