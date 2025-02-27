import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router,Route,Routes, BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ProductCard from './Productcard.jsx'
import LogIn from './Pages/LogIn.jsx'
import Home from './Pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<LogIn />*/}
    <Home />
   {/*<ProductCard />*/}
  </StrictMode>,
)
