import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Cards({ item }) {
  // Debug: see what item contains
  console.log("Rendering card:", item);

  const getUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("Users"));
      return user?._id;
    } catch {
      return null;
    }
  };

  const handleAddToCart = async () => {
    const userId = getUserId();
    if (!userId) {
      toast.error("Please log in first");
      return;
    }

    try {
      await axios.post(
        "https://bookstore-app-backend-tzhy.onrender.com/cart",
        {
          userId,
          bookId: item._id,
        },
        { withCredentials: true }
      );

      toast.success("Added to cart");

      // Update navbar cart count
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="
      bg-white shadow-lg shadow-rose-900/30 hover:shadow-rose-900/50 transition-transform 
      transform hover:scale-105 rounded-lg overflow-hidden 
      border mx-2 my-4
    ">
      {/* IMAGE with fallback */}
      <img
        src={item.image || "https://via.placeholder.com/150"}
        alt={item.name || "Book Image"}
        className="w-full h-60 object-contain p-4"
      />

      <div className="px-4 pb-4">
        {/* BOOK NAME with fallback */}
        <h2 className="font-semibold text-sm md:text-base mt-2 h-6 overflow-hidden">
          {item.name || "No Name"}
        </h2>

        {/* TITLE / SUBTITLE with fallback */}
        <p className="text-xs md:text-sm text-gray-600 h-8 overflow-hidden">
          {item.title || ""}
        </p>

        {/* PRICE + ADD TO CART */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-pink-600 font-bold text-sm sm:text-base">
            ₹{item.price ?? "N/A"}
          </span>

          {item.outOfStock ? (
            <button
              disabled
              className="
                bg-gray-300 text-gray-500 
                px-2 sm:px-3 py-1 rounded-lg 
                text-xs sm:text-sm whitespace-nowrap
              "
            >
              Out of Stock
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="
                border-2 border-pink-500 text-pink-500 
                hover:bg-pink-500 hover:text-white 
                px-2 sm:px-3 py-1 rounded-lg 
                text-xs sm:text-sm transition-colors duration-300 
                whitespace-nowrap
              "
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;
