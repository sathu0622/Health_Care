import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars4Icon } from "@heroicons/react/24/solid";

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <header className="flex justify-between px-5 py-6 bg-primary relative z-20 h-20 comName">
      <h3>
      <Link to="/">Bridal Vision Studio</Link>
      </h3>
        <nav className="hidden md:block">
          <ul className="flex">
            <li className="px-2">
              <Link to="/Review">Home</Link>
            </li>
            <li className="px-2">
              <Link to="/about">About</Link>
            </li>
            <li className="px-2">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="px-2">
              <Link to="/collection">Collections</Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="block md:hidden"
        >
          <Bars4Icon className="text-black h-5" />
        </button>
      </header>

      {toggleMenu && (
        <nav className="absolute left-0 w-full md:hidden z-10 mobile-nav">
          <ul className="flex flex-col">
            <li className="w-full text-center border-b px-3 py-4">
              <Link to="/home">Home</Link>
            </li>
            <li className="w-full text-center border-b px-3 py-4">
              <Link to="/about">About</Link>
            </li>
            <li className="w-full text-center border-b px-3 py-4">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="w-full text-center border-b px-3 py-4">
              <Link to="/collection">Collections</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Header;
