import { useParams } from "react-router-dom";
import Cards from "../../components/user/Cards";
import PageLayout from "../../components/user/PageLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useBooks } from "../../hooks/useBooks";

/* URL slug → Backend category */
const categoryMap = {
  "self-help": "Self-help",
  romance: "Romance",
  mythology: "Mythology",
  biography: "Biography & Autobiography",
};

function CategoryPage() {
  const { categoryName } = useParams();
  const { books, loading } = useBooks();

  // Filter books by category
  const filteredBooks = books.filter(
    (b) =>
      b.category?.toLowerCase() === categoryMap[categoryName]?.toLowerCase()
  );

  return (
    <PageLayout>
      <div className="max-w-screen-2xl container md:px-20 px-4 bg-white mt-0 mb-6 md:mb-8">
        <div className="sticky top-16 bg-white z-40">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800 mb-0 text-center capitalize pt-1 md:pt-8 pb-4 sm:pb-8">
            {categoryMap[categoryName]}
          </h1>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Cards key={book._id} item={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No books found in this category.
          </p>
        )}
      </div>
    </PageLayout>
  );
}

export default CategoryPage;
