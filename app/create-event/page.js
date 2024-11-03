"use client";
import { useState } from "react";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventName, eventDate, description, capacity }),
    });

    if (res.ok) {
      alert("Event created successfully!");
      // Clear input fields after submission
      setEventName("");
      setEventDate("");
      setDescription("");
      setCapacity("");
    } else {
      alert("Failed to create event");
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-orange-50 via-orange-100 to-white items-center justify-center min-h-screen p-4 bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mt-20 bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-orange-600">
          Create Event
        </h1>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Event Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Event Date</span>
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="Enter event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea textarea-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
            rows="4"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Capacity</span>
          </label>
          <input
            type="number"
            placeholder="Enter event capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full bg-orange-600 hover:bg-orange-500 transition duration-200 text-white"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
