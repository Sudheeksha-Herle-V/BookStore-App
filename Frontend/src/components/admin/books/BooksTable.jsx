import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700 border-collapse shadow-md rounded-lg overflow-hidden">
        <thead className="bg-pink-100 text-pink-800">
          <tr>
            <th className="py-3 px-2  border border-pink-200 text-center hidden sm:table-cell">No</th>
            <th className="py-3 px-4 border border-pink-200 text-left">Name</th>
            <th className="py-3 px-4 border border-pink-200 text-center hidden sm:table-cell">Category</th>
            <th className="py-3 px-4 border border-pink-200 text-center hidden sm:table-cell">Price</th>
            <th className="py-3 px-4 border border-pink-200 text-center hidden sm:table-cell">Count</th>
            <th className="py-3 px-4 border border-pink-200 text-center ">Operations</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="hover:bg-pink-50 transition-colors">
              <td className="py-2 px-2 text-center border border-pink-100 hidden sm:table-cell">
                {index + 1}
              </td>

              <td className="py-2 px-2 text-left border border-pink-100">
                {book.name}
              </td>

              {/* Hidden below sm */}
              <td className="py-2 px-4 text-center border border-pink-100 hidden sm:table-cell">
                {book.category}
              </td>
              <td className="py-2 px-4 text-center border border-pink-100 hidden sm:table-cell ">
                ₹{book.price}
              </td>
              <td className="py-2 px-4 text-center border border-pink-100 hidden sm:table-cell">
                {book.count}
              </td>

              {/* Operations hidden below sm */}
              <td className="py-2 px-4 text-center border border-pink-100 ">
                <div className="flex justify-center gap-3 text-xl">
                  <Link to={`/admin/show-book/${book._id}`} title="Info">
                    <BsInfoCircle className="text-yellow-600 hover:text-yellow-800 text-sm sm:text-base" />
                  </Link>
                  <Link to={`/admin/edit-book/${book._id}`} title="Edit">
                    <AiOutlineEdit className="text-green-600 hover:text-green-800 text-sm sm:text-base" />
                  </Link>
                  <Link to={`/admin/delete-book/${book._id}`} title="Delete">
                    <MdOutlineDelete className="text-red-600 hover:text-red-800 text-sm sm:text-base" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
