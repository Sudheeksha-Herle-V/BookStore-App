import React from "react";
import PageLayout from "../components/user/PageLayout";
import Banner from "../components/user/Banner";
import CategoryGrid from "../components/user/CategoryGrid";
import CategorySection from "../components/user/CategorySection";
import categories from "../categories";
import { useBooks } from "../hooks/useBooks";

function Home() {
  const { books, loading } = useBooks();

  // Group books by category
  const booksByCategory = categories.reduce((acc, cat) => {
    acc[cat.key] = books.filter(
      (b) => b.category.toLowerCase() === cat.backendCategory.toLowerCase()
    );
    return acc;
  }, {});

  return (
    <PageLayout>
      <Banner />

      {/* Heading */}
      <div className="max-w-screen-2xl mx-auto px-6 mt-8 mb-8 text-center">
        <div className="w-40 md:w-56 h-[2px] bg-pink-500 mx-auto mb-2 rounded-full" />
        <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mt-8">
          Explore Our Categories
        </h2>
      </div>


      {/* Category Grid with padding */}
      <div className="px-6 mb-16 mt-8 sm:mt-20 ">
        <CategoryGrid categories={categories} />
      </div>

      {/* Category Sections with padding and spacing */}
      <div className="px-6 space-y-16">
        {categories.map((cat) => (
          <CategorySection
            key={cat.key}
            category={cat}
            books={booksByCategory[cat.key] || []}
            loading={loading}
          />
        ))}
      </div>
    </PageLayout>
  );
}

export default Home;
