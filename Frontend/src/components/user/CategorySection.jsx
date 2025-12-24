import { Link } from "react-router-dom";
import Cards from "./Cards";
import LoadingSpinner from "../LoadingSpinner";

function CategorySection({ category, books, loading }) {
  const displayBooks = books.slice(0, 4);
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
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

      {loading ? (
        <LoadingSpinner/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayBooks.length > 0 ? (
            displayBooks.map((item) => (
              <Cards key={item._id} item={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No books found in this category.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CategorySection;
