import React, { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ books, onFiltered }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Whenever searchTerm or books change, filter
  useEffect(() => {
    const filteredBooks = books.filter((book) =>
      book.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFiltered(filteredBooks);
  }, [searchTerm, books, onFiltered]);

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-white px-5 py-3 text-xs rounded-lg shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <button
        onClick={() => {}}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-600 hover:text-pink-800 transition"
      >
        <SearchIcon size={18} />
      </button>
    </div>
  );
};

export default Search;
