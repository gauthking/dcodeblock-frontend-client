import React, { useState } from "react";
import { CiMail, CiLock } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
const LoginContainer: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
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
  );
};
export default LoginContainer;
