import { useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";

function Navbar({ context }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { accountStatus, user } = context;

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/ao-logo6.png"
            className="h-14 w-auto"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-center text-xl font-semibold dark:text-white">
            Book a Meeting with Adham
          </span>
        </NavLink>

        {accountStatus ? (
          <>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpen}
              onClick={handleToggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`w-full md:block md:w-auto ${isMenuOpen ? "block" : "hidden"}`}
              id="navbar-default"
            >
              <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
                <li>
                  <NavLink
                    to="/"
                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/previousBookings/${user.studentid}`}
                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  >
                    Previous Meetings
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <button
            type="button"
            className="mb-2 me-2 w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mx-0 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <NavLink to="/account/login">Sign In</NavLink>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
