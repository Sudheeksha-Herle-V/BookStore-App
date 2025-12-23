import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BookForm from "../../../components/admin/books/BookForm";
import BackButton from "../../../components/admin/BackButton"

const EditBook = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    price: "",
    category: "",
    count: 0,
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4001/book/${id}`);
        setForm(res.data);
      } catch (err) {
        enqueueSnackbar("Error fetching book data", { variant: "error" });
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, enqueueSnackbar]);

  const handleEditBook = async () => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:4001/book/${id}`, {
        ...form,
        price: Number(form.price),
        count: Number(form.count),
        outOfStock:Number(form.count)===0
      });

      enqueueSnackbar("Book updated successfully", { variant: "success" });
      navigate("/admin");
    } catch (err) {
      enqueueSnackbar("Failed to update book", { variant: "error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 ">
      <BackButton/>
    <div className="flex items-center justify-center">
      <BookForm
        form={form}
        updateForm={updateForm}
        loading={loading}
        onSubmit={handleEditBook}
        isEdit={true}
      />
    </div>
    </div>
  );
};

export default EditBook;
