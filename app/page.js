"use client";
import { useState, useEffect } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from the backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterEvents(e.target.value, filter);
  };

  // Handle filter functionality
  const handleFilter = (filterOption) => {
    setFilter(filterOption);
    filterEvents(searchTerm, filterOption);
  };

  // Filter events based on search term and filter
  const filterEvents = (search, filterOption) => {
    let filtered = events;

    if (filterOption === "open") {
      filtered = events.filter((event) => !event.closed);
    } else if (filterOption === "closed") {
      filtered = events.filter((event) => event.closed);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col animated-bg">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-700 py-6 shadow-md text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Explore Our Events
        </h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="form-control w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search for events..."
              value={searchTerm}
              onChange={handleSearch}
              className="input input-bordered focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="btn-group">
            <button
              className={`btn ${filter === "all" ? "btn-active" : ""}`}
              onClick={() => handleFilter("all")}
            >
              All
            </button>
            <button
              className={`btn ${filter === "open" ? "btn-active" : ""}`}
              onClick={() => handleFilter("open")}
            >
              Open
            </button>
            <button
              className={`btn ${filter === "closed" ? "btn-active" : ""}`}
              onClick={() => handleFilter("closed")}
            >
              Closed
            </button>
          </div>
        </div>

        {/* Content */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="loading loading-spinner loading-lg text-orange-500"></div>
          </div>
        )}

        {error && (
          <div className="alert alert-error shadow-lg">
            <div>
              <span>Error: {error}</span>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="card bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <figure>
                    <img
                      src={event.image || "/placeholder.png"}
                      alt={event.title}
                      className="rounded-t-lg w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg md:text-xl font-semibold text-gray-800">
                      {event.title}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base line-clamp-3">
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
                      <p>
                        <span className="font-bold">Capacity:</span>{" "}
                        {event.capacity}
                      </p>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button
                        className={`btn ${
                          event.closed
                            ? "btn-disabled bg-gray-400 text-gray-200"
                            : "btn-primary"
                        }`}
                        disabled={event.closed}
                      >
                        {event.closed ? "Closed" : "Buy"}
                      </button>
                    </div>
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
