import React, { useState } from "react";
import { CiMail, CiLock } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const [type, setType] = useState<String | null>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <main className="w-full h-full min-h-screen flex flex-col justify-center items-center gap-3">
      <section className="w-2/3 md:w-1/3 rounded-lg border-[1px] p-3 mx-2 flex flex-col items-center">
        <h2 className="font-kanitbold text-3xl md:text-5xl">Admin Dashboard</h2>

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

        <section className="p-3 flex flex-col w-full">
          <div className="flex flex-col my-2">
            <p className="font-kanitmedium opacity-80 mx-2">email:</p>
            <div className="flex justify-between items-center p-2 gap-2 border">
              <CiMail />
              <input type="text" className="rounded-lg  outline-none w-full" />
            </div>
          </div>

          <div className="flex flex-col my-2">
            <p className="font-kanitmedium opacity-80 mx-2">password:</p>
            <div className="flex justify-between items-center p-2 gap-2 border">
              <CiLock />
              <input
                type={showPassword ? "text" : "password"}
                className="rounded-lg  outline-none w-full"
              />
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer mx-2 hover:scale-105 ease-in-out"
              />
            </div>
          </div>

          <button className="font-mono p-3 w-full bg-black text-white rounded-xl my-2 hover:bg-gray-800">
            Login
          </button>

          <div className="text-sm text-gray-500 mx-3">
            <a href="#" className="underline underline-offset-4 font-mono">
              Forgot password?
            </a>
          </div>
        </section>
      </section>
    </main>
  );
};

export default LoginPage;
