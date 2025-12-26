import React from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "https://bookstore-app-backend-tzhy.onrender.com/user/signup",
        userInfo
      );

      if (res.data) {
        toast.success("Signup Successful");

        // Close signup modal + open login modal
        setTimeout(() => {
          document.getElementById("signup_modal").close();
          document.getElementById("login_modal")?.showModal();
        }, 300);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      {/* Signup Modal */}
      <dialog id="signup_modal" className="modal">
        <div className="modal-box bg-white text-black ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="text-lg font-bold mb-5 text-center">Signup</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="text-sm font-medium ml-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                className="input input-bordered bg-white text-black text-sm w-full mt-1"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <p className="text-sm text-red-500">This field is required</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="text-sm font-medium ml-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered bg-white text-black text-sm w-full mt-1"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">This field is required</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="text-sm font-medium ml-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered bg-white text-black text-sm w-full mt-1"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">This field is required</p>
              )}
            </div>

            {/* Buttons */}
            <button className="btn text-sm bg-pink-600 hover:bg-pink-700 w-full text-white">
              Signup
            </button>

            <p className="text-center text-sm mt-3">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={() => {
                  document.getElementById("signup_modal").close();
                  document.getElementById("login_modal").showModal();
                }}
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </dialog>

      <Login />
    </>
  );
}

export default Signup;
