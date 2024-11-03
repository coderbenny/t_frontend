// pages/index.js
"use client";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  const menuItems = [
    { route: "/", name: "Home" },
    { route: "/dashboard", name: "Dashboard" },
    { route: "/create-event", name: "Create Event" },
    { route: "/sell-ticket", name: "Sell Ticket" },
    { route: "/check-in-ticket", name: "Check In Ticket" },
  ];

  return (
    <header className="shadow-md fixed w-full z-50 bg-orange-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-600">
          <Link href="/" className="hover:text-orange-400 transition-colors">
            TicketPal
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.route}>
              <button
                className="btn btn-ghost hover:bg-orange-200 rounded-md text-gray-700 transition ease-in-out duration-150"
                onClick={handleLinkClick}
              >
                {item.name}
              </button>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="btn btn-ghost hover:bg-orange-200 p-2 rounded-md text-orange-600 transition ease-in-out duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-4 md:hidden">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.route}>
              <button
                className="btn btn-ghost block w-full text-left text-gray-700 hover:bg-orange-100 hover:text-orange-600 rounded-md py-2 transition ease-in-out duration-150"
                onClick={handleLinkClick}
              >
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;