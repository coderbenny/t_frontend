"use client";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-base-100 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href="/">TicketPal</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <button className="btn btn-ghost">Home</button>
          </Link>
          <Link href="/add-user">
            <button className="btn btn-ghost">Add User</button>
          </Link>
          <Link href="/create-event">
            <button className="btn btn-ghost">Create Event</button>
          </Link>
          <Link href="/sell-ticket">
            <button className="btn btn-ghost">Sell Ticket</button>
          </Link>
          <Link href="/check-in">
            <button className="btn btn-ghost">Check In Ticket</button>
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
        <div className="md:hidden bg-base-200 p-4">
          <Link href="/">
            <button className="btn btn-ghost block w-full text-left">
              Home
            </button>
          </Link>
          <Link href="/add-user">
            <button className="btn btn-ghost block w-full text-left">
              Add User
            </button>
          </Link>
          <Link href="/create-event">
            <button className="btn btn-ghost block w-full text-left">
              Create Event
            </button>
          </Link>
          <Link href="/sell-ticket">
            <button className="btn btn-ghost block w-full text-left">
              Sell Ticket
            </button>
          </Link>
          <Link href="/check-in">
            <button className="btn btn-ghost block w-full text-left">
              Check In Ticket
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
