import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";

function ProductPage() {
    const { location } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered products
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
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
                setFilteredProducts(filteredProducts); // Set initial filtered products

                const uniqueLocations = [...new Set(data.products.map(product => product.location))];
                setLocations(uniqueLocations); // Set available locations
            })
            .catch(() => alert("Loading Products...."));
    }, [location]);

    // Update the filtered products based on the search query
    const handleSearch = (e) => {
        setSearchQuery(e.target.value); // Update search query
        const lowercasedQuery = e.target.value.toLowerCase();
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(lowercasedQuery) // Filter by product name
        );
        setFilteredProducts(filtered); // Update filtered products
    };

    // Function to handle quantity increment
    const incrementQuantity = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity += 1;
        setProducts(updatedProducts);
        handleSave(updatedProducts[index]); // Save updated product after increment
    };

    // Decrementing the quantity
    const decrementQuantity = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity -= 1;
        setProducts(updatedProducts);
        handleSave(updatedProducts[index]); // Save updated product after decrement
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
    const handleSave = async (updatedProduct) => {
        try {
            const response = await fetch("https://developerdove.com/Zaiko/ZaikoApp/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
        } catch (error) {
            console.error(error);
            alert("Failed to save product");
        }
    };

    // Handle delete confirmation overlay
    const handleDeleteClick = () => {
        setShowConfirmation(true); // Show the confirmation overlay
    };

    const handleDeleteCancel = () => {
        setShowConfirmation(false); // Hide the confirmation overlay
    };

    const handleDeleteConfirm = async () => {
        const productId = selectedProduct.id;

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

            if (!response.ok) {
                throw new Error("Failed to delete product");
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
                    <Link to='/Home'><img src="/Zaiko/assets/arrow icon.svg" alt="" /></Link>
                    <div className="LocHeader">
                        <Link to="/Home">{decodeURIComponent(location)}</Link>
                    </div>
                    <img src="/Zaiko/assets/edit icon.svg" alt="" />
                </div>
                <form action="" className="SearchBar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery} // Controlled input
                        onChange={handleSearch} // Handle search as user types
                    />
                </form>
            </div>

            <ul>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <div className="productCard" key={product.id}>
                            <h3 onClick={() => handleEditClick(product)}>{product.name}</h3>
                            <form className="EditQTY" action="">
                                <button
                                    id="QTYBTN"
                                    type="button"
                                    onClick={() => incrementQuantity(index)}
                                >+</button>
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
                                >-</button>
                            </form>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </ul>

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
                        <button type="button" onClick={() => handleSave(selectedProduct)}>
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
