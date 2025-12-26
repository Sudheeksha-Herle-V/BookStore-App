import React, { useEffect, useState } from 'react';
import Sidebar from "../../../components/admin/Sidebar";
import Search from '../../../components/admin/Search';
import Header from '../../../components/admin/Header';
import LoadingSpinner from '../../../components/LoadingSpinner';
import BooksTable from '../../../components/admin/books/BooksTable';
import axios from 'axios';

const OutOfStock = () => {
  const [books,setBooks]=useState([]);
  const [loading,setLoading]=useState(false);
  const [filteredBooks,setFilteredBooks]=useState([]);

  useEffect(()=>{
    const fetchBooks=async ()=>{
      try{
        setLoading(true);
        const {data} = await axios.get("https://bookstore-app-backend-tzhy.onrender.com/book");
        const filtereddata=data.filter(book=>book.outOfStock===true);
        setBooks(filtereddata);
        setFilteredBooks(filtereddata);
      }
      catch(err){
        console.log("Error loading data",err);
      }
      finally{
        setLoading(false);
      }
    };
    fetchBooks();
  },[]);
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar/>
      <main className="lg:ml-64 w-full px-8 py-8">
        <div className='flex justify-between lg:justify-center mb-10 ml-[-8px] lg:ml-0'>
          <Header/>
          <Search books={books} onFiltered={setFilteredBooks}/>
        </div>
        {
          loading? (
            <LoadingSpinner/>
          ):(
            <BooksTable books={filteredBooks}/>
          )
        }

      </main>
    </div>
  )
}

export default OutOfStock