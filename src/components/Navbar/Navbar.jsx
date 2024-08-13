import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { IoInfinite } from "react-icons/io5";
import { HiColorSwatch, HiChatAlt2 } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegChartBar } from "react-icons/fa";
import Logo from "../../assets/Logo.svg";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsProductDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="navbar flex p-2
    justify-between items-center w-full border-b-[1px] px-10 relative"
    >
      <div className="flex items-center gap-3">
        <Link className="flex items-center justify-center gap-1" to="/">
          <img width={44} src={Logo} alt="Logo" />
          <h1 className="text-white text-[25px] font-semibold">Unlok Dev</h1>
        </Link>

        <div className="hidden lg:flex justify-center items-center gap-4 ml-6">
          <Link
            className="text-gray-400 text-md hover:text-white"
            to="/Pages/docs"
          >
            Docs
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              className="text-gray-400 text-md hover:text-white flex items-center gap-1"
              onClick={toggleProductDropdown}
            >
              Product <MdOutlineKeyboardArrowDown />
            </button>

            {isProductDropdownOpen && (
              <div className="absolute cursor-pointer left-0 mt-3 w-[800px] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 rounded-lg shadow-lg z-10">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center m-4">
                    <div className="mr-4">
                      <IoInfinite
                        size={24}
                        className="transition-transform hover:scale-150 hover:text-slate-700"
                      />
                    </div>
                    <div>
                      <h3 className="flex items-center text-center text-white font-bold">
                        Unlok UI
                        <MdOutlineKeyboardArrowRight size={22} />
                      </h3>
                      <p className="text-gray-400">UI Library Components</p>
                    </div>
                  </div>

                  <div className="flex items-center m-4">
                    <div className="mr-4">
                      <HiColorSwatch
                        size={24}
                        className="transition-transform hover:scale-150 hover:text-slate-700"
                      />
                    </div>
                    <div>
                      <h3 className="flex items-center text-center text-white font-bold">
                        Unlok Color
                        <MdOutlineKeyboardArrowRight size={22} />
                      </h3>
                      <p className="text-gray-400">A color Components</p>
                    </div>
                  </div>

                  <div className="flex items-center m-4">
                    <div className="mr-4">
                      <HiChatAlt2
                        size={24}
                        className="transition-transform hover:scale-150 hover:text-slate-700"
                      />
                    </div>
                    <div>
                      <h3 className="flex items-center text-center text-white font-bold">
                        Unlok Chat
                        <MdOutlineKeyboardArrowRight size={22} />
                      </h3>
                      <p className="text-gray-400">A chat application</p>
                    </div>
                  </div>

                  <div className="flex items-center m-4">
                    <div className="mr-4">
                      <FaRegChartBar
                        size={24}
                        className="transition-transform hover:scale-150 hover:text-slate-700"
                      />
                    </div>
                    <div>
                      <h3 className="flex items-center text-center text-white font-bold">
                        Unlok Chart
                        <MdOutlineKeyboardArrowRight size={22} />
                      </h3>
                      <p className="text-gray-400">A chart Components</p>
                    </div>
                  </div>

                  <div className="flex items-center m-4">
                    <div className="mr-4">
                      <IoInfinite
                        size={24}
                        className="transition-transform hover:scale-150 hover:text-slate-700"
                      />
                    </div>
                    <div>
                      <h3 className="flex items-center text-center text-white font-bold">
                        Unlok App
                        <MdOutlineKeyboardArrowRight size={22} />
                      </h3>
                      <p className="text-gray-400">Unlok App coming soon</p>
                    </div>
                  </div>

                  <div className="flex items-center m-4">
                    <div className="mr-4">
                      <IoInfinite
                        size={24}
                        className="transition-transform hover:scale-150 hover:text-slate-700"
                      />
                    </div>
                    <div>
                      <h3 className="flex items-center text-center text-white font-bold">
                        Unlok App
                        <MdOutlineKeyboardArrowRight size={22} />
                      </h3>
                      <p className="text-gray-400">Unlok App Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            className="text-gray-400 text-md hover:text-white"
            to="/Pages/playground"
          >
            Playground
          </Link>
        </div>
      </div>

      <ul className="hidden lg:flex gap-4 justify-center items-center">
        <div className="input-search bg-transparent border-2 border-opacity-80 border-slate-500 rounded-lg flex justify-around items-center  hover:bg-opacity-10 focus:border-slate-50 focus:border-opacity-15">
          <input
            type="text"
            className="cursor-pointer hover:text-white
             bg-transparent rounded-md p-[8px] flex items-center justify-center w-[200px] text-sm outline-none"
            placeholder="Search documentation..."
          />
          <span className="mr-1 items-center p-0.5 rounded cursor-pointer bg-slate-800">
            ⌘
            <span className="justify-center text-sm p-0.5 text-slate-300">
              K
            </span>
          </span>
        </div>
        <li>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-[30px] hover:text-white"
          >
            <FaGithub size={24} />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-3xl hover:text-white"
          >
            <FaXTwitter size={24} />
          </a>
        </li>
        <Link
          to="/auth/signin"
          className="border pr-4 hover:text-white text-slate-400 rounded-lg pt-[7px] pb-[7px] pl-4"
        >
          Sign In
        </Link>
      </ul>

      <button
        onClick={toggleMenu}
        className="block lg:hidden text-gray-400 text-3xl hover:text-white"
      >
        <CiMenuFries />
      </button>

      {/* Slide-out menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          &times;
        </button>
        <div className="flex flex-col items-center mt-16 space-y-6">
          <Link
            className="text-gray-400 text-lg hover:text-white"
            to="/Pages/docs"
            onClick={toggleMenu}
          >
            Docs
          </Link>
          <Link
            className="text-gray-400 text-lg hover:text-white"
            to="/Pages/product"
            onClick={toggleMenu}
          >
            Product
          </Link>
          <Link
            className="text-gray-400 text-lg hover:text-white"
            to="/Pages/playground"
            onClick={toggleMenu}
          >
            Playground
          </Link>
          <Link
            to="/auth/signin"
            className="border border-slate-500 hover:text-white text-slate-400 rounded-lg py-2 px-4"
            onClick={toggleMenu}
          >
            Sign In
          </Link>
          <div className="flex justify-around w-full px-16">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-3xl hover:text-white"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-3xl hover:text-white"
            >
              <FaXTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
