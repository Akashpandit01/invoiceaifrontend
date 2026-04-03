import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// const API = "http://127.0.0.1:8000";

  const API = "https://invoiceaibackend.onrender.com";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      alert("Login Successful ✅");
      nav("/dashboard");
    } else {
      alert(data.error || "Login Failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background:
          "radial-gradient(circle at 20% 30%, #1e3a8a, transparent 40%), radial-gradient(circle at 80% 70%, #9333ea, transparent 40%), linear-gradient(135deg, #020617, #0f172a, #020617)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(16px)",
          padding: "30px",
          borderRadius: "16px",
          width: "350px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Welcome Back 👋</h2>

        <div style={{ marginBottom: "15px" }}>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <div style={{ marginTop: "15px", fontSize: "14px" }}>
          <p>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#3b82f6" }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}