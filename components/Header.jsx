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
          <Link
            className=" col-span-2 flex justify-end items-end "
            href="/login"
          >
            Login
          </Link>
        </nav>
      </section>
    );
  }

  return (
    <section className="flex gap-4 ">
      <nav className="flex items-baseline justify-between  gap-4  text-size-3xl text-white">
        <button onClick={logout}>Logout</button>
        <Link href="/create">Create</Link>
        <Link href={`/user/${user.questMeta.username}`}>
          HI {user.questMeta.name}{" "}
        </Link>
        <Link href="/">Home</Link>
      </nav>
    </section>
  );
};

export default Header;
