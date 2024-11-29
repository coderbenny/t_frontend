"use client";

import React, { useState, useEffect } from "react";
import withAuth from "@/components/WithAuth";

const UsersWithTickets = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users with tickets
  const fetchUsersWithTickets = async () => {
    try {
      const response = await fetch("/ticko/users_with_tickets");
      if (!response.ok) throw new Error("Failed to fetch users with tickets.");
      const data = await response.json();
      setUsers(data);
    } catch {
      setUsers([]); // Fallback to empty users list on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersWithTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 mt-16 text-center text-orange-600">
        Clients
      </h1>

      {/* Users Table */}
      <section className="w-full max-w-5xl">
        <div className="overflow-x-auto">
          <table className="table w-full bg-white text-black shadow-lg rounded-lg">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-4 font-bold">User Name</th>
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">Phone</th>
                <th className="p-4 font-bold">Event</th>
                <th className="p-4 font-bold">Ticket Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-500 py-6 font-medium"
                  >
                    No tickets found.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  // If user has no tickets
                  if (user.tickets.length === 0) {
                    return (
                      <tr key={user.user_id}>
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.phone}</td>
                        <td
                          colSpan={2}
                          className="p-4 text-center text-gray-500"
                        >
                          No tickets purchased yet.
                        </td>
                      </tr>
                    );
                  }
                  // Map tickets if user has any
                  return user.tickets.map((ticket) => (
                    <tr key={ticket.ticket_id} className="hover:bg-gray-100">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.phone}</td>
                      <td className="p-4">{ticket.event_title}</td>
                      <td className="p-4">
                        <span
                          className={`badge ${
                            ticket.used ? "badge-success" : "badge-warning"
                          }`}
                        >
                          {ticket.used ? "Used" : "Unused"}
                        </span>
                      </td>
                    </tr>
                  ));
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default withAuth(UsersWithTickets);
