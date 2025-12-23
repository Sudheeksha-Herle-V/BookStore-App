import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/login", userInfo);

      if (res.data) {
        toast.success("Logged in Successfully");

        const modal = document.getElementById("login_modal");
        if (modal) modal.close();

        setTimeout(() => {
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          window.location.reload();
        }, 700);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Login
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
          {/* Email */}
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white text-black"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">This field is required</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white text-black"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">This field is required</p>
            )}
          </div>

          {/* Buttons */}
          <button className="btn bg-pink-600 hover:bg-pink-700 w-full text-white">
            Login
          </button>

          <p className="text-sm text-gray-600 mt-3">
            Not registered?{" "}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                document.getElementById("login_modal").close();
                document.getElementById("signup_modal").showModal();
              }}
            >
              Signup
            </button>
          </p>
        </form>
      </div>
    </dialog>
  );
}

export default Login;
