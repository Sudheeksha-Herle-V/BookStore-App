// BannerImage.jsx
import React, { useEffect, useState } from "react";

import banner1 from "../../public/Banner1.png";
import banner2 from "../../public/Banner2.png";
import banner3 from "../../public/Banner3.png";
import banner4 from "../../public/Banner4.png";
import banner5 from "../../public/Banner5.png";
import banner6 from "../../public/Banner6.png";
import banner7 from "../../public/Banner7.png";

const images = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];

// Hook returns the current rotating image URL
export const useBannerImage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      1000 // 1 second
    );
    return () => clearInterval(interval);
  }, []);

  return images[index];
};

const BannerImage = () => {
  const currentBanner = useBannerImage();

  return (
    <img
      src={currentBanner}
      alt="Banner"
      className="
        w-[90%] sm:w-[90%] md:w-[100%] lg:w-[90%] 
        object-contain hidden sm:block 
        transition-opacity duration-500
      "
    />
  );
};

export default BannerImage;
