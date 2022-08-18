import Link from "next/link";
import Button from "../../../common/components/Button";

import { useAuth, useToggle } from "../../../common/hooks";

export default function Navbar() {
    const { loggedIn } = useAuth();

    const [menu, toggleMenu] = useToggle(false);

    return (
        <div className="fixed w-full bg-white border-b-2">

            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 sm:py-2">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white dark:text-white dark:bg-gray-600 dark:hover:bg-white dark:hover:text-gray-700 focus:outline-none"
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

                    <div className="flex-1 right-0 flex items-center justify-center sm:items-stretch sm:justify-start">
                        Oscar Ox
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">

                                <Link href="/">
                                    <a
                                        className="px-3 py-2 rounded-md font-medium text-lg bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white">
                                        Link
                                    </a>
                                </Link>

                                <Link href="/">
                                    <a
                                        className="px-3 py-2 rounded-md font-medium text-lg bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white"

                                    >
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