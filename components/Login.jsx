"use client";
import {
  getUserById,
  getUserByUsername,
  loginUser,
} from "@/utils/apiFunctions";
import { useReducer } from "react";
import { useRouter } from "next/navigation";
import useLogged from "@/hooks/useLogged";
import useUser from "@/hooks/useUser";
import { notFound } from "next/navigation";

const Login = () => {
  const { user, loaded } = useUser();
  if (loaded) {
    console.log(user);
  }

  useLogged("out", "/");
  const router = useRouter();

  function reducer(state, action) {
    switch (action.type) {
      case "email":
      case "password":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.value };
      case "response":
        return { ...state, response: action.value };
    }

    throw Error("Unknown action." + action.type);
  }

  const initialState = {
    email: "",
    password: "",
    response: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, response, loading } = state;

  const login = async (e) => {
    dispatch({ type: "loading", value: true });
    dispatch({ type: "response", value: null });
    e.preventDefault();

    const response = await loginUser(email, password);

    dispatch({ type: "response", value: response });
    dispatch({ type: "loading", value: false });
    if (response?.success) {
      console.log(response.meta);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    }
  };

  return (
    <div className="barge text-black">
      {response && (
        <div
          className={`${
            response.success
              ? "bg-green-200 border-2 border-green-800 text-green-800"
              : "bg-red-200 border-2 border-red-800 text-red-800"
          } py-2 px-5 my-10 text-center`}
        >
          <span className="font-bold">
            {response.success
              ? `Success ${response.message ? `: ` : ``}`
              : `Failure: ${response.message}`}
          </span>
        </div>
      )}
      <h2 className="my-10 h1 text-center">Login</h2>
      <form
        onSubmit={login}
        className={loading ? "opacity-[10%] pointer-events-none" : ""}
      >
        {/* ["email", "name", "slug", "password", "response", "loading"] */}
        {Object.keys(initialState)
          .filter((k) => !["response", "loading"].includes(k))
          .map((key) => {
            let type = "text";
            if (key === "password") {
              type = "password";
            } else if (key === "email") {
              type = "email";
            }

            return (
              <p key={key} className="mb-5">
                <label className="h3 capitalize w-[75px] inline-block">
                  {key}*
                </label>
                <input
                  className="h3 border-2 border-black ml-5 inline-block w-[220px] px-2"
                  required
                  name={key}
                  onChange={(e) => {
                    dispatch({ type: e.target.name, value: e.target.value });
                  }}
                  value={state[key]}
                  type={type}
                />
              </p>
            );
          })}
        <div className="flex justify-center my-10">
          <input className="button small" type="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default Login;
