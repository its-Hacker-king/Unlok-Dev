import React from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/Logo.svg'

const Signup = () => {
  return (
    <div className="container max-h-[520px] justify-center top-32 relative items-center flex gap-3 flex-col w-full mx-auto">
      <div className="flex justify-center items-center gap-2 text-5xl">
        <img width={60} src={Logo} alt="Unlok Dev Logo" />
        <h1 className="font-bold" ><Link to='/'>Unlok Dev</Link></h1>
      </div>
      <div className="details-user flex flex-col gap-2">
        <label className="text-xl font-[Lato]" htmlFor="username">
          Email {" "}
        </label>
        <input
          placeholder="Enter email ..."
          type="email"
          id="username"
          className="bg-transparent border hover:border-slate-600 focus:border-slate-800 focus:text-slate-400 rounded-md w-72 p-2"
        />
      </div>
      <div className="details-user flex flex-col gap-2">
        <label className="text-xl font-[Lato]" htmlFor="username">
          Username {" "}
        </label>
        <input
          placeholder="Enter username..."
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
      <button className="border justify-center hover:bg-black 
      hover:border-slate-700
       items-center flex gap-1 w-72 p-2 rounded-md">Create an account</button>
      <span>Already have an account? <Link to='/auth/signin' className="text-blue-950 underline">Sign in</Link> </span>
    </div>
  );
};

export default Signup;
