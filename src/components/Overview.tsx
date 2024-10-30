"use client";

import { useState, useRef, useEffect } from "react";
import { CiBellOn } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const Overview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <main className="w-full flex flex-col items-center mx-2 p-5">
      <section className="w-full flex justify-between">
        <div className="header m-1">
          <h1 className="font-kanitmedium text-xl md:text-3xl">
            Dashboard Overview
          </h1>
        </div>
        <nav className="flex items-center justify-center gap-3 ">
          <div className="p-1 rounded-lg bg-white hover:scale-105 transition-all ease-in-out cursor-pointer">
            <CiBellOn size={23} />
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center gap-2 p-1 rounded-lg bg-white cursor-pointer hover:scale-105 transition-all ease-in-out"
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <p className="text-sm md:text-lg font-mono">John Doe</p>
              <IoIosArrowDown
                className={`transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <a
                    href="#profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiUser className="mr-3" />
                    Profile
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiSettings className="mr-3" />
                    Settings
                  </a>
                  <a
                    href="#logout"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-3" />
                    Log out
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </section>
    </main>
  );
};

export default Overview;
