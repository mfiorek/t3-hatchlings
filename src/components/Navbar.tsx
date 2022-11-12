import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-neutral-500 p-2 font-bold">
      <div className="flex items-center justify-between">
        <nav className="flex gap-2">
          <Link
            href="/"
            className="rounded px-3 py-1.5
          hover:bg-neutral-400 hover:bg-opacity-50
          disabled:cursor-not-allowed disabled:opacity-20"
          >
            Home
          </Link>
          <Link
            href="/hatchlings"
            className="rounded px-3 py-1.5
            hover:bg-neutral-400 hover:bg-opacity-50
            disabled:cursor-not-allowed disabled:opacity-20"
          >
            Hatchlings
          </Link>
        </nav>
        <button
          className="rounded px-3 py-1.5
            hover:bg-red-500 hover:bg-opacity-50
            disabled:cursor-not-allowed disabled:opacity-20"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
