import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);

      navigate("/");
    } catch {
      alert("Credenziali non valide");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">

        <h1 className="login-title">Task Manager</h1>
        <p className="login-subtitle">Accedi al tuo spazio</p>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Accedi
        </button>

        <p className="login-register">
          Non hai un account?
          <Link to="/register" className="register-link">
            Registrati ora
          </Link>
        </p>

      </div>
    </div>
  );
}
