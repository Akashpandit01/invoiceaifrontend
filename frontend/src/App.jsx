import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [analytics, setAnalytics] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const API = "https://invoiceaibackend.onrender.com";

  const fetchInvoices = async () => {
    const res = await fetch(`${API}/invoices`);
    const json = await res.json();
    setData(json);
  };

  const fetchAnalytics = async () => {
    const res = await fetch(`${API}/analytics`);
    const json = await res.json();
    setAnalytics(json);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch(`${API}/upload`, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setLoading(false);

    if (result.error) {
      alert("Error: " + result.error);
    } else {
      alert("Uploaded successfully ✅");
      fetchInvoices();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/invoice/${id}`, { method: "DELETE" });
    fetchInvoices();
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <h1 className="title">📊 Invoice Dashboard</h1>

      {/* Analytics Button */}
      <button
        className="button"
        onClick={() => {
          setShowAnalytics(!showAnalytics);
          if (!showAnalytics) fetchAnalytics();
        }}
      >
        {showAnalytics ? "Hide Analytics" : "Show Analytics"}
      </button>

      {/* Analytics */}
      {showAnalytics && (
        <div className="card">
          <h3>📊 Analytics Dashboard</h3>

          {analytics ? (
            <>
              <p><strong>Total Invoices:</strong> {analytics.total_invoices}</p>
              <p><strong>Total Spend:</strong> ₹ {analytics.total_spend}</p>

              <div className="vendorList">
                {Object.entries(analytics.vendor_summary).map(([vendor, amount]) => (
                  <div key={vendor} className="vendorItem">
                    <span>{vendor}</span>
                    <span>₹ {amount}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}

      {/* Upload */}
      <div className="card">
        <h3>Upload Invoice</h3>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={handleUpload} className="button">
          {loading ? "Uploading..." : "Upload"}
        </button>

        {file && <p className="filename">📄 {file.name}</p>}
      </div>

      {/* Table */}
      <div className="card">
        <h3>📋 Invoice History</h3>

        <table className="table">
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
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.filename}</td>
                <td>{item.vendor}</td>
                <td>{item.invoice_date}</td>
                <td>{item.total_amount}</td>
                <td>{item.currency}</td>

                <td className="actionCell">
                  {item.file_url && (
                    <img
                      src={item.file_url}
                      alt="invoice"
                      className="thumbnail"
                      onClick={() => window.open(item.file_url, "_blank")}
                    />
                  )}

                  <div className="fileNameSmall">{item.filename}</div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="deleteBtn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🌙 Dark Mode Toggle (BOTTOM RIGHT) */}
      <button
        className="darkToggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default App;