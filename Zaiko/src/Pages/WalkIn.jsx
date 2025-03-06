import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
function WalkIn() {
  const [products, setProducts] = useState([]); // Stores all products
  const [walkInProducts, setWalkInProducts] = useState([]); // Stores only "Walk-In" products

  // Fetch products on mount
  useEffect(() => {
    fetch("http://localhost:8001")
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

  return (
    <>
      <div className="WalkInInfo">
        <h2 > <Link to="/Home">&lt;Walk-In Freezer Products   </Link></h2>
        <div className="product-list">
          {walkInProducts.length > 0 ? (
            walkInProducts.map((product) => {
              const myObj = {
                name: product.name,
                QTY: product.quantity,
                Location: product.location
              };
              return (
                <div key={product.id} className="product-card">
                  <h3>{myObj.name}</h3>
                  <p><strong>Quantity:</strong> {myObj.QTY}
                  <strong>Location:</strong> {myObj.Location}</p>
                </div>
              );
            })
          ) : (
            <p>No products found in Walk-In.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default WalkIn;
