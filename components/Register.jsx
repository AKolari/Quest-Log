"use client";
import { registerUser, loginUser } from "@/utils/apiFunctions";
import { useReducer } from "react";
import { useRouter } from "next/navigation";
import useLogged from "@/hooks/useLogged";
import useUser from "@/hooks/useUser";


const Register = () => {
  const { user, loaded } = useUser();
  useLogged("out", "/");
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
      router.push("/login")
      //const responseLogin = await loginUser(email, password);

    //dispatch({ type: "response", value: responseLogin });
    //dispatch({ type: "loading", value: false });
   // if (responseLogin?.success) {
     // console.log(responseLogin.meta);
      //router.push("/login")
      
   // }
   // else{
    //  return <>ERROR</>
   // }
    


      
    }
  };



  return (
    <div className=" text-white  ">
    
      <div className=" " >

      </div>

      <div className="m-6 flex justify-center place-center bg-black">
        <div className=" px-8 my-4 ">
          <h2 className="my-6 h1 text-center text-white text-3xl">Register</h2>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" flex border-4  border-white align py-4 items-center justify-center">
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
                  <div
                  key={key}
                  className="border-2 bg-black gmt-4 mb-4 mx-4 grid grid-cols"
                >
                  <p key={key} className="m-3 text-white">
                    <label className="h3 capitalize w-[75px] inline-block">
                      {key}*
                    </label>
                    <input
                      className="h3 border-2 border-double border-black  bg-Gunmetal  ml-5 inline-block w-[150px] md:w-[220px] px-2"
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
                );
              })}
            <div className="flex justify-center  items-center  my-10 bg-black ">
              <input className="button small border-white border-2 w-[75px] text-white" type="submit"></input>
            </div>
          </form>
        </div>
      </div>
      {response&&<span className="font-bold italic animate-pulse">
            {response.success
              ? `Success ${response.message ? `: ` : ``}`
              : "Failure: "}
              {response.message}
          </span>
          }
    </div>
  );
};

export default Register;
