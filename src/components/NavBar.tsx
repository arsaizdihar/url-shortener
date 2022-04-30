/* eslint-disable @next/next/no-img-element */
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { useAuth } from "./AuthContext";

function NavBar() {
  const user = useAuth();
  const navigation = [
    { name: "Log in", href: "/login", hidden: user !== null },
    { name: "Dashboard", href: "/dashboard", hidden: user === null },
    { name: "Log out", href: "/logout", hidden: user === null },
  ];
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div className="relative z-10 pb-8 bg-white dark:bg-black w-full">
      <nav
        className="relative flex items-center justify-between sm:h-10 w-full pt-6 px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/">
                <a className="text-xl font-bold tracking-widest font-mono">
                  Shorten
                </a>
              </Link>
            </div>
          </div>
          <div className="space-x-2 md:pl-10 md:space-x-4 flex">
            {navigation.map(
              (item) =>
                !item.hidden && (
                  <Link href={item.href} key={item.name}>
                    <a className="font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                      {item.name}
                    </a>
                  </Link>
                )
            )}
          </div>
        </div>
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="bg-black dark:bg-white p-2 rounded-md text-white dark:text-black transition-colors duration-500"
        >
          {resolvedTheme === "light" ? (
            <SunIcon width={16} height={16} />
          ) : (
            <MoonIcon width={16} height={16} />
          )}
        </button>
      </nav>
    </div>
  );
}

export default NavBar;
