"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const TicketPurchasePage = () => {
  const router = useRouter();
  const { id: eventId } = useParams();

  const [eventDetails, setEventDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${eventId}`
        );

        if (!res.ok) throw new Error("Failed to fetch event details.");

        const data = await res.json();
        setEventDetails(data);
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sell`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, eventId }),
        }
      );

      if (!response.ok) throw new Error("Failed to complete purchase.");

      setPurchaseSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to complete purchase.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !eventDetails) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <div className="alert alert-error shadow-lg w-full md:w-1/2">
          {error}
        </div>
      </div>
    );
  }

  if (purchaseSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="card bg-gray-800 shadow-xl w-full md:w-1/2 p-6 text-center rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Purchase Successful!</h2>
          <p>
            Your ticket for <strong>{eventDetails?.title}</strong> has been
            successfully purchased. Check your email for confirmation.
          </p>
          <Link href="/" className="btn btn-primary mt-6 text-white font-bold">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const isEventClosed = eventDetails?.closed;
  const eventCapacity = eventDetails?.capacity;

  return (
    <div className="min-h-screen py-20 bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        {/* Back to Events Link */}
        <div className="mb-6">
          <Link href="/" className="btn btn-outline border-orange-400">
            &larr; Back to Events
          </Link>
        </div>

        {eventDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <img
              src={eventDetails.image}
              alt={eventDetails.title}
              className="w-full rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-4xl font-bold capitalize mb-4">
                {eventDetails.title}
              </h1>
              <p className="text-gray-300 mb-4">{eventDetails.description}</p>
              <p className="text-gray-400">
                <strong>Date:</strong>{" "}
                {new Date(eventDetails.event_date).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
              <p className="text-gray-400">
                <strong>Price:</strong> Ksh.{eventDetails.price.toFixed(2)}
              </p>
              <p className="text-gray-400">
                <strong>Capacity:</strong>{" "}
                {eventCapacity === 0 ? "Unlimited" : eventCapacity}
              </p>
              <p
                className={`text-lg font-bold ${
                  isEventClosed ? "text-red-500" : "text-green-500"
                }`}
              >
                {isEventClosed ? "This event is closed." : "Open for booking!"}
              </p>
            </div>
          </div>
        )}

        {!isEventClosed && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Purchase Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control w-full">
                <label htmlFor="name" className="label">
                  <span className="label-text text-white">Name</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label htmlFor="email" className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label htmlFor="phone" className="label">
                  <span className="label-text text-white">Phone</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-gray-700 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className={`btn bg-orange-600 hover:bg-orange-500 text-white w-full ${
                  loading ? "loading" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Complete Purchase"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketPurchasePage;
