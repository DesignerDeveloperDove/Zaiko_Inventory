import React from "react";

function WalkIn({ Product }) {
  const walkInProducts = Product.filter(
    (product) => product.location?.toLowerCase().trim() === "walk-in"
  );

  return (
    <>
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
    </>
  );
}

export default WalkIn;
