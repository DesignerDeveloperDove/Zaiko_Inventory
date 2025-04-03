import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";
import { data, Link } from "react-router-dom";
import { lazy } from "react";
import DataInfo from "./Data";
function Los({options, onSelect}) {
    const [products, setProducts] = useState([]); // State for all products
    const [walkInProducts, setWalkInProducts] = useState([]); // State for filtered "Walk-In" products
    const [locationList, setLocationList] = useState([]); // This stores a list of unique locations
    const LocationNames = []; // Stores locations dynamically
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    

    // fetch products from backend
    useEffect(() => {
        fetch("http://developerdove.com/ZaikoApp/") // this will be replaced with the backend URL on launch date 
          .then((res) => res.json())
          .then((data) => {
            setProducts(data.products || []); // store all products
          })
          .catch(() => alert("No products have been grabbed"));
    }, []);
    const productCounts = products.reduce((acc, product) => {
        acc[product.location] = (acc[product.location] || 0) + 1;
        return acc;
    }, {});
    const Tabcolors = ["#D0DDF5", "#F3B5B5", "#CAE2C3", "#FCE7CA", "#F7D9FF"];
    // create an array of unique locations based on the `location` property in each product
    useEffect(() => {
        const locations = products
            .map((product) => product.location) // extract all locations from products
            .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
        setLocationList(locations); // update locationList state
    }, [products]);

console.log(products);

const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
   
    return (
        <>
            <div className="LocationNav">
                <div>
                    <div className="dropdown" ref={dropdownRef}>
                    <button onClick={toggleDropdown}>
                        <img className="FilterIcon" src="../src/assets/filter button icon.svg" alt=""/>
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                        {options?.map((option) => (
                            <li key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
                </div>
                <h1 className="Header">Locations</h1>
                <div className="ArrowIcon">
                    <img src="../src/assets/arrow icon.svg" alt=""/>
                </div>
            </div>
            <div className="LocationTabs">
                <ul>
                {locationList.length > 0 ? (
                    locationList.map((location, index) => (
                        <div key={index} className="LocationSquares" 
                        style={{ backgroundColor: Tabcolors[index % Tabcolors.length] }}
                        >
                            <Link to={`/location/${encodeURIComponent(location)}`}>
                                <button>
                                <strong>{location}</strong>  
                                </button>
                            </Link>
                            <div className="NumOfItems">
                            <p>{productCounts[location] }  items</p> 
                            </div>
                        </div>
                    ))
                    ) : (
                    <p>No locations found.</p>
                    )}
                </ul>
            </div>


        </>
    );
}

export default Los;
/** 
 * ok bro so this is how this is gonna have to work the walk in page is gonna have to be 1 page , in that page it needs to have
 * a variablized :
 *  List of products
 *  title
 *  all based on whichever location has been pressed
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

                    
                /*<h2> <Link to="/Home">&lt;Walk-In Freezer Products   </Link></h2>*/
               // <div className="Location-list">
               // {walkInProducts.length > 0 ? (
                 //   walkInProducts.map((product) => {
                   //     const myObj = {
                     //       name: product.name,
                       //     QTY: product.quantity,
                         //   Location: product.location
                        //};
                        
                       // return ; 
                   /// })
               // ) : (
                 //   <p>No products found in Walk-In.</p>
               // )}
            //</div>** */