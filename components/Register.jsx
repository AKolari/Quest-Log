"use client";
import { registerUser } from "@/utils/apiFunctions";
import { useReducer } from "react";
import { useRouter } from "next/navigation";
import useLogged from "@/hooks/useLogged";

const Register = () => {
  useLogged("out", "/profile");
  const router = useRouter();

  function reducer(state, action) {
    switch (action.type) {
      case "email":
      case "name":
      case "username":
      case "password":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.loading };
      case "response":
        return { ...state, response: action.response };
    }

    throw Error("Unknown action." + action.type);
  }

  const initialState = {
    email: "",
    name: "",
    username: "",
    password: "",
    response: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, name, username, password, response, loading } = state;

  const register = async (e) => {
    dispatch({ type: "loading", loading: true });
    e.preventDefault();

    const response = await registerUser(email, password, name, username);
    dispatch({ type: "response", response });
    dispatch({ type: "loading", loading: false });
    if (!!response?.success) {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <div className="barge text-black  ">
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
              : "Failure: "}
          </span>
          {response.message}
        </div>
      )}
      <div className="m-6 flex justify-center place-center bg-black ">
        <div className=" px-8 my-4 border-white border-2">
          <h2 className=" my-6 h1 text-center text-white text-3xl">Register</h2>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-blue-700 flex border-4 w-96 border-white align py-4 items-center justify-center">
          <form
            onSubmit={register}
            className={loading ? "opacity-[10%] pointer-events-none" : ""}
          >
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
                  <div>
                    <div className="border-2 bg-black gmt-4 mb-4 grid grid-cols">
                      <p key={key} className="m-3 text-white">
                        <label className="h3 capitalize w-[75px] inline-block">
                          {key}*:
                        </label>

                        <input
                          className="h3 border-2 border-double border-stone-400 bg-amber-600 border-black ml-5 inline-block w-[220px] px-2"
                          required
                          name={key}
                          onChange={(e) => {
                            dispatch({
                              type: e.target.name,
                              value: e.target.value,
                            });
                          }}
                          value={state[key]}
                          type={type}
                        />
                      </p>
                    </div>
                  </div>
                );
              })}
            <div className="flex justify-center justify-items-end my-10 bg-black border-white border-4">
              <input className="button small text-white" type="submit"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
