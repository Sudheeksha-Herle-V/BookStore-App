import React from "react";
import Navbar from "../components/user/Navbar";
import Footer from "../components/user/Footer";
import Books from "../pages/user/header/Books";
function Book() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Books/>
      </div>
      <Footer />
    </>
  );
}

export default Book;
