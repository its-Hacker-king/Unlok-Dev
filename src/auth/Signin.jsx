import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import Button from "../components/Button/Button";

const Signin = () => {
  return (
    <div className="container max-h-[520px] justify-center top-32 relative items-center flex gap-3 flex-col w-full mx-auto">
      <div className="flex justify-center items-center gap-2 text-5xl">
        <img width={60} src={Logo} alt="Unlok Dev Logo" />
        <h1 className="font-bold">
          <Link to="/">Unlok Dev</Link>
        </h1>
      </div>

      <div className="details-user flex flex-col gap-2">
        <label className="text-xl font-[Lato]" htmlFor="username">
          Email & Username{" "}
        </label>
        <input
          placeholder="Enter email or username..."
          type="text"
          id="username"
          className="bg-transparent border hover:border-slate-600 focus:border-slate-800 focus:text-slate-400 rounded-md w-72 p-2"
        />
      </div>
      <div className="details-pass flex flex-col gap-2">
        <label className="text-xl font-[Lato]" htmlFor="password">
          Password
        </label>
        <input
          placeholder="Enter password..."
          type="password"
          id="password"
          className="bg-transparent border hover:border-slate-600 focus:border-slate-800 focus:text-slate-400 rounded-md w-72 p-2"
        />
      </div>
      <Button title="Log in" styles="w-72" />

      <span>
        Don't have an account?{" "}
        <Link
          to="/auth/signup"
          className="text-blue-950 underline hover:text-blue-600"
        >
          Sign up
        </Link>
      </span>
    </div>
  );
};

export default Signin;
