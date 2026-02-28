import { useEffect, useState } from "react";
import axios from "axios";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings/owner",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      fetchBookings();
    } catch {
      alert("Failed to update booking");
    }
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2>Booking Requests</h2>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map((b) => (
        <div
          key={b._id}
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <p><b>Property:</b> {b.propertyId?.address}</p>
          <p><b>Renter:</b> {b.renterId?.name}</p>
          <p><b>Status:</b> {b.status}</p>

          {b.status === "pending" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => updateStatus(b._id, "approved")}
                style={{
                  background: "#22c55e",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(b._id, "rejected")}
                style={{
                  background: "#ef4444",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OwnerBookings;