import MovingCircle from "./MovingCircle";
const SubtleBackgroundAnimation = ({ isDarkMode }) => {
  const shapes = [
    {
      id: 1,
      size: 80,
      posX: 30,
      posY: 30,
      speedX: 0.03,
      speedY: 0.02,
      opacity: 0.8
    },
    {
      id: 2,
      size: 60,
      posX: 70,
      posY: 60,
      speedX: -0.02,
      speedY: 0.03,
      opacity: 0.7
    },
    {
      id: 3,
      size: 100,
      posX: 50,
      posY: 40,
      speedX: 0.02,
      speedY: -0.03,
      opacity: 0.9
    }
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 ${isDarkMode ? "bg-black" : "bg-white"}`} />
      {shapes.map((shape) => (
        <MovingCircle
          key={shape.id}
          {...shape}
          theme={isDarkMode ? "dark" : "light"}
        />
      ))}
    </div>
  );
};


export default SubtleBackgroundAnimation;
