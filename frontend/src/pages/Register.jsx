import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// const API = "http://127.0.0.1:8000";

  const API = "https://invoiceaibackend.onrender.com";
  

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleRegister = async () => {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.message) {
      alert("Registered ✅");
      nav("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 30%, #1e3a8a, transparent 40%), radial-gradient(circle at 80% 70%, #9333ea, transparent 40%), linear-gradient(135deg, #020617, #0f172a, #020617)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
          padding: "30px 25px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Create Account ✨</h2>

        <div style={{ marginBottom: "15px" }}>
          <input
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              outline: "none",
            }}
          />
        </div>

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Register
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#3b82f6" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}