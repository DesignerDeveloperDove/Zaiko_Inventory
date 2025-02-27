import React, { useState } from "react";
import { useNavigate } from "react-router";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      navigate("/home"); // Redirect to home page
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        <img id="ZaikoLogoImg" src= 'src/assets/ZaikoLogo - Copy.jpg' alt="ZaikoLogo" width="50%" height="auto"/>
        <form id="LogInForm" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
        <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        <br />
        <button id="LogInBtn"><h2>Submit</h2></button>
        <div id="Circles">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </div>
        <h2>Languages</h2>
      </form>
    </div>
  );
}

export default LogIn;
