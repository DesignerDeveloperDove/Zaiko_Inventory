import React, { useState, useEffect } from "react";

const Data_URL = "http://localhost:8000"; // Ensure this matches your PHP server URL



function DataInfo() {
    const [Product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(Data_URL); // No `/Products`
                console.log(response);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("Fetched Data:", data); // Debugging
                setProduct(data.products); // Access "products" array
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <>
            <p>TEST</p>
            <ul>
                {Product.map((product) => (
                    <li key={product.id}>
                    <strong>{product.name}</strong> - {product.location} (Qty: {product.quantity})
                    </li>
                ))}
            </ul>
        </>
    );
}

export default DataInfo;
