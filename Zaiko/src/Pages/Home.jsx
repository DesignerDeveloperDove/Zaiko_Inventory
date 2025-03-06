import React, { useEffect, useState } from "react"; // Import useState and useEffect
import Footer from "./Components/Footer";
import DataInfo from "./Components/Data";
import { Link } from "react-router-dom";  

function Home() {
    // Define state for products and filtered products
    const [products, setProducts] = useState([]); // State for all products
    const [walkInProducts, setWalkInProducts] = useState([]); // State for filtered "Walk-In" products
    const [locationList, setLocationList] = useState([]); // This stores a list of unique locations
    
    // Fetch products from backend
    useEffect(() => {
        fetch("http://localhost:8001") // this will be replaced with the backend URL on launch date 
          .then((res) => res.json())
          .then((data) => {
            setProducts(data.products || []); // Store all products
          })
          .catch(() => alert("No products have been grabbed"));
    }, []);

    // Filter products with location "Walk-In"
    useEffect(() => {
        const filtered = products.filter(
            (product) => product.location?.toLowerCase().trim() === "walk-in"
        );
        setWalkInProducts(filtered);
    }, [products]); // Runs when products change

    // Create an array of unique locations based on the `location` property in each product
    useEffect(() => {
        const locations = products
            .map((product) => product.location) // Extract all locations from products
            .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
        setLocationList(locations); // Update locationList state
    }, [products]);

    return (
        <>
            <div className="LocationTabs">
                <h2> <Link to="/Home">&lt;Walk-In Freezer Products   </Link></h2>
                <div className="Location-list">
                    {walkInProducts.length > 0 ? (
                        walkInProducts.map((product) => {
                            const myObj = {
                                name: product.name,
                                QTY: product.quantity,
                                Location: product.location
                            };

                           
                        })
                    ) : (
                        <p>No products found in Walk-In.</p>
                    )}
                </div>

                <h3>Location List</h3>
                <ul>
                    {locationList.length > 0 ? (
                        locationList.map((location, index) => {
                            const ListOfLocations = {
                                index: index,
                                Locat: location
                            };

                            return (
                                <div key={index} className="LocationSquares">
                                    <p>
                                        <strong>{ListOfLocations.Locat}</strong> 
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <p>No locations found.</p>
                    )}
                </ul>
            </div>

            <Footer />
        </>
    );
}

export default Home;
