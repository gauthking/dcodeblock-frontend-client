import React, { useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const SignUpContainer: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const salt: any = process.env.saltVal;

  const handleSignUp = async () => {
    try {
      const hashedPassword = await bcrypt.hash(password, salt);

      const response = await axios.post("/api/user/register", {
        userName: name,
        userEmail: email,
        password: hashedPassword,
      });

      setSuccess(response.data.message);
      setError("");

      navigate("/main");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during sign up."
      );
      setSuccess("");
    }
  };

  return (
    <section className="p-3 flex flex-col w-full">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="flex flex-col my-2">
        <p className="font-kanitmedium opacity-80 mx-2">name:</p>
        <div className="flex justify-between items-center p-2 gap-2 border">
          <CiUser />
          <input
            type="text"
            className="rounded-lg outline-none w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col my-2">
        <p className="font-kanitmedium opacity-80 mx-2">email:</p>
        <div className="flex justify-between items-center p-2 gap-2 border">
          <CiMail />
          <input
            type="email"
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
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </section>
  );
};

export default SignUpContainer;
