import { Link } from "react-router-dom";
import BooksGrid from "./BooksGrid";

function CategorySection({ category, books = [], loading }) {
  // Limit to 4 books for preview
  const displayBooks = books.slice(0, 4);

  return (
    <div className="mb-16 px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          {category.name}
        </h2>

        <Link
          to={category.path}
          className="px-3 md:px-4 py-1.5 md:py-2 bg-pink-600 text-white rounded-lg
                     hover:bg-pink-700 transition text-sm md:text-base font-medium"
        >
          View all
        </Link>
      </div>

      <BooksGrid
        books={displayBooks}
        loading={loading}
        emptyMessage={`No books found in ${category.name}.`}
      />
    </div>
  );
}

export default CategorySection;
