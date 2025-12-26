import React from "react";
import Cards from "./Cards";
import LoadingSpinner from "../LoadingSpinner";

function BooksGrid({ books, loading, emptyMessage = "No books found." }) {
  if (loading) return <LoadingSpinner />;

  if (!books.length)
    return (
      <div className="text-center text-gray-500 mt-10 text-lg">
        {emptyMessage}
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <Cards key={book._id} item={book} />
      ))}
    </div>
  );
}

export default BooksGrid;
