"use client";

import React from "react";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { logout } from "@/utils/apiFunctions";

const Header = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <p className="flex gap-4 ">Loading</p>;
  }

  if (!user) {
    return (
      <section className="flex w-full h-full border-b-2 border-white ">
        <nav className="grid grid-cols-12 items-baseline text-lg w-full text-white">
          <Link
            className=" flex justify-start items-start text-4xl col-span-10 "
            href="/"
          >
            <p>Quest Log</p>
          </Link>
          {/*<Link
            className=" col-span-2 flex justify-end items-end "
            href="/login"
          >
            Login
    </Link>*/}
        </nav>
      </section>
    );
  }

  return (
    <section className="flex w-full h-full border-b-2 border-white ">
      <nav className="grid grid-cols-12 items-baseline text-lg w-full text-white">
        <Link
          className=" flex justify-start items-start text-4xl  col-span-10 "
          href="/"
        >
          <p className="hover:font-extrabold   ">Quest Log</p>
        </Link>
        <Link
          className=" flex justify-end items-end text-xl col-span-2 "
          href={`/user/${user.questMeta.username}`}
        >
          <p className="hover:font-extrabold">
            Hello, {user.questMeta.username}
          </p>
        </Link>
      </nav>
    </section>
  );
};

export default Header;
