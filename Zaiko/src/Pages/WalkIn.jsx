import React, { useEffect, useState } from "react";

function WalkIn() {
  const [products, setProducts] = useState([]); // Stores all products
  const [walkInProducts, setWalkInProducts] = useState([]); // Stores only "Walk-In" products

  // Fetch products on mount
  useEffect(() => {
    fetch("http://localhost:8000")
      .then((res) => res.json()) 
      .then((data) => {
        setProducts(data.products || []); // Store all products
      })
      .catch(() => alert("No products have been grabbed"));
  }, []); 

// EVERYTHING ABOVE IS THE SET UP, IT GRABS THE PRODUCTS 
  // Filter products with location "Walk-In"


  useEffect(() => {
    const filtered = products.filter(
      (product) => product.location?.toLowerCase().trim() === "walk-in"
    );
    setWalkInProducts(filtered);
  }, [products]); // Runs when products change

  return (
    <ul>
      {walkInProducts.length > 0 ? (
        walkInProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.location} (Qty: {product.quantity})
          </li>
        ))
      ) : (
        <p>No Walk-In products found.</p>
      )}
    </ul>
  );
}

export default WalkIn;
