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

  const flags = [
    { src: "src/assets/USAFlag.png", alt: "USAFlag", lang: "ENG" },
    { src: "src/assets/SpainFlag.svg", alt: "SpainFlag", lang: "ES" },
    { src: "src/assets/VietnamFlag.png", alt: "VietnamFlag", lang: "VN" },
    { src: "src/assets/ThailandFlag.png", alt: "ThailandFlag", lang: "TH" },
  ];
   
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
        <button id="LogInBtn"><h2>Log In</h2></button>
        <div id="Circles">
          <div>
            <img className="Flag" src="src/assets/USAFlag.png" alt="USAFlag"></img>
            <p>ENG</p>
          </div>
          <div>
            <img className="Flag" src="src/assets/SpainFlag.svg" alt="SpainFlag"></img>
            <p>ES</p>
          </div>
          <div>
            <img className="Flag" src="src/assets/VietnamFlag.png" alt="VietnamFlag"></img>
            <p>VN</p>
          </div>
          <div>
            <img className="Flag" src="src/assets/ThailandFlag.png" alt="ThailandFlag"></img>
            <p>TH</p>
          </div>
        </div>
        <h2>Languages</h2>
      </form>
    </div>
  );
}

export default LogIn;
