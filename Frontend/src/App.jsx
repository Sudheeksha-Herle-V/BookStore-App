import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./home/Home";
import Book from "./book/Book";
import CategoryPage from "./pages/user/CategoryPage";
import SearchPage from "./pages/user/SearchPage";

import { About, Contact } from "./pages/user/header";
import { CartPage, CheckoutPage, OrdersPage } from "./pages/user/cart";

import { CreateBook, EditBook, DeleteBook, ShowBook } from "./pages/admin/books";
import { OutOfStock, AdminDashboard, AdminLogin } from "./pages/admin/adminPanel";
import { AdminMessages, AdminUsers, AdminOrdersPage } from "./pages/admin/customers";

import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth();

  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/books"
          element={<Book /> }
        />

        {/* User Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/search" element={<SearchPage/>}/>

        {/* Admin Auth + Panel */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Admin Books */}
        <Route path="admin/outofstock" element={<OutOfStock/>}/>
        <Route path="/admin/create-book" element={<CreateBook />} />
        <Route path="/admin/edit-book/:id" element={<EditBook />} />
        <Route path="/admin/delete-book/:id" element={<DeleteBook />} />
        <Route path="/admin/show-book/:id" element={<ShowBook />} />

        {/* Admin Customers */}
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* Admin Orders */}
        <Route
          path="/admin/orders"
          element={<AdminOrdersPage type="Pending" />}
        />
        <Route
          path="/admin/orders/shipped"
          element={<AdminOrdersPage type="Shipped" />}
        />
        <Route
          path="/admin/orders/delivered"
          element={<AdminOrdersPage type="Delivered" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
