import React from "react";
import Navbar from "../components/Navbar";
import AuthChoice from "../components/AuthChoice";
import Footer from "../components/Footer";
import "../App.css";

export default function LandingPage() {
  return (
    <div className="landing-layout">
      <Navbar />
      <main className="landing-main">
        <AuthChoice />
      </main>
      <Footer />
    </div>
  );
}
