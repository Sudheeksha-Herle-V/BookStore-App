import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md border-r border-gray-200 text-gray-800 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Close Button - only mobile */}
        <button
          className="absolute top-4 right-4 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-full overflow-y-auto p-6 pt-[10px] scrollbar-hide">
          {/* Books Section */}
          <div className="mb-8 mt-6">
            <h3 className="text-lg font-semibold text-pink-600">Books</h3>
            <hr className="border-pink-300 my-2" />
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
                >
                  View Books
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/create-book"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
                >
                  Create Book
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/outofstock"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
                >
                  Out of Stock
                </Link>
              </li>
            </ul>
          </div>

          {/* Orders Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-pink-600">Orders</h3>
            <hr className="border-pink-300 my-2" />
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/orders"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders/shipped"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
                >
                  Shipped
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders/delivered"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
                >
                  Delivered
                </Link>
              </li>
            </ul>
          </div>

          {/* Users Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-pink-600">Users</h3>
            <hr className="border-pink-300 my-2" />
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/users"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
                >
                  User Management
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/messages"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-pink-100 hover:text-pink-700 transition"
                >
                  Messages
                </Link>
              </li>
            </ul>
          </div>

          {/* Logout */}
          <div className="mt-10">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm rounded-md bg-pink-600 text-white hover:bg-pink-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
