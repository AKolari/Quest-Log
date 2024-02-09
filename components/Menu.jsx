"use client";
import useLogged from "@/hooks/useLogged";
import useUser from "@/hooks/useUser";
import { logout } from "@/utils/apiFunctions";
import { useState, useEffect } from "react";
import Link from "next/link";

const Menu = ({ MenuItemHandler, currentMenuItem, user }) => {
  return (
    <div className=" flex h-1/2  flex-col justify-center items-center text-end pr-12 text-Silver  ">
      <p className=" h-1/6  ">
        <button
          className={`   text-3xl ${
            currentMenuItem === "QuestFeed"
              ? " underline text-White-Smoke "
              : ""
          } hover:text-4xl`}
          onClick={() => {
            MenuItemHandler("QuestFeed");
          }}
        >
          QUEST LOG
        </button>
      </p>

      {!user && (
        <>
          <p>
            <button
              className={`${
                currentMenuItem === "Login"
                  ? " underline text-White-Smoke "
                  : ""
              } hover:text-xl mt-4 `}
              onClick={() => {
                MenuItemHandler("Login");
              }}
            >
              Login
            </button>
          </p>
          <p>
            <button
              className={`${
                currentMenuItem === "Register"
                  ? " underline text-White-Smoke "
                  : ""
              } hover:text-xl`}
              onClick={() => {
                MenuItemHandler("Register");
              }}
            >
              Register
            </button>
          </p>
        </>
      )}

      {user && (
        <>
          <Link href={`/user/${user.questMeta.username}`}>
            <p className=" text-center mt-4 hover:text-xl">
              Welcome, {user.questMeta.username}
            </p>
          </Link>
          <p>
            <button
              className={`${
                currentMenuItem === "Create"
                  ? " underline text-White-Smoke "
                  : ""
              } hover:text-xl`}
              onClick={() => {
                MenuItemHandler("Create");
              }}
            >
              Create
            </button>
          </p>
          <button
            className="hover:text-xl"
            onClick={() => {
              MenuItemHandler("QuestFeed");
              logout();
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Menu;
