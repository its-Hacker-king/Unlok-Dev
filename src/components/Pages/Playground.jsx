import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { RiTodoLine } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { SiVorondesign } from "react-icons/si";
import { IoGameController } from "react-icons/io5";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import TodoApp from "../Todos/TodoApp";
import Design from "../Design/Design";
import Logo from "../../assets/Logo.svg";

const Playground = () => {
  const [activeSection, setActiveSection] = useState("Todos");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (section) => {
    setActiveSection(section);
    if (isMobile) {
      setIsDropdownOpen(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections = [
    { name: "Todos", icon: <RiTodoLine /> },
    { name: "Design", icon: <SiVorondesign /> },
    { name: "Coding", icon: <TfiWrite /> },
    { name: "Gaming", icon: <IoGameController /> },
  ];

  return (
    <div className="container mx-auto h-screen p-4">
      <div className="flex flex-col md:flex-row gap-4 h-full">
        <div
          className={`bg-gray-800 text-white ${
            isCollapsed ? "w-16" : "w-full md:w-1/6"
          } rounded-lg p-4 shadow-lg flex flex-col transition-width duration-300 ease-in-out`}
        >
          <h1 className="text-2xl font-bold flex justify-between items-center mb-4">
            {isMobile ? (
              <>
                <Link className="flex items-center justify-center gap-2" to="/">
                  <img width={48} src={Logo} alt="Logo" />
                  <h1 className="text-white text-[30px] font-semibold">
                    Unlok Dev
                  </h1>
                </Link>
                <FaAngleDown
                  className="cursor-pointer"
                  onClick={toggleDropdown}
                />
              </>
            ) : isCollapsed ? (
              <TbLayoutSidebarLeftExpandFilled
                size={33}
                className="cursor-pointer"
                onClick={toggleCollapse}
              />
            ) : (
              <>
                <Link className="flex items-center justify-center gap-2" to="/">
                  <img width={30} src={Logo} alt="Logo" />
                  <h1 className="text-white text-[20px] font-semibold">
                    Unlok Dev
                  </h1>
                </Link>

                <MdKeyboardArrowLeft
                  className="cursor-pointer"
                  onClick={toggleCollapse}
                />
              </>
            )}
          </h1>
          <ul
            className={`space-y-2 flex-grow ${
              isMobile && !isDropdownOpen ? "hidden" : "block"
            }`}
          >
            {sections.map((section) => (
              <li
                key={section.name}
                className={`p-2 gap-5 cursor-pointer rounded-lg transition duration-300 ease-in-out flex items-center ${
                  activeSection === section.name
                    ? "bg-slate-900 scale-105"
                    : "hover:bg-slate-700"
                }`}
                onClick={() => handleClick(section.name)}
              >
                {section.icon}
                {!isCollapsed && !isMobile && (
                  <span className="ml-2">{section.name}</span>
                )}
                {isMobile && <span className="ml-2">{section.name}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-gray-900 text-white rounded-lg p-4 shadow-lg flex flex-col">
          <div>
            <h1 className="text-2xl font-bold mb-4">{activeSection}</h1>
            <hr className="opacity-50 mb-4" />
          </div>
          <div className="overflow-y-auto flex-grow">
            {activeSection === "Todos" && <TodoApp />}
            {activeSection === "Design" && <Design />}
            {activeSection === "Coding" && (
              <textarea className="bg-transparent resize-none outline-none w-full h-full border-none">
                This is the Coding section.
              </textarea>
            )}
            {activeSection === "Gaming" && <p>This is the Gaming section.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
