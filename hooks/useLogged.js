"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "./useUser";

function useLogged(status = "in", url = "/") {
  const { user, loaded } = useUser();

  const router = useRouter();

  useEffect(
    function () {
      if (!loaded) return;
      /*
      if(!route){

          //If we are supposed to be logged in and are not 
          if((status === "in" && !user) || (status === "out" && user)){
            return false;
          }
          else{
            return true;
          }

      }else*/ if ((status === "in" && !user) || (status === "out" && user)) {

        router.push(url);
      }
    },
    [user, status, router, url, loaded]
  );
}

export default useLogged;
