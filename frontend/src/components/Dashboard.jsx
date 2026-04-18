import React from "react";

const Dashboard = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>Welcome to SportShield AI</p>

      <div style={{ marginTop: "20px" }}>
        <button style={styles.button}>Go to Upload</button>
        <button style={styles.button}>View Feed</button>
      </div>
    </div>
  );
};

const styles = {
  button: {
    margin: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#4a90e2",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Dashboard;