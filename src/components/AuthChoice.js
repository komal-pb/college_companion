import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AuthChoiceCard() {
  const navigate = useNavigate();
  return (
    <div className="auth-card">
      <h1 className="welcome-title">Welcome to <span>College Companion</span></h1>
      <p className="welcome-sub">Manage attendance & track student progress efficiently.</p>

      <div className="auth-buttons">
        <button className="btn primary" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn outline" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}
