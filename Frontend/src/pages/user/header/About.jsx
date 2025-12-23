import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-2xl w-full bg-white shadow-lg shadow-rose-900/40 rounded-lg p-8 text-justify">

        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 
          bg-gradient-to-r from-pink-600 to-rose-800 bg-clip-text text-transparent tracking-wide">
          About Us
        </h2>

        <p className="text-gray-700 text-xs sm:text-base lg:text-lg leading-relaxed mt-4 font-light tracking-wide">
          Welcome to <span className="font-semibold text-pink-600 leading-relaxed">BookBasket</span>, 
          your one-stop destination for a wide range of books across genres. Whether you're into romance, 
          mythology, biographies, or modern fiction, we aim to bring you a curated collection that inspires,
          informs, and entertains.
        </p>

        <p className="text-gray-700 text-xs sm:text-base lg:text-lg leading-relaxed mt-4 font-light tracking-wide">
          Our mission is to make reading more accessible and enjoyable. Built with passion and powered by 
          modern tech, BookBasket connects book lovers with stories that matter. We're constantly working 
          to improve your experience — from seamless browsing to personalized recommendations.
        </p>

        <p className="text-pink-900 text-base md:text-xl leading-relaxed uppercase mt-4 font-medium tracking-wider text-center">
          Thank you for choosing us to be part of your reading journey.
        </p>

      </div>
    </div>
  );
};

export default About;
