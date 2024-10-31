"use client";
import { useState } from "react";

const CheckIn = () => {
  const [ticketId, setTicketId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/tickets/check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketId }),
    });

    setIsLoading(false);

    if (res.ok) {
      alert("Ticket checked in successfully!");
      setTicketId(""); // Clear the input after success
    } else {
      const error = await res.json();
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <div className="form-control">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            Check In Ticket
          </h1>
          <label className="label">
            <span className="label-text">Enter Ticket ID</span>
          </label>
          <input
            type="text"
            placeholder="Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Checking In..." : "Check In"}
        </button>
      </form>
    </div>
  );
};

export default CheckIn;
