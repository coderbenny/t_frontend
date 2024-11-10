"use client";

import { useState } from "react";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      eventName,
      eventDate,
      description,
      capacity,
      price,
      image_link: imageLink,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (res.ok) {
        alert("Event created successfully!");
        // Clear input fields after successful submission
        setEventName("");
        setEventDate("");
        setDescription("");
        setCapacity("");
        setPrice("");
        setImageLink("");
      } else {
        const errorData = await res.json();
        alert(
          `Failed to create event: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-orange-50 via-orange-100 to-white items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mt-20 bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-orange-600">
          Create Event
        </h1>

        {/* Event Name */}
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

        {/* Event Date */}
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

        {/* Description */}
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

        {/* Capacity */}
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

        {/* Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            placeholder="Enter event price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
          />
        </div>

        {/* Image Link */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image Link</span>
          </label>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            required
            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-orange-300"
          />
        </div>

        {/* Submit Button */}
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
