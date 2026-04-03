import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  // const API = "http://127.0.0.1:8000";
  
  const API = "https://invoiceaibackend.onrender.com";
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [analytics, setAnalytics] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [preview, setPreview] = useState(null);

 const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const token = localStorage.getItem("token");

  // ================= RESPONSIVE =================
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ================= AUTH =================
  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/");
  };

  // ================= FETCH =================
  const fetchInvoices = async () => {
    const res = await fetch(`${API}/invoices`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    setData(Array.isArray(json) ? json : []);
  };

  const fetchAnalytics = async () => {
    const res = await fetch(`${API}/analytics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    setAnalytics(json);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (!file) return toast.error("Select file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch(`${API}/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const result = await res.json();

    if (result.error) toast.error(result.error);
    else {
      toast.success("Uploaded 🚀");
      fetchInvoices();
    }

    setLoading(false);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    await fetch(`${API}/invoice/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Deleted");
    fetchInvoices();
  };

  // ================= THEME =================
  const bg = darkMode
    ? "linear-gradient(135deg, #020617, #0f172a, #020617)"
    : "linear-gradient(135deg, #f1f5f9, #e2e8f0)";

  const textColor = darkMode ? "white" : "#0f172a";

  const cardStyle = {
    background: darkMode
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.05)",
    backdropFilter: "blur(12px)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  };

  return (
    <div
      style={{
        display: isMobile ? "block" : "flex",
        minHeight: "100vh",
        background: bg,
        color: textColor,
        fontFamily: "Poppins, sans-serif",
        transition: "0.3s",
      }}
    >
      <Toaster />

      {/* SIDEBAR / TOPBAR */}
      <div
        style={{
          width: isMobile ? "100%" : "220px",
          padding: "15px",
          background: cardStyle.background,
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2>📊 Invoice AI</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/")}>🏠</button>
          <button onClick={logout}>🚪</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Invoice Dashboard
        </h1>

        {/* SEARCH + BUTTON */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search vendor..."
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
            }}
          />

          <button
            onClick={() => {
              setShowAnalytics(!showAnalytics);
              if (!showAnalytics) fetchAnalytics();
            }}
            style={{
              padding: "12px",
              borderRadius: "10px",
              background: "#22c55e",
              color: "white",
              border: "none",
            }}
          >
            {showAnalytics ? "Hide Analytics" : "Show Analytics"}
          </button>
        </div>

        {/* ANALYTICS */}
        {showAnalytics && analytics && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <div style={cardStyle}>
              <h4>Total Invoices</h4>
              <p>{analytics.total_invoices}</p>
            </div>

            <div style={cardStyle}>
              <h4>Total Spend</h4>
              <p>₹ {analytics.total_spend}</p>
            </div>
          </div>
        )}

        {/* UPLOAD */}
        <div
          style={{
            ...cardStyle,
            maxWidth: "500px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h3>Upload Invoice</h3>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={handleUpload}
            style={{
              marginTop: "10px",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              background: "#3b82f6",
              color: "white",
              border: "none",
            }}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* TABLE */}
        <div style={{ marginTop: "30px", overflowX: "auto" }}>
          <h3 style={{ textAlign: "center" }}>📋 Invoice History</h3>

          <table style={{ width: "100%", minWidth: "700px" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>File</th>
                <th>Vendor</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data
                .filter((i) =>
                  i.vendor?.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.filename}</td>
                    <td>{item.vendor}</td>
                    <td>{item.invoice_date}</td>
                    <td>₹ {item.total_amount}</td>
                    <td>{item.currency}</td>
                    <td>
                      <img
                        src={item.file_url}
                        style={{ width: "40px", cursor: "pointer" }}
                        onClick={() => setPreview(item.file_url)}
                      />
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          marginLeft: "10px",
                          background: "red",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={preview} style={{ maxWidth: "90%" }} />
        </div>
      )}

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

export default Dashboard;