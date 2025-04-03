import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import LogIn from "./Pages/LogIn";
import ProductPage from "./Pages/Components/ProductsPage";
import OrderHistory from "./Pages/OrderHistory";
import './App.css'
import ProfilePage from "./Pages/ProfilePage";


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/location/:location" element={<ProductPage />} />
      <Route path="/OrderHistory.jsx" element={<OrderHistory />} />
      <Route path="/ProfilePage.jsx" element={<ProfilePage />} />


      </Routes>
  </Router>
  )
}

export default App
