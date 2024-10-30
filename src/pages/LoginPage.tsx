import React, { useState } from "react";
import LoginContainer from "../components/LoginContainer";
import SignUpContainer from "../components/SignUpContainer";

const LoginPage: React.FC = () => {
  const [type, setType] = useState<String | null>("");

  return (
    <main className="w-full h-full min-h-screen flex flex-col justify-center items-center gap-3">
      <section className="w-[77%] md:w-1/3 rounded-xl border-[1px] p-3 mx-2 flex flex-col items-center bg-white py-5 shadow-md">
        <h2 className="font-kanitbold text-3xl md:text-5xl">Dashboard App</h2>

        <h1 className="font-mono font-bold text-lg md:text-xl text-gray-600">
          welcome to the portal.
        </h1>

        <div className="mx-2 w-full flex justify-between items-center rounded-xl bg-gray-50 mt-3 p-1">
          <p
            onClick={() => setType("login")}
            className={`font-mono w-full flex items-center justify-center text-sm bg-gray-00 p-2  rounded-l-xl cursor-pointer ${
              type === "login" ? "bg-gray-200" : ""
            }`}
          >
            login
          </p>
          <p
            onClick={() => setType("signup")}
            className={`font-mono w-full flex items-center justify-center text-sm bg-gray-100 p-2  rounded-r-xl cursor-pointer ${
              type === "signup" ? "bg-gray-200" : ""
            }`}
          >
            sign Up
          </p>
        </div>

        {type === "login" ? (
          <LoginContainer />
        ) : type === "signup" ? (
          <SignUpContainer />
        ) : (
          ""
        )}
      </section>
    </main>
  );
};

export default LoginPage;
