// pages/index.js
import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col animated-bg">
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-700 bg-clip-text text-transparent mb-4">
          Welcome to TicketPal Dashboard
        </h1>

        <p className="text-lg md:text-xl text-gray-500 mb-6 max-w-md">
          Manage users, create events, and sell tickets with ease.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/login"
            className="bg-indigo-500 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:bg-indigo-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50 active:scale-95"
          >
            Login
          </Link>
          {/* <Link
            href="/signup"
            className="bg-orange-400 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:bg-orange-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 active:scale-95"
          >
            Get Started
          </Link> */}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
