/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useAuth } from "../src/components/AuthContext";

const Home: NextPage = () => {
  const user = useAuth();
  const navigation = [
    { name: "Log in", href: "/login", hidden: user !== null },
    { name: "Dashboard", href: "/dashboard", hidden: user === null },
    { name: "Log out", href: "/logout", hidden: user === null },
  ];
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <>
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-bold text-gray-900 dark:text-gray-300 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Shorten your</span>{" "}
            <span className="block text-violet-600 dark:text-violet-500 xl:inline">
              URL
            </span>
          </h1>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Every long urls deserve a short one.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link href={user ? "/dashboard" : "/login"}>
                <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white dark:text-gray-300 bg-violet-600 hover:bg-violet-700 dark:bg-violet-800 hover:dark:bg-violet-700 md:py-4 md:text-lg md:px-10">
                  Get started
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
