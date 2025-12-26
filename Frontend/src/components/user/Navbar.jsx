import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { BsClipboardCheck } from "react-icons/bs";
import Login from "../../pages/user/header/Login";
import { Signup } from "../../pages/user/header";
import { useAuth } from "../../context/AuthProvider";
import { IoSearchSharp } from "react-icons/io5";
import RotatingLogo from "./RotatingLogo";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [sticky, setSticky] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  let hideTimeout;

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadCartCount = () => {
    const user = JSON.parse(localStorage.getItem("Users"));
    const userId = user?._id;
    if (!userId) return;

    fetch(`https://bookstore-app-backend-tzhy.onrender.com/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) return setCartCount(0);
        const total = data.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      })
      .catch(() => setCartCount(0));
  };

  useEffect(() => {
    loadCartCount();
  }, [authUser]);

  useEffect(() => {
    window.addEventListener("cartUpdated", loadCartCount);
    return () => window.removeEventListener("cartUpdated", loadCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Users");
    setAuthUser(null);
    navigate("/");
  };

  const navItems = (
  <>
    <li className="p-0">
      <a href="/" className="px-4 py-2 hover:bg-pink-600 hover:text-white rounded-md">Home</a>
    </li>
    <li className="p-0">
      <a href="/books" className="px-4 py-2 hover:bg-pink-600 hover:text-white rounded-md">Books</a>
    </li>
    <li className="p-0">
      <a href="/contact" className="px-4 py-2 hover:bg-pink-600 hover:text-white rounded-md">Contact</a>
    </li>
    <li className="p-0">
      <a href="/about" className="px-4 py-2 hover:bg-pink-600 hover:text-white rounded-md">About</a>
    </li>
    {!authUser && (
      <li className="p-0">
        <a href="/admin-login" className="px-4 py-2 hover:bg-pink-600 hover:text-white rounded-md">Admin</a>
      </li>
    )}
  </>
);

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-10  px-0 sm:px-4 bg-white text-black fixed top-0 left-0 right-0 z-50 ${sticky ? "shadow-md transition-all duration-300" : ""}`}
    >
      <div className="navbar flex justify-between items-center py-0 md:py-3">

        {/* LEFT: Logo + Mobile Menu */}
        <div className="flex items-center ml-[-10px] md:ml-[5px] sm:ml-[2px] ">

          {/* MOBILE MENU */}
          <div
            className="relative lg:hidden"
            onMouseEnter={() => {
              clearTimeout(hideTimeout);
              setShowMobileDropdown(true);
            }}
            onMouseLeave={() => {
              hideTimeout = setTimeout(() => setShowMobileDropdown(false), 200);
            }}
          >
            <button className="btn btn-ghost ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-6 md:w-6 sm:h-4 sm:w-4 " fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {showMobileDropdown && (
              <div className="absolute left-2 bg-white border text-sm shadow-lg rounded-md min-w-[8rem] max-w-[12rem] border z-50 p-2"> <ul className="text-sm flex flex-col gap-4 px-2 py-2">{navItems}</ul> </div>
            )}
          </div>
          

          <RotatingLogo />

        </div>

        {/* RIGHT: Desktop Menu + Search + Cart + Account/Login */}
        <div
          className=" flex items-center gap-4"
        >
          {/* DESKTOP NAV */}
          <div className="navbar-center hidden lg:flex"> <ul className="menu menu-horizontal space-x-2 text-md 2xl:text-xl">{navItems}</ul> </div>

          <div className="flex items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {/* SEARCH ICON */}
            <IoSearchSharp
              className="cursor-pointer text-black text-base sm:text-lg md:text-xl "
              onClick={() => navigate("/search")}
            />

            {/* CART */}
            {authUser && (
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
                title="View Cart"
              >
                <FiShoppingCart className="text-black text-base sm:text-lg md:text-xl " />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] lg:text-sm md:text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
            )}

            {/* ACCOUNT DROPDOWN */}
            {authUser ? (
              <div
                className="relative"
                onMouseEnter={() => {
                  clearTimeout(hideTimeout);
                  setShowDropdown(true);
                }}
                onMouseLeave={() => {
                  hideTimeout = setTimeout(() => setShowDropdown(false), 200);
                }}
              >
                <button className="flex items-center gap-2 text-black px-2 py-2 rounded-md cursor-pointer hover:bg-pink-600 hover:text-white">
                  <FiUser className="text-base sm:text-lg md:text-xl " />
                  <span className="hidden text-base lg:text-sm md:inline lg:inline rounded-md">Account</span>
                </button>

                {showDropdown && (
                  <div className="absolute mt-2 bg-white shadow-lg rounded-md text-sm text-black w-40 z-50 border p-2 right-0">
                    <button
                      onClick={() => navigate("/orders")}
                      className="w-full flex items-center justify-start gap-2 px-4 py-2 hover:bg-pink-600 hover:text-white rounded-md"
                    >
                      <BsClipboardCheck /> View Orders
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-start gap-2 px-4 py-2 hover:bg-pink-600 hover:text-white rounded-md text-red-600"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <a
                  className="bg-pink-600 text-white px-3 py-2 rounded-md cursor-pointer"
                  onClick={() => document.getElementById("login_modal").showModal()}
                >
                  Login
                </a>
                <Login />
                <Signup/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
