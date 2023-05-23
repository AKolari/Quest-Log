"use client";

import React from "react";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { logout } from "@/utils/apiFunctions";
const Header = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <p className="flex gap-4 bg-stone-600">Loading</p>;
  }

  if (!user) {
    return (
      <section className="flex gap-4 bg-stone-600">
        <nav className="flex items-baseline justify-between  gap-4  text-size-3xl text-white">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/">Home</Link>
        </nav>
      </section>
    );
  }

  return (
    <section className="flex gap-4 bg-stone-600">
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
