import Link from "next/link";
import Button from "../../../common/components/Button";

import { useAuth, useToggle } from "../../../common/hooks";

export function Navbar() {
  const { loggedIn } = useAuth();

  const [menu, toggleMenu] = useToggle(false);

  return (
    <div className="fixed w-full border-b-2 bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 sm:py-2 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md bg-gray-200 p-2 text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none dark:bg-gray-600 dark:text-white dark:hover:bg-white dark:hover:text-gray-700"
              aria-expanded="false"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="right-0 flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            Oscar Ox
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href="/">
                  <a className="rounded-md bg-gray-200 px-3 py-2 text-lg font-medium text-gray-700 hover:bg-gray-700 hover:text-white">
                    Link
                  </a>
                </Link>

                <Link href="/">
                  <a className="rounded-md bg-gray-200 px-3 py-2 text-lg font-medium text-gray-700 hover:bg-gray-700 hover:text-white">
                    Link
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
