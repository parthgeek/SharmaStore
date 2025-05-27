import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Replace with your real Supabase project details
const supabase = createClient("https://cxekmkjocbmjfuwiufus.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZWtta2pvY2JtamZ1d2l1ZnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5ODU1NjcsImV4cCI6MjA2MzU2MTU2N30.iqduB_14ZSgtSSesb2X4WjKoyhLCKAQAcRzda4G5-T0");

const AdminUpload = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      if (!Array.isArray(json)) {
        setError("JSON must be an array.");
        return;
      }

      setProducts(json);
      setMessage(`Loaded ${json.length} products.`);
      setError("");
    } catch {
      setError("Invalid JSON format.");
    }
  };

  const uploadProducts = async () => {
    const { error } = await supabase.from("products").insert(products);
    if (error) {
      setError("Upload failed: " + error.message);
      setMessage("");
    } else {
      setMessage(`Uploaded ${products.length} products.`);
      setError("");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h2>📦 Upload Products</h2>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <br /><br />
      <button
        onClick={uploadProducts}
        disabled={products.length === 0}
        style={{
          padding: "0.5rem 1rem",
          background: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Upload to Supabase
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminUpload;
