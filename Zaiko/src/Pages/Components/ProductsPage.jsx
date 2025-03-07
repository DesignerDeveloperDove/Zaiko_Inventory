import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function ProductPage() {
    const { location } = useParams();  // Get the location from the URL params
    const [products, setProducts] = useState([]);  // State to store the products

    useEffect(() => {
        // Fetch the products from the API
        fetch("http://localhost:8001")
            .then((res) => res.json())
            .then((data) => {
                // Filter the products based on the location
                const filteredProducts = data.products.filter(
                    (product) => product.location === location
                );
                setProducts(filteredProducts);  // Update the state with the filtered products
            })
            .catch(() => alert("No products found for this location"));  // Handle fetch errors
    }, [location]);  // Run the effect whenever `location` changes

    const decodedLocation = decodeURIComponent(location);  // this basically says if there are any special characters in the name just ignore them

    return (
        <div className="product-list">
            <h2><Link to="/Home">&lt;{decodedLocation}</Link></h2>
            <ul>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div className="product-card " key={product.id}>
                            <h3>{product.name}</h3>
                            <p><strong>Quantity:</strong>{product.quantity} 
                            {/**<strong>Location:</strong>{product.location}*/}</p>
                            
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
