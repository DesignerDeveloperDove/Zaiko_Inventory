import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from './Pages/Home';
import LogIn from "./Pages/LogIn";
import './App.css'

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
  )
}

export default App
