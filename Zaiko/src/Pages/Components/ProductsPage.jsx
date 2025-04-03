import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function ProductPage() {
    const { location } = useParams();  
    const [products, setProducts] = useState([]);  

    useEffect(() => {
        fetch("http://developerdove.com/ZaikoApp/")
            .then((res) => res.json())
            .then((data) => {
                const filteredProducts = data.products.filter(
                    (product) => product.location === location
                );
                setProducts(filteredProducts);
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
    
   
}
 //decrementing the quantity 
    const DecrementQuantity = (index) => {
        setProducts((prevProducts) => 
            prevProducts.map((product, i) =>
                i === index ? { ...product, quantity: product.quantity - 1 } : product
            )
        );
    };
    return (
        <div className="productList">
            <div className="ProductHeader">
                <div className="HeaderTop">
                    <div><Link to="/Home">&lt; {decodedLocation}</Link></div>
                    <img src="../src/assets/edit icon.svg" alt="" />
                </div>
                <form action="">
                    <input type="text" placeholder="Search..." />
                </form>
            </div>
           
            <ul>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div className="productCard" key={product.id}>
                            <h3>{product.name}</h3>
                            <form className="EditQTY" action="">
                                <button 
                                    id="QTYBTN" 
                                    type="button"
                                    onClick={() => incrementQuantity(index)}>+</button>
                                <input 
                                    id="QTYField" 
                                    type="number" 
                                    value={product.quantity} 
                                    
                                />
                                <button id="QTYBTN" type="button" onClick={()=> DecrementQuantity(index)}>-</button>
                            </form>
                        </div>
                    ))
                ) : (
                    <p>No products available for this location.</p>  
                )}
            </ul>

            
            <div className="SaveBtnContainer">
                <button className="SaveBtn">
                    <h1>Save Changes</h1>
                </button>   
            </div>
            
            
            <Footer />
        </div>

      
    );
    
}

export default ProductPage;
