import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: res.data.token,
          name: res.data.user.name,
          id: res.data.user._id,
          role: res.data.user.role,
        })
      );

      if (res.data.user.type === "owner") {
        navigate("/owner");
      } else {
        navigate("/renter");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Sign In</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Create an Account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;