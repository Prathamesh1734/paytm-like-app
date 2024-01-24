import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gradient-to-r from-sky-600 to-indigo-600 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="mb-4 pb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
          Welcome to our banking app!
        </h1>
        <p className="mb-8 text-base font-normal text-gray-500 lg:text-lg sm:px-16 xl:px-48 dark:text-slate-300">
          Banking experience has never been this easy before, start your journey
          now and see the difference.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link to="/signup">
            <button className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-primary-900 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Sign Up
            </button>
          </Link>
          <Link to="/signin">
            <button className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
