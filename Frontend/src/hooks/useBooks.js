import { useState, useEffect } from "react";
import axios from "axios";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://bookstore-app-backend-tzhy.onrender.com/book"
        );
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return { books, loading };
};
