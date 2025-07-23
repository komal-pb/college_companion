import React from "react";
import "../App.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© {year} College Companion</p>
      </div>
    </footer>
  );
}
