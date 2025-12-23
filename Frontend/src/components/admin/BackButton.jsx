import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <span>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2
                   text-gray-800 rounded-lg transition font-medium text-sm lg:text-lg"
      >
        <ArrowLeft size={20} />
        {label}
      </button>
    </span>
  );
};

export default BackButton;
