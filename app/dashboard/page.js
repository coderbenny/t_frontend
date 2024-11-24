"use client";

import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyTickets, setEmptyTickets] = useState(false); // State for empty tickets

  const fetchData = async (endpoint, setData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`
      );
      if (res.status === 404) {
        setData([]);
        return;
      }
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(`Error fetching ${endpoint}: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchData("tickets", setBookedTickets),
        fetchData("events", setEvents),
      ]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  async function handleCloseEvent(eventId) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === eventId ? { ...event, closed: true } : event
          )
        );
      }
    } catch (error) {
      alert("An error occurred while closing the event.");
    } finally {
      setLoading(false);
    }
  }

  const markAsUsed = (ticketId) => {
    setBookedTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, used: true } : ticket
      )
    );
  };

  const viewTicketDetails = (ticket) => {
    alert(`Viewing details for ticket ID: ${ticket.id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 mt-16 text-center text-orange-600">
        Dashboard
      </h1>

      {/* Available Events */}
      <section className="mb-10 w-full">
        <h2 className="text-3xl font-semibold mb-4 text-orange-600 text-center">
          All Events
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white text-black shadow-lg rounded-lg">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-4 font-bold">Event Name</th>
                <th className="p-4 font-bold">Price (KES)</th>
                <th className="p-4 font-bold">Capacity</th>
                <th className="p-4 font-bold">Actions</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-500 py-6 font-medium"
                  >
                    No events found.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr
                    key={event.id}
                    className={`hover:bg-gray-100 ${
                      event.capacity === 0 || event.closed ? "bg-red-100" : ""
                    }`}
                  >
                    <td className="p-4 font-semibold">{event.title}</td>
                    <td className="p-4">{event.price}</td>
                    <td
                      className={`p-4 ${
                        event.capacity === 0 ? "text-red-600 font-bold" : ""
                      }`}
                    >
                      {event.capacity === 0 ? "Sold Out" : event.capacity}
                    </td>
                    <td className="p-4">
                      <button
                        disabled={event.capacity === 0 || event.closed}
                        onClick={() => handleCloseEvent(event.id)}
                        className={`btn ${
                          event.capacity === 0 || event.closed
                            ? "btn-disabled"
                            : "btn-primary hover:bg-orange-400"
                        }`}
                      >
                        Close
                      </button>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold">
                        {event.closed ? "Closed" : "Active"}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Booked Tickets */}
      <section>
        <h2 className="text-3xl font-semibold mb-4 text-orange-600 text-center">
          Recent Tickets
        </h2>
        {bookedTickets.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">No tickets available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookedTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="card-body p-6 flex flex-col justify-between h-full">
                  <h3 className="text-xl font-semibold text-gray-800 text-center">
                    {ticket.event.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    Holder: {ticket.user.name}
                  </p>
                  <p className="text-gray-600 text-center">
                    Contact: {ticket.user.phone}
                  </p>
                  <div className="flex justify-center items-center mt-4">
                    <span
                      className={`badge ${
                        ticket.used
                          ? "badge-success text-white"
                          : "badge-warning"
                      } mr-2`}
                    >
                      {ticket.used ? "Used" : "Unused"}
                    </span>
                    <div className="flex gap-2">
                      {!ticket.used && (
                        <button
                          onClick={() => markAsUsed(ticket.id)}
                          className="btn btn-sm btn-primary hover:bg-orange-400"
                        >
                          Mark as Used
                        </button>
                      )}
                      <button
                        onClick={() => viewTicketDetails(ticket)}
                        className="btn btn-sm btn-secondary hover:bg-orange-400"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
