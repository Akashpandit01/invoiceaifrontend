import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFileInvoiceDollar, FaChartLine, FaRobot } from "react-icons/fa";

export default function Landing() {
  // ✅ Theme state (default light)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  }, [darkMode]);

  // ✅ Dynamic styles
  const bg = darkMode
    ? "radial-gradient(circle at 20% 30%, #1e3a8a, transparent 40%), radial-gradient(circle at 80% 70%, #9333ea, transparent 40%), linear-gradient(135deg, #020617, #0f172a, #020617)"
    : "linear-gradient(135deg, #f1f5f9, #e2e8f0)";

  const textColor = darkMode ? "white" : "#0f172a";

  const cardStyle = {
    background: darkMode
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.05)",
    backdropFilter: "blur(12px)",
    padding: "25px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        color: textColor,
        padding: "20px",
        transition: "0.3s",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* HERO */}
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaFileInvoiceDollar color="#3b82f6" />
          Invoice AI
        </h1>

        <p style={{ marginTop: "15px", fontSize: "18px" }}>
          Smart Invoice Processing with AI 🚀
        </p>

        {/* BUTTONS */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/login">
            <button style={btnPrimary}>Login</button>
          </Link>

          <Link to="/register">
            <button style={btnOutline}>Get Started</button>
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div
        style={{
          marginTop: "80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          maxWidth: "1000px",
          marginInline: "auto",
        }}
      >
        <div style={cardStyle}>
          <FaRobot size={30} color="#3b82f6" />
          <h3>AI Extraction</h3>
          <p>Automatically extract invoice data using OCR + AI</p>
        </div>

        <div style={cardStyle}>
          <FaChartLine size={30} color="#22c55e" />
          <h3>Analytics</h3>
          <p>Track spending, vendors, and trends easily</p>
        </div>

        <div style={cardStyle}>
          <FaFileInvoiceDollar size={30} color="#f59e0b" />
          <h3>Automation</h3>
          <p>Reduce manual work and errors</p>
        </div>
      </div>

      {/* THEME TOGGLE */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px",
          borderRadius: "50%",
          border: "none",
          background: "#3b82f6",
          color: "white",
          cursor: "pointer",
        }}
      >
        {darkMode ? "🌞" : "🌙"}
      </button>
    </div>
  );
}

// ===== BUTTON STYLES =====
const btnPrimary = {
  padding: "12px 24px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const btnOutline = {
  padding: "12px 24px",
  borderRadius: "10px",
  border: "1px solid #3b82f6",
  background: "transparent",
  color: "#3b82f6",
  fontWeight: "600",
  cursor: "pointer",
};