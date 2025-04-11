const AnimatedName = () => {
    const name = "Lucky Singh".split("");
  
    return (
      <h1 className="text-5xl md:text-6xl font-bold mb-12">
        <span className="sr-only">Lucky singh</span>
        {name.map((char, index) => (
          <span
            key={index}
            className="inline-block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent
              animate-[fadeIn_0.5s_ease-in-out] hover:translate-y-1"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    );
  };

  export default AnimatedName;
