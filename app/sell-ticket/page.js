"use client";
import { useState, useEffect } from "react";

const SellTicket = () => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  // Fetch users and events from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5555/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5555/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchUsers();
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload =
      userId === "new"
        ? { ...newUser, eventId, discountCode }
        : { userId, eventId, discountCode };

    const res = await fetch("http://127.0.0.1:5555/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Ticket sold successfully!");
      resetForm();
    } else {
      alert("Failed to sell ticket");
    }
  };

  const resetForm = () => {
    setUserId("");
    setEventId("");
    setDiscountCode("");
    setNewUser({ name: "", email: "", phone: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-orange-600">
          Sell Ticket
        </h1>

        {/* Select User */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select User</span>
          </label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="select select-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.phone}>
                {user.name} - {user.email}
              </option>
            ))}
            <option value="new">Add New User</option>
          </select>
        </div>

        {/* New User Fields */}
        {userId === "new" && (
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, phone: e.target.value }))
                }
                required
                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
          </div>
        )}

        {/* Select Event */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Event</span>
          </label>
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            className="select select-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
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

        {/* Discount Code */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Discount Code (Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full bg-orange-600 hover:bg-orange-500 transition duration-200 text-white"
        >
          Sell Ticket
        </button>
      </form>
    </div>
  );
};

export default SellTicket;
