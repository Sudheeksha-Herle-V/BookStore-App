import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * PageLayout wraps page content with Navbar and Footer.
 * Children will be placed between Navbar and Footer.
 */
const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow mt-[64px]">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PageLayout;
