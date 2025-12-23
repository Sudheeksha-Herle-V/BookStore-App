import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../../../components/admin/BackButton";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:4001/book/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
        navigate("/admin");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting book", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100" >
      <BackButton/>
      <div className=" flex items-center justify-center pt-32">
        <div className="bg-white border-2 border-pink-600 rounded-2xl w-full max-w-xl p-8 shadow-lg text-center">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-pink-600 mb-4">Delete Book</h1>
          <p className="text-xs sm:text-base lg:text-lg text-gray-700 mb-6">
            Are you sure you want to delete this book? This action cannot be undone.
          </p>
          <button
            onClick={handleDeleteBook}
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition text-xs sm:text-base lg:text-lg"
          >
            {loading ? "Deleting..." : "Yes, Delete it"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
