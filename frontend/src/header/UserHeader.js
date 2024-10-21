import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/health.png";

function UserHeader() {
  const [username, setUsername] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <div>
      <nav className="bg-white border-blue-300">
        <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="block py-2 px-3 text-blue-600 hover:bg-blue-200 rounded md:bg-transparent md:text-blue-700"
          >
            <img src={logo} className="w-10 h-10" alt="HealthCare Logo" />
            <span className="self-center text-2xl font-semibold text-blue-700">
              HealthCare
            </span>
          </Link>

          <div className="flex md:order-2">
            {username ? (
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  {username}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06 0L10 10.56l3.71-3.35a.75.75 0 111.06 1.06l-4.25 3.75a.75.75 0 01-1.06 0l-4.25-3.75a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="block py-2 px-3 text-blue-600 hover:bg-blue-200 rounded md:bg-transparent md:text-blue-700"
              >
                Logout
              </Link>
            )}
          </div>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-6 md:p-0 mt-4 font-medium border border-blue-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <Link
                  to="/appointmentHospital"
                  className="block py-2 px-3 text-blue-600 hover:bg-blue-200 rounded md:bg-transparent md:text-blue-700"
                >
                  Make Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/appointmentScanner"
                  className="block py-2 px-3 text-blue-600 hover:bg-blue-200 rounded md:bg-transparent md:text-blue-700"
                >
                  Scan Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/viewAppointment"
                  className="block py-2 px-3 text-blue-600 hover:bg-blue-200 rounded md:bg-transparent md:text-blue-700"
                >
                  View Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/viewArticles"
                  className="block py-2 px-3 text-blue-600 hover:bg-blue-200 rounded md:bg-transparent md:text-blue-700"
                >
                  Articles
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserHeader;
