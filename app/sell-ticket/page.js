"use client";
import { useState } from "react";
// import Layout from "../components/Layout";

const SellTicket = () => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");

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
    } else {
      alert("Failed to sell ticket");
    }
  };

  return (
    <div className="">
      <h1>Sell Ticket</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
        />
        <button type="submit">Sell Ticket</button>
      </form>
    </div>
  );
};

export default SellTicket;
