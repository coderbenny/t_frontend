"use client";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    // Close the menu when a link is clicked
    setIsOpen(false);
  };

  return (
    <header className="bg-base-100 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-700">
          <Link href="/">TicketPal</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <button className="btn btn-ghost" onClick={handleLinkClick}>
              Home
            </button>
          </Link>
          <Link href="/add-user">
            <button className="btn btn-ghost" onClick={handleLinkClick}>
              Add User
            </button>
          </Link>
          <Link href="/create-event">
            <button className="btn btn-ghost" onClick={handleLinkClick}>
              Create Event
            </button>
          </Link>
          <Link href="/sell-ticket">
            <button className="btn btn-ghost" onClick={handleLinkClick}>
              Sell Ticket
            </button>
          </Link>
          <Link href="/check-in">
            <button className="btn btn-ghost" onClick={handleLinkClick}>
              Check In Ticket
            </button>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="btn btn-ghost">
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
        <div className="absolute top-16 left-0 w-full bg-base-200 p-4 md:hidden z-50">
          <Link href="/">
            <button
              className="btn btn-ghost block w-full text-left"
              onClick={handleLinkClick}
            >
              Home
            </button>
          </Link>
          <Link href="/add-user">
            <button
              className="btn btn-ghost block w-full text-left"
              onClick={handleLinkClick}
            >
              Add User
            </button>
          </Link>
          <Link href="/create-event">
            <button
              className="btn btn-ghost block w-full text-left"
              onClick={handleLinkClick}
            >
              Create Event
            </button>
          </Link>
          <Link href="/sell-ticket">
            <button
              className="btn btn-ghost block w-full text-left"
              onClick={handleLinkClick}
            >
              Sell Ticket
            </button>
          </Link>
          <Link href="/check-in">
            <button
              className="btn btn-ghost block w-full text-left"
              onClick={handleLinkClick}
            >
              Check In Ticket
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
