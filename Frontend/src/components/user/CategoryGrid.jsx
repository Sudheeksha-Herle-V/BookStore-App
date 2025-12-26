import { Link } from "react-router-dom";

function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center px-6 sm:px-32 md:px-0">
      {categories.map((cat) => (
        <Link
          key={cat.key}
          to={cat.path}
          className="flex flex-col items-center group"
        >
          <div
            className="w-[28vw] h-[28vw]
                       sm:w-40 sm:h-40
                       md:w-40 md:h-40
                       lg:w-56 lg:h-56
                       rounded-2xl overflow-hidden bg-white border shadow-sm
                       transition-all duration-300
                       group-hover:shadow-xl
                       group-hover:scale-[1.04]
                       group-hover:border-pink-500"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition group-hover:brightness-110"
            />
          </div>

          <p className="mt-4 text-xs sm:text-base font-semibold text-gray-700 text-center
                        group-hover:text-pink-600 transition">
            {cat.name} →
          </p>
        </Link>
      ))}
    </div>
  );
}

export default CategoryGrid;
