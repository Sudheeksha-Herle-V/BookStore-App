import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cards from "../../components/user/Cards";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import LoadingSpinner from "../../components/LoadingSpinner";

/* URL slug → Backend category */
const categoryMap = {
    "self-help": "Self-help",
    romance: "Romance",
    mythology: "Mythology",
    biography: "Biography & Autobiography",
};

function CategoryPage() {
    const { categoryName } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true); 
                const res = await axios.get("https://bookstore-app-backend-tzhy.onrender.com/book");

                const filteredBooks = res.data.filter(
                    (b) =>
                        b.category?.toLowerCase() ===
                        categoryMap[categoryName]?.toLowerCase()
                );

                setBooks(filteredBooks);
            } catch (error) {
                console.error("Error fetching category books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [categoryName]);

    return (
        <>
            <Navbar />

            <div className="max-w-screen-2xl container md:px-20 px-4 bg-white mt-16 mb-6 md:mb-8 ">
                <div className="sticky top-16 md:top-16 bg-white z-40">
                    <h1
                        className="text-lg md:text-xl font-semibold text-gray-800 mb-0  text-center capitalize pt-1 md:pt-8 pb-4 sm:pb-8"
                    >
                        {categoryMap[categoryName]}
                    </h1>
                </div>

                {loading ? (
                    <LoadingSpinner/>
                ) : books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <Cards key={book._id} item={book} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        No books found in this category.
                    </p>
                )}
            </div>

            <Footer />
        </>
    );
}

export default CategoryPage;
