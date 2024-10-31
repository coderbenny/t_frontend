// pages/index.js
import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center bg-base-200 p-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
          Welcome to TicketPal Dashboard
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-6">
          Manage users, create events, and sell tickets.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          {/* <button className="btn btn-primary">Get Started</button> */}
          <Link
            href="/login"
            className="bg-indigo-500 p-2 px-4 ronded-md text-white font-bold"
          >
            Login
          </Link>
        </div>
      </main>
      <footer className="bg-base-100 text-center p-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TicketPal. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
