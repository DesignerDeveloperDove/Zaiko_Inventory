import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import LogIn from "./Pages/LogIn";
import WalkIn from "./Pages/WalkIn";
import './App.css'

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Walk-in" element={<WalkIn />} />
    </Routes>
  </Router>
  )
}

export default App
