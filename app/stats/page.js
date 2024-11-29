"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const HomePage = () => {
  // State to track whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // State to hold the stats data
  const [stats, setStats] = useState(null);

  // Fetch stats when the component mounts
  useEffect(() => {
    setIsLoggedIn(true); // Set the state based on token existence

    // If the user is logged in, fetch the stats from the backend
    if (isLoggedIn) {
      fetch("/ticko/stats")
        .then((response) => response.json())
        .then((data) => {
          setStats(data); // Store the stats in the state
        })
        .catch((error) => console.error("Error fetching stats:", error));
    }
  }, []);

  return (
    <div className="min-h-[100vh] flex flex-col animated-bg mb-10">
      <main className="flex-grow flex flex-col items-center py-28 justify-center p-6 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-700 bg-clip-text text-transparent mb-4">
          TicketPal Stats
        </h1>

        <p className="text-lg md:text-xl text-gray-500 mb-6 max-w-md">
          {isLoggedIn
            ? "View ticket system stats below."
            : "Manage users, create events, and sell tickets with ease."}
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-7xl">
          {isLoggedIn ? (
            stats ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                <div className="card bg-white shadow-xl p-6 rounded-lg border border-gray-200">
                  <div className="card-body">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                      Total Users
                    </h2>
                    <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                      {stats.total_users}
                    </p>
                  </div>
                </div>

                <div className="card bg-white shadow-xl p-6 rounded-lg border border-gray-200">
                  <div className="card-body">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                      Tickets Sold
                    </h2>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                      {stats.total_sold_tickets}
                    </p>
                  </div>
                </div>

                <div className="card bg-white shadow-xl p-6 rounded-lg border border-gray-200">
                  <div className="card-body">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                      Tickets Available
                    </h2>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">
                      {stats.total_available_tickets}
                    </p>
                  </div>
                </div>

                <div className="card bg-white shadow-xl p-6 rounded-lg border border-gray-200">
                  <div className="card-body">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                      Total Revenue
                    </h2>
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                      ${stats.total_revenue.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="card bg-white shadow-xl p-6 rounded-lg border border-gray-200">
                  <div className="card-body">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                      Total Events
                    </h2>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                      {stats.total_events}
                    </p>
                  </div>
                </div>

                <div className="card bg-white shadow-xl p-6 rounded-lg border border-gray-200">
                  <div className="card-body">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                      Open Events
                    </h2>
                    <p className="text-2xl sm:text-3xl font-bold text-teal-600">
                      {stats.open_events}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="loading">Loading stats...</div>
            )
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
