import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { RiTodoLine } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { SiVorondesign } from "react-icons/si";
import { IoGameController } from "react-icons/io5";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";


const Playground = () => {
  const [activeSection, setActiveSection] = useState('Todos');
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

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it initially to set the correct state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = [
    { name: 'Todos', icon: <RiTodoLine /> },
    { name: 'Coding', icon: <TfiWrite /> },
    { name: 'Design', icon: <SiVorondesign /> },
    { name: 'Gaming', icon: <IoGameController /> },
  ];

  return (
    <div className='container mx-auto h-[520px] p-4'>
      <div className='flex flex-col md:flex-row gap-4 h-full'>
        <div className={`bg-gray-800 text-white ${isCollapsed ? 'w-16' : 'w-full md:w-1/6'} rounded-lg p-4 shadow-lg flex flex-col transition-width duration-300 ease-in-out`}>
          <h1 className='text-2xl font-bold flex justify-between items-center mb-4'>
            {isMobile ? (
              <>
                Playground
                <FaAngleDown className="cursor-pointer" onClick={toggleDropdown} />
              </>
            ) : (
              isCollapsed ? (
                <TbLayoutSidebarLeftExpandFilled size={33}
                className="cursor-pointer" onClick={toggleCollapse} />
              ) : (
                <>
                  Playground
                  <MdKeyboardArrowLeft className="cursor-pointer" onClick={toggleCollapse} />
                </>
              )
            )}
          </h1>
          <ul className={`space-y-2 flex-grow ${isMobile && !isDropdownOpen ? 'hidden' : 'block'}`}>
            {sections.map((section) => (
              <li
                key={section.name}
                className={`p-2 gap-5 cursor-pointer rounded-lg transition duration-300 ease-in-out flex items-center ${
                  activeSection === section.name
                    ? 'bg-slate-900 scale-105'
                    : 'hover:bg-slate-700'
                }`}
                onClick={() => handleClick(section.name)}
              >
                {section.icon}
                {!isCollapsed && !isMobile && <span className='ml-2'>{section.name}</span>}
                {isMobile && <span className='ml-2'>{section.name}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-1 bg-gray-900 text-white rounded-lg p-4 shadow-lg flex flex-col'>
          <div>
            <h1 className='text-2xl font-bold mb-4'>{activeSection}</h1>
            <hr className='opacity-50 mb-4' />
          </div>
          <div className='overflow-y-auto flex-grow'>
            {activeSection === 'Todos' && (
              <>
                <span>1</span><p>Hello</p>
                <span>2</span><p>Hello</p>
                <span>3</span><p>Hello</p>
                <span>4</span><p>Hello</p>
                <span>5</span><p>Hello</p>
              </>
            )}
            {activeSection === 'Coding' && (
              <textarea className='bg-transparent outline-none w-full h-full border-none'>
                This is the Coding section.
              </textarea>
            )}
            {activeSection === 'Design' && <p>This is the Design section.</p>}
            {activeSection === 'Gaming' && <p>This is the Gaming section.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
