import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";

function ProductPage() {
    const { location } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for editing
    const [locations, setLocations] = useState([]); // Track available locations
    const [showConfirmation, setShowConfirmation] = useState(false); // Track overlay visibility

    useEffect(() => {
        fetch("https://developerdove.com/Zaiko/ZaikoApp/")
            .then((res) => res.json())
            .then((data) => {
                const filteredProducts = data.products.filter(
                    (product) => product.location === location
                );
                setProducts(filteredProducts);

                // Assuming you get a list of locations from the data
                const uniqueLocations = [...new Set(data.products.map(product => product.location))];
                setLocations(uniqueLocations); // Set available locations
            })
            .catch(() => alert("Loading Products...."));
    }, [location]);

    const decodedLocation = decodeURIComponent(location);

    // Function to handle quantity increment
    const incrementQuantity = (index) => {
        setProducts((prevProducts) =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, quantity: product.quantity + 1 } : product
            )
        );
    };

    // Decrementing the quantity
    const decrementQuantity = (index) => {
        setProducts((prevProducts) =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, quantity: product.quantity - 1 } : product
            )
        );
    };

    // Handle click on a product to open the editor
    const handleEditClick = (product) => {
        setSelectedProduct({ ...product }); // Set the selected product for editing
    };

    // Handle Cancel: Close the editor without saving
    const handleCancel = () => {
        setSelectedProduct(null); // Close the editor
    };

    // Handle Save: Update the product and close the editor
    const handleSave = async () => {
        const updatedProduct = selectedProduct;
        try {
            const response = await fetch("https://developerdove.com/Zaiko/ZaikoApp/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
    
            // Log the status and body of the response
            console.log("Response Status:", response.status);
            const responseBody = await response.json();
            console.log("Response Body:", responseBody);
    
            if (!response.ok) {
                throw new Error(`Failed to update product: ${responseBody.error || "Unknown error"}`);
            }
    
            // Update local state after success
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
            setSelectedProduct(null);
        } catch (error) {
            console.error(error);
            alert("Failed to save product");
        }
    };

    //  Handle delete confirmation overlay
    const handleDeleteClick = () => {
        setShowConfirmation(true); // Show the confirmation overlay
    };

    const handleDeleteCancel = () => {
        setShowConfirmation(false); // Hide the confirmation overlay
    };

    const handleDeleteConfirm = async () => {
        const productId = selectedProduct.id;
    
        // ⚡ Remove from frontend first
        setProducts(prevProducts =>
            prevProducts.filter(product => product.id !== productId)
        );
        setSelectedProduct(null);
        setShowConfirmation(false);
    
        try {
            const response = await fetch(`https://developerdove.com/Zaiko/ZaikoApp/products/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            console.log("Delete Response Status:", response.status);
    
            const contentType = response.headers.get("Content-Type");
            let responseBody = null;
            if (contentType && contentType.includes("application/json")) {
                responseBody = await response.json();
            } else {
                const text = await response.text();
                console.error("Expected JSON but got:", text);
                throw new Error("Response is not JSON");
            }
    
            if (!response.ok) {
                throw new Error(`Failed to delete product: ${responseBody.error || "Unknown error"}`);
            }
    
        } catch (error) {
            console.error(error);
            alert("Product removed from view, but failed to delete from server.");
        }
    };
    

    return (
        <div className="productList">
            <div className="ProductHeader">
                <div className="HeaderTop">
                    <div>
                        <Link to="/Home">&lt; {decodedLocation}</Link>
                    </div>
                    <img src="/edit icon.svg" alt="" />
                </div>
                <form action="">
                    <input type="text" placeholder="Search..." />
                </form>
            </div>

            <ul>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div
                            className="productCard"
                            key={product.id}
                            onClick={() => handleEditClick(product)} // Set product for editing
                        >
                            <h3>{product.name}</h3>
                            <form className="EditQTY" action="">
                                <button
                                    id="QTYBTN"
                                    type="button"
                                    onClick={() => incrementQuantity(index)}
                                >
                                    +
                                </button>
                                <input
                                    id="QTYField"
                                    type="number"
                                    value={product.quantity}
                                    onChange={() => {}}
                                />
                                <button
                                    id="QTYBTN"
                                    type="button"
                                    onClick={() => decrementQuantity(index)}
                                >
                                    -
                                </button>
                            </form>
                        </div>
                    ))
                ) : (
                    <p>Loading Products....</p>
                )}
            </ul>

            {/* Show Product Editor only when a product is selected */}
            {selectedProduct && (
                <div className="ProductEditor">
                    <div id="SettingsRow">
                        <p>Item Settings</p>
                        <h4 id="DeleteProduct" onClick={handleDeleteClick}>
                            Delete Item
                        </h4>
                    </div>
                    <form>
                        <hr />
                        <label htmlFor="">
                            <h3>Item Name</h3>
                            <input
                                type="text"
                                value={selectedProduct.name}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <hr />
                        </label>
                        <label htmlFor="">
                            <h3>House Location</h3>
                            <input
                                type="text"
                                value={selectedProduct.HouseLocation}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        HouseLocation: e.target.value,
                                    })
                                }
                            />
                            <hr />
                        </label>
                        <label htmlFor="">
                            <h3>Location</h3>
                            <select
                                value={selectedProduct.location}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        location: e.target.value,
                                    })
                                }
                            >
                                {locations.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                            <hr />
                        </label>
                        <label htmlFor="">
                            <h3>Item Count</h3>
                            <input
                                type="number"
                                value={selectedProduct.quantity}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        quantity: parseInt(e.target.value),
                                    })
                                }
                            />
                        </label>
                        <hr />
                    </form>
                    <div className="CancelBTN">
                        <button type="button" onClick={handleCancel}>
                            <h1>Cancel</h1>
                        </button>
                    </div>

                    <div className="SaveBTN">
                        <button type="button" onClick={handleSave}>
                            <h1>Save</h1>
                        </button>
                    </div>
                </div>
            )}

            {showConfirmation && (
                <div className="ConformationOverlay">
                    <p>
                        Are you sure you would like to delete this item? This
                        action cannot be undone.
                    </p>
                    <div className="CancelBTN">
                        <button type="button" onClick={handleDeleteCancel}>
                            <h1>Cancel</h1>
                        </button>
                    </div>

                    <div className="DeleteBTN">
                        <button type="button" onClick={handleDeleteConfirm}>
                            <h1>Delete</h1>
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default ProductPage;
