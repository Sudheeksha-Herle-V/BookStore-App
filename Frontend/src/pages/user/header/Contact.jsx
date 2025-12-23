import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BannerImage from "../../../components/BannerImage";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/contact", formData);
      if (res.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 sm:grid-cols-[45%_55%] items-center bg-white p-4 sm:p-16 sm:pl-0">
      
      <div className="hidden sm:block flex justify-center w-[90%]">
        <BannerImage/>
      </div>
      <div className="w-full bg-white shadow-lg shadow-rose-900/40 rounded-lg p-8">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-[20%_80%] gap-4 items-center">
            <label className="block text-gray-700 mr-10 text-sm ">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded-md bg-white text-black text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-[20%_80%] gap-4 items-center">
            <label className="block text-gray-700 text-sm ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md bg-white text-black text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-[20%_80%] gap-4 items-center">
            <label className="block text-gray-700 mr-10 text-sm ">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Your message..."
              className="w-full px-4 py-2 border rounded-md bg-white text-black text-sm"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white text-sm py-2 rounded-md hover:bg-pink-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
