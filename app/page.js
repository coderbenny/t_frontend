"use client";

import { useState, useEffect } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/events`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch events: ${res.statusText}`);
        }
        const data = await res.json();
        const openEvents = data.filter((event) => !event.closed);
        setEvents(openEvents);
        setFilteredEvents(openEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Debounced search functionality
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }, 300); // Debounce delay reduced for better UX

    return () => clearTimeout(timeoutId);
  }, [searchTerm, events]);

  return (
    <div className="min-h-[100vh] w-full flex flex-col py-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-500 py-8 text-center shadow-md">
        <h1 className="text-4xl font-bold text-white">Events</h1>
        <p className="text-white mt-2">
          Discover and get tickets for amazing events happening near you.
        </p>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-6 py-8 bg-gray-900">
        {/* Search Bar */}
        <div className="form-control w-full md:w-1/2 lg:w-1/3 mb-6 mx-auto">
          <input
            type="text"
            placeholder="Search for events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full text-white bg-gray-800"
          />
        </div>

        {/* Loading and Error Handling */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="loading loading-spinner loading-lg text-indigo-500"></div>
          </div>
        ) : (
          /* Display Events */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="card bg-gray-800 text-white shadow-lg rounded-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300"
                >
                  <figure>
                    <img
                      src={event.image || "/placeholder.png"}
                      alt={event.title}
                      className="rounded-t-lg w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg md:text-xl font-semibold text-white">
                      {event.title}
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base line-clamp-3">
                      {event.description}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>
                        <span className="font-bold">Date:</span>{" "}
                        {new Date(event.event_date).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-bold">Price:</span> $
                        {event.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      className="w-full mt-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => alert(`Buying ticket for ${event.title}`)}
                    >
                      Buy Ticket
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No events found.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default EventsPage;
