import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthService from "./AuthService";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [usersWithBalances, setUsersWithBalances] = useState([]);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getBalance = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const roundedBalance = Number(response.data.balance).toFixed(2);
      setBalance(roundedBalance);
    };
    getBalance();
  }, [balance]);

  useEffect(() => {
    const fetchUsersWithBalances = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/bulk"
      );
      setUsersWithBalances(response.data.user);
    };

    fetchUsersWithBalances();
  }, []);

  const handleTransfer = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        amount: parseFloat(amount),
        to: recipient,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setBalance(response.data.balance);
    setRecipient("");
    setAmount("");
  };

  const logout = () => {
    try {
      AuthService.logout();
      console.log("Logout successful!");
      setLogoutPopup(true);
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      throw new Error("Logout failed: ", error.message);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gradient-to-r from-sky-600 to-indigo-600 h-screen">
      {logoutPopup && (
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
                Logout successful!
              </h1>
              <p className="text-base font-normal text-gray-500 dark:text-slate-300">
                Redirecting to Signin Page
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
        <div className="bg-white rounded-2xl shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center md:space-y-6 sm:p-8">
            <h1 className="mb-2 flex text-xl font-bold leading-tight tracking-normal text-gray-900 md:text-2xl dark:bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
              Welcome!
            </h1>
            <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Balance:
              </label>

              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
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
                      d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <label
                  htmlFor="email"
                  className="block ps-10 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {balance}
                </label>
              </div>
            </div>
            <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Send Money
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 stroke-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <input
                  className="mb-2 ps-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Recipient"
                  value={recipient}
                  onChange={(e) => {
                    setRecipient(e.target.value);
                  }}
                />
              </div>

              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 stroke-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <input
                  className="mb-2 ps-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>

              <button
                className="mt-3 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gradient-to-r from-cyan-500 to-blue-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleTransfer}
              >
                Send
              </button>
            </div>

            <button
              onClick={logout}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gradient-to-r from-cyan-500 to-blue-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Logout
            </button>

            {/* <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <p>All Users:</p>
              <ul>
                {usersWithBalances.map((user) => (
                  <li key={user._id}>
                    email:{user.username} - Username: {user.firstName}
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
