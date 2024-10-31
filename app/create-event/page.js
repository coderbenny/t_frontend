"use client";
import { useState } from "react";
// import Layout from "../components/Layout";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventName, eventDate }),
    });

    if (res.ok) {
      alert("Event created successfully!");
    } else {
      alert("Failed to create event");
    }
  };

  return (
    <div className="">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
