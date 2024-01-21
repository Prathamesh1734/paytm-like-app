import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h2>Welcome to the paytm clone!</h2>
      <p>Please choose an option:</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/signup">
          <button style={{ marginRight: "10px" }}>Sign Up</button>
        </Link>
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
