import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import BackButton from "../../../components/admin/BackButton";

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchbook= async ()=>{
      try{
        setLoading(true);
        const {data}=await axios.get(`https://bookstore-app-backend-tzhy.onrender.com/book/${id}`);
        setBook(data);
      }
      catch(err){
        console.log("Error fetching book",err);
      }
      finally{
        setLoading(false);
      }
    }
    fetchbook();
  }, [id]);

  if (loading) {
    return (
      <LoadingSpinner/>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-red-500">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-pink-100 to-white px-10 py-10">
      <BackButton/>
    <div className="min-h-[89vh] flex items-center justify-center pt-4 sm:pt-0">
  <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl w-full flex flex-col md:flex-row gap-8 border-2 border-pink-400">
        {/* Image Section */}
        {book.image && (
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              src={book.image}
              alt={book.title}
              className="rounded-xl max-h-[500px] w-auto object-contain border border-gray-300"
            />
          </div>
        )}

        {/* Info Section */}
        <div className="w-full md:w-1/2 space-y-5 ">
          <h1 className="text-xl sm:text-2xl font-bold text-pink-600 border-b-2 border-pink-300 pb-2 pt-4">
            Book Details
          </h1>
          <Detail label="Name" value={book.name} />
          <Detail label="Title" value={book.title} />
          <Detail label="Price" value={`₹${book.price}`} />
          <Detail label="Category" value={book.category} />
          <Detail label="Stock Count" value={book.count} />
        </div>
      </div>
    </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="text-gray-800 text-sm sm:text-lg">
    <span className="font-semibold text-pink-600">{label}:</span>{" "}
    <span>{value}</span>
  </div>
);

export default ShowBook;
