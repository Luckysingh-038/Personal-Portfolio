import AtomicBackground from "./AtomicBackground";
const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-32 h-48 perspective-1000">
        
        <div className="absolute inset-0 animate-[flip_2s_ease-in-out_infinite] transform-style-preserve-3d">
          {/* Front of Tarot Fool card */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl shadow-xl backface-hidden overflow-hidden">
            <svg viewBox="0 0 100 150" className="w-full h-full">
              {/* Fool card background */}
              <rect width="100" height="150" fill="#f0e6d2" />
              
              {/* Decorative border */}
              <rect x="5" y="5" width="90" height="140" fill="none" stroke="#c9a66b" strokeWidth="2" />
              
              {/* The Fool figure */}
              <g transform="translate(50, 75) scale(0.6)">
                {/* Head/face */}
                <circle cx="0" cy="-25" r="15" fill="#f8d9b0" />
                <circle cx="-5" cy="-27" r="2" fill="#593a1a" /> {/* Left eye */}
                <circle cx="5" cy="-27" r="2" fill="#593a1a" /> {/* Right eye */}
                <path d="M0,-20 Q-5,-18 -10,-20 Q-5,-16 0,-18 Q5,-16 10,-20 Q5,-18 0,-20" fill="#a52a2a" /> {/* Smile */}
                
                {/* Jester hat */}
                <path d="M-15,-40 Q0,-55 15,-40 L10,-35 L15,-30 L5,-25 L0,-30 L-5,-25 L-15,-30 L-10,-35 Z" fill="#9c27b0" />
                <circle cx="-12" cy="-37" r="3" fill="#ffd700" /> {/* Left bell */}
                <circle cx="12" cy="-37" r="3" fill="#ffd700" /> {/* Right bell */}
                <circle cx="0" cy="-25" r="3" fill="#ffd700" /> {/* Middle bell */}
                
                {/* Body */}
                <path d="M0,-10 L-20,40 L-15,45 L-5,30 L-3,45 L3,45 L5,30 L15,45 L20,40 Z" fill="#3f51b5" />
                
                {/* Arms */}
                <path d="M0,-10 L-30,10 L-25,15 Z" fill="#3f51b5" /> {/* Left arm */}
                <path d="M0,-10 L30,10 L25,15 Z" fill="#3f51b5" /> {/* Right arm */}
                
                {/* Walking stick */}
                <line x1="25" y1="15" x2="20" y2="50" stroke="#8d6e63" strokeWidth="3" />
                
                {/* Small dog at feet */}
                <ellipse cx="-15" cy="35" rx="7" ry="5" fill="#8d6e63" />
                <circle cx="-18" cy="33" r="2" fill="#5d4037" /> {/* Head */}
                <path d="M-22,33 L-26,30" stroke="#5d4037" strokeWidth="1" /> {/* Tail */}
              </g>
              
              {/* Title at bottom */}
              <text x="50" y="140" textAnchor="middle" fill="#593a1a" fontSize="10" fontFamily="serif">THE FOOL</text>
              
              {/* Number at top */}
              <text x="15" y="20" fill="#593a1a" fontSize="15" fontFamily="serif">0</text>
              <text x="85" y="20" fill="#593a1a" fontSize="15" fontFamily="serif" textAnchor="end">0</text>
            </svg>
          </div>
          
          {/* Back of card */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-xl backface-hidden rotate-y-180">
            <svg viewBox="0 0 100 150" className="w-full h-full">
              {/* Card back pattern */}
              <rect width="100" height="150" fill="#2c3e50" />
              
              {/* Decorative border */}
              <rect x="5" y="5" width="90" height="140" fill="none" stroke="#8e44ad" strokeWidth="2" />
              
              {/* Center pattern */}
              <g transform="translate(50, 75)">
                <circle cx="0" cy="0" r="30" fill="none" stroke="#8e44ad" strokeWidth="1" />
                <circle cx="0" cy="0" r="25" fill="none" stroke="#8e44ad" strokeWidth="1" />
                <circle cx="0" cy="0" r="20" fill="none" stroke="#8e44ad" strokeWidth="1" />
                
                {/* Star pattern */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <path
                    key={i}
                    d={`M0,0 L${30 * Math.cos(angle * Math.PI / 180)},${30 * Math.sin(angle * Math.PI / 180)}`}
                    stroke="#8e44ad"
                    strokeWidth="1"
                  />
                ))}
              </g>
              
              {/* Text */}
              <text x="50" y="140" textAnchor="middle" fill="#ecf0f1" fontSize="10" fontFamily="serif">PORTFOLIO</text>
            </svg>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LoadingAnimation;