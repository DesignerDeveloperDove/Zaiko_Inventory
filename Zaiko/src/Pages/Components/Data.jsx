import React, { useState, useEffect } from "react";
//import axios from "axios";

// this is where we are fetching the data from 
const Data_URL = "http://localhost:8000"; 

function DataInfo() {
    const [Product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${Data_URL}/Products`);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const NewProduct = await response.json();
                setProduct(NewProduct);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProduct();
    }, []); // Empty dependency array ensures this only runs on mount

    return (
        <>
            <p>TEST</p>
            <ul>
                {Product.map((Products) => (
                    <li key={Products.ProdId}>{Products.ProdName}</li>
                ))}
            </ul>
        </>
    );
}
export default DataInfo