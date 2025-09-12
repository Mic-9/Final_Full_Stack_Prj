import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function GuestLayout({ children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center border-2 border-gray-300 rounded-md px-2 py-1">
                                <Link
                                    href="/"
                                    className="flex items-center text lg font-bold text-gray-900"
                                >
                                    RugbySked
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            <Link
                                href="/login"
                                className="text-gray-800 hover:text-gray-600"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="text-gray-800 hover:text-gray-600"
                            >
                                Register
                            </Link>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (prev) => !prev
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <Link
                            href="/login"
                            className="block px4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="block px4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </nav>
            <div>{children}</div>
        </div>
    );
}
