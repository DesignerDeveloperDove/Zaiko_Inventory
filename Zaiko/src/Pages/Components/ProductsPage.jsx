import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductPage() {
    const { location } = useParams();  // Get the location from the URL params
    const [products, setProducts] = useState([]);  // State to store the products

    useEffect(() => {
        // Fetch the products from the API
        fetch("http://developerdove.com/ZaikoApp/")
            .then((res) => res.json())
            .then((data) => {
                const filteredProducts = data.products.filter(
                    (product) => product.location === location
                );
                setProducts(filteredProducts);  // Update the state with the filtered products
            })
            .catch(() => alert("No products found for this location"));  // Handle fetch errors
    }, [location]);  // Run the effect whenever `location` changes

    const decodedLocation = decodeURIComponent(location);  // this basically says if there are any special characters in the name just ignore them

    return (
        <div className="productList">
            <div className="ProductHeader">
                <h2><Link to="/Home">&lt;   {decodedLocation}</Link></h2>

                <form action="">
                    <input type="text" placeholder="Search..." />
                </form>
            </div>
           
            <ul>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div className="productCard " key={product.id}>
                            <h3>{product.name}</h3>
                           {/**  <p><strong>Quantity:</strong>{product.quantity} 
                            <strong>Location:</strong>{product.location}</p>*/}
                            <form className="EditQTY" action="">
                                <button id="QTYBTN" type="button" >+</button>
                                <input id="QTYField" type="number" placeholder={product.quantity} />
                                <button id="QTYBTN" type="button">-</button>
                            </form>
                            
                        </div>
                        
                    ))
                ) : (
                    <p>No products available for this location.</p>  
                )}
            </ul>
        </div>
    );
}

export default ProductPage;
