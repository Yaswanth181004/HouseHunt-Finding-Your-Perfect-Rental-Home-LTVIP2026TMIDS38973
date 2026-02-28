import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AllBookings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ FETCH BOOKINGS (OWNER)
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/owner", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  // ✅ UPDATE BOOKING STATUS (APPROVE / REJECT)
  const updateStatus = async (bookingId, status) => {
    try {
      await API.put(
        `/bookings/${bookingId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert(`Booking ${status}`);
      fetchBookings(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to update booking");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "30px", color: "#fff" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>All Bookings</h2>
        <div>
          <span style={{ marginRight: "15px" }}>Hi, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* Back Button */}
      <button
        style={{ marginTop: "15px" }}
        onClick={() => navigate("/owner")}
      >
        Back to Dashboard
      </button>

      {/* Booking Cards */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {bookings.length === 0 && <p>No bookings found.</p>}

        {bookings.map((item) => (
          <div
            key={item._id}
            style={{
              width: "320px",
              background: "#0e1a2b",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <p><b>Property:</b> {item.propertyId?.address}</p>
            <p><b>Renter:</b> {item.renterId?.name}</p>
            <p><b>Status:</b> {item.status}</p>

            {/* ✅ ACTION BUTTONS */}
            {item.status === "pending" && (
              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                  style={{
                    background: "green",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => updateStatus(item._id, "approved")}
                >
                  Approve
                </button>

                <button
                  style={{
                    background: "red",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => updateStatus(item._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;