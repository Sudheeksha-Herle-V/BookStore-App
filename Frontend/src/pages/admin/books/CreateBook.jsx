import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BookForm from "../../../components/admin/books/BookForm";
import BackButton from "../../../components/admin/BackButton";

const CreateBook = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    title: "",
    count: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveBook = async () => {
    if (!form.name || !form.price || !form.category) {
      enqueueSnackbar("Please fill all required fields", { variant: "warning" });
      return;
    }

    const data = {
      ...form,
      price: Number(form.price),
      count: Number(form.count),
      outOfStock:Number(form.count)===0
    };

    try {
      setLoading(true);
      await axios.post("https://bookstore-app-backend-tzhy.onrender.com/book", data);
      enqueueSnackbar("Book Created Successfully", { variant: "success" });
      navigate("/admin");
    } catch (error) {
      enqueueSnackbar("Error creating book", { variant: "error" });
      console.error("Book creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <BackButton/>
      <BookForm
        form={form}
        updateForm={updateForm}
        loading={loading}
        onSubmit={handleSaveBook}
        isEdit={false}
      />
    </div>
  );
};

export default CreateBook;
