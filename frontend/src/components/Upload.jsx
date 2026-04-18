import React, { useState } from "react";

const Upload = () => {
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setImg1(file);
    if (file) setPreview1(URL.createObjectURL(file));
  };

  const handleImage2 = (e) => {
    const file = e.target.files[0];
    setImg2(file);
    if (file) setPreview2(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!img1 || !img2) {
      alert("Upload both images");
      return;
    }

    setLoading(true);

    // 🔥 TEMP MOCK (remove when backend ready)
    setTimeout(() => {
      setResult({
        similarity: 0.78,
        status: "safe",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>SportShield AI</h2>
        <p style={styles.subtitle}>Compare images and detect violations</p>

        <div style={styles.uploadContainer}>
          <div style={styles.uploadBox}>
            <input type="file" accept="image/*" onChange={handleImage1} />
            {preview1 && <img src={preview1} alt="" style={styles.image} />}
          </div>

          <div style={styles.uploadBox}>
            <input type="file" accept="image/*" onChange={handleImage2} />
            {preview2 && <img src={preview2} alt="" style={styles.image} />}
          </div>
        </div>

        <button style={styles.button} onClick={handleUpload}>
          {loading ? "Scanning..." : "Scan Images"}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h3>Result</h3>
            <p>
              Similarity:{" "}
              <strong>{(result.similarity * 100).toFixed(2)}%</strong>
            </p>
            <p
              style={{
                color: result.status === "violation" ? "#e74c3c" : "#2ecc71",
                fontWeight: "bold",
              }}
            >
              Status: {result.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px",
  },
  uploadContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  uploadBox: {
    border: "2px dashed #ccc",
    padding: "10px",
    borderRadius: "10px",
    width: "45%",
  },
  image: {
    width: "100%",
    marginTop: "10px",
    borderRadius: "8px",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
    background: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  resultBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "10px",
  },
};

export default Upload;