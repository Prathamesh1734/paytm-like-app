import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const submitChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        formData
      );
      console.log("Signup success: ", response.data);
    } catch (error) {
      console.error("signup fail: ", error.message);
    }

    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const styles = {
    card: {
      width: "300px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      margin: "auto",
      marginTop: "50px",
    },
    input: {
      width: "100%",
      padding: "8px",
      margin: "8px 0",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.card}>
      <h2>Signup Page</h2>
      <p>Enter your information to create an account</p>
      <form onSubmit={submitData}>
        <h4>
          First Name
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={submitChange}
            required
            style={styles.input}
          />
        </h4>

        <h4>
          Last Name
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={submitChange}
            required
            style={styles.input}
          />
        </h4>

        <h4>
          Email
          <input
            type="email"
            name="username"
            value={formData.username}
            onChange={submitChange}
            required
            style={styles.input}
          />
        </h4>

        <h4>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={submitChange}
            required
            style={styles.input}
          />
        </h4>

        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
