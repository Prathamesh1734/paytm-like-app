import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Welcome to our banking app!
        </h1>
        <p className="mb-8 text-base font-normal text-gray-500 lg:text-lg sm:px-16 xl:px-48 dark:text-gray-400">
          Banking experience has never been this easy before, start your journey
          now and see the difference.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link to="/signup">
            <button className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Sign Up
            </button>
          </Link>
          <Link to="/signin">
            <button className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
