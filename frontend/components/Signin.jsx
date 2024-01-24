import React, { useState } from "react";
import AuthService from "./AuthService";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [failPopup, setFailPopup] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const token = await AuthService.login(username, password);
      console.log("Login successful! Token:", token);
      setSuccessPopup(true);
      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 2000);
    } catch (error) {
      setFailPopup(true);
      throw new Error("Login failed: ", error.message);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gradient-to-r from-sky-600 to-indigo-600 h-screen">
      {successPopup && (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
          <div className="bg-white rounded-2xl shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center md:space-y-6 sm:p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 stroke-gray-900 dark:stroke-sky-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>

              <h1 className="text-xl font-bold leading-tight tracking-normal text-gray-900 md:text-2xl dark:bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                Login successful!
              </h1>
              <p className="text-base font-normal text-gray-500 dark:text-slate-300">
                Redirecting to application
              </p>
              <button
                className="inline-flex justify-center items-center py-2 px-3 text-base font-medium text-center text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                onClick={() => setSuccessPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      ,
      {failPopup && (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
          <div className="bg-white rounded-2xl shadow-2xl  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col p-6 space-y-4 items-center md:space-y-6 sm:p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 stroke-gray-900 dark:stroke-sky-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>

              <h1 className="text-xl font-bold leading-tight tracking-normal text-gray-900 md:text-2xl dark:bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                Login failed!
              </h1>
              <button
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                onClick={() => setFailPopup(false)}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-2xl">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form action="#" className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </form>
            <div className="flex flex-col-1 mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <button
                onClick={login}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gradient-to-r from-cyan-500 to-blue-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <Link to="/">
                <button className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            <div>
              <Link to="/signup">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"
                  >
                    Signup here
                  </a>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
