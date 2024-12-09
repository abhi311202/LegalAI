import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function Login() {
  // const location = useLocation();
  const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/UserHome";

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
    console.log(userInfo);
    await axios
      .post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          toast.success("Loggedin successfully");

          document.getElementById("Login1").close();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          window.history.replaceState(null, "", "/UserHome");
          navigate("/UserHome", { replace: true });
          // navigate("/UserHome");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.message);
          toast.error("Error: " + err.response.data.message);
          setTimeout(() => {}, 2000);
        }
      });
  };
  return (
    <div>
      <dialog id="Login1" className="modal text-black">
        <div className="modal-box p-10">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link
              to="/"
              className="dark:text-black btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("Login1").close()}
            >
              ✕
            </Link>
            <h3 className="font-bold text-lg text-center pb-7">Login</h3>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </label>
            {errors.email && (
              <span className="p-2 text-sm text-red-500">
                This field is required
              </span>
            )}
            <br />
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </label>
            {errors.password && (
              <span className="p-2 text-sm text-red-500">
                This field is required
              </span>
            )}
            <div className="mt-5 flex justify-between">
              <button className="py-1 px-4 rounded-md bg-black text-white hover:bg-black hover:shadow-lg hover:shadow-slate-600 duration-300">
                Login
              </button>
              <p>
                Not registered?&nbsp;
                <Link
                  to="/Signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Login;
