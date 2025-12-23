import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  BannerImage  from "../../../components/BannerImage"
const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      alert("Admin login successful");
      navigate("/admin");
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 sm:grid-cols-[45%_55%] items-center bg-white p-4  sm:pl-0">
      <div className="hidden sm:block flex justify-center w-[90%]">
        <BannerImage />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-6">Admin Login</h2>
        <form onSubmit={handleAdminLogin} className="bg-white p-8 rounded-lg shadow-lg shadow-rose-900/30 hover:shadow-rose-900/50">
          <input
            type="password"
            placeholder="Admin Password"
            className="w-full mb-4 p-2 border rounded bg-white text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-pink-600 text-white text-sm p-2 rounded ">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
