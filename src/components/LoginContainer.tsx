import React, { useState } from "react";
import { CiMail, CiLock } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const LoginContainer: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log("password - ", hashedPassword);

      const response = await axios.post("/api/user/login", {
        userEmail: email,
        password: password,
      });

      const { token, user } = response.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      setSuccess(response.data.message);
      setError("");

      navigate("/main");
    } catch (err: any) {
      console.log("An error occurred during login.", err);
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
      setSuccess("");
    }
  };

  return (
    <section className="p-3 flex flex-col w-full">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="flex flex-col my-2">
        <p className="font-kanitmedium opacity-80 mx-2">email:</p>
        <div className="flex justify-between items-center p-2 gap-2 border">
          <CiMail />
          <input
            type="text"
            className="rounded-lg outline-none w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col my-2">
        <p className="font-kanitmedium opacity-80 mx-2">password:</p>
        <div className="flex justify-between items-center p-2 gap-2 border">
          <CiLock />
          <input
            type={showPassword ? "text" : "password"}
            className="rounded-lg outline-none w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaEye
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer mx-2 hover:scale-105 ease-in-out"
          />
        </div>
      </div>

      <button
        className="font-mono p-3 w-full bg-black text-white rounded-xl my-2 hover:bg-gray-800"
        onClick={handleLogin}
      >
        Login
      </button>

      <div className="text-sm text-gray-500 mx-3">
        <button className="underline underline-offset-4 font-mono">
          Forgot password?
        </button>
      </div>
    </section>
  );
};

export default LoginContainer;
