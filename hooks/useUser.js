"use client";
import { getCurrentUser } from "@/utils/apiFunctions";
import supabase from "@/utils/supabase";
import { useEffect, useRef, useState } from "react";

function useUser() {
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  const refreshUser = async () => {
    setError(undefined);
    setUser(undefined);
    getUser();
  };

  const getUser = async () => {
    setError(0);
    setUser(0);
    setLoaded(false);

    const currentUser = await getCurrentUser();
    //console.log("USER IS LOADED")
    setLoaded(true);
    if (!currentUser) {
      setUser(null);
      return;
    }
    if (currentUser.error) {
      setError(currentUser.error);
      return;
    }

    setUser(currentUser.data);
  };
  supabase.auth.onAuthStateChange((event, session) => {
    if (["SIGNED_IN", "SIGNED_OUT"].includes(event)) {
      getUser();
    }
  });

  useEffect(() => {
    getUser();
  }, []);

  return {
    user,
    error,
    loaded,
    refreshUser,
  };
}
export default useUser;
