import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RotatingLogo() {
  const navigate = useNavigate();

  const rotatingImages = [
    "/Logo1a.png",
    "/Logo1c.png",
    "/Logo1b.png",
    "/Logo1d.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % rotatingImages.length);
    }, 750);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="flex items-center cursor-pointer gap-1 " 
      onClick={() => navigate("/")}
    >
      {/* Rotating left part */}
      <img
        src={rotatingImages[currentIndex]}
        alt="Dynamic Logo"
        className="h-6 sm:h-8 lg:h-12 transition-all duration-500 mr-1"
      />

      {/* Fixed right part */}
      <img
        src="/Logo2.png"
        alt="BookBasket"
        className="h-4 md:h-8 "
      />
    </div>
  );
}

export default RotatingLogo;
