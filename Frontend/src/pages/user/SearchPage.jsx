import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import { useBooks } from "../../hooks/useBooks";
import BooksGrid from "../../components/user/BooksGrid";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [query, setQuery] = useState("");
  const { books, loading } = useBooks();
  const navigate = useNavigate();

  const filteredBooks = query
    ? books.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()))
    : books;

  return (
    <>
      <Navbar />
      <div className="bg-white w-full h-16 lg:h-[70px]" />

      <div className="fixed sm:pt-4 md:pt-8 pb-4 md:pb-8 px-4 md:px-24 lg:px-48 w-full flex items-center justify-center gap-2 bg-white py-4 z-40 shadow-sm">
        <input
          type="text"
          placeholder="Search books..."
          className="border border-gray-400 bg-gray-100 text-gray-800 px-4 py-2 w-full sm:w-1/2 rounded-md text-xs sm:text-sm h-10 sm:h-9 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IoSearchSharp size={18} className="text-black" />
        <RxCross2
          size={18}
          className="cursor-pointer text-black"
          onClick={() => {
            setQuery("");
            navigate("/");
          }}
        />
      </div>

      <div className="w-full px-6 md:px-16 mt-16 sm:mt-20 md:mt-28 min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh]">
        <BooksGrid books={filteredBooks} loading={loading} />
      </div>

      <Footer />
    </>
  );
}

export default SearchPage;
