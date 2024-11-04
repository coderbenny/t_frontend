"use client";
import React, { useState } from "react";

const Dashboard = () => {
  // Sample events data
  const events = [
    {
      id: 1,
      name: "Concert",
      date: "2024-11-15",
      location: "Nairobi University",
    },
    {
      id: 2,
      name: "Tech Conference",
      date: "2024-12-01",
      location: "KCA University",
    },
  ];

  // Sample booked tickets data with "used" status
  const [bookedTickets, setBookedTickets] = useState([
    {
      id: 101,
      eventName: "Concert",
      holderName: "Alice",
      date: "2024-11-15",
      used: false,
    },
    {
      id: 102,
      eventName: "Tech Conference",
      holderName: "Bob",
      date: "2024-12-01",
      used: true,
    },
  ]);

  // Handler to mark ticket as used
  const markAsUsed = (ticketId) => {
    setBookedTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, used: true } : ticket
      )
    );
  };

  // Placeholder for viewing ticket details
  const viewTicketDetails = (ticket) => {
    alert(`Viewing details for ticket ID: ${ticket.id}`);
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 mt-16 text-center text-orange-600">
        Dashboard
      </h1>

      <section className="mb-10 w-full">
        <h2 className="text-3xl font-semibold mb-4 text-orange-600 text-center">
          Available Events
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white text-black shadow-lg rounded-lg">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-4">Event Name</th>
                <th className="p-4">Date</th>
                <th className="p-4">Location</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-100">
                  <td className="p-4 font-semibold">{event.name}</td>
                  <td className="p-4">{event.date}</td>
                  <td className="p-4">{event.location}</td>
                  <td className="p-4">
                    <button
                      className="btn btn-primary hover:bg-orange-400"
                      onClick={() => alert(`Registering for ${event.name}`)}
                    >
                      Close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4 text-orange-600 text-center">
          Booked Tickets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="card-body p-6 flex flex-col justify-between h-full">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  {ticket.eventName}
                </h3>
                <p className="text-gray-600 text-center">
                  Holder: {ticket.holderName}
                </p>
                <p className="text-gray-600 text-center">Date: {ticket.date}</p>
                <div className="flex justify-center items-center mt-4">
                  <span
                    className={`badge ${
                      ticket.used ? "badge-success text-white" : "badge-warning"
                    } mr-2 h-full`}
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
      </section>
    </div>
  );
};

export default Dashboard;
