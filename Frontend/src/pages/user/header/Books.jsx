import { useMemo } from "react";

import categories from "../../../categories";
import CategoryGrid from "../../../components/user/CategoryGrid";
import CategorySection from "../../../components/user/CategorySection";
import { useBooks } from "../../../hooks/useBooks";

function Books() {
  const { books, loading } = useBooks();

  /* Normalize category strings */
  const normalizeCategory = (str = "") => str.trim().toLowerCase();

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
    <div className="max-w-screen-2xl mx-auto px-4 md:px-20 bg-white p-8">
      {/* Heading */}
      <div className="pt-12 md:pt-20 text-center">
        <h1 className="font-bold text-gray-800 tracking-tight text-base sm:text-lg md:text-xl">
          Discover Your Next Favorite Book
        </h1>
      </div>

      {/* Category Grid */}
      <div className="mt-8 sm:mt-12 ">
        <CategoryGrid categories={categories} />
      </div>

      <div className="border-b mt-6 mb-14" />

      {/* Category Sections */}
      {categories.map((cat) => {
        const displayBooks =
          booksByCategory[normalizeCategory(cat.backendCategory)]?.slice(0, 4) ||
          [];

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
