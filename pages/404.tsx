import Link from "next/link";
import React from "react";

function Error() {
  return (
    <div
      className="
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gradient-to-r
    from-violet-600
    to-blue-400
    dark:from-violet-900
    dark:to-blue-800
  "
    >
      <div className="px-40 py-20 bg-white dark:bg-black rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-violet-600 text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 dark:text-gray-300 md:text-3xl">
            <span className="text-red-500 dark:text-red-600">Oops!</span> Page
            not found
          </h6>

          <p className="mb-8 text-center text-gray-500 dark:text-gray-400 md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>

          <Link href="/">
            <a className="px-6 py-2 text-sm font-semibold text-violet-800 bg-violet-100 rounded-md hover:bg-violet-200">
              Go home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
Error.isError = true;

export default Error;
