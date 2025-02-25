import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductCard from './Productcard.jsx'
import LogIn from './Pages/LogIn.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogIn />
   {/*<ProductCard />*/}
  </StrictMode>,
)
