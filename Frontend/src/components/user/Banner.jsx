import React from "react";
import { useNavigate } from "react-router-dom";
import BannerImage, { useBannerImage } from "../BannerImage";

function Banner() {
  const navigate = useNavigate();
  const mobileBanner = useBannerImage(); // rotating image URL

  return (
    <div
      className="relative max-w-screen-2xl min-h-[22vh] sm:min-h-[28vh] lg:min-h-[30vh]
 sm:h-auto container mx-auto px-8 mt-8 sm:mt-12 lg:mt-16 bg-white">

      {/* MOBILE BACKGROUND (below sm only) */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat object-center pointer-events-none block sm:hidden"
        style={{
          backgroundImage: `url(${mobileBanner})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(0.5px) ",
          opacity: 0.35,
          transition: "background-image 0.5s ease-in-out",
        }}
      ></div>

      {/* CONTENT */}
      <div className="relative grid grid-cols-1 sm:grid-cols-[40%_60%] md:grid-cols-[30%_70%] gap-0 md:gap-6 items-center z-10">

        {/* TEXT SECTION */}
        <div className="col-span-2 sm:col-span-1 order-2 flex flex-col gap-4 mt-4 sm:mt-0 md:mt-10 lg:mt-2 
                md:pr-8 lg:pr-12">
          <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-gray-600">
            <span className="text-pink-600 text-sm sm:text-lg md:text-2xl lg:text-3xl">
              BookBasket —
            </span>
            &nbsp;The Fastest Way to Your Next Read
            <br />
            <span className="text-pink-600">New Book Everyday!!!</span>
          </h1>

          <p className="text-xs md:text-sm lg:text-lg font-normal text-gray-700 text-justify md:break-words lg:break-words">
            Discover a world of stories, insights, and imagination at your fingertips.
            <br />
            From timeless classics to trending reads, BookBasket brings you the
            books you love—delivered fast and easy.
          </p>

          <div className="pt-2">
            <span
              className="text-pink-600 font-normal text-sm md:text-base lg:text-lg cursor-pointer md:break-words lg:break-words"
              onClick={() => navigate("/books")}
            >
              Your next favorite book is just a click away.
            </span>
          </div>
        </div>


        {/* DESKTOP IMAGE SECTION (≥ sm only) */}
        <div className="flex justify-center mt-0 md:mt-10">
          <BannerImage />
        </div>
      </div>
    </div>
  );
}

export default Banner;