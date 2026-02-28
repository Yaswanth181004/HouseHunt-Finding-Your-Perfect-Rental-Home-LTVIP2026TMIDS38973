import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(15,23,42,0.95)",
        color: "#fff",
      }}
    >
      <h2 style={{ color: "#6366f1", cursor: "pointer" }} onClick={() => navigate("/")}>
        RentEase
      </h2>

      {user && (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span>Hi, {user.name}</span>
          <button
            onClick={logout}
            style={{
              background: "#ef4444",
              border: "none",
              padding: "6px 14px",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;