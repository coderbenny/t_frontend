"use client";
import { useState, useEffect } from "react";

const SellTicket = () => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "John", email: "john@mail.com" },
    { id: 2, name: "Sam", email: "sam@mail.com" },
    { id: 3, name: "Jane", email: "jane@mail.com" },
  ]);
  const [events, setEvents] = useState([
    { id: 1, name: "Rahafest" },
    { id: 2, name: "Msa Event" },
  ]);

  // Fetch users and events from the API on component mount
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await fetch("/api/users");
  //       const data = await res.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   const fetchEvents = async () => {
  //     try {
  //       const res = await fetch("/api/events");
  //       const data = await res.json();
  //       setEvents(data);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchUsers();
  //   fetchEvents();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, eventId }),
    });

    if (res.ok) {
      alert("Ticket sold successfully!");
      // Reset the form
      setUserId("");
      setEventId("");
    } else {
      alert("Failed to sell ticket");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Sell Ticket
        </h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select User</span>
          </label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Event</span>
          </label>
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select an event
            </option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Discount Code (Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Sell Ticket
        </button>
      </form>
    </div>
  );
};

export default SellTicket;
