import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchOwnerProperties();
  }, []);

  const fetchOwnerProperties = async () => {
    try {
      const res = await API.get("/owner/properties");
      setProperties(res.data);
    } catch (error) {
      console.error("Failed to load properties");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "30px", color: "#fff" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Owner Dashboard</h2>

        <div>
          <span style={{ marginRight: "15px" }}>Hi, {user?.name}</span>
          {/* <button onClick={logout}>Logout</button> */}
          <button
              onClick={logout}
              style={{
                backgroundColor: "#ef4444", // red
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        {/* <button onClick={() => navigate("/add-property")}>Add Property</button> */}
        <button
            onClick={() => navigate("/add-property")}
            style={{
              backgroundColor: "#22c55e", // green
              color: "white",
              padding: "10px 18px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Add Property
          </button>
        {/* <button onClick={() => navigate("/owner-bookings")}>All Bookings</button> */}
        <button
          onClick={() => navigate("/owner/bookings")}
          style={{
            padding: "10px 16px",
            background: "#6366f1",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
          }}
        >
          All Bookings
        </button>
      </div>

      {/* Properties */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>
        {properties.map((item) => (
          <div
            key={item._id}
            style={{
              width: "300px",
              background: "#0e1a2b",
              padding: "15px",
              borderRadius: "10px"
            }}
          >
            {item.images?.length > 0 && (
              <img
                src={`http://localhost:5000/uploads/${item.images[0]}`}
                alt="property"
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />
            )}

            <p><b>Address:</b> {item.address}</p>
            <p><b>Type:</b> {item.propertyType}</p>
            <p><b>Ad Type:</b> {item.adType}</p>
            <p><b>Price:</b> ₹ {item.amount}</p>
            <p><b>Contact:</b> {item.ownerContact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboard;