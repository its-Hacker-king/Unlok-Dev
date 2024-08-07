import React from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";

const Hero = () => {
  return (
    <div className="flex flex-col h-screen max-h-[520px] text-center justify-center mx-auto w-full p-4">
      <div className="main-content mb-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white opacity-80">
          Unlok Dev is the ultimate <br className="hidden lg:block" /> solution for developers.
        </h1>
      </div>
      <div className="child-content mb-8">
        <p className="text-md md:text-lg text-gray-400">
          Unite with developers around the world.
          <br className="hidden lg:block" /> using our toolkit to drive innovative and impactful projects.
        </p>
      </div>
      <div className="buttons flex flex-col sm:flex-row justify-center gap-4">
        <button className="inline-flex items-center justify-center bg-black border border-opacity-80 text-white rounded-lg p-3 sm:p-4 md:p-3 hover:bg-slate-950 w-full sm:w-[250px] flex-1 sm:flex-none">
          <CgMenuGridR size={24} className="mr-2" />
          Explore Components
        </button>
        <button className="inline-flex items-center justify-center bg-white text-gray-800 rounded-lg p-3 sm:p-4 md:p-3 border hover:text-white border-gray-300 hover:bg-transparent w-full sm:w-[250px] flex-1 sm:flex-none">
          Get Started
          <MdOutlineKeyboardArrowRight size={24} className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default Hero;
