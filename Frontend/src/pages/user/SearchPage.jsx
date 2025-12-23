import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import Cards from "../../components/user/Cards";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4001/book");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // ✅ Derived state (NO useState)
  const filteredBooks = query.trim()
    ? books.filter((book) =>
        book.name.toLowerCase().includes(query.toLowerCase())
      )
    : books;

  return (
    <>
      <Navbar />

      {/* Spacer below fixed navbar */}
      <div className="bg-white w-full h-16 lg:h-[70px]" />

      {/* Search Bar */}
      <div className="fixed sm:pt-4 md:pt-8 pb-4 md:pb-8 px-4 md:px-24 lg:px-48 w-full flex items-center justify-center gap-2 bg-white py-4  z-40 shadow-sm">
        <input
          type="text"
          placeholder="Search books..."
          className="
            border border-gray-400
            bg-gray-100
            text-gray-800
            px-4 py-2
            w-full
            sm:w-1/2
            rounded-md
            text-xs
            sm:text-sm
            h-10 sm:h-9
            focus:outline-none
          "
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

      {/* Search Results */}
      <div
        className="
          w-full px-6 md:px-16
          mt-16 sm:mt-20 md:mt-28
          min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh]
        "
      >
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </div>
        ) : (
          query.trim() && (
            <div className="text-center text-gray-500 mt-10 text-lg">
              {loading ? "Loading..." : "No books found."}
            </div>
          )
        )}
      </div>

      <Footer />
    </>
  );
}

export default SearchPage;
