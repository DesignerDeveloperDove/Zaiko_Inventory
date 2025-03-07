import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { data, Link } from "react-router-dom";
import { lazy } from "react";
import DataInfo from "./Data";
function Los() {
    const [products, setProducts] = useState([]); // State for all products
    const [walkInProducts, setWalkInProducts] = useState([]); // State for filtered "Walk-In" products
    const [locationList, setLocationList] = useState([]); // This stores a list of unique locations
    const LocationNames = []; // Stores locations dynamically
    

    // fetch products from backend
    useEffect(() => {
        fetch("http://localhost:8001") // this will be replaced with the backend URL on launch date 
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
    return (
        <>
            
            <div className="LocationTabs">

                <h1 className="Header">Locations</h1>
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

            <Footer />
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

                    
                {/*<h2> <Link to="/Home">&lt;Walk-In Freezer Products   </Link></h2>*/}
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
            //</div>** */}