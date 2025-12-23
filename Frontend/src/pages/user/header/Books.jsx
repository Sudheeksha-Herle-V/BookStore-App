import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import categories from "../../../categories";
import CategoryGrid from "../../../components/user/CategoryGrid";
import CategorySection from "../../../components/user/CategorySection";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Fetch Books */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4001/book");
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /* Normalize category strings */
  const normalizeCategory = (str = "") =>
    str.trim().toLowerCase();

  /* Group books by normalized category */
  const booksByCategory = useMemo(() => {
    const grouped = {};
    books.forEach((book) => {
      const key = normalizeCategory(book.category);
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(book);
    });
    return grouped;
  }, [books]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-20 bg-white">
      {/* Heading */}
      <div className="pt-20 md:pt-28 text-center">
        <h1 className="font-bold text-gray-800 tracking-tight text-base sm:text-lg md:text-xl">
          Discover Your Next Favorite Book
        </h1>
      </div>

      {/* Category Grid */}
      <CategoryGrid categories={categories} />

      <div className="border-b mt-6 mb-14" />

      {/* Category Sections */}
      {categories.map((cat) => {
        const displayBooks = booksByCategory[normalizeCategory(cat.backendCategory)]?.slice(0, 4) || [];

        return (
          <CategorySection
            key={cat.key}
            category={cat}
            books={displayBooks}
            loading={loading}
          >
            {/* Debug info if no books found */}
            {!loading && displayBooks.length === 0 && (
              <pre className="text-xs text-gray-400 mt-2 text-left max-h-40 overflow-auto">
                {books
                  .map(
                    (b) =>
                      `Name: ${b.name || "N/A"} | Category: ${b.category || "N/A"}`
                  )
                  .join("\n")}
              </pre>
            )}
          </CategorySection>
        );
      })}
    </div>
  );
}

export default Books;
