"use client";
import { useState } from "react";
// import Layout from "../components/Layout";

const CheckIn = () => {
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/tickets/check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketId }),
    });

    if (res.ok) {
      alert("Ticket checked in successfully!");
    } else {
      const error = await res.json();
      alert(error.message);
    }
  };

  return (
    <div className="">
      <h1>Check In Ticket</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          required
        />
        <button type="submit">Check In</button>
      </form>
    </div>
  );
};

export default CheckIn;
