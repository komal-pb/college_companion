// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Navbar({
  userType,          // "teacher" | "student" | undefined
  userName,          // optional name to show in the right side
  showLogout = false // show logout button?
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear anything you stored at login
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("token"); // only if you store one
    navigate("/"); // back to landing
  };

  return (
    <header className="site-navbar">
      <div className="nav-inner">
        <div
          className="brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <span className="logo-box">C</span>
          <span className="brand-text">College Companion</span>
        </div>

        {showLogout && (
          <div className="nav-right">
            {userName && (
              <span className="nav-username">
                {userName}
                {userType ? ` (${userType})` : ""}
              </span>
            )}
            <button className="nav-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
