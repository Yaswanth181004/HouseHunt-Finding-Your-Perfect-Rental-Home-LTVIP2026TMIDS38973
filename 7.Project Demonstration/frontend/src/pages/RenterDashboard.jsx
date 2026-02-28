import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RenterDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [bookedProperties, setBookedProperties] = useState([]);
  const [imageIndex, setImageIndex] = useState({});
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/owner/properties"
      );
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to load properties", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const nextImage = (id, length) => {
    setImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] + 1 < length ? prev[id] + 1 : 0,
    }));
  };

  const prevImage = (id, length) => {
    setImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] - 1 >= 0 ? prev[id] - 1 : length - 1,
    }));
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2>All Properties</h2>

        {/* <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <h3>Hi, {user?.name}</h3>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ef4444",
              border: "none",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div> */}

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
  <h3>Hi, {user?.name}</h3>

  <button
    onClick={() => navigate("/my-bookings")}
    style={{
      padding: "8px 16px",
      backgroundColor: "#2563eb",
      border: "none",
      borderRadius: "6px",
      color: "white",
      cursor: "pointer",
    }}
  >
    My Bookings
  </button>

  <button
    onClick={handleLogout}
    style={{
      padding: "8px 16px",
      backgroundColor: "#ef4444",
      border: "none",
      borderRadius: "6px",
      color: "white",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>
      </div>

      {/* PROPERTY GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {properties.map((item) => {
          const index = imageIndex[item._id] || 0;

          return (
            <div
              key={item._id}
              style={{
                background: "#0f172a",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              }}
            >
              {/* IMAGE CAROUSEL */}
              {item.images && item.images.length > 0 && (
                <div style={{ position: "relative" }}>
                  <img
                    src={`http://localhost:5000/uploads/${item.images[index]}`}
                    alt="Property"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />

                  {item.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          prevImage(item._id, item.images.length)
                        }
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "5px",
                          transform: "translateY(-50%)",
                          background: "#000000aa",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      >
                        ◀
                      </button>

                      <button
                        onClick={() =>
                          nextImage(item._id, item.images.length)
                        }
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "5px",
                          transform: "translateY(-50%)",
                          background: "#000000aa",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      >
                        ▶
                      </button>
                    </>
                  )}
                </div>
              )}

              <p><b>Address:</b> {item.address}</p>
              <p><b>Type:</b> {item.propertyType}</p>
              <p><b>Ad Type:</b> {item.adType}</p>

              {/* PRICE FIX */}
              <p>
                <b>Price:</b> ₹ {item.amount ? item.amount : "N/A"}
              </p>

              <p><b>Owner:</b> {item.ownerContact}</p>

              {/* BOOK BUTTON */}
              {/* <button
                onClick={async () => {
                  try {
                    const user = JSON.parse(localStorage.getItem("user"));

                    await axios.post(
                      "http://localhost:5000/api/bookings/create",
                      { propertyId: item._id },
                      {
                        headers: {
                          Authorization: `Bearer ${user.token}`,
                        },
                      }
                    );

                    alert("Booking request sent");
                  } catch {
                    alert("Booking failed");
                  }
                }}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                background: "#22c55e",
                border: "none",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              >
              Book Now
              </button> */}
              <button
                disabled={bookedProperties.includes(item._id)}
                onClick={async () => {
                  try {
                    const user = JSON.parse(localStorage.getItem("user"));

                    await axios.post(
                      "http://localhost:5000/api/bookings/create",
                      { propertyId: item._id },
                      {
                        headers: {
                          Authorization: `Bearer ${user.token}`,
                        },
                      }
                    );

                    setBookedProperties((prev) => [...prev, item._id]);
                    alert("Booking request sent");
                  } catch {
                    alert("Booking failed");
                  }
                }}
                style={{
                  backgroundColor: bookedProperties.includes(item._id)
                    ? "#6b7280"
                    : "#22c55e",
                  cursor: bookedProperties.includes(item._id)
                    ? "not-allowed"
                    : "pointer",
                  padding: "10px",
                  borderRadius: "6px",
                  color: "white",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                {bookedProperties.includes(item._id) ? "Requested" : "Book Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RenterDashboard;