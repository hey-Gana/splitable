import React, { useState } from "react";
import styles from "./BillUpload.module.css";

function BillUpload({ onScanComplete }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  // Upload image to backend and fetch scanned items
  async function handleFileUpload() {
    if (!file) {
      alert("Please select a bill image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    // MUST match backend @RequestPart("file")
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/scan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const scannedItems = await response.json();

      console.log("Scan result:", scannedItems);

      // Send scanned items to App.jsx
      onScanComplete(scannedItems);

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to scan bill");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h3>Upload Bill</h3>

      <div className={styles.form}>
        <input
          type="file"
          accept="image/*"
          className={styles.input}
          onChange={handleFileChange}
        />

        <button
          className={styles.button}
          onClick={handleFileUpload}
          disabled={loading}
        >
          {loading ? "Scanning..." : "Scan Bill"}
        </button>
      </div>
    </div>
  );
}

export default BillUpload;
