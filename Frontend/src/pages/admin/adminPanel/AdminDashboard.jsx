import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import BooksTable from "../../../components/admin/books/BooksTable";
import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import Search from "../../../components/admin/Search";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:4001/book");
        setBooks(data);
        setFilteredBooks(data); // initially show all books
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <main className="lg:ml-64 w-full px-8 py-8">
        {/* Modern Search Input */}
        <div className="flex w-full justify-between lg:justify-center mb-10 ml-[-8px] lg:ml-0">
          <Header />
          {/* Pass raw books array and get filteredBooks from Search */}
          <Search books={books} onFiltered={setFilteredBooks} />
        </div>

        {/* Table View*/}
        {loading ? (
            <LoadingSpinner/>
        ) : (
          <BooksTable books={filteredBooks} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
