import React, { useState } from "react";

const categories = [
  "Self-help",
  "Romance",
  "Mythology",
  "Biography & Autobiography",
];

const BookForm = ({ form, updateForm, loading, onSubmit, isEdit = false }) => {
  return (
    <div className="bg-white border-2 border-pink-600 rounded-2xl w-full max-w-2xl p-6 mx-auto shadow-lg">

      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-pink-600 mb-6 text-center">
        {isEdit ? "Edit Book" : "Create Book"}
      </h1>

      <Input label="Name" value={form.name} onChange={(v) => updateForm("name", v)} />
      <Input label="Title" value={form.title} onChange={(v) => updateForm("title", v)} />
      <Input label="Price" type="number" value={form.price} onChange={(v) => updateForm("price", v)} />

      <CustomDropdown
        label="Category"
        options={categories}
        value={form.category}
        onChange={(v) => updateForm("category", v)}
      />

      <Input label="Stock Count" type="number" value={form.count} onChange={(v) => updateForm("count", v)} />
      <Input label="Image URL" value={form.image} onChange={(v) => updateForm("image", v)} />

      <button
        className="w-full py-3 mt-6 bg-pink-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : isEdit ? "Save Changes" : "Save Book"}
      </button>
    </div>
  );
};

// Reusable Input
const Input = ({ label, value, onChange, type = "text" }) => (
  <div className="my-4">
    <label className="block mb-2 text-md font-medium text-gray-700 text-xs sm:text-sm lg:text-base">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm 
                 focus:ring-2 focus:ring-pink-300 focus:outline-none transition text-xs sm:text-sm lg:text-base"
    />
  </div>
);

// ✅ Custom Dropdown
const CustomDropdown = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="my-4 relative w-full">
      <label className="block mb-2 text-base font-medium text-gray-700 text-xs sm:text-sm lg:text-base">{label}</label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex justify-between items-center text-gray-700 hover:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
      >
        {value || "Select Category"}
        <span className={`transform transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`px-4 py-2 cursor-pointer hover:bg-pink-500 hover:text-white ${
                value === opt ? "bg-pink-500 text-white" : ""
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookForm;
