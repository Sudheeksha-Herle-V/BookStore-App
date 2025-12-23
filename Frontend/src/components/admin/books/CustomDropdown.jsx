import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function CustomDropdown({ options, value, onChange, label }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      {label && <label className="block mb-1 text-gray-700 font-medium">{label}</label>}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 flex justify-between items-center text-gray-700 hover:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        {value || "Select category"}
        <FaChevronDown className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-pink-500 hover:text-white ${
                value === option ? "bg-pink-500 text-white" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
