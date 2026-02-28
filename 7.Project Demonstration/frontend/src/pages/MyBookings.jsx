import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings/renter",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2 style={{ marginBottom: "20px" }}>My Bookings</h2>

      {bookings.length === 0 && <p>No bookings found</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {bookings.map((item) => (
          <div
            key={item._id}
            style={{
              background: "#0f172a",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <p><b>Address:</b> {item.propertyId?.address}</p>
            <p><b>Type:</b> {item.propertyId?.propertyType}</p>
            <p><b>Ad Type:</b> {item.propertyId?.adType}</p>
            <p><b>Price:</b> ₹ {item.propertyId?.amount}</p>

            {/* <p
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                color:
                  item.status === "approved"
                    ? "green"
                    : item.status === "rejected"
                    ? "red"
                    : "orange",
              }}
            >
              Status: {item.status.toUpperCase()}
            </p> */}
            <p
            style={{
                fontWeight: "bold",
                color:
                item.status === "approved"
                    ? "green"
                    : item.status === "rejected"
                    ? "red"
                    : "orange",
            }}
            >
            Status: {item.status.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;